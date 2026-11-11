import type { Metadata } from "next";

import { DotaCinematicExperience } from "@/components/landing-pages/DotaCinematicExperience";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "DOTA 2 — Defend the Ancient | Cinematic Demo",
  description:
    "Five heroes. One Ancient. A cinematic Dota 2 concept with dimensional, hero-filled letters and a scroll-driven reveal.",
  path: "/demo/product-3d-launch"
});

export default function Product3DLaunchDemoPage() {
  return <DotaCinematicExperience />;
}
