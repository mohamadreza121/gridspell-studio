"use client";

import Image from "next/image";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Clock,
  FileCheck2,
  Hammer,
  HardHat,
  Home,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  Upload,
  Users,
  Wrench
} from "lucide-react";

import { Container } from "@/components/ui/Container";

const services = [
  {
    icon: Home,
    title: "Attic & insulation",
    copy: "Air sealing, removal, replacement, and comfort upgrades for homes across the GTA.",
    response: "Estimate in 24 hours",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=84"
  },
  {
    icon: Hammer,
    title: "Renovation work",
    copy: "Framing, drywall, repairs, and finishing coordinated by one reliable local crew.",
    response: "Site visit available",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=84"
  },
  {
    icon: Building2,
    title: "Commercial projects",
    copy: "Professional support for offices, retail units, property managers, and build-out teams.",
    response: "Written scopes",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=84"
  },
  {
    icon: Wrench,
    title: "Home-service repairs",
    copy: "Small-to-mid-size jobs handled with clear scheduling, protection, cleanup, and updates.",
    response: "Fast scheduling",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=84"
  }
] as const;

const projects = [
  {
    title: "Attic comfort upgrade",
    location: "Vaughan, ON",
    service: "Insulation & air sealing",
    duration: "1 day",
    image:
      "https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=1400&q=86"
  },
  {
    title: "Main-floor renovation",
    location: "North York, ON",
    service: "Framing & drywall",
    duration: "8 days",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=84"
  },
  {
    title: "Retail unit refresh",
    location: "Toronto, ON",
    service: "Commercial build-out",
    duration: "12 days",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=84"
  },
  {
    title: "Basement repair package",
    location: "Etobicoke, ON",
    service: "Repair & finishing",
    duration: "4 days",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=84"
  }
] as const;

const process = [
  ["01", "Estimate requested", "Project type, address, photos, and contact details received."],
  ["02", "Site visit scheduled", "A crew lead confirms access, measurements, and the practical scope."],
  ["03", "Quote approved", "Written price, timeline, materials, and expectations are signed off."],
  ["04", "Crew assigned", "Protection, installation, updates, and cleanup are tracked in one job file."],
  ["05", "Final walkthrough", "Completed work, warranty notes, and next steps are reviewed together."]
] as const;

const reviews = [
  [
    "The estimate was clear, the crew protected every surface, and the final invoice matched the quote.",
    "MR",
    "Vaughan",
    "Attic insulation"
  ],
  [
    "They arrived when promised, explained the work, and left the house cleaner than they found it.",
    "JL",
    "North York",
    "Drywall repair"
  ],
  [
    "Professional from the first call to the walkthrough. We always knew what was happening next.",
    "SK",
    "Toronto",
    "Main-floor renovation"
  ],
  [
    "The site visit was practical, the scope was detailed, and the work was completed ahead of schedule.",
    "AP",
    "Etobicoke",
    "Commercial repair"
  ]
] as const;

const serviceAreas = [
  "Toronto",
  "North York",
  "Etobicoke",
  "Scarborough",
  "Vaughan",
  "Mississauga",
  "Richmond Hill",
  "Markham"
] as const;

const faqs = [
  [
    "How quickly will someone respond?",
    "Most requests are reviewed within one business day. Urgent projects can use the direct-call option for faster triage."
  ],
  [
    "Do I receive a written quote?",
    "Yes. The project scope, materials, expected timeline, pricing, and important exclusions are documented before scheduling."
  ],
  [
    "Can I upload project photos?",
    "Yes. A production version can accept photos and files directly in the estimate builder and attach them to the lead record."
  ],
  [
    "Is this page only for insulation companies?",
    "No. The system can be adapted for roofing, HVAC, plumbing, landscaping, drywall, renovation, electrical, and other local trades."
  ],
  [
    "Can leads go to email, SMS, or a CRM?",
    "Yes. Estimate submissions can trigger emails, text alerts, CRM records, dashboards, and automated follow-up workflows."
  ]
] as const;

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p
      className={`text-[0.62rem] font-black uppercase tracking-[0.3em] ${
        dark ? "text-[#d85428]" : "text-[#ff9a5c]"
      }`}
    >
      {children}
    </p>
  );
}

