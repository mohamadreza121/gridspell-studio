import type { Metadata } from "next";

import { LuxuryRealEstateExperience } from "@/components/landing-pages/LuxuryRealEstateExperience";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Luxury Real Estate Landing Page Demo",
  description:
    "A cinematic luxury real estate landing page with a video-led hero, curated residences, lifestyle storytelling, private advisory, and showing-focused calls to action.",
  path: "/demo/luxury-real-estate"
});

export default function LuxuryRealEstateDemoPage() {
  return <LuxuryRealEstateExperience />;
}
