import type { Metadata } from "next";
import { ServicesShowcaseScene } from "@/components/services/ServicesShowcaseScene";

export const metadata: Metadata = {
  title: "Web Design & Development Services",
  description:
    "Business websites, redesigns, landing pages, client portals, dashboards, web applications, and ongoing care from GridSpell Studio.",
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    title: "Web Design & Development Services",
    description:
      "Business websites, redesigns, landing pages, client portals, dashboards, web applications, and ongoing care from GridSpell Studio.",
    url: "/services"
  }
};

export default function Page() {
  return <ServicesShowcaseScene />;
}
