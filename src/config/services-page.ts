import { packages } from "@/config/packages";
import type { Service } from "@/config/services";

const packageById = new Map(packages.map((item) => [item.id, item]));

export const serviceBuyerGoals = [
  {
    id: "credibility",
    label: "Look credible and get more enquiries",
    detail: "You need a clear, professional sales website.",
    serviceSlug: "business-websites"
  },
  {
    id: "underperforming",
    label: "Fix an outdated or underperforming site",
    detail: "The business has outgrown its current website.",
    serviceSlug: "website-redesign"
  },
  {
    id: "campaign",
    label: "Launch one offer or campaign",
    detail: "You need one focused page and one measurable action.",
    serviceSlug: "landing-pages"
  },
  {
    id: "clients",
    label: "Give clients a better workflow",
    detail: "Files, approvals, updates, and reporting need one home.",
    serviceSlug: "client-portals"
  },
  {
    id: "software",
    label: "Build custom software",
    detail: "Your workflow needs more than an off-the-shelf tool.",
    serviceSlug: "full-stack-apps"
  },
  {
    id: "support",
    label: "Keep an existing site healthy",
    detail: "You need reliable updates, monitoring, and improvement.",
    serviceSlug: "care-plans"
  }
] as const;

export type ServiceBuyerGoalId = (typeof serviceBuyerGoals)[number]["id"];

export const serviceProofProjects = [
  {
    title: "DESA Foam Insulation",
    label: "Business website · client work",
    href: "/work/desa-foam-insulation",
    image: "/images/work/selected-work/desa-foam-insulation-mobile-v2.jpg"
  },
  {
    title: "Landing Page Gallery",
    label: "12 live conversion directions",
    href: "/work/landing-page-gallery",
    image: "/images/work/selected-work/landing-page-gallery-mobile-v3.jpg"
  },
  {
    title: "GridSpell Studio",
    label: "Design system · full website",
    href: "/work/gridspell-studio",
    image: "/images/work/selected-work/gridspell-studio-mobile-v2.jpg"
  }
] as const;

export const serviceReadinessItems = [
  "I can explain the offer or problem in a few sentences",
  "I know who the primary customer or user is",
  "I have rough content, examples, or existing material",
  "I have a target launch window in mind",
  "The people approving the project can join key reviews"
] as const;

export function getServiceCommercialDetails(service: Service) {
  if (service.slug === "care-plans") {
    return {
      price: "Monthly scope after a site audit",
      timeline: "Ongoing support",
      packageName: "Care plan"
    };
  }

  const recommendedPackage = packageById.get(service.packageId);

  return {
    price: recommendedPackage?.price ?? "Quoted by scope",
    timeline: recommendedPackage?.timeline ?? "Confirmed after discovery",
    packageName: recommendedPackage?.name ?? "Custom"
  };
}

export function getServiceScopeExclusions(service: Service): readonly string[] {
  if (service.slug === "care-plans") {
    return [
      "Monthly capacity and response times are confirmed after the initial audit",
      "Large redesigns, new applications, and major features are quoted separately",
      "Third-party software and hosting fees remain separate"
    ];
  }

  return packageById.get(service.packageId)?.exclusions ?? [];
}