function EstimateBuilder({ startHref }: { startHref: string }) {
  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState("Attic & insulation");

  const steps = ["Service", "Project", "Contact"];

  return (
    <div className="field-document overflow-hidden rounded-[1.7rem] border border-[#d8dde5] bg-[#f8fafc] text-[#0d1b2a] shadow-[0_35px_100px_rgba(0,0,0,.34)]">
      <div className="border-b border-slate-200 bg-white px-5 py-5 sm:px-7">
        <div className="flex items-start justify-between gap-5">
          <div>
            <Eyebrow dark>Free project estimate</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-none tracking-[-0.055em] sm:text-4xl">
              Build your job brief.
            </h2>
          </div>
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#10243a] text-white">
            <ClipboardCheck className="h-6 w-6 text-[#ff8b4a]" />
          </span>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-2">
          {steps.map((label, index) => (
            <button
              key={label}
              type="button"
              onClick={() => setStep(index)}
              className={`rounded-xl border px-3 py-3 text-left transition ${
                step === index
                  ? "border-[#d85428] bg-[#fff1e8]"
                  : index < step
                    ? "border-emerald-200 bg-emerald-50"
                    : "border-slate-200 bg-slate-50"
              }`}
            >
              <span className="flex items-center gap-2 text-[0.55rem] font-black uppercase tracking-[0.16em] text-slate-500">
                {index < step ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : `0${index + 1}`}
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[26rem] p-5 sm:p-7">
        {step === 0 ? (
          <div>
            <p className="text-sm font-bold text-slate-500">What kind of work do you need?</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {services.map(({ icon: Icon, title }) => (
                <button
                  key={title}
                  type="button"
                  onClick={() => setSelectedService(title)}
                  className={`flex min-h-24 items-center gap-4 rounded-2xl border p-4 text-left transition ${
                    selectedService === title
                      ? "border-[#d85428] bg-[#fff1e8] shadow-[0_12px_30px_rgba(216,84,40,.12)]"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#10243a] text-[#ff8b4a]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-display text-xl font-semibold leading-tight tracking-[-0.04em]">
                    {title}
                  </span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="mt-5 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-2xl bg-[#d85428] px-5 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#e66537]"
            >
              Continue with {selectedService}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ) : null}

        {step === 1 ? (
          <div>
            <p className="text-sm font-bold text-slate-500">Add the practical job details.</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-[0.58rem] font-black uppercase tracking-[0.18em] text-slate-500">Project address</span>
                <input className="min-h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-[#d85428]" placeholder="Street, city or postal code" />
              </label>
              <label className="grid gap-2">
                <span className="text-[0.58rem] font-black uppercase tracking-[0.18em] text-slate-500">Preferred timing</span>
                <select className="min-h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-[#d85428]" defaultValue="Soon">
                  <option>Soon</option>
                  <option>This month</option>
                  <option>Planning ahead</option>
                  <option>Emergency</option>
                </select>
              </label>
            </div>
            <label className="mt-3 grid gap-2">
              <span className="text-[0.58rem] font-black uppercase tracking-[0.18em] text-slate-500">Project notes</span>
              <textarea className="min-h-28 resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#d85428]" placeholder="Describe the problem, access, measurements, or anything already inspected." />
            </label>
            <button type="button" className="mt-3 flex min-h-20 w-full items-center justify-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 text-sm font-bold text-slate-500 transition hover:border-[#d85428] hover:text-[#d85428]">
              <Upload className="h-5 w-5" />
              Add project photos
            </button>
            <div className="mt-5 grid grid-cols-[auto_1fr] gap-3">
              <button type="button" onClick={() => setStep(0)} className="min-h-13 rounded-2xl border border-slate-200 px-5 text-sm font-black text-slate-600">Back</button>
              <button type="button" onClick={() => setStep(2)} className="inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl bg-[#d85428] px-5 text-sm font-black text-white">
                Continue
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div>
            <p className="text-sm font-bold text-slate-500">Where should the written estimate go?</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                ["Name", "Your name"],
                ["Phone", "(416) 555-0100"],
                ["Email", "you@example.com"],
                ["Best time", "Morning or afternoon"]
              ].map(([label, placeholder]) => (
                <label key={label} className="grid gap-2">
                  <span className="text-[0.58rem] font-black uppercase tracking-[0.18em] text-slate-500">{label}</span>
                  <input className="min-h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-[#d85428]" placeholder={placeholder} />
                </label>
              ))}
            </div>
            <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
              <div className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                <p className="text-sm leading-6 text-emerald-900">
                  No obligation. A crew lead reviews the details before any visit is scheduled.
                </p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-[auto_1fr] gap-3">
              <button type="button" onClick={() => setStep(1)} className="min-h-13 rounded-2xl border border-slate-200 px-5 text-sm font-black text-slate-600">Back</button>
              <Link href={startHref} className="inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl bg-[#d85428] px-5 text-sm font-black text-white shadow-[0_18px_45px_rgba(216,84,40,.22)]">
                Request my estimate
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-slate-200 bg-slate-50 px-5 py-4 text-[0.62rem] font-bold text-slate-500 sm:px-7">
        <span>About 60 seconds</span>
        <span>Private · No obligation</span>
      </div>
    </div>
  );
}

function BeforeAfterSlider() {
  const [position, setPosition] = useState(54);

  return (
    <div className="overflow-hidden rounded-[1.9rem] border border-slate-200 bg-white p-3 shadow-[0_28px_90px_rgba(15,32,49,.12)] sm:p-4">
      <div className="relative aspect-[4/3] min-h-[27rem] overflow-hidden rounded-[1.45rem] bg-slate-900">
        <Image width={1600} height={1000} sizes="100vw" unoptimized
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1500&q=86"
          alt="Attic before insulation work"
          className="absolute inset-0 h-full w-full object-cover grayscale-[.45]"
        />
        <div className="absolute left-5 top-5 rounded-full bg-slate-950/72 px-4 py-2 text-[0.58rem] font-black uppercase tracking-[0.2em] text-white backdrop-blur">Before</div>

        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <Image width={1600} height={1000} sizes="100vw" unoptimized
            src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1500&q=88"
            alt="Finished home renovation after contractor work"
            className="h-full w-full object-cover"
          />
          <div className="absolute right-5 top-5 rounded-full bg-[#d85428] px-4 py-2 text-[0.58rem] font-black uppercase tracking-[0.2em] text-white">After</div>
        </div>

        <div className="pointer-events-none absolute inset-y-0 w-px bg-white shadow-[0_0_30px_rgba(0,0,0,.55)]" style={{ left: `${position}%` }}>
          <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-white bg-[#d85428] shadow-xl">
            <span className="h-4 w-4 rounded-full border-x-2 border-white" />
          </span>
        </div>

        <input
          type="range"
          min="10"
          max="90"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label="Compare before and after project images"
          className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
        />

        <div className="pointer-events-none absolute inset-x-4 bottom-4 grid gap-3 rounded-2xl border border-white/14 bg-[#0d1b2a]/78 p-4 text-white backdrop-blur sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <p className="font-display text-2xl font-semibold tracking-[-0.05em]">Attic comfort upgrade · Vaughan</p>
            <p className="mt-1 text-xs text-white/58">Air sealing · insulation replacement · one-day installation</p>
          </div>
          <span className="text-[0.56rem] font-black uppercase tracking-[0.2em] text-[#ff9a5c]">Drag to compare</span>
        </div>
      </div>
    </div>
  );
}

function ReviewCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  function move(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * Math.max(300, track.clientWidth * 0.78), behavior: "smooth" });
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="text-[0.58rem] font-black uppercase tracking-[0.24em] text-white/38">Verified local projects</p>
        <div className="flex gap-2">
          <button type="button" onClick={() => move(-1)} aria-label="Previous review" className="grid h-11 w-11 place-items-center rounded-full border border-white/12 bg-white/5 text-white transition hover:bg-white/10">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button type="button" onClick={() => move(1)} aria-label="Next review" className="grid h-11 w-11 place-items-center rounded-full bg-[#d85428] text-white transition hover:bg-[#e66537]">
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div ref={trackRef} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 pr-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {reviews.map(([quote, initials, city, service]) => (
          <article key={quote} className="flex min-h-[22rem] flex-[0_0_88%] snap-center flex-col justify-between rounded-[1.65rem] border border-white/10 bg-white/[0.045] p-6 sm:flex-basis-[58%] lg:flex-basis-[42%] xl:flex-basis-[34%]">
            <div>
              <div className="flex items-center justify-between gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-white text-sm font-black text-[#10243a]">{initials}</div>
                <span className="rounded-full border border-emerald-300/16 bg-emerald-300/8 px-3 py-1.5 text-[0.52rem] font-black uppercase tracking-[0.16em] text-emerald-200">Verified project</span>
              </div>
              <div className="mt-7 flex gap-1 text-[#ff8b4a]">
                {[1, 2, 3, 4, 5].map((star) => <Star key={star} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="mt-6 font-display text-[clamp(2rem,3vw,3rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-white">“{quote}”</p>
            </div>
            <div className="mt-8 border-t border-white/10 pt-5">
              <p className="font-bold text-white/76">{city}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/34">{service}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function AreaChecker() {
  const [postal, setPostal] = useState("");
  const [checked, setChecked] = useState(false);

  return (
    <div className="rounded-[1.8rem] border border-slate-200 bg-white p-5 shadow-[0_24px_75px_rgba(15,32,49,.1)] sm:p-7">
      <Eyebrow dark>Check crew availability</Eyebrow>
      <h3 className="mt-4 font-display text-4xl font-semibold leading-[0.9] tracking-[-0.06em] text-[#10243a]">Is your project in range?</h3>
      <p className="mt-4 text-sm leading-7 text-slate-600">Enter a GTA postal code to preview a local availability check.</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
        <input
          value={postal}
          onChange={(event) => {
            setPostal(event.target.value.toUpperCase());
            setChecked(false);
          }}
          placeholder="M5V 2T6"
          className="min-h-14 rounded-2xl border border-slate-200 bg-slate-50 px-5 font-mono text-sm font-semibold uppercase tracking-[0.14em] text-[#10243a] outline-none focus:border-[#d85428]"
        />
        <button type="button" onClick={() => setChecked(true)} className="min-h-14 rounded-2xl bg-[#10243a] px-6 text-sm font-black text-white transition hover:bg-[#183550]">Check availability</button>
      </div>
      {checked ? (
        <div className="mt-4 flex gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-950">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
          <div>
            <p className="font-bold">Your area is within the GTA service zone.</p>
            <p className="mt-1 text-sm text-emerald-800">A crew lead can confirm timing after reviewing the project details.</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function ContractorFieldBookExperience({ startHref }: { startHref: string }) {
  return (
    <main className="field-book-page overflow-x-clip bg-[#08131f] text-white">
      <style>{`
        .field-book-page {
          background-image:
            linear-gradient(rgba(255,255,255,.026) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.026) 1px, transparent 1px);
          background-size: 52px 52px;
        }

        .field-document {
          background-image:
            radial-gradient(circle at 90% 0%, rgba(216,84,40,.08), transparent 18rem),
            repeating-linear-gradient(0deg, rgba(15,32,49,.018) 0 1px, transparent 1px 5px);
        }

        .measurement-rule {
          background-image: repeating-linear-gradient(90deg, rgba(255,255,255,.24) 0 1px, transparent 1px 22px);
        }

        .project-photo img,
        .service-photo img {
          transition: transform .75s cubic-bezier(.2,.75,.2,1), filter .75s ease;
        }

        .project-photo:hover img,
        .service-photo:hover img {
          transform: scale(1.045);
          filter: saturate(1.06) contrast(1.03);
        }

        @media (prefers-reduced-motion: reduce) {
          .project-photo img,
          .service-photo img { transition: none !important; }
        }
      `}</style>

      <section className="relative min-h-svh overflow-hidden pb-20 pt-[6.8rem] sm:pt-[7.5rem] lg:pb-28 lg:pt-[8.2rem]">
        <div aria-hidden="true" className="absolute -right-56 top-20 h-[40rem] w-[40rem] rounded-full bg-[#d85428]/20 blur-[150px]" />
        <div aria-hidden="true" className="absolute -left-48 bottom-0 h-[32rem] w-[32rem] rounded-full bg-[#3b82f6]/10 blur-[140px]" />

        <Container className="relative">
          <div className="mb-4 hidden items-center justify-between border-y border-white/10 py-3 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-white/42 lg:flex">
            <span>TrueNorth Field Book · GTA crew 04</span>
            <span>Licensed & insured · Written estimates · Mon–Sat</span>
            <a href="tel:+14165550100" className="text-[#ff9a5c]">(416) 555-0100</a>
          </div>

          <nav className="flex items-center justify-between rounded-[1.35rem] border border-white/10 bg-[#0b1c2d]/82 px-4 py-3 shadow-[0_22px_80px_rgba(0,0,0,.28)] backdrop-blur-xl sm:px-5">
            <Link href="/landing-pages" className="flex items-center gap-3 font-black">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#d85428] text-white"><HardHat className="h-5 w-5" /></span>
              <span className="hidden sm:inline">TrueNorth Contracting</span>
            </Link>
            <div className="hidden gap-6 text-sm font-semibold text-white/50 lg:flex">
              <a href="#proof" className="hover:text-white">Proof</a>
              <a href="#services" className="hover:text-white">Services</a>
              <a href="#projects" className="hover:text-white">Projects</a>
              <a href="#process" className="hover:text-white">Process</a>
              <a href="#areas" className="hover:text-white">Areas</a>
            </div>
            <Link href={startHref} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-4 text-sm font-black text-[#10243a] sm:px-5">Get estimate <ArrowUpRight className="h-4 w-4" /></Link>
          </nav>

          <div className="grid items-center gap-12 py-14 lg:grid-cols-[0.86fr_1.14fr] lg:py-20">
            <div>
              <Link href="/landing-pages" className="inline-flex items-center gap-2 text-[0.62rem] font-black uppercase tracking-[0.24em] text-white/35 transition hover:text-[#ff9a5c]"><ArrowLeft className="h-4 w-4" /> Landing page gallery</Link>
              <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#ff8b4a]/24 bg-[#ff8b4a]/10 px-4 py-2 text-[0.6rem] font-black uppercase tracking-[0.22em] text-[#ffb07b]"><ShieldCheck className="h-4 w-4" /> Field-tested contractor system</div>
              <h1 className="mt-7 max-w-[9.5ch] font-display text-[clamp(4.5rem,9vw,9.6rem)] font-semibold leading-[0.74] tracking-[-0.09em]">Work you can see. Estimates you can trust.</h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/54 sm:text-xl sm:leading-9">A premium local contractor page built like an active project file—real work, written proof, clear next steps, and one frictionless path to a site visit.</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#estimate" className="inline-flex min-h-14 items-center gap-2 rounded-full bg-[#d85428] px-7 text-sm font-black text-white shadow-[0_20px_55px_rgba(216,84,40,.28)]">Build my estimate <ArrowRight className="h-4 w-4" /></a>
                <a href="tel:+14165550100" className="inline-flex min-h-14 items-center gap-2 rounded-full border border-white/12 bg-white/5 px-7 text-sm font-black text-white/76"><Phone className="h-4 w-4" /> Call crew lead</a>
              </div>
              <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[["20+", "years experience"], ["4.9", "homeowner rating"], ["24h", "quote response"], ["GTA", "local coverage"]].map(([value, label]) => (
                  <div key={label} className="border-l border-white/12 pl-4"><p className="font-display text-3xl font-semibold tracking-[-0.06em]">{value}</p><p className="mt-1 text-xs leading-5 text-white/38">{label}</p></div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="project-photo relative min-h-[38rem] overflow-hidden rounded-[2rem] border border-white/10 bg-[#10243a] shadow-[0_36px_120px_rgba(0,0,0,.45)]">
                <Image width={1600} height={1000} sizes="100vw" unoptimized src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1800&q=88" alt="TrueNorth contractor crew on an active project" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,19,31,.95),transparent_65%),linear-gradient(120deg,rgba(8,19,31,.28),transparent_52%)]" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-[0.58rem] font-black uppercase tracking-[0.24em] text-[#ff9a5c]">Active project · TN-2408</p>
                      <p className="mt-3 font-display text-4xl font-semibold tracking-[-0.06em]">North York attic upgrade</p>
                    </div>
                    <span className="rounded-full border border-emerald-300/18 bg-emerald-300/10 px-4 py-2 text-[0.58rem] font-black uppercase tracking-[0.18em] text-emerald-200">Crew scheduled</span>
                  </div>
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {[[Clock, "Duration", "1 day"], [Users, "Crew", "3 trades"], [FileCheck2, "Status", "Approved"]].map(([Icon, label, value]) => (
                      <div key={label as string} className="rounded-xl border border-white/12 bg-black/26 p-4 backdrop-blur"><Icon className="h-4 w-4 text-[#ff9a5c]" /><p className="mt-3 text-[0.5rem] font-black uppercase tracking-[0.18em] text-white/35">{label as string}</p><p className="mt-1 font-bold text-white/78">{value as string}</p></div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="measurement-rule absolute -bottom-5 left-8 right-8 h-9 border-y border-white/10 bg-[#0b1c2d] opacity-90" />
            </div>
          </div>

          <div id="estimate" className="mx-auto max-w-5xl lg:-mb-36">
            <EstimateBuilder startHref={startHref} />
          </div>
        </Container>
      </section>

      <section className="border-y border-white/8 bg-[#10243a] pb-12 pt-16 lg:pb-20 lg:pt-52">
        <Container>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {["Licensed & insured", "Written scopes", "Protected job sites", "Warranty documentation"].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.035] p-4"><CheckCircle2 className="h-5 w-5 shrink-0 text-[#ff8b4a]" /><p className="text-sm font-bold text-white/64">{item}</p></div>
            ))}
          </div>
        </Container>
      </section>

      <section id="proof" className="bg-[#edf1f5] py-24 text-[#10243a] sm:py-32">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div><Eyebrow dark>Featured transformation</Eyebrow><h2 className="mt-5 max-w-[9ch] font-display text-[clamp(3.8rem,7vw,7.4rem)] font-semibold leading-[0.78] tracking-[-0.085em]">Proof before promises.</h2></div>
            <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">Show the problem, the installation, and the finished result in one interaction. Visitors understand the value before they ever reach the quote form.</p>
          </div>
          <div className="mt-12"><BeforeAfterSlider /></div>
        </Container>
      </section>

      <section id="services" className="py-24 sm:py-32">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div><Eyebrow>Services</Eyebrow><h2 className="mt-5 max-w-[9ch] font-display text-[clamp(3.8rem,7vw,7.2rem)] font-semibold leading-[0.78] tracking-[-0.085em]">Built around the work people hire.</h2></div>
            <p className="max-w-2xl text-base leading-8 text-white/48 sm:text-lg">Each service is presented with real project context, response expectations, and a direct route into the estimate builder.</p>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {services.map(({ icon: Icon, title, copy, response, image }, index) => (
              <article key={title} className={`service-photo group relative min-h-[28rem] overflow-hidden rounded-[1.8rem] border border-white/10 ${index === 0 ? "lg:row-span-2 lg:min-h-[58rem]" : ""}`}>
                <Image width={1600} height={1000} sizes="100vw" unoptimized src={image} alt={`${title} contractor project`} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,19,31,.98),rgba(8,19,31,.18)_72%)]" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <div className="flex items-center justify-between gap-4"><span className="grid h-12 w-12 place-items-center rounded-xl bg-[#d85428] text-white"><Icon className="h-6 w-6" /></span><ArrowUpRight className="h-5 w-5 text-white/34 transition group-hover:text-[#ff9a5c]" /></div>
                  <h3 className="mt-7 font-display text-4xl font-semibold leading-none tracking-[-0.06em]">{title}</h3>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-white/58">{copy}</p>
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/12 pt-5"><span className="text-[0.58rem] font-black uppercase tracking-[0.2em] text-[#ff9a5c]">{response}</span><a href="#estimate" className="text-sm font-black text-white">Get service estimate</a></div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="projects" className="bg-[#edf1f5] py-24 text-[#10243a] sm:py-32">
        <Container>
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div><Eyebrow dark>Recent work</Eyebrow><h2 className="mt-5 max-w-[10ch] font-display text-[clamp(3.8rem,7vw,7.2rem)] font-semibold leading-[0.78] tracking-[-0.085em]">A job board worth checking.</h2></div>
            <p className="max-w-xl text-base leading-8 text-slate-600">Location, service, duration, and the finished result—organized like project records instead of generic portfolio tiles.</p>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {projects.map((project, index) => (
              <article key={project.title} className={`project-photo group overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white p-3 shadow-[0_22px_70px_rgba(15,32,49,.08)] ${index === 0 ? "lg:col-span-2" : ""}`}>
                <div className={`relative overflow-hidden rounded-[1.4rem] ${index === 0 ? "min-h-[34rem]" : "min-h-[26rem]"}`}>
                  <Image width={1600} height={1000} sizes="100vw" unoptimized src={project.image} alt={project.title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,19,31,.92),transparent_62%)]" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8"><p className="text-[0.58rem] font-black uppercase tracking-[0.22em] text-[#ff9a5c]">Completed project {String(index + 1).padStart(2, "0")}</p><h3 className="mt-4 font-display text-4xl font-semibold tracking-[-0.06em] sm:text-5xl">{project.title}</h3><div className="mt-5 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/64"><span>{project.location}</span><span>{project.service}</span><span>{project.duration}</span></div></div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="process" className="py-24 sm:py-32">
        <Container>
          <div className="mx-auto max-w-4xl text-center"><Eyebrow>Project workflow</Eyebrow><h2 className="mt-5 font-display text-[clamp(3.8rem,7vw,7.2rem)] font-semibold leading-[0.8] tracking-[-0.085em]">Every job has a visible next step.</h2><p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/48">The process reads like an active work order, reinforcing organization from first contact through final walkthrough.</p></div>
          <div className="relative mt-14 grid gap-4 lg:grid-cols-5">
            <div aria-hidden="true" className="absolute left-[10%] right-[10%] top-7 hidden h-px bg-gradient-to-r from-[#d85428] via-white/18 to-[#d85428] lg:block" />
            {process.map(([step, title, copy], index) => (
              <article key={step} className="relative rounded-[1.5rem] border border-white/9 bg-white/[0.035] p-5"><span className={`relative z-10 grid h-14 w-14 place-items-center rounded-full border-4 border-[#08131f] font-mono text-xs font-black ${index < 3 ? "bg-[#d85428] text-white" : "bg-[#10243a] text-white/48"}`}>{step}</span><p className="mt-6 text-[0.54rem] font-black uppercase tracking-[0.18em] text-white/28">{index < 3 ? "Complete" : "Upcoming"}</p><h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.05em]">{title}</h3><p className="mt-4 text-sm leading-7 text-white/42">{copy}</p></article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-white/8 bg-[#10243a] py-24 sm:py-32">
        <Container>
          <div className="grid gap-10 xl:grid-cols-[0.65fr_1.35fr] xl:items-start">
            <div><Eyebrow>Homeowner reviews</Eyebrow><h2 className="mt-5 max-w-[9ch] font-display text-[clamp(3.8rem,7vw,7rem)] font-semibold leading-[0.8] tracking-[-0.085em]">Proof that sounds local.</h2><p className="mt-6 max-w-md text-base leading-8 text-white/44">Each review connects the comment to a city and completed service instead of presenting anonymous praise.</p></div>
            <ReviewCarousel />
          </div>
        </Container>
      </section>

      <section id="areas" className="bg-[#edf1f5] py-24 text-[#10243a] sm:py-32">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="relative min-h-[38rem] overflow-hidden rounded-[1.9rem] border border-slate-200 bg-[#10243a] p-6 text-white shadow-[0_26px_85px_rgba(15,32,49,.14)] sm:p-8">
              <div aria-hidden="true" className="absolute inset-0 opacity-30 bg-[linear-gradient(rgba(255,255,255,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.09)_1px,transparent_1px)] bg-[size:38px_38px]" />
              <div aria-hidden="true" className="absolute left-[18%] top-[16%] h-72 w-72 rounded-full border border-[#ff8b4a]/28" />
              <div aria-hidden="true" className="absolute left-[27%] top-[25%] h-48 w-48 rounded-full border border-[#ff8b4a]/28" />
              <div aria-hidden="true" className="absolute left-[37%] top-[35%] h-24 w-24 rounded-full border border-[#ff8b4a]/34 bg-[#ff8b4a]/5" />
              <div aria-hidden="true" className="absolute left-[48%] top-[47%] h-4 w-4 rounded-full bg-[#ff8b4a] shadow-[0_0_0_12px_rgba(255,139,74,.12),0_0_55px_rgba(255,139,74,.72)]" />
              {serviceAreas.slice(0, 6).map((area, index) => (
                <span key={area} className="absolute rounded-full border border-white/12 bg-[#08131f]/72 px-3 py-2 text-xs font-bold text-white/72 backdrop-blur" style={{ left: `${10 + (index % 3) * 27}%`, top: `${16 + Math.floor(index / 3) * 42 + (index % 2) * 8}%` }}><span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#ff8b4a]" />{area}</span>
              ))}
              <div className="absolute inset-x-5 bottom-5 rounded-[1.4rem] border border-white/12 bg-[#08131f]/82 p-5 backdrop-blur"><div className="flex items-center justify-between gap-4"><div><p className="text-[0.56rem] font-black uppercase tracking-[0.22em] text-[#ff9a5c]">Primary service radius</p><p className="mt-2 font-display text-4xl font-semibold tracking-[-0.06em]">Toronto + GTA</p></div><MapPin className="h-7 w-7 text-[#ff8b4a]" /></div></div>
            </div>
            <div>
              <Eyebrow dark>Local confidence</Eyebrow>
              <h2 className="mt-5 max-w-[10ch] font-display text-[clamp(3.8rem,7vw,7rem)] font-semibold leading-[0.8] tracking-[-0.085em]">Confirm the crew can reach you.</h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-slate-600">Local visitors should not have to guess whether their home or property is in range. Give them an immediate, useful answer.</p>
              <div className="mt-8"><AreaChecker /></div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <div><Eyebrow>Common questions</Eyebrow><h2 className="mt-5 max-w-[9ch] font-display text-[clamp(3.8rem,7vw,7rem)] font-semibold leading-[0.8] tracking-[-0.085em]">Answer the objections before the call.</h2></div>
            <div className="grid gap-3">
              {faqs.map(([question, answer], index) => (
                <details key={question} className="group rounded-[1.35rem] border border-white/9 bg-white/[0.035] p-5 open:bg-white/[0.055]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5"><span className="flex items-center gap-4"><span className="font-mono text-[0.56rem] tracking-[0.18em] text-[#ff9a5c]">0{index + 1}</span><span className="font-display text-2xl font-semibold tracking-[-0.045em]">{question}</span></span><ChevronDown className="h-5 w-5 shrink-0 text-white/36 transition group-open:rotate-180" /></summary>
                  <p className="mt-5 border-t border-white/9 pt-5 text-sm leading-7 text-white/48">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#edf1f5] py-24 text-[#10243a] sm:py-32">
        <Container>
          <div className="field-document overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_35px_110px_rgba(15,32,49,.14)]">
            <div className="grid lg:grid-cols-[0.76fr_1.24fr]">
              <div className="bg-[#10243a] p-7 text-white sm:p-10 lg:p-12">
                <div className="flex items-center justify-between gap-4"><span className="grid h-12 w-12 place-items-center rounded-xl bg-[#d85428]"><FileCheck2 className="h-6 w-6" /></span><span className="rounded-full border border-emerald-300/16 bg-emerald-300/8 px-4 py-2 text-[0.54rem] font-black uppercase tracking-[0.18em] text-emerald-200">Ready to prepare</span></div>
                <Eyebrow>Written estimate</Eyebrow>
                <h2 className="mt-5 font-display text-[clamp(3.8rem,6vw,6.7rem)] font-semibold leading-[0.78] tracking-[-0.085em]">Your next project deserves a clear first step.</h2>
                <p className="mt-6 max-w-xl text-base leading-8 text-white/54">Start with this contractor direction and turn local traffic into organized, qualified estimate requests.</p>
              </div>
              <div className="p-7 sm:p-10 lg:p-12">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-6"><div><p className="text-[0.56rem] font-black uppercase tracking-[0.22em] text-slate-500">TrueNorth Contracting</p><p className="mt-2 font-display text-3xl font-semibold tracking-[-0.055em]">Project estimate</p></div><span className="font-mono text-sm text-slate-400">TN-EST-001</span></div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[["Service", "Your next project"], ["Site visit", "Free consultation"], ["Response", "Within 24 hours"], ["Status", "Ready to schedule"]].map(([label, value]) => (
                    <div key={label} className="rounded-xl border border-slate-200 bg-slate-50 p-4"><p className="text-[0.52rem] font-black uppercase tracking-[0.18em] text-slate-500">{label}</p><p className="mt-2 font-display text-2xl font-semibold tracking-[-0.04em]">{value}</p></div>
                  ))}
                </div>
                <div className="mt-7 flex flex-wrap gap-3"><Link href={startHref} className="inline-flex min-h-14 items-center gap-2 rounded-full bg-[#d85428] px-7 text-sm font-black text-white">Start my estimate <ArrowUpRight className="h-4 w-4" /></Link><a href="tel:+14165550100" className="inline-flex min-h-14 items-center gap-2 rounded-full border border-slate-200 px-7 text-sm font-black text-[#10243a]"><Phone className="h-4 w-4" /> Call now</a></div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <footer className="border-t border-white/8 bg-[#050c14] pb-24 pt-14 lg:pb-14">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"><div><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-[#d85428]"><HardHat className="h-5 w-5" /></span><p className="font-display text-3xl font-semibold tracking-[-0.05em]">TrueNorth Contracting</p></div><p className="mt-4 max-w-xl text-sm leading-7 text-white/38">A GridSpell contractor landing-page concept built around visible workmanship, local proof, and organized estimate conversion.</p></div><div className="flex flex-wrap gap-3 text-sm font-semibold text-white/48"><a href="#services">Services</a><a href="#projects">Projects</a><a href="#areas">Service area</a><a href="tel:+14165550100">(416) 555-0100</a></div></div>
        </Container>
      </footer>

      <div className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-2 gap-2 rounded-[1.35rem] border border-white/10 bg-[#08131f]/92 p-2 shadow-[0_20px_70px_rgba(0,0,0,.46)] backdrop-blur-xl lg:hidden">
        <a href="tel:+14165550100" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white/7 text-sm font-black"><Phone className="h-4 w-4" /> Call</a>
        <a href="#estimate" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#d85428] text-sm font-black">Estimate <ArrowUpRight className="h-4 w-4" /></a>
      </div>
    </main>
  );
}
