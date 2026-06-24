import Link from "next/link";
import { ArrowUpRight, BookOpenText, Clock3 } from "lucide-react";
import { PageIntro } from "@/components/ui/PageIntro";
import { Container } from "@/components/ui/Container";

const articles = [
  {
    category: "Website strategy",
    title: "What a professional business website should accomplish in 2026",
    excerpt:
      "A practical framework for credibility, service clarity, conversion paths, performance, and long-term ownership.",
    readingTime: "8 min"
  },
  {
    category: "Sales",
    title: "Why case studies sell better than screenshot galleries",
    excerpt:
      "The strongest portfolio pages explain the original problem, strategic choices, implementation, and verified outcome.",
    readingTime: "6 min"
  },
  {
    category: "Business systems",
    title: "When your business needs a client portal instead of more spreadsheets",
    excerpt:
      "Signs that project status, approvals, files, billing, and client communication have outgrown disconnected tools.",
    readingTime: "7 min"
  },
  {
    category: "Project planning",
    title: "What affects the cost of a custom Next.js website",
    excerpt:
      "How templates, content, integrations, motion, data, testing, and timeline shape a realistic project scope.",
    readingTime: "9 min"
  },
  {
    category: "Design",
    title: "How to make a dark website feel premium without hurting readability",
    excerpt:
      "Contrast, surfaces, typography, restrained glow, motion, and the details that separate luxury from visual noise.",
    readingTime: "7 min"
  },
  {
    category: "Client preparation",
    title: "What clients should prepare before a website project begins",
    excerpt:
      "The business decisions, content, access, media, and feedback process that keep a project moving cleanly.",
    readingTime: "5 min"
  }
];

export default function InsightsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Insights"
        title="Useful thinking for better digital decisions."
        description="Articles support search visibility, demonstrate expertise, and answer the questions serious buyers ask before hiring."
      />

      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            {articles.map((article, index) => (
              <article
                key={article.title}
                className={`group rounded-[2rem] border border-white/[0.09] p-7 transition-colors hover:bg-white/[0.04] sm:p-9 ${
                  index === 0
                    ? "bg-[linear-gradient(145deg,rgba(124,92,255,.13),rgba(255,255,255,.02))] lg:col-span-2 lg:grid lg:grid-cols-[0.8fr_1.2fr] lg:gap-12"
                    : "bg-white/[0.025]"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.04]">
                    <BookOpenText className="h-5 w-5 text-[#8be9ff]" />
                  </span>
                  <span className="rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.22em] text-white/34">
                    Draft planned
                  </span>
                </div>
                <div className={index === 0 ? "mt-10 lg:mt-0" : "mt-10"}>
                  <p className="text-xs uppercase tracking-[0.3em] text-[#8be9ff]">
                    {article.category}
                  </p>
                  <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-4xl">
                    {article.title}
                  </h2>
                  <p className="mt-5 leading-8 text-white/42">{article.excerpt}</p>
                  <div className="mt-8 flex items-center justify-between border-t border-white/[0.08] pt-6 text-sm text-white/30">
                    <span className="inline-flex items-center gap-2">
                      <Clock3 className="h-4 w-4" />
                      {article.readingTime}
                    </span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-14 flex flex-col gap-4 rounded-[1.75rem] border border-white/[0.08] bg-white/[0.025] p-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold">The article system is ready for real content.</p>
              <p className="mt-2 text-sm leading-7 text-white/36">
                Dynamic article routes and the Supabase content workflow will be connected
                during the functionality phase.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#8be9ff] transition-colors hover:text-white"
            >
              Suggest a topic
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
