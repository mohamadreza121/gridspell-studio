"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  MapPin,
  Menu,
  Mic2,
  Play,
  Sparkles,
  Star,
  Ticket,
  Users,
  X,
  Zap
} from "lucide-react";

const startHref = "/start-project?package=landing-page&source=event-launch&design=Signal+Live+Event";

const speakers = [
  {
    name: "Maya Chen",
    role: "Creative director · Common Thread",
    topic: "Building work people feel",
    image: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    name: "Andre Lewis",
    role: "Founder · Northline Studio",
    topic: "Turning momentum into a movement",
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    name: "Sofia Reyes",
    role: "Product lead · Assembly",
    topic: "Ideas that survive the room",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    name: "Noah Bennett",
    role: "Culture strategist · Fieldwork",
    topic: "Designing unforgettable moments",
    image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200"
  }
] as const;

const schedule = [
  {
    time: "09:00",
    title: "Doors open + live breakfast set",
    type: "Arrival",
    copy: "Coffee, music, installations, and the first chance to meet the room before the main stage begins."
  },
  {
    time: "10:00",
    title: "The opening signal",
    type: "Main stage",
    copy: "A fast, visual opening session about creative courage, momentum, and what happens when ideas become public."
  },
  {
    time: "11:15",
    title: "Work people remember",
    type: "Panel",
    copy: "Four leaders unpack the decisions, tensions, and collaborations behind projects that moved culture forward."
  },
  {
    time: "13:30",
    title: "Breakout labs",
    type: "Workshops",
    copy: "Choose one of three hands-on rooms covering storytelling, product energy, and community-building."
  },
  {
    time: "16:00",
    title: "Make the next move",
    type: "Closing session",
    copy: "A final collective session designed to turn inspiration into a concrete next step before you leave."
  },
  {
    time: "18:00",
    title: "Signal after dark",
    type: "Social",
    copy: "Rooftop drinks, a live DJ set, visual projections, and the conversations that never fit inside the schedule."
  }
] as const;

const tickets = [
  {
    name: "Day Pass",
    price: "$149",
    note: "Full daytime experience",
    perks: ["Main-stage sessions", "Breakout lab access", "Lunch + refreshments", "Digital session notes"],
    accent: "#dfff34"
  },
  {
    name: "Full Signal",
    price: "$229",
    note: "The complete event day",
    perks: ["Everything in Day Pass", "Signal After Dark access", "Priority workshop selection", "Limited event pack"],
    accent: "#ff5b45",
    featured: true
  },
  {
    name: "Studio Pack",
    price: "$799",
    note: "Bring a team of four",
    perks: ["Four Full Signal tickets", "Reserved team seating", "Private networking table", "Team resource bundle"],
    accent: "#6ae7ff"
  }
] as const;

function Countdown() {
  const target = useMemo(() => new Date("2027-05-22T09:00:00-04:00").getTime(), []);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  const remaining = Math.max(0, target - now);
  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining / 3600000) % 24);
  const minutes = Math.floor((remaining / 60000) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3">
      {[
        [days, "Days"],
        [hours, "Hours"],
        [minutes, "Minutes"],
        [seconds, "Seconds"]
      ].map(([value, label]) => (
        <div key={label} className="rounded-[1.2rem] border border-white/12 bg-white/[0.055] px-2 py-4 text-center backdrop-blur-xl sm:px-4 sm:py-5">
          <strong className="block text-2xl font-black leading-none tracking-[-0.06em] sm:text-4xl">{String(value).padStart(2, "0")}</strong>
          <span className="mt-2 block text-[0.43rem] font-black uppercase tracking-[0.18em] text-white/42 sm:text-[0.5rem]">{label}</span>
        </div>
      ))}
    </div>
  );
}

