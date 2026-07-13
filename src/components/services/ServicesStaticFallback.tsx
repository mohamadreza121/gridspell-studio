"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Sparkles,
  Target
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { packages } from "@/config/packages";
import { services, type Service } from "@/config/services";
import { cn } from "@/lib/utils";

const packageById = new Map(packages.map((item) => [item.id, item]));

const buyerGoals = [
  {
    id: "credibility",
    label: "Look credible and get more enquiries",
    detail: "You need a clear, professional sales website.",
    serviceSlug: "business-websites"
  },
  {
    id: "underperforming",
    label: "Fix an outdated or underperforming site",
    detail: "The business has outgrown its current website.",
    serviceSlug: "website-redesign"
  },
  {
    id: "campaign",
    label: "Launch one offer or campaign",
    detail: "You need one focused page and one measurable action.",
    serviceSlug: "landing-pages"
  },
  {
    id: "clients",
    label: "Give clients a better workflow",
    detail: "Files, approvals, updates, and reporting need one home.",
    serviceSlug: "client-portals"
  },
  {
    id: "software",
    label: "Build custom software",
    detail: "Your workflow needs more than an off-the-shelf tool.",
    serviceSlug: "full-stack-apps"
  },
  {
    id: "support",
    label: "Keep an existing site healthy",
    detail: "You need reliable updates, monitoring, and improvement.",
    serviceSlug: "care-plans"
  }
] as const;

type BuyerGoalId = (typeof buyerGoals)[number]["id"];

const proofProjects = [
  {
    title: "DESA Foam Insulation",
    label: "Business website · client work",
    href: "/work/desa-foam-insulation",
    image: "/images/work/selected-work/desa-foam-insulation-mobile-v2.jpg"
  },
  {
    title: "Landing Page Gallery",
    label: "12 live conversion directions",
    href: "/work/landing-page-gallery",
    image: "/images/work/selected-work/landing-page-gallery-mobile-v3.jpg"
  },
  {
    title: "GridSpell Studio",
    label: "Design system · full website",
    href: "/work/gridspell-studio",
    image: "/images/work/selected-work/gridspell-studio-mobile-v2.jpg"
  }
] as const;

const readinessItems = [
  "I can explain the offer or problem in a few sentences",
  "I know who the primary customer or user is",
  "I have rough content, examples, or existing material",
  "I have a target launch window in mind",
  "The people approving the project can join key reviews"
] as const;

function serviceVisualPath(slug: string) {
  return `/images/services/mobile/${slug}.webp`;
}

function getCommercialDetails(service: Service) {
  if (service.slug === "care-plans") {
    return {
      price: "Monthly scope after a site audit",
      timeline: "Ongoing support",
      packageName: "Care plan"
    };
  }

  const recommendedPackage = packageById.get(service.packageId);

  return {
    price: recommendedPackage?.price ?? "Quoted by scope",
    timeline: recommendedPackage?.timeline ?? "Confirmed after discovery",
    packageName: recommendedPackage?.name ?? "Custom"
  };
}

