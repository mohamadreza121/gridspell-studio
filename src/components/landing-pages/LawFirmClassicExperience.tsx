"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  ChevronRight,
  FileText,
  Landmark,
  Menu,
  Scale,
  ShieldCheck,
  Users,
  X,
  type LucideIcon
} from "lucide-react";

const startHref =
  "/start-project?package=landing-page&source=law-firm-classic&design=Modern+Classic+Law+Firm";

type PracticeKey = "business" | "disputes" | "employment" | "private";

type PracticeArea = {
  key: PracticeKey;
  number: string;
  title: string;
  eyebrow: string;
  summary: string;
  matters: string[];
  Icon: LucideIcon;
};

const practiceAreas: PracticeArea[] = [
  {
    key: "business",
    number: "01",
    title: "Business & commercial",
    eyebrow: "Build with confidence",
    summary:
      "Practical counsel for owners, leadership teams, and growing companies making consequential decisions.",
    matters: ["Commercial agreements", "Corporate governance", "Acquisitions and exits"],
    Icon: BriefcaseBusiness
  },
  {
    key: "disputes",
    number: "02",
    title: "Dispute resolution",
    eyebrow: "Protect the position",
    summary:
      "Clear strategy for complex commercial disputes, negotiations, and litigation where timing and judgment matter.",
    matters: ["Contract disputes", "Shareholder matters", "Negotiation and litigation"],
    Icon: Scale
  },
  {
    key: "employment",
    number: "03",
    title: "Employment law",
    eyebrow: "Move carefully",
    summary:
      "Balanced advice for employers and senior professionals navigating workplace risk, change, and resolution.",
    matters: ["Executive transitions", "Workplace investigations", "Employment agreements"],
    Icon: Users
  },
  {
    key: "private",
    number: "04",
    title: "Private client",
    eyebrow: "Plan beyond today",
    summary:
      "Discreet planning for families, founders, and individuals protecting assets, succession, and long-term intent.",
    matters: ["Estate planning", "Business succession", "Trust and legacy matters"],
    Icon: Landmark
  }
];

const insights = [
  {
    category: "Business",
    title: "Five questions to resolve before signing a shareholder agreement.",
    date: "Briefing 01"
  },
  {
    category: "Employment",
    title: "What a well-managed executive departure should look like.",
    date: "Briefing 02"
  },
  {
    category: "Disputes",
    title: "When early negotiation creates more leverage than immediate litigation.",
    date: "Briefing 03"
  }
] as const;

