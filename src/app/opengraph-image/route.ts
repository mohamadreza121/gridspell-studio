import { createOgImage } from "@/lib/og";

export async function GET() {
  return createOgImage({
    eyebrow: "Full-stack web studio",
    title: "Full-stack. Full impact.",
    description: "Premium websites • portals • digital systems",
    footer: "Built on structure. Designed to captivate."
  });
}
