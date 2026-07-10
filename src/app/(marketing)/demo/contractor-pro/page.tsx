import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Hammer,
  HardHat,
  Home,
  MapPin,
  Phone,
  Ruler,
  ShieldCheck,
  Sparkles,
  Star,
  Wrench
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { getLandingPageConcept } from "@/config/landing-pages";
import { createPageMetadata } from "@/lib/metadata";

const concept = getLandingPageConcept("contractor-pro");

export const metadata: Metadata = createPageMetadata({
  title: "Contractor Pro Landing Page Demo",
  description:
    "A premium contractor landing page demo for local service businesses that need estimate requests, trust proof, and service-area conversion.",
  path: "/demo/contractor-pro"
});

const services = [
  {
    icon: Home,
    title: "Attic & insulation",
    copy: "Air sealing, insulation upgrades, and comfort-focused improvements for homes and light commercial spaces."
  },
  {
    icon: Hammer,
    title: "Renovation work",
    copy: "Clean framing, drywall, repair, and finishing support for projects that need a reliable local crew."
  },
  {
    icon: Wrench,
    title: "Home service repairs",
    copy: "Small-to-mid-size contractor jobs with clear scope, written estimates, and fast scheduling."
  },
  {
    icon: Building2,
    title: "Commercial projects",
    copy: "Professional project support for offices, retail units, property managers, and build-out teams."
  },
  {
    icon: Ruler,
    title: "Site inspection",
    copy: "On-site review, measurements, photos, and practical recommendations before any work begins."
  },
  {
    icon: ShieldCheck,
    title: "Warranty-backed work",
    copy: "A contractor page built around trust, expectations, documentation, and post-project confidence."
  }
] as const;

const proof = [
  ["20+", "years of combined trade experience"],
  ["4.9/5", "average homeowner rating"],
  ["24h", "typical estimate response time"],
  ["GTA", "Toronto and surrounding service area"]
] as const;

const process = [
  ["01", "Request estimate", "Send the service, address, and project notes through the quote form."],
  ["02", "Site review", "A crew lead checks the job details, measurements, and access requirements."],
  ["03", "Clear written quote", "You get a simple scope, timeline, and price before work is scheduled."],
  ["04", "Clean installation", "The crew completes the job with protection, cleanup, and progress updates."],
  ["05", "Final walkthrough", "The finished work is reviewed so expectations and next steps are clear."]
] as const;

const reviews = [
  ["Fast estimate, clean work, and no surprises on the final price.", "North York homeowner"],
  ["The crew explained everything clearly and treated the house with respect.", "Vaughan property owner"],
  ["Professional from first call to final walkthrough. Exactly what we needed.", "Toronto homeowner"],
  ["The page made it easy to understand services, areas, and how to request work.", "Service business owner"]
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
  ["How fast can I get an estimate?", "Most estimate requests are reviewed within one business day. Urgent jobs can use the call button."],
  ["Is this layout only for insulation companies?", "No. This contractor landing page can be adapted for roofing, HVAC, plumbing, renovation, landscaping, drywall, and other service businesses."],
  ["Can the form send leads to email or a dashboard?", "Yes. The same layout can be connected to email notifications, CRM tools, SMS alerts, or an admin dashboard."],
  ["Does this work for Google Ads?", "Yes. The page is structured for clear CTAs, trust proof, service relevance, reviews, and local conversion."],
  ["Can every section be customized?", "Yes. Services, location, reviews, form fields, brand colors, images, and proof sections can all be changed." ]
] as const;

function startHref() {
  const params = new URLSearchParams({
    package: "landing-page",
    source: "contractor-pro",
    design: concept?.title ?? "Contractor Pro"
  });

  return `/start-project?${params.toString()}`;
}

