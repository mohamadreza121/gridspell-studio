import type { Metadata } from "next";

import { HomeExperienceV2 } from "@/components/home/HomeExperienceV2";
import { HomeSceneTransitions } from "@/components/home/HomeSceneTransitions";

export const metadata: Metadata = {
  title: "GridSpell Studio — Websites, Portals & Digital Systems",
  description:
    "GridSpell creates premium websites, client portals, dashboards, and connected digital systems for ambitious businesses."
};

export default function HomePage() {
  return (
    <>
      <HomeSceneTransitions />
      <HomeExperienceV2 />
    </>
  );
}
