"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { submitConsultantApplication } from "@/lib/actions/people";
import Heading from "@/components/ui/Heading";
import { CheckCircle2, Loader2 } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-paper text-ink w-full rounded-full py-4 text-xs font-medium tracking-widest uppercase transition-transform hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
    >
      {pending ? (
        <span className="flex items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" /> Sending...
        </span>
      ) : (
        "Join the Roster"
      )}
    </button>
  );
}

export default function ApplicationForm() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function clientAction(formData: FormData) {
    setError(null);
    const result = await submitConsultantApplication(formData);
    if (result.error) {
      setError("Please check your inputs and try again.");
    } else {
      setSuccess(true);
    }
  }

  if (success) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
        <div className="bg-accent-cyan/10 text-accent-cyan mb-6 rounded-full p-4">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <Heading as="h2" size="md">
          Thanks. No pressure.
        </Heading>
        <p className="text-muted mt-4 max-w-md">
          We’ll reach out when the right project comes. You’ve been added to our
          quiet list.
        </p>
      </div>
    );
  }

  return (
    <form action={clientAction} className="space-y-8">
      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-dim text-xs tracking-widest uppercase">
            Name
          </label>
          <input
            name="name"
            required
            className="text-paper w-full rounded-xl border border-white/10 bg-white/5 p-4 placeholder:text-white/20 focus:border-white/30 focus:outline-none"
            placeholder="Jane Doe"
          />
        </div>
        <div className="space-y-2">
          <label className="text-dim text-xs tracking-widest uppercase">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            className="text-paper w-full rounded-xl border border-white/10 bg-white/5 p-4 placeholder:text-white/20 focus:border-white/30 focus:outline-none"
            placeholder="jane@example.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-dim text-xs tracking-widest uppercase">
          LinkedIn / Portfolio
        </label>
        <input
          name="linkedin"
          className="text-paper w-full rounded-xl border border-white/10 bg-white/5 p-4 placeholder:text-white/20 focus:border-white/30 focus:outline-none"
          placeholder="linkedin.com/in/..."
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-dim text-xs tracking-widest uppercase">
            Role Title
          </label>
          <input
            name="role"
            required
            className="text-paper w-full rounded-xl border border-white/10 bg-white/5 p-4 placeholder:text-white/20 focus:border-white/30 focus:outline-none"
            placeholder="Product Designer"
          />
        </div>
        <div className="space-y-2">
          <label className="text-dim text-xs tracking-widest uppercase">
            Domain
          </label>
          <select
            name="domain"
            className="text-paper w-full appearance-none rounded-xl border border-white/10 bg-white/5 p-4 focus:border-white/30 focus:outline-none"
          >
            <option value="Design" className="bg-ink">
              Design
            </option>
            <option value="Engineering" className="bg-ink">
              Engineering
            </option>
            <option value="Product" className="bg-ink">
              Product
            </option>
            <option value="Growth" className="bg-ink">
              Growth
            </option>
            <option value="Strategy" className="bg-ink">
              Strategy
            </option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-dim text-xs tracking-widest uppercase">
          Location
        </label>
        <input
          name="location"
          className="text-paper w-full rounded-xl border border-white/10 bg-white/5 p-4 placeholder:text-white/20 focus:border-white/30 focus:outline-none"
          placeholder="New York, Remote, etc."
        />
      </div>

      <div className="space-y-2">
        <label className="text-dim text-xs tracking-widest uppercase">
          Availability
        </label>
        <select
          name="availability"
          className="text-paper w-full appearance-none rounded-xl border border-white/10 bg-white/5 p-4 focus:border-white/30 focus:outline-none"
        >
          <option value="occasional" className="bg-ink">
            Occasional (1-2 hours/week)
          </option>
          <option value="project" className="bg-ink">
            Project-based (10+ hours)
          </option>
          <option value="unavailable" className="bg-ink">
            Currently unavailable (just joining list)
          </option>
        </select>
      </div>

      <div className="space-y-4 pt-4">
        <label className="text-dim text-xs tracking-widest uppercase">
          Visibility Preference
        </label>
        <div className="grid gap-4 md:grid-cols-3">
          <label className="cursor-pointer rounded-xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">
            <input
              type="radio"
              name="visibility_preference"
              value="anonymous"
              defaultChecked
              className="accent-paper mb-2 block"
            />
            <span className="block text-sm font-medium">Anonymous</span>
            <span className="text-dim text-xs">
              Only revealed to client after you accept.
            </span>
          </label>
          <label className="cursor-pointer rounded-xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">
            <input
              type="radio"
              name="visibility_preference"
              value="first-name-only"
              className="accent-paper mb-2 block"
            />
            <span className="block text-sm font-medium">First Name</span>
            <span className="text-dim text-xs">
              &quot;Jane, Product Designer&quot;
            </span>
          </label>
          <label className="cursor-pointer rounded-xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">
            <input
              type="radio"
              name="visibility_preference"
              value="public"
              className="accent-paper mb-2 block"
            />
            <span className="block text-sm font-medium">Public</span>
            <span className="text-dim text-xs">Okay to list on site.</span>
          </label>
        </div>
      </div>

      <div className="space-y-2 pt-4">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="compliance_confirmed"
            required
            className="accent-paper mt-1"
          />
          <span className="text-muted text-sm">
            I confirm I will not share confidential information and I’m allowed
            to take on outside consulting.
          </span>
        </label>
      </div>

      <div className="pt-6">
        <SubmitButton />
      </div>
    </form>
  );
}
