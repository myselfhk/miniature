import type { Metadata } from "next";
import { BRAND } from "./constants";

export const buildMetadata = (overrides?: Metadata): Metadata => ({
  title: {
    default: BRAND.name,
    template: `%s · ${BRAND.name}`,
  },
  description:
    "Miniature is a premium creative house crafting timeless product experiences.",
  metadataBase: new URL("https://miniature.studio"),
  openGraph: {
    title: BRAND.name,
    description:
      "Miniature is a premium creative house crafting timeless product experiences.",
    images: ["/brand/og.png"],
    type: "website",
  },
  ...overrides,
});
