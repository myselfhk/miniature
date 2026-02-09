"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { getPublicUrl } from "@/lib/supabase/urls";

type WorkHeroProps = {
  uid: string;
  title: string;
  heroMedia: string | null;
};

export default function WorkHero({ uid, title, heroMedia }: WorkHeroProps) {
  const heroUrl = getPublicUrl("uploads", heroMedia);

  return (
    <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
      <div className="relative aspect-[16/9]">
        <motion.div
          layoutId={`hero-image-${uid}`}
          className="absolute inset-0 h-full w-full"
          transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
        >
          {heroUrl ? (
            <Image
              src={heroUrl}
              alt={title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full bg-white/10" />
          )}
        </motion.div>
      </div>
    </div>
  );
}
