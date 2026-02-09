import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Reveal from "@/components/ui/Reveal";

const points = [
  {
    title: "Strategy",
    desc: "We calibrate taste, then build with clarity. No vague decks.",
  },
  {
    title: "Design",
    desc: "Tools make shipping easy. Taste makes it timeless.",
  },
  {
    title: "Systems",
    desc: "Design that ships. Standards that last.",
  },
];

export default function Approach() {
  return (
    <section className="border-border bg-bg border-t py-32">
      <Container>
        <Reveal>
          <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
            <div className="space-y-6 lg:sticky lg:top-32 lg:h-fit">
              <span className="text-micro text-dim">How we work</span>
              <Heading as="h2" size="md" className="text-text">
                Approach
              </Heading>
              <p className="text-muted max-w-xs text-sm leading-relaxed">
                We’re a small, senior team built for long-term partnerships. We
                work inside your rhythm, raising the bar quietly.
              </p>
            </div>

            <div className="space-y-24">
              {points.map((point, i) => (
                <div
                  key={i}
                  className="border-border group hover:border-teal/50 border-l pl-8 transition-colors duration-500"
                >
                  <h3 className="text-text group-hover:text-teal text-2xl font-medium transition-colors">
                    {point.title}
                  </h3>
                  <p className="text-muted group-hover:text-text mt-4 text-xl leading-relaxed font-light transition-colors">
                    {point.desc}
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
