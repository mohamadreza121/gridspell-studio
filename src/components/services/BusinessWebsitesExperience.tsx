import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Gauge,
  LayoutTemplate,
  MessageSquareText,
  MousePointerClick,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import type { PricingPackage } from "@/config/packages";
import type { Service } from "@/config/services";

type BusinessWebsitesExperienceProps = {
  service: Service;
  recommendedPackage?: PricingPackage;
  relatedServices: readonly Service[];
};

const decisionCards = [
  {
    number: "01",
    title: "What do you do?",
    text: "A clear offer, useful page structure, and service language customers can understand quickly.",
    icon: LayoutTemplate,
    className: "lg:col-span-7"
  },
  {
    number: "02",
    title: "Why should I trust you?",
    text: "Proof, experience, process, and real reasons to choose your business instead of the next tab.",
    icon: ShieldCheck,
    className: "lg:col-span-5"
  },
  {
    number: "03",
    title: "Is this right for me?",
    text: "Content written around the people you want to attract—not generic copy trying to speak to everyone.",
    icon: Search,
    className: "lg:col-span-5"
  },
  {
    number: "04",
    title: "What should I do next?",
    text: "A visible path to an inquiry, estimate request, or discovery call without dead ends or confusion.",
    icon: MousePointerClick,
    className: "lg:col-span-7"
  }
] as const;

