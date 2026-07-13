import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Gauge,
  LayoutDashboard,
  MessageSquareText,
  SearchCheck,
  ShieldCheck,
  Smartphone,
  Workflow
} from "lucide-react";

import { HomeDesignAnatomySection } from "@/components/home/HomeDesignAnatomySection";
import { Container } from "@/components/ui/Container";

const buildFacts = [
  "Service architecture shaped around buying decisions",
  "Responsive QA across phone, tablet, and desktop",
  "Lead routing, status tracking, and follow-up structure",
  "Metadata, sitemap, validation, and launch checks"
] as const;

const portalLayers = [
  { icon: LayoutDashboard, label: "Project overview" },
  { icon: ShieldCheck, label: "Secure access" },
  { icon: MessageSquareText, label: "Client communication" }
] as const;

export function HomeProofSections() {
  return (
    <div className="home-proof-sections home-story-band relative z-[3] isolate overflow-hidden bg-[#07080c] text-white max-[480px]:bg-transparent">
      <div
        aria-hidden="true"
        className="page-grid pointer-events-none absolute inset-0 opacity-30 max-[480px]:opacity-10"
      />
      <div
        aria-hidden="true"
        className="home-story-glow home-story-glow--purple pointer-events-none absolute right-[-18rem] top-24 h-[34rem] w-[34rem] rounded-full bg-[#7c5cff]/12 blur-[150px] max-[480px]:hidden"
      />
      <div
        aria-hidden="true"
        className="home-story-glow home-story-glow--cyan pointer-events-none absolute left-[-18rem] top-[48rem] h-[34rem] w-[34rem] rounded-full bg-[#29d6ff]/8 blur-[150px] max-[480px]:hidden"
      />

      <HomeDesignAnatomySection />

      <section className="home-story-section relative border-t border-white/[0.06] py-24 max-[480px]:bg-transparent sm:py-32">
        <Container className="relative">
          <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div>
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.42em] text-[#8be9ff]">
                Proof in the build
              </p>
              <h2 className="mt-6 max-w-[13ch] text-balance font-display text-[clamp(3rem,6vw,6.6rem)] font-semibold leading-[0.86] tracking-[-0.07em]">
                More than a pretty homepage.
              </h2>
            </div>

            <div className="lg:pb-2">
              <p className="max-w-xl text-base leading-8 text-white/48 sm:text-lg sm:leading-9">
                The visible interface is only one layer. Every GridSpell build is
                planned around the conversion path, the operational handoff, and
                what the business needs after launch.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-2">
                {[
                  ["01", "Strategy"],
                  ["02", "Interface"],
                  ["03", "System"]
                ].map(([number, label]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/[0.08] bg-white/[0.025] px-4 py-4"
                  >
                    <p className="font-mono text-[0.52rem] tracking-[0.18em] text-[#8be9ff]/70">
                      {number}
                    </p>
                    <p className="mt-2 text-xs font-medium text-white/56 sm:text-sm">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-14 grid gap-4 lg:grid-cols-12 lg:auto-rows-[minmax(15rem,auto)] sm:mt-16">
            <article className="group relative overflow-hidden rounded-[2rem] border border-white/[0.1] bg-[radial-gradient(circle_at_92%_8%,rgba(41,214,255,0.15),transparent_17rem),radial-gradient(circle_at_8%_92%,rgba(124,92,255,0.16),transparent_22rem),linear-gradient(145deg,#0c0f18,#080a10)] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#8be9ff]/25 sm:p-8 lg:col-span-7 lg:row-span-2">
              <div
                aria-hidden="true"
                className="page-grid pointer-events-none absolute inset-0 opacity-20"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 top-16 h-56 w-56 rounded-full border-[34px] border-[#7c5cff]/10 blur-[1px]"
              />

              <div className="relative flex items-start justify-between gap-5">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl border border-[#8be9ff]/20 bg-[#8be9ff]/8 text-[#8be9ff]">
                    <MessageSquareText className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[0.54rem] font-semibold uppercase tracking-[0.24em] text-[#8be9ff]">
                      Conversion infrastructure
                    </p>
                    <p className="mt-1 text-xs text-white/35">Live project intake</p>
                  </div>
                </div>
                <span className="rounded-full border border-[#69e6ad]/20 bg-[#69e6ad]/8 px-3 py-1.5 text-[0.5rem] font-semibold uppercase tracking-[0.16em] text-[#7aefb9]">
                  Connected
                </span>
              </div>

              <div className="relative mt-10 max-w-2xl">
                <h3 className="max-w-[13ch] font-display text-[clamp(2.5rem,4vw,4.7rem)] font-semibold leading-[0.9] tracking-[-0.065em]">
                  Every inquiry has somewhere useful to go.
                </h3>
                <p className="mt-5 max-w-xl text-sm leading-7 text-white/45 sm:text-base sm:leading-8">
                  Forms collect the right context, route it into a visible pipeline,
                  and preserve the details needed for a faster, more confident
                  follow-up.
                </p>
              </div>

              <div className="relative mt-10 grid gap-3 sm:grid-cols-3">
                {[
                  ["01", "Capture", "Qualified project brief"],
                  ["02", "Route", "Email and admin pipeline"],
                  ["03", "Track", "Status, notes, and timing"]
                ].map(([number, title, text]) => (
                  <div
                    key={title}
                    className="rounded-[1.3rem] border border-white/[0.08] bg-black/20 p-4 backdrop-blur-sm"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-[0.5rem] tracking-[0.16em] text-[#8be9ff]/70">
                        {number}
                      </span>
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#69e6ad]/75" />
                    </div>
                    <p className="mt-5 font-display text-xl font-semibold tracking-[-0.04em]">
                      {title}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-white/35">{text}</p>
                  </div>
                ))}
              </div>

              <div className="relative mt-5 grid grid-cols-3 gap-2 border-t border-white/[0.08] pt-5">
                {[
                  ["Context", "Preserved"],
                  ["Handoff", "Immediate"],
                  ["Follow-up", "Visible"]
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-[0.5rem] uppercase tracking-[0.16em] text-white/25">
                      {label}
                    </p>
                    <p className="mt-1.5 text-xs font-medium text-white/65 sm:text-sm">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <article className="group relative overflow-hidden rounded-[2rem] border border-white/[0.09] bg-[linear-gradient(145deg,rgba(255,255,255,0.045),rgba(255,255,255,0.018)),#090b11] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#8be9ff]/22 sm:p-7 lg:col-span-5">
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-2xl border border-[#8be9ff]/16 bg-[#8be9ff]/7 text-[#8be9ff]">
                  <SearchCheck className="h-5 w-5" />
                </span>
                <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[0.48rem] font-semibold uppercase tracking-[0.16em] text-white/38">
                  Search ready
                </span>
              </div>

              <p className="mt-8 text-[0.54rem] font-semibold uppercase tracking-[0.24em] text-[#8be9ff]">
                SEO foundation
              </p>
              <h3 className="mt-3 max-w-[15ch] font-display text-3xl font-semibold leading-[0.96] tracking-[-0.055em] sm:text-4xl">
                Structured to be found and understood.
              </h3>
              <p className="mt-4 text-sm leading-7 text-white/40">
                Metadata, sitemap, page hierarchy, service architecture, and
                technical validation are built into the launch plan.
              </p>

              <div className="mt-7 rounded-[1.25rem] border border-white/[0.07] bg-black/20 p-4">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[0.5rem] uppercase tracking-[0.16em] text-white/25">
                      Technical readiness
                    </p>
                    <p className="mt-2 font-display text-3xl font-semibold tracking-[-0.055em]">
                      94%
                    </p>
                  </div>
                  <Gauge className="h-5 w-5 text-[#8be9ff]" />
                </div>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <div className="h-full w-[94%] rounded-full bg-gradient-to-r from-[#7c5cff] to-[#29d6ff]" />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Metadata", "Sitemap", "Structure"].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/[0.07] bg-white/[0.025] px-2.5 py-1 text-[0.5rem] uppercase tracking-[0.12em] text-white/35"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </article>

            <article className="group relative overflow-hidden rounded-[2rem] border border-white/[0.09] bg-[radial-gradient(circle_at_100%_100%,rgba(124,92,255,0.13),transparent_17rem),rgba(255,255,255,0.025)] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#9d8cff]/25 sm:p-7 lg:col-span-5">
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-2xl border border-[#9d8cff]/18 bg-[#7c5cff]/8 text-[#a99aff]">
                  <Smartphone className="h-5 w-5" />
                </span>
                <span className="font-mono text-[0.52rem] tracking-[0.18em] text-white/24">
                  03 / QA
                </span>
              </div>

              <p className="mt-8 text-[0.54rem] font-semibold uppercase tracking-[0.24em] text-[#a99aff]">
                Responsive polish
              </p>
              <h3 className="mt-3 max-w-[15ch] font-display text-3xl font-semibold leading-[0.96] tracking-[-0.055em] sm:text-4xl">
                Designed beyond one desktop screenshot.
              </h3>
              <p className="mt-4 text-sm leading-7 text-white/40">
                Layout, hierarchy, touch targets, and media are checked across the
                screens real customers actually use.
              </p>

              <div
                aria-hidden="true"
                className="mt-7 flex min-h-28 items-end justify-center gap-3 rounded-[1.25rem] border border-white/[0.07] bg-black/20 px-5 pt-5"
              >
                <div className="h-20 w-10 rounded-t-xl border border-white/[0.13] border-b-0 bg-[linear-gradient(180deg,rgba(124,92,255,0.22),rgba(255,255,255,0.025))] p-1.5">
                  <div className="h-1 w-4 rounded-full bg-white/15" />
                  <div className="mt-3 h-7 rounded bg-white/[0.06]" />
                </div>
                <div className="h-24 w-20 rounded-t-xl border border-white/[0.13] border-b-0 bg-[linear-gradient(180deg,rgba(41,214,255,0.15),rgba(255,255,255,0.025))] p-2">
                  <div className="h-1 w-7 rounded-full bg-white/15" />
                  <div className="mt-3 h-9 rounded bg-white/[0.06]" />
                </div>
                <div className="h-28 w-36 rounded-t-xl border border-white/[0.13] border-b-0 bg-[linear-gradient(180deg,rgba(124,92,255,0.13),rgba(255,255,255,0.025))] p-2.5">
                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
                  </div>
                  <div className="mt-3 grid grid-cols-[1.2fr_.8fr] gap-2">
                    <div className="h-12 rounded bg-white/[0.06]" />
                    <div className="h-12 rounded bg-[#8be9ff]/8" />
                  </div>
                </div>
              </div>
            </article>

            <article className="group relative overflow-hidden rounded-[2rem] border border-white/[0.09] bg-[linear-gradient(145deg,rgba(255,255,255,0.04),rgba(255,255,255,0.016)),#090b11] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#8be9ff]/22 sm:p-7 lg:col-span-6">
              <div className="grid gap-7 sm:grid-cols-[1fr_0.8fr] sm:items-end">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl border border-[#8be9ff]/16 bg-[#8be9ff]/7 text-[#8be9ff]">
                      <ShieldCheck className="h-5 w-5" />
                    </span>
                    <p className="text-[0.54rem] font-semibold uppercase tracking-[0.24em] text-[#8be9ff]">
                      Portal structure
                    </p>
                  </div>
                  <h3 className="mt-7 max-w-[15ch] font-display text-3xl font-semibold leading-[0.96] tracking-[-0.055em] sm:text-4xl">
                    Ready to grow into a secure workspace.
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/40">
                    Files, milestones, approvals, messages, billing, and support can
                    live inside one clear client experience.
                  </p>
                </div>

                <div className="space-y-2">
                  {portalLayers.map(({ icon: LayerIcon, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-black/20 p-3"
                    >
                      <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/[0.04] text-white/45">
                        <LayerIcon className="h-4 w-4" />
                      </span>
                      <span className="text-xs font-medium text-white/52">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            <article className="group relative overflow-hidden rounded-[2rem] border border-white/[0.09] bg-[radial-gradient(circle_at_92%_10%,rgba(41,214,255,0.11),transparent_16rem),rgba(255,255,255,0.024)] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#8be9ff]/22 sm:p-7 lg:col-span-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl border border-[#8be9ff]/16 bg-[#8be9ff]/7 text-[#8be9ff]">
                    <Workflow className="h-5 w-5" />
                  </span>
                  <p className="text-[0.54rem] font-semibold uppercase tracking-[0.24em] text-[#8be9ff]">
                    Connected operations
                  </p>
                </div>
                <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[0.48rem] font-semibold uppercase tracking-[0.16em] text-white/38">
                  Automated
                </span>
              </div>

              <h3 className="mt-7 max-w-[16ch] font-display text-3xl font-semibold leading-[0.96] tracking-[-0.055em] sm:text-4xl">
                The handoffs connect instead of disappearing.
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/40">
                Forms, email, CRM, booking, payments, analytics, and notifications
                can move together as one practical workflow.
              </p>

              <div className="mt-7 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 rounded-[1.25rem] border border-white/[0.07] bg-black/20 p-4">
                {["Capture", "Route", "Respond"].map((item, index) => (
                  <div key={item} className="contents">
                    <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] px-2 py-3 text-center">
                      <p className="font-mono text-[0.46rem] tracking-[0.14em] text-[#8be9ff]/65">
                        0{index + 1}
                      </p>
                      <p className="mt-1.5 text-[0.62rem] font-medium text-white/55 sm:text-xs">
                        {item}
                      </p>
                    </div>
                    {index < 2 ? (
                      <ArrowUpRight className="h-4 w-4 rotate-45 text-white/20" />
                    ) : null}
                  </div>
                ))}
              </div>
            </article>
          </div>

          <div className="mt-4 grid overflow-hidden rounded-[2rem] border border-white/[0.09] bg-white/[0.08] lg:grid-cols-[1fr_22rem]">
            <div className="bg-[#0a0c12]/95 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-[#69e6ad]/18 bg-[#69e6ad]/7 text-[#7aefb9]">
                  <CheckCircle2 className="h-4.5 w-4.5" />
                </span>
                <div>
                  <p className="text-[0.56rem] font-semibold uppercase tracking-[0.24em] text-[#7aefb9]">
                    What ships
                  </p>
                  <p className="mt-1 text-sm text-white/42">
                    Practical foundations, not decorative mockups.
                  </p>
                </div>
              </div>

              <ul className="mt-7 grid gap-3 sm:grid-cols-2 sm:gap-x-8">
                {buildFacts.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-7 text-white/48">
                    <CheckCircle2 className="mt-1.5 h-3.5 w-3.5 shrink-0 text-[#8be9ff]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-between bg-[radial-gradient(circle_at_100%_0%,rgba(41,214,255,0.2),transparent_15rem),linear-gradient(145deg,rgba(124,92,255,0.2),rgba(41,214,255,0.08)),#0b0e16] p-6 sm:p-8">
              <div>
                <p className="text-[0.56rem] font-semibold uppercase tracking-[0.24em] text-[#8be9ff]">
                  Build the complete layer
                </p>
                <h3 className="mt-4 font-display text-3xl font-semibold leading-[0.98] tracking-[-0.055em]">
                  Start with the site. Grow into the system.
                </h3>
              </div>

              <Link
                href="/start-project"
                className="mt-8 inline-flex min-h-12 w-full items-center justify-between gap-3 rounded-full bg-white px-5 text-sm font-semibold text-[#08090d] transition hover:-translate-y-0.5"
              >
                Start a project
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
