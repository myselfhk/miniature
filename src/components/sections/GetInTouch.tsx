import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import { BRAND } from "@/lib/constants";
import Reveal from "@/components/ui/Reveal";

export default function GetInTouch() {
  return (
    <section className="py-20">
      <Reveal>
        <Container className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
          <Heading as="h2" size="md">
            Let’s build something timeless.
          </Heading>
          <p className="mt-3 text-sm tracking-[0.35em] text-white/40 uppercase">
            Tell us what you’re building. We’ll tell you the fastest path to
            make it timeless.
          </p>
          <p className="mt-4 text-white/70">
            Prefer async? Send the deck request and we’ll follow up.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href="/start-a-project">Start a project</Button>
            <Button
              href={`mailto:${BRAND.email}?subject=Miniature%20Deck%20Request`}
              variant="ghost"
            >
              Request the deck
            </Button>
          </div>
        </Container>
      </Reveal>
    </section>
  );
}
