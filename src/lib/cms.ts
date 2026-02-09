import {
  getSupabaseServerClient,
  isSupabaseConfigured,
} from "./supabase/server";
import { Block } from "./blocks";

export type CMSPage = {
  id: string;
  slug: string;
  title: string;
  status: "draft" | "published";
  blocks: Block[];
  seo_title: string | null;
  seo_description: string | null;
  og_image_path: string | null;
};

export async function getPageBySlug(slug: string): Promise<CMSPage | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await getSupabaseServerClient();
  const { data } = await supabase
    .from("cms_pages")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!data) return null;

  return {
    ...data,
    blocks: data.blocks as Block[],
  };
}