function ServiceScope({ service }: { service: Service }) {
  const recommendedPackage = packageById.get(service.packageId);
  const exclusions =
    service.slug === "care-plans"
      ? [
          "Monthly capacity and response times are confirmed after the initial audit",
          "Large redesigns, new applications, and major features are quoted separately",
          "Third-party software and hosting fees remain separate"
        ]
      : (recommendedPackage?.exclusions ?? []);

  return (
    <div className="services-mobile__scope mt-7 border-t border-white/[0.08] pt-7">
      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <p className="text-[0.56rem] font-semibold uppercase tracking-[0.23em] text-[#8be9ff]">
            What this should change
          </p>
          <ul className="mt-4 grid gap-3">
            {service.outcomes.map((outcome) => (
              <li key={outcome} className="flex gap-3 text-sm leading-6 text-white/54">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#8be9ff]" />
                {outcome}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[0.56rem] font-semibold uppercase tracking-[0.23em] text-[#8be9ff]">
            Core scope
          </p>
          <ul className="mt-4 grid gap-3">
            {service.deliverables.map((deliverable) => (
              <li
                key={deliverable}
                className="flex gap-3 text-sm leading-6 text-white/54"
              >
                <Check className="mt-1 h-4 w-4 shrink-0 text-[#8be9ff]" />
                {deliverable}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 rounded-[1.5rem] border border-white/[0.08] bg-black/20 p-5 sm:p-6">
        <p className="text-[0.56rem] font-semibold uppercase tracking-[0.23em] text-white/30">
          How the work moves
        </p>
        <div className="mt-5 grid gap-5 sm:grid-cols-3">
          {service.process.map((step, index) => (
            <article key={step.title}>
              <p className="font-mono text-[0.56rem] tracking-[0.18em] text-[#8be9ff]">
                STEP {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-display text-xl font-semibold tracking-[-0.04em] text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/42">{step.text}</p>
            </article>
          ))}
        </div>
      </div>

      {exclusions.length > 0 ? (
        <div className="mt-6">
          <p className="text-[0.56rem] font-semibold uppercase tracking-[0.23em] text-white/30">
            Scope boundaries
          </p>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-white/42">
            {exclusions.map((exclusion) => (
              <li key={exclusion}>— {exclusion}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-7 grid gap-3">
        {service.faqs.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-[1.25rem] border border-white/[0.08] bg-white/[0.02] p-4"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold tracking-[-0.025em] text-white/76">
              {faq.question}
              <ChevronDown className="h-4 w-4 shrink-0 text-[#8be9ff] transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-3 pr-5 text-sm leading-7 text-white/46">{faq.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

export function ServicesStaticFallback() {
  const [activeService, setActiveService] = useState(services[0].slug);
  const [selectedGoal, setSelectedGoal] = useState<BuyerGoalId>(buyerGoals[0].id);
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [readiness, setReadiness] = useState<Set<number>>(() => new Set());

  const recommendedGoal = useMemo(
    () => buyerGoals.find((goal) => goal.id === selectedGoal) ?? buyerGoals[0],
    [selectedGoal]
  );
  const recommendedService =
    services.find((service) => service.slug === recommendedGoal.serviceSlug) ??
    services[0];
  const readinessProgress = Math.round((readiness.size / readinessItems.length) * 100);

  useEffect(() => {
    const chapters = services
      .map((service) => document.getElementById(`service-${service.slug}`))
      .filter((chapter): chapter is HTMLElement => Boolean(chapter));

    const activeObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target instanceof HTMLElement) {
          setActiveService(visible.target.dataset.serviceSlug ?? services[0].slug);
        }
      },
      { rootMargin: "-22% 0px -58% 0px", threshold: [0, 0.2, 0.45] }
    );

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            entry.target.dataset.visible = "true";
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    chapters.forEach((chapter) => {
      activeObserver.observe(chapter);
      revealObserver.observe(chapter);
    });

    return () => {
      activeObserver.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  function scrollToService(slug: string) {
    document.getElementById(`service-${slug}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  function toggleReadiness(index: number) {
    setReadiness((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <main className="services-mobile relative overflow-hidden bg-[#07080c] pb-24 pt-28 text-white sm:pt-32">
      <div
        aria-hidden="true"
        className="page-grid pointer-events-none absolute inset-0 opacity-38"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-16rem] top-20 h-[32rem] w-[32rem] rounded-full bg-[#7c5cff]/14 blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-17rem] top-[42rem] h-[34rem] w-[34rem] rounded-full bg-[#29d6ff]/10 blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[3%] top-28 whitespace-nowrap font-display text-[38vw] font-semibold leading-none tracking-[-0.1em] text-white/[0.014] sm:text-[27vw]"
      >
        SYSTEMS
      </div>

      <Container className="relative">
        <div className="max-w-4xl">
          <div className="flex items-center gap-4">
            <span className="h-px w-11 bg-gradient-to-r from-[#7c5cff] to-[#29d6ff]" />
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-[#8be9ff] sm:text-[0.64rem] sm:tracking-[0.38em]">
              Services · Systems in motion
            </p>
          </div>

          <h1 className="mt-8 max-w-4xl text-balance font-display text-[clamp(3.7rem,15vw,7rem)] font-semibold leading-[0.82] tracking-[-0.078em] text-white">
            Digital systems built to move business forward.
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-white/46 sm:text-lg sm:leading-9">
            Strategy, design, development, secure data, and ongoing improvement—organized
            around what the business needs to achieve next.
          </p>
        </div>

        <section className="mt-11 overflow-hidden rounded-[2rem] border border-[#8be9ff]/16 bg-[radial-gradient(circle_at_90%_10%,rgba(41,214,255,0.12),transparent_24rem),linear-gradient(145deg,rgba(124,92,255,0.11),rgba(9,11,17,0.96))] p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <Target className="h-4 w-4 text-[#8be9ff]" />
            <p className="text-[0.58rem] font-semibold uppercase tracking-[0.28em] text-[#8be9ff]">
              Find the right starting point
            </p>
          </div>
          <h2 className="mt-5 max-w-3xl font-display text-3xl font-semibold leading-[0.94] tracking-[-0.05em] text-white sm:text-4xl">
            What are you trying to improve?
          </h2>

          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            {buyerGoals.map((goal) => {
              const selected = selectedGoal === goal.id;
              return (
                <button
                  key={goal.id}
                  type="button"
                  onClick={() => setSelectedGoal(goal.id)}
                  aria-pressed={selected}
                  className={cn(
                    "rounded-[1.2rem] border p-4 text-left transition",
                    selected
                      ? "border-[#8be9ff]/35 bg-[#8be9ff]/10"
                      : "border-white/[0.08] bg-black/15 text-white/58 active:bg-white/[0.04]"
                  )}
                >
                  <span className="flex items-start gap-3">
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
                      <span className="block text-sm font-semibold leading-6 text-white/82">
                        {goal.label}
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-white/36">
                        {goal.detail}
                      </span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex flex-col gap-4 rounded-[1.3rem] border border-white/[0.08] bg-black/20 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[0.54rem] font-semibold uppercase tracking-[0.2em] text-white/28">
                Recommended starting point
              </p>
              <p className="mt-2 font-display text-2xl font-semibold tracking-[-0.04em] text-white">
                {recommendedService.shortTitle}
              </p>
            </div>
            <button
              type="button"
              onClick={() => scrollToService(recommendedService.slug)}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#08090d]"
            >
              See recommendation
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        <nav
          aria-label="Service chapters"
          className="services-mobile__nav -mx-5 mt-8 flex gap-2 overflow-x-auto px-5 pb-3 [scrollbar-width:none] sm:-mx-8 sm:px-8 [&::-webkit-scrollbar]:hidden"
        >
          {services.map((service) => (
            <a
              key={service.slug}
              href={`#service-${service.slug}`}
              aria-current={activeService === service.slug ? "step" : undefined}
              className={cn(
                "inline-flex min-h-11 shrink-0 items-center gap-2.5 rounded-full border px-4 text-[0.6rem] font-semibold uppercase tracking-[0.14em] transition",
                activeService === service.slug
                  ? "border-[#8be9ff]/35 bg-[#8be9ff]/10 text-white"
                  : "border-white/[0.1] bg-[#0a0c12] text-white/65"
              )}
            >
              <span className="font-mono text-[#8be9ff]">{service.number}</span>
              {service.shortTitle}
            </a>
          ))}
        </nav>

        <div className="mt-7 grid gap-7 sm:gap-10">
          {services.map((service, index) => {
            const commercial = getCommercialDetails(service);
            const expanded = expandedService === service.slug;

            return (
              <article
                id={`service-${service.slug}`}
                data-service-slug={service.slug}
                data-visible="false"
                key={service.slug}
                className="services-mobile__chapter group scroll-mt-24 overflow-hidden rounded-[2rem] border border-white/[0.1] bg-[#090b11]/92 shadow-[0_28px_90px_rgba(0,0,0,0.3)] lg:grid lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch"
              >
                <div className="services-mobile__visual relative aspect-[1.05/1] min-h-[18rem] overflow-hidden border-b border-white/[0.08] bg-[#07080c] sm:min-h-[24rem] lg:aspect-auto lg:min-h-[36rem] lg:border-b-0 lg:border-r">
                  <div
                    aria-hidden="true"
                    className="page-grid pointer-events-none absolute inset-0 opacity-30"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-1/2 h-[76%] w-[76%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7c5cff]/12 blur-[75px]"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-2 top-1/2 -translate-y-1/2 font-display text-[13rem] font-semibold leading-none tracking-[-0.1em] text-white/[0.018] sm:text-[18rem]"
                  >
                    {service.number}
                  </span>
                  <Image
                    src={serviceVisualPath(service.slug)}
                    alt={`${service.shortTitle} system visualization`}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 767px) calc(100vw - 2.5rem), (max-width: 1279px) 46vw, 560px"
                    className="services-mobile__object relative z-10 object-contain p-2 sm:p-5 lg:p-7"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-[#090b11] to-transparent lg:hidden"
                  />
                </div>

                <div className="relative flex flex-col p-6 sm:p-8 lg:justify-center lg:p-10">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[0.62rem] tracking-[0.2em] text-white/28">
                      {service.number}
                    </span>
                    <span className="h-px w-10 bg-gradient-to-r from-[#7c5cff] to-[#29d6ff]" />
                    <span className="text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-[#8be9ff]">
                      {service.shortTitle}
                    </span>
                  </div>

                  <h2 className="mt-6 text-balance font-display text-[clamp(2.55rem,11vw,4.4rem)] font-semibold leading-[0.88] tracking-[-0.065em] text-white lg:text-[clamp(3rem,4.5vw,4.6rem)]">
                    {service.title}
                  </h2>

                  <p className="mt-5 text-base leading-8 text-white/46">
                    {service.summary}
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-2">
                    <div className="rounded-[1.15rem] border border-white/[0.08] bg-white/[0.025] p-4">
                      <p className="text-[0.52rem] font-semibold uppercase tracking-[0.18em] text-white/26">
                        Starting point
                      </p>
                      <p className="mt-2 text-sm font-semibold leading-6 text-white/78">
                        {commercial.price}
                      </p>
                    </div>
                    <div className="rounded-[1.15rem] border border-white/[0.08] bg-white/[0.025] p-4">
                      <p className="flex items-center gap-1.5 text-[0.52rem] font-semibold uppercase tracking-[0.18em] text-white/26">
                        <Clock3 className="h-3 w-3" /> Typical timing
                      </p>
                      <p className="mt-2 text-sm font-semibold leading-6 text-white/78">
                        {commercial.timeline}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 border-l border-[#8be9ff]/30 pl-5">
                    <p className="text-[0.56rem] font-semibold uppercase tracking-[0.23em] text-white/28">
                      Ideal for
                    </p>
                    <p className="mt-2 text-sm leading-7 text-white/56">
                      {service.idealFor}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {service.deliverables.slice(0, 3).map((deliverable) => (
                      <span
                        key={deliverable}
                        className="rounded-full border border-white/[0.09] bg-white/[0.025] px-3.5 py-2 text-[0.56rem] uppercase tracking-[0.14em] text-white/42"
                      >
                        {deliverable}
                      </span>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-full border border-white/[0.14] bg-white px-6 text-sm font-semibold text-[#08090d] transition active:scale-[0.98]"
                    >
                      Explore this service
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => setExpandedService(expanded ? null : service.slug)}
                      aria-expanded={expanded}
                      aria-controls={`scope-${service.slug}`}
                      className="inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-full border border-[#8be9ff]/18 bg-[#8be9ff]/6 px-5 text-sm font-semibold text-[#8be9ff]"
                    >
                      {expanded ? "Hide scope" : "View scope details"}
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          expanded && "rotate-180"
                        )}
                      />
                    </button>
                  </div>

                  {expanded ? (
                    <div id={`scope-${service.slug}`} className="lg:col-span-2">
                      <ServiceScope service={service} />
                    </div>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>

        <section className="mt-16">
          <div className="flex items-center gap-3">
            <Sparkles className="h-4 w-4 text-[#8be9ff]" />
            <p className="text-[0.58rem] font-semibold uppercase tracking-[0.28em] text-[#8be9ff]">
              Compare the starting points
            </p>
          </div>
          <h2 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[0.92] tracking-[-0.055em] text-white sm:text-5xl">
            Choose by business need, not by buzzword.
          </h2>

          <div className="mt-7 overflow-hidden rounded-[1.7rem] border border-white/[0.09] bg-white/[0.02]">
            {services.map((service) => {
              const commercial = getCommercialDetails(service);
              return (
                <button
                  key={service.slug}
                  type="button"
                  onClick={() => scrollToService(service.slug)}
                  className="grid w-full grid-cols-[2.2rem_1fr_auto] items-center gap-3 border-b border-white/[0.07] px-4 py-5 text-left last:border-b-0 sm:grid-cols-[3rem_1.3fr_1fr_0.8fr] sm:px-6"
                >
                  <span className="font-mono text-[0.6rem] text-[#8be9ff]">
                    {service.number}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-white/78">
                      {service.shortTitle}
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-white/32 sm:hidden">
                      {commercial.price} · {commercial.timeline}
                    </span>
                  </span>
                  <span className="hidden text-xs leading-5 text-white/42 sm:block">
                    {commercial.price}
                  </span>
                  <span className="hidden text-xs leading-5 text-white/42 sm:block">
                    {commercial.timeline}
                  </span>
                  <ArrowRight className="h-4 w-4 text-white/24 sm:hidden" />
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-16">
          <p className="text-[0.58rem] font-semibold uppercase tracking-[0.28em] text-[#8be9ff]">
            Relevant work
          </p>
          <h2 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[0.92] tracking-[-0.055em] text-white sm:text-5xl">
            Real work, built to be explored.
          </h2>
          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            {proofProjects.map((project) => (
              <Link
                key={project.href}
                href={project.href}
                aria-label={`View the ${project.title} case study`}
                className="group overflow-hidden rounded-[1.6rem] border border-white/[0.09] bg-white/[0.025]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#07080c]">
                  <Image
                    src={project.image}
                    alt={`${project.title} project preview`}
                    fill
                    sizes="(max-width: 639px) calc(100vw - 2.5rem), 30vw"
                    className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#090b11]/80 via-transparent to-transparent"
                  />
                </div>
                <div className="p-5">
                  <p className="text-[0.54rem] font-semibold uppercase tracking-[0.18em] text-[#8be9ff]">
                    {project.label}
                  </p>
                  <p className="mt-3 font-display text-2xl font-semibold tracking-[-0.04em] text-white">
                    {project.title}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white/48">
                    View the work <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-[2rem] border border-white/[0.09] bg-white/[0.025] p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[0.58rem] font-semibold uppercase tracking-[0.28em] text-[#8be9ff]">
                Project readiness
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
                You do not need a perfect brief.
              </h2>
            </div>
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full border border-[#8be9ff]/22 bg-[#8be9ff]/7 font-mono text-sm text-[#8be9ff]">
              {readinessProgress}%
            </div>
          </div>

          <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="h-full origin-left rounded-full bg-gradient-to-r from-[#7c5cff] to-[#29d6ff] transition-transform duration-500"
              style={{ transform: `scaleX(${readinessProgress / 100})` }}
            />
          </div>

          <div className="mt-6 grid gap-2">
            {readinessItems.map((item, index) => {
              const checked = readiness.has(index);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleReadiness(index)}
                  aria-pressed={checked}
                  className="flex items-start gap-3 rounded-[1.1rem] border border-white/[0.07] bg-black/15 p-4 text-left"
                >
                  <span
                    className={cn(
                      "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border transition",
                      checked
                        ? "border-[#8be9ff] bg-[#8be9ff] text-[#071014]"
                        : "border-white/18"
                    )}
                  >
                    {checked ? <Check className="h-3 w-3" /> : null}
                  </span>
                  <span
                    className={cn(
                      "text-sm leading-6 transition",
                      checked ? "text-white/72" : "text-white/44"
                    )}
                  >
                    {item}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="mt-5 text-sm leading-7 text-white/42">
            Rough notes are enough to begin. Discovery turns them into a usable scope,
            content plan, and release path.
          </p>
        </section>

        <div className="mt-14 rounded-[2rem] border border-[#8be9ff]/16 bg-gradient-to-br from-[#7c5cff]/10 to-[#29d6ff]/5 p-7 sm:p-9">
          <p className="text-[0.58rem] font-semibold uppercase tracking-[0.28em] text-[#8be9ff]">
            Not sure where to start?
          </p>
          <h2 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[0.92] tracking-[-0.055em] text-white sm:text-5xl">
            Start with the business problem. We’ll shape the right system around it.
          </h2>
          <Link
            href="/start-project"
            className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#7c5cff] to-[#29d6ff] px-6 text-sm font-semibold text-[#05070b]"
          >
            Start your project
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </main>
  );
}
