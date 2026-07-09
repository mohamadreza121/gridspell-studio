import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CalendarDays, Clock, MapPin, Star, Utensils } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { getLandingPageConcept } from "@/config/landing-pages";
import { createPageMetadata } from "@/lib/metadata";

const concept = getLandingPageConcept("restaurant-local");

export const metadata: Metadata = createPageMetadata({
  title: "Restaurant Local Landing Page Demo",
  description:
    "A warm restaurant landing page demo with menu highlights, reservations, hours, and local location sections.",
  path: "/demo/restaurant-local"
});

const menuHighlights = [
  ["Wood-fired margherita", "$18", "Tomato, basil, fresh mozzarella"],
  ["Crispy chicken sandwich", "$21", "House slaw, chili honey, brioche"],
  ["Roasted salmon bowl", "$24", "Rice, herbs, sesame, citrus glaze"]
] as const;

function startHref() {
  const params = new URLSearchParams({
    package: "landing-page",
    source: "restaurant-local",
    design: concept?.title ?? "Restaurant Local"
  });

  return `/start-project?${params.toString()}`;
}

export default function RestaurantLocalDemoPage() {
  return (
    <main className="overflow-hidden bg-[#fff7ed] text-[#431407]">
      <section className="relative min-h-svh overflow-hidden bg-[radial-gradient(circle_at_80%_10%,rgba(251,146,60,0.32),transparent_30rem),linear-gradient(135deg,#fff7ed,#ffedd5)] pt-8">
        <div aria-hidden="true" className="absolute -left-24 top-32 h-80 w-80 rounded-full bg-[#b45309]/15 blur-3xl" />
        <div aria-hidden="true" className="absolute bottom-[-8rem] right-[-8rem] h-96 w-96 rounded-full bg-[#431407]/15 blur-3xl" />

        <Container className="relative">
          <nav className="flex items-center justify-between rounded-full border border-[#431407]/10 bg-white/70 px-4 py-3 shadow-[0_16px_70px_rgba(67,20,7,0.08)] backdrop-blur md:px-6">
            <Link href="/landing-pages" className="inline-flex items-center gap-2 text-sm font-semibold text-[#431407]/65 transition hover:text-[#431407]">
              <ArrowLeft className="h-4 w-4" />
              Gallery
            </Link>
            <div className="hidden items-center gap-6 text-sm font-semibold text-[#431407]/55 md:flex">
              <a href="#menu">Menu</a>
              <a href="#hours">Hours</a>
              <a href="#location">Location</a>
            </div>
            <Link href={startHref()} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#431407] px-5 text-sm font-bold text-white transition hover:-translate-y-0.5">
              Start with this design
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </nav>

          <div className="grid min-h-[calc(100svh-6rem)] items-center gap-12 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:py-20">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-[#b45309]/20 bg-[#b45309]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#92400e]">
                <Utensils className="h-4 w-4" />
                Restaurant landing demo
              </p>
              <h1 className="mt-7 max-w-[10ch] font-display text-[clamp(4rem,9vw,8.8rem)] font-semibold leading-[0.78] tracking-[-0.08em] text-[#431407]">
                A local favorite, served online.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-[#431407]/62 sm:text-xl sm:leading-9">
                A warm landing page for restaurants and cafes that need to show atmosphere, menu highlights, hours, location, and reservation CTAs fast.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link href={startHref()} className="inline-flex min-h-13 items-center gap-2 rounded-full bg-[#b45309] px-6 text-sm font-bold text-white shadow-[0_18px_60px_rgba(180,83,9,0.22)] transition hover:-translate-y-0.5">
                  Start with this design
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <a href="#menu" className="inline-flex min-h-13 items-center gap-2 rounded-full border border-[#431407]/12 bg-white px-6 text-sm font-bold text-[#431407] transition hover:-translate-y-0.5">
                  View menu highlights
                </a>
              </div>
            </div>

            <div className="grid gap-4 rounded-[2.2rem] border border-[#431407]/10 bg-white/80 p-4 shadow-[0_35px_120px_rgba(67,20,7,0.16)] backdrop-blur">
              <div className="grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
                <div className="min-h-80 rounded-[1.8rem] bg-[radial-gradient(circle_at_35%_35%,rgba(255,237,213,0.95),transparent_8rem),linear-gradient(135deg,#7c2d12,#431407)] p-6 text-white">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-orange-200">Tonight special</p>
                  <p className="mt-28 font-display text-5xl font-semibold leading-[0.88] tracking-[-0.065em]">Wood-fired dinner menu.</p>
                </div>
                <div className="grid gap-4">
                  <div className="rounded-[1.5rem] bg-[#431407] p-5 text-white">
                    <Clock className="h-5 w-5 text-orange-200" />
                    <p className="mt-4 text-sm uppercase tracking-[0.2em] text-white/45">Open today</p>
                    <p className="mt-2 font-display text-3xl font-semibold tracking-[-0.055em]">11am – 10pm</p>
                  </div>
                  <div className="rounded-[1.5rem] border border-[#431407]/10 bg-[#fff7ed] p-5">
                    <MapPin className="h-5 w-5 text-[#b45309]" />
                    <p className="mt-4 font-semibold">Downtown Toronto</p>
                    <p className="mt-2 text-sm leading-6 text-[#431407]/52">Map-ready location block with parking notes.</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {["Menu", "Reservations", "Reviews"].map((item) => (
                  <div key={item} className="rounded-2xl border border-[#431407]/10 bg-white p-4 text-sm font-bold text-[#431407]/72">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="menu" className="py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#b45309]">Menu highlights</p>
              <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.9] tracking-[-0.06em]">Show the food without overwhelming the visitor.</h2>
            </div>
            <div className="grid gap-4">
              {menuHighlights.map(([name, price, detail]) => (
                <article key={name} className="flex items-start justify-between gap-5 rounded-[1.5rem] border border-[#431407]/10 bg-white p-5 shadow-[0_16px_50px_rgba(67,20,7,0.06)]">
                  <div>
                    <h3 className="font-display text-2xl font-semibold tracking-[-0.045em]">{name}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#431407]/54">{detail}</p>
                  </div>
                  <p className="font-display text-2xl font-semibold tracking-[-0.05em] text-[#b45309]">{price}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section id="hours" className="bg-[#431407] py-24 text-white">
        <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-orange-200">Visit us</p>
            <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.9] tracking-[-0.06em]">Hours, location, and reservation CTA in one clear section.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {["Mon–Thu · 11am–9pm", "Fri–Sat · 11am–10pm", "Sunday · 10am–8pm", "Happy hour · 4pm–6pm"].map((item) => (
              <div key={item} className="rounded-[1.35rem] border border-white/10 bg-white/[0.06] p-5">
                <CalendarDays className="h-5 w-5 text-orange-200" />
                <p className="mt-4 text-sm font-semibold text-white/70">{item}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="location" className="py-20">
        <Container className="grid gap-6 md:grid-cols-3">
          {["4.9 average rating", "Local pickup friendly", "Reservation-ready flow"].map((item) => (
            <div key={item} className="rounded-[1.5rem] border border-[#431407]/10 bg-white p-6">
              <Star className="h-5 w-5 fill-[#b45309] text-[#b45309]" />
              <p className="mt-4 font-display text-2xl font-semibold tracking-[-0.045em]">{item}</p>
            </div>
          ))}
        </Container>
      </section>
    </main>
  );
}
