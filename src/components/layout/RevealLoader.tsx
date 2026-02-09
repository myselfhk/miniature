"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export default function RevealLoader() {
  const [ready, setReady] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Use timeout for both cases to avoid synchronous setState in effect
    const delay = prefersReducedMotion ? 0 : 1400;
    const timer = setTimeout(() => setReady(true), delay);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 1 }}
      animate={{ opacity: ready ? 0 : 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <motion.div
        initial={{ scale: 1, opacity: 0.5 }}
        animate={{ scale: ready ? 1.1 : 1, opacity: ready ? 0 : 1 }}
        transition={{ duration: 0.6 }}
        className="text-xs tracking-[0.5em] text-white/60 uppercase"
      >
        Miniature
      </motion.div>
    </motion.div>
  );
}
