"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function GlowBackdrop() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute top-[-20%] left-[-10%] h-[60vw] w-[60vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(193,0,168,0.55),transparent_65%)] blur-3xl"
        animate={
          prefersReducedMotion ? undefined : { x: [0, -40, 0], y: [0, 30, 0] }
        }
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[-10%] right-[-15%] h-[55vw] w-[55vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,178,178,0.45),transparent_60%)] blur-3xl"
        animate={
          prefersReducedMotion ? undefined : { x: [0, 30, 0], y: [0, -20, 0] }
        }
        transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-25%] left-[30%] h-[50vw] w-[50vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(214,161,0,0.45),transparent_60%)] blur-3xl"
        animate={
          prefersReducedMotion ? undefined : { x: [0, -20, 0], y: [0, -30, 0] }
        }
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-x-0 bottom-[-25%] h-1/2 bg-gradient-to-t from-black/60 to-transparent blur-2xl" />
      <div className="absolute bottom-0 left-1/2 h-40 w-[70vw] -translate-x-1/2 rounded-full bg-white/10 blur-[90px]" />
    </div>
  );
}
