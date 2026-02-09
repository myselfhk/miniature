"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import clsx from "clsx";
import { NAV_LINKS, PRIMARY_CTA } from "@/lib/routes";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 20);
  });

  // Reference easing: --smooth: cubic-bezier(.76, 0 ,.24 ,1)
  const smoothEase = [0.76, 0, 0.24, 1];

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-140%" }, // Matches reference translate3d(0,-140%,0)
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.8, ease: smoothEase }} // Matches transition: transform .8s var(--smooth)
      className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-6"
    >
      <div
        className={clsx(
          "pointer-events-auto flex items-center justify-between gap-8 rounded-full border px-6 py-3",
          // Transition properties from .nav_body reference
          "ease-smooth transition-[background-color,backdrop-filter,border-color,color] duration-[400ms]",
          scrolled
            ? "bg-ink/75 border-white/10 text-white shadow-2xl shadow-black/50 backdrop-blur-[20px]"
            : "backdrop-blur-0 border-transparent bg-transparent text-white",
        )}
      >
        <Link
          href="/"
          aria-label="Miniature home"
          className="flex items-center"
        >
          <Image
            src="/brand/logo.svg"
            alt="Miniature"
            width={100}
            height={24}
            priority
            className="opacity-90 transition-opacity duration-300 hover:opacity-100"
          />
        </Link>

        <nav
          aria-label="Primary"
          className="text-muted hidden items-center gap-8 text-[11px] font-medium tracking-[0.2em] uppercase md:flex"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors duration-300 ease-out hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            href={PRIMARY_CTA.href}
            aria-label={PRIMARY_CTA.label}
            variant="primary"
            className="!px-5 !py-2 !text-[10px]"
          >
            Start
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
