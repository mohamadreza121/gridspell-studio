import type { Metadata } from "next";

import { TemplateVsCustomArticle } from "@/components/insights/TemplateVsCustomArticle";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";

const title = "Template vs Custom Website Guide";
const description =
  "Compare template and custom websites by cost, SEO, design control, integrations, scalability, and when each option fits your business.";
const path = "/insights/template-website-vs-custom-website";

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path,
  imageAlt: "Template vs custom website guide — GridSpell Insights"
});

export default function TemplateWebsiteVsCustomWebsitePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    mainEntityOfPage: `${siteConfig.url}${path}`,
    author: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.url
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.url
    },
    datePublished: "2026-07-05",
    dateModified: "2026-07-05"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd)
        }}
      />
      <TemplateVsCustomArticle />
    </>
  );
}
