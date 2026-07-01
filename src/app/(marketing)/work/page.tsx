import type { Metadata } from "next";

import { ExperienceLab } from "@/components/work/experience-lab/ExperienceLab";
import { WorkRollScene } from "@/components/work/WorkRollScene";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Selected Web Design Work",
  description: "Explore GridSpell website and digital experience case studies.",
  path: "/work",
  image: "/work/opengraph-image",
  imageAlt: "GridSpell selected work"
});

export default function Page() {
  return (
    <>
      <ExperienceLab />
      <WorkRollScene />
    </>
  );
}
