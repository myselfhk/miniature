"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function LightField() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 90 }; // Slower, heavier feel
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xPct = clientX / innerWidth - 0.5;
      const yPct = clientY / innerHeight - 0.5;
      mouseX.set(xPct);
      mouseY.set(yPct);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Very subtle parallax
  const layer1X = useTransform(x, [-0.5, 0.5], ["-3%", "3%"]);
  const layer1Y = useTransform(y, [-0.5, 0.5], ["-3%", "3%"]);

  const layer2X = useTransform(x, [-0.5, 0.5], ["5%", "-5%"]);
  const layer2Y = useTransform(y, [-0.5, 0.5], ["5%", "-5%"]);

  return (
    <div
      ref={ref}
      className="bg-ink pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Base Gradient - Cinematic vignetting */}
      <div className="bg-hero-glow absolute inset-0 z-0 opacity-80" />

      {/* Layer 1: Deep Ambient Glows (Magenta / Cyan) */}
      <motion.div
        style={{ x: layer1X, y: layer1Y }}
        className="absolute inset-0 z-10 opacity-30 mix-blend-screen"
      >
        {/* Top Right Cyan */}
        <div className="bg-accent-cyan/20 absolute top-[-20%] right-[-10%] h-[70vw] w-[70vw] rounded-full blur-[150px]" />
        {/* Bottom Left Magenta */}
        <div className="bg-accent-magenta/15 absolute bottom-[-20%] left-[-10%] h-[70vw] w-[70vw] rounded-full blur-[150px]" />
      </motion.div>

      {/* Layer 2: Focused Light (Yellow/White) */}
      <motion.div
        style={{ x: layer2X, y: layer2Y }}
        className="absolute inset-0 z-20 opacity-20 mix-blend-screen"
      >
        <div className="bg-accent-yellow/10 absolute top-[30%] left-[20%] h-[40vw] w-[40vw] rounded-full blur-[120px]" />
      </motion.div>

      {/* Cursor Follower (Subtle White/Cyan Highlight) */}
      <motion.div
        className="pointer-events-none absolute z-20 h-[600px] w-[600px] rounded-full bg-white/5 mix-blend-overlay blur-[100px]"
        style={{
          left: "50%",
          top: "50%",
          x: useTransform(
            x,
            (val) =>
              (typeof window !== "undefined" ? val * window.innerWidth : 0) -
              300,
          ),
          y: useTransform(
            y,
            (val) =>
              (typeof window !== "undefined" ? val * window.innerHeight : 0) -
              300,
          ),
        }}
      />
    </div>
  );
}
