import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  ChefHat,
  Clock,
  Flame,
  MapPin,
  Navigation,
  Phone,
  Quote,
  Sparkles,
  Star,
  Utensils,
  Wine
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { getLandingPageConcept } from "@/config/landing-pages";
import { createPageMetadata } from "@/lib/metadata";

const concept = getLandingPageConcept("restaurant-local");

export const metadata: Metadata = createPageMetadata({
  title: "Casa Ember Restaurant Landing Page Demo",
  description:
    "A warm restaurant landing page demo designed like an elegant digital menu with reservations, signature dishes, atmosphere, hours, location, and reviews.",
  path: "/demo/restaurant-local"
});

const signaturePlates = [
  {
    name: "Charred Ricotta Toast",
    price: "$14",
    detail: "Whipped ricotta, chili honey, roasted garlic, grilled sourdough",
    label: "Starter"
  },
  {
    name: "Wild Mushroom Tagliatelle",
    price: "$26",
    detail: "Handmade pasta, brown butter, cracked pepper, parmesan snow",
    label: "Pasta"
  },
  {
    name: "Wood-Fired Branzino",
    price: "$32",
    detail: "Lemon herb oil, fennel, capers, ember-roasted potatoes",
    label: "Main"
  },
  {
    name: "Ember Short Rib",
    price: "$36",
    detail: "Slow-braised beef, roasted garlic mash, red wine jus",
    label: "Chef favorite"
  },
  {
    name: "Citrus Olive Cake",
    price: "$12",
    detail: "Orange zest, mascarpone cream, toasted pistachio",
    label: "Dessert"
  }
] as const;

const hours = [
  ["Tue – Thu", "5 PM – 10 PM"],
  ["Fri – Sat", "5 PM – 11 PM"],
  ["Sunday", "4 PM – 9 PM"],
  ["Monday", "Closed"]
] as const;

const reviews = [
  ["Feels like a hidden neighborhood gem with a menu you want to read twice.", "Mina R.", "Dinner guest"],
  ["The kind of warm, polished site that makes you want to book before checking the menu.", "Toronto Table", "Local review"],
  ["Perfect for a restaurant that wants atmosphere, food, hours, and reservations to feel premium.", "GridSpell note", "Design demo"]
] as const;

function startHref() {
  const params = new URLSearchParams({
    package: "landing-page",
    source: "restaurant-local",
    design: concept?.title ?? "Restaurant Local"
  });

  return `/start-project?${params.toString()}`;
}

