export type PricingPackageId = "launch" | "growth" | "custom";

export type PricingPackage = {
  id: PricingPackageId;
  name: string;
  eyebrow: string;
  price: string;
  startingPrice: number;
  timeline: string;
  summary: string;
  bestFor: string;
  highlighted: boolean;
  features: readonly string[];
  fullFeatures: readonly string[];
  example: string;
  exclusions: readonly string[];
};

export const packages: readonly PricingPackage[] = [
  {
    id: "launch",
    name: "Launch",
    eyebrow: "Professional foundation",
    price: "From CAD $2,800",
    startingPrice: 2800,
    timeline: "3–4 weeks",
    summary:
      "A focused, custom website for a small business that needs to look credible and convert the right visitors.",
    bestFor:
      "Service businesses, consultants, and growing teams replacing a dated or template-based website.",
    highlighted: false,
    features: [
      "Up to 5 strategic pages",
      "Custom responsive design",
      "Contact or estimate form",
      "Technical SEO foundations",
      "Analytics and launch setup",
      "14 days of post-launch support"
    ],
    fullFeatures: [
      "Discovery and content planning session",
      "Custom interface direction—no purchased template",
      "Up to five core pages with responsive layouts",
      "Contact, inquiry, or estimate form",
      "Performance, accessibility, and technical SEO pass",
      "Google Analytics and Search Console foundations",
      "Two structured revision rounds",
      "Deployment and launch support"
    ],
    example:
      "A five-page service-business website with Home, About, Services, Projects, and Contact pages plus a conversion-focused inquiry form.",
    exclusions: [
      "Large content migrations",
      "Custom dashboards or authenticated areas",
      "Complex third-party workflows",
      "Ongoing copywriting or photography"
    ]
  },
  {
    id: "growth",
    name: "Growth",
    eyebrow: "Conversion and scale",
    price: "From CAD $5,500",
    startingPrice: 5500,
    timeline: "5–7 weeks",
    summary:
      "A deeper sales-focused website with stronger content structure, editable sections, and practical business integrations.",
    bestFor:
      "Established service businesses that need more pages, lead generation, content publishing, or connected systems.",
    highlighted: true,
    features: [
      "Up to 10 strategic pages",
      "Custom design system",
      "CMS or editable content",
      "Booking or CRM integration",
      "Conversion tracking",
      "30 days of post-launch support"
    ],
    fullFeatures: [
      "Strategy, sitemap, and conversion planning",
      "Custom design system and reusable page sections",
      "Up to ten strategic pages",
      "CMS, blog, insights, or project portfolio setup",
      "Booking, CRM, reviews, or marketing integration",
      "Advanced forms and lead-routing workflows",
      "Analytics events and conversion tracking",
      "Three structured revision rounds",
      "Deployment, training, and 30-day support window"
    ],
    example:
      "A ten-page local-service website with service detail pages, a project gallery, reviews, editable content, booking, CRM routing, and tracked lead conversions.",
    exclusions: [
      "Full ecommerce catalogues",
      "Authenticated client portals",
      "Complex multi-role permissions",
      "Large custom software features"
    ]
  },
  {
    id: "custom",
    name: "Custom",
    eyebrow: "Platform and automation",
    price: "From CAD $9,000",
    startingPrice: 9000,
    timeline: "8+ weeks",
    summary:
      "A custom digital product for businesses that need portals, dashboards, automation, data, or complex integrations.",
    bestFor:
      "Teams building a client portal, internal tool, membership experience, custom workflow, or full-stack web application.",
    highlighted: false,
    features: [
      "Custom feature scope",
      "Authentication and database",
      "Client or admin dashboard",
      "API and workflow integrations",
      "Advanced interaction design",
      "Priority launch support"
    ],
    fullFeatures: [
      "Paid discovery and technical architecture",
      "Custom information architecture and product flows",
      "Authentication, permissions, and account states",
      "Database design and secure server functionality",
      "Client portal, admin dashboard, or internal tooling",
      "Payments, document workflows, or automation",
      "Third-party APIs and operational integrations",
      "Testing, staged releases, and deployment planning",
      "Priority support through launch"
    ],
    example:
      "A secure client portal where customers can review projects, approve work, exchange files, track invoices, and communicate with the delivery team.",
    exclusions: [
      "Open-ended product development without an approved roadmap",
      "Third-party subscription and usage fees",
      "Native iOS or Android applications",
      "Unscoped data migrations"
    ]
  }
] as const;
