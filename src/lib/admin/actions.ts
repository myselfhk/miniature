"use server";

import { getSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth";
import { revalidatePaths } from "@/lib/admin/revalidate";

export async function togglePostStatus(
  id: string,
  publish: boolean,
  slug: string,
) {
  await requireAdmin();
  const supabase = await getSupabaseServerClient();
  const payload = publish
    ? { status: "published", published_at: new Date().toISOString() }
    : { status: "draft" };
  await supabase.from("posts").update(payload).eq("id", id);
  await revalidatePaths(["/blog", `/blog/${slug}`, "/"]);
}

export async function toggleCaseStudyStatus(
  id: string,
  publish: boolean,
  slug: string,
) {
  await requireAdmin();
  const supabase = await getSupabaseServerClient();
  const payload = publish
    ? { status: "published", published_at: new Date().toISOString() }
    : { status: "draft" };
  await supabase.from("case_studies").update(payload).eq("id", id);
  await revalidatePaths(["/work", `/work/${slug}`, "/"]);
}
