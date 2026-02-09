import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";

const proofs = [
  { label: "12+ years", detail: "Founder-led craft" },
  { label: "38% uplift", detail: "Commerce conversion" },
  { label: "Global", detail: "Remote-first delivery" },
  { label: "High-touch", detail: "Small team focus" },
];

export default function ProofBar() {
  return (
    <section className="py-16">
      <Reveal>
        <Container>
          <div className="grid gap-4 md:grid-cols-4">
            {proofs.map((proof) => (
              <Card
                key={proof.label}
                className="p-5 text-center transition hover:-translate-y-1 hover:border-white/30"
              >
                <p className="text-lg font-semibold text-white">
                  {proof.label}
                </p>
                <p className="mt-1 text-xs tracking-[0.3em] text-white/50 uppercase">
                  {proof.detail}
                </p>
              </Card>
            ))}
          </div>
          <p className="mt-6 text-center text-xs tracking-[0.35em] text-white/40 uppercase">
            Quiet proof. Real outcomes.
          </p>
        </Container>
      </Reveal>
    </section>
  );
}
