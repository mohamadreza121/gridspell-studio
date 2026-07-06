import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { insightArticles } from "@/config/insights";

function StaticInsightBackgroundMark() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-[-15rem] top-20 h-[34rem] w-[34rem] opacity-70 sm:right-[-10rem] sm:h-[40rem] sm:w-[40rem]"
    >
      <div className="absolute inset-0 rounded-full bg-[#7c5cff]/10 blur-[105px]" />
      <svg
        viewBox="0 0 1000 1000"
        className="relative h-full w-full rotate-[-8deg] overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="insights-static-g" x1="180" y1="170" x2="835" y2="810" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#9D87FF" />
            <stop offset="44%" stopColor="#7C5CFF" />
            <stop offset="76%" stopColor="#67AEFF" />
            <stop offset="100%" stopColor="#29D6FF" />
          </linearGradient>
          <filter id="insights-static-g-glow" x="-18%" y="-18%" width="136%" height="136%" colorInterpolationFilters="sRGB">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.42 0" result="softGlow" />
            <feMerge>
              <feMergeNode in="softGlow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g opacity="0.5" filter="url(#insights-static-g-glow)">
          <path
            d="M770 308 C704 243 613 208 500 208 C337 208 208 337 208 500 C208 663 337 792 500 792 C634 792 748 705 786 584"
            stroke="url(#insights-static-g)"
            strokeWidth="68"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M580 560 H792"
            stroke="url(#insights-static-g)"
            strokeWidth="68"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
}

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
      <StaticInsightBackgroundMark />

      <Container className="relative z-10">
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

        <section className="mt-16 rounded-[2rem] border border-[#8be9ff]/18 bg-white/[0.025] p-7 backdrop-blur-sm sm:p-10">
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
