import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getAdminPageById } from "@/lib/admin/queries";
import { savePage } from "@/lib/admin/page-actions";
import PageEditorForm from "@/components/admin/PageEditorForm";
import { blocksSchema, Block } from "@/lib/blocks";

type PageProps = {
  params: { id: string };
};

export default async function EditPagePage({ params }: PageProps) {
  await requireAdmin();
  const page = await getAdminPageById(params.id);
  if (!page) notFound();

  // Handle jsonb potentially being unknown or array
  const parseResult = blocksSchema.safeParse(page.blocks);
  const blocks: Block[] = parseResult.success ? parseResult.data : [];

  return (
    <div>
      <h1 className="text-2xl font-semibold">Edit page</h1>
      <p className="mt-2 text-sm text-white/60">Update layout and content.</p>
      <div className="mt-8">
        <PageEditorForm
          action={savePage}
          initial={{
            id: page.id,
            title: page.title,
            slug: page.slug,
            status: page.status,
            seo_title: page.seo_title,
            seo_description: page.seo_description,
            og_image_path: page.og_image_path,
            blocks,
          }}
        />
      </div>
    </div>
  );
}
