export const siteConfig = {
  name: "GridSpell",
  legalName: "GridSpell Studio",
  tagline: "Built on structure. Designed to captivate.",
  description: "Premium websites, client portals, dashboards, and full-stack digital systems for ambitious businesses.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@gridspell.com",
  location: "Toronto, Ontario",
  social: { instagram: "#", linkedin: "#", github: "#" }
} as const;
