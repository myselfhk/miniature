import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";

const tiers = [
  {
    title: "Focused Sprint",
    detail: "2-4 weeks · ideal for audits, strategy, rapid prototyping.",
    includes: ["Narrative + roadmap", "UX/UI direction", "Rapid iteration"],
  },
  {
    title: "Product Partnership",
    detail: "Monthly · steady cadence for product teams.",
    includes: ["Design ops", "Design system evolution", "Key flow delivery"],
  },
  {
    title: "Launch Support",
    detail: "Flexible · for releases and upgrades.",
    includes: ["Production polish", "Performance review", "Launch assets"],
  },
];

export default function Pricing() {
  return (
    <section className="py-20">
      <Reveal>
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-xs tracking-[0.35em] text-white/50 uppercase">
              Engagement
            </p>
            <Heading as="h2" size="md" className="mt-4">
              Pricing built on clarity.
            </Heading>
            <p className="mt-4 text-white/70">
              We scope work around outcomes, response times, and the level of
              senior focus required. No surprises—just clear boundaries and
              momentum.
            </p>
          </div>
          <div className="space-y-6">
            {tiers.map((tier) => (
              <Card key={tier.title} className="p-6">
                <h3 className="text-xl font-semibold text-white">
                  {tier.title}
                </h3>
                <p className="mt-2 text-sm text-white/60">{tier.detail}</p>
                <ul className="mt-4 space-y-2 text-sm text-white/70">
                  {tier.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="mt-4 text-xs tracking-[0.3em] text-white/40 uppercase">
                  Starting at: by scope
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Reveal>
    </section>
  );
}
