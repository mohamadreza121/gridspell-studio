import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  experimental: {
    cpus: 2,
    optimizePackageImports: ["lucide-react", "motion"]
  },
  poweredByHeader: false,
  headers: async () => [
    {
      source: "/videos/work/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=0, must-revalidate"
        },
        { key: "Accept-Ranges", value: "bytes" }
      ]
    },
    {
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "X-Frame-Options", value: "DENY" },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=(), payment=(self)"
        }
      ]
    }
  ]
};

const sentryConfigured = Boolean(
  process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN
);

export default sentryConfigured
  ? withSentryConfig(nextConfig, {
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN,
      silent: !process.env.CI,
      telemetry: false,
      sourcemaps: {
        disable: !process.env.SENTRY_AUTH_TOKEN
      },
      tunnelRoute: "/monitoring"
    })
  : nextConfig;
