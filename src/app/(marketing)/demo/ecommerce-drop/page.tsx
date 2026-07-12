import type { Metadata } from "next";

import { EcommerceDropExperience } from "@/components/landing-pages/EcommerceDropExperience";
import { PulseFlavorCardCanPortal } from "@/components/landing-pages/PulseFlavorCardCanPortal";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "PULSE DRIP — Energy Drink Ecommerce Landing Page Demo",
  description:
    "A modern energy drink landing page with a custom interactive 3D can, four flavor identities, clean formula storytelling, social proof, and a polished pack builder.",
  path: "/demo/ecommerce-drop"
});

export default function EcommerceDropDemoPage() {
  return (
    <>
      <EcommerceDropExperience />
      <PulseFlavorCardCanPortal />
    </>
  );
}
