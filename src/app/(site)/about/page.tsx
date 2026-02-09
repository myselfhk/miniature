import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";

export default function AboutPage() {
  return (
    <div className="bg-ink-950 pt-28 pb-24">
      <Container className="max-w-4xl">
        <p className="text-xs tracking-[0.35em] text-white/50 uppercase">
          About
        </p>
        <Heading as="h1" size="lg" className="mt-4">
          A founder-led creative house built on culture and craft.
        </Heading>
        <p className="mt-6 text-lg text-white/70">
          Miniature is a premium creative house partnering with teams who care
          about the details. We shape product strategy, brand systems, and
          digital experiences that feel timeless, deliberate, and quietly
          confident.
        </p>
        <p className="mt-4 text-white/70">
          We stay small by choice so every engagement is hands-on. That means
          fewer layers, faster decisions, and a deeper focus on the outcomes
          that matter.
        </p>
      </Container>
    </div>
  );
}
