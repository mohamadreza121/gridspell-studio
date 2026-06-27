import type { Metadata } from "next";
import { featuredProjects } from "@/config/work";
import { workCaseStudies } from "@/config/work-case-studies";

type Props = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params
}: Pick<Props, "params">): Promise<Metadata> {
  const { slug } = await params;
  const project = featuredProjects.find((item) => item.slug === slug);
  const caseStudy = workCaseStudies.find((item) => item.slug === slug);

  if (!project || !caseStudy) return {};

  return {
    title: `${project.title} Case Study`,
    description: caseStudy.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      title: `${project.title} Case Study`,
      description: caseStudy.summary,
      url: `/work/${project.slug}`
    }
  };
}

export default function Layout({ children }: Props) {
  return children;
}
