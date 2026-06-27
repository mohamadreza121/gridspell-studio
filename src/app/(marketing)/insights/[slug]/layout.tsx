import type { Metadata } from "next";
import { getInsightBySlug } from "@/config/insights";

type Props = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params
}: Pick<Props, "params">): Promise<Metadata> {
  const { slug } = await params;
  const article = getInsightBySlug(slug);

  if (!article) return {};

  const image = `/insights/${article.slug}/opengraph-image`;

  return {
    alternates: { canonical: `/insights/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      url: `/insights/${article.slug}`,
      images: [image]
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [image]
    }
  };
}

export default function Layout({ children }: Props) {
  return children;
}
