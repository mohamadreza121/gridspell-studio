import type { Metadata } from "next";

import { GalleryTightTopSpacing } from "@/components/landing-pages/GalleryTightTopSpacing";
import { LandingGalleryWorkExperience } from "@/components/work/LandingGalleryWorkExperience";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Landing Page Gallery Case Study",
  description:
    "A GridSpell case study showing how twelve live landing page concepts, real screenshots, filters, and a direction finder turn visual inspiration into a stronger project brief.",
  path: "/work/landing-page-gallery",
  image: "/work/landing-page-gallery/opengraph-image",
  imageAlt: "GridSpell landing page gallery case study"
});

export default function LandingPageGalleryWorkPage() {
  return (
    <GalleryTightTopSpacing>
      <LandingGalleryWorkExperience />
    </GalleryTightTopSpacing>
  );
}
