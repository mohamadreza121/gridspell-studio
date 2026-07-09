export type LandingPageConcept = {
  slug: string;
  title: string;
  category: string;
  businessType: string;
  style: string;
  styleFamily: "Classic" | "Modern" | "3D" | "Luxury" | "Bold";
  goal: string;
  priceLabel: string;
  description: string;
  tags: readonly string[];
  palette: readonly string[];
  sections: readonly string[];
  recommendedFor: readonly string[];
  demoHref?: string;
};

export const landingPageConcepts: LandingPageConcept[] = [
  {
    slug: "contractor-pro",
    title: "Contractor Pro",
    category: "Home services",
    businessType: "Contractors, HVAC, roofing, insulation, plumbing",
    style: "Classic professional",
    styleFamily: "Classic",
    goal: "Estimate requests",
    priceLabel: "Landing page · from $750+",
    description:
      "A trust-first local business landing page with service clarity, proof blocks, location support, and a strong quote request path.",
    tags: ["Lead form", "Map", "Reviews", "FAQ"],
    palette: ["#f97316", "#0f172a", "#f8fafc"],
    sections: ["Hero + estimate CTA", "Services", "Proof stats", "Reviews", "Service area", "FAQ"],
    recommendedFor: ["Service contractors", "Local lead generation", "Quote request campaigns"],
    demoHref: "/demo/contractor-pro"
  },
  {
    slug: "saas-modern",
    title: "SaaS Modern",
    category: "SaaS / startup",
    businessType: "Software, AI tools, dashboards, B2B products",
    style: "Modern tech",
    styleFamily: "Modern",
    goal: "Trial signups",
    priceLabel: "Startup page · from $950+",
    description:
      "A clean startup-style landing page with product screenshots, feature cards, pricing, integrations, and a focused signup flow.",
    tags: ["Dashboard", "Pricing", "Features", "Trial CTA"],
    palette: ["#7c3aed", "#06b6d4", "#020617"],
    sections: ["Hero + product UI", "Feature grid", "Workflow", "Pricing", "Testimonials", "FAQ"],
    recommendedFor: ["SaaS products", "AI tools", "Dashboard apps"],
    demoHref: "/demo/saas-modern"
  },
  {
    slug: "restaurant-local",
    title: "Restaurant Local",
    category: "Restaurant / cafe",
    businessType: "Restaurants, cafes, bakeries, food trucks",
    style: "Warm editorial",
    styleFamily: "Classic",
    goal: "Reservations and calls",
    priceLabel: "Local page · from $800+",
    description:
      "A warm local restaurant page with menu highlights, atmosphere, opening hours, location, and reservation-focused CTAs.",
    tags: ["Menu", "Hours", "Map", "Reservations"],
    palette: ["#b45309", "#431407", "#fff7ed"],
    sections: ["Hero", "Menu highlights", "Story", "Gallery", "Hours", "Location"],
    recommendedFor: ["Restaurants", "Cafes", "Food trucks"],
    demoHref: "/demo/restaurant-local"
  },
  {
    slug: "product-3d-launch",
    title: "3D Product Launch",
    category: "Product launch",
    businessType: "Tech products, devices, creative brands, premium launches",
    style: "3D premium",
    styleFamily: "3D",
    goal: "Preorders and waitlist",
    priceLabel: "Premium launch · from $1,400+",
    description:
      "A visual-first launch page with a CSS 3D hero, benefit cards, specs, waitlist CTA, and premium product storytelling.",
    tags: ["3D hero", "Waitlist", "Specs", "Premium"],
    palette: ["#22d3ee", "#8b5cf6", "#030712"],
    sections: ["3D hero", "Benefits", "Specs", "Launch timeline", "Waitlist", "FAQ"],
    recommendedFor: ["Product launches", "Tech devices", "Premium campaigns"],
    demoHref: "/demo/product-3d-launch"
  },
  {
    slug: "luxury-real-estate",
    title: "Luxury Real Estate",
    category: "Real estate",
    businessType: "Realtors, property teams, luxury listings",
    style: "Luxury minimal",
    styleFamily: "Luxury",
    goal: "Private showings",
    priceLabel: "Luxury page · from $1,100+",
    description:
      "An elegant property or realtor landing page with large visuals, trust messaging, listing highlights, and private showing CTAs.",
    tags: ["Luxury", "Listings", "Inquiry", "Map"],
    palette: ["#d6b36a", "#111827", "#f8fafc"],
    sections: ["Hero listing", "Property cards", "Agent proof", "Neighborhood", "Contact", "FAQ"],
    recommendedFor: ["Luxury listings", "Realtors", "Property launches"]
  },
  {
    slug: "dental-trust",
    title: "Dental Trust",
    category: "Medical / dental",
    businessType: "Dentists, clinics, med spas, health practices",
    style: "Clean trustworthy",
    styleFamily: "Classic",
    goal: "Appointment bookings",
    priceLabel: "Clinic page · from $900+",
    description:
      "A calm healthcare landing page focused on trust, services, reviews, insurance notes, and booking clarity.",
    tags: ["Booking", "Reviews", "Services", "Trust"],
    palette: ["#38bdf8", "#0f172a", "#ecfeff"],
    sections: ["Hero booking", "Services", "Doctor profile", "Reviews", "Insurance", "FAQ"],
    recommendedFor: ["Dental clinics", "Med spas", "Health practices"]
  },
  {
    slug: "fitness-coach",
    title: "Fitness Coach",
    category: "Fitness / coaching",
    businessType: "Gyms, personal trainers, coaches, wellness programs",
    style: "Bold energetic",
    styleFamily: "Bold",
    goal: "Program applications",
    priceLabel: "Campaign page · from $850+",
    description:
      "A bold transformation-focused page with program cards, schedule blocks, social proof, and a direct apply CTA.",
    tags: ["Programs", "Schedule", "Results", "Apply CTA"],
    palette: ["#ef4444", "#111827", "#facc15"],
    sections: ["Hero", "Programs", "Results", "Coach story", "Pricing", "Application"],
    recommendedFor: ["Gyms", "Personal trainers", "Fitness offers"]
  },
  {
    slug: "law-firm-classic",
    title: "Law Firm Classic",
    category: "Professional services",
    businessType: "Law firms, accountants, consultants, advisors",
    style: "Classic authority",
    styleFamily: "Classic",
    goal: "Consultation calls",
    priceLabel: "Authority page · from $950+",
    description:
      "A professional service landing page with authority positioning, practice areas, consultation CTA, and trust indicators.",
    tags: ["Consultation", "Authority", "Practice areas", "FAQ"],
    palette: ["#1e3a8a", "#020617", "#f8fafc"],
    sections: ["Hero", "Practice areas", "Process", "Trust", "Consultation", "FAQ"],
    recommendedFor: ["Law firms", "Accountants", "Consultants"]
  },
  {
    slug: "beauty-booking",
    title: "Beauty Booking",
    category: "Beauty / wellness",
    businessType: "Salons, barbers, lashes, spas, skincare studios",
    style: "Soft premium",
    styleFamily: "Luxury",
    goal: "Online bookings",
    priceLabel: "Booking page · from $800+",
    description:
      "A stylish appointment landing page with services, pricing, social proof, before/after structure, and booking CTAs.",
    tags: ["Booking", "Pricing", "Gallery", "Reviews"],
    palette: ["#f0abfc", "#3b0764", "#fff1f2"],
    sections: ["Hero", "Services", "Pricing", "Gallery", "Reviews", "Booking"],
    recommendedFor: ["Beauty salons", "Barbers", "Spa studios"]
  },
  {
    slug: "creator-brand",
    title: "Creator Brand",
    category: "Personal brand",
    businessType: "Creators, consultants, coaches, educators, freelancers",
    style: "Editorial personal",
    styleFamily: "Modern",
    goal: "Email capture",
    priceLabel: "Personal brand · from $750+",
    description:
      "A personal brand landing page with a clear offer, credibility, content highlights, and newsletter or call booking CTAs.",
    tags: ["Newsletter", "Offer", "Social proof", "Content"],
    palette: ["#a78bfa", "#111827", "#f5f3ff"],
    sections: ["Hero", "Offer", "Proof", "Content", "Newsletter", "CTA"],
    recommendedFor: ["Creators", "Consultants", "Educators"]
  },
  {
    slug: "ecommerce-drop",
    title: "Ecommerce Drop",
    category: "Ecommerce",
    businessType: "Product drops, ecommerce brands, single-product stores",
    style: "Bold commerce",
    styleFamily: "Bold",
    goal: "Product sales",
    priceLabel: "Product page · from $1,000+",
    description:
      "A single-product landing page with product benefits, reviews, urgency blocks, comparison sections, and buy CTAs.",
    tags: ["Product", "Reviews", "Comparison", "Buy CTA"],
    palette: ["#14b8a6", "#042f2e", "#f0fdfa"],
    sections: ["Hero", "Benefits", "Product details", "Reviews", "Comparison", "Buy section"],
    recommendedFor: ["Single products", "Ecommerce drops", "Brand campaigns"]
  },
  {
    slug: "event-launch",
    title: "Event Launch",
    category: "Events",
    businessType: "Workshops, conferences, launches, meetups, local events",
    style: "High-energy campaign",
    styleFamily: "Bold",
    goal: "Registrations",
    priceLabel: "Event page · from $800+",
    description:
      "A campaign-style event page with speaker cards, schedule, ticket tiers, countdown-style urgency, and registration CTAs.",
    tags: ["Tickets", "Schedule", "Speakers", "Registration"],
    palette: ["#fb7185", "#312e81", "#fff1f2"],
    sections: ["Hero", "Speakers", "Schedule", "Tickets", "Venue", "Register"],
    recommendedFor: ["Workshops", "Conferences", "Local events"]
  }
];

export function getLandingPageConcept(slug: string) {
  return landingPageConcepts.find((concept) => concept.slug === slug);
}
