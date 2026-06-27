export type CaseStudyDevice = {
  id: string;
  device: "laptop" | "tablet" | "phone";
  eyebrow: string;
  title: string;
  description: string;
  videoSrc: string;
  posterSrc?: string;
  videoWidth: number;
  videoHeight: number;
};

export type WorkCaseStudy = {
  slug: string;
  client: string;
  category: string;
  headline: string;
  summary: string;
  overview: string;
  liveUrl?: string;
  devices: CaseStudyDevice[];
};

export const workCaseStudies: WorkCaseStudy[] = [
  {
    slug: "desa-foam-insulation",
    client: "DESA Foam Insulation",
    category: "Business website · Lead generation",
    headline: "A more credible digital presence for a growing insulation company.",
    summary:
      "We rebuilt the DESA Foam website to present services clearly, create a stronger first impression, and support real lead generation.",
    overview:
      "The focus was clarity, trust, and conversion. The new experience gives DESA a cleaner structure, stronger visual hierarchy, and a more polished service-business presentation across every device size.",
    liveUrl: "https://desafoaminsulation.com/",
    devices: [
      {
        id: "desktop",
        device: "laptop",
        eyebrow: "Desktop experience",
        title: "A wider, high-trust first impression on laptop screens.",
        description:
          "The desktop version emphasizes authority, service clarity, and a strong visual entrance for residential and commercial customers.",
        videoSrc: "/videos/case-studies/desa-foam-insulation/laptop.mp4",
        posterSrc: "/images/work/desa-foam-insulation-home.webp",
        videoWidth: 1890,
        videoHeight: 810
      },
      {
        id: "tablet",
        device: "tablet",
        eyebrow: "Tablet experience",
        title: "A balanced middle format for browsing services comfortably.",
        description:
          "On tablet, the layout keeps the same visual identity while tightening spacing, simplifying flow, and preserving readability.",
        videoSrc: "/videos/case-studies/desa-foam-insulation/tablet.mp4",
        posterSrc: "/images/work/desa-foam-insulation-home.webp",
        videoWidth: 1430,
        videoHeight: 870
      },
      {
        id: "phone",
        device: "phone",
        eyebrow: "Mobile experience",
        title: "A mobile-first experience designed for fast trust and quick action.",
        description:
          "The phone layout prioritizes clear messaging, fast scanning, and frictionless access to calls, services, and quote requests.",
        videoSrc: "/videos/case-studies/desa-foam-insulation/phone.mp4",
        posterSrc: "/images/work/desa-foam-insulation-home.webp",
        videoWidth: 494,
        videoHeight: 764
      }
    ]
  },
  {
    slug: "pure-timepieces",
    client: "Pure Timepieces",
    category: "Luxury commerce · Editorial experience",
    headline: "A cinematic digital experience for a luxury watch brand.",
    summary:
      "This concept focuses on premium presentation, editorial pacing, and luxury product storytelling.",
    overview:
      "The experience is designed to feel refined, calm, and exclusive — giving the brand a stronger visual language and a more elevated product-browsing flow.",
    liveUrl: "https://pure-timepieces-redesign.vercel.app/",
    devices: [
      {
        id: "desktop",
        device: "laptop",
        eyebrow: "Desktop experience",
        title: "Editorial pacing with a cinematic visual rhythm.",
        description:
          "The desktop version creates an immersive hero moment and gives the collection space to feel expensive and deliberate.",
        videoSrc: "/videos/case-studies/pure-timepieces/laptop.mp4",
        videoWidth: 1888,
        videoHeight: 870
      },
      {
        id: "tablet",
        device: "tablet",
        eyebrow: "Tablet experience",
        title: "Luxury browsing optimized for an in-between screen size.",
        description:
          "The tablet adaptation keeps the premium layout language while simplifying the visual density for touch interaction.",
        videoSrc: "/videos/case-studies/pure-timepieces/tablet.mp4",
        videoWidth: 1432,
        videoHeight: 870
      },
      {
        id: "phone",
        device: "phone",
        eyebrow: "Mobile experience",
        title: "A compact luxury experience with stronger focus and clarity.",
        description:
          "The mobile version centers on product clarity, elegant spacing, and a more direct shopping-style browsing path.",
        videoSrc: "/videos/case-studies/pure-timepieces/phone.mp4",
        videoWidth: 500,
        videoHeight: 764
      }
    ]
  },
  {
    slug: "network-engineering-portfolio",
    client: "Network Engineering Portfolio",
    category: "Personal portfolio · Technical credibility",
    headline: "A sharper portfolio experience for technical positioning.",
    summary:
      "This portfolio concept presents technical experience, projects, and services with more structure, atmosphere, and visual confidence.",
    overview:
      "The site is designed to feel more distinctive than a standard portfolio while still communicating technical depth, capability, and professionalism.",
    liveUrl: "https://portfolio-demo1-psi.vercel.app/",
    devices: [
      {
        id: "desktop",
        device: "laptop",
        eyebrow: "Desktop experience",
        title: "A bold hero built around personality and technical positioning.",
        description:
          "The desktop layout uses stronger motion, larger type, and deeper atmosphere to create a more memorable portfolio introduction.",
        videoSrc: "/videos/case-studies/network-portfolio/laptop.mp4",
        videoWidth: 1888,
        videoHeight: 870
      },
      {
        id: "tablet",
        device: "tablet",
        eyebrow: "Tablet experience",
        title: "A comfortable and readable format for project exploration.",
        description:
          "Tablet keeps the immersive feeling while making the structure more compact and touch-friendly.",
        videoSrc: "/videos/case-studies/network-portfolio/tablet.mp4",
        videoWidth: 1430,
        videoHeight: 870
      },
      {
        id: "phone",
        device: "phone",
        eyebrow: "Mobile experience",
        title: "A compact mobile portfolio that still feels immersive.",
        description:
          "The phone experience simplifies the composition while preserving the visual identity and strong first impression.",
        videoSrc: "/videos/case-studies/network-portfolio/phone.mp4",
        videoWidth: 496,
        videoHeight: 764
      }
    ]
  }
];
