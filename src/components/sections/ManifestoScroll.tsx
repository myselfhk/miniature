"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Reveal from "@/components/ui/Reveal";

const lines = [
  "We design for longevity, not trends.",
  "Craft is visible in the quiet details.",
  "Culture-first work builds trust.",
  "Small teams can move with precision.",
  "Storytelling is a product system.",
  "We treat launch as a starting line.",
  "Timeless brands are earned, not announced.",
  "Calm experiences outperform loud ones.",
];

export default function ManifestoScroll() {
  const [active, setActive] = useState(0);
  const refs = useRef<HTMLParagraphElement[]>([]);

  useEffect(() => {
    const observers = refs.current.map((node, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(index);
        },
        { rootMargin: "-45% 0px -45% 0px", threshold: 0.1 },
      );
      if (node) observer.observe(node);
      return observer;
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return (
    <section className="relative py-24">
      <Reveal>
        <Container className="relative max-w-4xl">
          <Heading as="h2" size="md">
            Manifesto
          </Heading>
          <div className="relative mt-10 space-y-8 pl-6">
            <div className="absolute top-0 left-0 h-full w-px bg-white/10" />
            <div
              className="absolute top-0 left-0 w-px bg-white transition-all duration-500"
              style={{ height: `${((active + 1) / lines.length) * 100}%` }}
            />
            {lines.map((line, index) => (
              <p
                key={line}
                ref={(node) => {
                  if (node) refs.current[index] = node;
                }}
                className={clsx(
                  "text-2xl transition duration-500",
                  index === active ? "text-white" : "text-white/35",
                )}
              >
                {line}
              </p>
            ))}
          </div>
        </Container>
      </Reveal>
    </section>
  );
}
