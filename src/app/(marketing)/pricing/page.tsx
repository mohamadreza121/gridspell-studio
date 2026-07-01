import type { Metadata } from "next";

import { PricingExperience } from "@/components/pricing/PricingExperience";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Website Design Pricing & Project Investment",
  description:
    "Explore realistic investment ranges for custom business websites, redesigns, landing pages, client portals, and full-stack applications.",
  path: "/pricing"
});

export default function PricingPage() {
  return <PricingExperience />;
}
