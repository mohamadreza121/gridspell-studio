import { getServiceBySlug } from "@/config/services";
import { createOgImage } from "@/lib/og";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return createOgImage({
      eyebrow: "Services",
      title: "GridSpell Services",
      description: "Premium websites • portals • digital systems"
    });
  }

  return createOgImage({
    eyebrow: `Service ${service.number}`,
    title: service.shortTitle,
    description: service.summary,
    footer: "GridSpell Service"
  });
}
