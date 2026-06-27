import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Starting ranges for premium business websites, custom web applications, and ongoing website care from GridSpell Studio.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    type: "website",
    title: "Pricing",
    description: "Starting ranges for premium business websites, custom web applications, and ongoing website care from GridSpell Studio.",
    url: "/pricing"
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
