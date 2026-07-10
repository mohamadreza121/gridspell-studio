import type { Metadata } from "next";

import { LandingPageGalleryClient } from "@/components/landing-pages/LandingPageGalleryClient";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Landing Page Gallery",
  description:
    "Browse GridSpell landing page concepts for home services, SaaS, restaurants, product launches, professional services, and more.",
  path: "/landing-pages"
});

export default function LandingPagesPage() {
  return <LandingPageGalleryClient />;
}
