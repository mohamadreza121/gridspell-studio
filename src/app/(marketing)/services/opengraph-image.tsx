import { createOgImage, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "GridSpell Services";

export default function Image() {
  return createOgImage({
    eyebrow: "Services",
    title: "Web design.\nDevelopment.\nDigital systems.",
    description:
      "Custom websites, redesigns, landing pages, client portals, full-stack applications, and ongoing care.",
    footer: "GridSpell Services"
  });
}