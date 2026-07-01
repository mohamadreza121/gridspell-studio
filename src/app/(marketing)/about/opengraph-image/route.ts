import { createOgImage } from "@/lib/og";

export async function GET() {
  return createOgImage({
    eyebrow: "About GridSpell",
    title: "One studio. Every layer.",
    description: "Strategy • design • development • systems",
    footer: "Toronto-based • Working with businesses across Canada"
  });
}
