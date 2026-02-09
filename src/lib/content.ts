import {
  getSupabaseServerClient,
  isSupabaseConfigured,
} from "./supabase/server";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  tags: string[];
  status: "draft" | "published";
  published_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
  og_image_path: string | null;
  content: unknown;
};

const baseSelect =
  "id, slug, title, excerpt, tags, status, published_at, seo_title, seo_description, og_image_path, content";

export async function getAllPosts(includeDrafts = false): Promise<BlogPost[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await getSupabaseServerClient();
  const query = supabase
    .from("posts")
    .select(baseSelect)
    .order("published_at", {
      ascending: false,
      nullsFirst: false,
    });

  const { data } = includeDrafts
    ? await query
    : await query.eq("status", "published");

  return (data ?? []) as BlogPost[];
}

export async function getPostBySlug(
  slug: string,
  includeDrafts = false,
): Promise<BlogPost | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await getSupabaseServerClient();
  const query = supabase
    .from("posts")
    .select(baseSelect)
    .eq("slug", slug)
    .single();

  const { data } = includeDrafts
    ? await query
    : await query.eq("status", "published");

  return (data ?? null) as BlogPost | null;
}
