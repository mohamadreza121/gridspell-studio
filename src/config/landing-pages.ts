export type LandingPageConcept = {
  slug: string;
  title: string;
  category: string;
  businessType: string;
  style: string;
  goal: string;
  description: string;
  tags: readonly string[];
  palette: readonly string[];
  sections: readonly string[];
  demoHref?: string;
};

export const landingPageConcepts: LandingPageConcept[] = [
  {
    slug: "contractor-pro",
    title: "Contractor Pro",
    category: "Home services",
    businessType: "Contractors, HVAC, roofing, insulation, plumbing",
    style: "Classic professional",
    goal: "Estimate requests",
    description:
      "A trust-first local business landing page with service clarity, proof blocks, location support, and a strong quote request path.",
    tags: ["Lead form", "Map", "Reviews", "FAQ"],
    palette: ["#f97316", "#0f172a", "#f8fafc"],
    sections: ["Hero + estimate CTA", "Services", "Proof stats", "Reviews", "Service area", "FAQ"],
    demoHref: "/demo/contractor-pro"
  },
  {
    slug: "saas-modern",
    title: "SaaS Modern",
    category: "SaaS / startup",
    businessType: "Software, AI tools, dashboards, B2B products",
    style: "Modern tech",
    goal: "Trial signups",
    description:
      "A clean startup-style landing page with product screenshots, feature cards, pricing, integrations, and a focused signup flow.",
    tags: ["Dashboard", "Pricing", "Features", "Trial CTA"],
    palette: ["#7c3aed", "#06b6d4", "#020617"],
    sections: ["Hero + product UI", "Feature grid", "Workflow", "Pricing", "Testimonials", "FAQ"],
    demoHref: "/demo/saas-modern"
  },
  {
    slug: "restaurant-local",
    title: "Restaurant Local",
    category: "Restaurant / cafe",
    businessType: "Restaurants, cafes, bakeries, food trucks",
    style: "Warm editorial",
    goal: "Reservations and calls",
    description:
      "A warm local restaurant page with menu highlights, atmosphere, opening hours, location, and reservation-focused CTAs.",
    tags: ["Menu", "Hours", "Map", "Reservations"],
    palette: ["#b45309", "#431407", "#fff7ed"],
    sections: ["Hero", "Menu highlights", "Story", "Gallery", "Hours", "Location"],
    demoHref: "/demo/restaurant-local"
  },
  {
    slug: "product-3d-launch",
    title: "3D Product Launch",
    category: "Product launch",
    businessType: "Tech products, devices, creative brands, premium launches",
    style: "3D premium",
    goal: "Preorders and waitlist",
    description:
      "A visual-first launch page with a CSS 3D hero, benefit cards, specs, waitlist CTA, and premium product storytelling.",
    tags: ["3D hero", "Waitlist", "Specs", "Premium"],
    palette: ["#22d3ee", "#8b5cf6", "#030712"],
    sections: ["3D hero", "Benefits", "Specs", "Launch timeline", "Waitlist", "FAQ"],
    demoHref: "/demo/product-3d-launch"
  },
  {
    slug: "luxury-real-estate",
    title: "Luxury Real Estate",
    category: "Real estate",
    businessType: "Realtors, property teams, luxury listings",
    style: "Luxury minimal",
    goal: "Private showings",
    description:
      "An elegant property or realtor landing page with large visuals, trust messaging, listing highlights, and private showing CTAs.",
    tags: ["Luxury", "Listings", "Inquiry", "Map"],
    palette: ["#d6b36a", "#111827", "#f8fafc"],
    sections: ["Hero listing", "Property cards", "Agent proof", "Neighborhood", "Contact", "FAQ"]
  },
  {
    slug: "dental-trust",
    title: "Dental Trust",
    category: "Medical / dental",
    businessType: "Dentists, clinics, med spas, health practices",
    style: "Clean trustworthy",
    goal: "Appointment bookings",
    description:
      "A calm healthcare landing page focused on trust, services, reviews, insurance notes, and booking clarity.",
    tags: ["Booking", "Reviews", "Services", "Trust"],
    palette: ["#38bdf8", "#0f172a", "#ecfeff"],
    sections: ["Hero booking", "Services", "Doctor profile", "Reviews", "Insurance", "FAQ"]
  },
  {
    slug: "fitness-coach",
    title: "Fitness Coach",
    category: "Fitness / coaching",
    businessType: "Gyms, personal trainers, coaches, wellness programs",
    style: "Bold energetic",
    goal: "Program applications",
    description:
      "A bold transformation-focused page with program cards, schedule blocks, social proof, and a direct apply CTA.",
    tags: ["Programs", "Schedule", "Results", "Apply CTA"],
    palette: ["#ef4444", "#111827", "#facc15"],
    sections: ["Hero", "Programs", "Results", "Coach story", "Pricing", "Application"]
  },
  {
    slug: "law-firm-classic",
    title: "Law Firm Classic",
    category: "Professional services",
    businessType: "Law firms, accountants, consultants, advisors",
    style: "Classic authority",
    goal: "Consultation calls",
    description:
      "A professional service landing page with authority positioning, practice areas, consultation CTA, and trust indicators.",
    tags: ["Consultation", "Authority", "Practice areas", "FAQ"],
    palette: ["#1e3a8a", "#020617", "#f8fafc"],
    sections: ["Hero", "Practice areas", "Process", "Trust", "Consultation", "FAQ"]
  },
  {
    slug: "beauty-booking",
    title: "Beauty Booking",
    category: "Beauty / wellness",
    businessType: "Salons, barbers, lashes, spas, skincare studios",
    style: "Soft premium",
    goal: "Online bookings",
    description:
      "A stylish appointment landing page with services, pricing, social proof, before/after structure, and booking CTAs.",
    tags: ["Booking", "Pricing", "Gallery", "Reviews"],
    palette: ["#f0abfc", "#3b0764", "#fff1f2"],
    sections: ["Hero", "Services", "Pricing", "Gallery", "Reviews", "Booking"]
  },
  {
    slug: "creator-brand",
    title: "Creator Brand",
    category: "Personal brand",
    businessType: "Creators, consultants, coaches, educators, freelancers",
    style: "Editorial personal",
    goal: "Email capture",
    description:
      "A personal brand landing page with a clear offer, credibility, content highlights, and newsletter or call booking CTAs.",
    tags: ["Newsletter", "Offer", "Social proof", "Content"],
    palette: ["#a78bfa", "#111827", "#f5f3ff"],
    sections: ["Hero", "Offer", "Proof", "Content", "Newsletter", "CTA"]
  },
  {
    slug: "ecommerce-drop",
    title: "Ecommerce Drop",
    category: "Ecommerce",
    businessType: "Product drops, ecommerce brands, single-product stores",
    style: "Bold commerce",
    goal: "Product sales",
    description:
      "A single-product landing page with product benefits, reviews, urgency blocks, comparison sections, and buy CTAs.",
    tags: ["Product", "Reviews", "Comparison", "Buy CTA"],
    palette: ["#14b8a6", "#042f2e", "#f0fdfa"],
    sections: ["Hero", "Benefits", "Product details", "Reviews", "Comparison", "Buy section"]
  },
  {
    slug: "event-launch",
    title: "Event Launch",
    category: "Events",
    businessType: "Workshops, conferences, launches, meetups, local events",
    style: "High-energy campaign",
    goal: "Registrations",
    description:
      "A campaign-style event page with speaker cards, schedule, ticket tiers, countdown-style urgency, and registration CTAs.",
    tags: ["Tickets", "Schedule", "Speakers", "Registration"],
    palette: ["#fb7185", "#312e81", "#fff1f2"],
    sections: ["Hero", "Speakers", "Schedule", "Tickets", "Venue", "Register"]
  }
];

export function getLandingPageConcept(slug: string) {
  return landingPageConcepts.find((concept) => concept.slug === slug);
}
