import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { HomeBackgroundBoundary } from "@/components/home/HomeBackgroundBoundary";
import { HomeExperience } from "@/components/home/HomeExperience";
import { HomeHeroActionsPlacement } from "@/components/home/HomeHeroActionsPlacement";
import { HomeHeroModeShowcase } from "@/components/home/HomeHeroModeShowcase";
import { HomeProofSections } from "@/components/home/HomeProofSections";
import { TinyViewportRecoveryStyles } from "@/components/layout/TinyViewportRecoveryStyles";
import { Container } from "@/components/ui/Container";
import { createPageMetadata } from "@/lib/metadata";

const homepageFaqs = [
  ["What does GridSpell build?", "Premium websites, landing pages, service pages, client portals, dashboards, web apps, and connected business systems."],
  ["How much does a project usually cost?", "Most projects start from the package range on the pricing page. Final pricing depends on scope, timeline, integrations, content, and support needs."],
  ["How long does a project take?", "A focused launch website can take a few weeks. Bigger redesigns, portals, dashboards, and custom systems take longer after the brief is reviewed."],
  ["Can GridSpell redesign my current website?", "Yes. GridSpell can improve structure, design, service pages, mobile experience, SEO setup, redirects, analytics, and launch quality."],
  ["Do you build portals and dashboards?", "Yes. GridSpell can build client portals, admin dashboards, lead pipelines, project workspaces, approval flows, and internal tools."],
  ["What do I need before starting?", "A goal, service offer, target customers, rough budget, timeline, current website if you have one, and a few example websites are enough to start."],
  ["Will the website be mobile-friendly and SEO-ready?", "Yes. Responsive layout, page structure, metadata, sitemap, performance, accessibility basics, and launch checks are part of the process."],
  ["Do you offer support after launch?", "Yes. Care plans can cover updates, fixes, content changes, monitoring, analytics review, new sections, and ongoing growth work."]
] as const;

export const metadata: Metadata = createPageMetadata({
  title: "GridSpell Studio — Websites, Portals & Digital Systems",
  description:
    "GridSpell creates premium websites, client portals, dashboards, and connected digital systems for ambitious businesses.",
  path: "/"
});

function HomeFAQSection() {
  return (
    <section className="home-faq-section relative z-[3] isolate overflow-hidden border-t border-white/[0.06] bg-[#07080c] py-24 text-white max-xl:bg-transparent sm:py-32">
      <div aria-hidden="true" className="page-grid pointer-events-none absolute inset-0 opacity-24" />
      <Container className="relative">
        <div className="grid gap-12 xl:grid-cols-[0.78fr_1.22fr] xl:items-start">
          <div>
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.42em] text-[#8be9ff]">FAQ</p>
            <h2 className="mt-6 max-w-[11ch] text-balance font-display text-[clamp(3.2rem,7vw,7.2rem)] font-semibold leading-[0.84] tracking-[-0.075em]">
              Questions before we build.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/46 sm:text-lg">
              Quick answers for businesses comparing websites, redesigns, portals, dashboards, and ongoing support.
            </p>
            <Link href="/start-project" className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#8be9ff]/18 bg-[#8be9ff]/8 px-5 text-sm font-semibold text-[#8be9ff] transition hover:border-[#8be9ff]/35 hover:bg-[#8be9ff]/12 hover:text-white">
              Ask about your project
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-3">
            {homepageFaqs.map(([question, answer], index) => (
              <details key={question} className="group rounded-[1.45rem] border border-white/[0.08] bg-white/[0.025] p-5 transition open:border-[#8be9ff]/20 open:bg-[#8be9ff]/[0.045] sm:p-6" open={index === 0}>
                <summary className="flex cursor-pointer list-none items-start justify-between gap-5 [&::-webkit-details-marker]:hidden">
                  <span>
                    <span className="font-mono text-[0.56rem] tracking-[0.2em] text-[#8be9ff]">{String(index + 1).padStart(2, "0")}</span>
                    <span className="mt-3 block font-display text-2xl font-semibold leading-tight tracking-[-0.045em] text-white sm:text-3xl">{question}</span>
                  </span>
                  <span className="relative mt-2 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/[0.1] bg-white/[0.035] text-white/46 transition group-open:rotate-45 group-open:border-[#8be9ff]/22 group-open:text-[#8be9ff]">
                    <span className="absolute h-px w-3.5 bg-current" />
                    <span className="absolute h-3.5 w-px bg-current" />
                  </span>
                </summary>
                <p className="mt-5 max-w-3xl text-sm leading-7 text-white/48 sm:text-base sm:leading-8">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HomeBackgroundBoundary />
      <HomeExperience />
      <HomeProofSections />
      <HomeHeroModeShowcase />
      <HomeFAQSection />
      <HomeHeroActionsPlacement />
      <TinyViewportRecoveryStyles />
    </>
  );
}
