"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import Link from "next/link";
import LightField from "./LightField";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";

export default function Hero() {
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const y = useTransform(scrollY, [0, 400], [0, 60]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.98]);

  // Reference easing: --ease: cubic-bezier(.84, 0, .16, 1)
  const referenceEase = [0.84, 0, 0.16, 1];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 24,
      filter: prefersReducedMotion ? "blur(0px)" : "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: referenceEase },
    },
  };

  return (
    <section className="chapter relative flex min-h-screen flex-col justify-center overflow-hidden">
      <LightField />

      <Container className="relative z-10 flex flex-col items-center pt-16 pb-32 text-center">
        <motion.div
          style={prefersReducedMotion ? {} : { opacity, y, scale }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl"
        >
          {/* Micro badge */}
          <motion.div
            variants={itemVariants}
            className="mb-10 flex justify-center"
          >
            <span className="text-micro text-dim border-border rounded-full border bg-white/[0.03] px-4 py-1.5 backdrop-blur-sm">
              Global Design Company
            </span>
          </motion.div>

          {/* H1 - Main headline */}
          <motion.div variants={itemVariants}>
            <Heading
              as="h1"
              size="xl"
              className="text-paper mb-6 leading-[0.92] tracking-tight"
            >
              Stay timeless in a world that{" "}
              <span className="text-editorial text-paper/90">
                moves too fast.
              </span>
            </Heading>
          </motion.div>

          {/* Core storyline - sharp micro-line */}
          <motion.p
            variants={itemVariants}
            className="text-accent-cyan/80 mb-8 text-lg font-light tracking-wide md:text-xl"
          >
            Everyone can build. Not everyone can see.
          </motion.p>

          {/* Subcopy */}
          <motion.div
            variants={itemVariants}
            className="text-muted mx-auto mb-10 max-w-xl space-y-1 text-base leading-relaxed font-light md:text-lg"
          >
            <p>We&apos;re a global design company.</p>
            <p>
              We help teams build products and services that matter—with taste,
              clarity, and care.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="mb-12 flex flex-col items-center justify-center gap-5 sm:flex-row"
          >
            <Button href="/start-a-project" className="min-w-[180px]">
              Start a Project
            </Button>
            <Link
              href="/work"
              className="text-muted hover:text-paper hover:border-paper/30 border-b border-transparent pb-0.5 text-xs tracking-[0.2em] uppercase transition-colors duration-300"
            >
              View Work
            </Link>
          </motion.div>

          {/* Taste moat caption */}
          <motion.p
            variants={itemVariants}
            className="text-caption text-dim/70 mx-auto max-w-sm"
          >
            Tools help you build.{" "}
            <span className="text-paper/60">Taste helps you choose.</span>
          </motion.p>
        </motion.div>
      </Container>

      {/* Scroll Cue */}
      <motion.div
        style={prefersReducedMotion ? {} : { opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1.0, ease: referenceEase }}
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="text-dim/60 text-[10px] tracking-[0.35em] uppercase">
          Scroll
        </span>
        <div className="from-paper/40 h-10 w-[1px] bg-gradient-to-b to-transparent" />
      </motion.div>
    </section>
  );
}
