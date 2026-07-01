import { createOgImage } from "@/lib/og";

export async function GET() {
  return createOgImage({
    eyebrow: "Services",
    title: "Web design. Development. Digital systems.",
    description: "Custom websites, client portals, full-stack applications, and ongoing care.",
    footer: "GridSpell Services"
  });
}
