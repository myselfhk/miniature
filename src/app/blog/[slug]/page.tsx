import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import { getAllPosts, getPostBySlug } from "@/lib/content";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import { requireAdmin } from "@/lib/auth";
import { buildMetadata } from "@/lib/seo";
import { blocksSchema, Block } from "@/lib/blocks";
import { getPublicUrl } from "@/lib/supabase/urls";

type PageProps = {
  params: { slug: string };
  searchParams?: { preview?: string };
};

export const revalidate = 300;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);
  if (!post) return buildMetadata({ title: "Post not found" });
  const ogUrl = post.og_image_path
    ? getPublicUrl("uploads", post.og_image_path)
    : null;
  return buildMetadata({
    title: post.seo_title ?? post.title,
    description: post.seo_description ?? post.excerpt ?? undefined,
    openGraph: {
      images: ogUrl ? [ogUrl] : undefined,
    },
  });
}

export default async function BlogDetailPage({
  params,
  searchParams,
}: PageProps) {
  const isPreview = searchParams?.preview === "1";
  if (isPreview) await requireAdmin();

  const post = await getPostBySlug(params.slug, isPreview);
  if (!post) notFound();

  const parseResult = blocksSchema.safeParse(post.content);
  const blocks: Block[] = parseResult.success ? parseResult.data : [];

  return (
    <div className="bg-ink-950 pt-28 pb-24">
      <Container className="max-w-3xl">
        <div className="space-y-3">
          <p className="text-xs tracking-[0.35em] text-white/50 uppercase">
            {post.published_at
              ? new Date(post.published_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "Draft"}
          </p>
          <Heading as="h1" size="lg">
            {post.title}
          </Heading>
          {post.excerpt ? (
            <p className="text-white/70">{post.excerpt}</p>
          ) : null}
        </div>
        <article className="mt-10">
          <BlockRenderer blocks={blocks} />
        </article>
      </Container>
    </div>
  );
}
