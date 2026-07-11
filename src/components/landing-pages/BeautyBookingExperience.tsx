"use client";

import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Heart,
  Menu,
  Pause,
  Play,
  Quote,
  Scissors,
  Sparkles,
  Star,
  X,
  type LucideIcon
} from "lucide-react";

const startHref =
  "/start-project?package=landing-page&source=beauty-booking&design=Modern+Beauty+Booking";

type ServiceKey = "skin" | "brows" | "lashes" | "ritual";

type Service = {
  key: ServiceKey;
  number: string;
  title: string;
  label: string;
  description: string;
  duration: string;
  price: string;
  image: string;
  inclusions: string[];
  Icon: LucideIcon;
};

const services: Service[] = [
  {
    key: "skin",
    number: "01",
    title: "The signature facial",
    label: "Skin ritual",
    description:
      "A deeply restorative facial tailored to your skin, combining gentle resurfacing, sculpting massage, hydration, and a calm finish.",
    duration: "75 min",
    price: "From $185",
    image:
      "https://images.pexels.com/photos/3764014/pexels-photo-3764014.jpeg?auto=compress&cs=tinysrgb&w=1800",
    inclusions: ["Skin consultation", "Custom treatment", "Home-care notes"],
    Icon: Sparkles
  },
  {
    key: "brows",
    number: "02",
    title: "Soft structure brows",
    label: "Brow design",
    description:
      "Shape, tone, and balance designed around your natural growth pattern for brows that feel polished without looking overdone.",
    duration: "45 min",
    price: "From $95",
    image:
      "https://images.pexels.com/photos/3373716/pexels-photo-3373716.jpeg?auto=compress&cs=tinysrgb&w=1800",
    inclusions: ["Mapping and shape", "Custom tint", "Finishing treatment"],
    Icon: Scissors
  },
  {
    key: "lashes",
    number: "03",
    title: "Lifted lash edit",
    label: "Lash treatment",
    description:
      "A soft lift and tint that opens the eye while keeping the result light, clean, and completely wearable.",
    duration: "60 min",
    price: "From $120",
    image:
      "https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg?auto=compress&cs=tinysrgb&w=1800",
    inclusions: ["Lash consultation", "Lift and tint", "Conditioning finish"],
    Icon: Heart
  },
  {
    key: "ritual",
    number: "04",
    title: "The full studio ritual",
    label: "Complete appointment",
    description:
      "A considered two-hour appointment that brings skin, brows, and finishing details together before an event or seasonal reset.",
    duration: "120 min",
    price: "From $285",
    image:
      "https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compress&cs=tinysrgb&w=1800",
    inclusions: ["Facial treatment", "Brow refinement", "Finishing consultation"],
    Icon: Star
  }
];

const reviews = [
  {
    quote: "The whole appointment felt thoughtful—from the lighting and music to the way every step was explained.",
    name: "Amelia S.",
    service: "Signature facial"
  },
  {
    quote: "My brows look like mine, just cleaner and more balanced. Exactly what I hoped for.",
    name: "Nora K.",
    service: "Brow design"
  },
  {
    quote: "The result was beautiful, but the calm, unhurried experience is what made me rebook immediately.",
    name: "Maya R.",
    service: "Full studio ritual"
  }
] as const;

