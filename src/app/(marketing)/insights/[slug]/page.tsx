import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Clock3
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import {
  getInsightBySlug,
  insightArticles
} from "@/config/insights";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return insightArticles.map((article) => ({
    slug: article.slug
  }));
}

export async function generateMetadata({
  params
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getInsightBySlug(slug);

  if (!article) {
    return {};
  }

  return {
    title: `${article.title} | GridSpell Insights`,
    description: article.excerpt
  };
}

export default async function InsightArticlePage({
  params
}: Props) {
  const { slug } = await params;
  const article = getInsightBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="relative overflow-hidden bg-[#07080c] text-white">
      <div
        aria-hidden="true"
        className="page-grid pointer-events-none absolute inset-0 opacity-30"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-56 top-28 h-[38rem] w-[38rem] rounded-full bg-[#7c5cff]/10 blur-[150px]"
      />

      <article className="relative pb-24 pt-32 sm:pb-32">
        <Container>
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/36 transition hover:text-[#8be9ff]"
          >
            <ArrowLeft className="h-4 w-4" />
            All insights
          </Link>

          <header className="mt-14 max-w-6xl">
            <div className="flex flex-wrap items-center gap-4">
              <p className="text-[0.64rem] font-semibold uppercase tracking-[0.32em] text-[#8be9ff]">
                {article.category}
              </p>

              <span className="h-1 w-1 rounded-full bg-white/25" />

              <span className="inline-flex items-center gap-2 text-xs text-white/30">
                <Clock3 className="h-3.5 w-3.5" />
                {article.readingTime}
              </span>
            </div>

            <h1 className="mt-8 max-w-[13ch] text-balance font-display text-[clamp(3.8rem,7.6vw,8.5rem)] font-semibold leading-[0.81] tracking-[-0.079em]">
              {article.title}
            </h1>

            <p className="mt-9 max-w-4xl text-lg leading-9 text-white/48 sm:text-xl">
              {article.excerpt}
            </p>

            <div className="mt-10 max-w-4xl border-l border-[#8be9ff]/35 pl-6">
              <p className="text-[0.58rem] font-semibold uppercase tracking-[0.25em] text-white/27">
                Key takeaway
              </p>

              <p className="mt-3 font-display text-2xl font-semibold leading-snug tracking-[-0.04em] text-white/82 sm:text-3xl">
                {article.takeaway}
              </p>
            </div>
          </header>

          <div className="mt-20 grid gap-14 border-t border-white/[0.08] pt-14 lg:grid-cols-[0.28fr_0.72fr] lg:gap-20">
            <aside className="lg:sticky lg:top-32 lg:self-start">
              <p className="text-[0.58rem] font-semibold uppercase tracking-[0.25em] text-white/25">
                In this guide
              </p>

              <ol className="mt-6 grid gap-4">
                {article.sections.map((section, index) => (
                  <li
                    key={section.heading}
                    className="flex gap-3 text-sm leading-6 text-white/40"
                  >
                    <span className="font-mono text-[0.58rem] text-[#8be9ff]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {section.heading}
                  </li>
                ))}
              </ol>
            </aside>

            <div className="max-w-3xl">
              {article.sections.map((section, index) => (
                <section
                  key={section.heading}
                  className="border-t border-white/[0.08] py-12 first:border-t-0 first:pt-0"
                >
                  <div className="flex items-start gap-5">
                    <span className="mt-2 font-mono text-[0.62rem] tracking-[0.18em] text-[#8be9ff]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <h2 className="font-display text-3xl font-semibold leading-tight tracking-[-0.05em] sm:text-4xl">
                      {section.heading}
                    </h2>
                  </div>

                  <div className="mt-7 space-y-6 text-base leading-8 text-white/48 sm:text-lg sm:leading-9">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {section.bullets ? (
                    <ul className="mt-8 grid gap-4 rounded-[1.6rem] border border-white/[0.08] bg-white/[0.022] p-6 sm:p-7">
                      {section.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex gap-3 text-sm leading-7 text-white/54 sm:text-base"
                        >
                          <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-[#8be9ff]/25 bg-[#8be9ff]/[0.06]">
                            <Check className="h-3 w-3 text-[#8be9ff]" />
                          </span>

                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}

              <section className="mt-8 rounded-[2rem] border border-white/[0.09] bg-[linear-gradient(145deg,rgba(124,92,255,0.11),rgba(41,214,255,0.035))] p-7 sm:p-10">
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.26em] text-[#8be9ff]">
                  Apply it to your project
                </p>

                <h2 className="mt-5 max-w-[14ch] font-display text-3xl font-semibold leading-tight tracking-[-0.05em] sm:text-4xl">
                  Turn the decision into a clear production plan.
                </h2>

                <p className="mt-5 max-w-2xl text-base leading-8 text-white/44">
                  GridSpell can help define the strategy, interface, technical
                  requirements, integrations, launch setup, and ongoing
                  ownership for your website or application.
                </p>

                <Link
                  href="/start-project"
                  className="group mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#08090d] transition hover:-translate-y-0.5"
                >
                  Start a project

                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </section>
            </div>
          </div>
        </Container>
      </article>
    </main>
  );
}