function PrimaryLink({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-12 items-center justify-center gap-3 border px-6 text-[0.64rem] font-black uppercase tracking-[0.19em] transition ${
        light
          ? "border-white/32 text-white hover:bg-white hover:text-[#191817]"
          : "border-[#252321] bg-[#252321] text-white hover:bg-[#6c2f34] hover:border-[#6c2f34]"
      }`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

function FirmMark() {
  return (
    <span className="flex items-center gap-3">
      <span className="grid h-10 w-10 place-items-center border border-current/28">
        <span className="font-display text-lg font-semibold tracking-[-0.08em]">A&F</span>
      </span>
      <span>
        <strong className="block font-display text-xl font-semibold leading-none tracking-[-0.055em]">ALDER & FINCH</strong>
        <small className="mt-1 block text-[0.46rem] font-black uppercase tracking-[0.24em] opacity-55">Barristers & solicitors</small>
      </span>
    </span>
  );
}

export function LawFirmClassicExperience() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePractice, setActivePractice] = useState<PracticeKey>("business");

  const active = practiceAreas.find((area) => area.key === activePractice) ?? practiceAreas[0];
  const ActiveIcon = active.Icon;

  return (
    <main className="overflow-hidden bg-[#f2efe8] text-[#252321]">
      <section className="relative min-h-svh border-b border-[#252321]/12 bg-[#f2efe8]">
        <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-[46%] bg-[#dad3c6] lg:block" />
        <div aria-hidden="true" className="absolute left-[7%] top-32 h-px w-20 bg-[#6c2f34]" />

        <header className="relative z-40 mx-auto flex w-full max-w-[1540px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12 lg:py-7">
          <Link href="/landing-pages" aria-label="Back to landing page gallery">
            <FirmMark />
          </Link>

          <nav className="hidden items-center gap-8 text-[0.61rem] font-black uppercase tracking-[0.19em] text-[#252321]/58 lg:flex">
            <a className="transition hover:text-[#6c2f34]" href="#practice">Practice</a>
            <a className="transition hover:text-[#6c2f34]" href="#approach">Approach</a>
            <a className="transition hover:text-[#6c2f34]" href="#counsel">Counsel</a>
            <a className="transition hover:text-[#6c2f34]" href="#insights">Insights</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="#consultation"
              className="hidden min-h-11 items-center gap-3 border border-[#252321]/18 bg-white/55 px-5 text-[0.6rem] font-black uppercase tracking-[0.18em] shadow-[0_14px_38px_rgba(37,35,33,0.06)] backdrop-blur-xl transition hover:border-[#6c2f34] hover:text-[#6c2f34] sm:inline-flex"
            >
              <CalendarDays className="h-4 w-4" />
              Request consultation
            </Link>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center border border-[#252321]/20 bg-white/55 backdrop-blur-xl lg:hidden"
              onClick={() => setMenuOpen((value) => !value)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </header>

        {menuOpen ? (
          <div className="absolute inset-x-4 top-20 z-50 border border-[#252321]/14 bg-[#f7f4ed]/98 p-7 shadow-[0_30px_90px_rgba(37,35,33,.14)] backdrop-blur-2xl sm:inset-x-8 lg:hidden">
            <nav className="grid gap-5 font-display text-3xl font-medium tracking-[-0.05em]">
              <a href="#practice" onClick={() => setMenuOpen(false)}>Practice</a>
              <a href="#approach" onClick={() => setMenuOpen(false)}>Approach</a>
              <a href="#counsel" onClick={() => setMenuOpen(false)}>Counsel</a>
              <a href="#insights" onClick={() => setMenuOpen(false)}>Insights</a>
              <a className="text-[#6c2f34]" href="#consultation" onClick={() => setMenuOpen(false)}>Request consultation</a>
            </nav>
          </div>
        ) : null}

        <div className="relative z-10 mx-auto grid min-h-[calc(100svh-5.5rem)] w-full max-w-[1540px] gap-10 px-5 pb-7 sm:px-8 sm:pb-10 lg:grid-cols-[0.94fr_1.06fr] lg:px-12 lg:pb-12">
          <div className="flex flex-col justify-center py-14 lg:pr-14 lg:py-20">
            <p className="text-[0.58rem] font-black uppercase tracking-[0.24em] text-[#6c2f34]">
              Toronto counsel · Business, disputes, private clients
            </p>
            <h1 className="mt-7 max-w-[9ch] font-display text-[clamp(4.5rem,8.2vw,9.6rem)] font-medium leading-[0.77] tracking-[-0.085em]">
              Clarity when the stakes are high.
            </h1>
            <p className="mt-8 max-w-xl text-base leading-8 text-[#625f59] sm:text-lg sm:leading-9">
              Strategic legal counsel for businesses and individuals facing decisions that cannot be handled casually.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <PrimaryLink href="#consultation">Discuss your matter</PrimaryLink>
              <Link
                href="#practice"
                className="group inline-flex min-h-12 items-center gap-3 px-2 text-[0.64rem] font-black uppercase tracking-[0.19em]"
              >
                Explore the practice
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="mt-14 grid max-w-xl grid-cols-3 border-y border-[#252321]/14 py-6">
              <div>
                <strong className="font-display text-3xl font-semibold tracking-[-0.055em] sm:text-4xl">18+</strong>
                <p className="mt-2 text-[0.5rem] font-black uppercase tracking-[0.15em] text-[#77736c]">Years advising</p>
              </div>
              <div className="border-x border-[#252321]/12 px-5">
                <strong className="font-display text-3xl font-semibold tracking-[-0.055em] sm:text-4xl">4</strong>
                <p className="mt-2 text-[0.5rem] font-black uppercase tracking-[0.15em] text-[#77736c]">Focused practices</p>
              </div>
              <div className="pl-5">
                <strong className="font-display text-3xl font-semibold tracking-[-0.055em] sm:text-4xl">1:1</strong>
                <p className="mt-2 text-[0.5rem] font-black uppercase tracking-[0.15em] text-[#77736c]">Direct counsel</p>
              </div>
            </div>
          </div>

          <div className="relative min-h-[65svh] overflow-hidden bg-[#d5cec0] lg:min-h-0">
            <img
              src="https://images.pexels.com/photos/5668882/pexels-photo-5668882.jpeg?auto=compress&cs=tinysrgb&w=2200"
              alt="Legal counsel reviewing a matter"
              className="absolute inset-0 h-full w-full object-cover grayscale-[18%]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,24,22,.03),rgba(26,24,22,.04)_55%,rgba(26,24,22,.68)_100%)]" />
            <div className="absolute left-5 top-5 border border-white/35 bg-[#f5f1e8]/82 px-4 py-3 shadow-[0_18px_48px_rgba(37,35,33,.13)] backdrop-blur-xl sm:left-7 sm:top-7">
              <p className="text-[0.5rem] font-black uppercase tracking-[0.2em] text-[#6c2f34]">The Alder & Finch standard</p>
              <p className="mt-1 font-display text-xl font-semibold tracking-[-0.045em]">Careful thinking. Decisive action.</p>
            </div>
            <div className="absolute inset-x-5 bottom-5 border-t border-white/36 pt-5 text-white sm:inset-x-7 sm:bottom-7">
              <div className="flex items-end justify-between gap-6">
                <p className="max-w-md text-sm leading-7 text-white/74">
                  Every engagement begins with the same question: what outcome matters most, and what is the clearest path toward it?
                </p>
                <span className="hidden h-12 w-12 shrink-0 place-items-center border border-white/38 bg-black/10 backdrop-blur-lg sm:grid">
                  <Scale className="h-5 w-5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#252321]/12 bg-[#252321] px-5 py-5 text-white sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1450px] gap-4 md:grid-cols-4">
          {[
            [ShieldCheck, "Confidential", "Discreet handling from first contact"],
            [FileText, "Clear scope", "Practical advice and transparent next steps"],
            [Building2, "Commercially aware", "Legal strategy grounded in business reality"],
            [Check, "Direct access", "Senior counsel throughout the matter"]
          ].map(([Icon, title, copy]) => {
            const TrustIcon = Icon as LucideIcon;
            return (
              <div key={String(title)} className="flex items-center gap-3 py-3 md:border-r md:border-white/12 md:pr-5 md:last:border-r-0">
                <TrustIcon className="h-5 w-5 shrink-0 text-[#c59d67]" />
                <div>
                  <p className="text-[0.58rem] font-black uppercase tracking-[0.16em]">{String(title)}</p>
                  <p className="mt-1 text-xs text-white/46">{String(copy)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="practice" className="px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="mx-auto max-w-[1450px]">
          <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <div>
              <p className="text-[0.58rem] font-black uppercase tracking-[0.24em] text-[#6c2f34]">The practice</p>
              <h2 className="mt-6 max-w-[8ch] font-display text-[clamp(4rem,7vw,8rem)] font-medium leading-[0.78] tracking-[-0.075em]">
                Focused where judgment matters.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-8 text-[#65615b] lg:justify-self-end lg:pb-3 sm:text-lg sm:leading-9">
              Complex matters become manageable when the legal question, commercial reality, and desired outcome are considered together.
            </p>
          </div>

          <div className="mt-14 grid border-t border-[#252321]/18 lg:grid-cols-[0.84fr_1.16fr]">
            <div className="border-b border-[#252321]/18 lg:border-b-0 lg:border-r">
              {practiceAreas.map((area) => (
                <button
                  key={area.key}
                  type="button"
                  onMouseEnter={() => setActivePractice(area.key)}
                  onFocus={() => setActivePractice(area.key)}
                  onClick={() => setActivePractice(area.key)}
                  className={`group grid w-full grid-cols-[3rem_1fr_auto] items-center gap-4 border-b border-[#252321]/12 py-7 pr-5 text-left transition last:border-b-0 ${
                    activePractice === area.key ? "bg-[#e4ddd1] pl-5" : "hover:bg-white/45 hover:pl-3"
                  }`}
                  aria-pressed={activePractice === area.key}
                >
                  <span className="text-[0.54rem] font-black tracking-[0.16em] text-[#7c7770]">{area.number}</span>
                  <span className="font-display text-2xl font-semibold tracking-[-0.045em] sm:text-3xl">{area.title}</span>
                  <ChevronRight className={`h-4 w-4 transition ${activePractice === area.key ? "opacity-100" : "-translate-x-2 opacity-25"}`} />
                </button>
              ))}
            </div>

            <div className="relative min-h-[34rem] overflow-hidden bg-[#6c2f34] p-7 text-white sm:p-10 lg:p-14">
              <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[1px] border-white/12" />
              <div aria-hidden="true" className="absolute -right-10 -top-10 h-44 w-44 rounded-full border-[1px] border-white/12" />
              <ActiveIcon className="h-7 w-7 text-[#d7b98e]" />
              <p className="mt-12 text-[0.55rem] font-black uppercase tracking-[0.24em] text-[#e4c9a3]/65">{active.eyebrow}</p>
              <h3 className="mt-4 max-w-[10ch] font-display text-[clamp(3rem,5vw,5.5rem)] font-medium leading-[0.82] tracking-[-0.065em]">
                {active.title}
              </h3>
              <p className="mt-7 max-w-xl text-base leading-8 text-white/64">{active.summary}</p>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {active.matters.map((matter, index) => (
                  <div key={matter} className="border-t border-white/20 pt-4">
                    <span className="text-[0.48rem] font-black uppercase tracking-[0.18em] text-[#d7b98e]">0{index + 1}</span>
                    <p className="mt-2 text-sm font-semibold text-white/84">{matter}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="approach" className="grid bg-[#dcd5ca] lg:min-h-svh lg:grid-cols-2">
        <div className="relative min-h-[68svh] overflow-hidden lg:min-h-svh">
          <img
            src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1900"
            alt="Counsel discussing strategy"
            className="absolute inset-0 h-full w-full object-cover grayscale-[22%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#272421]/68 via-transparent to-transparent" />
          <div className="absolute bottom-7 left-7 right-7 text-white sm:bottom-10 sm:left-10 sm:right-10">
            <p className="text-[0.54rem] font-black uppercase tracking-[0.22em] text-white/58">Strategy before activity</p>
            <p className="mt-2 max-w-md font-display text-3xl font-medium leading-tight tracking-[-0.055em] sm:text-4xl">
              The right legal move is not always the loudest one.
            </p>
          </div>
        </div>

        <div className="flex items-center px-5 py-20 sm:px-10 sm:py-28 lg:px-16 xl:px-24">
          <div className="max-w-xl">
            <p className="text-[0.58rem] font-black uppercase tracking-[0.24em] text-[#6c2f34]">How we work</p>
            <h2 className="mt-6 font-display text-[clamp(4rem,7vw,7.5rem)] font-medium leading-[0.78] tracking-[-0.075em]">
              A clear process for complicated decisions.
            </h2>
            <p className="mt-8 text-base leading-8 text-[#615d57] sm:text-lg sm:leading-9">
              Advice should reduce uncertainty. We define the issue, identify leverage and exposure, then build a course of action that can be understood and defended.
            </p>

            <div className="mt-10 border-t border-[#252321]/16">
              {[
                ["01", "Understand the position", "The facts, goals, urgency, and commercial context are mapped before recommendations are made."],
                ["02", "Define the options", "Each realistic path is explained with its legal, financial, and practical implications."],
                ["03", "Act with purpose", "The chosen strategy is carried out carefully, with direct communication and no unnecessary theatre."]
              ].map(([number, title, copy]) => (
                <div key={number} className="grid gap-4 border-b border-[#252321]/16 py-6 sm:grid-cols-[3rem_1fr]">
                  <span className="text-[0.52rem] font-black tracking-[0.17em] text-[#7b756d]">{number}</span>
                  <div>
                    <h3 className="font-display text-2xl font-semibold tracking-[-0.045em]">{title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#69645e]">{copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="counsel" className="px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="mx-auto grid max-w-[1450px] gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div className="relative">
            <div aria-hidden="true" className="absolute -left-5 -top-5 h-full w-full border border-[#252321]/14" />
            <img
              src="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Senior legal counsel"
              className="relative aspect-[4/5] w-full object-cover grayscale-[18%]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#252321]/90 to-transparent p-7 pt-28 text-white sm:p-9">
              <p className="font-display text-3xl font-semibold tracking-[-0.05em]">Alexandra Finch</p>
              <p className="mt-2 text-[0.54rem] font-black uppercase tracking-[0.18em] text-white/56">Managing partner · Commercial counsel</p>
            </div>
          </div>

          <div className="lg:pl-10 xl:pl-20">
            <p className="text-[0.58rem] font-black uppercase tracking-[0.24em] text-[#6c2f34]">Senior attention throughout</p>
            <blockquote className="mt-7 max-w-[11ch] font-display text-[clamp(3.5rem,6vw,7rem)] font-medium leading-[0.82] tracking-[-0.07em]">
              “Good counsel makes the difficult decision easier to see.”
            </blockquote>
            <p className="mt-8 max-w-xl text-base leading-8 text-[#625f59] sm:text-lg sm:leading-9">
              Alexandra advises business owners, executives, and private clients on matters where legal precision must be matched by practical judgment and discretion.
            </p>

            <div className="mt-10 grid gap-5 border-y border-[#252321]/15 py-7 sm:grid-cols-3">
              {[
                ["JD", "Osgoode Hall"],
                ["18+", "Years in practice"],
                ["Direct", "Partner access"]
              ].map(([value, label]) => (
                <div key={label}>
                  <strong className="font-display text-4xl font-semibold tracking-[-0.06em]">{value}</strong>
                  <p className="mt-2 text-[0.5rem] font-black uppercase tracking-[0.15em] text-[#77736c]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="insights" className="bg-[#252321] px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="mx-auto max-w-[1450px]">
          <div className="flex flex-col gap-8 border-b border-white/14 pb-9 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[0.58rem] font-black uppercase tracking-[0.24em] text-[#c59d67]">Selected insights</p>
              <h2 className="mt-5 max-w-[10ch] font-display text-[clamp(4rem,7vw,8rem)] font-medium leading-[0.78] tracking-[-0.075em]">
                Useful thinking before the issue becomes urgent.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-white/45">Short legal briefings written for decision-makers, not legal departments.</p>
          </div>

          <div className="border-t border-white/14">
            {insights.map((insight, index) => (
              <article key={insight.title} className="group grid gap-5 border-b border-white/14 py-8 sm:grid-cols-[4rem_0.32fr_1fr_auto] sm:items-center sm:py-10">
                <p className="text-[0.52rem] font-black tracking-[0.16em] text-white/28">0{index + 1}</p>
                <p className="text-[0.54rem] font-black uppercase tracking-[0.18em] text-[#c59d67]">{insight.category}</p>
                <h3 className="max-w-3xl font-display text-2xl font-medium tracking-[-0.045em] sm:text-3xl">{insight.title}</h3>
                <div className="flex items-center justify-between gap-6 sm:justify-end">
                  <span className="text-[0.5rem] font-black uppercase tracking-[0.16em] text-white/30">{insight.date}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="consultation" className="relative overflow-hidden bg-[#6c2f34] px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div aria-hidden="true" className="absolute -bottom-40 -right-28 h-[34rem] w-[34rem] rounded-full border-[90px] border-white/[0.045]" />
        <div className="mx-auto grid max-w-[1450px] gap-12 lg:grid-cols-[1fr_0.74fr] lg:items-start">
          <div>
            <p className="text-[0.58rem] font-black uppercase tracking-[0.24em] text-[#e0c39b]">A confidential first conversation</p>
            <h2 className="mt-7 max-w-[9ch] font-display text-[clamp(4.6rem,8vw,9.6rem)] font-medium leading-[0.75] tracking-[-0.08em]">
              Start with the decision in front of you.
            </h2>
            <p className="mt-8 max-w-xl text-base leading-8 text-white/64 sm:text-lg sm:leading-9">
              Share a brief outline of the matter. The firm will confirm whether it is the right fit and explain the next step.
            </p>
          </div>

          <form className="relative border border-white/26 bg-[#f3efe7] p-6 text-[#252321] shadow-[14px_14px_0_rgba(37,35,33,.55)] sm:p-8" onSubmit={(event) => event.preventDefault()}>
            <div className="flex items-start justify-between gap-5 border-b border-[#252321]/16 pb-5">
              <div>
                <p className="text-[0.52rem] font-black uppercase tracking-[0.2em] text-[#78736b]">Consultation request</p>
                <h3 className="mt-2 font-display text-3xl font-semibold tracking-[-0.05em]">Tell us what has changed.</h3>
              </div>
              <ShieldCheck className="mt-1 h-6 w-6 text-[#6c2f34]" />
            </div>

            <div className="mt-6 grid gap-5">
              <label className="grid gap-2">
                <span className="text-[0.52rem] font-black uppercase tracking-[0.17em] text-[#77736c]">Name</span>
                <input className="min-h-12 border-b border-[#252321]/28 bg-transparent px-0 text-base outline-none placeholder:text-[#252321]/28 focus:border-[#6c2f34]" placeholder="Full name" />
              </label>
              <label className="grid gap-2">
                <span className="text-[0.52rem] font-black uppercase tracking-[0.17em] text-[#77736c]">Email</span>
                <input type="email" className="min-h-12 border-b border-[#252321]/28 bg-transparent px-0 text-base outline-none placeholder:text-[#252321]/28 focus:border-[#6c2f34]" placeholder="you@email.com" />
              </label>
              <label className="grid gap-2">
                <span className="text-[0.52rem] font-black uppercase tracking-[0.17em] text-[#77736c]">Nature of matter</span>
                <select className="min-h-12 border-b border-[#252321]/28 bg-transparent px-0 text-base outline-none focus:border-[#6c2f34]" defaultValue="">
                  <option value="" disabled>Select a practice area</option>
                  <option>Business and commercial</option>
                  <option>Dispute resolution</option>
                  <option>Employment law</option>
                  <option>Private client</option>
                </select>
              </label>
              <label className="grid gap-2">
                <span className="text-[0.52rem] font-black uppercase tracking-[0.17em] text-[#77736c]">Brief outline</span>
                <textarea rows={3} className="resize-none border-b border-[#252321]/28 bg-transparent px-0 py-3 text-base outline-none placeholder:text-[#252321]/28 focus:border-[#6c2f34]" placeholder="A short, non-confidential summary" />
              </label>
            </div>

            <button type="submit" className="mt-7 flex min-h-12 w-full items-center justify-center gap-3 bg-[#252321] px-6 text-[0.62rem] font-black uppercase tracking-[0.2em] text-white transition hover:bg-[#6c2f34]">
              Request a conversation <ArrowRight className="h-4 w-4" />
            </button>
            <p className="mt-4 text-center text-[0.48rem] font-bold uppercase tracking-[0.13em] text-[#7c7770]">
              Submitting this form does not create a solicitor-client relationship.
            </p>
          </form>
        </div>
      </section>

      <footer className="bg-[#252321] px-5 py-10 text-white sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1450px] flex-col gap-8 border-t border-white/14 pt-8 md:flex-row md:items-end md:justify-between">
          <FirmMark />
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-[0.52rem] font-black uppercase tracking-[0.17em] text-white/38">
            <Link className="hover:text-[#c59d67]" href={startHref}>Use this design</Link>
            <Link className="hover:text-[#c59d67]" href="/landing-pages">Back to gallery</Link>
            <span>Demo concept · GridSpell Studio</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
