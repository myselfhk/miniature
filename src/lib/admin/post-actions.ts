"use server";

import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { blocksSchema } from "@/lib/blocks";
import { slugify } from "@/lib/slug";
import { revalidatePaths } from "@/lib/admin/revalidate";

const postSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  slug: z.string().optional(),
  excerpt: z.string().optional(),
  tags: z.string().optional(),
  status: z.enum(["draft", "published"]),
  cover_image_path: z.string().optional(),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
  og_image_path: z.string().optional(),
  content: z.string(),
  intent: z.enum(["save", "publish"]).optional(),
});

export async function savePost(formData: FormData) {
  await requireAdmin();
  const parsed = postSchema.parse(Object.fromEntries(formData.entries()));
  const supabase = await getSupabaseServerClient();

  const contentJson = blocksSchema.parse(JSON.parse(parsed.content || "[]"));
  const slug = slugify(parsed.slug || parsed.title);
  const status = parsed.intent === "publish" ? "published" : parsed.status;
  const payload = {
    title: parsed.title,
    slug,
    excerpt: parsed.excerpt ?? null,
    tags: parsed.tags ? parsed.tags.split(",").map((tag) => tag.trim()) : [],
    status,
    cover_image_path: parsed.cover_image_path ?? null,
    seo_title: parsed.seo_title ?? null,
    seo_description: parsed.seo_description ?? null,
    og_image_path: parsed.og_image_path ?? null,
    content: contentJson,
    published_at: status === "published" ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  };

  if (parsed.id) {
    await supabase.from("posts").update(payload).eq("id", parsed.id);
  } else {
    await supabase.from("posts").insert(payload);
  }

  if (status === "published") {
    await revalidatePaths(["/blog", `/blog/${slug}`, "/"]);
  }
}
