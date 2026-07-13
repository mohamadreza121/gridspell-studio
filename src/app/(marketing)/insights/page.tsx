import type { Metadata } from "next";
import "@/app/insights-page.css";

import { InsightsExperienceBoundary } from "@/components/insights/InsightsExperienceBoundary";
import { InsightsPageBackdrop } from "@/components/insights/InsightsPageBackdrop";
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
    <div className="insights-page-shell relative overflow-hidden">
      <InsightsPageBackdrop />
      <div className="relative z-10">
        <InsightsExperienceBoundary />
        <WebsiteCostCanadaInsightsSection />
        <TemplateVsCustomInsightsSection />
      </div>
    </div>
  );
}