function EstimateFormCard() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-3 shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur-xl">
      <div className="rounded-[1.55rem] border border-white/10 bg-[#f8fafc] p-5 text-[#0f172a] sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#ea580c]">Free estimate</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-none tracking-[-0.055em] sm:text-4xl">
              Tell us about the job.
            </h2>
          </div>
          <div className="rounded-2xl bg-[#0f172a] p-3 text-white">
            <ClipboardCheck className="h-6 w-6 text-[#fb923c]" />
          </div>
        </div>

        <div className="mt-6 grid gap-3">
          {[
            ["Name", "Your name"],
            ["Phone", "(416) 555-0100"],
            ["Service", "Insulation, renovation, repair..."],
            ["Address", "City or project address"]
          ].map(([label, placeholder]) => (
            <label key={label} className="grid gap-2">
              <span className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-slate-500">{label}</span>
              <input
                placeholder={placeholder}
                className="min-h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#ea580c]"
              />
            </label>
          ))}

          <label className="grid gap-2">
            <span className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-slate-500">Project notes</span>
            <textarea
              placeholder="Tell us what needs to be done."
              rows={3}
              className="resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#ea580c]"
            />
          </label>
        </div>

        <Link
          href={startHref()}
          className="mt-5 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-2xl bg-[#ea580c] px-5 text-sm font-black text-white shadow-[0_18px_45px_rgba(234,88,12,0.28)] transition hover:-translate-y-0.5 hover:bg-[#f97316]"
        >
          Request free estimate
          <ArrowUpRight className="h-4 w-4" />
        </Link>

        <p className="mt-4 text-center text-xs font-semibold leading-6 text-slate-500">
          Demo form only. In a real build, this can send to email, CRM, SMS, or dashboard.
        </p>
      </div>
    </div>
  );
}

function BlueprintMapCard() {
  return (
    <div className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.055] p-4 backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[0.6rem] font-bold uppercase tracking-[0.24em] text-white/35">Service area</p>
          <p className="mt-2 font-display text-2xl font-semibold tracking-[-0.05em] text-white">Toronto + GTA</p>
        </div>
        <MapPin className="h-6 w-6 text-[#fb923c]" />
      </div>

      <div className="relative mt-5 h-44 overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#07111f]">
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:28px_28px]" />
        <div aria-hidden="true" className="absolute left-[18%] top-[26%] h-3 w-3 rounded-full bg-[#fb923c] shadow-[0_0_35px_rgba(251,146,60,0.85)]" />
        <div aria-hidden="true" className="absolute left-[48%] top-[42%] h-4 w-4 rounded-full bg-[#38bdf8] shadow-[0_0_45px_rgba(56,189,248,0.75)]" />
        <div aria-hidden="true" className="absolute right-[20%] top-[31%] h-3 w-3 rounded-full bg-[#fb923c] shadow-[0_0_35px_rgba(251,146,60,0.85)]" />
        <div aria-hidden="true" className="absolute bottom-[20%] left-[37%] h-3 w-3 rounded-full bg-white shadow-[0_0_35px_rgba(255,255,255,0.65)]" />
        <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur">
          <p className="text-xs font-semibold text-white/62">Local crew routing · estimate zones · map-ready section</p>
        </div>
      </div>
    </div>
  );
}

