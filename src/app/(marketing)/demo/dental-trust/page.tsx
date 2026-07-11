import type { Metadata } from "next";

import { DentalTrustExperience } from "@/components/landing-pages/DentalTrustExperience";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "LUMA Dental — Modern Dental Landing Page Demo",
  description:
    "A modern dental landing page demo with a cinematic patient-experience video, trust-focused services, doctor credibility, reviews, and a clean appointment flow.",
  path: "/demo/dental-trust"
});

export default function DentalTrustDemoPage() {
  return <DentalTrustExperience />;
}
