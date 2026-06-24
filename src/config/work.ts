export type FeaturedProject = {
  slug: string;
  title: string;
  category: string;
  description: string;
  result: string;
  accent: "violet" | "cyan" | "blue";
  previewImage?: string;
  previewAlt?: string;
  liveUrl?: string;
};

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "desa-foam-insulation",
    title: "DESA Foam Insulation",
    category: "Business website · Lead generation",
    description:
      "A complete digital rebuild for a Toronto-area contractor, designed to clarify services, showcase work, and generate qualified estimate requests.",
    result: "Modern service architecture and production-ready lead workflow",
    accent: "violet",
    previewImage: "/images/work/desa-foam-insulation-home.webp",
    previewAlt: "DESA Foam Insulation homepage preview",
    liveUrl: "https://www.desafoaminsulation.com/"
  },
  {
    slug: "pure-timepieces",
    title: "Pure Timepieces",
    category: "Luxury commerce · Editorial experience",
    description:
      "A dark, cinematic experience for a private watch business with curated inventory, authentication storytelling, and high-trust inquiry flows.",
    result: "Luxury positioning with a product-led browsing experience",
    accent: "cyan"
  },
  {
    slug: "gridspell-client-os",
    title: "GridSpell Client OS",
    category: "Portal · Dashboard · Operations",
    description:
      "A secure client platform for projects, milestones, approvals, files, communication, proposals, and billing.",
    result: "One workspace replacing fragmented client communication",
    accent: "blue",
    previewImage: "/images/work/gridspell-home.webp",
    previewAlt: "GridSpell homepage preview"
  }
];
