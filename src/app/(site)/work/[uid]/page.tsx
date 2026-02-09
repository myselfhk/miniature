import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import { getWorkItem, getWorkItems } from "@/lib/prismic";
import { getPublicUrl } from "@/lib/supabase/urls";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import { requireAdmin } from "@/lib/auth";
import { buildMetadata } from "@/lib/seo";
import { blocksSchema, Block } from "@/lib/blocks";
import WorkHero from "@/components/work/WorkHero";

type PageProps = {
  params: { uid: string };
  searchParams?: { preview?: string };
};

const toId = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

export async function generateStaticParams() {
  const items = await getWorkItems();
  return items.map((item) => ({ uid: item.uid }));
}

export const revalidate = 300;

export async function generateMetadata({ params }: PageProps) {
  const item = await getWorkItem(params.uid);
  if (!item) return buildMetadata({ title: "Case study not found" });
  const ogUrl = item.og_image_path
    ? getPublicUrl("uploads", item.og_image_path)
    : null;
  return buildMetadata({
    title: item.seo_title ?? item.title,
    description: item.seo_description ?? item.summary ?? undefined,
    openGraph: {
      images: ogUrl ? [ogUrl] : undefined,
    },
  });
}

export default async function WorkDetailPage({
  params,
  searchParams,
}: PageProps) {
  const isPreview = searchParams?.preview === "1";
  if (isPreview) await requireAdmin();

  const item = await getWorkItem(params.uid, isPreview);
  if (!item) notFound();

  const items = await getWorkItems();
  const index = items.findIndex((entry) => entry.uid === item.uid);
  const nextItem = items[(index + 1) % items.length];

  return (
    <div className="bg-ink-950 pt-28 pb-24">
      <Container>
        <div className="space-y-4">
          <p className="text-xs tracking-[0.35em] text-white/50 uppercase">
            Case Study · {item.year}
          </p>
          <Heading as="h1" size="lg">
            {item.title}
          </Heading>
          <p className="max-w-2xl text-white/70">{item.summary}</p>
        </div>

        <WorkHero
          uid={item.uid}
          title={item.title}
          heroMedia={item.heroMedia}
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-8">
            {(() => {
              const parseResult = blocksSchema.safeParse(item.sections);
              const blocks: Block[] = parseResult.success
                ? parseResult.data
                : [];
              return <BlockRenderer blocks={blocks} />;
            })()}
          </div>
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-xs tracking-[0.35em] text-white/40 uppercase">
                Sections
              </p>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {(() => {
                  const parseResult = blocksSchema.safeParse(item.sections);
                  const blocks: Block[] = parseResult.success
                    ? parseResult.data
                    : [];
                  return blocks
                    .filter(
                      (
                        block,
                      ): block is Block & { type: "heading"; text: string } =>
                        block.type === "heading",
                    )
                    .map((block) => (
                      <li key={block.text}>
                        <a
                          href={`#${toId(block.text)}`}
                          className="hover:text-white"
                        >
                          {block.text}
                        </a>
                      </li>
                    ));
                })()}
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-xs tracking-[0.35em] text-white/40 uppercase">
                Services
              </p>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {item.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-between border-t border-white/10 pt-8 text-sm text-white/70">
          <span>Next case study</span>
          <Link href={`/work/${nextItem.uid}`} className="hover:text-white">
            {nextItem.title} →
          </Link>
        </div>
      </Container>
    </div>
  );
}
