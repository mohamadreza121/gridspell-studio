import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact GridSpell Studio in Toronto to discuss a website, redesign, landing page, portal, dashboard, or custom web application.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    title: "Contact",
    description: "Contact GridSpell Studio in Toronto to discuss a website, redesign, landing page, portal, dashboard, or custom web application.",
    url: "/contact"
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