function JobTicketCard() {
  return (
    <div className="rounded-[1.6rem] border border-[#fb923c]/20 bg-[#fb923c]/10 p-4 text-white backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[0.6rem] font-bold uppercase tracking-[0.24em] text-orange-200">Job ticket</p>
        <span className="rounded-full bg-[#fb923c] px-3 py-1 text-xs font-black text-[#111827]">Ready</span>
      </div>
      <div className="mt-5 grid gap-3 text-sm">
        {[
          ["Service", "Attic insulation"],
          ["Location", "North York"],
          ["Crew", "Available this week"]
        ].map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 last:border-0 last:pb-0">
            <span className="text-white/38">{label}</span>
            <span className="font-semibold text-white/78">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ContractorProDemoPage() {
  return (
    <main className="overflow-hidden bg-[#07111f] text-white">
      <section className="relative min-h-svh overflow-hidden border-b border-white/[0.08] pt-5">
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.032)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.032)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div aria-hidden="true" className="absolute -right-48 top-10 h-[42rem] w-[42rem] rounded-full bg-[#ea580c]/20 blur-[150px]" />
        <div aria-hidden="true" className="absolute -left-52 bottom-0 h-[36rem] w-[36rem] rounded-full bg-[#38bdf8]/10 blur-[150px]" />

        <Container className="relative">
          <div className="hidden items-center justify-between rounded-full border border-white/10 bg-white/[0.045] px-5 py-2 text-xs font-semibold text-white/45 backdrop-blur lg:flex">
            <p>Serving Toronto & GTA</p>
            <p>Free estimates · Licensed & insured · Mon–Sat 8am–6pm</p>
            <a href="tel:+14165550100" className="inline-flex items-center gap-2 text-orange-200 transition hover:text-white">
              <Phone className="h-3.5 w-3.5" />
              (416) 555-0100
            </a>
          </div>

          <nav className="mt-3 flex items-center justify-between rounded-full border border-white/[0.12] bg-[#07111f]/72 px-4 py-3 shadow-[0_18px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl md:px-5">
            <Link href="/landing-pages" className="inline-flex items-center gap-3 text-sm font-black text-white transition hover:text-orange-200">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-[#07111f]">
                <HardHat className="h-5 w-5 text-[#ea580c]" />
              </span>
              <span className="hidden sm:inline">TrueNorth</span>
            </Link>

            <div className="hidden items-center gap-6 text-sm font-semibold text-white/48 lg:flex">
              <a href="#services" className="transition hover:text-white">Services</a>
              <a href="#process" className="transition hover:text-white">Process</a>
              <a href="#reviews" className="transition hover:text-white">Reviews</a>
              <a href="#areas" className="transition hover:text-white">Areas</a>
              <a href="#faq" className="transition hover:text-white">FAQ</a>
            </div>

            <div className="flex items-center gap-2">
              <a href="tel:+14165550100" className="hidden min-h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 text-sm font-bold text-white/75 transition hover:bg-white/[0.08] hover:text-white sm:inline-flex">
                <Phone className="h-4 w-4" />
                Call
              </a>
              <Link href={startHref()} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#ea580c] px-5 text-sm font-black text-white shadow-[0_16px_50px_rgba(234,88,12,0.32)] transition hover:-translate-y-0.5 hover:bg-[#f97316]">
                Get estimate
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </nav>

          <div className="grid min-h-[calc(100svh-8rem)] items-center gap-12 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:py-20">
            <div>
              <Link href="/landing-pages" className="mb-8 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-white/36 transition hover:text-orange-200">
                <ArrowLeft className="h-4 w-4" />
                Landing page gallery
              </Link>

              <p className="inline-flex items-center gap-2 rounded-full border border-[#fb923c]/25 bg-[#fb923c]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-orange-200">
                <ShieldCheck className="h-4 w-4" />
                Contractor landing page demo
              </p>

              <h1 className="mt-7 max-w-[10ch] font-display text-[clamp(4.2rem,9vw,9.2rem)] font-semibold leading-[0.76] tracking-[-0.085em]">
                Reliable work. Clear estimates.
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/52 sm:text-xl sm:leading-9">
                A premium local contractor page built to convert homeowners into quote requests with trust proof, service clarity, reviews, and a frictionless estimate path.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link href={startHref()} className="inline-flex min-h-13 items-center gap-2 rounded-full bg-white px-6 text-sm font-black text-[#07111f] shadow-[0_18px_60px_rgba(255,255,255,0.14)] transition hover:-translate-y-0.5">
                  Start with this design
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <a href="tel:+14165550100" className="inline-flex min-h-13 items-center gap-2 rounded-full border border-[#fb923c]/22 bg-[#fb923c]/10 px-6 text-sm font-black text-orange-200 transition hover:border-[#fb923c]/40 hover:bg-[#fb923c]/15 hover:text-white">
                  <Phone className="h-4 w-4" />
                  Call now
                </a>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {proof.map(([value, label]) => (
                  <div key={label} className="rounded-2xl border border-white/[0.09] bg-white/[0.045] p-4 backdrop-blur">
                    <p className="font-display text-3xl font-semibold tracking-[-0.06em] text-white">{value}</p>
                    <p className="mt-2 text-xs font-semibold leading-5 text-white/42">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1fr_0.72fr] lg:items-start">
              <div className="lg:row-span-2">
                <EstimateFormCard />
              </div>
              <JobTicketCard />
              <BlueprintMapCard />
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-white/[0.08] bg-[#0b1627] py-8">
        <Container>
          <div className="grid gap-3 md:grid-cols-4">
            {["Licensed & insured", "Written estimates", "Clean job sites", "Warranty-backed work"].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-[#fb923c]" />
                <p className="text-sm font-bold text-white/64">{item}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="services" className="relative py-24 sm:py-32">
        <Container>
          <div className="grid gap-8 xl:grid-cols-[0.72fr_1.28fr] xl:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-orange-200">Services</p>
              <h2 className="mt-5 max-w-[10ch] font-display text-[clamp(3rem,6vw,6.4rem)] font-semibold leading-[0.84] tracking-[-0.075em]">
                Built for trades that need leads.
              </h2>
            </div>
            <p className="max-w-3xl text-base leading-8 text-white/46 sm:text-lg">
              This structure can be adapted to nearly any contractor business. Each service card can become a dedicated section, SEO page, or quote-form option.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map(({ icon: Icon, title, copy }) => (
              <article key={title} className="group rounded-[1.8rem] border border-white/[0.09] bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-[#fb923c]/24 hover:bg-white/[0.055]">
                <div className="flex items-center justify-between gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#fb923c]/12 text-orange-200">
                    <Icon className="h-6 w-6" />
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-white/20 transition group-hover:text-orange-200" />
                </div>
                <h3 className="mt-7 font-display text-3xl font-semibold leading-none tracking-[-0.055em]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/45">{copy}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative border-y border-white/[0.08] bg-[#f8fafc] py-24 text-[#0f172a] sm:py-32">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#ea580c]">Before / after</p>
            <h2 className="mt-5 max-w-[11ch] font-display text-[clamp(3rem,6vw,6rem)] font-semibold leading-[0.86] tracking-[-0.075em]">
              Show the transformation clearly.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600">
              Contractors win trust when visitors can quickly understand the problem, the fix, and the finished result. This section can become a real before/after slider later.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_24px_90px_rgba(15,23,42,0.08)]">
              <div className="h-72 rounded-[1.5rem] bg-[linear-gradient(135deg,#475569,#0f172a)] p-5 text-white">
                <p className="rounded-full bg-black/35 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-white/65">Before</p>
                <p className="mt-40 font-display text-4xl font-semibold leading-none tracking-[-0.06em]">Drafty, unclear, unfinished.</p>
              </div>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_24px_90px_rgba(15,23,42,0.08)]">
              <div className="h-72 rounded-[1.5rem] bg-[radial-gradient(circle_at_65%_25%,rgba(251,146,60,0.9),transparent_8rem),linear-gradient(135deg,#0f172a,#07111f)] p-5 text-white">
                <p className="rounded-full bg-[#fb923c] px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-[#111827]">After</p>
                <p className="mt-40 font-display text-4xl font-semibold leading-none tracking-[-0.06em]">Clean, sealed, finished.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="process" className="py-24 sm:py-32">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-orange-200">Process</p>
            <h2 className="mt-5 font-display text-[clamp(3rem,6vw,6.2rem)] font-semibold leading-[0.84] tracking-[-0.075em]">
              No mystery. Just clear next steps.
            </h2>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-5">
            {process.map(([step, title, copy]) => (
              <article key={step} className="rounded-[1.6rem] border border-white/[0.09] bg-white/[0.03] p-5">
                <p className="font-display text-5xl font-semibold tracking-[-0.07em] text-[#fb923c]">{step}</p>
                <h3 className="mt-5 font-display text-2xl font-semibold tracking-[-0.05em]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/42">{copy}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="reviews" className="border-y border-white/[0.08] bg-[#0b1627] py-24 sm:py-32">
        <Container className="grid gap-10 xl:grid-cols-[0.78fr_1.22fr] xl:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-orange-200">Reviews</p>
            <h2 className="mt-5 max-w-[10ch] font-display text-[clamp(3rem,6vw,6.2rem)] font-semibold leading-[0.84] tracking-[-0.075em]">
              Proof that makes calls easier.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {reviews.map(([quote, location]) => (
              <article key={quote} className="rounded-[1.6rem] border border-white/[0.09] bg-white/[0.035] p-6">
                <div className="flex gap-1 text-[#fb923c]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-5 text-lg leading-8 text-white/68">“{quote}”</p>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.22em] text-white/32">{location}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="areas" className="relative py-24 sm:py-32">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-orange-200">Service area</p>
            <h2 className="mt-5 max-w-[11ch] font-display text-[clamp(3rem,6vw,6.2rem)] font-semibold leading-[0.84] tracking-[-0.075em]">
              Local pages need local confidence.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/46">
              For contractors, the location section is not decoration. It confirms the visitor is in range and reinforces local trust for ads and organic traffic.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/[0.1] bg-white/[0.035] p-5">
            <div className="relative h-80 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0b1627]">
              <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:34px_34px]" />
              {serviceAreas.slice(0, 5).map((area, index) => (
                <div
                  key={area}
                  className="absolute rounded-full border border-white/10 bg-black/35 px-3 py-2 text-xs font-bold text-white/72 backdrop-blur"
                  style={{
                    left: `${12 + index * 15}%`,
                    top: `${18 + (index % 3) * 18}%`
                  }}
                >
                  <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#fb923c] shadow-[0_0_20px_rgba(251,146,60,0.9)]" />
                  {area}
                </div>
              ))}
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur">
                <p className="font-display text-3xl font-semibold tracking-[-0.06em]">Toronto + GTA</p>
                <p className="mt-2 text-sm text-white/45">Map-ready area section with city pages, local proof, and call routing.</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {serviceAreas.map((area) => (
                <span key={area} className="rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-1.5 text-xs font-semibold text-white/48">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section id="faq" className="border-y border-white/[0.08] bg-[#f8fafc] py-24 text-[#0f172a] sm:py-32">
        <Container className="grid gap-10 xl:grid-cols-[0.72fr_1.28fr] xl:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#ea580c]">FAQ</p>
            <h2 className="mt-5 max-w-[10ch] font-display text-[clamp(3rem,6vw,6.2rem)] font-semibold leading-[0.84] tracking-[-0.075em]">
              Answer objections before the call.
            </h2>
          </div>

          <div className="grid gap-4">
            {faqs.map(([question, answer]) => (
              <article key={question} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
                <h3 className="font-display text-2xl font-semibold tracking-[-0.045em]">{question}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{answer}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative py-24 sm:py-32">
        <Container>
          <div className="overflow-hidden rounded-[2rem] border border-white/[0.1] bg-[radial-gradient(circle_at_75%_25%,rgba(251,146,60,0.3),transparent_18rem),linear-gradient(135deg,#0b1627,#07111f)] p-8 sm:p-12">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-orange-200">
                  <Sparkles className="h-4 w-4" />
                  Final CTA
                </p>
                <h2 className="mt-6 max-w-[11ch] font-display text-[clamp(3.2rem,7vw,7rem)] font-semibold leading-[0.8] tracking-[-0.08em]">
                  Ready for a clear estimate?
                </h2>
              </div>
              <div>
                <p className="max-w-2xl text-lg leading-9 text-white/52">
                  Use this Contractor Pro direction as the starting point for a real contractor, trade, or home-service landing page.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href={startHref()} className="inline-flex min-h-13 items-center gap-2 rounded-full bg-white px-6 text-sm font-black text-[#07111f] transition hover:-translate-y-0.5">
                    Start with this design
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <a href="tel:+14165550100" className="inline-flex min-h-13 items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-6 text-sm font-black text-white/72 transition hover:bg-white/[0.08] hover:text-white">
                    <Phone className="h-4 w-4" />
                    Call now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <footer className="border-t border-white/[0.08] bg-[#050b14] pb-24 pt-14 lg:pb-14">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-[#07111f]">
                  <HardHat className="h-5 w-5 text-[#ea580c]" />
                </span>
                <p className="font-display text-2xl font-semibold tracking-[-0.04em]">TrueNorth Contracting</p>
              </div>
              <p className="mt-5 max-w-md text-sm leading-7 text-white/42">
                A GridSpell demo showing how contractor landing pages can combine trust, service clarity, local SEO sections, and quote-request conversion.
              </p>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-white/25">Services</p>
              <div className="mt-4 grid gap-3 text-sm text-white/45">
                {services.slice(0, 4).map((service) => <a key={service.title} href="#services" className="hover:text-white">{service.title}</a>)}
              </div>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-white/25">Areas</p>
              <div className="mt-4 grid gap-3 text-sm text-white/45">
                {serviceAreas.slice(0, 4).map((area) => <a key={area} href="#areas" className="hover:text-white">{area}</a>)}
              </div>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-white/25">Contact</p>
              <div className="mt-4 grid gap-3 text-sm text-white/45">
                <a href="tel:+14165550100" className="hover:text-white">(416) 555-0100</a>
                <a href="mailto:hello@truenorth.demo" className="hover:text-white">hello@truenorth.demo</a>
                <span>Mon–Sat · 8am–6pm</span>
              </div>
            </div>
          </div>
        </Container>
      </footer>

      <div className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-2 gap-2 rounded-full border border-white/10 bg-[#07111f]/90 p-2 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl lg:hidden">
        <a href="tel:+14165550100" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.06] text-sm font-black text-white">
          <Phone className="h-4 w-4" />
          Call
        </a>
        <Link href={startHref()} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#ea580c] text-sm font-black text-white">
          Estimate
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </main>
  );
}
