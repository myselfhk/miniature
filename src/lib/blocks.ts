import { z } from "zod";

export const headingBlockSchema = z.object({
  type: z.literal("heading"),
  level: z.union([z.literal(2), z.literal(3)]),
  text: z.string().min(1),
});

export const paragraphBlockSchema = z.object({
  type: z.literal("paragraph"),
  text: z.string().min(1),
});

export const imageBlockSchema = z.object({
  type: z.literal("image"),
  path: z.string().min(1),
  alt: z.string().optional(),
  caption: z.string().optional(),
});

export const quoteBlockSchema = z.object({
  type: z.literal("quote"),
  text: z.string().min(1),
});

export const bulletListBlockSchema = z.object({
  type: z.literal("bullet_list"),
  items: z.array(z.string().min(1)),
});

export const dividerBlockSchema = z.object({
  type: z.literal("divider"),
});

export const calloutBlockSchema = z.object({
  type: z.literal("callout"),
  text: z.string().min(1),
});

export const ctaBlockSchema = z.object({
  type: z.literal("cta"),
  label: z.string().min(1),
  href: z.string().min(1),
});

export const metricsGridBlockSchema = z.object({
  type: z.literal("metrics_grid"),
  metrics: z.array(
    z.object({
      value: z.string().min(1),
      label: z.string().min(1),
    }),
  ),
});

export const workCardBlockSchema = z.object({
  type: z.literal("work_card"),
  case_study_id: z.string().min(1),
});

export const pricingCardBlockSchema = z.object({
  type: z.literal("pricing_card"),
  title: z.string().min(1),
  price: z.string().min(1),
  features: z.array(z.string()),
  cta_label: z.string(),
  cta_href: z.string(),
});

export const faqListBlockSchema = z.object({
  type: z.literal("faq_list"),
  items: z.array(
    z.object({
      question: z.string().min(1),
      answer: z.string().min(1),
    }),
  ),
});

export const blockSchema = z.discriminatedUnion("type", [
  headingBlockSchema,
  paragraphBlockSchema,
  imageBlockSchema,
  quoteBlockSchema,
  bulletListBlockSchema,
  dividerBlockSchema,
  calloutBlockSchema,
  ctaBlockSchema,
  metricsGridBlockSchema,
  workCardBlockSchema,
  pricingCardBlockSchema,
  faqListBlockSchema,
]);

export const blocksSchema = z.array(blockSchema);

export type Block = z.infer<typeof blockSchema>;
