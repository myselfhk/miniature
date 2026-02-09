"use client";

import { useRef, useState, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";

const steps = [
  {
    id: "noise",
    label: "Noise",
    description: "Too many options. Too much output.",
    visual: "chaotic",
  },
  {
    id: "structure",
    label: "Structure",
    description: "Clarity emerges through constraint.",
    visual: "ordered",
  },
  {
    id: "beauty",
    label: "Beauty",
    description: "What remains is what matters.",
    visual: "minimal",
  },
];

export default function TheReframe() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  // Pre-compute random values to avoid calling Math.random() during render
  const chaoticElements = useMemo(
    () =>
      [...Array(12)].map((_, i) => ({
        opacity: 0.4 + (((i * 7) % 10) / 10) * 0.4,
        repeatDelay: ((i * 3) % 10) / 5,
        width: 40 + ((i * 5) % 6) * 10,
        height: 30 + ((i * 4) % 4) * 10,
        rotate: -15 + ((i * 2) % 6) * 5,
      })),
    [],
  );

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);

  const referenceEase: [number, number, number, number] = [0.84, 0, 0.16, 1];

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
      y: prefersReducedMotion ? 0 : 16,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: referenceEase },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="chapter relative flex min-h-screen flex-col justify-center overflow-hidden py-32"
    >
      {/* Accent background glow - cyan dominant for this chapter */}
      <motion.div
        style={
          prefersReducedMotion
            ? { opacity: 0.15 }
            : { opacity: backgroundOpacity }
        }
        className="pointer-events-none absolute inset-0"
      >
        <div className="bg-accent-cyan/8 absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[200px]" />
      </motion.div>

      <Container className="relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-4xl"
        >
          {/* Chapter label */}
          <motion.span
            variants={itemVariants}
            className="chapter-label mb-8 block text-center"
          >
            The Reframe
          </motion.span>

          {/* Main headline */}
          <motion.div variants={itemVariants} className="mb-6 text-center">
            <Heading
              as="h2"
              size="lg"
              className="text-paper leading-[1.1] tracking-tight"
            >
              Seeing is the <span className="text-editorial">hard part.</span>
            </Heading>
          </motion.div>

          {/* Body copy */}
          <motion.p
            variants={itemVariants}
            className="text-muted mx-auto mb-16 max-w-2xl text-center text-lg font-light md:text-xl"
          >
            Taste is judgment—what to remove, what to emphasize, what to ship.
          </motion.p>

          {/* Interactive 3-step reveal: Noise → Structure → Beauty */}
          <motion.div variants={itemVariants} className="relative">
            {/* Step indicators */}
            <div className="mb-12 flex justify-center gap-2">
              {steps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  className={`focus-ring relative rounded-full px-6 py-3 text-xs font-medium tracking-[0.2em] uppercase transition-all duration-500 ${
                    activeStep === index
                      ? "bg-paper text-ink"
                      : "text-muted hover:text-paper border-border border bg-white/5 hover:bg-white/10"
                  } `}
                  aria-pressed={activeStep === index}
                >
                  {step.label}
                  {activeStep === index && (
                    <motion.div
                      layoutId="activeStep"
                      className="bg-paper absolute inset-0 -z-10 rounded-full"
                      transition={{
                        type: "spring",
                        bounce: 0.15,
                        duration: 0.5,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Visual representation area */}
            <div className="border-border relative h-64 overflow-hidden rounded-2xl border bg-white/[0.02] md:h-80">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-8"
                >
                  {/* Visual based on step */}
                  {activeStep === 0 && (
                    <div className="relative mb-6 h-32 w-full">
                      {/* Chaotic scattered elements */}
                      {chaoticElements.map((el, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{
                            opacity: el.opacity,
                            scale: 1,
                            x: Math.sin(i * 0.8) * 20,
                            y: Math.cos(i * 0.6) * 10,
                          }}
                          transition={{
                            duration: 0.6,
                            delay: i * 0.03,
                            repeat: Infinity,
                            repeatType: "reverse",
                            repeatDelay: el.repeatDelay,
                          }}
                          className="from-paper/20 to-paper/5 border-border absolute rounded-lg border bg-gradient-to-br"
                          style={{
                            width: `${el.width}px`,
                            height: `${el.height}px`,
                            left: `${(i * 8) % 90}%`,
                            top: `${(i * 15) % 80}%`,
                            transform: `rotate(${el.rotate}deg)`,
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {activeStep === 1 && (
                    <div className="relative mb-6 h-32 w-full max-w-md">
                      {/* Ordered grid */}
                      <div className="grid h-full grid-cols-4 gap-3">
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                            className="from-paper/15 to-paper/5 border-border rounded-lg border bg-gradient-to-br"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {activeStep === 2 && (
                    <div className="relative mb-6 flex h-32 w-full max-w-xs items-center justify-center">
                      {/* Single beautiful element */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: referenceEase }}
                        className="from-accent-cyan/20 via-paper/10 to-accent-magenta/10 border-accent-cyan/20 h-24 w-full rounded-2xl border bg-gradient-to-br shadow-[0_0_60px_-15px_rgba(0,255,247,0.3)]"
                      />
                    </div>
                  )}

                  {/* Step description */}
                  <p className="text-muted max-w-sm text-center">
                    {steps[activeStep].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress indicator */}
            <div className="mt-8 flex justify-center gap-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-500 ${activeStep === index ? "bg-accent-cyan w-8" : "bg-border w-2"} `}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
