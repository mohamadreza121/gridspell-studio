import type { Metadata } from "next";

import { BusinessWebsitesExperience } from "@/components/services/BusinessWebsitesExperience";
import { packages } from "@/config/packages";
import { getServiceBySlug, services } from "@/config/services";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Business Website Design & Development",
  description:
    "Custom business websites that build credibility, explain your services clearly, and turn qualified visitors into enquiries.",
  path: "/services/business-websites",
  image: "/services/business-websites/opengraph-image",
  imageAlt: "Business website design and development by GridSpell Studio"
});

export default function BusinessWebsitesPage() {
  const service = getServiceBySlug("business-websites");

  if (!service) {
    throw new Error("Business websites service configuration is missing.");
  }

  const recommendedPackage = packages.find((item) => item.id === service.packageId);
  const relatedServices = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <BusinessWebsitesExperience
      service={service}
      recommendedPackage={recommendedPackage}
      relatedServices={relatedServices}
    />
  );
}
