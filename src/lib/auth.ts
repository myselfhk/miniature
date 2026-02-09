import { redirect } from "next/navigation";
import {
  getSupabaseServerClient,
  getSupabaseServiceClient,
  isSupabaseConfigured,
} from "./supabase/server";

const getAllowlist = () =>
  (process.env.ADMIN_EMAIL_ALLOWLIST ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

export async function getUser() {
  if (!isSupabaseConfigured()) return null;
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function isAdmin() {
  if (!isSupabaseConfigured()) return false;
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !user.email) return false;

  // First check if already marked as admin in profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (profile?.is_admin) return true;

  // If not, check allowlist and auto-promote if allowed
  const allowlist = getAllowlist();
  const emailAllowed = allowlist.includes(user.email.toLowerCase());

  if (emailAllowed) {
    // Use service client to bypass RLS and grant admin
    const serviceClient = getSupabaseServiceClient();
    await serviceClient.from("profiles").upsert(
      {
        id: user.id,
        email: user.email,
        is_admin: true,
      },
      { onConflict: "id" },
    );
    return true;
  }

  return false;
}

export async function requireAdmin() {
  if (!isSupabaseConfigured()) {
    redirect("/admin");
  }

  const user = await getUser();
  if (!user || !user.email) redirect("/admin");

  const admin = await isAdmin();
  if (admin) return user;

  redirect("/admin");
}
