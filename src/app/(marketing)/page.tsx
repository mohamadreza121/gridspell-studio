import type { Metadata } from "next";

import { HomeBackgroundBoundary } from "@/components/home/HomeBackgroundBoundary";
import { HomeExperience } from "@/components/home/HomeExperience";
import { HomeHeroActionsPlacement } from "@/components/home/HomeHeroActionsPlacement";
import { HomeHeroModeShowcase } from "@/components/home/HomeHeroModeShowcase";

export const metadata: Metadata = {
  title: "GridSpell Studio — Websites, Portals & Digital Systems",
  description:
    "GridSpell creates premium websites, client portals, dashboards, and connected digital systems for ambitious businesses."
};

export default function HomePage() {
  return (
    <>
      <HomeBackgroundBoundary />
      <HomeExperience />
      <HomeHeroModeShowcase />
      <HomeHeroActionsPlacement />
    </>
  );
}