function ActionLink({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-[3.2rem] items-center justify-center gap-3 border px-6 text-[0.64rem] font-black uppercase tracking-[0.2em] transition ${
        light
          ? "border-white/35 text-white hover:bg-white hover:text-[#3b241f]"
          : "border-[#3b241f] bg-[#3b241f] text-white hover:border-[#b7644e] hover:bg-[#b7644e]"
      }`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

function StudioMark() {
  return (
    <span className="flex items-center gap-3">
      <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-current/25">
        <span className="absolute h-8 w-8 rounded-[45%_55%_38%_62%] border border-current/55" />
        <span className="h-2 w-2 rounded-full bg-[#c9785d]" />
      </span>
      <span>
        <strong className="block font-display text-xl font-semibold leading-none tracking-[-0.06em]">SORA</strong>
        <small className="mt-1 block text-[0.46rem] font-black uppercase tracking-[0.25em] opacity-55">Beauty atelier</small>
      </span>
    </span>
  );
}

export function BeautyBookingExperience() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState<ServiceKey>("skin");

  const active = services.find((service) => service.key === activeService) ?? services[0];
  const ActiveIcon = active.Icon;

  const toggleVideo = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      await video.play().catch(() => undefined);
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <main className="overflow-hidden bg-[#f6eee6] text-[#3b241f]">
      <section className="relative min-h-svh overflow-hidden bg-[#f6eee6]">
        <header className="relative z-40 mx-auto flex w-full max-w-[1560px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12 lg:py-7">
          <Link href="/landing-pages" aria-label="Back to landing page gallery">
            <StudioMark />
          </Link>

          <nav className="hidden items-center gap-8 text-[0.61rem] font-black uppercase tracking-[0.19em] text-[#3b241f]/58 lg:flex">
            <a className="transition hover:text-[#b7644e]" href="#services">Treatments</a>
            <a className="transition hover:text-[#b7644e]" href="#studio">The studio</a>
            <a className="transition hover:text-[#b7644e]" href="#artist">Artist</a>
            <a className="transition hover:text-[#b7644e]" href="#reviews">Reviews</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="#book"
              className="hidden min-h-11 items-center gap-3 rounded-full border border-[#3b241f]/16 bg-white/55 px-5 text-[0.6rem] font-black uppercase tracking-[0.18em] shadow-[0_14px_38px_rgba(59,36,31,0.07)] backdrop-blur-xl transition hover:border-[#b7644e] hover:text-[#b7644e] sm:inline-flex"
            >
              <CalendarDays className="h-4 w-4" />
              Book a visit
            </Link>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full border border-[#3b241f]/18 bg-white/55 backdrop-blur-xl lg:hidden"
              onClick={() => setMenuOpen((value) => !value)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </header>

        {menuOpen ? (
          <div className="absolute inset-x-4 top-20 z-50 rounded-[1.75rem] border border-[#3b241f]/12 bg-[#fffaf5]/96 p-7 shadow-[0_30px_90px_rgba(59,36,31,.16)] backdrop-blur-2xl sm:inset-x-8 lg:hidden">
            <nav className="grid gap-5 font-display text-3xl font-medium tracking-[-0.05em]">
              <a href="#services" onClick={() => setMenuOpen(false)}>Treatments</a>
              <a href="#studio" onClick={() => setMenuOpen(false)}>The studio</a>
              <a href="#artist" onClick={() => setMenuOpen(false)}>Artist</a>
              <a href="#reviews" onClick={() => setMenuOpen(false)}>Reviews</a>
              <a className="text-[#b7644e]" href="#book" onClick={() => setMenuOpen(false)}>Book a visit</a>
            </nav>
          </div>
        ) : null}

        <div className="mx-auto grid min-h-[calc(100svh-5.5rem)] w-full max-w-[1560px] gap-7 px-5 pb-5 sm:px-8 sm:pb-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12 lg:pb-12">
          <div className="relative flex flex-col justify-center overflow-hidden rounded-[2rem] bg-[#edc7b5] px-6 py-14 sm:px-10 lg:px-12 lg:py-20">
            <div aria-hidden="true" className="absolute -right-20 -top-24 h-72 w-72 rounded-full border-[50px] border-white/15" />
            <div aria-hidden="true" className="absolute -bottom-20 -left-16 h-56 w-56 rounded-[42%_58%_52%_48%] bg-[#c9785d]/22 blur-2xl" />

            <div className="relative z-10">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#3b241f]/12 bg-white/42 px-3 py-2 text-[0.56rem] font-black uppercase tracking-[0.2em] text-[#6f3e32] backdrop-blur-xl">
                <span className="h-1.5 w-1.5 rounded-full bg-[#b7644e] shadow-[0_0_0_5px_rgba(183,100,78,.10)]" />
                New guest appointments available
              </div>

              <h1 className="mt-8 max-w-[9ch] font-display text-[clamp(4.5rem,8.4vw,9.8rem)] font-medium leading-[0.76] tracking-[-0.085em]">
                Beauty, but make it feel like you.
              </h1>

              <p className="mt-8 max-w-xl text-base leading-8 text-[#624840] sm:text-lg sm:leading-9">
                Thoughtful skin, brow, and lash treatments designed to enhance what is already yours—inside a studio made for slowing down.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <ActionLink href="#book">Reserve your time</ActionLink>
                <Link
                  href="#services"
                  className="group inline-flex min-h-[3.2rem] items-center gap-3 px-2 text-[0.64rem] font-black uppercase tracking-[0.19em]"
                >
                  Explore treatments
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              <div className="mt-12 grid max-w-xl grid-cols-3 border-y border-[#3b241f]/13 py-6">
                <div>
                  <strong className="font-display text-3xl font-semibold tracking-[-0.055em] sm:text-4xl">4.9</strong>
                  <p className="mt-2 text-[0.5rem] font-black uppercase tracking-[0.15em] text-[#7b5c53]">Guest rating</p>
                </div>
                <div className="border-x border-[#3b241f]/11 px-5">
                  <strong className="font-display text-3xl font-semibold tracking-[-0.055em] sm:text-4xl">1:1</strong>
                  <p className="mt-2 text-[0.5rem] font-black uppercase tracking-[0.15em] text-[#7b5c53]">Private care</p>
                </div>
                <div className="pl-5">
                  <strong className="font-display text-3xl font-semibold tracking-[-0.055em] sm:text-4xl">24h</strong>
                  <p className="mt-2 text-[0.5rem] font-black uppercase tracking-[0.15em] text-[#7b5c53]">Reply standard</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative min-h-[68svh] overflow-hidden rounded-[2rem] bg-[#c9a28d] lg:min-h-0">
            <video
              ref={videoRef}
              className="beauty-hero-video absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=2200"
              aria-hidden="true"
            >
              <source src="https://videos.pexels.com/video-files/3998266/3998266-hd_1920_1080_25fps.mp4" type="video/mp4" />
              <source src="https://www.pexels.com/download/video/3998266/" type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(48,25,20,.02),rgba(48,25,20,.04)_50%,rgba(48,25,20,.64)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(255,239,226,.24),transparent_34%)]" />

            <div className="absolute left-5 top-5 rounded-[1.4rem] border border-white/35 bg-[#fff7ef]/75 px-4 py-3 text-[#3b241f] shadow-[0_18px_45px_rgba(59,36,31,.12)] backdrop-blur-xl sm:left-7 sm:top-7">
              <p className="text-[0.5rem] font-black uppercase tracking-[0.2em] text-[#9b5746]">The Sora ritual</p>
              <p className="mt-1 font-display text-xl font-semibold tracking-[-0.04em]">Soft detail. Beautiful restraint.</p>
            </div>

            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 sm:bottom-7 sm:left-7 sm:right-7">
              <div className="hidden max-w-[19rem] rounded-[1.4rem] border border-white/25 bg-[#3b241f]/52 p-4 text-white backdrop-blur-xl sm:block">
                <p className="text-[0.5rem] font-black uppercase tracking-[0.18em] text-white/54">Studio philosophy</p>
                <p className="mt-2 font-display text-2xl font-medium leading-tight tracking-[-0.045em]">Nothing rushed. Nothing excessive.</p>
              </div>
              <button
                type="button"
                onClick={toggleVideo}
                className="ml-auto grid h-12 w-12 place-items-center rounded-full border border-white/35 bg-white/14 text-white backdrop-blur-xl transition hover:bg-white hover:text-[#3b241f]"
                aria-label={playing ? "Pause background video" : "Play background video"}
              >
                {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#3b241f]/10 bg-[#fff9f3]/75 px-5 py-5 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1450px] gap-4 md:grid-cols-4">
          {[
            [Sparkles, "Tailored treatment", "Every appointment begins with you"],
            [Clock3, "Unhurried time", "A calm pace from start to finish"],
            [Check, "Transparent pricing", "Clear services and no surprise add-ons"],
            [Heart, "Natural results", "Refined, wearable, and still recognizably you"]
          ].map(([Icon, title, copy]) => {
            const TrustIcon = Icon as LucideIcon;
            return (
              <div key={String(title)} className="flex items-center gap-3 py-3 md:border-r md:border-[#3b241f]/10 md:pr-5 md:last:border-r-0">
                <TrustIcon className="h-5 w-5 shrink-0 text-[#b7644e]" />
                <div>
                  <p className="text-[0.58rem] font-black uppercase tracking-[0.15em]">{String(title)}</p>
                  <p className="mt-1 text-xs text-[#79645d]">{String(copy)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="services" className="px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="mx-auto max-w-[1450px]">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <p className="text-[0.58rem] font-black uppercase tracking-[0.24em] text-[#a45f4e]">The treatment edit</p>
              <h2 className="mt-6 max-w-[8ch] font-display text-[clamp(4rem,7vw,8rem)] font-medium leading-[0.78] tracking-[-0.075em]">
                A smaller menu, done beautifully.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-8 text-[#6c5952] lg:justify-self-end lg:pb-3 sm:text-lg sm:leading-9">
              Each service is intentionally focused, giving enough time for thoughtful consultation, careful detail, and a result that never feels generic.
            </p>
          </div>

          <div className="mt-14 grid overflow-hidden rounded-[2.2rem] border border-[#3b241f]/12 bg-[#fffaf5] shadow-[0_34px_90px_rgba(84,48,39,.08)] lg:grid-cols-[0.82fr_1.18fr]">
            <div className="border-b border-[#3b241f]/12 lg:border-b-0 lg:border-r">
              {services.map((service) => (
                <button
                  key={service.key}
                  type="button"
                  onMouseEnter={() => setActiveService(service.key)}
                  onFocus={() => setActiveService(service.key)}
                  onClick={() => setActiveService(service.key)}
                  className={`group grid w-full grid-cols-[3rem_1fr_auto] items-center gap-4 border-b border-[#3b241f]/10 py-7 pr-5 text-left transition last:border-b-0 ${
                    activeService === service.key ? "bg-[#edc7b5] pl-5" : "hover:bg-[#f8eee7] hover:pl-3"
                  }`}
                  aria-pressed={activeService === service.key}
                >
                  <span className="text-[0.54rem] font-black tracking-[0.16em] text-[#886e65]">{service.number}</span>
                  <span className="font-display text-2xl font-semibold tracking-[-0.045em] sm:text-3xl">{service.title}</span>
                  <ChevronRight className={`h-4 w-4 transition ${activeService === service.key ? "opacity-100" : "-translate-x-2 opacity-25"}`} />
                </button>
              ))}
            </div>

            <div className="relative min-h-[42rem] overflow-hidden">
              <img src={active.image} alt={active.title} className="absolute inset-0 h-full w-full object-cover transition duration-700" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(44,25,20,.04),rgba(44,25,20,.12)_42%,rgba(44,25,20,.88)_100%)]" />
              <div className="absolute left-5 top-5 rounded-full border border-white/28 bg-[#3b241f]/25 px-4 py-2 text-white backdrop-blur-xl sm:left-8 sm:top-8">
                <p className="text-[0.52rem] font-black uppercase tracking-[0.22em]">{active.label}</p>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-9 lg:p-12">
                <ActiveIcon className="h-6 w-6 text-[#f3bca5]" />
                <h3 className="mt-5 max-w-[9ch] font-display text-[clamp(3.5rem,6vw,6.5rem)] font-medium leading-[0.78] tracking-[-0.07em]">{active.title}</h3>
                <p className="mt-6 max-w-xl text-base leading-8 text-white/68">{active.description}</p>
                <div className="mt-7 flex flex-wrap gap-3 text-[0.56rem] font-black uppercase tracking-[0.16em] text-white/62">
                  <span className="rounded-full border border-white/22 px-3 py-2">{active.duration}</span>
                  <span className="rounded-full border border-white/22 px-3 py-2">{active.price}</span>
                </div>
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {active.inclusions.map((item, index) => (
                    <div key={item} className="border-t border-white/24 pt-4">
                      <span className="text-[0.48rem] font-black uppercase tracking-[0.18em] text-[#f3bca5]">0{index + 1}</span>
                      <p className="mt-2 text-sm font-semibold text-white/84">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="studio" className="bg-[#3b241f] px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="mx-auto max-w-[1450px]">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative min-h-[44rem] overflow-hidden rounded-[2.4rem_2.4rem_10rem_2.4rem]">
              <img
                src="https://images.pexels.com/photos/3997989/pexels-photo-3997989.jpeg?auto=compress&cs=tinysrgb&w=1900"
                alt="Warm modern beauty studio"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3b241f]/72 via-transparent to-transparent" />
              <p className="absolute bottom-8 left-8 max-w-md font-display text-3xl font-medium leading-tight tracking-[-0.05em] sm:text-4xl">
                A studio that gives the appointment room to breathe.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
              <article className="relative overflow-hidden rounded-[2.4rem] bg-[#c9785d] p-8 text-white sm:p-10">
                <div aria-hidden="true" className="absolute -right-16 -top-16 h-48 w-48 rounded-full border-[40px] border-white/10" />
                <p className="text-[0.55rem] font-black uppercase tracking-[0.24em] text-white/56">The atmosphere</p>
                <h2 className="mt-6 max-w-[8ch] font-display text-[clamp(3.8rem,6vw,6.5rem)] font-medium leading-[0.8] tracking-[-0.07em]">Warm light. Quiet detail. No rush.</h2>
                <p className="mt-7 max-w-lg text-base leading-8 text-white/70">
                  Soft music, private appointments, thoughtful conversation, and a space designed to feel personal rather than clinical.
                </p>
              </article>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["01", "Arrive", "Settle in, share your goals, and take a breath."],
                  ["02", "Consult", "We look, listen, and shape the treatment together."],
                  ["03", "Restore", "Every step is paced carefully and explained clearly."],
                  ["04", "Leave", "You leave with simple aftercare and a result that feels easy."]
                ].map(([number, title, copy], index) => (
                  <article key={number} className={`rounded-[1.8rem] p-6 ${index === 0 || index === 3 ? "bg-[#f1c6b4] text-[#3b241f]" : "bg-[#f7eee6] text-[#3b241f]"}`}>
                    <span className="text-[0.5rem] font-black uppercase tracking-[0.18em] text-[#a45f4e]">{number}</span>
                    <h3 className="mt-4 font-display text-2xl font-semibold tracking-[-0.045em]">{title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#715a52]">{copy}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="artist" className="px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="mx-auto grid max-w-[1450px] gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div className="relative">
            <div aria-hidden="true" className="absolute -left-5 -top-5 h-full w-full rounded-[2.5rem_2.5rem_2.5rem_8rem] border border-[#3b241f]/12" />
            <img
              src="https://images.pexels.com/photos/3764016/pexels-photo-3764016.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Beauty artist in a modern studio"
              className="relative aspect-[4/5] w-full rounded-[2.5rem_2.5rem_2.5rem_8rem] object-cover grayscale-[8%]"
            />
            <div className="absolute inset-x-0 bottom-0 rounded-b-[2.5rem] bg-gradient-to-t from-[#3b241f]/88 to-transparent p-7 pt-28 text-white sm:p-9">
              <p className="font-display text-3xl font-semibold tracking-[-0.05em]">Mara Sato</p>
              <p className="mt-2 text-[0.54rem] font-black uppercase tracking-[0.18em] text-white/56">Founder · Skin and brow artist</p>
            </div>
          </div>

          <div className="lg:pl-10 xl:pl-20">
            <p className="text-[0.58rem] font-black uppercase tracking-[0.24em] text-[#a45f4e]">A personal point of view</p>
            <blockquote className="mt-7 max-w-[10ch] font-display text-[clamp(3.6rem,6vw,7rem)] font-medium leading-[0.82] tracking-[-0.07em]">
              “The best beauty work does not announce itself.”
            </blockquote>
            <p className="mt-8 max-w-xl text-base leading-8 text-[#6c5952] sm:text-lg sm:leading-9">
              Mara built Sora around natural expression, technical restraint, and the belief that a beauty appointment should feel as good as the finished result looks.
            </p>

            <div className="mt-10 grid gap-5 border-y border-[#3b241f]/14 py-7 sm:grid-cols-3">
              {[
                ["12+", "Years of artistry"],
                ["1:1", "Private sessions"],
                ["92%", "Guest rebooking"]
              ].map(([value, label]) => (
                <div key={label}>
                  <strong className="font-display text-4xl font-semibold tracking-[-0.06em]">{value}</strong>
                  <p className="mt-2 text-[0.5rem] font-black uppercase tracking-[0.15em] text-[#7b655d]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="bg-[#e8b49f] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="mx-auto max-w-[1450px]">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-[0.58rem] font-black uppercase tracking-[0.24em] text-[#8f4d3d]">Guest notes</p>
              <h2 className="mt-6 max-w-[8ch] font-display text-[clamp(4rem,7vw,8rem)] font-medium leading-[0.78] tracking-[-0.075em]">The kind of appointment people remember.</h2>
            </div>
            <div className="flex items-center gap-3 lg:justify-self-end lg:pb-3">
              <div className="flex gap-1 text-[#3b241f]">
                {[0, 1, 2, 3, 4].map((item) => <Star key={item} className="h-4 w-4 fill-current" />)}
              </div>
              <span className="text-[0.56rem] font-black uppercase tracking-[0.18em] text-[#6d473d]">4.9 average</span>
            </div>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {reviews.map((review, index) => (
              <article key={review.name} className={`rounded-[2rem] p-7 sm:p-8 ${index === 1 ? "bg-[#3b241f] text-white md:-translate-y-8" : "bg-[#fff7f0] text-[#3b241f]"}`}>
                <Quote className={`h-6 w-6 ${index === 1 ? "text-[#f0b49e]" : "text-[#b7644e]"}`} />
                <p className="mt-8 font-display text-2xl font-medium leading-[1.15] tracking-[-0.04em]">“{review.quote}”</p>
                <div className={`mt-8 border-t pt-5 ${index === 1 ? "border-white/16" : "border-[#3b241f]/12"}`}>
                  <p className="text-[0.55rem] font-black uppercase tracking-[0.18em]">{review.name}</p>
                  <p className={`mt-2 text-xs ${index === 1 ? "text-white/45" : "text-[#7d655d]"}`}>{review.service}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="book" className="relative overflow-hidden bg-[#3b241f] px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div aria-hidden="true" className="absolute -bottom-40 -right-24 h-[34rem] w-[34rem] rounded-[42%_58%_50%_50%] border-[90px] border-[#e8b49f]/[0.06]" />
        <div className="mx-auto grid max-w-[1450px] gap-12 lg:grid-cols-[1fr_0.75fr] lg:items-start">
          <div>
            <p className="text-[0.58rem] font-black uppercase tracking-[0.24em] text-[#f0b49e]">Reserve your ritual</p>
            <h2 className="mt-7 max-w-[9ch] font-display text-[clamp(4.6rem,8vw,9.5rem)] font-medium leading-[0.75] tracking-[-0.08em]">Make space for feeling like yourself again.</h2>
            <p className="mt-8 max-w-xl text-base leading-8 text-white/62 sm:text-lg sm:leading-9">
              Choose a service and tell us when you would like to visit. We will confirm your appointment or suggest the closest available time.
            </p>
          </div>

          <form className="relative rounded-[2.2rem] border border-white/18 bg-[#fff8f1] p-6 text-[#3b241f] shadow-[18px_18px_0_rgba(183,100,78,.45)] sm:p-8" onSubmit={(event) => event.preventDefault()}>
            <div className="flex items-start justify-between gap-5 border-b border-[#3b241f]/14 pb-5">
              <div>
                <p className="text-[0.54rem] font-black uppercase tracking-[0.2em] text-[#8f6d63]">Appointment request</p>
                <h3 className="mt-2 font-display text-3xl font-semibold tracking-[-0.05em]">Choose your time.</h3>
              </div>
              <CalendarDays className="h-6 w-6 text-[#b7644e]" />
            </div>

            <div className="mt-6 grid gap-5">
              <label className="grid gap-2">
                <span className="text-[0.52rem] font-black uppercase tracking-[0.17em] text-[#80665d]">Your name</span>
                <input className="min-h-12 border-b border-[#3b241f]/24 bg-transparent px-0 text-base outline-none placeholder:text-[#3b241f]/30 focus:border-[#b7644e]" placeholder="Name" />
              </label>
              <label className="grid gap-2">
                <span className="text-[0.52rem] font-black uppercase tracking-[0.17em] text-[#80665d]">Email</span>
                <input type="email" className="min-h-12 border-b border-[#3b241f]/24 bg-transparent px-0 text-base outline-none placeholder:text-[#3b241f]/30 focus:border-[#b7644e]" placeholder="you@email.com" />
              </label>
              <label className="grid gap-2">
                <span className="text-[0.52rem] font-black uppercase tracking-[0.17em] text-[#80665d]">Treatment</span>
                <select className="min-h-12 border-b border-[#3b241f]/24 bg-transparent px-0 text-base outline-none focus:border-[#b7644e]" defaultValue="">
                  <option value="" disabled>Select a treatment</option>
                  {services.map((service) => <option key={service.key}>{service.title}</option>)}
                </select>
              </label>
              <label className="grid gap-2">
                <span className="text-[0.52rem] font-black uppercase tracking-[0.17em] text-[#80665d]">Preferred day</span>
                <input type="date" className="min-h-12 border-b border-[#3b241f]/24 bg-transparent px-0 text-base outline-none focus:border-[#b7644e]" />
              </label>
            </div>

            <button type="submit" className="mt-7 flex min-h-[3.2rem] w-full items-center justify-center gap-3 rounded-full bg-[#3b241f] px-6 text-[0.64rem] font-black uppercase tracking-[0.2em] text-white transition hover:bg-[#b7644e]">
              Request appointment <ArrowRight className="h-4 w-4" />
            </button>
            <p className="mt-4 text-center text-[0.5rem] font-bold uppercase tracking-[0.14em] text-[#8b756d]">No payment required. We reply within one business day.</p>
          </form>
        </div>
      </section>

      <footer className="bg-[#3b241f] px-5 py-10 text-white sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1450px] flex-col gap-8 border-t border-white/14 pt-8 md:flex-row md:items-end md:justify-between">
          <StudioMark />
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-[0.54rem] font-black uppercase tracking-[0.18em] text-white/42">
            <Link className="hover:text-[#f0b49e]" href={startHref}>Use this design</Link>
            <Link className="hover:text-[#f0b49e]" href="/landing-pages">Back to gallery</Link>
            <span>Demo concept · GridSpell Studio</span>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes beauty-video-breathe {
          0%,100% { transform: scale(1.02); }
          50% { transform: scale(1.055); }
        }
        .beauty-hero-video { animation: beauty-video-breathe 18s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .beauty-hero-video { animation: none !important; }
        }
      `}</style>
    </main>
  );
}
