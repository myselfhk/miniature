import Image from "next/image";
import Link from "next/link";
import { Block } from "@/lib/blocks";
import { getPublicUrl } from "@/lib/supabase/urls";
import { getWorkItem } from "@/lib/prismic";
import WorkCard from "@/components/work/WorkCard";

type BlockRendererProps = {
  blocks: Block[];
};

const toId = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

export default async function BlockRenderer({ blocks }: BlockRendererProps) {
  return (
    <div className="space-y-6">
      {blocks.map(async (block, index) => {
        switch (block.type) {
          case "heading": {
            const Heading = block.level === 2 ? "h2" : "h3";
            return (
              <Heading
                key={index}
                id={toId(block.text)}
                className="text-xl font-semibold text-white"
              >
                {block.text}
              </Heading>
            );
          }
          case "paragraph":
            return (
              <p key={index} className="text-white/70">
                {block.text}
              </p>
            );
          case "quote":
            return (
              <blockquote
                key={index}
                className="border-l border-white/20 pl-4 text-white/70"
              >
                {block.text}
              </blockquote>
            );
          case "bullet_list":
            return (
              <ul
                key={index}
                className="list-disc space-y-2 pl-5 text-white/70"
              >
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "divider":
            return <hr key={index} className="border-white/10" />;
          case "callout":
            return (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white/70"
              >
                {block.text}
              </div>
            );
          case "cta":
            return (
              <Link
                key={index}
                href={block.href}
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-4 py-2 text-xs tracking-[0.3em] text-white uppercase hover:border-white"
              >
                {block.label}
              </Link>
            );
          case "image": {
            const url = getPublicUrl("uploads", block.path);
            if (!url) return null;
            return (
              <figure key={index} className="space-y-2">
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-white/10">
                  <Image
                    src={url}
                    alt={block.alt ?? ""}
                    fill
                    className="object-cover"
                  />
                </div>
                {block.caption ? (
                  <figcaption className="text-xs tracking-[0.3em] text-white/40 uppercase">
                    {block.caption}
                  </figcaption>
                ) : null}
              </figure>
            );
          }
          case "metrics_grid":
            return (
              <div
                key={index}
                className="grid grid-cols-2 gap-4 md:grid-cols-4"
              >
                {block.metrics.map((m, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="text-2xl font-bold text-white">
                      {m.value}
                    </div>
                    <div className="text-xs tracking-widest text-white/50 uppercase">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            );
          case "work_card": {
            const item = await getWorkItem(block.case_study_id);
            if (!item) return null;
            return <WorkCard key={index} item={item} />;
          }
          case "pricing_card":
            return (
              <div
                key={index}
                className="rounded-3xl border border-white/10 bg-white/5 p-8"
              >
                <h3 className="text-xl font-medium text-white">
                  {block.title}
                </h3>
                <div className="mt-4 text-4xl font-bold text-white">
                  {block.price}
                </div>
                <ul className="mt-8 space-y-4">
                  {block.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-white/70"
                    >
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={block.cta_href}
                  className="text-ink-950 mt-8 block w-full rounded-full bg-white py-4 text-center text-xs font-medium tracking-widest uppercase transition hover:bg-white/90"
                >
                  {block.cta_label}
                </Link>
              </div>
            );
          case "faq_list":
            return (
              <div key={index} className="space-y-8">
                {block.items.map((item, i) => (
                  <div
                    key={i}
                    className="border-b border-white/10 pb-8 last:border-0"
                  >
                    <h3 className="text-lg font-medium text-white">
                      {item.question}
                    </h3>
                    <p className="mt-2 font-light text-white/60">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
