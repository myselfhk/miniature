"use client";

import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";

const roles = [
  { role: "Design Systems Lead", domain: "Fintech" },
  { role: "Staff Engineer", domain: "AI Infrastructure" },
  { role: "Growth Designer", domain: "SaaS" },
  { role: "Brand Director", domain: "Consumer" },
];

export default function PeopleTeaser() {
  const prefersReducedMotion = useReducedMotion();
  const referenceEase = [0.84, 0, 0.16, 1];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  return (
    <section className="chapter bg-ink border-border relative border-t py-32">
      {/* Subtle yellow accent glow */}
      <div className="bg-accent-yellow/5 pointer-events-none absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full blur-[150px]" />

      <Container className="relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="flex flex-col items-center justify-between gap-16 lg:flex-row">
            {/* Left: Copy */}
            <div className="max-w-xl space-y-6 text-center lg:text-left">
              <motion.span
                variants={itemVariants}
                className="chapter-label block"
              >
                The Network
              </motion.span>

              <motion.div variants={itemVariants}>
                <Heading as="h2" size="md" className="text-paper">
                  People of <span className="text-editorial">Miniature.</span>
                </Heading>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-muted text-lg leading-relaxed font-light"
              >
                A private bench of specialists we trust—brought in when it makes
                the work more correct.
              </motion.p>

              {/* Trust disclaimer */}
              <motion.div
                variants={itemVariants}
                className="border-border inline-flex items-center gap-3 rounded-lg border bg-white/[0.03] px-4 py-2"
              >
                <div className="bg-accent-yellow h-1.5 w-1.5 rounded-full" />
                <p className="text-dim text-sm">
                  Conflict-aware. Confidentiality-first. Private by default.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex flex-col justify-center gap-4 pt-4 sm:flex-row lg:justify-start"
              >
                <Button href="/people" variant="primary">
                  Explore People
                </Button>
              </motion.div>
            </div>

            {/* Right: Role Preview Grid */}
            <motion.div
              variants={itemVariants}
              className="grid w-full max-w-md grid-cols-1 gap-4 sm:grid-cols-2"
            >
              {roles.map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + i * 0.08,
                    ease: referenceEase,
                  }}
                  className="border-border hover:border-border-hover group rounded-2xl border bg-white/[0.02] p-6 transition-all duration-300 hover:bg-white/[0.04]"
                >
                  <div className="group-hover:from-accent-yellow/20 mb-4 h-8 w-8 rounded-full bg-gradient-to-br from-white/10 to-transparent transition-colors duration-300" />
                  <p className="text-paper text-sm font-medium">{r.role}</p>
                  <p className="text-dim mt-1 text-xs tracking-wider uppercase">
                    {r.domain}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
