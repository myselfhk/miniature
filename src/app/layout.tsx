import type { Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "../styles/globals.css";
import Toaster from "@/components/admin/ui/toaster";
import { ToastStateProvider } from "@/components/admin/hooks/use-toast";
import SmoothScroll from "@/components/layout/SmoothScroll";
import PageTransition from "@/components/layout/PageTransition";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const hostGrotesk = Host_Grotesk({
  variable: "--font-host-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const flecha = localFont({
  src: [
    {
      path: "../fonts/Flecha-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/Flecha-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
  ],
  variable: "--font-flecha",
});

export const metadata: Metadata = {
  title: "Miniature",
  description:
    "Global design company. We build products that matter—with taste, clarity, and care.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${hostGrotesk.variable} ${flecha.variable} bg-bg text-text selection:bg-accent-magenta/30 antialiased selection:text-white`}
      >
        <ToastStateProvider>
          <SmoothScroll>
            <Navbar />
            <PageTransition>
              <main className="min-h-screen">{children}</main>
            </PageTransition>
            <Footer />
          </SmoothScroll>
          <Toaster />
        </ToastStateProvider>
      </body>
    </html>
  );
}
