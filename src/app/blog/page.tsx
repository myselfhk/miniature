import Link from "next/link";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import { getAllPosts } from "@/lib/content";

export const revalidate = 300;

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <div className="bg-ink-950 pt-28 pb-24">
      <Container>
        <div className="space-y-4">
          <p className="text-xs tracking-[0.35em] text-white/50 uppercase">
            Journal
          </p>
          <Heading as="h1" size="lg">
            Notes from the studio.
          </Heading>
        </div>
        <div className="mt-12 space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-white/30"
            >
              <div className="flex items-center justify-between text-xs tracking-[0.3em] text-white/50 uppercase">
                <span>
                  {post.published_at
                    ? new Date(post.published_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "Draft"}
                </span>
                <span>{post.tags[0] ?? "Note"}</span>
              </div>
              <h2 className="mt-3 text-2xl font-semibold text-white">
                {post.title}
              </h2>
              {post.excerpt ? (
                <p className="mt-2 text-white/70">{post.excerpt}</p>
              ) : null}
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
