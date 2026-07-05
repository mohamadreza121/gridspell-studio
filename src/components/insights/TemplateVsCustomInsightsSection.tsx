import Link from "next/link";
import { ArrowUpRight, Code2, LayoutTemplate, Split } from "lucide-react";

import { Container } from "@/components/ui/Container";

const signals = [
  ["Fast launch", "Template"],
  ["Ownable brand", "Custom"],
  ["Service SEO", "Custom"],
  ["Low upfront", "Template"]
] as const;

export function TemplateVsCustomInsightsSection() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.08] bg-[#0b0d13] py-24 text-white sm:py-32">
      <div aria-hidden="true" className="page-grid pointer-events-none absolute inset-0 opacity-20" />
      <div aria-hidden="true" className="pointer-events-none absolute left-[-18rem] top-[-12rem] h-[38rem] w-[38rem] rounded-full bg-[#29d6ff]/8 blur-[150px]" />
      <div aria-hidden="true" className="pointer-events-none absolute right-[-18rem] bottom-[-14rem] h-[38rem] w-[38rem] rounded-full bg-[#7c5cff]/12 blur-[150px]" />

      <Container className="relative">
        <Link
          href="/insights/template-website-vs-custom-website"
          className="group grid gap-10 border border-white/[0.1] bg-white/[0.025] p-7 transition hover:-translate-y-1 hover:border-[#8be9ff]/24 sm:p-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center"
          style={{
            clipPath:
              "polygon(0 0, calc(100% - 3rem) 0, 100% 3rem, 100% 100%, 3rem 100%, 0 calc(100% - 3rem))"
          }}
        >
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-[#8be9ff]/18 bg-[#8be9ff]/7 px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-[#8be9ff]">
              <Split className="h-3.5 w-3.5" />
              New decision guide
            </div>

            <h2 className="mt-7 max-w-[13ch] text-balance font-display text-[clamp(3.1rem,7vw,7.2rem)] font-semibold leading-[0.84] tracking-[-0.078em]">
              Template website vs custom website.
            </h2>

            <p className="mt-7 max-w-2xl text-base leading-8 text-white/48 sm:text-lg sm:leading-9">
              A practical guide for choosing between a fast template setup and a custom website built for branding, SEO, service clarity, integrations, and long-term growth.
            </p>

            <div className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-[#8be9ff]">
              Read the guide
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          </div>

          <div className="relative min-h-[25rem] overflow-hidden border border-white/[0.08] bg-[#07080c]/58 p-6 backdrop-blur-md">
            <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(139,233,255,0.12),transparent_17rem)]" />
            <div className="relative grid gap-4 sm:grid-cols-2">
              <div className="min-h-48 border border-[#8be9ff]/16 bg-[#8be9ff]/[0.035] p-5">
                <LayoutTemplate className="h-6 w-6 text-[#8be9ff]" />
                <p className="mt-7 text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[#8be9ff]">Template</p>
                <p className="mt-4 font-display text-3xl font-semibold leading-none tracking-[-0.055em]">Adapt a system</p>
              </div>
              <div className="min-h-48 border border-[#a99aff]/18 bg-[#7c5cff]/[0.055] p-5">
                <Code2 className="h-6 w-6 text-[#a99aff]" />
                <p className="mt-7 text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[#a99aff]">Custom</p>
                <p className="mt-4 font-display text-3xl font-semibold leading-none tracking-[-0.055em]">Shape the system</p>
              </div>
            </div>

            <div className="relative mt-4 grid gap-3 sm:grid-cols-2">
              {signals.map(([label, winner]) => (
                <div key={label} className="border border-white/[0.08] bg-white/[0.025] p-4">
                  <p className="text-[0.54rem] font-semibold uppercase tracking-[0.2em] text-white/30">{label}</p>
                  <p className="mt-3 text-sm font-semibold text-white/72">Best fit: {winner}</p>
                </div>
              ))}
            </div>
          </div>
        </Link>
      </Container>
    </section>
  );
}
