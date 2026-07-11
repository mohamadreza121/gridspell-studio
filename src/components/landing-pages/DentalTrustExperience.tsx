"use client";

import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  CircleCheck,
  Clock3,
  HeartPulse,
  Menu,
  MessageCircle,
  Pause,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  X
} from "lucide-react";

const startHref =
  "/start-project?package=landing-page&source=dental-trust&design=Modern+Dental+Trust";

type ServiceKey = "preventive" | "cosmetic" | "restorative" | "aligners";

type Service = {
  key: ServiceKey;
  number: string;
  title: string;
  eyebrow: string;
  copy: string;
  points: string[];
};

const services: Service[] = [
  {
    key: "preventive",
    number: "01",
    title: "Preventive care",
    eyebrow: "Stay ahead",
    copy: "Thoughtful exams, hygiene, and early detection designed to keep small concerns from becoming complicated ones.",
    points: ["Comprehensive exams", "Gentle hygiene", "Digital diagnostics"]
  },
  {
    key: "cosmetic",
    number: "02",
    title: "Cosmetic dentistry",
    eyebrow: "Feel like yourself",
    copy: "Subtle, natural-looking improvements planned around your face, your goals, and the smile that already belongs to you.",
    points: ["Professional whitening", "Veneer planning", "Smile refinement"]
  },
  {
    key: "restorative",
    number: "03",
    title: "Restorative care",
    eyebrow: "Comfort restored",
    copy: "Durable, conservative treatment that brings back function while preserving as much healthy tooth structure as possible.",
    points: ["Tooth-coloured fillings", "Crowns and bridges", "Implant restoration"]
  },
  {
    key: "aligners",
    number: "04",
    title: "Clear aligners",
    eyebrow: "Move with confidence",
    copy: "A discreet orthodontic plan with digital previews, clear timelines, and support through every stage of movement.",
    points: ["3D smile preview", "Flexible appointments", "Refinement support"]
  }
];

const reviews = [
  {
    quote: "The first dental visit I have ever left feeling calmer than when I arrived.",
    name: "Maya R.",
    treatment: "New patient exam"
  },
  {
    quote: "Everything was explained clearly, nothing felt rushed, and the result still looks completely natural.",
    name: "Daniel K.",
    treatment: "Cosmetic care"
  },
  {
    quote: "Beautiful space, kind team, and genuinely gentle care from beginning to end.",
    name: "Sofia L.",
    treatment: "Hygiene visit"
  }
] as const;

