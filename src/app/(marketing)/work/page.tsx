import type { Metadata } from "next";

import { ExperienceLab } from "@/components/work/experience-lab/ExperienceLab";
import { WorkRollScene } from "@/components/work/WorkRollScene";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Selected Web Design Work",
  description:
    "Explore GridSpell case studies across business websites, luxury digital experiences, lead-generation systems, and interactive technical portfolios.",
  path: "/work"
});

export default function Page() {
  return (
    <>
      <ExperienceLab />
      <WorkRollScene />
    </>
  );
}
