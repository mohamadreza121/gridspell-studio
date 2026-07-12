import type { Metadata } from "next";

import { EcommerceDropOptimizedExperience } from "@/components/landing-pages/EcommerceDropOptimizedExperience";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "PULSE DRIP — Energy Drink Ecommerce Landing Page Demo",
  description:
    "A modern energy drink landing page with a lightweight interactive product presentation, four flavor identities, clean formula storytelling, social proof, and a polished pack builder.",
  path: "/demo/ecommerce-drop"
});

export default function EcommerceDropDemoPage() {
  return <EcommerceDropOptimizedExperience />;
}
