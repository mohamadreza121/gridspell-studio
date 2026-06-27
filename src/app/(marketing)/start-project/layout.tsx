import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start a Project",
  description: "Tell GridSpell about your business, website or web application goals, budget, timeline, and required integrations.",
  alternates: { canonical: "/start-project" },
  openGraph: {
    type: "website",
    title: "Start a Project",
    description: "Tell GridSpell about your business, website or web application goals, budget, timeline, and required integrations.",
    url: "/start-project"
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
