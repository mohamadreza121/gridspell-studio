import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { insightArticles } from "@/config/insights";

export function InsightsStaticFallback() {
  const featuredArticle =
    insightArticles.find((article) => article.featured) ?? insightArticles[0];
  const remainingArticles = insightArticles.filter(
    (article) => article.slug !== featuredArticle.slug
  );

  return (
    <main className="relative overflow-hidden bg-[#07080c] pb-24 pt-32">
      <div
        aria-hidden="true"
        className="page-grid pointer-events-none absolute inset-0 opacity-35"
      />

      <Container className="relative">
        <div className="max-w-4xl">
          <p className="text-[0.64rem] font-semibold uppercase tracking-[0.38em] text-[#8be9ff]">
            Insights
          </p>

          <h1 className="mt-7 text-balance font-display text-[clamp(4rem,12vw,7.6rem)] font-semibold leading-[0.82] tracking-[-0.075em] text-white">
            Practical thinking for better digital work.
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-white/45 sm:text-lg">
            Guides on website strategy, interface design, development, SEO,
            project planning, and digital ownership.
          </p>
        </div>

        <section className="mt-16 rounded-[2rem] border border-[#8be9ff]/18 bg-white/[0.025] p-7 sm:p-10">
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-[#8be9ff]">
            Featured · {featuredArticle.category}
          </p>

          <h2 className="mt-6 max-w-[18ch] font-display text-4xl font-semibold leading-[0.94] tracking-[-0.06em] text-white sm:text-6xl">
            {featuredArticle.title}
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-8 text-white/46">
            {featuredArticle.excerpt}
          </p>

          <div className="mt-7 flex gap-3">
            <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-[#8be9ff]/25 bg-[#8be9ff]/[0.06]">
              <Check className="h-3 w-3 text-[#8be9ff]" />
            </span>
            <p className="max-w-2xl text-sm leading-7 text-white/58">
              {featuredArticle.takeaway}
            </p>
          </div>

          <Link
            href={`/insights/${featuredArticle.slug}`}
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#8be9ff]"
          >
            Read the guide
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </section>

        <div className="mt-16 grid gap-12">
          {remainingArticles.map((article) => (
            <article
              key={article.slug}
              className="border-t border-white/[0.08] pt-8"
            >
              <p className="text-[0.58rem] font-semibold uppercase tracking-[0.26em] text-[#8be9ff]">
                {article.category} · {article.readingTime}
              </p>

              <h2 className="mt-5 max-w-[20ch] font-display text-3xl font-semibold leading-[0.96] tracking-[-0.05em] text-white sm:text-5xl">
                {article.title}
              </h2>

              <p className="mt-5 max-w-3xl text-base leading-8 text-white/44">
                {article.excerpt}
              </p>

              <Link
                href={`/insights/${article.slug}`}
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#8be9ff]"
              >
                Read article
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </main>
  );
}
