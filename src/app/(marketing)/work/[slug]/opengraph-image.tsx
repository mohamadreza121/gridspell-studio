import { featuredProjects } from "@/config/work";
import { createOgImage, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const project = featuredProjects.find((item) => item.slug === slug);

  if (!project) {
    return createOgImage({
      eyebrow: "Case Study",
      title: "GridSpell Work",
      description: "Premium websites • dashboards • digital systems"
    });
  }

  return createOgImage({
    eyebrow: project.category,
    title: project.title,
    description: project.result,
    footer: "GridSpell Case Study"
  });
}