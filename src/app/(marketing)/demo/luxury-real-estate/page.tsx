import type { Metadata } from "next";

import { DemoConceptPage } from "@/components/landing-pages/DemoConceptPage";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Luxury Real Estate Landing Page Demo",
  description: "A luxury real estate landing page demo for listings, realtor brands, private showings, and premium property launches.",
  path: "/demo/luxury-real-estate"
});

export default function LuxuryRealEstateDemoPage() {
  return (
    <DemoConceptPage
      slug="luxury-real-estate"
      eyebrow="Luxury listing demo"
      headline="Sell the lifestyle before the showing."
      subheadline="A high-end real estate landing page direction built around large visuals, private showing CTAs, property highlights, and agent credibility."
      primaryAction="Start this listing page"
      secondaryAction="View property sections"
      visualTitle="Private showing interest"
      visualMetric="38 inquiries"
      proofPoints={["Premium property story", "Private showing CTA", "Neighborhood proof"]}
      featureCards={[
        { title: "Listing-first hero", copy: "Lead with a cinematic property moment, clear location context, and a direct showing request path." },
        { title: "Agent credibility", copy: "Add trust signals, experience, awards, and testimonial sections without making the page feel crowded." },
        { title: "Neighborhood story", copy: "Use lifestyle blocks to sell the area, not only the square footage." },
        { title: "Inquiry ready", copy: "Structure the page around private showings, buyer qualification, and contact capture." }
      ]}
      sectionEyebrow="Real estate flow"
      sectionTitle="A premium page for one property or one realtor brand."
      sectionCopy="The layout is designed to make a property feel valuable while still giving visitors clear next steps."
      closingTitle="Use this direction for a luxury listing or realtor launch."
    />
  );
}
