import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle2, ExternalLink, MapPin, MessageSquare, Star } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { getLandingPageConcept } from "@/config/landing-pages";

export type DemoConceptPageProps = {
  slug: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  primaryAction: string;
  secondaryAction: string;
  visualTitle: string;
  visualMetric: string;
  proofPoints: readonly string[];
  featureCards: readonly {
    title: string;
    copy: string;
  }[];
  sectionEyebrow: string;
  sectionTitle: string;
  sectionCopy: string;
  closingTitle: string;
};

function startHref(slug: string, title: string) {
  const params = new URLSearchParams({
    package: "landing-page",
    source: slug,
    design: title
  });

  return `/start-project?${params.toString()}`;
}

export function DemoConceptPage({
  slug,
  eyebrow,
  headline,
  subheadline,
  primaryAction,
  secondaryAction,
  visualTitle,
  visualMetric,
  proofPoints,
  featureCards,
  sectionEyebrow,
  sectionTitle,
  sectionCopy,
  closingTitle
}: DemoConceptPageProps) {
  const concept = getLandingPageConcept(slug);

  if (!concept) {
    notFound();
  }

  const [primary, secondary, surface] = concept.palette;
  const startProject = startHref(concept.slug, concept.title);

  return (
    <main className="overflow-hidden bg-[#07080c] text-white">
      <section className="relative min-h-svh overflow-hidden pt-8">
        <div aria-hidden="true" className="absolute inset-0 opacity-90" style={{ background: `radial-gradient(circle at 80% 10%, ${primary}30, transparent 32rem), radial-gradient(circle at 12% 70%, ${secondary}1f, transparent 28rem), linear-gradient(135deg, #07080c 0%, #0c0d14 100%)` }} />
        <div aria-hidden="true" className="page-grid pointer-events-none absolute inset-0 opacity-22" />

        <Container className="relative">
          <nav className="flex items-center justify-between rounded-full border border-white/[0.1] bg-white/[0.045] px-4 py-3 backdrop-blur md:px-6">
            <Link href="/landing-pages" className="inline-flex items-center gap-2 text-sm font-semibold text-white/55 transition hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              Gallery
            </Link>
            <div className="hidden items-center gap-6 text-sm font-semibold text-white/45 md:flex">
              <a href="#features">Features</a>
              <a href="#sections">Sections</a>
              <a href="#start">Start</a>
            </div>
            <Link href={startProject} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-bold text-[#07080c] transition hover:-translate-y-0.5">
              Start with this design
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </nav>

          <div className="grid min-h-[calc(100svh-6rem)] items-center gap-12 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:py-20">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.06] px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-white/70">
                <Star className="h-4 w-4" style={{ color: primary }} />
                {eyebrow}
              </p>
              <h1 className="mt-7 max-w-[10ch] font-display text-[clamp(4rem,9vw,8.8rem)] font-semibold leading-[0.78] tracking-[-0.08em]">
                {headline}
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/52 sm:text-xl sm:leading-9">
                {subheadline}
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link href={startProject} className="inline-flex min-h-13 items-center gap-2 rounded-full px-6 text-sm font-bold text-white shadow-[0_18px_70px_rgba(0,0,0,0.28)] transition hover:-translate-y-0.5" style={{ background: `linear-gradient(135deg, ${primary}, ${secondary})` }}>
                  {primaryAction}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <a href="#features" className="inline-flex min-h-13 items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-6 text-sm font-bold text-white/72 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white">
                  {secondaryAction}
                </a>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {proofPoints.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4">
                    <CheckCircle2 className="h-5 w-5" style={{ color: primary }} />
                    <p className="mt-3 text-sm font-semibold leading-6 text-white/58">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2.2rem] border border-white/[0.12] bg-white/[0.045] p-3 shadow-[0_35px_130px_rgba(0,0,0,0.42)] backdrop-blur">
              <div className="overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[#05060a]">
                <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4">
                  <div className="flex gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/14" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                  </div>
                  <span className="rounded-full border border-white/[0.08] bg-white/[0.045] px-4 py-1 text-xs text-white/45">{concept.style}</span>
                </div>

                <div className="grid gap-4 p-5">
                  <div className="grid gap-4 lg:grid-cols-[1fr_0.72fr]">
                    <div className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.045] p-5">
                      <p className="text-xs uppercase tracking-[0.22em] text-white/38">{visualTitle}</p>
                      <p className="mt-4 font-display text-5xl font-semibold tracking-[-0.07em]">{visualMetric}</p>
                      <div className="mt-6 grid gap-3">
                        {concept.sections.slice(0, 4).map((section, index) => (
                          <div key={section} className="flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.035] p-3">
                            <span className="text-sm text-white/58">{section}</span>
                            <span className="h-2.5 w-16 rounded-full" style={{ backgroundColor: index % 2 === 0 ? primary : secondary }} />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="grid gap-4">
                      {concept.tags.slice(0, 3).map((tag) => (
                        <div key={tag} className="rounded-[1.25rem] border border-white/[0.08] bg-white/[0.045] p-4">
                          <p className="text-xs text-white/35">Feature</p>
                          <p className="mt-2 font-display text-2xl font-semibold tracking-[-0.05em]">{tag}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {concept.recommendedFor.map((item) => (
                      <div key={item} className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4 text-sm text-white/62">{item}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="features" className="border-y border-white/[0.06] py-24">
        <Container>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featureCards.map((feature, index) => (
              <article key={feature.title} className="rounded-[1.6rem] border border-white/[0.08] bg-white/[0.035] p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.1] bg-white/[0.04]">
                  {index % 3 === 0 ? <MapPin className="h-5 w-5" style={{ color: primary }} /> : index % 3 === 1 ? <MessageSquare className="h-5 w-5" style={{ color: primary }} /> : <Star className="h-5 w-5" style={{ color: primary }} />}
                </div>
                <h2 className="mt-5 font-display text-2xl font-semibold tracking-[-0.045em]">{feature.title}</h2>
                <p className="mt-4 text-sm leading-7 text-white/46">{feature.copy}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="sections" className="py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color: primary }}>{sectionEyebrow}</p>
            <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.9] tracking-[-0.06em]">{sectionTitle}</h2>
            <p className="mt-6 text-base leading-8 text-white/46">{sectionCopy}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {concept.sections.map((section) => (
              <article key={section} className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.035] p-6">
                <CheckCircle2 className="h-5 w-5" style={{ color: primary }} />
                <p className="mt-5 font-display text-2xl font-semibold tracking-[-0.05em]">{section}</p>
                <p className="mt-3 text-sm leading-7 text-white/42">A focused content block that can be customized to the client’s offer, proof, and conversion goal.</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="start" className="relative py-24">
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]" style={{ backgroundColor: `${primary}18` }} />
        <Container className="relative rounded-[2rem] border border-white/[0.1] bg-white/[0.035] p-8 text-center sm:p-12">
          <p className="mx-auto inline-flex rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-white/45">
            {concept.priceLabel}
          </p>
          <h2 className="mx-auto mt-6 max-w-2xl font-display text-5xl font-semibold leading-[0.9] tracking-[-0.065em]">{closingTitle}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/48">Use this demo as the starting point. The final page would be customized around the client’s brand, offer, content, and conversion goal.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={startProject} className="inline-flex min-h-13 items-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-[#07080c] transition hover:-translate-y-0.5">
              Start with this design
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/landing-pages" className="inline-flex min-h-13 items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-6 text-sm font-bold text-white/72 transition hover:bg-white/[0.07] hover:text-white">
              Back to gallery
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
