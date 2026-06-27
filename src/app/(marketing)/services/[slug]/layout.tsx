import type { Metadata } from "next";
import { getServiceBySlug } from "@/config/services";

type Props = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params
}: Pick<Props, "params">): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) return {};

  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      type: "website",
      title: service.title,
      description: service.summary,
      url: `/services/${service.slug}`
    }
  };
}

export default function Layout({ children }: Props) {
  return children;
}
