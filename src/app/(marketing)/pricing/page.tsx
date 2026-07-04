import type { Metadata } from "next";

import { PricingClarityExperience } from "@/components/pricing/PricingClarityExperience";
import { SmallPhonePricingFallback } from "@/components/pricing/SmallPhonePricingFallback";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Website Design Pricing & Project Investment",
  description:
    "Explore realistic investment ranges for custom business websites, redesigns, landing pages, client portals, and full-stack applications.",
  path: "/pricing"
});

export default function PricingPage() {
  return (
    <>
      <div className="small-phone-pricing-only">
        <SmallPhonePricingFallback />
      </div>
      <div className="pricing-experience-shell">
        <PricingClarityExperience />
      </div>
    </>
  );
}
