import { getServiceBySlug } from "@/config/services";
import { createOgImage, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return createOgImage({
      eyebrow: "Service",
      title: "GridSpell Services",
      description: "Premium websites • dashboards • digital systems"
    });
  }

  return createOgImage({
    eyebrow: `Service ${service.number}`,
    title: service.shortTitle,
    description: service.summary,
    footer: "GridSpell Service Page"
  });
}