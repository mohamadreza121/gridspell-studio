import type { Metadata } from "next";

import { InsightsExperience } from "@/components/insights/InsightsExperience";

export const metadata: Metadata = {
  title: "Insights | GridSpell Studio",
  description:
    "Practical guides on website strategy, interface design, development, SEO, business systems, project planning, and digital ownership.",
  alternates: { canonical: "/insights" }
};

export default function InsightsPage() {
  return <InsightsExperience />;
}
