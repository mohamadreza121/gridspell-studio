import type { Metadata } from "next";

import { AboutExperience } from "@/components/about/AboutExperience";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "About GridSpell Studio",
  description:
    "Meet GridSpell Studio, a Toronto web design and development studio creating premium websites, client portals, dashboards, and digital systems.",
  path: "/about",
  image: "/about/opengraph-image",
  imageAlt: "About GridSpell Studio - One studio. Every layer."
});

export default function AboutPage() {
  return <AboutExperience />;
}
