import type { Metadata } from "next";

import { WorkExperienceBoundary } from "@/components/work/WorkExperienceBoundary";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Selected Web Design Work",
  description: "Explore GridSpell website and digital experience case studies.",
  path: "/work",
  image: "/work/opengraph-image",
  imageAlt: "GridSpell selected work"
});

export default function Page() {
  return <WorkExperienceBoundary />;
}
