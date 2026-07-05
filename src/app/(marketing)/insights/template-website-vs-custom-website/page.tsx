import type { Metadata } from "next";

import { TemplateVsCustomArticle } from "@/components/insights/TemplateVsCustomArticle";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";

const title = "Template Website vs Custom Website: Which One Should Your Business Choose?";
const description =
  "A clear guide for business owners comparing template websites and custom websites, including cost, SEO, design flexibility, scalability, integrations, and when each option makes sense.";
const path = "/insights/template-website-vs-custom-website";

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path,
  imageAlt: "Template website vs custom website — GridSpell Insights"
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
