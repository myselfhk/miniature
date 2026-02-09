"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getPublicUrl } from "@/lib/supabase/urls";
import { ArrowRight } from "lucide-react";

type WorkCardProps = {
  item: {
    uid: string;
    title: string;
    summary: string | null;
    tags: string[];
    thumbnail: string | null;
  };
  priority?: boolean;
};

export default function WorkCard({ item, priority = false }: WorkCardProps) {
  const thumbnailUrl = getPublicUrl("uploads", item.thumbnail);

  return (
    <Link
      href={`/work/${item.uid}`}
      className="group border-border hover:border-accent-cyan/30 relative block overflow-hidden rounded-2xl border bg-white/[0.02] p-0 transition-all duration-500 hover:shadow-[0_0_40px_-10px_rgba(0,255,247,0.2)]"
    >
      {/* Aura Glow Layer */}
      <div className="from-accent-cyan/5 to-accent-magenta/5 pointer-events-none absolute inset-0 bg-gradient-to-tr via-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative aspect-[4/3] w-full overflow-hidden bg-white/[0.02]">
        <motion.div
          layoutId={`hero-image-${item.uid}`}
          className="absolute inset-0 h-full w-full"
          transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
        >
          {thumbnailUrl ? (
            <Image
              src={thumbnailUrl}
              alt={item.title}
              fill
              priority={priority}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-white/5 to-white/[0.02]" />
          )}
        </motion.div>
      </div>

      <div className="relative p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="text-paper text-xl font-medium transition-colors group-hover:text-white">
              {item.title}
            </h3>
            <p className="text-muted group-hover:text-paper line-clamp-1 text-sm transition-colors">
              {item.summary}
            </p>
          </div>
          <div className="-translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            <div className="bg-accent-cyan/10 text-accent-cyan rounded-full p-2">
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {item.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="border-border text-dim group-hover:border-accent-cyan/20 group-hover:text-accent-cyan/80 rounded-full border px-3 py-1 text-[10px] tracking-widest uppercase transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:h-auto group-hover:opacity-100">
          <span className="text-accent-cyan text-xs tracking-[0.2em] uppercase">
            Read Case Study
          </span>
        </div>
      </div>
    </Link>
  );
}
