import type { Metadata } from "next";

import { HomeBackgroundBoundary } from "@/components/home/HomeBackgroundBoundary";
import { HomeExperience } from "@/components/home/HomeExperience";
import { HomeHeroActionsPlacement } from "@/components/home/HomeHeroActionsPlacement";
import { HomeHeroModeShowcase } from "@/components/home/HomeHeroModeShowcase";
import { HomeProofSections } from "@/components/home/HomeProofSections";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "GridSpell Studio — Websites, Portals & Digital Systems",
  description:
    "GridSpell creates premium websites, client portals, dashboards, and connected digital systems for ambitious businesses.",
  path: "/"
});

export default function HomePage() {
  return (
    <>
      <HomeBackgroundBoundary />
      <HomeExperience />
      <HomeProofSections />
      <HomeHeroModeShowcase />
      <HomeHeroActionsPlacement />
    </>
  );
}
