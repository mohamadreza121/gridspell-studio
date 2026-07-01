import {
  createOgImage,
  ogContentType,
  ogSize
} from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt =
  "About GridSpell Studio — One studio. Every layer.";

export default function Image() {
  return createOgImage({
    eyebrow: "About GridSpell",
    title: "One studio. Every layer.",
    description:
      "Strategy • design • development • systems",
    footer:
      "Toronto-based • Working with businesses across Canada"
  });
}