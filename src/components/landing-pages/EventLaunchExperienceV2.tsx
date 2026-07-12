"use client";

import Image from "next/image";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, CalendarDays, Check, ChevronRight, MapPin, Menu, Sparkles, Star, Ticket, Users, X, Zap } from "lucide-react";

const startHref = "/start-project?package=landing-page&source=event-launch&design=Signal+Live+Event";

const speakers = [
  ["Maya Chen", "Creative director", "Building work people feel", "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1200"],
  ["Andre Lewis", "Founder · Northline", "Turning momentum into a movement", "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1200"],
  ["Sofia Reyes", "Product lead · Assembly", "Ideas that survive the room", "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1200"],
  ["Noah Bennett", "Culture strategist", "Designing unforgettable moments", "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200"]
] as const;

const schedule = [
  ["09:00", "Arrival", "Doors open + live breakfast set", "Coffee, music, installations, and the first chance to meet the room."],
  ["10:00", "Main stage", "The opening signal", "A fast visual opening about creative courage and ideas becoming public."],
  ["11:15", "Panel", "Work people remember", "Four leaders unpack the decisions behind projects that moved culture forward."],
  ["13:30", "Workshops", "Breakout labs", "Hands-on rooms covering storytelling, product energy, and community-building."],
  ["16:00", "Closing", "Make the next move", "Turn inspiration into one concrete step before leaving the room."],
  ["18:00", "Social", "Signal after dark", "Rooftop drinks, live music, projections, and the conversations after the schedule."]
] as const;

const tickets: Array<{
  name: string;
  price: string;
  note: string;
  perks: string[];
  accent: string;
  featured: boolean;
}> = [
  { name: "Day Pass", price: "$149", note: "Full daytime experience", perks: ["Main-stage sessions", "Breakout labs", "Lunch + refreshments", "Digital session notes"], accent: "#dfff34", featured: false },
  { name: "Full Signal", price: "$229", note: "The complete event day", perks: ["Everything in Day Pass", "After Dark access", "Priority workshop selection", "Limited event pack"], accent: "#ff5b45", featured: true },
  { name: "Studio Pack", price: "$799", note: "Bring a team of four", perks: ["Four Full Signal tickets", "Reserved seating", "Private networking table", "Team resource bundle"], accent: "#6ae7ff", featured: false }
];

function Countdown() {
  const target = useMemo(() => new Date("2027-05-22T09:00:00-04:00").getTime(), []);
  const [now, setNow] = useState(0);
  useEffect(() => {
    const updateNow = () => setNow(Date.now());
    const initialId = window.setTimeout(updateNow, 0);
    const id = window.setInterval(updateNow, 1000);
    return () => {
      window.clearTimeout(initialId);
      window.clearInterval(id);
    };
  }, []);
  const left = Math.max(0, target - (now || target));
  const values: Array<[number, string]> = [
    [Math.floor(left / 86400000), "Days"],
    [Math.floor((left / 3600000) % 24), "Hours"],
    [Math.floor((left / 60000) % 60), "Minutes"],
    [Math.floor((left / 1000) % 60), "Seconds"]
  ];
  return <div className="grid grid-cols-4 gap-2 sm:gap-3">{values.map(([value, label]) => <div key={label} className="rounded-2xl border border-white/12 bg-white/[.055] px-2 py-4 text-center backdrop-blur-xl"><strong className="block text-2xl font-black tracking-[-.06em] sm:text-4xl">{String(value).padStart(2,"0")}</strong><span className="mt-2 block text-[.44rem] font-black uppercase tracking-[.18em] text-white/42">{label}</span></div>)}</div>;
}

