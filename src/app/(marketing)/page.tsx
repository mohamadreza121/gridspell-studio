import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, HelpCircle } from "lucide-react";

import { HomeBackgroundBoundary } from "@/components/home/HomeBackgroundBoundary";
import { HomeExperience } from "@/components/home/HomeExperience";
import { HomeHeroActionsPlacement } from "@/components/home/HomeHeroActionsPlacement";
import { HomeHeroModeShowcase } from "@/components/home/HomeHeroModeShowcase";
import { HomeProofSections } from "@/components/home/HomeProofSections";
import { Container } from "@/components/ui/Container";
import { createPageMetadata } from "@/lib/metadata";

const homepageFaqs = [
  [
    "What does GridSpell build?",
    "Premium websites, service pages, landing pages, client portals, dashboards, custom web apps, and connected digital systems."
  ],
  [
    "How much does a project usually cost?",
    "Most projects start from the package range on the pricing page. The final quote depends on scope, content, integrations, timeline, and support needs."
  ],
  [
    "How long does a project take?",
    "Simple launch websites can take a few weeks. Larger redesigns, portals, dashboards, and custom systems take longer and are scheduled after the brief."
  ],
  [
    "Can GridSpell redesign an existing website?",
    "Yes. GridSpell can rebuild outdated websites with clearer structure, stronger design, better service pages, redirects, metadata, analytics, and launch checks."
  ],
  [
    "Do you build portals and dashboards?",
    "Yes. GridSpell can build client portals, admin dashboards, lead pipelines, project workspaces, approval flows, and internal tools."
  ],
  [
    "What do I need before starting?",
    "Your goal, service offer, target customers, rough budget, preferred timeline, current website if you have one, and examples of websites you like are enough to start."
  ],
  [
    "Will the site be mobile-friendly and SEO-ready?",
    "Yes. Responsive design, page structure, metadata, sitemap, performance, accessibility basics, and launch checks are included in the process."
  ],
  [
    "Do you offer support after launch?",
    "Yes. Care plans can cover updates, monitoring, fixes, content changes, analytics review, new sections, and ongoing growth work."
  ]
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
      <div aria-hidden="true" className="pointer-events-none absolute right-[-16rem] top-10 h-[32rem] w-[32rem] rounded-full bg-[#7c5cff]/12 blur-[150px]" />
      <div aria-hidden="true" className="pointer-events-none absolute left-[-16rem] bottom-[-12rem] h-[32rem] w-[32rem] rounded-full bg-[#29d6ff]/8 blur-[150px]" />

      <Container className="relative">
        <div className="grid gap-12 xl:grid-cols-[0.78fr_1.22fr] xl:items-start">
          <div className="xl:sticky xl:top-28">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#8be9ff]/16 bg-[#8be9ff]/6 px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.26em] text-[#8be9ff]">
              <HelpCircle className="h-3.5 w-3.5" />
              FAQ
            </div>

            <h2 className="mt-6 max-w-[11ch] text-balance font-display text-[clamp(3.2rem,7vw,7.2rem)] font-semibold leading-[0.84] tracking-[-0.075em]">
              Questions before we build.
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-white/46 sm:text-lg">
              Quick answers for businesses comparing websites, redesigns,
              portals, dashboards, and ongoing support.
            </p>

            <Link
              href="/start-project"
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#8be9ff]/18 bg-[#8be9ff]/8 px-5 text-sm font-semibold text-[#8be9ff] transition hover:border-[#8be9ff]/35 hover:bg-[#8be9ff]/12 hover:text-white"
            >
              Ask about your project
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-3">
            {homepageFaqs.map(([question, answer], index) => (
              <details
                key={question}
                className="group rounded-[1.45rem] border border-white/[0.08] bg-white/[0.025] p-5 transition open:border-[#8be9ff]/20 open:bg-[#8be9ff]/[0.045] sm:p-6"
                open={index === 0}
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-5 [&::-webkit-details-marker]:hidden">
                  <span>
                    <span className="font-mono text-[0.56rem] tracking-[0.2em] text-[#8be9ff]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-3 block font-display text-2xl font-semibold leading-tight tracking-[-0.045em] text-white sm:text-3xl">
                      {question}
                    </span>
                  </span>
                  <span className="relative mt-2 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/[0.1] bg-white/[0.035] text-white/46 transition group-open:rotate-45 group-open:border-[#8be9ff]/22 group-open:text-[#8be9ff]">
                    <span className="absolute h-px w-3.5 bg-current" />
                    <span className="absolute h-3.5 w-px bg-current" />
                  </span>
                </summary>
                <p className="mt-5 max-w-3xl text-sm leading-7 text-white/48 sm:text-base sm:leading-8">
                  {answer}
                </p>
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
    </>
  );
}
