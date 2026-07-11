import type { Metadata } from "next";

import { CreatorBrandExperience } from "@/components/landing-pages/CreatorBrandExperience";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Nora Vale — Retro Modern Creator Brand Landing Page Demo",
  description:
    "A warm retro-modern creator brand landing page with editorial work, modern card systems, service offers, newsletter capture, and creator credibility.",
  path: "/demo/creator-brand"
});

export default function CreatorBrandDemoPage() {
  return <CreatorBrandExperience />;
}
