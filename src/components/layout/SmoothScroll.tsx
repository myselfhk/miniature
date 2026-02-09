"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

// Initialize reduced motion preference (client-side only)
const getInitialReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isReducedMotion, setIsReducedMotion] = useState(
    getInitialReducedMotion,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Only listen for changes, initial value is set in useState
    const handleChange = (e: MediaQueryListEvent) =>
      setIsReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (isReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isReducedMotion]);

  // Reset scroll on route change
  useEffect(() => {
    if (!isReducedMotion) {
      window.scrollTo(0, 0);
    }
  }, [pathname, isReducedMotion]);

  return <>{children}</>;
}
