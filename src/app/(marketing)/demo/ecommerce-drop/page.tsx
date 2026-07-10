import type { Metadata } from "next";

import { DemoConceptPage } from "@/components/landing-pages/DemoConceptPage";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Ecommerce Drop Landing Page Demo",
  description: "A bold ecommerce landing page demo for single-product stores, product drops, comparison sections, reviews, and buy CTAs.",
  path: "/demo/ecommerce-drop"
});

export default function EcommerceDropDemoPage() {
  return (
    <DemoConceptPage
      slug="ecommerce-drop"
      eyebrow="Product sales demo"
      headline="Make one product easy to want."
      subheadline="A bold commerce landing page direction for single-product stores and product drops with benefits, reviews, comparisons, urgency, and buy CTAs."
      primaryAction="Start this product page"
      secondaryAction="View sales flow"
      visualTitle="Drop conversion"
      visualMetric="8.4%"
      proofPoints={["Product benefits", "Review sections", "Buy CTA"]}
      featureCards={[
        { title: "Product-first hero", copy: "Lead with the product promise, buyer outcome, visual direction, and one clear purchase CTA." },
        { title: "Benefit stack", copy: "Turn product specs into simple reasons to buy, compare, or join the drop." },
        { title: "Review proof", copy: "Use ratings, testimonials, UGC placeholders, and comparison sections to reduce hesitation." },
        { title: "Buy section", copy: "Structure price, offer, guarantee, shipping notes, and urgency around the final conversion point." }
      ]}
      sectionEyebrow="Commerce flow"
      sectionTitle="A focused product page for one offer, one audience, and one CTA."
      sectionCopy="The layout is designed to make the product easier to understand, easier to trust, and easier to buy."
      closingTitle="Use this direction for a product drop or single-product store."
    />
  );
}
