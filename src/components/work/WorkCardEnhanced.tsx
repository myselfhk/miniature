"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { getPublicUrl } from "@/lib/supabase/urls";
import { ArrowUpRight } from "lucide-react";

type WorkCardEnhancedProps = {
  item: {
    uid: string;
    title: string;
    summary: string | null;
    tags: string[];
    thumbnail: string | null;
  };
  priority?: boolean;
  index?: number;
};

// Sample taste notes - in production these would come from CMS
const tasteNotes: Record<
  string,
  { changed: string; mattered: string; improved: string }
> = {
  optty: {
    changed: "Simplified checkout flow from 8 steps to 3",
    mattered: "Reduced cognitive load for first-time users",
    improved: "Conversion rate increased 34%",
  },
  "change-wealth": {
    changed: "Unified brand system across 12 touchpoints",
    mattered: "Built trust through visual consistency",
    improved: "Brand recognition doubled in 6 months",
  },
  feedo: {
    changed: "Redesigned feedback collection experience",
    mattered: "Made giving feedback feel effortless",
    improved: "Response rates improved 2.5x",
  },
};

export default function WorkCardEnhanced({
  item,
  priority = false,
  index = 0,
}: WorkCardEnhancedProps) {
  const thumbnailUrl = getPublicUrl("uploads", item.thumbnail);
  const prefersReducedMotion = useReducedMotion();
  const notes = tasteNotes[item.uid];

  const isEven = index % 2 === 0;

  return (
    <Link href={`/work/${item.uid}`} className="group relative block">
      <motion.article
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.6,
          delay: index * 0.1,
          ease: [0.84, 0, 0.16, 1],
        }}
        className={`relative grid items-center gap-8 lg:gap-12 ${isEven ? "lg:grid-cols-[1.2fr_1fr]" : "lg:grid-cols-[1fr_1.2fr]"} `}
      >
        {/* Image */}
        <div className={`relative ${!isEven && "lg:order-2"}`}>
          <div className="border-border relative aspect-[16/10] overflow-hidden rounded-2xl border bg-white/[0.02]">
            {/* Hover glow */}
            <div className="from-accent-cyan/5 to-accent-magenta/5 pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr via-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {thumbnailUrl ? (
              <Image
                src={thumbnailUrl}
                alt={item.title}
                fill
                priority={priority}
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-white/5 to-white/[0.02]" />
            )}

            {/* Border glow on hover */}
            <div className="border-accent-cyan/0 group-hover:border-accent-cyan/20 absolute inset-0 rounded-2xl border transition-all duration-500 group-hover:shadow-[0_0_60px_-20px_rgba(0,255,247,0.25)]" />
          </div>
        </div>

        {/* Content */}
        <div className={`space-y-6 ${!isEven && "lg:order-1"}`}>
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {item.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-dim border-border group-hover:border-border-hover group-hover:text-muted rounded-full border bg-white/[0.02] px-3 py-1 text-[10px] tracking-[0.2em] uppercase transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="text-paper text-2xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-white md:text-3xl">
            {item.title}
          </h3>

          {/* One-liner outcome */}
          {item.summary && (
            <p className="text-muted text-lg leading-relaxed font-light">
              {item.summary}
            </p>
          )}

          {/* Taste Notes - revealed on hover (desktop only) */}
          {notes && (
            <div className="hidden lg:block">
              <div className="overflow-hidden">
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  whileHover={{ height: "auto", opacity: 1 }}
                  className="border-border space-y-3 border-t pt-4"
                >
                  <p className="text-dim mb-3 text-[11px] tracking-[0.2em] uppercase">
                    Taste Notes
                  </p>
                  <div className="grid gap-2 text-sm">
                    <p className="text-muted">
                      <span className="text-paper/70">Changed:</span>{" "}
                      {notes.changed}
                    </p>
                    <p className="text-muted">
                      <span className="text-paper/70">Mattered:</span>{" "}
                      {notes.mattered}
                    </p>
                    <p className="text-muted">
                      <span className="text-paper/70">Improved:</span>{" "}
                      {notes.improved}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Visible taste notes on hover */}
              <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-48 group-hover:opacity-100">
                <div className="border-border space-y-3 border-t pt-6">
                  <p className="text-dim text-[11px] tracking-[0.2em] uppercase">
                    Taste Notes
                  </p>
                  <div className="grid gap-2 text-sm">
                    <p className="text-muted">
                      <span className="text-paper/70">Changed:</span>{" "}
                      {notes.changed}
                    </p>
                    <p className="text-muted">
                      <span className="text-paper/70">Mattered:</span>{" "}
                      {notes.mattered}
                    </p>
                    <p className="text-muted">
                      <span className="text-paper/70">Improved:</span>{" "}
                      {notes.improved}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="flex items-center gap-2 pt-2">
            <span className="text-muted group-hover:text-accent-cyan text-xs tracking-[0.2em] uppercase transition-colors duration-300">
              Read case study
            </span>
            <ArrowUpRight className="text-muted group-hover:text-accent-cyan h-4 w-4 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </motion.article>

      {/* Divider between cards */}
      <div className="via-border mt-12 h-[1px] bg-gradient-to-r from-transparent to-transparent lg:mt-16" />
    </Link>
  );
}
