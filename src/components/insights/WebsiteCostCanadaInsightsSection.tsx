import Link from "next/link";
import { ArrowUpRight, FileText, Gauge, SearchCheck } from "lucide-react";

import { Container } from "@/components/ui/Container";

const pricingSignals = [
  ["DIY", "$200–$1,500/yr"],
  ["Pro site", "$1,800–$5,000"],
  ["Custom", "$4,500–$10,000"],
  ["Portal", "$7,500+"]
] as const;

export function WebsiteCostCanadaInsightsSection() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.08] bg-[#07080c] py-24 text-white sm:py-32">
      <div aria-hidden="true" className="page-grid pointer-events-none absolute inset-0 opacity-25" />
      <div aria-hidden="true" className="pointer-events-none absolute right-[-18rem] top-[-10rem] h-[38rem] w-[38rem] rounded-full bg-[#7c5cff]/12 blur-[150px]" />
      <div aria-hidden="true" className="pointer-events-none absolute left-[-16rem] bottom-[-14rem] h-[34rem] w-[34rem] rounded-full bg-[#29d6ff]/8 blur-[150px]" />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-[#8be9ff]/18 bg-[#8be9ff]/7 px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-[#8be9ff]">
              <Gauge className="h-3.5 w-3.5" />
              New 2026 pricing guide
            </div>

            <h2 className="mt-7 max-w-[12ch] text-balance font-display text-[clamp(3.3rem,7vw,7.6rem)] font-semibold leading-[0.82] tracking-[-0.08em]">
              How much should a website really cost?
            </h2>

            <p className="mt-7 max-w-2xl text-base leading-8 text-white/48 sm:text-lg sm:leading-9">
              A dedicated Canada guide for business owners comparing DIY builders,
              freelancers, professional websites, custom service sites, ecommerce,
              portals, SEO setup, and support.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-xs text-white/36">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.025] px-4 py-2.5">
                <FileText className="h-3.5 w-3.5 text-[#8be9ff]" />
                10 min read
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.025] px-4 py-2.5">
                <SearchCheck className="h-3.5 w-3.5 text-[#8be9ff]" />
                Buyer-intent SEO topic
              </span>
            </div>

            <Link
              href="/insights/professional-website-cost-canada"
              className="group mt-9 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#08090d] transition hover:-translate-y-0.5"
            >
              Read the Canada cost guide
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <Link
            href="/insights/professional-website-cost-canada"
            className="group relative min-h-[34rem] overflow-hidden rounded-[2.35rem] border border-white/[0.1] bg-[linear-gradient(145deg,rgba(124,92,255,0.13),rgba(41,214,255,0.035))] p-6 shadow-[0_32px_110px_rgba(0,0,0,0.28)] transition hover:-translate-y-1 hover:border-[#8be9ff]/28 sm:p-8"
          >
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(139,233,255,0.11),transparent_18rem)]" />
            <div aria-hidden="true" className="pointer-events-none absolute left-8 right-8 top-8 h-12 rounded-t-[1.3rem] border border-white/[0.08] bg-[#07080c]/55" />
            <div aria-hidden="true" className="pointer-events-none absolute left-12 top-12 flex gap-2">
              <span className="h-2 w-2 rounded-full bg-[#8be9ff]/50" />
              <span className="h-2 w-2 rounded-full bg-white/18" />
              <span className="h-2 w-2 rounded-full bg-white/12" />
            </div>

            <div className="relative mt-20 grid gap-4">
              <div className="rounded-[1.25rem] border border-[#8be9ff]/18 bg-[#8be9ff]/[0.04] p-5">
                <p className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[#8be9ff]">
                  Pricing blueprint
                </p>
                <div className="mt-5 grid gap-2">
                  <span className="h-3 w-2/3 rounded-full bg-white/18" />
                  <span className="h-2 w-1/2 rounded-full bg-white/10" />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {pricingSignals.map(([label, price]) => (
                  <div key={label} className="rounded-[1.15rem] border border-white/[0.08] bg-[#07080c]/50 p-4 backdrop-blur-sm">
                    <p className="text-[0.54rem] font-semibold uppercase tracking-[0.2em] text-white/28">
                      {label}
                    </p>
                    <p className="mt-3 font-display text-2xl font-semibold tracking-[-0.05em] text-white">
                      {price}
                    </p>
                  </div>
                ))}
              </div>

              <div className="rounded-[1.2rem] border border-[#8be9ff]/16 bg-[#8be9ff]/[0.035] p-5">
                <p className="text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-[#8be9ff]">
                  Decision path
                </p>
                <div className="mt-5 flex items-center gap-2 text-xs text-white/36">
                  <span>DIY</span>
                  <span className="h-px flex-1 bg-white/12" />
                  <span>Professional</span>
                  <span className="h-px flex-1 bg-white/12" />
                  <span>Custom</span>
                </div>
              </div>
            </div>

            <div className="absolute bottom-7 left-7 right-7 flex items-center justify-between border-t border-white/[0.08] pt-5 text-sm font-semibold text-[#8be9ff]">
              Open guide
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          </Link>
        </div>
      </Container>
    </section>
  );
}
