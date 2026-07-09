import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, MapPin, Phone, ShieldCheck, Star } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { getLandingPageConcept } from "@/config/landing-pages";
import { createPageMetadata } from "@/lib/metadata";

const concept = getLandingPageConcept("contractor-pro");

export const metadata: Metadata = createPageMetadata({
  title: "Contractor Pro Landing Page Demo",
  description:
    "A trust-first landing page demo for contractors, home services, and estimate-based local businesses.",
  path: "/demo/contractor-pro"
});

const services = ["Spray foam", "Attic upgrades", "Drywall", "Steel framing"] as const;
const proof = ["20+ years experience", "Residential and commercial", "Fast estimate requests"] as const;

function startHref() {
  const params = new URLSearchParams({
    package: "landing-page",
    source: "contractor-pro",
    design: concept?.title ?? "Contractor Pro"
  });

  return `/start-project?${params.toString()}`;
}

export default function ContractorProDemoPage() {
  return (
    <main className="overflow-hidden bg-[#fff8f0] text-[#172033]">
      <section className="relative min-h-svh overflow-hidden bg-[linear-gradient(135deg,#fff8f0_0%,#f8eadb_48%,#fff_100%)] pt-8">
        <div aria-hidden="true" className="absolute right-[-8rem] top-[-6rem] h-96 w-96 rounded-full bg-orange-300/40 blur-3xl" />
        <div aria-hidden="true" className="absolute bottom-[-9rem] left-[-8rem] h-96 w-96 rounded-full bg-slate-900/10 blur-3xl" />

        <Container className="relative">
          <nav className="flex items-center justify-between rounded-full border border-[#172033]/10 bg-white/75 px-4 py-3 shadow-[0_16px_60px_rgba(15,23,42,0.08)] backdrop-blur md:px-6">
            <Link href="/landing-pages" className="inline-flex items-center gap-2 text-sm font-semibold text-[#172033]/70 transition hover:text-[#172033]">
              <ArrowLeft className="h-4 w-4" />
              Gallery
            </Link>
            <div className="hidden items-center gap-6 text-sm font-semibold text-[#172033]/55 md:flex">
              <a href="#services">Services</a>
              <a href="#reviews">Reviews</a>
              <a href="#area">Service area</a>
            </div>
            <Link href={startHref()} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#f97316] px-5 text-sm font-bold text-white shadow-[0_14px_40px_rgba(249,115,22,0.28)] transition hover:-translate-y-0.5">
              Start with this design
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </nav>

          <div className="grid min-h-[calc(100svh-6rem)] items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-[#f97316]/20 bg-[#f97316]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#c2410c]">
                <ShieldCheck className="h-4 w-4" />
                Licensed local contractor demo
              </p>
              <h1 className="mt-7 max-w-[11ch] font-display text-[clamp(4rem,9vw,8.8rem)] font-semibold leading-[0.78] tracking-[-0.08em] text-[#101828]">
                Reliable work. Clear estimates.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-[#172033]/62 sm:text-xl sm:leading-9">
                A conversion-focused landing page for service businesses that need to build trust quickly and turn local visitors into quote requests.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a href="tel:+14165550100" className="inline-flex min-h-13 items-center gap-2 rounded-full bg-[#172033] px-6 text-sm font-bold text-white transition hover:-translate-y-0.5">
                  <Phone className="h-4 w-4" />
                  Call now
                </a>
                <Link href={startHref()} className="inline-flex min-h-13 items-center gap-2 rounded-full border border-[#172033]/12 bg-white px-6 text-sm font-bold text-[#172033] transition hover:-translate-y-0.5">
                  Start with this design
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {proof.map((item) => (
                  <div key={item} className="rounded-2xl border border-[#172033]/10 bg-white/70 p-4">
                    <CheckCircle2 className="h-5 w-5 text-[#f97316]" />
                    <p className="mt-3 text-sm font-semibold leading-6 text-[#172033]/70">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2.2rem] border border-[#172033]/10 bg-white p-4 shadow-[0_35px_120px_rgba(15,23,42,0.16)]">
              <div className="overflow-hidden rounded-[1.6rem] bg-[#101828] text-white">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                  <div className="flex gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/14" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] text-white/35">Estimate flow</span>
                </div>
                <div className="grid gap-4 p-5">
                  <div className="rounded-[1.4rem] bg-[linear-gradient(135deg,#f97316,#fb923c)] p-5 text-white">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/75">Free estimate</p>
                    <p className="mt-3 font-display text-4xl font-semibold leading-none tracking-[-0.06em]">Tell us about the job.</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {services.map((service) => (
                      <div key={service} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                        <p className="text-sm font-semibold">{service}</p>
                        <p className="mt-2 text-xs leading-5 text-white/42">Service card, proof, and CTA-ready section.</p>
                      </div>
                    ))}
                  </div>
                  <div id="area" className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                      <MapPin className="h-4 w-4 text-orange-300" />
                      Toronto + surrounding areas
                    </div>
                    <div className="mt-4 h-32 rounded-xl bg-[linear-gradient(135deg,rgba(255,255,255,0.15),rgba(255,255,255,0.04)),radial-gradient(circle_at_35%_50%,rgba(251,146,60,0.65),transparent_7rem)]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="services" className="py-20">
        <Container>
          <div className="grid gap-5 md:grid-cols-4">
            {services.map((service) => (
              <article key={service} className="rounded-[1.5rem] border border-[#172033]/10 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.07)]">
                <p className="font-display text-2xl font-semibold tracking-[-0.04em]">{service}</p>
                <p className="mt-4 text-sm leading-7 text-[#172033]/55">Clear section copy, trust point, and action path for this service.</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="reviews" className="bg-[#101828] py-20 text-white">
        <Container className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-orange-300">Client proof</p>
            <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.9] tracking-[-0.06em]">Built to make a local company feel trustworthy fast.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {["Fast quote and clean work.", "Professional from first call.", "Easy to understand services.", "Exactly what our home needed."].map((review) => (
              <div key={review} className="rounded-[1.35rem] border border-white/10 bg-white/[0.05] p-5">
                <div className="flex gap-1 text-orange-300">
                  {[1, 2, 3, 4, 5].map((star) => <Star key={star} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="mt-4 text-sm leading-7 text-white/58">{review}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
