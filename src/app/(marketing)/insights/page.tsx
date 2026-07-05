import type { Metadata } from "next";

import { InsightsExperienceBoundary } from "@/components/insights/InsightsExperienceBoundary";
import { TemplateVsCustomInsightsSection } from "@/components/insights/TemplateVsCustomInsightsSection";
import { WebsiteCostCanadaInsightsSection } from "@/components/insights/WebsiteCostCanadaInsightsSection";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Web Design & Development Insights",
  description:
    "Practical guides on website strategy, interface design, development, SEO, business systems, project planning, and digital ownership.",
  path: "/insights"
});

export default function InsightsPage() {
  return (
    <>
      <InsightsExperienceBoundary />
      <WebsiteCostCanadaInsightsSection />
      <TemplateVsCustomInsightsSection />
    </>
  );
}
