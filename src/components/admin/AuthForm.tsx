"use client";

import { useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";
import { Input } from "@/components/admin/ui/input";
import { Button } from "@/components/admin/ui/button";
import { useToast } from "@/components/admin/hooks/use-toast";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      addToast({ title: "Login failed", description: error.message });
      return;
    }
    addToast({ title: "Welcome back", description: "Signed in successfully." });
    // Force a hard navigation to ensure server-side auth check runs
    window.location.href = "/admin/posts";
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="email"
        required
        placeholder="you@miniature.studio"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        aria-label="Email"
      />
      <Input
        type="password"
        required
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        aria-label="Password"
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Signing in..." : "Login"}
      </Button>
    </form>
  );
}
