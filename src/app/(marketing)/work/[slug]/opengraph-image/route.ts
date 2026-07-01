import { featuredProjects } from "@/config/work";
import { createOgImage } from "@/lib/og";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const { slug } = await params;
  const project = featuredProjects.find((item) => item.slug === slug);

  if (!project) {
    return createOgImage({
      eyebrow: "Selected Work",
      title: "GridSpell Work",
      description: "Premium websites • portals • digital systems"
    });
  }

  return createOgImage({
    eyebrow: project.category,
    title: project.title,
    description: project.result,
    footer: "GridSpell Case Study"
  });
}
