import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { services } from "@/config/services";

export function ServicesStaticFallback() {
  return (
    <main className="relative overflow-hidden bg-[#07080c] pb-24 pt-32 text-white">
      <div aria-hidden="true" className="page-grid pointer-events-none absolute inset-0 opacity-34" />
      <div aria-hidden="true" className="pointer-events-none absolute right-[-14rem] top-32 h-[30rem] w-[30rem] rounded-full bg-[#29d6ff]/10 blur-[130px]" />
      <div aria-hidden="true" className="pointer-events-none absolute left-[-14rem] top-[48rem] h-[32rem] w-[32rem] rounded-full bg-[#7c5cff]/12 blur-[150px]" />

      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-[0.64rem] font-semibold uppercase tracking-[0.38em] text-[#8be9ff]">
              Services
            </p>
            <h1 className="mt-7 text-balance font-display text-[clamp(4rem,12vw,7.6rem)] font-semibold leading-[0.82] tracking-[-0.075em] text-white">
              Clear websites. Useful systems.
            </h1>
          </div>
          <p className="max-w-3xl text-base leading-8 text-white/46 sm:text-lg sm:leading-9">
            GridSpell services are organized around real business decisions: what visitors need to understand, what the website should prove, and what needs to work after launch.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {[
            ["Sales clarity", "Pages explain the offer, proof, and next step without making visitors guess."],
            ["Technical foundation", "Next.js, SEO basics, analytics, forms, and deployment are considered from the start."],
            ["Room to grow", "A launch site can grow into service pages, dashboards, portals, and business workflows."]
          ].map(([title, text]) => (
            <article key={title} className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.025] p-5">
              <p className="font-display text-2xl font-semibold tracking-[-0.045em] text-white">{title}</p>
              <p className="mt-3 text-sm leading-7 text-white/40">{text}</p>
            </article>
          ))}
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          {services.map((service) => (
            <article key={service.slug} className="group relative overflow-hidden rounded-[2rem] border border-white/[0.09] bg-white/[0.025] p-6 transition duration-300 hover:border-[#8be9ff]/20 hover:bg-white/[0.04] sm:p-7">
              <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#7c5cff]/10 blur-[70px] transition group-hover:bg-[#29d6ff]/10" />

              <p className="relative font-mono text-[0.62rem] tracking-[0.2em] text-[#8be9ff]">
                {service.number} · {service.shortTitle}
              </p>

              <h2 className="relative mt-5 max-w-3xl font-display text-4xl font-semibold leading-[0.94] tracking-[-0.055em] text-white sm:text-5xl">
                {service.salesHeadline}
              </h2>

              <p className="relative mt-6 max-w-2xl text-base leading-8 text-white/44">
                {service.summary}
              </p>

              <div className="relative mt-7 rounded-[1.35rem] border border-[#8be9ff]/14 bg-[#8be9ff]/5 p-4">
                <p className="text-[0.56rem] font-semibold uppercase tracking-[0.2em] text-[#8be9ff]">
                  Why it matters
                </p>
                <p className="mt-3 text-sm leading-7 text-white/50">{service.problem}</p>
              </div>

              <ul className="relative mt-7 grid gap-3 sm:grid-cols-2">
                {service.outcomes.slice(0, 4).map((outcome) => (
                  <li key={outcome} className="flex gap-3 text-sm leading-6 text-white/50">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#8be9ff]" />
                    {outcome}
                  </li>
                ))}
              </ul>

              <div className="relative mt-7 flex flex-wrap gap-2 border-t border-white/[0.08] pt-6">
                {service.deliverables.slice(0, 4).map((deliverable) => (
                  <span key={deliverable} className="rounded-full border border-white/[0.09] bg-white/[0.025] px-4 py-2 text-[0.6rem] uppercase tracking-[0.18em] text-white/42">
                    {deliverable}
                  </span>
                ))}
              </div>

              <div className="relative mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={`/services/${service.slug}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#8be9ff]/20 bg-[#8be9ff]/8 px-5 text-sm font-semibold text-[#8be9ff] transition hover:border-[#8be9ff]/35 hover:bg-[#8be9ff]/12 hover:text-white">
                  Explore service
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link href="/start-project" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.025] px-5 text-sm font-semibold text-white/50 transition hover:border-white/20 hover:text-white">
                  Start this project
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </main>
  );
}
