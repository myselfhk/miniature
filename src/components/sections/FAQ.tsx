"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Reveal from "@/components/ui/Reveal";
import { BRAND } from "@/lib/constants";

const faqs = [
  {
    question: "What makes Miniature different?",
    answer:
      "We stay intentionally small and senior. That keeps the work close to the craft and the decisions close to the outcome.",
  },
  {
    question: "Do you work with early-stage teams?",
    answer:
      "Yes. We help founders translate vision into a product system they can scale with confidence.",
  },
  {
    question: "How does a typical engagement start?",
    answer:
      "A short audit call, then a defined scope with clear deliverables and timelines.",
  },
];

export default function FAQ() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section className="py-20">
      <Reveal>
        <Container className="max-w-4xl">
          <Heading as="h2" size="md">
            FAQ
          </Heading>
          <div className="mt-8 space-y-4">
            {faqs.map((item, index) => {
              const isOpen = active === index;
              return (
                <button
                  key={item.question}
                  type="button"
                  onClick={() => setActive(isOpen ? null : index)}
                  className="w-full rounded-3xl border border-white/10 bg-white/5 p-6 text-left transition hover:border-white/30"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">
                      {item.question}
                    </h3>
                    <span className="text-xs tracking-[0.3em] text-white/40 uppercase">
                      {isOpen ? "Close" : "Open"}
                    </span>
                  </div>
                  {isOpen ? (
                    <p className="mt-3 text-white/70">{item.answer}</p>
                  ) : null}
                </button>
              );
            })}
          </div>
          <p className="mt-6 text-sm text-white/60">
            If you have a sharper question, email us at{" "}
            <a href={`mailto:${BRAND.email}`} className="text-white">
              {BRAND.email}
            </a>
            .
          </p>
        </Container>
      </Reveal>
    </section>
  );
}
