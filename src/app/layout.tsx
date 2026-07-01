import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import "@/app/globals.css";

import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "GridSpell — Premium Web Design & Development",
    template: "%s | GridSpell"
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.founder, url: siteConfig.url }],
  creator: siteConfig.founder,
  publisher: siteConfig.legalName,
  category: "Web design and software development",
  keywords: [
    "web design Toronto",
    "Next.js development",
    "React development",
    "business websites",
    "client portals",
    "web applications",
    "SEO setup",
    "Google Ads setup"
  ],
  alternates: {
    canonical: "/"
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      {
        url: "/favicon-48x48.png",
        sizes: "48x48",
        type: "image/png"
      },
      {
        url: "/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png"
      }
    ],
    shortcut: "/favicon.ico",
    apple: [
      {
        url: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png"
      }
    ]
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "GridSpell — Premium Web Design & Development",
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: "en_CA",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "GridSpell — Built on structure. Designed to captivate."
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "GridSpell — Premium Web Design & Development",
    description: siteConfig.description,
    images: ["/opengraph-image"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined
  }
};

export const viewport: Viewport = {
  themeColor: "#07080C",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        {children}
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
      </body>
    </html>
  );
}
