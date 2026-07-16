export const siteConfig = {
  name: "GridSpell",
  legalName: "GridSpell Studio",
  tagline: "Built on structure. Designed to captivate.",
  description:
    "Premium websites, client portals, dashboards, and full-stack digital systems for ambitious businesses.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://gridspellstudio.com",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@gridspellstudio.com",
  phone: "+1 (647) 802-3224",
  phoneHref: "tel:+16478023224",
  privacyEmail: "privacy@gridspellstudio.com",
  securityEmail: "security@gridspellstudio.com",
  billingEmail: "billing@gridspellstudio.com",
  location: "Toronto, Ontario, Canada",
  founder: "Mohammadreza Heidarpoor",
  social: {
    instagram: "",
    linkedin: "",
    github: ""
  }
} as const;
