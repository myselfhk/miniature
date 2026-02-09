import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getAdminPostById } from "@/lib/admin/queries";
import { savePost } from "@/lib/admin/post-actions";
import PostEditorForm from "@/components/admin/PostEditorForm";
import { blocksSchema } from "@/lib/blocks";

type PageProps = {
  params: { id: string };
};

export default async function EditPostPage({ params }: PageProps) {
  await requireAdmin();
  const post = await getAdminPostById(params.id);
  if (!post) notFound();

  const content = blocksSchema.safeParse(post.content).success
    ? post.content
    : [];

  return (
    <div>
      <h1 className="text-2xl font-semibold">Edit post</h1>
      <p className="mt-2 text-sm text-white/60">Update and publish changes.</p>
      <div className="mt-8">
        <PostEditorForm
          action={savePost}
          initial={{
            id: post.id,
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            tags: post.tags,
            status: post.status,
            cover_image_path: post.cover_image_path,
            seo_title: post.seo_title,
            seo_description: post.seo_description,
            og_image_path: post.og_image_path,
            content,
          }}
        />
      </div>
    </div>
  );
}
