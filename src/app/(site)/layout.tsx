import type { ReactNode } from "react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import PageTransition from "@/components/layout/PageTransition";
import RevealLoader from "@/components/layout/RevealLoader";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata();

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <RevealLoader />
      <Navbar />
      <PageTransition>{children}</PageTransition>
      <Footer />
    </>
  );
}
