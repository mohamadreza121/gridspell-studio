import type { Metadata } from "next";

import { DemoConceptPage } from "@/components/landing-pages/DemoConceptPage";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Beauty Booking Landing Page Demo",
  description: "A soft premium booking landing page demo for salons, barbers, spas, lashes, skincare, and beauty studios.",
  path: "/demo/beauty-booking"
});

export default function BeautyBookingDemoPage() {
  return (
    <DemoConceptPage
      slug="beauty-booking"
      eyebrow="Beauty booking demo"
      headline="Make the service feel premium before they book."
      subheadline="A stylish appointment page direction for salons, barbers, spas, and beauty studios with services, pricing, gallery blocks, and booking CTAs."
      primaryAction="Start this booking page"
      secondaryAction="View service flow"
      visualTitle="Bookings this week"
      visualMetric="42 slots"
      proofPoints={["Service menu", "Pricing clarity", "Booking-first CTA"]}
      featureCards={[
        { title: "Soft premium hero", copy: "Lead with atmosphere, offer clarity, and a booking CTA that feels polished instead of pushy." },
        { title: "Service pricing", copy: "Show treatments, durations, packages, add-ons, or starting prices in a clean structure." },
        { title: "Gallery and proof", copy: "Use visual work, client reviews, and social proof to make the service feel desirable." },
        { title: "Booking path", copy: "Connect the page to a booking form, calendar, phone CTA, or Instagram-ready inquiry flow." }
      ]}
      sectionEyebrow="Appointment flow"
      sectionTitle="A beautiful page for appointment-based services."
      sectionCopy="The layout gives visitors the look, pricing, proof, and next step they need before choosing a service."
      closingTitle="Use this direction for a salon, barber, spa, or beauty studio."
    />
  );
}
