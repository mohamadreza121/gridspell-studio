import type { Metadata } from "next";

import { ContractorFieldBookExperience } from "@/components/landing-pages/ContractorFieldBookExperience";
import { getLandingPageConcept } from "@/config/landing-pages";
import { createPageMetadata } from "@/lib/metadata";

const concept = getLandingPageConcept("contractor-pro");

export const metadata: Metadata = createPageMetadata({
  title: "TrueNorth Contractor Field Book Landing Page Demo",
  description:
    "A premium contractor landing page built like a project field book, with real work, an interactive before-and-after comparison, a multi-step estimate builder, local service proof, reviews, and written-estimate conversion.",
  path: "/demo/contractor-pro"
});

function startHref() {
  const params = new URLSearchParams({
    package: "landing-page",
    source: "contractor-pro",
    design: concept?.title ?? "Contractor Pro"
  });

  return `/start-project?${params.toString()}`;
}

export default function ContractorProDemoPage() {
  return <ContractorFieldBookExperience startHref={startHref()} />;
}
