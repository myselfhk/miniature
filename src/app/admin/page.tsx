import { redirect } from "next/navigation";
import AuthForm from "@/components/admin/AuthForm";
import { getUser, isAdmin } from "@/lib/auth";

export default async function AdminPage() {
  const user = await getUser();
  const admin = await isAdmin();

  if (user && admin) {
    redirect("/admin/posts");
  }

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-white/5 p-6">
      <h1 className="text-xl font-semibold text-white">Admin access</h1>
      <p className="mt-2 text-sm text-white/60">
        Sign in with your approved email to access the CMS.
      </p>
      <div className="mt-6">
        <AuthForm />
      </div>
    </div>
  );
}
