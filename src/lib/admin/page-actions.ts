"use server";

import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { blocksSchema } from "@/lib/blocks";
import { revalidatePaths } from "@/lib/admin/revalidate";

const pageSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  slug: z.string().min(1),
  status: z.enum(["draft", "published"]),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
  og_image_path: z.string().optional(),
  blocks: z.string(),
  intent: z.enum(["save", "publish"]).optional(),
});

export async function savePage(formData: FormData) {
  await requireAdmin();
  const parsed = pageSchema.parse(Object.fromEntries(formData.entries()));
  const supabase = await getSupabaseServerClient();

  const blocksJson = blocksSchema.parse(JSON.parse(parsed.blocks || "[]"));
  const status = parsed.intent === "publish" ? "published" : parsed.status;

  const payload = {
    title: parsed.title,
    slug: parsed.slug,
    status,
    seo_title: parsed.seo_title ?? null,
    seo_description: parsed.seo_description ?? null,
    og_image_path: parsed.og_image_path ?? null,
    blocks: blocksJson,
    updated_at: new Date().toISOString(),
  };

  if (parsed.id) {
    await supabase.from("cms_pages").update(payload).eq("id", parsed.id);
  } else {
    await supabase.from("cms_pages").insert(payload);
  }

  if (status === "published") {
    await revalidatePaths([parsed.slug === "home" ? "/" : `/${parsed.slug}`]);
  }
}
