export type FeaturedProject = {
  slug: string;
  title: string;
  category: string;
  description: string;
  result: string;
  accent: "violet" | "cyan" | "blue";

  previewVideo?: string;
  mobilePreviewVideo?: string;
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
    result:
      "Modern service architecture and a production-ready lead workflow",
    accent: "violet",

    previewVideo: "/videos/work/desa-foam-insulation-hero.mp4?v=20260701",
    mobilePreviewVideo:
      "/videos/work/desa-foam-insulation-mobile.mp4?v=20260701",
    previewImage: "/images/work/desa-foam-insulation-home.webp",
    previewAlt: "DESA Foam Insulation homepage preview",

    liveUrl: "https://desafoaminsulation.com/"
  },
  {
    slug: "pure-timepieces",
    title: "Pure Timepieces",
    category: "Luxury commerce · Editorial experience",
    description:
      "A dark, cinematic experience for a private watch business with curated inventory, authentication storytelling, and high-trust inquiry flows.",
    result:
      "Luxury positioning with a product-led browsing experience",
    accent: "cyan",

    previewVideo: "/videos/work/pure-timepieces-hero.mp4?v=20260701",
    mobilePreviewVideo:
      "/videos/work/pure-timepieces-mobile.mp4?v=20260701",
    previewAlt: "Pure Timepieces homepage preview",

    liveUrl: "https://pure-timepieces-redesign.vercel.app/"
  },
  {
    slug: "network-engineering-portfolio",
    title: "Network Engineering Portfolio",
    category: "Personal portfolio · Interactive experience",
    description:
      "An interactive technical portfolio presenting network engineering experience, projects, certifications, services, and practical lab work.",
    result:
      "A cinematic personal brand experience built around technical credibility",
    accent: "blue",

    previewVideo: "/videos/work/network-portfolio-hero.mp4?v=20260701",
    mobilePreviewVideo:
      "/videos/work/network-portfolio-mobile.mp4?v=20260701",
    previewAlt: "Network engineering portfolio homepage preview",

    liveUrl: "https://portfolio-demo1-psi.vercel.app/"
  }
];
