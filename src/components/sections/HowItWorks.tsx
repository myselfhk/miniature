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

const steps = [
  {
    number: "01",
    title: "Calibrate",
    description: "Align on taste and standards.",
    bullets: [
      "Define success metrics together",
      "Establish design principles",
      "Map constraints and freedoms",
    ],
  },
  {
    number: "02",
    title: "Craft",
    description: "Design with restraint and speed.",
    bullets: [
      "Rapid iteration cycles",
      "Every decision earns its place",
      "Quality over quantity",
    ],
  },
  {
    number: "03",
    title: "Ship",
    description: "Handoff, QA, and polish.",
    bullets: [
      "Pixel-perfect delivery",
      "Developer-ready assets",
      "Launch support included",
    ],
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Timeline fill progress
  const timelineScale = useTransform(scrollYProgress, [0.1, 0.8], [0, 1]);

  const referenceEase: [number, number, number, number] = [0.84, 0, 0.16, 1];

  return (
    <section
      ref={sectionRef}
      className="chapter bg-bg relative overflow-hidden py-32"
    >
      {/* Subtle background accent */}
      <div className="bg-accent-yellow/5 pointer-events-none absolute top-1/2 right-0 h-[500px] w-[500px] -translate-y-1/2 rounded-full blur-[180px]" />

      <Container className="relative z-10">
        {/* Chapter label */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: referenceEase }}
          className="chapter-label mb-8 block text-center"
        >
          How We Work
        </motion.span>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: referenceEase }}
          className="mb-20 text-center"
        >
          <Heading as="h2" size="lg" className="text-paper mb-6">
            Three chapters. <span className="text-muted">One story.</span>
          </Heading>
          <p className="text-muted mx-auto max-w-xl text-lg font-light">
            A clear path from alignment to launch, with taste at every step.
          </p>
        </motion.div>

        {/* Timeline with steps */}
        <div className="relative mx-auto max-w-3xl">
          {/* Vertical timeline line */}
          <div className="bg-border absolute top-0 bottom-0 left-8 w-[1px] md:left-1/2 md:-translate-x-[0.5px]">
            {/* Animated fill */}
            <motion.div
              style={
                prefersReducedMotion ? { scaleY: 1 } : { scaleY: timelineScale }
              }
              className="from-accent-cyan via-accent-yellow to-accent-magenta absolute inset-x-0 top-0 bottom-0 origin-top bg-gradient-to-b"
            />
          </div>

          {/* Steps */}
          <div className="space-y-16 md:space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: referenceEase,
                }}
                className={`relative grid items-start gap-8 md:gap-12 ${
                  index % 2 === 0
                    ? "md:grid-cols-[1fr_auto_1fr]"
                    : "md:grid-cols-[1fr_auto_1fr]"
                }`}
              >
                {/* Content - alternates sides on desktop */}
                <div
                  className={`pl-20 md:pl-0 ${index % 2 === 0 ? "md:order-1 md:text-right" : "md:order-3"}`}
                >
                  <div className="space-y-4">
                    <div
                      className={`flex items-center gap-3 ${index % 2 === 0 ? "md:justify-end" : ""}`}
                    >
                      <span className="text-micro text-accent-cyan">
                        {step.number}
                      </span>
                      <h3 className="text-paper text-2xl font-semibold">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-muted font-light">{step.description}</p>
                    <ul
                      className={`text-dim space-y-2 text-sm ${index % 2 === 0 ? "md:text-right" : ""}`}
                    >
                      {step.bullets.map((bullet, i) => (
                        <li
                          key={i}
                          className={`flex items-center gap-2 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                        >
                          <span className="bg-accent-cyan/50 h-1 w-1 rounded-full" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Timeline node */}
                <div className="absolute left-8 flex items-center justify-center md:relative md:left-auto md:order-2">
                  <div className="relative">
                    <div className="bg-ink border-paper/50 relative z-10 h-4 w-4 rounded-full border-2" />
                    <div className="bg-accent-cyan/30 absolute inset-0 h-4 w-4 animate-ping rounded-full" />
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                <div
                  className={`hidden md:block ${index % 2 === 0 ? "md:order-3" : "md:order-1"}`}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quality boundary line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: referenceEase }}
          className="mx-auto mt-24 max-w-2xl"
        >
          <div className="border-border rounded-2xl border bg-white/[0.02] p-8 text-center">
            <p className="text-paper mb-3 text-lg font-light">
              We don&apos;t do volume design.
            </p>
            <p className="text-muted">
              We take fewer projects to protect quality. Every engagement gets
              our full attention.
            </p>
            <div className="border-border mt-6 border-t pt-6">
              <p className="text-dim text-xs tracking-[0.2em] uppercase">
                Minimum engagement: <span className="text-paper">$3k</span>
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
