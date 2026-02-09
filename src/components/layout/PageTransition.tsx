"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Using the reference easing: cubic-bezier(.84, 0, .16, 1)
  // Framer Motion accepts cubic-bezier as an array of 4 numbers.
  const referenceEase: [number, number, number, number] = [0.84, 0, 0.16, 1];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
        transition={{ duration: 0.8, ease: referenceEase }} // Increased duration to 0.8s to match --ease time in reference CSS
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
