import type { Metadata } from "next";
import { WorkRollScene } from "@/components/work/WorkRollScene";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Explore GridSpell case studies covering business websites, digital products, responsive development, and production systems.",
  alternates: { canonical: "/work" },
  openGraph: {
    type: "website",
    title: "Selected Work",
    description:
      "Explore GridSpell case studies covering business websites, digital products, responsive development, and production systems.",
    url: "/work"
  }
};

export default function Page() {
  return <WorkRollScene />;
}
