import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { packages } from "@/config/packages";
import { getServiceBySlug, services } from "@/config/services";
import { createPageMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

const serviceHeroThemes: Record<
  string,
  {
    eyebrow: string;
    chips: string[];
    glowA: string;
    glowB: string;
    panelBorder: string;
    panelBg: string;
    statLabel: string;
    statValue: string;
    statCaption: string;
  }
> = {
  "business-websites": {
    eyebrow: "Conversion website",
    chips: ["Positioning", "Proof", "Lead capture"],
    glowA: "bg-[radial-gradient(circle,rgba(41,214,255,0.22),transparent_62%)]",
    glowB: "bg-[radial-gradient(circle,rgba(124,92,255,0.20),transparent_64%)]",
    panelBorder: "border-[#8be9ff]/20",
    panelBg:
      "bg-[linear-gradient(145deg,rgba(11,13,19,0.94),rgba(41,214,255,0.08))]",
    statLabel: "Primary goal",
    statValue: "Convert more qualified visitors",
    statCaption: "Clear message, stronger proof, better next step"
  },
  "website-redesign": {
    eyebrow: "Strategic relaunch",
    chips: ["Audit", "Restructure", "Relaunch"],
    glowA: "bg-[radial-gradient(circle,rgba(124,92,255,0.24),transparent_62%)]",
    glowB: "bg-[radial-gradient(circle,rgba(100,119,255,0.18),transparent_64%)]",
    panelBorder: "border-[#7c5cff]/20",
    panelBg:
      "bg-[linear-gradient(145deg,rgba(11,13,19,0.94),rgba(124,92,255,0.08))]",
    statLabel: "Primary goal",
    statValue: "Fix what is underperforming",
    statCaption: "Better clarity, better structure, better trust"
  },
  "landing-pages": {
    eyebrow: "Campaign page",
    chips: ["Offers", "Testing", "Conversion"],
    glowA: "bg-[radial-gradient(circle,rgba(255,120,214,0.20),transparent_60%)]",
    glowB: "bg-[radial-gradient(circle,rgba(41,214,255,0.18),transparent_65%)]",
    panelBorder: "border-pink-400/20",
    panelBg:
      "bg-[linear-gradient(145deg,rgba(11,13,19,0.94),rgba(255,120,214,0.08))]",
    statLabel: "Primary goal",
    statValue: "Turn campaigns into enquiries",
    statCaption: "Focused pages built to reduce drop-off"
  },
  "client-portals": {
    eyebrow: "Private workflow system",
    chips: ["Accounts", "Permissions", "Workflow"],
    glowA: "bg-[radial-gradient(circle,rgba(41,214,255,0.22),transparent_62%)]",
    glowB: "bg-[radial-gradient(circle,rgba(86,255,180,0.16),transparent_65%)]",
    panelBorder: "border-cyan-400/20",
    panelBg:
      "bg-[linear-gradient(145deg,rgba(11,13,19,0.94),rgba(41,214,255,0.08))]",
    statLabel: "Primary goal",
    statValue: "Reduce admin work and friction",
    statCaption: "Client-facing systems that actually improve operations"
  },
  "full-stack-apps": {
    eyebrow: "Custom product build",
    chips: ["Product", "Logic", "Integrations"],
    glowA: "bg-[radial-gradient(circle,rgba(100,119,255,0.24),transparent_62%)]",
    glowB: "bg-[radial-gradient(circle,rgba(41,214,255,0.16),transparent_65%)]",
    panelBorder: "border-indigo-400/20",
    panelBg:
      "bg-[linear-gradient(145deg,rgba(11,13,19,0.94),rgba(100,119,255,0.09))]",
    statLabel: "Primary goal",
    statValue: "Build something operationally useful",
    statCaption: "Purpose-built web apps with business logic and scale in mind"
  },
  "care-plans": {
    eyebrow: "Ongoing support",
    chips: ["Updates", "Monitoring", "Growth"],
    glowA: "bg-[radial-gradient(circle,rgba(86,255,180,0.20),transparent_62%)]",
    glowB: "bg-[radial-gradient(circle,rgba(41,214,255,0.16),transparent_65%)]",
    panelBorder: "border-emerald-400/20",
    panelBg:
      "bg-[linear-gradient(145deg,rgba(11,13,19,0.94),rgba(86,255,180,0.08))]",
    statLabel: "Primary goal",
    statValue: "Keep the website reliable after launch",
    statCaption: "Protection, upkeep, and steady improvement"
  }
};



export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) return {};

  return createPageMetadata({
    title: service.title,
    description: service.summary,
    path: `/services/${service.slug}`,
    image: `/services/${service.slug}/opengraph-image`,
    imageAlt: `${service.title} by GridSpell Studio`
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  const recommendedPackage = packages.find((item) => item.id === service.packageId);
  const relatedServices = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  const heroTheme =
  serviceHeroThemes[service.slug] ?? serviceHeroThemes["business-websites"];

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/[0.07] bg-[#07080c]">
        <div aria-hidden="true" className="page-grid pointer-events-none absolute inset-0 opacity-25" />

        <div
          aria-hidden="true"
          className={`pointer-events-none absolute left-[-10rem] top-[-4rem] h-[28rem] w-[28rem] rounded-full blur-[110px] ${heroTheme.glowA}`}
        />
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute right-[-10rem] top-16 h-[30rem] w-[30rem] rounded-full blur-[120px] ${heroTheme.glowB}`}
        />

        <Container className="relative grid gap-12 pb-16 pt-32 sm:pb-20 sm:pt-36 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:pb-24">
          <div>
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.36em] text-[#8be9ff]">
              Service {service.number} · {heroTheme.eyebrow}
            </p>

            <h1 className="mt-6 max-w-[11.5ch] text-balance font-display text-[clamp(3.1rem,8vw,6.4rem)] font-semibold leading-[0.84] tracking-[-0.075em] text-white">
              {service.salesHeadline}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/48 sm:text-lg sm:leading-9">
              {service.summary}
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {heroTheme.chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-white/[0.1] bg-white/[0.03] px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/46"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <div
            className={`relative overflow-hidden rounded-[2rem] border p-6 sm:p-7 lg:p-8 ${heroTheme.panelBorder} ${heroTheme.panelBg}`}
          >
            <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent)]" />

            <div className="relative">
              <p className="text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-[#8be9ff]">
                {heroTheme.statLabel}
              </p>

              <h2 className="mt-5 max-w-[14ch] font-display text-3xl font-semibold leading-[0.94] tracking-[-0.05em] text-white sm:text-[2.5rem]">
                {heroTheme.statValue}
              </h2>

              <p className="mt-4 max-w-md text-sm leading-7 text-white/42">
                {heroTheme.statCaption}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.25rem] border border-white/[0.08] bg-white/[0.04] p-4">
                  <p className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-white/28">
                    Best fit
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white/54">{service.idealFor}</p>
                </div>

                <div className="rounded-[1.25rem] border border-white/[0.08] bg-white/[0.04] p-4">
                  <p className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-white/28">
                    Starting point
                  </p>
                  <p className="mt-3 font-display text-2xl font-semibold tracking-[-0.045em] text-white">
                    {recommendedPackage?.name ?? "Custom"}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#8be9ff]">
                    {recommendedPackage?.price ?? "Quoted by scope"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section className="border-y border-white/[0.07] bg-white/[0.012] py-20 lg:py-28">
        <Container className="grid gap-5 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-white/[0.09] bg-white/[0.025] p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#8be9ff]">Why it matters</p>
            <p className="mt-5 text-base leading-8 text-white/52">{service.problem}</p>
          </article>
          <article className="rounded-[2rem] border border-[#8be9ff]/18 bg-[#8be9ff]/6 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#8be9ff]">GridSpell approach</p>
            <p className="mt-5 text-base leading-8 text-white/58">{service.promise}</p>
          </article>
        </Container>
      </section>
      <section className="py-20 lg:py-28">
        <Container className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="text-xs uppercase tracking-[.32em] text-white/28">Best fit</p>
            <p className="mt-5 text-xl leading-9 text-white/58">{service.idealFor}</p>
            <div className="mt-8 rounded-[1.5rem] border border-[#8be9ff]/18 bg-[#8be9ff]/6 p-5">
              <p className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[#8be9ff]">Starting point</p>
              <p className="mt-4 font-display text-3xl font-semibold tracking-[-0.055em] text-white">{recommendedPackage?.name ?? "Custom"}</p>
              <p className="mt-2 text-sm font-semibold text-[#8be9ff]">{recommendedPackage?.price ?? "Quoted by scope"}</p>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/[.09] bg-white/[.025] p-8">
            <p className="text-xs uppercase tracking-[.32em] text-[#8be9ff]">Outcomes</p>
            <ul className="mt-8 grid gap-5">
              {service.outcomes.map((item) => (
                <li key={item} className="flex gap-4 border-b border-white/[.07] pb-5 text-lg text-white/62">
                  <CheckCircle2 className="mt-1 h-5 w-5 text-[#8be9ff]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
      <section className="border-y border-white/[0.07] bg-white/[0.012] py-20 lg:py-28">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/[0.09] bg-white/[0.025] p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#8be9ff]">Core deliverables</p>
            <ul className="mt-8 grid gap-4">
              {service.deliverables.map((item) => (
                <li key={item} className="flex gap-4 border-b border-white/[0.07] pb-4 text-base leading-7 text-white/58 last:border-b-0 last:pb-0">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#8be9ff]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[2rem] border border-white/[0.09] bg-white/[0.025] p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#8be9ff]">Process</p>
            <div className="mt-8 grid gap-5">
              {service.process.map((step, index) => (
                <article key={step.title} className="border-b border-white/[0.08] pb-5 last:border-b-0 last:pb-0">
                  <p className="text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-white/28">Step {index + 1}</p>
                  <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.045em] text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/42">{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>
      <section className="py-20 lg:py-28">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#8be9ff]">Questions</p>
            <h2 className="mt-5 max-w-xl font-display text-4xl font-semibold leading-[0.94] tracking-[-0.055em] text-white sm:text-5xl">What clients usually ask first.</h2>
          </div>
          <div className="grid gap-4">
            {service.faqs.map((faq) => (
              <article key={faq.question} className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.025] p-6">
                <h3 className="font-display text-2xl font-semibold tracking-[-0.04em] text-white">{faq.question}</h3>
                <p className="mt-3 text-sm leading-7 text-white/44">{faq.answer}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div aria-hidden="true" className="page-grid pointer-events-none absolute inset-0 opacity-20" />
        <Container className="relative">
          <div className="rounded-[2.2rem] border border-[#8be9ff]/18 bg-[radial-gradient(circle_at_88%_12%,rgba(41,214,255,0.13),transparent_22rem),linear-gradient(145deg,rgba(124,92,255,0.13),rgba(11,13,19,0.94))] p-8 sm:p-10 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#8be9ff]">Ready to scope it?</p>
                <h2 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[0.94] tracking-[-0.055em] text-white sm:text-5xl">Tell GridSpell what you are building and get the right next step.</h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-white/46">The project brief keeps the service, scope, budget, and timeline together so the first conversation is useful.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link href="/start-project" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-[linear-gradient(135deg,#7c5cff_0%,#6477ff_48%,#29d6ff_100%)] px-6 text-sm font-semibold text-white shadow-[0_14px_44px_rgba(92,104,255,0.26)] transition hover:-translate-y-0.5">
                  Start a project
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link href="/services" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.035] px-6 text-sm font-semibold text-white/58 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white">
                  View all services
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {relatedServices.map((item) => (
              <Link key={item.slug} href={`/services/${item.slug}`} className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.025] p-5 transition hover:border-[#8be9ff]/20 hover:bg-white/[0.04]">
                <p className="text-[0.56rem] font-semibold uppercase tracking-[0.2em] text-[#8be9ff]">{item.number} · Related</p>
                <p className="mt-4 font-display text-2xl font-semibold tracking-[-0.045em] text-white">{item.shortTitle}</p>
                <p className="mt-3 text-sm leading-7 text-white/38">{item.summary}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
