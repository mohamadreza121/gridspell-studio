import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ModernServiceExperience } from "@/components/services/ModernServiceExperience";
import { packages } from "@/config/packages";
import { getServiceBySlug, services } from "@/config/services";
import { createPageMetadata } from "@/lib/metadata";

const slug = "care-plans";

export const metadata: Metadata = createPageMetadata({
  title: "Website Care Plans & Ongoing Support",
  description:
    "Ongoing website monitoring, maintenance, fixes, content updates, analytics review, and practical improvements after launch.",
  path: `/services/${slug}`,
  image: `/services/${slug}/opengraph-image`,
  imageAlt: "Website Care Plans and Ongoing Support by GridSpell Studio"
});

export default function CarePlansPage() {
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