function RestaurantNavbar() {
  return (
    <nav className="relative z-10 border-b border-[#4a1f12]/15 py-5">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <Link href="/landing-pages" className="inline-flex w-fit items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-[#7a4d34]/70 transition hover:text-[#4a1f12]">
          <ArrowLeft className="h-4 w-4" />
          Gallery
        </Link>

        <div className="text-center lg:absolute lg:left-1/2 lg:-translate-x-1/2">
          <Link href="#top" className="font-display text-3xl font-semibold tracking-[-0.04em] text-[#35160d]">
            Casa Ember
          </Link>
          <p className="mt-1 text-[0.58rem] font-black uppercase tracking-[0.32em] text-[#9b6c42]">
            Wood-fired kitchen & wine room
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-[0.68rem] font-black uppercase tracking-[0.2em] text-[#7a4d34]/68">
          <a href="#menu" className="rounded-full px-3 py-2 transition hover:bg-[#4a1f12]/7 hover:text-[#4a1f12]">Menu</a>
          <a href="#story" className="rounded-full px-3 py-2 transition hover:bg-[#4a1f12]/7 hover:text-[#4a1f12]">Story</a>
          <a href="#hours" className="rounded-full px-3 py-2 transition hover:bg-[#4a1f12]/7 hover:text-[#4a1f12]">Hours</a>
          <a href="#location" className="rounded-full px-3 py-2 transition hover:bg-[#4a1f12]/7 hover:text-[#4a1f12]">Visit</a>
          <Link href={startHref()} className="rounded-full bg-[#7a1f1f] px-4 py-2 text-white shadow-[0_14px_34px_rgba(122,31,31,0.22)] transition hover:-translate-y-0.5 hover:bg-[#8f2828]">
            Reserve
          </Link>
        </div>
      </div>
    </nav>
  );
}

function HeroFoodFrame() {
  return (
    <div className="relative">
      <div aria-hidden="true" className="absolute -inset-8 rounded-full bg-[#d8a84e]/22 blur-[90px]" />
      <div className="relative rotate-[-1.5deg] rounded-[2.4rem] border border-[#4a1f12]/12 bg-[#fffaf0] p-3 shadow-[0_32px_90px_rgba(58,24,11,0.22)]">
        <div className="relative min-h-[31rem] overflow-hidden rounded-[1.9rem] bg-[#2a140e] p-6 text-white">
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_44%_34%,rgba(255,222,156,0.95),transparent_0_8rem),radial-gradient(circle_at_48%_35%,rgba(135,42,20,0.95),transparent_0_11rem),radial-gradient(circle_at_50%_38%,rgba(31,14,7,0.95),transparent_0_15rem),linear-gradient(135deg,#6b2416,#27110a_62%,#120806)]" />
          <div aria-hidden="true" className="absolute left-[18%] top-[15%] h-44 w-44 rounded-full border-[18px] border-[#f1d2a3]/80 opacity-90 shadow-[inset_0_0_50px_rgba(74,31,18,0.42),0_26px_70px_rgba(0,0,0,0.38)]" />
          <div aria-hidden="true" className="absolute left-[25%] top-[23%] h-16 w-24 rounded-full bg-[#772d18] blur-sm" />
          <div aria-hidden="true" className="absolute left-[33%] top-[20%] h-20 w-16 rounded-full bg-[#f8d58d] opacity-80 blur-sm" />
          <div aria-hidden="true" className="absolute left-[21%] top-[32%] h-9 w-24 rounded-full bg-[#5b1f14] opacity-80 blur-sm" />
          <div aria-hidden="true" className="absolute right-[13%] bottom-[18%] h-32 w-24 rounded-full bg-[#7a1f1f]/70 blur-2xl" />

          <div className="relative flex h-full min-h-[28.5rem] flex-col justify-between">
            <div className="flex items-center justify-between gap-4">
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[0.62rem] font-black uppercase tracking-[0.24em] text-amber-100/80 backdrop-blur">
                Tonight special
              </span>
              <Flame className="h-6 w-6 text-[#f6c66b]" />
            </div>

            <div>
              <p className="font-display text-5xl font-semibold leading-[0.86] tracking-[-0.065em] sm:text-6xl">
                Wild mushroom tagliatelle.
              </p>
              <p className="mt-4 max-w-sm text-sm leading-7 text-white/62">
                Handmade pasta, brown butter, parmesan, and cracked pepper finished at the pass.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-8 right-4 max-w-[15rem] rotate-2 rounded-[1.5rem] border border-[#4a1f12]/12 bg-[#fff4dc] p-5 shadow-[0_22px_65px_rgba(58,24,11,0.20)]">
        <p className="font-display text-2xl font-semibold leading-none tracking-[-0.05em] text-[#4a1f12]">
          Chef note
        </p>
        <p className="mt-3 text-sm leading-6 text-[#7a4d34]">
          Ask for the cellar red pairing. It was built for this dish.
        </p>
      </div>
    </div>
  );
}

function MenuLine({ name, price, detail, label }: { name: string; price: string; detail: string; label: string }) {
  return (
    <article className="group border-b border-[#4a1f12]/12 py-5 last:border-b-0">
      <div className="grid gap-3 sm:grid-cols-[auto_1fr_auto] sm:items-baseline">
        <div>
          <p className="font-display text-2xl font-semibold tracking-[-0.045em] text-[#35160d]">
            {name}
          </p>
          <p className="mt-2 text-sm leading-6 text-[#7a4d34]">{detail}</p>
        </div>
        <span aria-hidden="true" className="hidden border-b border-dotted border-[#4a1f12]/18 sm:block" />
        <div className="flex items-center gap-3 sm:block sm:text-right">
          <p className="font-display text-2xl font-semibold tracking-[-0.05em] text-[#7a1f1f]">{price}</p>
          <p className="mt-1 rounded-full bg-[#4a1f12]/7 px-3 py-1 text-[0.58rem] font-black uppercase tracking-[0.18em] text-[#9b6c42] sm:inline-block">
            {label}
          </p>
        </div>
      </div>
    </article>
  );
}

function ReservationSlip() {
  return (
    <div id="reserve" className="relative rounded-[2rem] border border-[#4a1f12]/12 bg-[#fffaf0] p-5 shadow-[0_24px_70px_rgba(58,24,11,0.16)]">
      <div className="absolute -top-4 left-8 rounded-full bg-[#7a1f1f] px-4 py-2 text-[0.62rem] font-black uppercase tracking-[0.22em] text-white shadow-[0_14px_40px_rgba(122,31,31,0.24)]">
        Reservation slip
      </div>
      <div className="mt-6 grid gap-4">
        <div className="rounded-[1.4rem] bg-[#35160d] p-5 text-white">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#d8a84e]">Tonight</p>
          <p className="mt-3 font-display text-4xl font-semibold leading-none tracking-[-0.06em]">5 PM – 11 PM</p>
          <p className="mt-3 text-sm leading-6 text-white/58">Walk-ins welcome. Reservations recommended after 7 PM.</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {["Party of 2", "Today", "7:30 PM"].map((item) => (
            <div key={item} className="rounded-2xl border border-[#4a1f12]/10 bg-[#f8ead2] px-4 py-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9b6c42]">Select</p>
              <p className="mt-2 font-display text-2xl font-semibold tracking-[-0.05em] text-[#35160d]">{item}</p>
            </div>
          ))}
        </div>

        <Link href={startHref()} className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-full bg-[#7a1f1f] px-6 text-sm font-black text-white shadow-[0_18px_45px_rgba(122,31,31,0.22)] transition hover:-translate-y-0.5 hover:bg-[#8f2828]">
          Reserve a table
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

function WarmMap() {
  return (
    <div className="relative min-h-[24rem] overflow-hidden rounded-[2rem] border border-[#4a1f12]/12 bg-[#f8ead2] p-5 shadow-[0_24px_70px_rgba(58,24,11,0.12)]">
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(rgba(74,31,18,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(74,31,18,0.06)_1px,transparent_1px)] bg-[size:34px_34px]" />
      <div aria-hidden="true" className="absolute left-[20%] top-[22%] h-24 w-48 rotate-[-18deg] rounded-full border border-[#4a1f12]/12" />
      <div aria-hidden="true" className="absolute right-[18%] top-[30%] h-44 w-36 rotate-12 rounded-full border border-[#4a1f12]/10" />
      <div aria-hidden="true" className="absolute left-[38%] top-[44%] h-4 w-4 rounded-full bg-[#7a1f1f] shadow-[0_0_0_9px_rgba(122,31,31,0.12),0_0_55px_rgba(122,31,31,0.48)]" />

      <div className="relative flex h-full min-h-[21rem] flex-col justify-between">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[0.62rem] font-black uppercase tracking-[0.24em] text-[#9b6c42]">Neighborhood map</p>
          <Navigation className="h-5 w-5 text-[#7a1f1f]" />
        </div>
        <div className="rounded-[1.4rem] border border-[#4a1f12]/12 bg-[#fffaf0]/86 p-5 backdrop-blur">
          <p className="font-display text-3xl font-semibold tracking-[-0.055em] text-[#35160d]">123 King Street West</p>
          <p className="mt-2 text-sm leading-6 text-[#7a4d34]">Toronto, ON · Near the theatre district · street parking nearby</p>
        </div>
      </div>
    </div>
  );
}

export default function RestaurantLocalDemoPage() {
  return (
    <main id="top" className="overflow-hidden bg-[#2a140e] text-[#35160d]">
      <section className="relative min-h-svh overflow-hidden px-3 pb-8 pt-8 sm:px-5">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(216,168,78,0.35),transparent_24rem),radial-gradient(circle_at_82%_8%,rgba(201,106,43,0.28),transparent_24rem),linear-gradient(135deg,#2a140e,#130806_72%)]" />
        <div aria-hidden="true" className="absolute inset-0 opacity-25 bg-[linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div aria-hidden="true" className="absolute left-1/2 top-10 h-80 w-[70vw] -translate-x-1/2 rounded-full bg-[#f6c66b]/18 blur-[120px]" />

        <Container className="relative">
          <div className="mx-auto max-w-[92rem] rounded-[2.5rem] border border-[#f8ead2]/35 bg-[#fff7ea] p-4 shadow-[0_45px_140px_rgba(0,0,0,0.34)] sm:p-7 lg:rounded-[3.5rem] lg:p-9">
            <div className="relative overflow-hidden rounded-[2rem] border border-[#4a1f12]/10 bg-[#fff4dc] px-5 pb-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] sm:px-8 lg:rounded-[2.75rem] lg:px-10">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-45 bg-[radial-gradient(circle_at_20%_12%,rgba(216,168,78,0.20),transparent_20rem),radial-gradient(circle_at_85%_18%,rgba(122,31,31,0.10),transparent_24rem),linear-gradient(90deg,rgba(74,31,18,0.035)_1px,transparent_1px)] bg-[size:auto,auto,42px_42px]" />

              <RestaurantNavbar />

              <div className="relative grid min-h-[calc(100svh-13rem)] items-center gap-14 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
                <div>
                  <p className="inline-flex items-center gap-2 rounded-full border border-[#4a1f12]/12 bg-[#4a1f12]/7 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#7a4d34]">
                    <Utensils className="h-4 w-4 text-[#7a1f1f]" />
                    Elegant menu landing page
                  </p>

                  <div className="mt-9 flex items-center gap-4 text-[#9b6c42]">
                    <span className="h-px flex-1 bg-[#4a1f12]/14" />
                    <span className="text-[0.62rem] font-black uppercase tracking-[0.32em]">Est. 1998</span>
                    <span className="h-px flex-1 bg-[#4a1f12]/14" />
                  </div>

                  <h1 className="mt-7 max-w-[10ch] font-display text-[clamp(4rem,9vw,9.4rem)] font-semibold leading-[0.76] tracking-[-0.085em] text-[#35160d]">
                    Warm plates. Slow evenings.
                  </h1>

                  <p className="mt-7 max-w-2xl text-lg leading-8 text-[#6f4c39] sm:text-xl sm:leading-9">
                    Casa Ember is a wood-fired kitchen and wine room designed like a digital menu: intimate, easy to scan, and built to turn hungry visitors into reservations.
                  </p>

                  <div className="mt-9 flex flex-wrap gap-3">
                    <Link href={startHref()} className="inline-flex min-h-[3.25rem] items-center gap-2 rounded-full bg-[#7a1f1f] px-6 text-sm font-black text-white shadow-[0_18px_45px_rgba(122,31,31,0.22)] transition hover:-translate-y-0.5 hover:bg-[#8f2828]">
                      Start with this design
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                    <a href="#menu" className="inline-flex min-h-[3.25rem] items-center gap-2 rounded-full border border-[#4a1f12]/12 bg-[#fffaf0] px-6 text-sm font-black text-[#35160d] shadow-[0_12px_34px_rgba(58,24,11,0.08)] transition hover:-translate-y-0.5">
                      View the menu
                    </a>
                  </div>

                  <div className="mt-10 grid gap-3 sm:grid-cols-3">
                    {[
                      [Clock, "Open tonight", "5 PM – 11 PM"],
                      [Wine, "Wine room", "Seasonal cellar"],
                      [MapPin, "Downtown", "Toronto, ON"]
                    ].map(([Icon, title, copy]) => (
                      <div key={title as string} className="rounded-[1.35rem] border border-[#4a1f12]/10 bg-[#fffaf0]/72 p-4 shadow-[0_12px_32px_rgba(58,24,11,0.07)]">
                        <Icon className="h-5 w-5 text-[#7a1f1f]" />
                        <p className="mt-3 font-display text-xl font-semibold tracking-[-0.04em] text-[#35160d]">{title as string}</p>
                        <p className="mt-1 text-sm text-[#7a4d34]">{copy as string}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <HeroFoodFrame />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="menu" className="relative px-3 py-10 sm:px-5">
        <Container>
          <div className="mx-auto max-w-[86rem] rounded-[2.75rem] border border-[#f8ead2]/30 bg-[#fff7ea] p-5 shadow-[0_36px_110px_rgba(0,0,0,0.26)] sm:p-9 lg:p-12">
            <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-[#9b6c42]">Signature plates</p>
                <h2 className="mt-5 max-w-[9ch] font-display text-[clamp(3.4rem,7vw,7rem)] font-semibold leading-[0.78] tracking-[-0.08em] text-[#35160d]">
                  Menu, but make it feel printed.
                </h2>
                <p className="mt-6 max-w-lg text-base leading-8 text-[#7a4d34]">
                  Instead of generic cards, the dishes read like a real restaurant menu: names, details, prices, and chef cues in one elegant flow.
                </p>
              </div>

              <div className="rounded-[2rem] border border-[#4a1f12]/12 bg-[#fff4dc] p-5 sm:p-7">
                <div className="mb-3 flex items-center justify-between gap-4 border-b border-[#4a1f12]/12 pb-5">
                  <p className="font-display text-3xl font-semibold tracking-[-0.055em] text-[#35160d]">Dinner menu</p>
                  <Sparkles className="h-6 w-6 text-[#c96a2b]" />
                </div>
                {signaturePlates.map((item) => (
                  <MenuLine key={item.name} {...item} />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="story" className="relative px-3 py-10 sm:px-5">
        <Container>
          <div className="mx-auto grid max-w-[86rem] gap-6 lg:grid-cols-[1.06fr_0.94fr]">
            <div className="relative min-h-[34rem] overflow-hidden rounded-[2.75rem] border border-[#f8ead2]/30 bg-[#35160d] p-8 text-white shadow-[0_36px_110px_rgba(0,0,0,0.25)] lg:p-10">
              <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_34%_26%,rgba(255,215,150,0.42),transparent_16rem),radial-gradient(circle_at_74%_78%,rgba(122,31,31,0.55),transparent_18rem),linear-gradient(135deg,#35160d,#120806)]" />
              <div aria-hidden="true" className="absolute left-12 top-16 h-36 w-24 rotate-[-16deg] rounded-full bg-[#f8ead2]/18 blur-xl" />
              <div aria-hidden="true" className="absolute bottom-12 right-10 h-52 w-36 rotate-12 rounded-full border border-[#f8ead2]/20" />
              <div className="relative flex min-h-[28rem] flex-col justify-between">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs font-black uppercase tracking-[0.28em] text-[#d8a84e]">Dining room</p>
                  <Wine className="h-6 w-6 text-[#d8a84e]" />
                </div>
                <div>
                  <h2 className="max-w-[10ch] font-display text-[clamp(3.4rem,6vw,6.8rem)] font-semibold leading-[0.82] tracking-[-0.08em]">
                    A room made for long conversations.
                  </h2>
                  <p className="mt-6 max-w-xl text-base leading-8 text-white/60">
                    Warm lighting, open kitchen energy, and a reservation path that feels like part of the dining experience instead of a pasted-on form.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-6">
              <div className="rounded-[2.25rem] border border-[#f8ead2]/30 bg-[#fff7ea] p-7 shadow-[0_28px_80px_rgba(0,0,0,0.18)]">
                <ChefHat className="h-7 w-7 text-[#7a1f1f]" />
                <p className="mt-6 font-display text-4xl font-semibold leading-[0.9] tracking-[-0.06em] text-[#35160d]">
                  Chef's recommendation
                </p>
                <p className="mt-5 text-base leading-8 text-[#7a4d34]">
                  Ember short rib, roasted garlic mash, and a cellar red poured tableside. This section can feature seasonal specials or private dining offers.
                </p>
              </div>
              <ReservationSlip />
            </div>
          </div>
        </Container>
      </section>

      <section id="hours" className="relative px-3 py-10 sm:px-5">
        <Container>
          <div className="mx-auto grid max-w-[86rem] gap-6 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="rounded-[2.5rem] border border-[#f8ead2]/30 bg-[#fff7ea] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.20)]">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#9b6c42]">Hours</p>
              <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.88] tracking-[-0.065em] text-[#35160d]">
                The back page of the menu.
              </h2>
              <div className="mt-8 grid gap-3">
                {hours.map(([day, time]) => (
                  <div key={day} className="flex items-center justify-between gap-5 border-b border-[#4a1f12]/12 py-4 last:border-b-0">
                    <span className="font-semibold text-[#35160d]">{day}</span>
                    <span className="font-display text-2xl font-semibold tracking-[-0.04em] text-[#7a1f1f]">{time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div id="location" className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
              <WarmMap />
              <div className="grid gap-6">
                <div className="rounded-[2rem] border border-[#f8ead2]/30 bg-[#fff7ea] p-7 shadow-[0_24px_70px_rgba(0,0,0,0.17)]">
                  <Phone className="h-6 w-6 text-[#7a1f1f]" />
                  <p className="mt-5 font-display text-3xl font-semibold tracking-[-0.055em] text-[#35160d]">Call or reserve online.</p>
                  <p className="mt-4 text-sm leading-7 text-[#7a4d34]">A restaurant landing page should make the next step obvious: reserve, call, or get directions.</p>
                </div>
                <div className="rounded-[2rem] border border-[#f8ead2]/30 bg-[#7a1f1f] p-7 text-white shadow-[0_24px_70px_rgba(122,31,31,0.20)]">
                  <CalendarDays className="h-6 w-6 text-[#f6c66b]" />
                  <p className="mt-5 font-display text-3xl font-semibold tracking-[-0.055em]">Private dining ready.</p>
                  <p className="mt-4 text-sm leading-7 text-white/65">Add event menus, catering inquiries, group reservations, or seasonal holiday booking flows.</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative px-3 py-10 sm:px-5">
        <Container>
          <div className="mx-auto max-w-[86rem] rounded-[2.75rem] border border-[#f8ead2]/30 bg-[#fff7ea] p-6 shadow-[0_34px_100px_rgba(0,0,0,0.22)] sm:p-9">
            <div className="grid gap-8 lg:grid-cols-[0.68fr_1.32fr] lg:items-start">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-[#9b6c42]">Guest notes</p>
                <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.88] tracking-[-0.065em] text-[#35160d]">
                  Reviews that feel like press clippings.
                </h2>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {reviews.map(([quote, name, role], index) => (
                  <article key={name} className={index === 1 ? "rotate-1 rounded-[1.6rem] border border-[#4a1f12]/12 bg-[#fff4dc] p-5 shadow-[0_18px_55px_rgba(58,24,11,0.14)]" : "rounded-[1.6rem] border border-[#4a1f12]/12 bg-[#fffaf0] p-5 shadow-[0_18px_55px_rgba(58,24,11,0.10)]"}>
                    <Quote className="h-5 w-5 text-[#c96a2b]" />
                    <p className="mt-5 text-sm leading-7 text-[#6f4c39]">“{quote}”</p>
                    <div className="mt-5 flex gap-1 text-[#c96a2b]">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="mt-5 font-semibold text-[#35160d]">{name}</p>
                    <p className="mt-1 text-xs text-[#9b6c42]">{role}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative px-3 pb-28 pt-10 sm:px-5">
        <Container>
          <div className="mx-auto max-w-[86rem] overflow-hidden rounded-[2.75rem] border border-[#f8ead2]/30 bg-[#fff7ea] p-6 shadow-[0_34px_100px_rgba(0,0,0,0.25)] sm:p-9">
            <div id="start" className="rounded-[2.2rem] bg-[#35160d] p-8 text-center text-white sm:p-12">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#d8a84e]">A table is waiting</p>
              <h2 className="mx-auto mt-6 max-w-3xl font-display text-[clamp(3.5rem,7vw,7.2rem)] font-semibold leading-[0.78] tracking-[-0.08em]">
                Turn hungry visitors into reservations.
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/62">
                Use this design as a starting point for a restaurant, cafe, bakery, wine bar, private dining room, or local food brand.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Link href={startHref()} className="inline-flex min-h-[3.25rem] items-center gap-2 rounded-full bg-[#f8ead2] px-6 text-sm font-black text-[#35160d] transition hover:-translate-y-0.5">
                  Start with this design
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link href="/landing-pages" className="inline-flex min-h-[3.25rem] items-center gap-2 rounded-full border border-white/12 bg-white/7 px-6 text-sm font-black text-white/72 transition hover:bg-white/12 hover:text-white">
                  Back to gallery
                </Link>
              </div>
            </div>

            <footer className="grid gap-8 border-t border-[#4a1f12]/12 px-2 py-9 lg:grid-cols-[1fr_1.2fr] lg:items-end">
              <div>
                <p className="font-display text-4xl font-semibold tracking-[-0.055em] text-[#35160d]">Casa Ember</p>
                <p className="mt-3 max-w-md text-sm leading-7 text-[#7a4d34]">Wood-fired kitchen, handmade pasta, seasonal plates, and a reservation flow that feels like part of the menu.</p>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                {["Menu", "Reservations", "Private dining", "Location", "Hours"].map((item) => (
                  <span key={item} className="rounded-full border border-[#4a1f12]/10 bg-[#fff4dc] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#7a4d34]">
                    {item}
                  </span>
                ))}
              </div>
            </footer>
          </div>
        </Container>
      </section>

      <div className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-3 gap-2 rounded-[1.5rem] border border-[#f8ead2]/30 bg-[#2a140e]/92 p-2 shadow-[0_20px_60px_rgba(0,0,0,0.34)] backdrop-blur md:hidden">
        <a href="tel:+14165550100" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-white/8 text-xs font-black text-white">
          <Phone className="h-4 w-4" />
          Call
        </a>
        <a href="#location" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-white/8 text-xs font-black text-white">
          <MapPin className="h-4 w-4" />
          Visit
        </a>
        <Link href={startHref()} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-[#f8ead2] text-xs font-black text-[#35160d]">
          Reserve
        </Link>
      </div>
    </main>
  );
}
