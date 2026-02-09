"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import { BRAND } from "@/lib/constants";

const initialForm = {
  name: "",
  email: "",
  company: "",
  project: "",
  timeline: "",
  budget: "",
  links: "",
};

export default function StartProjectPage() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const body = `Name: ${form.name}
Email: ${form.email}
Company: ${form.company}
Project: ${form.project}
Timeline: ${form.timeline}
Budget: ${form.budget}
Links: ${form.links}`;

    const mailto = `mailto:${BRAND.email}?subject=Miniature%20Project%20Intake&body=${encodeURIComponent(
      body,
    )}`;
    window.location.href = mailto;
    setSubmitted(true);
  };

  return (
    <div className="bg-ink-950 pt-28 pb-24">
      <Container className="max-w-4xl">
        <p className="text-xs tracking-[0.35em] text-white/50 uppercase">
          Start a project
        </p>
        <Heading as="h1" size="lg" className="mt-4">
          Tell us what you are building.
        </Heading>
        <p className="mt-4 text-white/70">
          Quick commerce takes 10 minutes. I just need 8.
        </p>

        <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-6 md:grid-cols-2">
            <input
              className="rounded-2xl border border-white/15 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40"
              placeholder="Name"
              aria-label="Name"
              value={form.name}
              onChange={(event) => handleChange("name", event.target.value)}
              required
            />
            <input
              type="email"
              className="rounded-2xl border border-white/15 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40"
              placeholder="Email"
              aria-label="Email"
              value={form.email}
              onChange={(event) => handleChange("email", event.target.value)}
              required
            />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <input
              className="rounded-2xl border border-white/15 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40"
              placeholder="Company"
              aria-label="Company"
              value={form.company}
              onChange={(event) => handleChange("company", event.target.value)}
            />
            <input
              className="rounded-2xl border border-white/15 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40"
              placeholder="Timeline"
              aria-label="Timeline"
              value={form.timeline}
              onChange={(event) => handleChange("timeline", event.target.value)}
            />
          </div>
          <textarea
            className="min-h-[140px] w-full rounded-2xl border border-white/15 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40"
            placeholder="What are you building?"
            aria-label="What are you building"
            value={form.project}
            onChange={(event) => handleChange("project", event.target.value)}
            required
          />
          <div className="grid gap-6 md:grid-cols-2">
            <input
              className="rounded-2xl border border-white/15 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40"
              placeholder="Budget range"
              aria-label="Budget range"
              value={form.budget}
              onChange={(event) => handleChange("budget", event.target.value)}
            />
            <input
              className="rounded-2xl border border-white/15 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40"
              placeholder="Links"
              aria-label="Links"
              value={form.links}
              onChange={(event) => handleChange("links", event.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <Button type="submit">Send intake</Button>
            {submitted ? (
              <span className="text-sm text-white/60">
                Thanks — we will be in touch shortly.
              </span>
            ) : null}
          </div>
        </form>
      </Container>
    </div>
  );
}
