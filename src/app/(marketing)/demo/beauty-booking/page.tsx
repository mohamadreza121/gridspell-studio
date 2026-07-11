import type { Metadata } from "next";

import { BeautyBookingExperience } from "@/components/landing-pages/BeautyBookingExperience";
import { BeautyTreatmentStackPortal } from "@/components/landing-pages/BeautyTreatmentStack";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "SORA — Modern Beauty Booking Landing Page Demo",
  description:
    "A warm, premium beauty booking landing page with cinematic studio video, stacked treatment cards, artist credibility, guest reviews, and a polished appointment flow.",
  path: "/demo/beauty-booking"
});

export default function BeautyBookingDemoPage() {
  return (
    <>
      <BeautyBookingExperience />
      <BeautyTreatmentStackPortal />
    </>
  );
}
