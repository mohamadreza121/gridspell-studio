import type { Metadata, Viewport } from "next";
import "@/app/globals.css";

import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: "GridSpell — Premium Web Design & Development",
    template: "%s | GridSpell",
  },

  description: siteConfig.description,
  applicationName: siteConfig.name,
  manifest: "/site.webmanifest",

  openGraph: {
    type: "website",
    title: "GridSpell — Premium Web Design & Development",
    description: siteConfig.description,
    siteName: siteConfig.name,
  },

  twitter: {
    card: "summary_large_image",
    title: "GridSpell — Premium Web Design & Development",
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#07080C",
  colorScheme: "dark",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}