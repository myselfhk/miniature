import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";

const experiments = [
  {
    title: "Chromatic Retail Lab",
    year: "2025",
    description: "Exploring tactility in digital storefronts.",
    format: "Concept",
  },
  {
    title: "Archive of Light",
    year: "2024",
    description: "A cinematic editorial system for cultural archives.",
    format: "Story",
  },
  {
    title: "Quiet Commerce",
    year: "2023",
    description: "Minimal UI experiments for luxury checkout flows.",
    format: "Prototype",
  },
];

export default function ArchivePage() {
  return (
    <div className="bg-ink-950 pt-28 pb-24">
      <Container>
        <div className="space-y-4">
          <p className="text-xs tracking-[0.35em] text-white/50 uppercase">
            Archive
          </p>
          <Heading as="h1" size="lg">
            Experiments and cultural explorations.
          </Heading>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {experiments.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <div className="flex items-center justify-between text-xs tracking-[0.3em] text-white/50 uppercase">
                <span>{item.year}</span>
                <span>{item.format}</span>
              </div>
              <h3 className="mt-2 text-xl font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-white/70">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <Button href="/start-a-project" variant="ghost">
            Request full portfolio
          </Button>
        </div>
      </Container>
    </div>
  );
}
