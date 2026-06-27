import type { MetadataRoute } from "next";
import { insightArticles } from "@/config/insights";
import { services } from "@/config/services";
import { siteConfig } from "@/config/site";
import { featuredProjects } from "@/config/work";

const buildDate = new Date("2026-06-26T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/work",
    "/services",
    "/process",
    "/pricing",
    "/about",
    "/insights",
    "/contact",
    "/start-project",
    "/privacy",
    "/terms"
  ];

  return [
    ...routes.map((route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified: buildDate,
      changeFrequency: route === "/insights" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : route === "/start-project" ? 0.9 : 0.7
    })),
    ...services.map((service) => ({
      url: `${siteConfig.url}/services/${service.slug}`,
      lastModified: buildDate,
      changeFrequency: "monthly" as const,
      priority: 0.8
    })),
    ...featuredProjects.map((project) => ({
      url: `${siteConfig.url}/work/${project.slug}`,
      lastModified: buildDate,
      changeFrequency: "monthly" as const,
      priority: 0.75
    })),
    ...insightArticles.map((article) => ({
      url: `${siteConfig.url}/insights/${article.slug}`,
      lastModified: buildDate,
      changeFrequency: "monthly" as const,
      priority: article.featured ? 0.8 : 0.7
    }))
  ];
}
