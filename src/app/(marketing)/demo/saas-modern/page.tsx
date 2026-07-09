import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BarChart3, CheckCircle2, Layers, ShieldCheck, Sparkles, Zap } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { getLandingPageConcept } from "@/config/landing-pages";
import { createPageMetadata } from "@/lib/metadata";

const concept = getLandingPageConcept("saas-modern");

export const metadata: Metadata = createPageMetadata({
  title: "SaaS Modern Landing Page Demo",
  description:
    "A modern SaaS landing page demo for software, AI tools, dashboards, and product launches.",
  path: "/demo/saas-modern"
});

const features = [
  [Zap, "Fast onboarding", "Guide users from first visit to product value with a sharp, focused flow."],
  [Layers, "Feature clarity", "Explain product benefits without turning the page into a wall of text."],
  [ShieldCheck, "Trust-ready", "Add security, integrations, testimonials, and credibility blocks."],
  [BarChart3, "Conversion path", "Move visitors toward trials, demos, pricing, or waitlist signups."]
] as const;

function startHref() {
  const params = new URLSearchParams({
    package: "landing-page",
    source: "saas-modern",
    design: concept?.title ?? "SaaS Modern"
  });

  return `/start-project?${params.toString()}`;
}

export default function SaasModernDemoPage() {
  return (
    <main className="overflow-hidden bg-[#020617] text-white">
      <section className="relative min-h-svh overflow-hidden pt-8">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(124,58,237,0.34),transparent_34rem),radial-gradient(circle_at_80%_40%,rgba(6,182,212,0.16),transparent_30rem)]" />
        <div aria-hidden="true" className="page-grid pointer-events-none absolute inset-0 opacity-20" />

        <Container className="relative">
          <nav className="flex items-center justify-between rounded-full border border-white/[0.1] bg-white/[0.045] px-4 py-3 backdrop-blur md:px-6">
            <Link href="/landing-pages" className="inline-flex items-center gap-2 text-sm font-semibold text-white/55 transition hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              Gallery
            </Link>
            <div className="hidden items-center gap-6 text-sm font-semibold text-white/45 md:flex">
              <a href="#features">Features</a>
              <a href="#pricing">Pricing</a>
              <a href="#features">Workflow</a>
            </div>
            <Link href={startHref()} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-bold text-[#020617] transition hover:-translate-y-0.5">
              Start with this design
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </nav>

          <div className="grid min-h-[calc(100svh-6rem)] items-center gap-12 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:py-20">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan-200">
                <Sparkles className="h-4 w-4" />
                SaaS landing demo
              </p>
              <h1 className="mt-7 max-w-[11ch] font-display text-[clamp(4rem,9vw,8.6rem)] font-semibold leading-[0.78] tracking-[-0.08em]">
                Turn product value into signups.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/52 sm:text-xl sm:leading-9">
                A crisp SaaS layout for software products that need to explain the promise, show the interface, and drive users toward a trial or demo.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link href={startHref()} className="inline-flex min-h-13 items-center gap-2 rounded-full bg-[linear-gradient(135deg,#7c3aed,#06b6d4)] px-6 text-sm font-bold text-white shadow-[0_18px_70px_rgba(6,182,212,0.22)] transition hover:-translate-y-0.5">
                  Start with this design
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <a href="#features" className="inline-flex min-h-13 items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-6 text-sm font-bold text-white/72 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white">
                  See sections
                </a>
              </div>
            </div>

            <div className="rounded-[2.2rem] border border-white/[0.12] bg-white/[0.04] p-3 shadow-[0_35px_130px_rgba(0,0,0,0.45)] backdrop-blur">
              <div className="overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[#060916]">
                <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4">
                  <div className="flex gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/14" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                  </div>
                  <span className="rounded-full border border-cyan-300/16 bg-cyan-300/8 px-4 py-1 text-xs text-cyan-100/70">app.gridspell.demo</span>
                </div>
                <div className="grid gap-4 p-5">
                  <div className="grid gap-4 lg:grid-cols-[1fr_0.7fr]">
                    <div className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.045] p-5">
                      <p className="text-xs uppercase tracking-[0.22em] text-cyan-200/70">Revenue overview</p>
                      <p className="mt-4 font-display text-5xl font-semibold tracking-[-0.07em]">$128.4k</p>
                      <div className="mt-5 flex h-28 items-end gap-2">
                        {[38, 54, 42, 70, 61, 88, 96].map((height) => (
                          <span key={height} className="flex-1 rounded-t-xl bg-[linear-gradient(180deg,#22d3ee,#7c3aed)]" style={{ height: `${height}%` }} />
                        ))}
                      </div>
                    </div>
                    <div className="grid gap-4">
                      {[
                        ["Activation", "+24%"],
                        ["Retention", "91%"],
                        ["Pipeline", "42 leads"]
                      ].map(([label, value]) => (
                        <div key={label} className="rounded-[1.25rem] border border-white/[0.08] bg-white/[0.045] p-4">
                          <p className="text-xs text-white/38">{label}</p>
                          <p className="mt-2 font-display text-2xl font-semibold tracking-[-0.05em]">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {["AI summaries", "Team dashboards", "Stripe-ready"].map((item) => (
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
            {features.map(([Icon, title, copy]) => (
              <article key={title} className="rounded-[1.6rem] border border-white/[0.08] bg-white/[0.035] p-6">
                <Icon className="h-6 w-6 text-cyan-200" />
                <h2 className="mt-5 font-display text-2xl font-semibold tracking-[-0.045em]">{title}</h2>
                <p className="mt-4 text-sm leading-7 text-white/46">{copy}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="pricing" className="py-24">
        <Container className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-200">Pricing section</p>
            <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.9] tracking-[-0.06em]">Built for trial, demo, or waitlist conversion.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {["Starter", "Growth", "Scale"].map((plan, index) => (
              <div key={plan} className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.035] p-5">
                <p className="font-display text-2xl font-semibold tracking-[-0.05em]">{plan}</p>
                <p className="mt-3 text-4xl font-semibold tracking-[-0.06em]">${[29, 79, 149][index]}</p>
                <ul className="mt-5 grid gap-3 text-sm text-white/52">
                  {["Core features", "Analytics", "Support"].map((item) => (
                    <li key={item} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-cyan-200" />{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
