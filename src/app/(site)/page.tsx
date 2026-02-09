import Hero from "@/components/hero/Hero";
import TheProblem from "@/components/sections/TheProblem";
import TheReframe from "@/components/sections/TheReframe";
import SelectedWork from "@/components/sections/SelectedWork";
import HowItWorks from "@/components/sections/HowItWorks";
import PeopleTeaser from "@/components/sections/PeopleTeaser";
import EngagementModels from "@/components/sections/EngagementModels";
import { getPageBySlug } from "@/lib/cms";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import Container from "@/components/ui/Container";

export const revalidate = 60;

export default async function HomePage() {
  const page = await getPageBySlug("home");

  return (
    <div className="bg-bg overflow-hidden">
      {/* Chapter 1: Cold Open (Hero) */}
      <Hero />

      {page && page.blocks.length > 0 ? (
        // CMS-driven content takes over if blocks exist
        <Container className="py-20">
          <BlockRenderer blocks={page.blocks} />
        </Container>
      ) : (
        // Default 7-chapter narrative structure
        <>
          {/* Chapter 2: The Problem (tension) */}
          <TheProblem />

          {/* Chapter 3: The Reframe (taste) */}
          <TheReframe />

          {/* Chapter 4: Selected Work (proof-first) */}
          <SelectedWork />

          {/* Chapter 5: How We Work (risk removal) */}
          <HowItWorks />

          {/* Chapter 6: People of Miniature */}
          <PeopleTeaser />

          {/* Chapter 7: Engagement Models + Closing CTA */}
          <EngagementModels />
        </>
      )}
    </div>
  );
}
