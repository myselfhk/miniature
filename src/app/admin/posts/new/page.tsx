import { requireAdmin } from "@/lib/auth";
import { savePost } from "@/lib/admin/post-actions";
import PostEditorForm from "@/components/admin/PostEditorForm";

export default async function NewPostPage() {
  await requireAdmin();
  return (
    <div>
      <h1 className="text-2xl font-semibold">New post</h1>
      <p className="mt-2 text-sm text-white/60">Draft a new entry.</p>
      <div className="mt-8">
        <PostEditorForm action={savePost} />
      </div>
    </div>
  );
}
