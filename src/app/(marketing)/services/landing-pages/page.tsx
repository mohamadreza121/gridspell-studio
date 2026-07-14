import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ModernServiceExperience } from "@/components/services/ModernServiceExperience";
import { packages } from "@/config/packages";
import { getServiceBySlug, services } from "@/config/services";
import { createPageMetadata } from "@/lib/metadata";

const slug = "landing-pages";

export const metadata: Metadata = createPageMetadata({
  title: "Campaign & Landing Pages",
  description:
    "Focused, conversion-ready landing pages for campaigns, launches, offers, booking flows, and measurable lead generation.",
  path: `/services/${slug}`,
  image: `/services/${slug}/opengraph-image`,
  imageAlt: "Campaign and Landing Pages by GridSpell Studio"
});

export default function LandingPagesServicePage() {
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const recommendedPackage = packages.find((item) => item.id === service.packageId);
  const relatedServices = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <ModernServiceExperience
      service={service}
      recommendedPackage={recommendedPackage}
      relatedServices={relatedServices}
    />
  );
}
