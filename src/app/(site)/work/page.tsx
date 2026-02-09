import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Pill from "@/components/ui/Pill";
import WorkCard from "@/components/work/WorkCard";
import { getWorkItems } from "@/lib/prismic";

export const revalidate = 300;

export default async function WorkPage() {
  const items = await getWorkItems();

  return (
    <div className="bg-ink-950 pt-28 pb-24">
      <Container>
        <div className="space-y-4">
          <p className="text-xs tracking-[0.35em] text-white/50 uppercase">
            Selected Work
          </p>
          <Heading as="h1" size="lg">
            Crafted outcomes for ambitious teams.
          </Heading>
          <p className="max-w-2xl text-sm text-white/70">
            Product experiences shaped with clarity, taste, and durable systems.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {["All", "Fintech", "B2B", "AI", "Design Systems"].map((label) => (
            <Pill key={label} active={label === "All"}>
              {label}
            </Pill>
          ))}
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {items.map((item) => (
            <WorkCard key={item.uid} item={item} />
          ))}
        </div>
      </Container>
    </div>
  );
}
