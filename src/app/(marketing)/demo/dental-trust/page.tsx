import type { Metadata } from "next";

import { DemoConceptPage } from "@/components/landing-pages/DemoConceptPage";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Dental Trust Landing Page Demo",
  description: "A clean healthcare landing page demo for dentists, clinics, med spas, and appointment-based practices.",
  path: "/demo/dental-trust"
});

export default function DentalTrustDemoPage() {
  return (
    <DemoConceptPage
      slug="dental-trust"
      eyebrow="Clinic landing demo"
      headline="Make patients feel safe before they book."
      subheadline="A calm, trust-focused healthcare landing page with services, provider credibility, reviews, insurance notes, and appointment CTAs."
      primaryAction="Start this clinic page"
      secondaryAction="View trust sections"
      visualTitle="Appointment requests"
      visualMetric="24 booked"
      proofPoints={["Appointment-first CTA", "Provider trust blocks", "Review-ready layout"]}
      featureCards={[
        { title: "Calm first impression", copy: "Use soft hierarchy, reassuring copy, and clear service categories to reduce friction before booking." },
        { title: "Provider profile", copy: "Show doctors, specialists, credentials, and clinic values in a quick, readable way." },
        { title: "Insurance clarity", copy: "Add acceptance notes, payment options, or consultation details near the conversion path." },
        { title: "Location support", copy: "Pair maps, hours, contact details, and appointment CTAs for local search traffic." }
      ]}
      sectionEyebrow="Healthcare flow"
      sectionTitle="Designed for patients who need trust before action."
      sectionCopy="The page structure helps clinics explain services clearly while guiding visitors toward booking a consultation or appointment."
      closingTitle="Use this direction for a dental clinic, med spa, or health practice."
    />
  );
}
