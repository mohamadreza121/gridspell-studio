"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Clock3,
  Sparkles,
  Target
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { services } from "@/config/services";
import {
  getServiceCommercialDetails,
  serviceBuyerGoals,
  serviceProofProjects,
  serviceReadinessItems,
  type ServiceBuyerGoalId
} from "@/config/services-page";
import { cn } from "@/lib/utils";

function serviceVisualPath(slug: string) {
  return `/images/services/mobile/${slug}.webp`;
}

export function ServicesDesktopDetails() {
  const [selectedGoal, setSelectedGoal] = useState<ServiceBuyerGoalId>(
    serviceBuyerGoals[0].id
  );
  const [readiness, setReadiness] = useState<Set<number>>(() => new Set());

  const selectedBuyerGoal = useMemo(
    () =>
      serviceBuyerGoals.find((goal) => goal.id === selectedGoal) ?? serviceBuyerGoals[0],
    [selectedGoal]
  );
  const recommendedService =
    services.find((service) => service.slug === selectedBuyerGoal.serviceSlug) ??
    services[0];
  const commercial = getServiceCommercialDetails(recommendedService);
  const readinessProgress = Math.round(
    (readiness.size / serviceReadinessItems.length) * 100
  );

  function toggleReadiness(index: number) {
    setReadiness((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <main className="services-desktop-details relative overflow-hidden border-t border-white/[0.07] bg-[#07080c] pb-32 pt-32 text-white">
      <div aria-hidden="true" className="services-desktop-details__backdrop">
        <div className="page-grid absolute inset-0 opacity-36" />
        <div className="services-desktop-details__aurora" />
        <div className="services-desktop-details__orbit services-desktop-details__orbit--violet" />
        <div className="services-desktop-details__orbit services-desktop-details__orbit--cyan" />

        <svg
          className="services-desktop-details__signal-map"
          viewBox="0 0 1600 3200"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="services-signal-gradient" x1="160" y1="0" x2="1440" y2="3200" gradientUnits="userSpaceOnUse">
              <stop stopColor="#7C5CFF" stopOpacity="0" />
              <stop offset="0.22" stopColor="#7C5CFF" stopOpacity="0.72" />
              <stop offset="0.62" stopColor="#29D6FF" stopOpacity="0.5" />
              <stop offset="1" stopColor="#29D6FF" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="services-node-gradient">
              <stop stopColor="#B8F4FF" />
              <stop offset="1" stopColor="#29D6FF" stopOpacity="0" />
            </radialGradient>
          </defs>

          <path
            d="M-120 280C300 330 320 780 748 820C1170 860 1090 1330 1530 1450C1810 1528 1320 2050 990 2150C570 2275 640 2790 120 3060"
            stroke="url(#services-signal-gradient)"
            strokeWidth="2"
          />
          <path
            d="M1640 650C1280 720 1390 1090 1050 1190C670 1302 850 1660 465 1770C120 1870 290 2340 -100 2460"
            stroke="url(#services-signal-gradient)"
            strokeWidth="1"
            strokeDasharray="10 22"
            opacity="0.64"
          />
          <path
            d="M170 410L520 640L945 570L1280 870L1110 1240L1420 1580L1090 1910L630 1840L390 2220L740 2580L510 2930"
            stroke="url(#services-signal-gradient)"
            strokeWidth="1"
            opacity="0.34"
          />

          {[410, 820, 1190, 1580, 1910, 2220, 2580, 2930].map((y, index) => (
            <g key={y} opacity={index % 2 === 0 ? 0.8 : 0.5}>
              <circle cx={index % 2 === 0 ? 520 : 1090} cy={y} r="18" fill="url(#services-node-gradient)" />
              <circle cx={index % 2 === 0 ? 520 : 1090} cy={y} r="3" fill="#8BE9FF" />
            </g>
          ))}
        </svg>
      </div>

      <Container className="relative z-10">
        <div className="grid gap-12 xl:grid-cols-[0.82fr_1.18fr] xl:items-end">
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-gradient-to-r from-[#7c5cff] to-[#29d6ff]" />
              <p className="text-[0.64rem] font-semibold uppercase tracking-[0.36em] text-[#8be9ff]">
                Scope · Pricing · Proof
              </p>
            </div>
            <h2 className="mt-8 max-w-[11ch] font-display text-[clamp(4.8rem,7.4vw,8.4rem)] font-semibold leading-[0.8] tracking-[-0.082em] text-white">
              Make the next move concrete.
            </h2>
          </div>
          <p className="max-w-2xl pb-3 text-lg leading-9 text-white/48">
            The animated systems show the character of the work. This section shows the
            practical decision: which service fits, what the first release includes, what
            it costs to start, and what happens next.
          </p>
        </div>

        <section className="mt-20 grid gap-6 xl:grid-cols-[0.72fr_1.28fr]">
          <div className="rounded-[2rem] border border-white/[0.09] bg-white/[0.025] p-7">
            <div className="flex items-center gap-3">
              <Target className="h-4 w-4 text-[#8be9ff]" />
              <p className="text-[0.58rem] font-semibold uppercase tracking-[0.27em] text-[#8be9ff]">
                Find your starting point
              </p>
            </div>
            <h3 className="mt-5 font-display text-3xl font-semibold tracking-[-0.05em] text-white">
              What needs to change?
            </h3>

            <div className="mt-6 grid gap-2">
              {serviceBuyerGoals.map((goal) => {
                const selected = selectedGoal === goal.id;
                return (
                  <button
                    key={goal.id}
                    type="button"
                    onClick={() => setSelectedGoal(goal.id)}
                    aria-pressed={selected}
                    className={cn(
                      "rounded-[1.15rem] border p-4 text-left transition duration-300",
                      selected
                        ? "border-[#8be9ff]/35 bg-[#8be9ff]/10"
                        : "border-white/[0.07] bg-black/15 hover:border-white/[0.14] hover:bg-white/[0.035]"
                    )}
                  >
                    <span className="flex gap-3">
                      <span
                        className={cn(
                          "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border",
                          selected
                            ? "border-[#8be9ff] bg-[#8be9ff] text-[#071014]"
                            : "border-white/20"
                        )}
                      >
                        {selected ? <Check className="h-3 w-3" /> : null}
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-white/82">
                          {goal.label}
                        </span>
                        <span className="mt-1 block text-xs leading-5 text-white/42">
                          {goal.detail}
                        </span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <article
            key={recommendedService.slug}
            className="services-desktop-details__recommendation relative grid min-h-[43rem] overflow-hidden rounded-[2rem] border border-[#8be9ff]/16 bg-[radial-gradient(circle_at_20%_38%,rgba(124,92,255,0.16),transparent_27rem),linear-gradient(145deg,#090b11,#071116)] lg:grid-cols-[0.9fr_1.1fr]"
          >
            <div className="relative min-h-[32rem] overflow-hidden border-r border-white/[0.08]">
              <div
                aria-hidden="true"
                className="page-grid pointer-events-none absolute inset-0 opacity-28"
              />
              <Image
                src={serviceVisualPath(recommendedService.slug)}
                alt={`${recommendedService.shortTitle} system visualization`}
                fill
                sizes="40vw"
                className="object-contain p-10"
              />
            </div>

            <div className="flex flex-col justify-center p-9 xl:p-12">
              <p className="text-[0.58rem] font-semibold uppercase tracking-[0.27em] text-[#8be9ff]">
                Recommended · {recommendedService.shortTitle}
              </p>
              <h3 className="mt-6 max-w-[12ch] font-display text-[clamp(3.2rem,4vw,5rem)] font-semibold leading-[0.86] tracking-[-0.068em] text-white">
                {recommendedService.salesHeadline}
              </h3>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/48">
                {recommendedService.promise}
              </p>

              <div className="mt-7 grid grid-cols-2 gap-3">
                <div className="rounded-[1.2rem] border border-white/[0.08] bg-white/[0.035] p-4">
                  <p className="text-[0.54rem] font-semibold uppercase tracking-[0.2em] text-white/32">
                    Starting point
                  </p>
                  <p className="mt-3 text-sm font-semibold leading-6 text-white/82">
                    {commercial.price}
                  </p>
                </div>
                <div className="rounded-[1.2rem] border border-white/[0.08] bg-white/[0.035] p-4">
                  <p className="flex items-center gap-2 text-[0.54rem] font-semibold uppercase tracking-[0.2em] text-white/32">
                    <Clock3 className="h-3 w-3" /> Typical timing
                  </p>
                  <p className="mt-3 text-sm font-semibold leading-6 text-white/82">
                    {commercial.timeline}
                  </p>
                </div>
              </div>

              <ul className="mt-7 grid gap-3">
                {recommendedService.outcomes.slice(0, 3).map((outcome) => (
                  <li
                    key={outcome}
                    className="flex gap-3 text-sm leading-6 text-white/56"
                  >
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#8be9ff]" />
                    {outcome}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/services/${recommendedService.slug}`}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#08090d]"
                >
                  Explore this service
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/start-project"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#8be9ff]/20 bg-[#8be9ff]/7 px-6 text-sm font-semibold text-[#8be9ff]"
                >
                  Start this project
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </article>
        </section>

        <section className="mt-28">
          <div className="flex items-center justify-between gap-8">
            <div>
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-[#8be9ff]">
                Compare the systems
              </p>
              <h2 className="mt-6 max-w-[12ch] font-display text-6xl font-semibold leading-[0.86] tracking-[-0.07em] text-white">
                Choose by business need, not by buzzword.
              </h2>
            </div>
            <p className="max-w-md text-base leading-8 text-white/42">
              Every starting price and timeline below comes from the same package data
              used on the pricing and service-detail pages.
            </p>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
            {services.map((service) => {
              const details = getServiceCommercialDetails(service);
              return (
                <article
                  key={service.slug}
                  className="group rounded-[1.8rem] border border-white/[0.08] bg-white/[0.024] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#8be9ff]/20 hover:bg-white/[0.04]"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[0.6rem] tracking-[0.18em] text-[#8be9ff]">
                      {service.number}
                    </p>
                    <span className="rounded-full border border-white/[0.08] bg-black/15 px-3 py-1.5 text-[0.54rem] font-semibold uppercase tracking-[0.16em] text-white/40">
                      {details.packageName}
                    </span>
                  </div>
                  <h3 className="mt-5 max-w-[14ch] font-display text-3xl font-semibold leading-[0.92] tracking-[-0.052em] text-white">
                    {service.shortTitle}
                  </h3>
                  <p className="mt-4 min-h-20 text-sm leading-7 text-white/44">
                    {service.summary}
                  </p>
                  <div className="mt-5 grid grid-cols-2 gap-2 border-t border-white/[0.07] pt-5">
                    <div>
                      <p className="text-[0.52rem] uppercase tracking-[0.17em] text-white/28">
                        Starting point
                      </p>
                      <p className="mt-2 text-sm font-semibold text-white/74">
                        {details.price}
                      </p>
                    </div>
                    <div>
                      <p className="text-[0.52rem] uppercase tracking-[0.17em] text-white/28">
                        Typical timing
                      </p>
                      <p className="mt-2 text-sm font-semibold text-white/74">
                        {details.timeline}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/services/${service.slug}`}
                    aria-label={`Explore ${service.title}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#8be9ff]"
                  >
                    See scope and process
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-28 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[2rem] border border-white/[0.09] bg-white/[0.025] p-8">
            <div className="flex items-center gap-3">
              <Sparkles className="h-4 w-4 text-[#8be9ff]" />
              <p className="text-[0.58rem] font-semibold uppercase tracking-[0.27em] text-[#8be9ff]">
                Relevant work
              </p>
            </div>
            <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.9] tracking-[-0.06em] text-white">
              Real work, built to be explored.
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {serviceProofProjects.map((project) => (
                <Link
                  key={project.href}
                  href={project.href}
                  aria-label={`View the ${project.title} case study`}
                  className="group overflow-hidden rounded-[1.35rem] border border-white/[0.08] bg-black/20"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={`${project.title} project preview`}
                      fill
                      sizes="24vw"
                      className="object-cover object-top transition duration-500 group-hover:scale-[1.04]"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#090b11] via-transparent to-transparent"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-[0.52rem] font-semibold uppercase tracking-[0.16em] text-[#8be9ff]">
                      {project.label}
                    </p>
                    <p className="mt-2 font-display text-xl font-semibold tracking-[-0.035em] text-white">
                      {project.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#8be9ff]/16 bg-[linear-gradient(145deg,rgba(124,92,255,0.11),rgba(41,214,255,0.045))] p-8">
            <div className="flex items-center justify-between gap-5">
              <div>
                <p className="text-[0.58rem] font-semibold uppercase tracking-[0.27em] text-[#8be9ff]">
                  Project readiness
                </p>
                <h2 className="mt-5 font-display text-4xl font-semibold leading-[0.92] tracking-[-0.055em] text-white">
                  You do not need a perfect brief.
                </h2>
              </div>
              <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full border border-[#8be9ff]/22 bg-[#8be9ff]/7 font-mono text-sm text-[#8be9ff]">
                {readinessProgress}%
              </div>
            </div>

            <div className="mt-7 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
              <div
                className="h-full origin-left rounded-full bg-gradient-to-r from-[#7c5cff] to-[#29d6ff] transition-transform duration-500"
                style={{ transform: `scaleX(${readinessProgress / 100})` }}
              />
            </div>

            <div className="mt-7 grid gap-2">
              {serviceReadinessItems.map((item, index) => {
                const checked = readiness.has(index);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleReadiness(index)}
                    aria-pressed={checked}
                    className="flex items-start gap-3 rounded-[1.05rem] border border-white/[0.07] bg-black/15 p-4 text-left transition hover:bg-white/[0.035]"
                  >
                    <span
                      className={cn(
                        "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border transition",
                        checked
                          ? "border-[#8be9ff] bg-[#8be9ff] text-[#071014]"
                          : "border-white/20"
                      )}
                    >
                      {checked ? <Check className="h-3 w-3" /> : null}
                    </span>
                    <span
                      className={
                        checked
                          ? "text-sm leading-6 text-white/74"
                          : "text-sm leading-6 text-white/46"
                      }
                    >
                      {item}
                    </span>
                  </button>
                );
              })}
            </div>

            <Link
              href="/start-project"
              className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#7c5cff] to-[#29d6ff] px-6 text-sm font-semibold text-[#05070b]"
            >
              Start with rough notes
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </Container>
    </main>
  );
}
