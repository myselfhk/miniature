"use client";

import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Reveal from "@/components/ui/Reveal";
import { motion } from "framer-motion";
import { useState } from "react";

const principles = [
  {
    title: "Judgment over templates",
    desc: "Templates are fast. Judgment is timeless. We don’t just fill boxes; we question why the box exists.",
  },
  {
    title: "Details that compound",
    desc: "A single interaction won't save a product. But 100 polished details create a feeling of quality that users trust implicitly.",
  },
  {
    title: "Systems that scale beauty",
    desc: "We build design systems that protect the brand's soul while allowing your team to ship at velocity.",
  },
];

export default function TasteSection() {
  const [hovered, setHovered] = useState(false);

  return (
    <section className="bg-ink relative overflow-hidden py-32">
      {/* Background Ambience */}
      <div className="bg-accent-magenta/5 pointer-events-none absolute top-0 right-0 h-[40vw] w-[40vw] rounded-full blur-[150px]" />

      <Container>
        <Reveal>
          <div className="grid gap-20 lg:grid-cols-[1fr_1fr]">
            {/* Left: Manifesto / Hook */}
            <div className="space-y-8">
              <span className="text-micro text-accent-cyan">The Moat</span>
              <Heading as="h2" size="lg" className="text-paper">
                Taste is the <br />
                <span className="text-editorial text-muted">difference.</span>
              </Heading>
              <div className="text-dim max-w-md space-y-6 text-lg leading-relaxed font-light">
                <p>
                  In an era of AI-generated layouts and component libraries,
                  everyone has access to &quot;good enough.&quot;
                </p>
                <p>
                  But users don&apos;t fall in love with &quot;good
                  enough.&quot; They fall in love with point-of-view. You can
                  vibe-code a product, but you can&apos;t vibe-code taste.
                </p>
              </div>

              {/* Interactive "Before/After" Micro-moment */}
              <div
                className="group relative mt-12 cursor-crosshair overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-8"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <div className="from-accent-cyan/10 absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                <div className="relative z-10 space-y-2">
                  <p className="text-dim mb-4 text-xs tracking-widest uppercase">
                    The Difference
                  </p>
                  <div className="relative h-20">
                    <motion.div
                      animate={{
                        opacity: hovered ? 0 : 1,
                        y: hovered ? -10 : 0,
                      }}
                      className="absolute inset-0"
                    >
                      <p className="text-muted font-sans text-xl">
                        &quot;Click here to start.&quot;
                      </p>
                      <p className="text-dim mt-2 font-mono text-xs">
                        Generic. Functional. Forgettable.
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: hovered ? 1 : 0,
                        y: hovered ? 0 : 10,
                      }}
                      className="absolute inset-0"
                    >
                      <p className="font-serif text-xl text-white italic">
                        Start your journey.
                      </p>
                      <p className="text-accent-cyan mt-2 font-mono text-xs">
                        Inviting. Intentional. Branded.
                      </p>
                    </motion.div>
                  </div>
                </div>

                <div className="absolute right-4 bottom-4 text-[10px] tracking-widest text-white/20 uppercase">
                  Hover me
                </div>
              </div>
            </div>

            {/* Right: Principles */}
            <div className="space-y-12 lg:pt-20">
              {principles.map((p, i) => (
                <div key={i} className="group">
                  <div className="mb-3 flex items-baseline gap-4">
                    <span className="text-accent-magenta/50 font-mono text-xs">
                      0{i + 1}
                    </span>
                    <h3 className="text-paper group-hover:text-accent-cyan text-2xl font-medium transition-colors duration-300">
                      {p.title}
                    </h3>
                  </div>
                  <p className="text-muted group-hover:border-accent-cyan/30 border-l border-white/10 py-2 pl-8 leading-relaxed font-light transition-colors duration-300 group-hover:text-white">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
