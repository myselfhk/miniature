import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function getAdminPosts(search = "", status = "all") {
  const supabase = await getSupabaseServerClient();
  let query = supabase.from("posts").select("*").order("updated_at", {
    ascending: false,
  });

  if (status !== "all") query = query.eq("status", status);
  if (search) query = query.ilike("title", `%${search}%`);

  const { data } = await query;
  return data ?? [];
}

export async function getAdminPostById(id: string) {
  const supabase = await getSupabaseServerClient();
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();
  return data ?? null;
}

export async function getAdminCaseStudies(search = "", status = "all") {
  const supabase = await getSupabaseServerClient();
  let query = supabase.from("case_studies").select("*").order("updated_at", {
    ascending: false,
  });

  if (status !== "all") query = query.eq("status", status);
  if (search) query = query.ilike("title", `%${search}%`);

  const { data } = await query;
  return data ?? [];
}

export async function getAdminCaseStudyById(id: string) {
  const supabase = await getSupabaseServerClient();
  const { data } = await supabase
    .from("case_studies")
    .select("*")
    .eq("id", id)
    .single();
  return data ?? null;
}

export async function getAdminApplications() {
  const supabase = await getSupabaseServerClient();
  const { data } = await supabase
    .from("people_consultant_applications")
    .select("*")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function getAdminPages() {
  const supabase = await getSupabaseServerClient();
  const { data } = await supabase
    .from("cms_pages")
    .select("*")
    .order("slug", { ascending: true });
  return data ?? [];
}

export async function getAdminPageById(id: string) {
  const supabase = await getSupabaseServerClient();
  const { data } = await supabase
    .from("cms_pages")
    .select("*")
    .eq("id", id)
    .single();
  return data ?? null;
}
