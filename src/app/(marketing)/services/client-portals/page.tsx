import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ModernServiceExperience } from "@/components/services/ModernServiceExperience";
import { packages } from "@/config/packages";
import { getServiceBySlug, services } from "@/config/services";
import { createPageMetadata } from "@/lib/metadata";

const slug = "client-portals";

export const metadata: Metadata = createPageMetadata({
  title: "Client Portal Design & Development",
  description:
    "Secure client portals for projects, files, messages, approvals, tasks, billing, permissions, and clearer client operations.",
  path: `/services/${slug}`,
  image: `/services/${slug}/opengraph-image`,
  imageAlt: "Client Portal Design and Development by GridSpell Studio"
});

export default function ClientPortalsPage() {
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