function TextLink({ href, children, dark = false }: { href: string; children: ReactNode; dark?: boolean }) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-12 items-center justify-center gap-3 border px-5 text-[0.66rem] font-black uppercase tracking-[0.19em] transition ${
        dark
          ? "border-[#123b34] bg-[#123b34] text-white hover:bg-[#0b2d27]"
          : "border-white/35 text-white hover:bg-white hover:text-[#123b34]"
      }`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

function LumaMark() {
  return (
    <span className="flex items-center gap-3">
      <span className="relative grid h-9 w-9 place-items-center rounded-full border border-current/25">
        <span className="h-3.5 w-3.5 rounded-[45%_55%_52%_48%] border border-current" />
      </span>
      <span>
        <strong className="block font-display text-xl font-semibold leading-none tracking-[-0.055em]">LUMA</strong>
        <small className="mt-1 block text-[0.48rem] font-black uppercase tracking-[0.24em] opacity-55">Dental Studio</small>
      </span>
    </span>
  );
}

export function DentalTrustExperience() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState<ServiceKey>("preventive");

  const active = services.find((service) => service.key === activeService) ?? services[0];

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
    <main className="overflow-hidden bg-[#f5f8f5] text-[#15312b]">
      <section className="relative min-h-svh bg-[#f5f8f5]">
        <header className="relative z-40 mx-auto flex w-full max-w-[1540px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12 lg:py-7">
          <Link href="/landing-pages" aria-label="Back to landing page gallery">
            <LumaMark />
          </Link>

          <nav className="hidden items-center gap-8 text-[0.63rem] font-black uppercase tracking-[0.18em] text-[#15312b]/62 lg:flex">
            <a className="transition hover:text-[#15312b]" href="#services">Services</a>
            <a className="transition hover:text-[#15312b]" href="#experience">Our approach</a>
            <a className="transition hover:text-[#15312b]" href="#doctor">Team</a>
            <a className="transition hover:text-[#15312b]" href="#reviews">Reviews</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="#book"
              className="hidden min-h-11 items-center gap-3 border border-[#15312b]/20 bg-white/65 px-5 text-[0.61rem] font-black uppercase tracking-[0.18em] shadow-[0_12px_35px_rgba(21,49,43,0.06)] backdrop-blur-xl transition hover:border-[#15312b]/40 sm:inline-flex"
            >
              <CalendarDays className="h-4 w-4" />
              Book a visit
            </Link>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center border border-[#15312b]/20 bg-white/65 backdrop-blur-xl lg:hidden"
              onClick={() => setMenuOpen((value) => !value)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </header>

        {menuOpen ? (
          <div className="absolute inset-x-4 top-20 z-50 border border-[#15312b]/12 bg-[#f9fbf9]/96 p-7 shadow-[0_30px_80px_rgba(21,49,43,0.14)] backdrop-blur-2xl sm:inset-x-8 lg:hidden">
            <nav className="grid gap-5 font-display text-3xl font-medium tracking-[-0.045em]">
              <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
              <a href="#experience" onClick={() => setMenuOpen(false)}>Our approach</a>
              <a href="#doctor" onClick={() => setMenuOpen(false)}>Team</a>
              <a href="#reviews" onClick={() => setMenuOpen(false)}>Reviews</a>
              <a href="#book" onClick={() => setMenuOpen(false)}>Book a visit</a>
            </nav>
          </div>
        ) : null}

        <div className="mx-auto grid min-h-[calc(100svh-5.5rem)] w-full max-w-[1540px] gap-8 px-5 pb-5 sm:px-8 sm:pb-8 lg:grid-cols-[0.82fr_1.18fr] lg:px-12 lg:pb-12">
          <div className="flex flex-col justify-center py-14 lg:pr-8 lg:py-20">
            <div className="inline-flex w-fit items-center gap-2 border border-[#2f7667]/16 bg-[#e9f3ef] px-3 py-2 text-[0.58rem] font-black uppercase tracking-[0.2em] text-[#2b6559]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4b9f8c] shadow-[0_0_0_5px_rgba(75,159,140,0.10)]" />
              Accepting new patients
            </div>

            <h1 className="mt-8 max-w-[9.5ch] font-display text-[clamp(4.5rem,8.2vw,9.8rem)] font-medium leading-[0.77] tracking-[-0.085em] text-[#15312b]">
              Your best smile should feel effortless.
            </h1>

            <p className="mt-8 max-w-xl text-base leading-8 text-[#52645f] sm:text-lg sm:leading-9">
              Modern dentistry with a quieter pace, clear explanations, and thoughtful treatment designed around how you want to feel.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <TextLink href="#book" dark>Book an appointment</TextLink>
              <Link
                href="#experience"
                className="group inline-flex min-h-12 items-center gap-3 px-2 text-[0.66rem] font-black uppercase tracking-[0.19em] text-[#15312b]"
              >
                See the experience
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="mt-12 grid max-w-xl grid-cols-3 border-y border-[#15312b]/12 py-6">
              <div>
                <strong className="font-display text-3xl font-semibold tracking-[-0.055em] sm:text-4xl">4.9</strong>
                <p className="mt-2 text-[0.53rem] font-black uppercase tracking-[0.16em] text-[#6b7975]">Patient rating</p>
              </div>
              <div className="border-x border-[#15312b]/10 px-5">
                <strong className="font-display text-3xl font-semibold tracking-[-0.055em] sm:text-4xl">15+</strong>
                <p className="mt-2 text-[0.53rem] font-black uppercase tracking-[0.16em] text-[#6b7975]">Years of care</p>
              </div>
              <div className="pl-5">
                <strong className="font-display text-3xl font-semibold tracking-[-0.055em] sm:text-4xl">24h</strong>
                <p className="mt-2 text-[0.53rem] font-black uppercase tracking-[0.16em] text-[#6b7975]">Reply standard</p>
              </div>
            </div>
          </div>

          <div className="relative min-h-[68svh] overflow-hidden rounded-[2rem] bg-[#d7e7e1] lg:min-h-0">
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="https://images.pexels.com/videos/6763242/aching-tooth-clinic-computer-dentist-6763242.jpeg?auto=compress&cs=tinysrgb&w=1920"
              aria-hidden="true"
            >
              <source
                src="https://videos.pexels.com/video-files/6763242/6763242-hd_1920_1080_25fps.mp4"
                type="video/mp4"
              />
              <source src="https://www.pexels.com/download/video/6763242/" type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,32,27,.03),rgba(8,32,27,.06)_52%,rgba(8,32,27,.60)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_16%,rgba(255,255,255,.18),transparent_32%)]" />

            <div className="absolute left-5 top-5 border border-white/35 bg-white/72 px-4 py-3 text-[#15312b] shadow-[0_18px_45px_rgba(10,39,33,0.12)] backdrop-blur-xl sm:left-7 sm:top-7">
              <p className="text-[0.52rem] font-black uppercase tracking-[0.2em] text-[#517068]">The Luma standard</p>
              <p className="mt-1 font-display text-xl font-semibold tracking-[-0.04em]">Care without the rush.</p>
            </div>

            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 sm:bottom-7 sm:left-7 sm:right-7">
              <div className="hidden max-w-[18rem] items-center gap-3 border border-white/25 bg-[#0f3029]/58 p-3 text-white backdrop-blur-xl sm:flex">
                <img
                  src="https://images.pexels.com/photos/4967239/pexels-photo-4967239.jpeg?auto=compress&cs=tinysrgb&w=500"
                  alt="Smiling dental patient"
                  className="h-16 w-14 object-cover"
                />
                <div>
                  <p className="text-[0.5rem] font-black uppercase tracking-[0.18em] text-white/56">Patient-first care</p>
                  <p className="mt-1 text-sm font-semibold leading-5">Comfort you can see and feel.</p>
                </div>
              </div>

              <button
                type="button"
                onClick={toggleVideo}
                className="ml-auto grid h-12 w-12 place-items-center rounded-full border border-white/35 bg-white/16 text-white backdrop-blur-xl transition hover:bg-white hover:text-[#15312b]"
                aria-label={playing ? "Pause background video" : "Play background video"}
              >
                {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#15312b]/10 bg-white/72 px-5 py-5 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1450px] gap-4 md:grid-cols-4">
          {[
            [ShieldCheck, "Transparent care", "Clear options and pricing"],
            [HeartPulse, "Gentle by design", "Comfort-led appointments"],
            [Clock3, "Respectful timing", "No crowded waiting room"],
            [CircleCheck, "Insurance friendly", "Direct claim support"]
          ].map(([Icon, title, copy]) => {
            const TrustIcon = Icon as typeof ShieldCheck;
            return (
              <div key={String(title)} className="flex items-center gap-3 py-3 md:border-r md:border-[#15312b]/10 md:pr-5 md:last:border-r-0">
                <TrustIcon className="h-5 w-5 shrink-0 text-[#4d8f80]" />
                <div>
                  <p className="text-[0.61rem] font-black uppercase tracking-[0.15em]">{String(title)}</p>
                  <p className="mt-1 text-xs text-[#6b7975]">{String(copy)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="services" className="px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="mx-auto max-w-[1450px]">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-[0.6rem] font-black uppercase tracking-[0.24em] text-[#5d7a72]">Care, considered</p>
              <h2 className="mt-6 max-w-[8ch] font-display text-[clamp(4rem,7vw,8rem)] font-medium leading-[0.78] tracking-[-0.075em]">
                Everything you need. Nothing you do not.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-8 text-[#60706b] lg:justify-self-end lg:pb-3 sm:text-lg sm:leading-9">
              From routine prevention to complete smile planning, every recommendation is explained clearly and shaped around your priorities.
            </p>
          </div>

          <div className="mt-14 grid border-t border-[#15312b]/16 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="border-b border-[#15312b]/16 lg:border-b-0 lg:border-r">
              {services.map((service) => (
                <button
                  key={service.key}
                  type="button"
                  onMouseEnter={() => setActiveService(service.key)}
                  onFocus={() => setActiveService(service.key)}
                  onClick={() => setActiveService(service.key)}
                  className={`group grid w-full grid-cols-[3rem_1fr_auto] items-center gap-4 border-b border-[#15312b]/12 py-6 pr-5 text-left transition last:border-b-0 ${
                    activeService === service.key ? "bg-[#e9f3ef] pl-5" : "hover:bg-white/60 hover:pl-3"
                  }`}
                  aria-pressed={activeService === service.key}
                >
                  <span className="text-[0.55rem] font-black tracking-[0.16em] text-[#71817c]">{service.number}</span>
                  <span className="font-display text-2xl font-semibold tracking-[-0.045em] sm:text-3xl">{service.title}</span>
                  <ChevronRight className={`h-4 w-4 transition ${activeService === service.key ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-30"}`} />
                </button>
              ))}
            </div>

            <div className="relative min-h-[32rem] overflow-hidden bg-[#123b34] p-7 text-white sm:p-10 lg:p-14">
              <div className="absolute -right-28 -top-28 h-72 w-72 rounded-full border border-white/10" />
              <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full border border-white/10" />
              <Sparkles className="h-7 w-7 text-[#bce0d7]" />
              <p className="mt-12 text-[0.57rem] font-black uppercase tracking-[0.24em] text-[#bce0d7]/62">{active.eyebrow}</p>
              <h3 className="mt-4 max-w-[10ch] font-display text-[clamp(3rem,5vw,5.5rem)] font-medium leading-[0.82] tracking-[-0.065em]">
                {active.title}
              </h3>
              <p className="mt-7 max-w-xl text-base leading-8 text-white/62">{active.copy}</p>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {active.points.map((point, index) => (
                  <div key={point} className="border-t border-white/18 pt-4">
                    <span className="text-[0.5rem] font-black uppercase tracking-[0.18em] text-white/32">0{index + 1}</span>
                    <p className="mt-2 text-sm font-semibold text-white/82">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="grid bg-[#dfeae5] lg:min-h-svh lg:grid-cols-2">
        <div className="relative min-h-[70svh] overflow-hidden lg:min-h-svh">
          <img
            src="https://images.pexels.com/photos/11749490/pexels-photo-11749490.jpeg?auto=compress&cs=tinysrgb&w=1800"
            alt="Woman smiling confidently"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f3029]/55 via-transparent to-transparent" />
          <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between text-white sm:bottom-10 sm:left-10 sm:right-10">
            <div>
              <p className="text-[0.55rem] font-black uppercase tracking-[0.22em] text-white/62">Real confidence</p>
              <p className="mt-2 max-w-sm font-display text-3xl font-medium leading-tight tracking-[-0.05em] sm:text-4xl">A smile that still looks like you.</p>
            </div>
            <span className="hidden h-14 w-14 place-items-center rounded-full border border-white/35 bg-white/10 backdrop-blur-lg sm:grid">
              <Sparkles className="h-5 w-5" />
            </span>
          </div>
        </div>

        <div className="flex items-center px-5 py-20 sm:px-10 sm:py-28 lg:px-16 xl:px-24">
          <div className="max-w-xl">
            <p className="text-[0.6rem] font-black uppercase tracking-[0.24em] text-[#58736b]">The experience</p>
            <h2 className="mt-6 font-display text-[clamp(4rem,7vw,7.5rem)] font-medium leading-[0.78] tracking-[-0.075em]">
              Dentistry designed around how you feel.
            </h2>
            <p className="mt-8 text-base leading-8 text-[#5c6d68] sm:text-lg sm:leading-9">
              A calm environment is not decoration. It changes the way care feels. We slow down, explain clearly, and make room for questions before treatment begins.
            </p>

            <div className="mt-10 grid gap-6 border-t border-[#15312b]/16 pt-8 sm:grid-cols-2">
              {[
                ["01", "Tell us what matters", "Goals, concerns, timing, and comfort preferences come first."],
                ["02", "See the full picture", "Digital imaging helps you understand exactly what we see."],
                ["03", "Choose with confidence", "Options are explained without pressure or unnecessary treatment."],
                ["04", "Leave with a plan", "Clear next steps, transparent costs, and support after your visit."]
              ].map(([number, title, copy]) => (
                <div key={number}>
                  <span className="text-[0.52rem] font-black uppercase tracking-[0.18em] text-[#6e827c]">{number}</span>
                  <h3 className="mt-2 font-display text-2xl font-semibold tracking-[-0.045em]">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#64736f]">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="doctor" className="px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="mx-auto grid max-w-[1450px] gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
          <div className="relative">
            <div className="absolute -left-5 -top-5 h-full w-full border border-[#15312b]/12" />
            <img
              src="https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Dental care provider"
              className="relative aspect-[4/5] w-full object-cover grayscale-[20%]"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#102f29]/82 to-transparent p-7 pt-24 text-white sm:p-9">
              <p className="font-display text-3xl font-semibold tracking-[-0.05em]">Dr. Elena Park</p>
              <p className="mt-2 text-[0.56rem] font-black uppercase tracking-[0.18em] text-white/58">General and cosmetic dentist</p>
            </div>
          </div>

          <div className="lg:pl-10 xl:pl-20">
            <p className="text-[0.6rem] font-black uppercase tracking-[0.24em] text-[#5d7a72]">Care with a point of view</p>
            <blockquote className="mt-7 max-w-[10ch] font-display text-[clamp(3.5rem,6vw,7rem)] font-medium leading-[0.82] tracking-[-0.07em]">
              “Good dentistry should feel precise, personal, and completely unhurried.”
            </blockquote>
            <p className="mt-8 max-w-xl text-base leading-8 text-[#60706b] sm:text-lg sm:leading-9">
              Dr. Park combines conservative treatment planning with modern digital tools, creating results that look natural and care that feels easy to understand.
            </p>

            <div className="mt-10 grid gap-4 border-y border-[#15312b]/14 py-7 sm:grid-cols-3">
              {[
                ["DDS", "University trained"],
                ["15+", "Years in practice"],
                ["1:1", "Personal treatment plans"]
              ].map(([value, label]) => (
                <div key={label}>
                  <strong className="font-display text-4xl font-semibold tracking-[-0.06em]">{value}</strong>
                  <p className="mt-2 text-[0.52rem] font-black uppercase tracking-[0.15em] text-[#70807b]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="bg-[#123b34] px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="mx-auto max-w-[1450px]">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-[0.6rem] font-black uppercase tracking-[0.24em] text-[#bce0d7]/58">Patient stories</p>
              <h2 className="mt-6 max-w-[8ch] font-display text-[clamp(4rem,7vw,8rem)] font-medium leading-[0.78] tracking-[-0.075em]">
                Care people remember for the right reasons.
              </h2>
            </div>
            <div className="flex items-center gap-3 lg:justify-self-end lg:pb-3">
              <div className="flex gap-1 text-[#d4ebe5]">
                {[0, 1, 2, 3, 4].map((item) => <Star key={item} className="h-4 w-4 fill-current" />)}
              </div>
              <span className="text-[0.58rem] font-black uppercase tracking-[0.18em] text-white/46">4.9 average</span>
            </div>
          </div>

          <div className="mt-14 grid border-t border-white/15 md:grid-cols-3">
            {reviews.map((review, index) => (
              <article key={review.name} className="border-b border-white/15 py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
                <MessageCircle className="h-5 w-5 text-[#bce0d7]" />
                <blockquote className="mt-8 font-display text-3xl font-medium leading-[1.02] tracking-[-0.05em] text-white/92">
                  “{review.quote}”
                </blockquote>
                <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-5">
                  <div>
                    <p className="text-sm font-bold">{review.name}</p>
                    <p className="mt-1 text-[0.52rem] font-black uppercase tracking-[0.16em] text-white/38">{review.treatment}</p>
                  </div>
                  <span className="text-[0.52rem] font-black tracking-[0.16em] text-white/26">0{index + 1}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="book" className="bg-[#eef3ef] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="mx-auto max-w-[1450px] border border-[#15312b]/12 bg-white shadow-[0_35px_110px_rgba(21,49,43,0.09)]">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="bg-[#dbe9e3] p-8 sm:p-12 lg:p-16">
              <p className="text-[0.6rem] font-black uppercase tracking-[0.24em] text-[#5d7a72]">Your first visit</p>
              <h2 className="mt-6 max-w-[8ch] font-display text-[clamp(4rem,7vw,7.5rem)] font-medium leading-[0.78] tracking-[-0.075em]">
                Start with a conversation.
              </h2>
              <p className="mt-8 max-w-lg text-base leading-8 text-[#5d6e69]">
                Tell us what brings you in and what would make the experience feel easier. Our team will help you choose the right appointment.
              </p>

              <div className="mt-10 space-y-4">
                {[
                  "New-patient appointments available",
                  "Most insurance plans supported",
                  "Evening appointments on select days"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm font-semibold text-[#35564e]">
                    <Check className="h-4 w-4 text-[#4d8f80]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 sm:p-12 lg:p-16">
              <div className="grid gap-7 sm:grid-cols-2">
                <label className="block border-b border-[#15312b]/18 pb-3">
                  <span className="text-[0.52rem] font-black uppercase tracking-[0.18em] text-[#70807b]">Your name</span>
                  <input className="mt-3 w-full bg-transparent text-base outline-none placeholder:text-[#15312b]/30" placeholder="First and last name" />
                </label>
                <label className="block border-b border-[#15312b]/18 pb-3">
                  <span className="text-[0.52rem] font-black uppercase tracking-[0.18em] text-[#70807b]">Phone or email</span>
                  <input className="mt-3 w-full bg-transparent text-base outline-none placeholder:text-[#15312b]/30" placeholder="How should we reach you?" />
                </label>
                <label className="block border-b border-[#15312b]/18 pb-3 sm:col-span-2">
                  <span className="text-[0.52rem] font-black uppercase tracking-[0.18em] text-[#70807b]">What can we help with?</span>
                  <select className="mt-3 w-full appearance-none bg-transparent text-base outline-none">
                    <option>New patient exam</option>
                    <option>Hygiene appointment</option>
                    <option>Cosmetic consultation</option>
                    <option>Emergency concern</option>
                  </select>
                </label>
                <label className="block border-b border-[#15312b]/18 pb-3 sm:col-span-2">
                  <span className="text-[0.52rem] font-black uppercase tracking-[0.18em] text-[#70807b]">Anything we should know?</span>
                  <textarea className="mt-3 min-h-20 w-full resize-none bg-transparent text-base outline-none placeholder:text-[#15312b]/30" placeholder="Questions, timing, or comfort preferences" />
                </label>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-5">
                <p className="max-w-xs text-xs leading-6 text-[#7a8783]">
                  Demo form for this landing-page concept. No medical information is stored.
                </p>
                <TextLink href={startHref} dark>Start this dental design</TextLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#0d2d27] px-5 py-10 text-white sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1450px] flex-col gap-8 border-t border-white/15 pt-9 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <LumaMark />
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/48">A modern dental landing-page concept focused on calm, clarity, and patient trust.</p>
          </div>
          <div className="flex flex-wrap gap-x-7 gap-y-3 text-[0.57rem] font-black uppercase tracking-[0.18em] text-white/48">
            <a href="#services">Services</a>
            <a href="#doctor">Team</a>
            <a href="#reviews">Reviews</a>
            <a href="#book">Book</a>
            <Link href="/landing-pages">Gallery</Link>
          </div>
        </div>
      </footer>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          video { display: none; }
          *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
        }
      `}</style>
    </main>
  );
}
