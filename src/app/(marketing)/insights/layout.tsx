import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/insights" },
  openGraph: {
    type: "website",
    title: "GridSpell Insights",
    description:
      "Practical guides on website strategy, interface design, development, SEO, business systems, project planning, and digital ownership.",
    url: "/insights"
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