function WebsiteSystemPreview() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[760px] lg:mx-0">
      <div className="absolute inset-x-[12%] top-[8%] h-[72%] rounded-full bg-[#7257ff]/20 blur-[100px]" />
      <div className="absolute -right-8 bottom-6 h-48 w-48 rounded-full bg-[#29d6ff]/16 blur-[80px]" />

      <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-[#0d1017] p-2 shadow-[0_42px_120px_rgba(0,0,0,.52)] sm:rounded-[2.5rem] sm:p-3">
        <div className="overflow-hidden rounded-[1.55rem] border border-white/8 bg-[#080a0f] sm:rounded-[2rem]">
          <div className="flex h-11 items-center justify-between border-b border-white/8 px-4 sm:h-13 sm:px-5">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffd166]/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#52d9a6]/70" />
            </div>
            <div className="h-6 w-[46%] rounded-full border border-white/8 bg-white/[0.035]" />
            <span className="h-6 w-6 rounded-full border border-white/8 bg-white/[0.035]" />
          </div>

          <div className="grid min-h-[29rem] gap-px bg-white/7 sm:grid-cols-[1fr_0.38fr] sm:min-h-[34rem]">
            <div className="relative overflow-hidden bg-[#0a0d13] p-5 sm:p-7 lg:p-8">
              <div className="absolute right-[-5rem] top-[-4rem] h-52 w-52 rounded-full bg-[#7c5cff]/16 blur-[75px]" />
              <div className="absolute bottom-[-4rem] left-[-4rem] h-48 w-48 rounded-full bg-[#29d6ff]/10 blur-[70px]" />

              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-[linear-gradient(135deg,#7c5cff,#29d6ff)] text-[0.62rem] font-black text-white">
                    GS
                  </span>
                  <span className="text-xs font-semibold text-white/74">Your business</span>
                </div>
                <div className="hidden items-center gap-4 text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-white/34 min-[520px]:flex">
                  <span>Services</span>
                  <span>Projects</span>
                  <span>Contact</span>
                </div>
              </div>

              <div className="relative mt-10 max-w-lg sm:mt-13">
                <p className="text-[0.55rem] font-black uppercase tracking-[0.24em] text-[#8be9ff]">
                  Clear offer · Strong proof
                </p>
                <p className="mt-4 max-w-[9ch] font-display text-[clamp(2.7rem,7vw,5.6rem)] font-semibold leading-[0.78] tracking-[-0.08em] text-white">
                  Built to earn the next click.
                </p>
                <div className="mt-5 h-2.5 w-[88%] rounded-full bg-white/9" />
                <div className="mt-2 h-2.5 w-[68%] rounded-full bg-white/7" />
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rounded-full bg-white px-4 py-2 text-[0.62rem] font-black text-[#08090d]">
                    Request an estimate
                  </span>
                  <span className="rounded-full border border-white/12 bg-white/[0.035] px-4 py-2 text-[0.62rem] font-semibold text-white/58">
                    View recent work
                  </span>
                </div>
              </div>

              <div className="relative mt-9 grid gap-2.5 min-[520px]:grid-cols-3 sm:mt-12">
                {["Services", "Proof", "Contact"].map((label, index) => (
                  <div
                    key={label}
                    className="rounded-[1.1rem] border border-white/8 bg-white/[0.035] p-3.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[0.54rem] font-black uppercase tracking-[0.16em] text-white/30">
                        0{index + 1}
                      </span>
                      <span className="h-1.5 w-1.5 rounded-full bg-[#8be9ff] shadow-[0_0_12px_rgba(139,233,255,.7)]" />
                    </div>
                    <p className="mt-4 text-xs font-semibold text-white/70">{label}</p>
                    <div className="mt-2 h-1.5 w-full rounded-full bg-white/8" />
                    <div className="mt-1.5 h-1.5 w-2/3 rounded-full bg-white/6" />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-px bg-white/7 sm:grid-rows-[0.95fr_1.05fr]">
              <div className="bg-[#10141c] p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <span className="text-[0.52rem] font-black uppercase tracking-[0.2em] text-[#8be9ff]">
                    Lead flow
                  </span>
                  <MessageSquareText className="h-4 w-4 text-white/34" />
                </div>
                <div className="mt-5 rounded-[1.25rem] border border-[#8be9ff]/17 bg-[#8be9ff]/7 p-4">
                  <div className="flex items-center gap-2 text-[0.6rem] font-semibold text-white/70">
                    <span className="h-2 w-2 rounded-full bg-[#52d9a6] shadow-[0_0_14px_rgba(82,217,166,.75)]" />
                    New qualified inquiry
                  </div>
                  <div className="mt-4 h-2 w-full rounded-full bg-white/9" />
                  <div className="mt-2 h-2 w-4/5 rounded-full bg-white/7" />
                  <div className="mt-2 h-2 w-3/5 rounded-full bg-white/6" />
                  <div className="mt-4 flex gap-2">
                    <span className="rounded-full bg-white/9 px-2.5 py-1 text-[0.5rem] font-semibold text-white/50">Service</span>
                    <span className="rounded-full bg-white/9 px-2.5 py-1 text-[0.5rem] font-semibold text-white/50">Budget</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#0d1118] p-5 sm:p-6">
                <p className="text-[0.52rem] font-black uppercase tracking-[0.2em] text-white/30">
                  Launch foundation
                </p>
                <div className="mt-5 grid gap-3">
                  {[
                    ["Responsive", "Every screen"],
                    ["Search ready", "Metadata + sitemap"],
                    ["Tracked", "Analytics setup"]
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-[1rem] border border-white/8 bg-white/[0.03] p-3.5">
                      <p className="text-[0.5rem] font-bold uppercase tracking-[0.16em] text-white/28">{label}</p>
                      <p className="mt-2 text-xs font-semibold text-white/68">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResponsiveBlueprint() {
  return (
    <div aria-hidden="true" className="relative mx-auto min-h-[30rem] w-full max-w-[760px] sm:min-h-[38rem]">
      <div className="absolute inset-[12%_9%] rounded-full bg-[#7458ff]/18 blur-[110px]" />

      <div className="absolute inset-x-0 top-4 overflow-hidden rounded-[1.7rem] border border-white/12 bg-[#0d1017] p-2 shadow-[0_35px_100px_rgba(0,0,0,.44)] sm:inset-x-[4%] sm:top-6 sm:rounded-[2.1rem] sm:p-3">
        <div className="overflow-hidden rounded-[1.25rem] border border-white/8 bg-[#090c12] sm:rounded-[1.65rem]">
          <div className="flex h-9 items-center gap-2 border-b border-white/8 px-4">
            <span className="h-2 w-2 rounded-full bg-white/18" />
            <span className="h-2 w-2 rounded-full bg-white/12" />
            <span className="h-2 w-2 rounded-full bg-white/8" />
          </div>
          <div className="grid aspect-[1.5] grid-cols-[1.12fr_0.88fr] gap-5 p-5 sm:gap-8 sm:p-8">
            <div>
              <div className="h-2 w-24 rounded-full bg-[#8be9ff]/55" />
              <div className="mt-5 h-8 w-[88%] rounded-md bg-white/15 sm:h-11" />
              <div className="mt-2 h-8 w-[68%] rounded-md bg-white/10 sm:h-11" />
              <div className="mt-6 h-2 w-[90%] rounded-full bg-white/8" />
              <div className="mt-2 h-2 w-[72%] rounded-full bg-white/6" />
              <div className="mt-6 h-9 w-32 rounded-full bg-white" />
            </div>
            <div className="relative overflow-hidden rounded-[1.25rem] border border-white/9 bg-[radial-gradient(circle_at_70%_20%,rgba(41,214,255,.18),transparent_40%),linear-gradient(145deg,rgba(124,92,255,.15),rgba(255,255,255,.03))]">
              <div className="absolute inset-5 rounded-[1rem] border border-white/8 bg-black/18" />
              <div className="absolute bottom-8 left-8 right-8 grid grid-cols-2 gap-2">
                <span className="h-11 rounded-xl bg-white/8" />
                <span className="h-11 rounded-xl bg-white/8" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-1 right-[4%] w-[38%] min-w-[145px] max-w-[235px] rotate-[2deg] rounded-[2rem] border border-white/16 bg-[#0b0e14] p-2.5 shadow-[0_35px_90px_rgba(0,0,0,.6)] sm:right-[8%] sm:p-3">
        <div className="overflow-hidden rounded-[1.5rem] border border-white/8 bg-[#090c12]">
          <div className="mx-auto mt-2 h-1.5 w-12 rounded-full bg-white/14" />
          <div className="px-4 pb-5 pt-7">
            <div className="h-1.5 w-16 rounded-full bg-[#8be9ff]/60" />
            <div className="mt-4 h-6 w-[88%] rounded bg-white/15" />
            <div className="mt-2 h-6 w-[62%] rounded bg-white/10" />
            <div className="mt-5 h-1.5 w-full rounded-full bg-white/8" />
            <div className="mt-2 h-1.5 w-4/5 rounded-full bg-white/6" />
            <div className="mt-5 h-9 w-full rounded-full bg-white" />
            <div className="mt-5 grid gap-2">
              <span className="h-14 rounded-xl border border-white/8 bg-white/[0.035]" />
              <span className="h-14 rounded-xl border border-white/8 bg-white/[0.035]" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[10%] left-[3%] rounded-full border border-[#8be9ff]/20 bg-[#8be9ff]/9 px-4 py-2 text-[0.55rem] font-black uppercase tracking-[0.18em] text-[#8be9ff] sm:left-[7%]">
        Same message · every screen
      </div>
    </div>
  );
}

export function BusinessWebsitesExperience({
  service,
  recommendedPackage,
  relatedServices
}: BusinessWebsitesExperienceProps) {
  const packageFeatures = recommendedPackage?.features.slice(0, 6) ?? service.deliverables.slice(0, 6);

  return (
    <main className="overflow-hidden bg-[#07080c] text-white">
      <section className="relative min-h-svh overflow-hidden border-b border-white/7 pt-24 sm:pt-28">
        <div aria-hidden="true" className="page-grid absolute inset-0 opacity-35" />
        <div aria-hidden="true" className="absolute -left-40 top-20 h-[34rem] w-[34rem] rounded-full bg-[#29d6ff]/10 blur-[145px]" />
        <div aria-hidden="true" className="absolute -right-48 top-0 h-[46rem] w-[46rem] rounded-full bg-[#7257ff]/18 blur-[155px]" />

        <Container className="relative grid min-h-[calc(100svh-6rem)] gap-14 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-18 xl:gap-18">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 text-[0.62rem] font-black uppercase tracking-[0.34em] text-[#8be9ff]">
              <Sparkles className="h-4 w-4" /> Service {service.number} · Business websites
            </p>
            <h1 className="mt-7 max-w-[10.5ch] text-balance font-display text-[clamp(3.8rem,8.4vw,8.7rem)] font-semibold leading-[0.77] tracking-[-0.085em]">
              A website that makes the business feel established.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/50 sm:text-lg sm:leading-9">
              {service.summary} Every page is designed around clarity, proof, and a useful next step—not filler sections or a recycled template.
            </p>

            <div className="mt-9 flex flex-col gap-3 min-[460px]:flex-row min-[460px]:flex-wrap">
              <Link
                href="/start-project?package=launch&source=business-websites"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-black text-[#08090d] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(255,255,255,.16)]"
              >
                Start a business website <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="#scope"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-[#8be9ff]/24 bg-[#8be9ff]/8 px-6 text-sm font-semibold text-[#8be9ff] transition hover:border-[#8be9ff]/45 hover:bg-[#8be9ff]/13 hover:text-white"
              >
                See the full scope <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-11 grid grid-cols-3 gap-3 border-t border-white/9 pt-6">
              {[
                ["3–5", "strategic pages"],
                [recommendedPackage?.timeline ?? "3–4 weeks", "typical timeline"],
                ["100%", "responsive layout"]
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="font-display text-3xl font-semibold tracking-[-0.06em] sm:text-4xl">{value}</p>
                  <p className="mt-1 text-[0.68rem] leading-5 text-white/34 sm:text-sm">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <WebsiteSystemPreview />
        </Container>

        <div className="relative flex h-2.5 w-full">
          <span className="flex-1 bg-[#7c5cff]" />
          <span className="flex-1 bg-[#6477ff]" />
          <span className="flex-1 bg-[#29d6ff]" />
          <span className="flex-1 bg-[#52d9a6]" />
        </div>
      </section>

      <section className="relative border-b border-white/7 py-24 sm:py-30 lg:py-36">
        <div aria-hidden="true" className="absolute left-1/2 top-0 h-80 w-[70%] -translate-x-1/2 rounded-full bg-[#7458ff]/8 blur-[120px]" />
        <Container className="relative">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <p className="text-[0.62rem] font-black uppercase tracking-[0.34em] text-[#8be9ff]">
                The decision system
              </p>
              <h2 className="mt-6 max-w-[10ch] font-display text-[clamp(3.4rem,7vw,7.2rem)] font-semibold leading-[0.79] tracking-[-0.08em]">
                Four questions your website must answer fast.
              </h2>
            </div>
            <div className="lg:pb-2">
              <p className="max-w-3xl text-base leading-8 text-white/46 sm:text-lg sm:leading-9">
                {service.problem} The new experience is structured around the decisions a real customer makes before they reach out.
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-4 lg:grid-cols-12">
            {decisionCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.title}
                  className={`group relative min-h-[20rem] overflow-hidden rounded-[2rem] border border-white/9 bg-[#0d1017] p-6 shadow-[0_24px_80px_rgba(0,0,0,.24)] transition duration-500 hover:-translate-y-1 hover:border-white/16 sm:p-8 ${card.className}`}
                >
                  <div
                    aria-hidden="true"
                    className={`absolute h-56 w-56 rounded-full blur-[95px] ${
                      index % 2 === 0 ? "-right-20 -top-20 bg-[#29d6ff]/12" : "-bottom-24 -left-16 bg-[#7c5cff]/15"
                    }`}
                  />
                  <div className="relative flex h-full flex-col">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[0.58rem] tracking-[0.22em] text-[#8be9ff]">{card.number}</span>
                      <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/9 bg-white/[0.04] text-white/62">
                        <Icon className="h-5 w-5" />
                      </span>
                    </div>
                    <h3 className="mt-auto max-w-[12ch] pt-16 font-display text-[clamp(2.7rem,5vw,5rem)] font-semibold leading-[0.84] tracking-[-0.07em]">
                      {card.title}
                    </h3>
                    <p className="mt-5 max-w-xl text-sm leading-7 text-white/44 sm:text-base sm:leading-8">{card.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="relative border-b border-white/7 py-24 sm:py-30 lg:py-36">
        <div aria-hidden="true" className="page-grid absolute inset-0 opacity-20" />
        <Container className="relative">
          <div className="grid gap-10 xl:grid-cols-[0.72fr_1.28fr] xl:items-start">
            <div className="xl:sticky xl:top-28">
              <p className="text-[0.62rem] font-black uppercase tracking-[0.34em] text-[#8be9ff]">The build path</p>
              <h2 className="mt-6 max-w-[9ch] font-display text-[clamp(3.4rem,6.7vw,6.8rem)] font-semibold leading-[0.79] tracking-[-0.08em]">
                From rough ideas to a launch-ready system.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/44">
                You do not need polished copy, a perfect sitemap, or every image prepared before the project starts. The process turns what you know about the business into a clear website.
              </p>
            </div>

            <div className="grid gap-4">
              {service.process.map((step, index) => (
                <article
                  key={step.title}
                  className="relative overflow-hidden rounded-[2rem] border border-white/9 bg-[#0d1017] p-6 sm:p-8 lg:grid lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-8"
                >
                  <span className="font-display text-5xl font-semibold tracking-[-0.07em] text-white/14 sm:text-6xl">
                    0{index + 1}
                  </span>
                  <div className="mt-5 lg:mt-0">
                    <p className="text-[0.58rem] font-black uppercase tracking-[0.24em] text-[#8be9ff]">Phase {index + 1}</p>
                    <h3 className="mt-3 font-display text-3xl font-semibold tracking-[-0.055em] sm:text-4xl">{step.title}</h3>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-white/44 sm:text-base sm:leading-8">{step.text}</p>
                  </div>
                  <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/7 lg:mt-0 lg:h-28 lg:w-1.5">
                    <div
                      className="h-full rounded-full bg-[linear-gradient(180deg,#7c5cff,#29d6ff)] lg:w-full"
                      style={{ width: `${(index + 1) * 33}%` }}
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="relative border-b border-white/7 py-24 sm:py-30 lg:py-36">
        <div aria-hidden="true" className="absolute -right-48 top-10 h-[38rem] w-[38rem] rounded-full bg-[#29d6ff]/8 blur-[145px]" />
        <Container className="relative grid gap-14 xl:grid-cols-[0.82fr_1.18fr] xl:items-center">
          <div>
            <p className="text-[0.62rem] font-black uppercase tracking-[0.34em] text-[#8be9ff]">Responsive by design</p>
            <h2 className="mt-6 max-w-[10ch] font-display text-[clamp(3.4rem,6.7vw,6.8rem)] font-semibold leading-[0.79] tracking-[-0.08em]">
              One message. Every screen.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/46 sm:text-lg sm:leading-9">
              Mobile is not treated as the desktop page squeezed smaller. Headlines, spacing, navigation, cards, forms, and calls to action are intentionally reworked for the screen in someone’s hand.
            </p>

            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              {service.proofPoints.map((point, index) => {
                const icons = [Smartphone, Gauge, Search];
                const Icon = icons[index] ?? CheckCircle2;
                return (
                  <div key={point} className="flex gap-3 rounded-[1.25rem] border border-white/8 bg-white/[0.025] p-4">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#8be9ff]" />
                    <p className="text-sm leading-7 text-white/52">{point}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <ResponsiveBlueprint />
        </Container>
      </section>

      <section id="scope" className="relative border-b border-white/7 py-24 sm:py-30 lg:py-36">
        <div aria-hidden="true" className="page-grid absolute inset-0 opacity-18" />
        <Container className="relative">
          <div className="grid gap-12 xl:grid-cols-[1.16fr_0.84fr] xl:items-start">
            <div>
              <p className="text-[0.62rem] font-black uppercase tracking-[0.34em] text-[#8be9ff]">What ships</p>
              <h2 className="mt-6 max-w-[10ch] font-display text-[clamp(3.4rem,6.7vw,6.8rem)] font-semibold leading-[0.79] tracking-[-0.08em]">
                The complete launch foundation.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/44">
                {service.promise} The scope covers the strategy, interface, development, lead path, and launch details needed for a professional first version.
              </p>

              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {service.deliverables.map((item, index) => (
                  <div key={item} className="group rounded-[1.4rem] border border-white/8 bg-[#0d1017] p-5 transition hover:border-[#8be9ff]/18 hover:bg-[#10141c]">
                    <div className="flex items-start gap-4">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#8be9ff]/18 bg-[#8be9ff]/7 text-[0.56rem] font-black text-[#8be9ff]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="text-sm leading-7 text-white/58">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="overflow-hidden rounded-[2.2rem] border border-[#8be9ff]/18 bg-[radial-gradient(circle_at_85%_5%,rgba(41,214,255,.16),transparent_22rem),linear-gradient(145deg,rgba(124,92,255,.15),rgba(11,13,19,.96))] p-6 shadow-[0_32px_100px_rgba(0,0,0,.35)] sm:p-8 xl:sticky xl:top-28">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[0.58rem] font-black uppercase tracking-[0.24em] text-[#8be9ff]">Recommended starting point</p>
                  <h3 className="mt-4 font-display text-5xl font-semibold tracking-[-0.07em]">{recommendedPackage?.name ?? "Launch"}</h3>
                </div>
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/12 bg-white/[0.05]">
                  <LayoutTemplate className="h-5 w-5 text-[#8be9ff]" />
                </span>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-3">
                <div className="rounded-[1.2rem] border border-white/9 bg-black/16 p-4">
                  <p className="text-[0.52rem] font-bold uppercase tracking-[0.18em] text-white/28">Investment</p>
                  <p className="mt-2 text-sm font-semibold text-white/76">{recommendedPackage?.price ?? "Quoted by scope"}</p>
                </div>
                <div className="rounded-[1.2rem] border border-white/9 bg-black/16 p-4">
                  <p className="text-[0.52rem] font-bold uppercase tracking-[0.18em] text-white/28">Timeline</p>
                  <p className="mt-2 text-sm font-semibold text-white/76">{recommendedPackage?.timeline ?? "3–4 weeks"}</p>
                </div>
              </div>

              <ul className="mt-7 grid gap-3">
                {packageFeatures.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm leading-7 text-white/58">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#8be9ff]" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/start-project?package=launch&source=business-websites"
                className="mt-8 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-black text-[#08090d] transition hover:-translate-y-1"
              >
                Start with the Launch package <ArrowUpRight className="h-4 w-4" />
              </Link>
              <p className="mt-4 text-center text-xs leading-6 text-white/30">
                Final scope and pricing are confirmed after the project brief.
              </p>
            </aside>
          </div>
        </Container>
      </section>

      <section className="relative border-b border-white/7 py-24 sm:py-30 lg:py-36">
        <Container className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-[0.62rem] font-black uppercase tracking-[0.34em] text-[#8be9ff]">Questions</p>
            <h2 className="mt-6 max-w-[9ch] font-display text-[clamp(3.4rem,6.5vw,6.5rem)] font-semibold leading-[0.79] tracking-[-0.08em]">
              What business owners usually ask first.
            </h2>
          </div>

          <div className="grid gap-3">
            {service.faqs.map((faq, index) => (
              <details key={faq.question} className="group rounded-[1.6rem] border border-white/8 bg-[#0d1017] open:border-[#8be9ff]/16 open:bg-[#10141c]">
                <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-5 px-5 py-5 sm:px-7 [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center gap-4">
                    <span className="font-mono text-[0.58rem] tracking-[0.2em] text-[#8be9ff]">0{index + 1}</span>
                    <span className="font-display text-xl font-semibold tracking-[-0.04em] sm:text-2xl">{faq.question}</span>
                  </span>
                  <ChevronDown className="h-5 w-5 shrink-0 text-white/34 transition duration-300 group-open:rotate-180 group-open:text-[#8be9ff]" />
                </summary>
                <div className="border-t border-white/7 px-5 py-5 sm:px-7 sm:py-6">
                  <p className="max-w-3xl text-sm leading-7 text-white/46 sm:text-base sm:leading-8">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative py-24 sm:py-30 lg:py-36">
        <div aria-hidden="true" className="absolute left-1/2 top-10 h-[32rem] w-[70%] -translate-x-1/2 rounded-full bg-[#7458ff]/10 blur-[135px]" />
        <Container className="relative">
          <div className="overflow-hidden rounded-[2.4rem] border border-white/10 bg-[radial-gradient(circle_at_88%_12%,rgba(41,214,255,.16),transparent_24rem),linear-gradient(145deg,rgba(124,92,255,.17),rgba(11,13,19,.96))] p-7 shadow-[0_35px_110px_rgba(0,0,0,.34)] sm:p-10 lg:p-14">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="text-[0.62rem] font-black uppercase tracking-[0.34em] text-[#8be9ff]">Ready to build it properly?</p>
                <h2 className="mt-6 max-w-[10ch] font-display text-[clamp(3.2rem,6.5vw,6.8rem)] font-semibold leading-[0.79] tracking-[-0.08em]">
                  Make the first impression match the real business.
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-8 text-white/46 sm:text-lg sm:leading-9">
                  Share the business, pages, goals, and timeline. The project brief keeps the first conversation focused on the work that actually needs to be done.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link
                  href="/start-project?package=launch&source=business-websites"
                  className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-black text-[#08090d] transition hover:-translate-y-1"
                >
                  Start the project brief <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/work"
                  className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/13 bg-white/[0.04] px-6 text-sm font-semibold text-white/66 transition hover:border-white/24 hover:bg-white/[0.08] hover:text-white"
                >
                  View selected work <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {relatedServices.map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}`}
                className="group rounded-[1.5rem] border border-white/8 bg-white/[0.025] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#8be9ff]/20 hover:bg-white/[0.045]"
              >
                <div className="flex items-center justify-between">
                  <p className="text-[0.56rem] font-black uppercase tracking-[0.2em] text-[#8be9ff]">{item.number} · Related</p>
                  <ArrowUpRight className="h-4 w-4 text-white/24 transition group-hover:text-[#8be9ff]" />
                </div>
                <p className="mt-5 font-display text-2xl font-semibold tracking-[-0.045em]">{item.shortTitle}</p>
                <p className="mt-3 text-sm leading-7 text-white/38">{item.summary}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