function PillLink({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-14 items-center justify-center gap-3 rounded-full border px-7 text-[0.62rem] font-black uppercase tracking-[0.18em] transition duration-300 ${
        light
          ? "border-black/15 bg-[#dfff34] text-[#090914] hover:bg-white"
          : "border-white/18 bg-white/[0.07] text-white backdrop-blur-xl hover:border-[#dfff34] hover:bg-[#dfff34] hover:text-[#090914]"
      }`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

export function EventLaunchExperience() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSession, setActiveSession] = useState(0);

  return (
    <main className="overflow-hidden bg-[#090914] text-white">
      <section className="relative min-h-svh overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(143,78,255,.38),transparent_32%),radial-gradient(circle_at_18%_72%,rgba(255,91,69,.26),transparent_30%),linear-gradient(135deg,#090914_0%,#111125_55%,#090914_100%)]" />
        <div className="event-grid absolute inset-0 opacity-25" />
        <div className="event-orb absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[#8f4eff]/35 blur-[90px]" />
        <div className="event-orb event-orb-delay absolute -bottom-40 -left-32 h-[30rem] w-[30rem] rounded-full bg-[#ff5b45]/25 blur-[100px]" />

        <header className="relative z-40 mx-auto flex w-full max-w-[1560px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12 lg:py-7">
          <Link href="/landing-pages" className="flex items-center gap-3" aria-label="Back to landing page gallery">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-white/18 bg-white/[0.07] backdrop-blur-xl">
              <Zap className="h-5 w-5 fill-[#dfff34] text-[#dfff34]" />
            </span>
            <span>
              <strong className="block text-lg font-black tracking-[-0.05em]">SIGNAL LIVE</strong>
              <small className="mt-1 block text-[0.43rem] font-black uppercase tracking-[0.24em] text-white/42">Toronto · 2027</small>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-[0.58rem] font-black uppercase tracking-[0.19em] text-white/48 lg:flex">
            <a href="#experience" className="transition hover:text-[#dfff34]">Experience</a>
            <a href="#speakers" className="transition hover:text-[#dfff34]">Speakers</a>
            <a href="#schedule" className="transition hover:text-[#dfff34]">Schedule</a>
            <a href="#tickets" className="transition hover:text-[#dfff34]">Tickets</a>
          </nav>

          <div className="flex items-center gap-3">
            <a href="#tickets" className="hidden min-h-11 items-center gap-2 rounded-full bg-[#dfff34] px-5 text-[0.56rem] font-black uppercase tracking-[0.17em] text-[#090914] transition hover:bg-white sm:inline-flex">
              <Ticket className="h-4 w-4" /> Get tickets
            </a>
            <button type="button" onClick={() => setMenuOpen((value) => !value)} className="grid h-11 w-11 place-items-center rounded-full border border-white/14 bg-white/[0.06] lg:hidden" aria-label="Toggle menu">
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </header>

        {menuOpen ? (
          <div className="absolute inset-x-5 top-20 z-50 rounded-[1.6rem] border border-white/12 bg-[#111125]/95 p-5 shadow-2xl backdrop-blur-2xl sm:inset-x-8 lg:hidden">
            {["experience", "speakers", "schedule", "tickets"].map((item) => (
              <a key={item} href={`#${item}`} onClick={() => setMenuOpen(false)} className="flex items-center justify-between border-b border-white/10 py-4 text-sm font-black uppercase tracking-[0.16em] last:border-0">
                {item} <ChevronRight className="h-4 w-4 text-[#dfff34]" />
              </a>
            ))}
          </div>
        ) : null}

        <div className="relative z-10 mx-auto grid min-h-[calc(100svh-6rem)] max-w-[1560px] items-center gap-12 px-5 pb-12 pt-8 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:px-12 lg:pb-16">
          <div className="relative z-20">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/14 bg-white/[0.055] px-4 py-2 text-[0.52rem] font-black uppercase tracking-[0.19em] text-white/64 backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-[#ff5b45] shadow-[0_0_18px_#ff5b45]" /> May 22 · Evergreen Brick Works
            </div>
            <p className="mt-8 text-[0.62rem] font-black uppercase tracking-[0.26em] text-[#dfff34]">One room. One day. A thousand next moves.</p>
            <h1 className="mt-5 max-w-[9ch] text-[clamp(4.9rem,9.5vw,10.5rem)] font-black leading-[0.72] tracking-[-0.095em]">
              Feel the <span className="event-gradient-text">signal.</span>
            </h1>
            <p className="mt-8 max-w-xl text-base leading-8 text-white/55 sm:text-lg sm:leading-9">
              A one-day collision of design, culture, technology, and live ideas—built for people ready to make the next thing matter.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <PillLink href="#tickets" light>Reserve your spot</PillLink>
              <PillLink href="#experience">See the experience</PillLink>
            </div>
            <div className="mt-10 max-w-xl border-t border-white/12 pt-6">
              <Countdown />
            </div>
          </div>

          <div className="relative min-h-[34rem] sm:min-h-[44rem] lg:min-h-[49rem]">
            <div className="absolute inset-[3%_0_3%_6%] overflow-hidden rounded-[2.6rem] border border-white/14 bg-[#16162b] shadow-[0_40px_140px_rgba(0,0,0,.48)]">
              <img
                src="https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1800"
                alt="Crowd watching a colorful live event"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,9,20,.05),rgba(9,9,20,.18)_48%,rgba(9,9,20,.86))]" />
              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10">
                <div className="flex items-end justify-between gap-6">
                  <div>
                    <p className="text-[0.52rem] font-black uppercase tracking-[0.22em] text-[#dfff34]">Live in Toronto</p>
                    <h2 className="mt-3 max-w-[9ch] text-4xl font-black leading-[0.9] tracking-[-0.06em] sm:text-6xl">Ideas hit different in the room.</h2>
                  </div>
                  <span className="hidden h-16 w-16 shrink-0 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl sm:grid">
                    <Play className="ml-1 h-5 w-5 fill-white" />
                  </span>
                </div>
              </div>
            </div>
            <div className="event-float-card absolute left-0 top-[18%] rounded-[1.4rem] border border-black/10 bg-[#dfff34] px-5 py-4 text-[#090914] shadow-2xl">
              <p className="text-[0.46rem] font-black uppercase tracking-[0.2em] opacity-55">Tickets claimed</p>
              <strong className="mt-1 block text-4xl font-black tracking-[-0.07em]">78%</strong>
            </div>
            <div className="event-float-card event-float-card-delay absolute bottom-[14%] right-0 max-w-[13rem] rounded-[1.5rem] border border-white/14 bg-[#8f4eff]/90 p-5 shadow-2xl backdrop-blur-xl">
              <Sparkles className="h-5 w-5 text-[#dfff34]" />
              <p className="mt-4 text-lg font-black leading-tight tracking-[-0.04em]">Four stages. One electric day.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-white/10 bg-[#ff5b45] py-4 text-[#090914]">
        <div className="event-marquee flex w-max items-center gap-8 whitespace-nowrap text-[0.72rem] font-black uppercase tracking-[0.22em]">
          {[0, 1].map((group) => (
            <div key={group} className="flex items-center gap-8">
              {[
                "Live ideas",
                "Design culture",
                "Breakout labs",
                "Rooftop sessions",
                "Signal after dark",
                "Toronto 2027"
              ].map((item) => (
                <span key={`${group}-${item}`} className="flex items-center gap-8"><Zap className="h-4 w-4 fill-current" /> {item}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section id="experience" className="relative px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="event-grid absolute inset-0 opacity-10" />
        <div className="relative mx-auto max-w-[1480px]">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <div>
              <p className="text-[0.56rem] font-black uppercase tracking-[0.24em] text-[#dfff34]">Built to move you</p>
              <h2 className="mt-6 max-w-[8ch] text-[clamp(4.4rem,7.8vw,8.5rem)] font-black leading-[0.74] tracking-[-0.09em]">Not another sit-down conference.</h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-white/50 sm:text-lg sm:leading-9 lg:pb-2">
              SIGNAL is designed like a live creative system: short talks, immersive spaces, working sessions, music, food, and unexpected collisions—all built to keep the energy moving.
            </p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-12">
            <article className="group relative min-h-[34rem] overflow-hidden rounded-[2.2rem] border border-white/10 lg:col-span-7">
              <img src="https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Colorful event stage" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090914] via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                <span className="inline-flex rounded-full bg-[#dfff34] px-3 py-2 text-[0.48rem] font-black uppercase tracking-[0.18em] text-[#090914]">Main stage</span>
                <h3 className="mt-5 max-w-[8ch] text-4xl font-black leading-[0.9] tracking-[-0.06em] sm:text-6xl">Big ideas. Zero dead air.</h3>
              </div>
            </article>

            <div className="grid gap-5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
              <article className="relative overflow-hidden rounded-[2rem] bg-[#8f4eff] p-7 text-white sm:p-8">
                <Mic2 className="h-7 w-7 text-[#dfff34]" />
                <h3 className="mt-16 text-3xl font-black tracking-[-0.055em]">Breakout labs</h3>
                <p className="mt-4 max-w-sm text-sm leading-7 text-white/68">Small-room sessions where the audience becomes part of the work, not just the applause.</p>
                <div className="absolute -bottom-20 -right-16 h-48 w-48 rounded-full border-[38px] border-white/10" />
              </article>
              <article className="relative overflow-hidden rounded-[2rem] bg-[#6ae7ff] p-7 text-[#090914] sm:p-8">
                <Users className="h-7 w-7" />
                <h3 className="mt-16 text-3xl font-black tracking-[-0.055em]">The right room</h3>
                <p className="mt-4 max-w-sm text-sm leading-7 text-black/62">Founders, makers, strategists, artists, and operators who are already moving things forward.</p>
                <strong className="absolute right-7 top-7 text-5xl font-black tracking-[-0.08em]">900</strong>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section id="speakers" className="bg-[#f1f1ee] px-5 py-24 text-[#090914] sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="mx-auto max-w-[1480px]">
          <div className="flex flex-col gap-8 border-b border-black/14 pb-9 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[0.56rem] font-black uppercase tracking-[0.24em] text-[#625f68]">On the signal stage</p>
              <h2 className="mt-6 max-w-[8ch] text-[clamp(4.3rem,7.5vw,8rem)] font-black leading-[0.74] tracking-[-0.09em]">People worth listening to.</h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-black/55">No recycled keynotes. Every session is built specifically for this room, this audience, and this moment.</p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {speakers.map((speaker, index) => (
              <article key={speaker.name} className="group relative overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_26px_70px_rgba(9,9,20,.09)]">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img src={speaker.image} alt={speaker.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090914]/78 via-transparent to-transparent" />
                  <span className={`absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full text-sm font-black ${index % 2 === 0 ? "bg-[#dfff34]" : "bg-[#ff5b45]"}`}>0{index + 1}</span>
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <p className="text-[0.48rem] font-black uppercase tracking-[0.18em] text-white/56">{speaker.role}</p>
                    <h3 className="mt-3 text-3xl font-black tracking-[-0.055em]">{speaker.name}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[0.48rem] font-black uppercase tracking-[0.18em] text-black/42">Speaking on</p>
                  <p className="mt-3 text-xl font-black leading-tight tracking-[-0.04em]">{speaker.topic}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="schedule" className="relative overflow-hidden bg-[#8f4eff] px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="absolute -right-48 top-0 h-[34rem] w-[34rem] rounded-full border-[100px] border-white/[0.06]" />
        <div className="relative mx-auto grid max-w-[1480px] gap-12 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="lg:sticky lg:top-12 lg:self-start">
            <p className="text-[0.56rem] font-black uppercase tracking-[0.24em] text-[#dfff34]">The day in motion</p>
            <h2 className="mt-6 max-w-[7ch] text-[clamp(4.5rem,7.5vw,8.5rem)] font-black leading-[0.74] tracking-[-0.09em]">Every hour earns its place.</h2>
            <p className="mt-8 max-w-lg text-base leading-8 text-white/62">Move between ideas, conversations, experiments, food, music, and the kind of unexpected moments that only happen live.</p>
            <div className="mt-10 flex flex-wrap gap-3 text-[0.52rem] font-black uppercase tracking-[0.17em]">
              <span className="rounded-full border border-white/18 px-4 py-3"><CalendarDays className="mr-2 inline h-4 w-4" /> May 22</span>
              <span className="rounded-full border border-white/18 px-4 py-3"><MapPin className="mr-2 inline h-4 w-4" /> Toronto</span>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2.2rem] border border-white/14 bg-[#111125]/42 backdrop-blur-xl">
            {schedule.map((session, index) => {
              const active = activeSession === index;
              return (
                <button key={session.time} type="button" onClick={() => setActiveSession(index)} className={`grid w-full gap-4 border-b border-white/12 p-6 text-left transition last:border-0 sm:grid-cols-[5rem_1fr_auto] sm:items-start sm:p-8 ${active ? "bg-[#dfff34] text-[#090914]" : "hover:bg-white/[0.06]"}`}>
                  <span className="text-sm font-black tracking-[-0.02em]">{session.time}</span>
                  <span>
                    <span className={`text-[0.48rem] font-black uppercase tracking-[0.18em] ${active ? "text-black/48" : "text-[#dfff34]"}`}>{session.type}</span>
                    <strong className="mt-2 block text-2xl font-black tracking-[-0.045em] sm:text-3xl">{session.title}</strong>
                    <span className={`mt-3 block max-w-xl text-sm leading-7 ${active ? "text-black/62" : "text-white/48"}`}>{session.copy}</span>
                  </span>
                  <span className={`grid h-10 w-10 place-items-center rounded-full border ${active ? "border-black/16" : "border-white/16"}`}><ChevronRight className={`h-4 w-4 transition ${active ? "rotate-90" : ""}`} /></span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section id="tickets" className="relative px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="event-grid absolute inset-0 opacity-10" />
        <div className="relative mx-auto max-w-[1480px]">
          <div className="text-center">
            <p className="text-[0.56rem] font-black uppercase tracking-[0.24em] text-[#dfff34]">Choose your signal</p>
            <h2 className="mx-auto mt-6 max-w-[10ch] text-[clamp(4.5rem,8vw,9rem)] font-black leading-[0.74] tracking-[-0.095em]">Be there when it happens.</h2>
            <p className="mx-auto mt-7 max-w-xl text-base leading-8 text-white/50">Tickets are limited by room capacity. Early access pricing remains active until the next allocation sells through.</p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {tickets.map((ticket) => (
              <article key={ticket.name} className={`relative overflow-hidden rounded-[2.2rem] border p-7 sm:p-8 ${ticket.featured ? "border-[#ff5b45] bg-[#ff5b45] text-[#090914] lg:-translate-y-6" : "border-white/12 bg-white/[0.045]"}`}>
                {ticket.featured ? <span className="absolute right-6 top-6 rounded-full bg-[#090914] px-3 py-2 text-[0.46rem] font-black uppercase tracking-[0.17em] text-white">Most popular</span> : null}
                <Ticket className="h-7 w-7" style={{ color: ticket.featured ? "#090914" : ticket.accent }} />
                <p className={`mt-10 text-[0.5rem] font-black uppercase tracking-[0.2em] ${ticket.featured ? "text-black/48" : "text-white/40"}`}>{ticket.note}</p>
                <h3 className="mt-3 text-4xl font-black tracking-[-0.06em]">{ticket.name}</h3>
                <div className="mt-7 flex items-end gap-2">
                  <strong className="text-6xl font-black tracking-[-0.08em]">{ticket.price}</strong>
                  <span className={`pb-2 text-xs ${ticket.featured ? "text-black/48" : "text-white/38"}`}>CAD</span>
                </div>
                <div className={`mt-8 border-t pt-7 ${ticket.featured ? "border-black/16" : "border-white/12"}`}>
                  {ticket.perks.map((perk) => (
                    <p key={perk} className={`mt-3 flex items-center gap-3 text-sm first:mt-0 ${ticket.featured ? "text-black/68" : "text-white/56"}`}><Check className="h-4 w-4 shrink-0" style={{ color: ticket.featured ? "#090914" : ticket.accent }} /> {perk}</p>
                  ))}
                </div>
                <Link href={startHref} className={`mt-9 flex min-h-14 items-center justify-center gap-3 rounded-full text-[0.58rem] font-black uppercase tracking-[0.18em] transition ${ticket.featured ? "bg-[#090914] text-white hover:bg-white hover:text-[#090914]" : "border border-white/14 bg-white/[0.06] hover:bg-white hover:text-[#090914]"}`}>
                  Select ticket <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-16 overflow-hidden rounded-[2.6rem] bg-[#dfff34] p-7 text-[#090914] sm:p-10 lg:p-14">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-[0.54rem] font-black uppercase tracking-[0.22em] opacity-55">The room is filling</p>
                <h3 className="mt-5 max-w-[10ch] text-[clamp(3.5rem,6vw,7rem)] font-black leading-[0.77] tracking-[-0.085em]">Bring the idea. Leave with momentum.</h3>
              </div>
              <div className="lg:text-right">
                <div className="flex items-center gap-2 lg:justify-end">
                  {[0, 1, 2, 3, 4].map((item) => <Star key={item} className="h-4 w-4 fill-current" />)}
                  <span className="ml-2 text-[0.52rem] font-black uppercase tracking-[0.17em]">4.9 attendee score</span>
                </div>
                <p className="mt-5 max-w-sm text-sm leading-7 text-black/58">Join 900 curious people for one day designed to make the next move feel possible.</p>
                <Link href={startHref} className="mt-7 inline-flex min-h-14 items-center gap-3 rounded-full bg-[#090914] px-7 text-[0.6rem] font-black uppercase tracking-[0.18em] text-white transition hover:bg-[#8f4eff]">
                  Build this event page <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-9 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1480px] flex-col gap-6 text-sm text-white/42 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 text-white"><Zap className="h-4 w-4 fill-[#dfff34] text-[#dfff34]" /><strong className="font-black tracking-[-0.035em]">SIGNAL LIVE</strong></div>
          <p>Event launch landing-page concept by Gridspell Studio.</p>
          <Link href="/landing-pages" className="font-bold text-white transition hover:text-[#dfff34]">View more demos</Link>
        </div>
      </footer>

      <style jsx global>{`
        .event-grid {
          background-image: linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px);
          background-size: 42px 42px;
        }
        .event-gradient-text {
          color: transparent;
          background: linear-gradient(90deg, #dfff34 0%, #6ae7ff 43%, #8f4eff 72%, #ff5b45 100%);
          -webkit-background-clip: text;
          background-clip: text;
        }
        .event-orb { animation: event-pulse 7s ease-in-out infinite; }
        .event-orb-delay { animation-delay: -3s; }
        .event-float-card { animation: event-float 5.5s ease-in-out infinite; }
        .event-float-card-delay { animation-delay: -2.5s; }
        .event-marquee { animation: event-marquee 24s linear infinite; }
        @keyframes event-pulse { 0%,100% { transform: scale(.92); opacity:.58; } 50% { transform: scale(1.08); opacity:.9; } }
        @keyframes event-float { 0%,100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-13px) rotate(1deg); } }
        @keyframes event-marquee { to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) {
          .event-orb, .event-float-card, .event-marquee { animation: none !important; }
          html { scroll-behavior: auto !important; }
        }
      `}</style>
    </main>
  );
}
