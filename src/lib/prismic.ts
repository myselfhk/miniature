import {
  getSupabaseServerClient,
  isSupabaseConfigured,
} from "./supabase/server";

export type WorkItem = {
  id: string;
  uid: string;
  title: string;
  summary: string | null;
  year: string;
  tags: string[];
  thumbnail: string | null;
  heroMedia: string | null;
  sections: unknown;
  status: "draft" | "published";
  published_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
  og_image_path: string | null;
};

const baseSelect =
  "id, slug, title, one_liner, tags, hero_media_path, sections, status, published_at, seo_title, seo_description, og_image_path";

export async function getWorkItems(includeDrafts = false): Promise<WorkItem[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await getSupabaseServerClient();
  const query = supabase
    .from("case_studies")
    .select(baseSelect)
    .order("published_at", { ascending: false, nullsFirst: false });

  const { data } = includeDrafts
    ? await query
    : await query.eq("status", "published");

  return (data ?? []).map((item) => ({
    id: item.id,
    uid: item.slug,
    title: item.title,
    summary: item.one_liner,
    year: item.published_at
      ? new Date(item.published_at).getFullYear().toString()
      : "",
    tags: item.tags ?? [],
    thumbnail: item.hero_media_path ?? null,
    heroMedia: item.hero_media_path ?? null,
    sections: item.sections ?? [],
    status: item.status,
    published_at: item.published_at,
    seo_title: item.seo_title ?? null,
    seo_description: item.seo_description ?? null,
    og_image_path: item.og_image_path ?? null,
  })) as WorkItem[];
}

export async function getWorkItem(
  uid: string,
  includeDrafts = false,
): Promise<WorkItem | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await getSupabaseServerClient();
  const query = supabase
    .from("case_studies")
    .select(baseSelect)
    .eq("slug", uid)
    .single();
  const { data } = includeDrafts
    ? await query
    : await query.eq("status", "published");

  if (!data) return null;
  return {
    id: data.id,
    uid: data.slug,
    title: data.title,
    summary: data.one_liner,
    year: data.published_at
      ? new Date(data.published_at).getFullYear().toString()
      : "",
    tags: data.tags ?? [],
    thumbnail: data.hero_media_path ?? null,
    heroMedia: data.hero_media_path ?? null,
    sections: data.sections ?? [],
    status: data.status,
    published_at: data.published_at,
    seo_title: data.seo_title ?? null,
    seo_description: data.seo_description ?? null,
    og_image_path: data.og_image_path ?? null,
  } as WorkItem;
}
