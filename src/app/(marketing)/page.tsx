import type { Metadata } from "next";
import "@/app/home-performance.css";
import "@/app/home-speed-index.css";
import "@/app/home-story-polish.css";

import { HomeBackgroundBoundary } from "@/components/home/HomeBackgroundBoundary";
import { HomeDeferredSections } from "@/components/home/HomeDeferredSections";
import { HomeExperience } from "@/components/home/HomeExperience";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "GridSpell Studio — Websites, Portals & Digital Systems",
  description:
    "GridSpell creates premium websites, client portals, dashboards, and connected digital systems for ambitious businesses.",
  path: "/"
});

export default function HomePage() {
  return (
    <main id="main-content">
      <HomeBackgroundBoundary />
      <HomeExperience />
      <HomeDeferredSections />
    </main>
  );
}
