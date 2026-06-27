import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About GridSpell",
  description: "Meet Mohammadreza Heidarpoor and learn how GridSpell combines web strategy, interface design, development, SEO, advertising setup, and technical ownership.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    title: "About GridSpell",
    description: "Meet Mohammadreza Heidarpoor and learn how GridSpell combines web strategy, interface design, development, SEO, advertising setup, and technical ownership.",
    url: "/about"
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
