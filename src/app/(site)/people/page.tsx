"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { Lock, ShieldCheck, Sparkles, Users } from "lucide-react";

// Mock Roster Data (replace with DB fetch later)
const roster = [
  {
    role: "Staff Product Designer",
    domain: "Fintech",
    level: "L6",
    tags: ["Systems", "React"],
  },
  {
    role: "Head of Growth",
    domain: "B2B SaaS",
    level: "VP",
    tags: ["Activation", "PLG"],
  },
  {
    role: "Senior Brand Designer",
    domain: "Consumer",
    level: "L5",
    tags: ["Motion", "3D"],
  },
  {
    role: "Principal Engineer",
    domain: "AI Infra",
    level: "L7",
    tags: ["Python", "Rust"],
  },
  {
    role: "Design Engineer",
    domain: "Web3",
    level: "L5",
    tags: ["Creative Dev", "WebGL"],
  },
  {
    role: "UX Researcher",
    domain: "Healthtech",
    level: "L5",
    tags: ["Qual", "Strategy"],
  },
];

type FormPath = "none" | "company" | "consultant";

export default function PeoplePage() {
  const [activePath, setActivePath] = useState<FormPath>("none");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission - in production, this would call a server action
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="bg-bg min-h-screen pt-32 pb-24">
      {/* Hero */}
      <section className="mb-24">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="chapter-label mb-6 block">The Network</span>
              <Heading as="h1" size="lg" className="text-paper mb-8">
                People of{" "}
                <span className="text-editorial text-muted">Miniature.</span>
              </Heading>
              <p className="text-muted mx-auto mb-6 max-w-2xl text-lg leading-relaxed font-light md:text-xl">
                A private bench of specialists we trust—brought in when it makes
                the work more correct.
              </p>
              <p className="text-dim mx-auto max-w-lg text-sm">
                We only invite specialists when there's a strong fit. Every
                connection is intentional, consent-driven, and
                confidentiality-first.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Two Paths Selection */}
      {!submitted && activePath === "none" && (
        <section className="mb-24">
          <Container>
            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
              {/* For Companies */}
              <button
                onClick={() => setActivePath("company")}
                className="group border-border hover:border-accent-cyan/30 focus-ring rounded-2xl border bg-white/[0.02] p-8 text-left transition-all duration-300 hover:bg-white/[0.04]"
              >
                <div className="bg-accent-cyan/10 text-accent-cyan group-hover:bg-accent-cyan/20 mb-6 flex h-12 w-12 items-center justify-center rounded-full transition-colors">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h2 className="text-paper mb-3 text-xl font-semibold">
                  For Companies
                </h2>
                <p className="text-muted mb-6 font-light">
                  Request a specialist to augment your team. We match you with
                  trusted practitioners from leading teams who fit your specific
                  needs.
                </p>
                <span className="text-accent-cyan text-xs tracking-[0.2em] uppercase">
                  Request a specialist →
                </span>
              </button>

              {/* For Consultants */}
              <button
                onClick={() => setActivePath("consultant")}
                className="group border-border hover:border-accent-magenta/30 focus-ring rounded-2xl border bg-white/[0.02] p-8 text-left transition-all duration-300 hover:bg-white/[0.04]"
              >
                <div className="bg-accent-magenta/10 text-accent-magenta group-hover:bg-accent-magenta/20 mb-6 flex h-12 w-12 items-center justify-center rounded-full transition-colors">
                  <Users className="h-5 w-5" />
                </div>
                <h2 className="text-paper mb-3 text-xl font-semibold">
                  For Consultants
                </h2>
                <p className="text-muted mb-6 font-light">
                  Join the bench. Paid consulting hours, flexible engagement,
                  and privacy-first. We respect your constraints and current
                  employment.
                </p>
                <span className="text-accent-magenta text-xs tracking-[0.2em] uppercase">
                  Join the bench →
                </span>
              </button>
            </div>

            {/* Trust indicators */}
            <div className="text-dim mt-12 flex flex-wrap justify-center gap-8 text-xs">
              <div className="flex items-center gap-2">
                <Lock className="h-3.5 w-3.5" />
                <span>Confidentiality-first</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Consent-driven visibility</span>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Company Form */}
      {!submitted && activePath === "company" && (
        <section className="mb-24">
          <Container>
            <div className="mx-auto max-w-2xl">
              <button
                onClick={() => setActivePath("none")}
                className="text-muted hover:text-paper mb-8 text-xs tracking-[0.2em] uppercase transition-colors"
              >
                ← Back
              </button>

              <div className="border-border rounded-2xl border bg-white/[0.02] p-8">
                <h2 className="text-paper mb-2 text-2xl font-semibold">
                  Request a Specialist
                </h2>
                <p className="text-muted mb-8 font-light">
                  Tell us about your needs. We&apos;ll match you with the right
                  person from our bench.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="text-dim mb-2 block text-xs tracking-[0.15em] uppercase">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        required
                        className="border-border text-paper placeholder:text-dim focus:border-accent-cyan/50 w-full rounded-lg border bg-white/[0.03] px-4 py-3 transition-colors focus:outline-none"
                        placeholder="Your company name"
                      />
                    </div>
                    <div>
                      <label className="text-dim mb-2 block text-xs tracking-[0.15em] uppercase">
                        Domain
                      </label>
                      <input
                        type="text"
                        name="domain"
                        required
                        className="border-border text-paper placeholder:text-dim focus:border-accent-cyan/50 w-full rounded-lg border bg-white/[0.03] px-4 py-3 transition-colors focus:outline-none"
                        placeholder="e.g., Fintech, SaaS, Healthcare"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-dim mb-2 block text-xs tracking-[0.15em] uppercase">
                      Problem / Role Needed
                    </label>
                    <textarea
                      name="problem"
                      required
                      rows={3}
                      className="border-border text-paper placeholder:text-dim focus:border-accent-cyan/50 w-full resize-none rounded-lg border bg-white/[0.03] px-4 py-3 transition-colors focus:outline-none"
                      placeholder="Describe the problem you're solving or the role you need"
                    />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="text-dim mb-2 block text-xs tracking-[0.15em] uppercase">
                        Timeline
                      </label>
                      <select
                        name="timeline"
                        required
                        className="border-border text-paper focus:border-accent-cyan/50 w-full rounded-lg border bg-white/[0.03] px-4 py-3 transition-colors focus:outline-none"
                      >
                        <option value="">Select timeline</option>
                        <option value="immediate">Immediate (this week)</option>
                        <option value="soon">Soon (2-4 weeks)</option>
                        <option value="planning">Planning phase</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-dim mb-2 block text-xs tracking-[0.15em] uppercase">
                        Budget Range
                      </label>
                      <select
                        name="budget"
                        required
                        className="border-border text-paper focus:border-accent-cyan/50 w-full rounded-lg border bg-white/[0.03] px-4 py-3 transition-colors focus:outline-none"
                      >
                        <option value="">Select budget</option>
                        <option value="3-5k">$3k - $5k</option>
                        <option value="5-10k">$5k - $10k</option>
                        <option value="10-25k">$10k - $25k</option>
                        <option value="25k+">$25k+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-dim mb-2 block text-xs tracking-[0.15em] uppercase">
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="border-border text-paper placeholder:text-dim focus:border-accent-cyan/50 w-full rounded-lg border bg-white/[0.03] px-4 py-3 transition-colors focus:outline-none"
                      placeholder="you@company.com"
                    />
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting ? "Submitting..." : "Request a Specialist"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Consultant Form */}
      {!submitted && activePath === "consultant" && (
        <section className="mb-24">
          <Container>
            <div className="mx-auto max-w-2xl">
              <button
                onClick={() => setActivePath("none")}
                className="text-muted hover:text-paper mb-8 text-xs tracking-[0.2em] uppercase transition-colors"
              >
                ← Back
              </button>

              <div className="border-border rounded-2xl border bg-white/[0.02] p-8">
                <h2 className="text-paper mb-2 text-2xl font-semibold">
                  Join the Bench
                </h2>
                <p className="text-muted mb-8 font-light">
                  Tell us about yourself. We&apos;ll reach out when there&apos;s
                  a strong fit.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="text-dim mb-2 block text-xs tracking-[0.15em] uppercase">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="border-border text-paper placeholder:text-dim focus:border-accent-magenta/50 w-full rounded-lg border bg-white/[0.03] px-4 py-3 transition-colors focus:outline-none"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="text-dim mb-2 block text-xs tracking-[0.15em] uppercase">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="border-border text-paper placeholder:text-dim focus:border-accent-magenta/50 w-full rounded-lg border bg-white/[0.03] px-4 py-3 transition-colors focus:outline-none"
                        placeholder="you@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="text-dim mb-2 block text-xs tracking-[0.15em] uppercase">
                        Role
                      </label>
                      <input
                        type="text"
                        name="role"
                        required
                        className="border-border text-paper placeholder:text-dim focus:border-accent-magenta/50 w-full rounded-lg border bg-white/[0.03] px-4 py-3 transition-colors focus:outline-none"
                        placeholder="e.g., Staff Designer, Principal Engineer"
                      />
                    </div>
                    <div>
                      <label className="text-dim mb-2 block text-xs tracking-[0.15em] uppercase">
                        Domain
                      </label>
                      <input
                        type="text"
                        name="domain"
                        required
                        className="border-border text-paper placeholder:text-dim focus:border-accent-magenta/50 w-full rounded-lg border bg-white/[0.03] px-4 py-3 transition-colors focus:outline-none"
                        placeholder="e.g., Fintech, AI, Consumer"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="text-dim mb-2 block text-xs tracking-[0.15em] uppercase">
                        Years of Experience
                      </label>
                      <select
                        name="years"
                        required
                        className="border-border text-paper focus:border-accent-magenta/50 w-full rounded-lg border bg-white/[0.03] px-4 py-3 transition-colors focus:outline-none"
                      >
                        <option value="">Select experience</option>
                        <option value="3-5">3-5 years</option>
                        <option value="5-8">5-8 years</option>
                        <option value="8-12">8-12 years</option>
                        <option value="12+">12+ years</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-dim mb-2 block text-xs tracking-[0.15em] uppercase">
                        LinkedIn
                      </label>
                      <input
                        type="url"
                        name="linkedin"
                        className="border-border text-paper placeholder:text-dim focus:border-accent-magenta/50 w-full rounded-lg border bg-white/[0.03] px-4 py-3 transition-colors focus:outline-none"
                        placeholder="linkedin.com/in/..."
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="text-dim mb-2 block text-xs tracking-[0.15em] uppercase">
                        Timezone
                      </label>
                      <input
                        type="text"
                        name="timezone"
                        required
                        className="border-border text-paper placeholder:text-dim focus:border-accent-magenta/50 w-full rounded-lg border bg-white/[0.03] px-4 py-3 transition-colors focus:outline-none"
                        placeholder="e.g., PST, EST, GMT+5:30"
                      />
                    </div>
                    <div>
                      <label className="text-dim mb-2 block text-xs tracking-[0.15em] uppercase">
                        Availability
                      </label>
                      <select
                        name="availability"
                        required
                        className="border-border text-paper focus:border-accent-magenta/50 w-full rounded-lg border bg-white/[0.03] px-4 py-3 transition-colors focus:outline-none"
                      >
                        <option value="">Select availability</option>
                        <option value="5-10">5-10 hrs/week</option>
                        <option value="10-20">10-20 hrs/week</option>
                        <option value="20+">20+ hrs/week</option>
                        <option value="project">Project-based only</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-dim mb-2 block text-xs tracking-[0.15em] uppercase">
                      Hourly Rate Range
                    </label>
                    <select
                      name="rate"
                      required
                      className="border-border text-paper focus:border-accent-magenta/50 w-full rounded-lg border bg-white/[0.03] px-4 py-3 transition-colors focus:outline-none"
                    >
                      <option value="">Select rate range</option>
                      <option value="100-150">$100 - $150/hr</option>
                      <option value="150-200">$150 - $200/hr</option>
                      <option value="200-300">$200 - $300/hr</option>
                      <option value="300+">$300+/hr</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-dim mb-2 block text-xs tracking-[0.15em] uppercase">
                      Notes (optional)
                    </label>
                    <textarea
                      name="notes"
                      rows={3}
                      className="border-border text-paper placeholder:text-dim focus:border-accent-magenta/50 w-full resize-none rounded-lg border bg-white/[0.03] px-4 py-3 transition-colors focus:outline-none"
                      placeholder="Anything else we should know? Constraints, preferences, etc."
                    />
                  </div>

                  <div className="border-border text-dim rounded-lg border bg-white/[0.02] p-4 text-sm">
                    <p>
                      We respect employment contracts and non-competes. Your
                      information is kept confidential, and we&apos;ll only
                      reach out when there&apos;s a genuine fit.
                    </p>
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting ? "Submitting..." : "Join the Bench"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Success State */}
      {submitted && (
        <section className="mb-24">
          <Container>
            <div className="border-accent-cyan/30 bg-accent-cyan/5 mx-auto max-w-lg rounded-2xl border p-12 text-center">
              <div className="bg-accent-cyan/20 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
                <ShieldCheck className="text-accent-cyan h-8 w-8" />
              </div>
              <h2 className="text-paper mb-4 text-2xl font-semibold">
                Thank you
              </h2>
              <p className="text-muted mb-8">
                We&apos;ve received your submission. We&apos;ll be in touch when
                there&apos;s a strong fit.
              </p>
              <Button href="/" variant="ghost">
                Back to home
              </Button>
            </div>
          </Container>
        </section>
      )}

      {/* Roster Preview - show when no form is active */}
      {activePath === "none" && !submitted && (
        <section className="mb-24">
          <Container>
            <div className="mb-12 flex items-end justify-between">
              <div>
                <h2 className="text-paper text-xl font-semibold">
                  Roster Preview
                </h2>
                <p className="text-dim mt-2 text-sm">
                  A sample of the profiles we trust.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {roster.map((member, i) => (
                <div
                  key={i}
                  className="group border-border hover:border-border-hover rounded-2xl border bg-white/[0.02] p-6 transition-all duration-300 hover:bg-white/[0.04]"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="group-hover:from-accent-cyan/20 h-10 w-10 rounded-full bg-gradient-to-br from-white/10 to-transparent transition-colors" />
                    <span className="text-dim border-border rounded-full border px-2 py-1 text-[10px] tracking-wider uppercase">
                      {member.level}
                    </span>
                  </div>
                  <h3 className="text-paper text-sm font-medium transition-colors group-hover:text-white">
                    {member.role}
                  </h3>
                  <p className="text-muted mt-1 mb-4 text-xs">
                    {member.domain}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {member.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-dim rounded bg-white/5 px-1.5 py-0.5 text-[9px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Trust Note */}
      <section>
        <Container>
          <div className="border-border mx-auto max-w-2xl rounded-2xl border bg-white/[0.02] p-8 text-center">
            <p className="text-muted text-sm">
              &quot;We only facilitate aligned collaborations. We never ask for
              confidential info, and we always respect your primary
              employment.&quot;
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}