export function EventLaunchExperienceV2() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSession, setActiveSession] = useState(0);

  return (
    <main className="overflow-hidden bg-[#090914] text-white">
      <section className="relative min-h-svh overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(143,78,255,.38),transparent_32%),radial-gradient(circle_at_18%_72%,rgba(255,91,69,.25),transparent_30%),linear-gradient(135deg,#090914,#111125_55%,#090914)]" />
        <div className="signal-grid absolute inset-0 opacity-25" />
        <div className="signal-orb absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[#8f4eff]/35 blur-[90px]" />
        <div className="signal-orb signal-delay absolute -bottom-40 -left-32 h-[30rem] w-[30rem] rounded-full bg-[#ff5b45]/25 blur-[100px]" />

        <header className="relative z-40 mx-auto flex max-w-[1560px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12 lg:py-7">
          <Link href="/landing-pages" className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-full border border-white/18 bg-white/[.07]"><Zap className="h-5 w-5 fill-[#dfff34] text-[#dfff34]" /></span><span><strong className="block text-lg font-black tracking-[-.05em]">SIGNAL LIVE</strong><small className="block text-[.43rem] font-black uppercase tracking-[.24em] text-white/42">Toronto · 2027</small></span></Link>
          <nav className="hidden gap-8 text-[.58rem] font-black uppercase tracking-[.19em] text-white/48 lg:flex">{["experience","speakers","schedule","tickets"].map(item => <a key={item} href={`#${item}`} className="transition hover:text-[#dfff34]">{item}</a>)}</nav>
          <div className="flex items-center gap-3"><a href="#tickets" className="hidden min-h-11 items-center gap-2 rounded-full bg-[#dfff34] px-5 text-[.56rem] font-black uppercase tracking-[.17em] text-[#090914] sm:inline-flex"><Ticket className="h-4 w-4" /> Get tickets</a><button onClick={() => setMenuOpen(v => !v)} className="grid h-11 w-11 place-items-center rounded-full border border-white/14 bg-white/[.06] lg:hidden" aria-label="Toggle menu">{menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button></div>
        </header>

        {menuOpen && <div className="absolute inset-x-5 top-20 z-50 rounded-3xl border border-white/12 bg-[#111125]/95 p-5 backdrop-blur-2xl lg:hidden">{["experience","speakers","schedule","tickets"].map(item => <a key={item} href={`#${item}`} onClick={() => setMenuOpen(false)} className="flex items-center justify-between border-b border-white/10 py-4 text-sm font-black uppercase tracking-[.16em] last:border-0">{item}<ChevronRight className="h-4 w-4 text-[#dfff34]" /></a>)}</div>}

        <div className="relative z-10 mx-auto grid min-h-[calc(100svh-6rem)] max-w-[1560px] items-center gap-12 px-5 pb-12 pt-8 sm:px-8 lg:grid-cols-[.92fr_1.08fr] lg:px-12 lg:pb-16">
          <div className="relative z-20">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/14 bg-white/[.055] px-4 py-2 text-[.52rem] font-black uppercase tracking-[.19em] text-white/64"><span className="h-2 w-2 rounded-full bg-[#ff5b45] shadow-[0_0_18px_#ff5b45]" /> May 22 · Evergreen Brick Works</div>
            <p className="mt-8 text-[.62rem] font-black uppercase tracking-[.26em] text-[#dfff34]">One room. One day. A thousand next moves.</p>
            <h1 className="mt-5 max-w-[9ch] text-[clamp(4.9rem,9.5vw,10.5rem)] font-black leading-[.72] tracking-[-.095em]">Feel the <span className="signal-gradient">signal.</span></h1>
            <p className="mt-8 max-w-xl text-base leading-8 text-white/55 sm:text-lg sm:leading-9">A one-day collision of design, culture, technology, and live ideas—built for people ready to make the next thing matter.</p>
            <div className="mt-9 flex flex-wrap gap-3"><a href="#tickets" className="inline-flex min-h-14 items-center gap-3 rounded-full bg-[#dfff34] px-7 text-[.62rem] font-black uppercase tracking-[.18em] text-[#090914]">Reserve your spot <ArrowRight className="h-4 w-4" /></a><a href="#experience" className="inline-flex min-h-14 items-center gap-3 rounded-full border border-white/18 bg-white/[.07] px-7 text-[.62rem] font-black uppercase tracking-[.18em]">See the experience <ArrowRight className="h-4 w-4" /></a></div>
            <div className="mt-10 max-w-xl border-t border-white/12 pt-6"><Countdown /></div>
          </div>

          <div className="relative min-h-[34rem] sm:min-h-[44rem] lg:min-h-[49rem]">
            <div className="absolute inset-[3%_0_3%_6%] overflow-hidden rounded-[2.6rem] border border-white/14 bg-[#16162b] shadow-[0_40px_140px_rgba(0,0,0,.48)]"><Image width={1600} height={1000} sizes="100vw" unoptimized src="https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1800" alt="Crowd at a colorful live event" className="h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#090914] via-transparent to-transparent" /><div className="absolute inset-x-0 bottom-0 p-7 sm:p-10"><p className="text-[.52rem] font-black uppercase tracking-[.22em] text-[#dfff34]">Live in Toronto</p><h2 className="mt-3 max-w-[9ch] text-4xl font-black leading-[.9] tracking-[-.06em] sm:text-6xl">Ideas hit different in the room.</h2></div></div>
            <div className="signal-float absolute left-0 top-[18%] rounded-2xl bg-[#dfff34] px-5 py-4 text-[#090914] shadow-2xl"><p className="text-[.46rem] font-black uppercase tracking-[.2em] opacity-55">Tickets claimed</p><strong className="block text-4xl font-black">78%</strong></div>
            <div className="signal-float signal-delay absolute bottom-[14%] right-0 max-w-[13rem] rounded-3xl bg-[#8f4eff]/90 p-5 shadow-2xl"><Sparkles className="h-5 w-5 text-[#dfff34]" /><p className="mt-4 text-lg font-black leading-tight">Four stages. One electric day.</p></div>
          </div>
        </div>
      </section>

      <div className="overflow-hidden bg-[#ff5b45] py-4 text-[#090914]"><div className="signal-marquee flex w-max gap-8 whitespace-nowrap text-[.72rem] font-black uppercase tracking-[.22em]">{[0,1].map(group => <div key={group} className="flex gap-8">{["Live ideas","Design culture","Breakout labs","Rooftop sessions","Signal after dark","Toronto 2027"].map(item => <span key={`${group}-${item}`} className="flex items-center gap-8"><Zap className="h-4 w-4 fill-current" />{item}</span>)}</div>)}</div></div>

      <section id="experience" className="relative px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40"><div className="signal-grid absolute inset-0 opacity-10" /><div className="relative mx-auto max-w-[1480px]"><div className="grid gap-10 lg:grid-cols-[.78fr_1.22fr] lg:items-end"><div><p className="text-[.56rem] font-black uppercase tracking-[.24em] text-[#dfff34]">Built to move you</p><h2 className="mt-6 max-w-[8ch] text-[clamp(4.4rem,7.8vw,8.5rem)] font-black leading-[.74] tracking-[-.09em]">Not another sit-down conference.</h2></div><p className="max-w-2xl text-base leading-8 text-white/50 sm:text-lg sm:leading-9">Short talks, immersive spaces, working sessions, music, food, and unexpected collisions—all designed to keep the energy moving.</p></div><div className="mt-14 grid gap-5 lg:grid-cols-12"><article className="group relative min-h-[34rem] overflow-hidden rounded-[2.2rem] border border-white/10 lg:col-span-7"><Image width={1600} height={1000} sizes="100vw" unoptimized src="https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Colorful event stage" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#090914] via-transparent to-transparent" /><div className="absolute bottom-0 p-8"><span className="rounded-full bg-[#dfff34] px-3 py-2 text-[.48rem] font-black uppercase text-[#090914]">Main stage</span><h3 className="mt-5 max-w-[8ch] text-5xl font-black leading-[.9] tracking-[-.06em]">Big ideas. Zero dead air.</h3></div></article><div className="grid gap-5 lg:col-span-5"><article className="relative overflow-hidden rounded-[2rem] bg-[#8f4eff] p-8"><Zap className="h-7 w-7 text-[#dfff34]" /><h3 className="mt-16 text-3xl font-black">Breakout labs</h3><p className="mt-4 text-sm leading-7 text-white/68">Small-room sessions where the audience becomes part of the work.</p></article><article className="relative overflow-hidden rounded-[2rem] bg-[#6ae7ff] p-8 text-[#090914]"><Users className="h-7 w-7" /><h3 className="mt-16 text-3xl font-black">The right room</h3><p className="mt-4 text-sm leading-7 text-black/62">Founders, makers, strategists, artists, and operators already moving things forward.</p><strong className="absolute right-7 top-7 text-5xl font-black">900</strong></article></div></div></div></section>

      <section id="speakers" className="bg-[#f1f1ee] px-5 py-24 text-[#090914] sm:px-8 sm:py-32 lg:px-12 lg:py-40"><div className="mx-auto max-w-[1480px]"><p className="text-[.56rem] font-black uppercase tracking-[.24em] text-black/50">On the signal stage</p><h2 className="mt-6 max-w-[8ch] text-[clamp(4.3rem,7.5vw,8rem)] font-black leading-[.74] tracking-[-.09em]">People worth listening to.</h2><div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{speakers.map(([name,role,topic,image],index) => <article key={name} className="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-xl"><div className="relative aspect-[4/5] overflow-hidden"><Image width={1600} height={1000} sizes="100vw" unoptimized src={image} alt={name} className="h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#090914]/80 via-transparent to-transparent" /><span className={`absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full text-sm font-black ${index%2===0?"bg-[#dfff34]":"bg-[#ff5b45]"}`}>0{index+1}</span><div className="absolute bottom-0 p-6 text-white"><p className="text-[.48rem] font-black uppercase tracking-[.18em] text-white/56">{role}</p><h3 className="mt-3 text-3xl font-black">{name}</h3></div></div><div className="p-6"><p className="text-[.48rem] font-black uppercase tracking-[.18em] text-black/42">Speaking on</p><p className="mt-3 text-xl font-black leading-tight">{topic}</p></div></article>)}</div></div></section>

      <section id="schedule" className="relative bg-[#8f4eff] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40"><div className="mx-auto grid max-w-[1480px] gap-12 lg:grid-cols-[.82fr_1.18fr]"><div><p className="text-[.56rem] font-black uppercase tracking-[.24em] text-[#dfff34]">The day in motion</p><h2 className="mt-6 max-w-[7ch] text-[clamp(4.5rem,7.5vw,8.5rem)] font-black leading-[.74] tracking-[-.09em]">Every hour earns its place.</h2><p className="mt-8 max-w-lg text-base leading-8 text-white/62">Move between ideas, experiments, food, music, and unexpected live moments.</p><div className="mt-8 flex gap-3 text-[.52rem] font-black uppercase tracking-[.17em]"><span className="rounded-full border border-white/18 px-4 py-3"><CalendarDays className="mr-2 inline h-4 w-4" />May 22</span><span className="rounded-full border border-white/18 px-4 py-3"><MapPin className="mr-2 inline h-4 w-4" />Toronto</span></div></div><div className="overflow-hidden rounded-[2.2rem] border border-white/14 bg-[#111125]/42">{schedule.map(([time,type,title,copy],index) => {const active=activeSession===index;return <button key={time} onClick={() => setActiveSession(index)} className={`grid w-full gap-4 border-b border-white/12 p-6 text-left transition sm:grid-cols-[5rem_1fr_auto] sm:p-8 ${active?"bg-[#dfff34] text-[#090914]":"hover:bg-white/[.06]"}`}><span className="font-black">{time}</span><span><span className={`text-[.48rem] font-black uppercase tracking-[.18em] ${active?"text-black/48":"text-[#dfff34]"}`}>{type}</span><strong className="mt-2 block text-2xl font-black">{title}</strong><span className={`mt-3 block text-sm leading-7 ${active?"text-black/62":"text-white/48"}`}>{copy}</span></span><span className="grid h-10 w-10 place-items-center rounded-full border border-current/20"><ChevronRight className={`h-4 w-4 ${active?"rotate-90":""}`} /></span></button>})}</div></div></section>

      <section id="tickets" className="relative px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40"><div className="signal-grid absolute inset-0 opacity-10" /><div className="relative mx-auto max-w-[1480px]"><div className="text-center"><p className="text-[.56rem] font-black uppercase tracking-[.24em] text-[#dfff34]">Choose your signal</p><h2 className="mx-auto mt-6 max-w-[10ch] text-[clamp(4.5rem,8vw,9rem)] font-black leading-[.74] tracking-[-.095em]">Be there when it happens.</h2></div><div className="mt-14 grid gap-5 lg:grid-cols-3">{tickets.map(ticket => <article key={ticket.name} className={`relative rounded-[2.2rem] border p-8 ${ticket.featured?"border-[#ff5b45] bg-[#ff5b45] text-[#090914] lg:-translate-y-6":"border-white/12 bg-white/[.045]"}`}>{ticket.featured&&<span className="absolute right-6 top-6 rounded-full bg-[#090914] px-3 py-2 text-[.46rem] font-black uppercase tracking-[.17em] text-white">Most popular</span>}<Ticket className="h-7 w-7" style={{color:ticket.featured?"#090914":ticket.accent}} /><p className={`mt-10 text-[.5rem] font-black uppercase tracking-[.2em] ${ticket.featured?"text-black/48":"text-white/40"}`}>{ticket.note}</p><h3 className="mt-3 text-4xl font-black">{ticket.name}</h3><strong className="mt-7 block text-6xl font-black tracking-[-.08em]">{ticket.price}</strong><div className={`mt-8 border-t pt-7 ${ticket.featured?"border-black/16":"border-white/12"}`}>{ticket.perks.map(perk => <p key={perk} className="mt-3 flex items-center gap-3 text-sm first:mt-0"><Check className="h-4 w-4" />{perk}</p>)}</div><Link href={startHref} className={`mt-9 flex min-h-14 items-center justify-center gap-3 rounded-full text-[.58rem] font-black uppercase tracking-[.18em] ${ticket.featured?"bg-[#090914] text-white":"border border-white/14 bg-white/[.06]"}`}>Select ticket <ArrowRight className="h-4 w-4" /></Link></article>)}</div><div className="mt-16 rounded-[2.6rem] bg-[#dfff34] p-8 text-[#090914] lg:p-14"><div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center"><h3 className="max-w-[10ch] text-[clamp(3.5rem,6vw,7rem)] font-black leading-[.77] tracking-[-.085em]">Bring the idea. Leave with momentum.</h3><div><div className="flex gap-1">{[0,1,2,3,4].map(i=><Star key={i} className="h-4 w-4 fill-current" />)}</div><p className="mt-5 max-w-sm text-sm leading-7 text-black/58">Join 900 curious people for one day built to make the next move feel possible.</p><Link href={startHref} className="mt-7 inline-flex min-h-14 items-center gap-3 rounded-full bg-[#090914] px-7 text-[.6rem] font-black uppercase tracking-[.18em] text-white">Build this event page <ArrowRight className="h-4 w-4" /></Link></div></div></div></div></section>

      <footer className="border-t border-white/10 px-5 py-9"><div className="mx-auto flex max-w-[1480px] flex-col gap-5 text-sm text-white/42 sm:flex-row sm:justify-between"><strong className="text-white">SIGNAL LIVE</strong><p>Event launch concept by Gridspell Studio.</p><Link href="/landing-pages" className="text-white">View more demos</Link></div></footer>

      <style jsx global>{`
        .signal-grid{background-image:linear-gradient(rgba(255,255,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.045) 1px,transparent 1px);background-size:42px 42px}.signal-gradient{color:transparent;background:linear-gradient(90deg,#dfff34,#6ae7ff 43%,#8f4eff 72%,#ff5b45);-webkit-background-clip:text;background-clip:text}.signal-orb{animation:signal-pulse 7s ease-in-out infinite}.signal-delay{animation-delay:-3s}.signal-float{animation:signal-float 5.5s ease-in-out infinite}.signal-marquee{animation:signal-marquee 24s linear infinite}@keyframes signal-pulse{0%,100%{transform:scale(.92);opacity:.58}50%{transform:scale(1.08);opacity:.9}}@keyframes signal-float{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-13px) rotate(1deg)}}@keyframes signal-marquee{to{transform:translateX(-50%)}}@media(prefers-reduced-motion:reduce){.signal-orb,.signal-float,.signal-marquee{animation:none!important}}
      `}</style>
    </main>
  );
}
