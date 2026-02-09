import { requireAdmin } from "@/lib/auth";
import { savePage } from "@/lib/admin/page-actions";
import PageEditorForm from "@/components/admin/PageEditorForm";

export default async function NewPagePage() {
  await requireAdmin();
  return (
    <div>
      <h1 className="text-2xl font-semibold">New page</h1>
      <p className="mt-2 text-sm text-white/60">Create a new landing page.</p>
      <div className="mt-8">
        <PageEditorForm action={savePage} />
      </div>
    </div>
  );
}
