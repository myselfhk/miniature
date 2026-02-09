import type { ReactNode } from "react";
import Link from "next/link";
import { ToastStateProvider } from "@/components/admin/hooks/use-toast";
import Toaster from "@/components/admin/ui/toaster";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <ToastStateProvider>
      <div className="bg-ink-950 min-h-screen text-white">
        <header className="border-b border-white/10">
          <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6">
            <Link href="/admin" className="text-sm tracking-[0.35em] uppercase">
              Miniature Admin
            </Link>
            <nav className="flex items-center gap-6 text-xs tracking-[0.3em] text-white/60 uppercase">
              <Link href="/admin/pages" className="hover:text-white">
                Pages
              </Link>
              <Link href="/admin/posts" className="hover:text-white">
                Posts
              </Link>
              <Link href="/admin/case-studies" className="hover:text-white">
                Case studies
              </Link>
              <Link href="/admin/applications" className="hover:text-white">
                Inbox
              </Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto w-full max-w-6xl px-6 py-10">{children}</main>
      </div>
      <Toaster />
    </ToastStateProvider>
  );
}
