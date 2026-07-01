import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { DeviceShowcase } from "@/components/work/DeviceShowcase";
import { featuredProjects } from "@/config/work";
import { workCaseStudies } from "@/config/work-case-studies";
import { createPageMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return featuredProjects.map((project) => ({
    slug: project.slug
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = featuredProjects.find((item) => item.slug === slug);
  const caseStudy = workCaseStudies.find((item) => item.slug === slug);

  if (!project || !caseStudy) return {};

  return createPageMetadata({
    title: `${project.title} Website Case Study`,
    description: project.description,
    path: `/work/${project.slug}`,
    image: `/work/${project.slug}/opengraph-image`,
    imageAlt: `${project.title} website case study by GridSpell Studio`
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const project = featuredProjects.find((item) => item.slug === slug);
  const caseStudy = workCaseStudies.find((item) => item.slug === slug);

  if (!project || !caseStudy) {
    notFound();
  }

  return (
    <main className="overflow-hidden bg-[#07080c] text-white">
      {/* Case study introduction */}
      <section className="relative min-h-svh overflow-hidden border-b border-white/[0.06] pt-28 sm:pt-32">
        <div
          aria-hidden="true"
          className="page-grid pointer-events-none absolute inset-0 opacity-45"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-52 top-16 h-[44rem] w-[44rem] rounded-full bg-[#7c5cff]/14 blur-[160px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-48 bottom-0 h-[36rem] w-[36rem] rounded-full bg-[#29d6ff]/8 blur-[150px]"
        />

        <Container className="relative flex min-h-[calc(100svh-7rem)] flex-col justify-center py-16 sm:py-20">
          <Link
            href="/work"
            className="mb-14 inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/38 transition hover:text-[#8be9ff]"
          >
            <ArrowLeft className="h-4 w-4" />
            Selected work
          </Link>

          <div className="grid gap-12 xl:grid-cols-[1.35fr_0.65fr] xl:items-end">
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#8be9ff]">
                {project.category}
              </p>

              <h1 className="mt-7 max-w-[12ch] text-balance font-display text-[clamp(3.8rem,7.5vw,8.5rem)] font-semibold leading-[0.8] tracking-[-0.078em]">
                {project.title}
              </h1>

              <p className="mt-8 max-w-3xl text-lg leading-8 text-white/50 sm:text-xl sm:leading-9">
                {caseStudy.headline}
              </p>
            </div>

            <div className="xl:pb-2">
              <p className="text-base leading-8 text-white/42">
                {caseStudy.overview}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/15 bg-[linear-gradient(135deg,#7c5cff_0%,#6477ff_48%,#29d6ff_100%)] px-6 text-sm font-semibold text-white shadow-[0_14px_44px_rgba(92,104,255,0.26)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_58px_rgba(92,104,255,0.36)]"
                  >
                    Visit live site
                    <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                ) : null}

                <Link
                  href="/start-project"
                  className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.035] px-6 text-sm font-semibold text-white transition duration-300 hover:border-white/20 hover:bg-white/[0.07]"
                >
                  Start a project
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-4 border-t border-white/[0.08] pt-7 sm:grid-cols-3">
            <div>
              <p className="text-[0.58rem] uppercase tracking-[0.24em] text-white/26">
                Project
              </p>
              <p className="mt-2 text-sm text-white/65">
                {project.title}
              </p>
            </div>

            <div>
              <p className="text-[0.58rem] uppercase tracking-[0.24em] text-white/26">
                Focus
              </p>
              <p className="mt-2 text-sm text-white/65">
                Responsive digital experience
              </p>
            </div>

            <div>
              <p className="text-[0.58rem] uppercase tracking-[0.24em] text-white/26">
                Outcome
              </p>
              <p className="mt-2 text-sm text-white/65">
                {project.result}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Laptop, tablet and phone showcases */}
      <DeviceShowcase devices={caseStudy.devices} />

      {/* Closing summary */}
      <section className="relative border-t border-white/[0.06] py-24 sm:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7c5cff]/10 blur-[160px]"
        />

        <Container className="relative grid gap-12 xl:grid-cols-[0.75fr_1.25fr] xl:gap-20">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-[#8be9ff]">
              Project outcome
            </p>

            <h2 className="mt-6 max-w-[12ch] font-display text-[clamp(2.8rem,5vw,5.6rem)] font-semibold leading-[0.88] tracking-[-0.065em]">
              One identity across every screen.
            </h2>
          </div>

          <div className="max-w-3xl">
            <p className="text-lg leading-9 text-white/48">
              {caseStudy.summary}
            </p>

            <div className="mt-10 rounded-[2rem] border border-white/[0.09] bg-white/[0.025] p-7 sm:p-9">
              <p className="text-[0.6rem] uppercase tracking-[0.28em] text-white/28">
                Final result
              </p>

              <p className="mt-5 font-display text-2xl font-semibold leading-tight tracking-[-0.04em] sm:text-3xl">
                {project.result}
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/[0.14] bg-white px-6 text-sm font-semibold text-[#08090d] transition hover:-translate-y-0.5"
                >
                  Open live website
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : null}

              <Link
                href="/work"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.035] px-6 text-sm font-semibold text-white transition hover:bg-white/[0.07]"
              >
                View more work
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
