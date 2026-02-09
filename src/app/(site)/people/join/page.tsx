import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import ApplicationForm from "@/components/people/ApplicationForm";

export const metadata = {
  title: "Join People of Miniature",
  description: "Apply to the consultant network.",
};

export default function JoinPeoplePage() {
  return (
    <div className="bg-ink-950 pt-32 pb-24 md:pt-48">
      <Container className="max-w-2xl">
        <div className="mb-12 space-y-6">
          <p className="text-xs tracking-[0.35em] text-white/50 uppercase">
            Application
          </p>
          <Heading as="h1" size="md">
            Join the network.
          </Heading>
          <p className="text-white/60">
            This is a quiet list. We don&apos;t spam. We only reach out when a
            project matches your specific expertise perfectly.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12">
          <ApplicationForm />
        </div>
      </Container>
    </div>
  );
}
