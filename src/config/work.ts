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

  proof?: {
    problem: string;
    built: string;
    result: string;
    features: readonly string[];
  };
};

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "desa-foam-insulation",
    title: "DESA Foam Insulation",
    category: "Business website · Lead generation",
    description:
      "A complete digital rebuild for a Toronto-area contractor, designed to clarify services, showcase work, and generate qualified estimate requests.",
    result:
      "A more professional service-business website built around trust, clear services, mobile responsiveness, and lead capture.",
    accent: "violet",

    previewVideo: "/videos/work/desa-foam-insulation-hero.mp4?v=20260701",
    mobilePreviewVideo:
      "/videos/work/desa-foam-insulation-mobile.mp4?v=20260701",
    previewImage: "/images/work/desa-foam-insulation-home.webp",
    previewAlt: "DESA Foam Insulation homepage preview",

    liveUrl: "https://desafoaminsulation.com/",

    proof: {
      problem:
        "The business needed a modern website that explained services clearly and made it easier for local visitors to request work.",
      built:
        "A responsive Next.js website with service structure, conversion-focused copy, project visuals, SEO foundations, and a clear inquiry path.",
      result:
        "A stronger online presence designed to build trust and turn qualified local traffic into estimate requests.",
      features: [
        "Service-business positioning",
        "Conversion-focused page flow",
        "Desktop, tablet, and phone layouts",
        "SEO-ready service architecture"
      ]
    }
  },
  {
    slug: "gridspell-studio",
    title: "GridSpell Studio",
    category: "Studio website · Business system",
    description:
      "The GridSpell website presents the studio offer with pricing, project intake, admin lead management, and client portal foundations.",
    result:
      "A premium web design brand supported by practical systems for pricing, inquiries, projects, and client operations.",
    accent: "cyan",
    previewAlt: "GridSpell Studio website and client system preview",

    liveUrl: "https://gridspellstudio.com/",

    proof: {
      problem:
        "The studio needed more than a portfolio. It needed to explain the offer, qualify inquiries, show pricing, and support project operations.",
      built:
        "A premium Next.js marketing site with pricing logic, package-aware project intake, email notifications, admin lead dashboard, client portal structure, and small-phone fallbacks.",
      result:
        "A site that proves GridSpell can design the experience and build the operational system behind it.",
      features: [
        "Package-aware project brief",
        "Admin lead dashboard",
        "Client portal structure",
        "Responsive fallback layouts"
      ]
    }
  },
  {
    slug: "network-engineering-portfolio",
    title: "Network Engineering Portfolio",
    category: "Personal portfolio · Technical credibility",
    description:
      "An interactive technical portfolio presenting network engineering experience, projects, certifications, services, and practical lab work.",
    result:
      "A cinematic personal brand experience structured around technical credibility, project proof, and clear professional positioning.",
    accent: "blue",

    previewVideo: "/videos/work/network-portfolio-hero.mp4?v=20260701",
    mobilePreviewVideo:
      "/videos/work/network-portfolio-mobile.mp4?v=20260701",
    previewAlt: "Network engineering portfolio homepage preview",

    liveUrl: "https://portfolio-demo1-psi.vercel.app/",

    proof: {
      problem:
        "The portfolio needed to communicate technical depth quickly without feeling like a generic resume page.",
      built:
        "An interactive portfolio experience with stronger visual structure, project organization, service positioning, and responsive presentation.",
      result:
        "A sharper technical identity that makes projects, skills, and credibility easier to understand.",
      features: [
        "Technical project storytelling",
        "Portfolio positioning",
        "Immersive responsive layouts",
        "Clear services and proof structure"
      ]
    }
  }
];
