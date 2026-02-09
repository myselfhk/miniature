import Link from "next/link";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Reveal from "@/components/ui/Reveal";
import WorkCardEnhanced from "@/components/work/WorkCardEnhanced";
import { getWorkItems } from "@/lib/prismic";

// Featured case studies order - fallback if slugs not found
const FEATURED_ORDER = ["optty", "change-wealth", "feedo"];

export default async function SelectedWork() {
  const items = await getWorkItems();

  // Sort items by featured order, then show rest
  const orderedItems = [...items].sort((a, b) => {
    const aIndex = FEATURED_ORDER.indexOf(a.uid);
    const bIndex = FEATURED_ORDER.indexOf(b.uid);

    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return 0;
  });

  const featured = orderedItems.slice(0, 3); // Show 3 featured items

  return (
    <section className="chapter bg-bg relative py-32">
      {/* Subtle accent glow */}
      <div className="bg-accent-magenta/5 pointer-events-none absolute top-0 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full blur-[150px]" />

      <Reveal>
        <Container className="relative z-10">
          {/* Chapter label */}
          <span className="chapter-label mb-8 block text-center">
            Selected Work
          </span>

          {/* Section header */}
          <div className="mb-16 text-center">
            <Heading as="h2" size="lg" className="text-paper mb-6">
              Proof, not promises.
            </Heading>
            <p className="text-muted mx-auto max-w-xl text-lg font-light">
              Outcomes over outputs. Each project tells a story of decisions
              made with care.
            </p>
          </div>

          {/* Editorial portfolio grid */}
          <div className="grid gap-8 lg:gap-10">
            {featured.map((item, index) => (
              <WorkCardEnhanced
                key={item.uid}
                item={item}
                priority={index === 0}
                index={index}
              />
            ))}
          </div>

          {/* View all link */}
          <div className="mt-16 text-center">
            <Link
              href="/work"
              className="group text-muted hover:text-paper inline-flex items-center gap-3 text-xs tracking-[0.25em] uppercase transition-colors duration-300"
            >
              <span>View all work</span>
              <span className="bg-border group-hover:bg-paper/50 block h-[1px] w-8 transition-all duration-300 group-hover:w-12" />
            </Link>
          </div>
        </Container>
      </Reveal>
    </section>
  );
}
