"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";

export default function TheProblem() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Subtle background noise elements fade out as user scrolls through
  const noiseOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7],
    [0.15, 0.08, 0],
  );
  const focusOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0.6, 1]);

  const referenceEase: [number, number, number, number] = [0.84, 0, 0.16, 1];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: referenceEase },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="chapter relative flex min-h-screen flex-col justify-center overflow-hidden py-32"
    >
      {/* Background noise elements - fade out for "noise → focus" transition */}
      <motion.div
        style={
          prefersReducedMotion ? { opacity: 0.08 } : { opacity: noiseOpacity }
        }
        className="pointer-events-none absolute inset-0"
      >
        {/* Scattered grid dots representing "noise" */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="bg-paper/20 absolute h-1 w-1 rounded-full"
              style={{
                left: `${(i * 17) % 100}%`,
                top: `${(i * 23) % 100}%`,
              }}
            />
          ))}
        </div>
        {/* Subtle gradient blur */}
        <div className="bg-accent-magenta/5 absolute top-1/4 left-1/4 h-96 w-96 rounded-full blur-[120px]" />
        <div className="bg-accent-cyan/5 absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full blur-[120px]" />
      </motion.div>

      <Container className="relative z-10">
        <motion.div
          style={prefersReducedMotion ? {} : { opacity: focusOpacity }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Chapter label */}
          <motion.span
            variants={itemVariants}
            className="chapter-label mb-8 block"
          >
            The Problem
          </motion.span>

          {/* Main headline */}
          <motion.div variants={itemVariants}>
            <Heading
              as="h2"
              size="lg"
              className="text-paper mb-10 leading-[1.1] tracking-tight"
            >
              Building is getting easier.{" "}
              <span className="text-muted">
                Everything is starting to look the same.
              </span>
            </Heading>
          </motion.div>

          {/* Body copy - 2 lines max */}
          <motion.div
            variants={itemVariants}
            className="prose-body text-muted mx-auto space-y-2 text-lg font-light md:text-xl"
          >
            <p>You don&apos;t need more output.</p>
            <p className="text-paper/90">You need better decisions.</p>
          </motion.div>

          {/* Visual divider - subtle */}
          <motion.div
            variants={itemVariants}
            className="mt-16 flex justify-center"
          >
            <div className="via-border h-[1px] w-12 bg-gradient-to-r from-transparent to-transparent" />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
