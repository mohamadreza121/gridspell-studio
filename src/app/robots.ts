import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/portal/",
          "/api/",
          "/monitoring",
          "/auth/",
          "/login",
          "/sign-up",
          "/forgot-password",
          "/update-password",
          "/accept-invite"
        ]
      }
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url
  };
}
