import type { Metadata } from "next";

import { WebsiteCostCanadaArticle } from "@/components/insights/WebsiteCostCanadaArticle";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "How Much Does a Professional Website Cost in Canada?",
  description:
    "A 2026 guide to professional website costs in Canada, including DIY builders, freelancers, custom websites, ecommerce, portals, SEO setup, and ongoing support.",
  path: "/insights/professional-website-cost-canada",
  imageAlt: "How much a professional website costs in Canada — GridSpell Insights"
});

export default function ProfessionalWebsiteCostCanadaPage() {
  return <WebsiteCostCanadaArticle />;
}
