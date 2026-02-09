import { requireAdmin } from "@/lib/auth";
import { saveCaseStudy } from "@/lib/admin/case-study-actions";
import CaseStudyEditorForm from "@/components/admin/CaseStudyEditorForm";

export default async function NewCaseStudyPage() {
  await requireAdmin();
  return (
    <div>
      <h1 className="text-2xl font-semibold">New case study</h1>
      <p className="mt-2 text-sm text-white/60">Draft a new project.</p>
      <div className="mt-8">
        <CaseStudyEditorForm action={saveCaseStudy} />
      </div>
    </div>
  );
}
