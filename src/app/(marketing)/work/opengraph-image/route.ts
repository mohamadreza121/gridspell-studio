import { createOgImage } from "@/lib/og";

export async function GET() {
  return createOgImage({
    eyebrow: "Selected Work",
    title: "Proof before promises.",
    description: "Premium websites and digital experiences.",
    footer: "GridSpell Work"
  });
}
