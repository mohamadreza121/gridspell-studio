import type { Metadata } from "next";

import { ServicesShowcaseScene } from "@/components/services/ServicesShowcaseScene";
import { ServicesStaticFallback } from "@/components/services/ServicesStaticFallback";
import { HydrationBoundary } from "@/components/ui/HydrationBoundary";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Web Design & Development Services",
  description:
    "Custom websites, strategic redesigns, landing pages, client portals, full-stack web applications, and ongoing website care from GridSpell.",
  path: "/services",
  image: "/services/opengraph-image",
  imageAlt: "GridSpell web design and development services"
});

export default function Page() {
  return (
    <HydrationBoundary fallback={<ServicesStaticFallback />}>
      <ServicesShowcaseScene />
    </HydrationBoundary>
  );
}
