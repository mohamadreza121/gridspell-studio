import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Design & Development Services",
  description: "Business websites, redesigns, landing pages, client portals, dashboards, web applications, and ongoing care from GridSpell Studio.",
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    title: "Web Design & Development Services",
    description: "Business websites, redesigns, landing pages, client portals, dashboards, web applications, and ongoing care from GridSpell Studio.",
    url: "/services"
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
