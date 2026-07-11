import type { Metadata } from "next";

import { LawFirmClassicExperience } from "@/components/landing-pages/LawFirmClassicExperience";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Alder & Finch — Modern Law Firm Landing Page Demo",
  description:
    "A modern, minimal law firm landing page with focused practice areas, senior counsel credibility, legal insights, and a clear confidential consultation flow.",
  path: "/demo/law-firm-classic"
});

export default function LawFirmClassicDemoPage() {
  return <LawFirmClassicExperience />;
}
