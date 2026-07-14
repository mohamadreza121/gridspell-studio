import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ModernServiceExperience } from "@/components/services/ModernServiceExperience";
import { packages } from "@/config/packages";
import { getServiceBySlug, services } from "@/config/services";
import { createPageMetadata } from "@/lib/metadata";

const slug = "full-stack-apps";

export const metadata: Metadata = createPageMetadata({
  title: "Custom Full-Stack Web Applications",
  description:
    "Purpose-built web applications with interface design, business logic, authentication, permissions, databases, integrations, and staged delivery.",
  path: `/services/${slug}`,
  image: `/services/${slug}/opengraph-image`,
  imageAlt: "Custom Full-Stack Web Applications by GridSpell Studio"
});

export default function FullStackAppsPage() {
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
