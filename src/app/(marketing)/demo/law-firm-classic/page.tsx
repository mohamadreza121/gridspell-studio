import type { Metadata } from "next";

import { DemoConceptPage } from "@/components/landing-pages/DemoConceptPage";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Law Firm Classic Landing Page Demo",
  description: "A professional landing page demo for law firms, accountants, advisors, consultants, and consultation-based services.",
  path: "/demo/law-firm-classic"
});

export default function LawFirmClassicDemoPage() {
  return (
    <DemoConceptPage
      slug="law-firm-classic"
      eyebrow="Professional service demo"
      headline="Build authority before the consultation."
      subheadline="A classic professional landing page direction built around trust, practice areas, process clarity, and consultation requests."
      primaryAction="Start this authority page"
      secondaryAction="View consultation flow"
      visualTitle="Consultation requests"
      visualMetric="31 booked"
      proofPoints={["Authority-first copy", "Practice area blocks", "Consultation CTA"]}
      featureCards={[
        { title: "Trust-first hero", copy: "Present the service, audience, and consultation CTA with a polished and credible first impression." },
        { title: "Practice areas", copy: "Break complex services into simple sections so visitors can quickly find the right fit." },
        { title: "Process clarity", copy: "Explain what happens after someone reaches out, so the consultation feels less intimidating." },
        { title: "Proof and credentials", copy: "Add case types, years of experience, reviews, associations, or professional credentials." }
      ]}
      sectionEyebrow="Consultation flow"
      sectionTitle="A serious page for serious professional services."
      sectionCopy="The page is designed to feel formal, credible, and easy to understand while driving the visitor toward a consultation."
      closingTitle="Use this direction for a law firm, accountant, or advisory business."
    />
  );
}
