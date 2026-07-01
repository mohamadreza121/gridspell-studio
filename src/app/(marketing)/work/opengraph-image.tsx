import { createOgImage, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "GridSpell Selected Work";

export default function Image() {
  return createOgImage({
    eyebrow: "Selected Work",
    title: "Proof before promises.",
    description:
      "Case studies across premium websites, lead-generation systems, and digital experiences.",
    footer: "GridSpell Work"
  });
}