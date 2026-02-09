import Link from "next/link";
import Container from "@/components/ui/Container";
import { BRAND, SOCIALS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12">
      <Container className="grid gap-8 text-sm text-white/70 md:grid-cols-[1.2fr_1fr_1fr] md:items-center">
        <div className="space-y-3">
          <p className="text-white">{BRAND.name}</p>
          <p>Your product deserves taste. Let’s talk.</p>
          <p className="text-white/60">Coffee is always on us.</p>
          <a href={`mailto:${BRAND.email}`} className="text-white">
            {BRAND.email}
          </a>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/about" className="hover:text-white">
            About
          </Link>
          <Link href="/blog" className="hover:text-white">
            Blog
          </Link>
          <Link href="/start-a-project" className="hover:text-white">
            Start a project
          </Link>
        </div>
        <div className="flex items-center gap-5">
          {SOCIALS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              {social.label}
            </a>
          ))}
        </div>
      </Container>
    </footer>
  );
}
