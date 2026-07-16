import type { Metadata } from "next";

import { StartProjectExperience } from "@/components/start-project/StartProjectExperience";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Start a Web Design Project",
  description:
    "Submit a structured project brief for a website, redesign, landing page, client portal, dashboard, or full-stack application with GridSpell Studio.",
  path: "/start-project"
});

export default function StartProjectPage() {
  return <StartProjectExperience />;
}
