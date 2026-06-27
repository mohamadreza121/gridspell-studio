import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Process",
  description: "A clear web design and development process from strategy and structure through production, testing, launch, and ongoing support.",
  alternates: { canonical: "/process" },
  openGraph: {
    type: "website",
    title: "Process",
    description: "A clear web design and development process from strategy and structure through production, testing, launch, and ongoing support.",
    url: "/process"
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
