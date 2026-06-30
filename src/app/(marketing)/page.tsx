import type { Metadata } from "next";

import { HomeExperience } from "@/components/home/HomeExperience";
import { HomeHeroModeShowcase } from "@/components/home/HomeHeroModeShowcase";
import { MobileHomeGBackground } from "@/components/home/MobileHomeGBackground";

export const metadata: Metadata = {
  title: "GridSpell Studio — Websites, Portals & Digital Systems",
  description:
    "GridSpell creates premium websites, client portals, dashboards, and connected digital systems for ambitious businesses."
};

export default function HomePage() {
  return (
    <>
      <MobileHomeGBackground />
      <HomeExperience />
      <HomeHeroModeShowcase />
    </>
  );
}
