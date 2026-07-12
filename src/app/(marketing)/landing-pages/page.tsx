import type { Metadata } from "next";

import { LandingPageGalleryExperience } from "@/components/landing-pages/LandingPageGalleryExperience";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Landing Page Gallery — 12 Live Design Systems",
  description:
    "Explore twelve live GridSpell landing page experiences, each with its own visual system, business strategy, color direction, and launch-ready conversion flow.",
  path: "/landing-pages"
});

export default function LandingPagesPage() {
  return <LandingPageGalleryExperience />;
}
