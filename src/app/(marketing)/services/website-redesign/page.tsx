import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ModernServiceExperience } from "@/components/services/ModernServiceExperience";
import { packages } from "@/config/packages";
import { getServiceBySlug, services } from "@/config/services";
import { createPageMetadata } from "@/lib/metadata";

const slug = "website-redesign";

export const metadata: Metadata = createPageMetadata({
  title: "Strategic Website Redesign",
  description:
    "Rebuild an outdated or underperforming website with clearer positioning, stronger service pages, responsive design, performance work, and a safer relaunch plan.",
  path: `/services/${slug}`,
  image: `/services/${slug}/opengraph-image`,
  imageAlt: "Strategic Website Redesign by GridSpell Studio"
});

export default function WebsiteRedesignPage() {
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
