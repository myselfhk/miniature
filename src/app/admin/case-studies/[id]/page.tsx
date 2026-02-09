import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getAdminCaseStudyById } from "@/lib/admin/queries";
import { saveCaseStudy } from "@/lib/admin/case-study-actions";
import CaseStudyEditorForm from "@/components/admin/CaseStudyEditorForm";
import { blocksSchema } from "@/lib/blocks";

type PageProps = {
  params: { id: string };
};

export default async function EditCaseStudyPage({ params }: PageProps) {
  await requireAdmin();
  const item = await getAdminCaseStudyById(params.id);
  if (!item) notFound();

  const sections = blocksSchema.safeParse(item.sections).success
    ? item.sections
    : [];

  return (
    <div>
      <h1 className="text-2xl font-semibold">Edit case study</h1>
      <p className="mt-2 text-sm text-white/60">Update and publish changes.</p>
      <div className="mt-8">
        <CaseStudyEditorForm
          action={saveCaseStudy}
          initial={{
            id: item.id,
            title: item.title,
            slug: item.slug,
            one_liner: item.one_liner,
            industry: item.industry,
            tags: item.tags,
            status: item.status,
            hero_media_path: item.hero_media_path,
            seo_title: item.seo_title,
            seo_description: item.seo_description,
            og_image_path: item.og_image_path,
            sections,
          }}
        />
      </div>
    </div>
  );
}
