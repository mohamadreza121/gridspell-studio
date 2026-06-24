import type { MetadataRoute } from "next";
import { services } from "@/config/services";
import { featuredProjects } from "@/config/work";
import { siteConfig } from "@/config/site";
export default function sitemap():MetadataRoute.Sitemap{const routes=["","/work","/services","/process","/pricing","/about","/insights","/contact","/start-project"];return[...routes.map(r=>({url:`${siteConfig.url}${r}`,lastModified:new Date(),changeFrequency:"monthly" as const,priority:r===""?1:.7})),...services.map(s=>({url:`${siteConfig.url}/services/${s.slug}`,lastModified:new Date(),changeFrequency:"monthly" as const,priority:.75})),...featuredProjects.map(p=>({url:`${siteConfig.url}/work/${p.slug}`,lastModified:new Date(),changeFrequency:"monthly" as const,priority:.75}))];}
