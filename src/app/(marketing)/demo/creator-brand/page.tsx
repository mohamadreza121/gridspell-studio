import type { Metadata } from "next";

import { CreatorBrandExperience } from "@/components/landing-pages/CreatorBrandExperience";
import { CreatorOffersCarouselPortal } from "@/components/landing-pages/CreatorOffersCarousel";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Nora Vale — Retro Modern Creator Brand Landing Page Demo",
  description:
    "A warm retro-modern creator brand landing page with editorial work, a horizontal collaboration carousel, newsletter capture, and creator credibility.",
  path: "/demo/creator-brand"
});

export default function CreatorBrandDemoPage() {
  return (
    <>
      <CreatorBrandExperience />
      <CreatorOffersCarouselPortal />
    </>
  );
}
