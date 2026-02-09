"use server";

import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { blocksSchema } from "@/lib/blocks";
import { slugify } from "@/lib/slug";
import { revalidatePaths } from "@/lib/admin/revalidate";

const caseStudySchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  slug: z.string().optional(),
  client_name: z.string().optional(),
  one_liner: z.string().optional(),
  industry: z.string().optional(),
  tags: z.string().optional(),
  status: z.enum(["draft", "published"]),
  hero_media_path: z.string().optional(),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
  og_image_path: z.string().optional(),
  sections: z.string(),
  problem: z.string().optional(),
  approach: z.string().optional(),
  outcomes: z.string().optional(),
  role: z.string().optional(),
  year: z.string().optional(),
  intent: z.enum(["save", "publish"]).optional(),
});

export async function saveCaseStudy(formData: FormData) {
  await requireAdmin();
  const rawData = Object.fromEntries(formData.entries());
  const parsed = caseStudySchema.parse(rawData);
  const supabase = await getSupabaseServerClient();

  const sectionsJson = blocksSchema.parse(JSON.parse(parsed.sections || "[]"));
  const slug = slugify(parsed.slug || parsed.title);
  const status = parsed.intent === "publish" ? "published" : parsed.status;

  const payload = {
    title: parsed.title,
    slug,
    client_name: parsed.client_name ?? null,
    one_liner: parsed.one_liner ?? null,
    industry: parsed.industry ?? null,
    tags: parsed.tags ? parsed.tags.split(",").map((tag) => tag.trim()) : [],
    status,
    hero_media_path: parsed.hero_media_path ?? null,
    seo_title: parsed.seo_title ?? null,
    seo_description: parsed.seo_description ?? null,
    og_image_path: parsed.og_image_path ?? null,
    sections: sectionsJson,
    problem: parsed.problem ?? null,
    approach: parsed.approach ?? null,
    outcomes: parsed.outcomes ?? null,
    role: parsed.role ?? null,
    year: parsed.year ?? null,
    published_at: status === "published" ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  };

  if (parsed.id) {
    await supabase.from("case_studies").update(payload).eq("id", parsed.id);
  } else {
    await supabase.from("case_studies").insert(payload);
  }

  if (status === "published") {
    await revalidatePaths(["/work", `/work/${slug}`, "/"]);
  }
}
