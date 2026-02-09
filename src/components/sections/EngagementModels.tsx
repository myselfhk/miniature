"use client";

import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import { BRAND } from "@/lib/constants";

const engagements = [
  {
    title: "Focused Sprint",
    bestFor: "Specific deliverable with clear scope",
    timeline: "2–4 weeks",
    outcome: "One polished artifact, ready to ship",
    accent: "cyan",
  },
  {
    title: "Product Partnership",
    bestFor: "Ongoing product design and evolution",
    timeline: "3+ months",
    outcome: "Design system, flows, and continuous iteration",
    accent: "magenta",
  },
  {
    title: "Launch Support",
    bestFor: "Final polish before going live",
    timeline: "1–2 weeks",
    outcome: "Pixel-perfect QA and last-mile refinements",
    accent: "yellow",
  },
];

export default function EngagementModels() {
  const prefersReducedMotion = useReducedMotion();
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
      y: prefersReducedMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: referenceEase },
    },
  };

  const accentColors = {
    cyan: "border-accent-cyan/30 hover:border-accent-cyan/50 hover:shadow-[0_0_40px_-15px_rgba(0,255,247,0.2)]",
    magenta:
      "border-accent-magenta/30 hover:border-accent-magenta/50 hover:shadow-[0_0_40px_-15px_rgba(251,0,246,0.2)]",
    yellow:
      "border-accent-yellow/30 hover:border-accent-yellow/50 hover:shadow-[0_0_40px_-15px_rgba(255,199,2,0.2)]",
  };

  const accentDots = {
    cyan: "bg-accent-cyan",
    magenta: "bg-accent-magenta",
    yellow: "bg-accent-yellow",
  };

  return (
    <section className="chapter bg-bg relative py-32">
      {/* Subtle background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent" />

      <Container className="relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Chapter label */}
          <motion.span
            variants={itemVariants}
            className="chapter-label mb-8 block text-center"
          >
            Engagement Models
          </motion.span>

          {/* Section header */}
          <motion.div variants={itemVariants} className="mb-16 text-center">
            <Heading as="h2" size="lg" className="text-paper mb-6">
              Choose your path.
            </Heading>
            <p className="text-muted mx-auto max-w-xl text-lg font-light">
              Three ways to work together, each designed for different needs.
            </p>
          </motion.div>

          {/* Engagement cards - luxury menu style */}
          <motion.div
            variants={itemVariants}
            className="mx-auto mb-20 grid max-w-5xl gap-6 md:grid-cols-3"
          >
            {engagements.map((engagement, index) => (
              <motion.div
                key={engagement.title}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + index * 0.1,
                  ease: referenceEase,
                }}
                className={`relative rounded-2xl border bg-white/[0.02] p-8 transition-all duration-500 ${accentColors[engagement.accent as keyof typeof accentColors]} `}
              >
                {/* Accent dot */}
                <div
                  className={`mb-6 h-2 w-2 rounded-full ${accentDots[engagement.accent as keyof typeof accentDots]}`}
                />

                {/* Title */}
                <h3 className="text-paper mb-6 text-xl font-semibold">
                  {engagement.title}
                </h3>

                {/* Details */}
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-dim mb-1 text-[10px] tracking-wider uppercase">
                      Best for
                    </p>
                    <p className="text-muted">{engagement.bestFor}</p>
                  </div>
                  <div>
                    <p className="text-dim mb-1 text-[10px] tracking-wider uppercase">
                      Timeline
                    </p>
                    <p className="text-muted">{engagement.timeline}</p>
                  </div>
                  <div>
                    <p className="text-dim mb-1 text-[10px] tracking-wider uppercase">
                      Outcome
                    </p>
                    <p className="text-muted">{engagement.outcome}</p>
                  </div>
                </div>

                {/* CTA */}
                <div className="border-border mt-8 border-t pt-6">
                  <Button
                    href="/start-a-project"
                    variant="ghost"
                    className="w-full !text-[10px]"
                  >
                    Start here
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Closing statement */}
          <motion.div
            variants={itemVariants}
            className="mx-auto max-w-2xl text-center"
          >
            <div className="border-border rounded-3xl border bg-white/[0.02] p-10">
              <Heading as="h3" size="md" className="text-paper mb-6">
                Let&apos;s build something timeless.
              </Heading>

              <p className="text-muted mx-auto mb-8 max-w-md font-light">
                Tell us what you&apos;re building. We&apos;ll show you the
                fastest path to make it matter.
              </p>

              {/* Primary CTAs */}
              <div className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button href="/start-a-project" className="min-w-[180px]">
                  Start a project
                </Button>
                <Button
                  href={`mailto:${BRAND.email}?subject=8-minute%20clarity%20call`}
                  variant="ghost"
                >
                  8-minute clarity call
                </Button>
              </div>

              {/* Microcopy */}
              <p className="text-dim text-xs">
                Quick commerce takes 10 minutes. We only need 8.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
