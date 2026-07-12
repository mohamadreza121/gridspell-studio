"use client";

import Image from "next/image";

import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  CirclePlay,
  Dumbbell,
  Flame,
  Gauge,
  HeartPulse,
  Menu,
  Pause,
  Play,
  ShieldCheck,
  Sparkles,
  TimerReset,
  Trophy,
  X,
  Zap
} from "lucide-react";

const startHref =
  "/start-project?package=landing-page&source=fitness-coach&design=Kinetic+Fitness+Coach";

type ProgramKey = "strength" | "performance" | "hybrid" | "reset";

type Program = {
  key: ProgramKey;
  number: string;
  title: string;
  label: string;
  copy: string;
  schedule: string;
  level: string;
  image: string;
  points: string[];
};

const programs: Program[] = [
  {
    key: "strength",
    number: "01",
    title: "Build strength",
    label: "Progressive strength",
    copy: "A focused lifting plan that builds real capacity, cleaner technique, and measurable progress without living in the gym.",
    schedule: "4 sessions / week",
    level: "All levels",
    image:
      "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1800",
    points: ["Personalized progression", "Technique feedback", "Recovery targets"]
  },
  {
    key: "performance",
    number: "02",
    title: "Move faster",
    label: "Athletic performance",
    copy: "Power, speed, conditioning, and movement quality combined into one system for people who want their fitness to perform.",
    schedule: "3–5 sessions / week",
    level: "Intermediate",
    image:
      "https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg?auto=compress&cs=tinysrgb&w=1800",
    points: ["Power development", "Sprint conditioning", "Mobility integration"]
  },
  {
    key: "hybrid",
    number: "03",
    title: "Train hybrid",
    label: "Strength + engine",
    copy: "Keep your strength while building the engine to run, ride, hike, compete, and move through life with more confidence.",
    schedule: "5 sessions / week",
    level: "Intermediate",
    image:
      "https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=1800",
    points: ["Strength retention", "Aerobic base", "Event-ready blocks"]
  },
  {
    key: "reset",
    number: "04",
    title: "Reset momentum",
    label: "Lifestyle coaching",
    copy: "A practical return-to-training plan for rebuilding consistency, energy, and confidence after a long break or busy season.",
    schedule: "3 sessions / week",
    level: "Beginner friendly",
    image:
      "https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=1800",
    points: ["Simple weekly targets", "Nutrition structure", "Habit accountability"]
  }
];

const results = [
  {
    value: "+42%",
    label: "Strength increase",
    name: "Mia — 16 weeks",
    quote: "I stopped chasing perfect weeks and finally started stacking strong ones.",
    image:
      "https://images.pexels.com/photos/3763871/pexels-photo-3763871.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tone: "bg-[#d8ff3f] text-[#11120f]"
  },
  {
    value: "−8:14",
    label: "10K personal best",
    name: "Jordan — 20 weeks",
    quote: "The plan made me fitter without making the rest of my life smaller.",
    image:
      "https://images.pexels.com/photos/3621185/pexels-photo-3621185.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tone: "bg-[#625bff] text-white"
  },
  {
    value: "5×",
    label: "Training consistency",
    name: "Noah — 12 weeks",
    quote: "For the first time, I know exactly what to do when motivation drops.",
    image:
      "https://images.pexels.com/photos/6456300/pexels-photo-6456300.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tone: "bg-[#ff5a1f] text-white"
  }
] as const;

function ActionLink({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-13 items-center justify-center gap-3 border px-6 text-[0.66rem] font-black uppercase tracking-[0.2em] transition ${
        light
          ? "border-white/35 text-white hover:bg-white hover:text-[#11120f]"
          : "border-[#d8ff3f] bg-[#d8ff3f] text-[#11120f] hover:bg-white hover:border-white"
      }`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

function BrandMark() {
  return (
    <span className="flex items-center gap-3">
      <span className="relative grid h-10 w-10 place-items-center overflow-hidden border border-current/30">
        <span className="absolute h-8 w-2 -rotate-45 bg-[#d8ff3f]" />
        <span className="relative h-2.5 w-2.5 bg-current" />
      </span>
      <span>
        <strong className="block font-display text-xl font-black leading-none tracking-[-0.055em]">VOLT</strong>
        <small className="mt-1 block text-[0.48rem] font-black uppercase tracking-[0.25em] opacity-55">Performance coaching</small>
      </span>
    </span>
  );
}

export function FitnessCoachExperience() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProgram, setActiveProgram] = useState<ProgramKey>("strength");

  const active = programs.find((program) => program.key === activeProgram) ?? programs[0];

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
    <main className="overflow-hidden bg-[#f3f1ea] text-[#11120f]">
      <section className="relative min-h-svh overflow-hidden bg-[#0d0e0c] text-white">
        <video
          ref={videoRef}
          className="fitness-hero-video absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=2200"
          aria-hidden="true"
        >
          <source
            src="https://videos.pexels.com/video-files/4761426/4761426-hd_1920_1080_25fps.mp4"
            type="video/mp4"
          />
          <source src="https://www.pexels.com/download/video/4761426/" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,9,7,.88)_0%,rgba(8,9,7,.54)_42%,rgba(8,9,7,.08)_72%,rgba(8,9,7,.36)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,8,6,.62),transparent_28%,transparent_61%,rgba(7,8,6,.82))]" />
        <div className="fitness-hero-glow absolute -left-32 top-[18%] h-[26rem] w-[26rem] rounded-full bg-[#625bff]/35 blur-[110px]" />
        <div className="fitness-hero-glow absolute -right-24 bottom-[8%] h-[24rem] w-[24rem] rounded-full bg-[#ff5a1f]/25 blur-[110px] [animation-delay:-2.5s]" />

        <header className="relative z-40 mx-auto flex w-full max-w-[1580px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12 lg:py-7">
          <Link href="/landing-pages" aria-label="Back to landing page gallery">
            <BrandMark />
          </Link>

          <nav className="hidden items-center gap-8 text-[0.62rem] font-black uppercase tracking-[0.2em] text-white/62 lg:flex">
            <a className="transition hover:text-[#d8ff3f]" href="#programs">Programs</a>
            <a className="transition hover:text-[#d8ff3f]" href="#method">Method</a>
            <a className="transition hover:text-[#d8ff3f]" href="#results">Results</a>
            <a className="transition hover:text-[#d8ff3f]" href="#coach">Coach</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="#apply"
              className="hidden min-h-11 items-center gap-3 border border-white/25 bg-black/15 px-5 text-[0.61rem] font-black uppercase tracking-[0.18em] text-white backdrop-blur-xl transition hover:border-[#d8ff3f] hover:text-[#d8ff3f] sm:inline-flex"
            >
              <CalendarDays className="h-4 w-4" />
              Apply for coaching
            </Link>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center border border-white/30 bg-black/20 backdrop-blur-xl lg:hidden"
              onClick={() => setMenuOpen((value) => !value)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </header>

        {menuOpen ? (
          <div className="absolute inset-x-4 top-20 z-50 border border-white/16 bg-[#11120f]/96 p-7 shadow-[0_30px_90px_rgba(0,0,0,.4)] backdrop-blur-2xl sm:inset-x-8 lg:hidden">
            <nav className="grid gap-5 font-display text-3xl font-black uppercase tracking-[-0.04em]">
              <a href="#programs" onClick={() => setMenuOpen(false)}>Programs</a>
              <a href="#method" onClick={() => setMenuOpen(false)}>Method</a>
              <a href="#results" onClick={() => setMenuOpen(false)}>Results</a>
              <a href="#coach" onClick={() => setMenuOpen(false)}>Coach</a>
              <a className="text-[#d8ff3f]" href="#apply" onClick={() => setMenuOpen(false)}>Apply now</a>
            </nav>
          </div>
        ) : null}

        <div className="relative z-20 mx-auto flex min-h-[calc(100svh-5.5rem)] w-full max-w-[1580px] flex-col justify-end px-5 pb-7 sm:px-8 sm:pb-10 lg:px-12 lg:pb-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_23rem] lg:items-end">
            <div>
              <div className="mb-6 inline-flex items-center gap-3 border border-white/22 bg-black/20 px-3 py-2 text-[0.57rem] font-black uppercase tracking-[0.22em] text-white/72 backdrop-blur-xl">
                <span className="h-2 w-2 bg-[#d8ff3f] shadow-[0_0_18px_rgba(216,255,63,.9)]" />
                Online + Toronto coaching
              </div>
              <h1 className="max-w-[10ch] font-display text-[clamp(4.8rem,10.2vw,11.5rem)] font-black uppercase leading-[0.72] tracking-[-0.085em] text-white">
                Build a body that <span className="text-[#d8ff3f]">keeps up.</span>
              </h1>
            </div>

            <div className="border-l border-white/28 pl-5 lg:justify-self-end">
              <p className="text-base leading-8 text-white/68">
                Personal coaching for strength, performance, energy, and a routine that survives real life.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ActionLink href="#apply">Start your plan</ActionLink>
                <button
                  type="button"
                  onClick={toggleVideo}
                  className="grid h-[3.25rem] w-[3.25rem] place-items-center border border-white/32 bg-black/20 text-white backdrop-blur-xl transition hover:border-[#d8ff3f] hover:text-[#d8ff3f]"
                  aria-label={playing ? "Pause background video" : "Play background video"}
                >
                  {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-9 grid border border-white/20 bg-black/28 backdrop-blur-xl sm:grid-cols-4">
            <div className="flex min-h-24 items-center gap-4 border-b border-white/15 px-5 sm:border-b-0 sm:border-r">
              <span className="grid h-11 w-11 place-items-center bg-[#d8ff3f] text-[#11120f]"><Zap className="h-5 w-5" /></span>
              <div><strong className="font-display text-2xl font-black">1:1</strong><p className="mt-1 text-[0.52rem] font-black uppercase tracking-[0.16em] text-white/42">Coaching</p></div>
            </div>
            <div className="flex min-h-24 items-center gap-4 border-b border-white/15 px-5 sm:border-b-0 sm:border-r">
              <Gauge className="h-5 w-5 text-[#625bff]" />
              <div><strong className="font-display text-2xl font-black">Weekly</strong><p className="mt-1 text-[0.52rem] font-black uppercase tracking-[0.16em] text-white/42">Plan updates</p></div>
            </div>
            <div className="flex min-h-24 items-center gap-4 border-b border-white/15 px-5 sm:border-b-0 sm:border-r">
              <HeartPulse className="h-5 w-5 text-[#ff5a1f]" />
              <div><strong className="font-display text-2xl font-black">24h</strong><p className="mt-1 text-[0.52rem] font-black uppercase tracking-[0.16em] text-white/42">Coach response</p></div>
            </div>
            <div className="relative flex min-h-24 items-center justify-between overflow-hidden px-5">
              <div className="absolute inset-0 bg-[#d8ff3f]" />
              <div className="relative text-[#11120f]"><p className="text-[0.52rem] font-black uppercase tracking-[0.17em]">Next intake</p><strong className="mt-1 block font-display text-2xl font-black">8 spots</strong></div>
              <ArrowRight className="relative h-5 w-5 text-[#11120f]" />
            </div>
          </div>
        </div>

        <a href="#programs" className="absolute right-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-4 text-white/42 lg:flex">
          <span className="text-[0.5rem] font-black uppercase tracking-[0.25em] [writing-mode:vertical-rl]">Explore</span>
          <ArrowDown className="h-4 w-4" />
        </a>
      </section>

      <section className="overflow-hidden border-y border-[#11120f] bg-[#d8ff3f] py-4 text-[#11120f]">
        <div className="fitness-marquee flex min-w-max items-center gap-10 text-[0.7rem] font-black uppercase tracking-[0.23em]">
          {[0, 1].map((group) => (
            <div key={group} className="flex items-center gap-10">
              {["Strength", "Conditioning", "Nutrition", "Accountability", "Recovery", "Performance"].map((item) => (
                <span key={`${group}-${item}`} className="inline-flex items-center gap-10">
                  {item}<span className="h-2 w-2 bg-[#11120f]" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-12 lg:grid-cols-[0.42fr_1.58fr]">
            <div>
              <p className="text-[0.6rem] font-black uppercase tracking-[0.24em] text-[#68685f]">The idea</p>
              <div className="mt-5 h-px bg-[#11120f]/18" />
            </div>
            <div>
              <h2 className="max-w-[12ch] font-display text-[clamp(4rem,7.5vw,8.5rem)] font-black uppercase leading-[0.76] tracking-[-0.075em]">
                Motivation fades. A good system keeps moving.
              </h2>
              <div className="mt-10 grid gap-8 border-t border-[#11120f]/18 pt-8 md:grid-cols-2">
                <p className="max-w-lg text-base leading-8 text-[#5d5d55]">
                  Training should make your life bigger—not demand that everything else gets out of the way. Your plan adapts to your schedule, experience, and goals.
                </p>
                <p className="max-w-lg text-base leading-8 text-[#5d5d55]">
                  You get clear sessions, honest feedback, practical nutrition, and enough accountability to keep progress moving when the week gets messy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="programs" className="bg-[#11120f] px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <p className="text-[0.6rem] font-black uppercase tracking-[0.24em] text-[#d8ff3f]/62">Choose your direction</p>
              <h2 className="mt-6 max-w-[8ch] font-display text-[clamp(4rem,7vw,8rem)] font-black uppercase leading-[0.75] tracking-[-0.075em]">
                One coach. Four ways forward.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-8 text-white/52 lg:justify-self-end lg:pb-3 sm:text-lg sm:leading-9">
              Every program uses the same coaching system, but the emphasis changes based on what you want your body to do next.
            </p>
          </div>

          <div className="mt-14 grid border border-white/14 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="border-b border-white/14 lg:border-b-0 lg:border-r">
              {programs.map((program) => (
                <button
                  key={program.key}
                  type="button"
                  onMouseEnter={() => setActiveProgram(program.key)}
                  onFocus={() => setActiveProgram(program.key)}
                  onClick={() => setActiveProgram(program.key)}
                  className={`group grid w-full grid-cols-[3rem_1fr_auto] items-center gap-4 border-b border-white/12 py-7 pr-5 text-left transition last:border-b-0 ${
                    activeProgram === program.key
                      ? "bg-[#d8ff3f] pl-5 text-[#11120f]"
                      : "text-white hover:bg-white/[0.05] hover:pl-3"
                  }`}
                  aria-pressed={activeProgram === program.key}
                >
                  <span className={`text-[0.55rem] font-black tracking-[0.16em] ${activeProgram === program.key ? "text-[#11120f]/55" : "text-white/35"}`}>{program.number}</span>
                  <span className="font-display text-2xl font-black uppercase tracking-[-0.045em] sm:text-3xl">{program.title}</span>
                  <ChevronRight className={`h-4 w-4 transition ${activeProgram === program.key ? "opacity-100" : "-translate-x-2 opacity-30"}`} />
                </button>
              ))}
            </div>

            <div className="relative min-h-[44rem] overflow-hidden">
              <Image width={1600} height={1000} sizes="100vw" unoptimized src={active.image} alt={active.title} className="absolute inset-0 h-full w-full object-cover transition duration-700" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,9,7,.08),rgba(8,9,7,.18)_42%,rgba(8,9,7,.88)_100%)]" />
              <div className="absolute left-5 top-5 border border-white/25 bg-black/25 px-4 py-3 backdrop-blur-xl sm:left-8 sm:top-8">
                <p className="text-[0.53rem] font-black uppercase tracking-[0.22em] text-[#d8ff3f]">{active.label}</p>
                <div className="mt-2 flex gap-5 text-xs text-white/58"><span>{active.schedule}</span><span>{active.level}</span></div>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9 lg:p-12">
                <h3 className="max-w-[8ch] font-display text-[clamp(3.5rem,6vw,6.8rem)] font-black uppercase leading-[0.76] tracking-[-0.07em]">{active.title}</h3>
                <p className="mt-6 max-w-xl text-base leading-8 text-white/65">{active.copy}</p>
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {active.points.map((point, index) => (
                    <div key={point} className="border-t border-white/25 pt-4">
                      <span className="text-[0.5rem] font-black uppercase tracking-[0.18em] text-[#d8ff3f]">0{index + 1}</span>
                      <p className="mt-2 text-sm font-bold text-white/82">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="method" className="relative overflow-hidden bg-[#625bff] px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="absolute -right-24 top-16 h-96 w-96 rounded-full border-[70px] border-white/[0.05]" />
        <div className="mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative min-h-[46rem]">
            <div className="absolute left-0 top-0 w-[68%] overflow-hidden border-[10px] border-[#625bff]">
              <Image width={1600} height={1000} sizes="100vw" unoptimized
                src="https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg?auto=compress&cs=tinysrgb&w=1500"
                alt="Athlete training with a coach"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-[54%] overflow-hidden border-[10px] border-[#625bff]">
              <Image width={1600} height={1000} sizes="100vw" unoptimized
                src="https://images.pexels.com/photos/3757376/pexels-photo-3757376.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Focused strength training"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="absolute bottom-[18%] left-[18%] grid h-36 w-36 place-items-center rounded-full bg-[#d8ff3f] text-center text-[#11120f] shadow-[0_30px_80px_rgba(0,0,0,.25)]">
              <div><strong className="font-display text-4xl font-black">360°</strong><p className="mt-1 text-[0.5rem] font-black uppercase tracking-[0.16em]">Coaching view</p></div>
            </div>
          </div>

          <div className="lg:pl-10 xl:pl-20">
            <p className="text-[0.6rem] font-black uppercase tracking-[0.24em] text-white/52">The VOLT method</p>
            <h2 className="mt-6 max-w-[8ch] font-display text-[clamp(4rem,7vw,8rem)] font-black uppercase leading-[0.75] tracking-[-0.075em]">
              Train. Review. Adjust. Repeat.
            </h2>
            <p className="mt-8 max-w-xl text-base leading-8 text-white/68 sm:text-lg sm:leading-9">
              Your program is not a PDF that disappears after week one. It is a living system that responds to your performance, recovery, and real schedule.
            </p>

            <div className="mt-10 border-t border-white/22">
              {[
                [Dumbbell, "01", "Train with intent", "Every session has a purpose, progression target, and clear execution standard."],
                [CirclePlay, "02", "Send the work", "Video feedback and training notes turn every week into useful coaching data."],
                [TimerReset, "03", "Adjust quickly", "Volume, intensity, and conditioning shift before small problems become lost months."],
                [Trophy, "04", "Build momentum", "Progress is tracked in performance, consistency, energy, and confidence—not only scale weight."]
              ].map(([Icon, number, title, copy]) => {
                const MethodIcon = Icon as typeof Dumbbell;
                return (
                  <div key={String(number)} className="grid gap-4 border-b border-white/22 py-6 sm:grid-cols-[3rem_3rem_1fr] sm:items-start">
                    <MethodIcon className="h-5 w-5 text-[#d8ff3f]" />
                    <span className="text-[0.54rem] font-black tracking-[0.17em] text-white/42">{String(number)}</span>
                    <div><h3 className="font-display text-2xl font-black uppercase tracking-[-0.045em]">{String(title)}</h3><p className="mt-2 text-sm leading-7 text-white/58">{String(copy)}</p></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="results" className="px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex flex-col gap-8 border-b border-[#11120f]/18 pb-9 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[0.6rem] font-black uppercase tracking-[0.24em] text-[#68685f]">Proof of momentum</p>
              <h2 className="mt-5 max-w-[9ch] font-display text-[clamp(4rem,7vw,8rem)] font-black uppercase leading-[0.75] tracking-[-0.075em]">Results you can feel outside the gym.</h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-[#65655e]">Individual outcomes vary. The common thread is a plan people can actually follow long enough to change.</p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {results.map((result, index) => (
              <article key={result.name} className={`group relative overflow-hidden ${index === 1 ? "lg:mt-16" : ""}`}>
                <Image width={1600} height={1000} sizes="100vw" unoptimized src={result.image} alt="Fitness coaching client" className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-[1.035]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/8 to-transparent" />
                <div className={`absolute left-4 top-4 px-4 py-3 ${result.tone}`}>
                  <strong className="font-display text-3xl font-black tracking-[-0.055em]">{result.value}</strong>
                  <p className="mt-1 text-[0.5rem] font-black uppercase tracking-[0.17em] opacity-65">{result.label}</p>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <p className="font-display text-2xl font-black uppercase leading-tight tracking-[-0.045em]">“{result.quote}”</p>
                  <p className="mt-5 text-[0.54rem] font-black uppercase tracking-[0.18em] text-white/48">{result.name}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="coach" className="grid min-h-svh bg-[#11120f] text-white lg:grid-cols-2">
        <div className="relative min-h-[75svh] overflow-hidden lg:min-h-svh">
          <Image width={1600} height={1000} sizes="100vw" unoptimized
            src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1800"
            alt="Fitness coach"
            className="absolute inset-0 h-full w-full object-cover grayscale-[15%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-transparent to-transparent" />
          <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between sm:bottom-10 sm:left-10 sm:right-10">
            <div><p className="text-[0.55rem] font-black uppercase tracking-[0.22em] text-[#d8ff3f]">Your coach</p><p className="mt-2 font-display text-4xl font-black uppercase tracking-[-0.055em]">Marcus Vale</p></div>
            <span className="hidden h-14 w-14 place-items-center rounded-full border border-white/30 bg-black/20 backdrop-blur-xl sm:grid"><Flame className="h-5 w-5 text-[#ff5a1f]" /></span>
          </div>
        </div>

        <div className="flex items-center px-5 py-20 sm:px-10 sm:py-28 lg:px-16 xl:px-24">
          <div className="max-w-xl">
            <p className="text-[0.6rem] font-black uppercase tracking-[0.24em] text-[#d8ff3f]/62">Coaching without the ego</p>
            <blockquote className="mt-7 font-display text-[clamp(3.6rem,6vw,7rem)] font-black uppercase leading-[0.78] tracking-[-0.07em]">
              “The best program is the one that makes you more capable.”
            </blockquote>
            <p className="mt-8 text-base leading-8 text-white/58 sm:text-lg sm:leading-9">
              Marcus blends strength coaching, conditioning, and practical behavior change into one clear system. The goal is not to make fitness your entire personality. It is to make you stronger for everything else.
            </p>

            <div className="mt-10 grid gap-4 border-y border-white/16 py-7 sm:grid-cols-3">
              {[["12+", "Years coaching"], ["400+", "Clients guided"], ["CSCS", "Performance certified"]].map(([value, label]) => (
                <div key={label}><strong className="font-display text-4xl font-black tracking-[-0.06em] text-[#d8ff3f]">{value}</strong><p className="mt-2 text-[0.52rem] font-black uppercase tracking-[0.15em] text-white/38">{label}</p></div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-[0.56rem] font-black uppercase tracking-[0.17em] text-white/48">
              <span className="inline-flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#d8ff3f]" /> Strength</span>
              <span className="inline-flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#d8ff3f]" /> Conditioning</span>
              <span className="inline-flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#d8ff3f]" /> Nutrition habits</span>
            </div>
          </div>
        </div>
      </section>

      <section id="apply" className="relative overflow-hidden bg-[#d8ff3f] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="absolute -bottom-36 -right-24 h-[34rem] w-[34rem] rounded-full border-[90px] border-[#11120f]/[0.06]" />
        <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[1fr_0.72fr] lg:items-start">
          <div>
            <div className="inline-flex items-center gap-3 border border-[#11120f]/22 px-3 py-2 text-[0.57rem] font-black uppercase tracking-[0.22em]">
              <Sparkles className="h-4 w-4" />
              Applications open
            </div>
            <h2 className="mt-7 max-w-[9ch] font-display text-[clamp(4.8rem,9vw,10.5rem)] font-black uppercase leading-[0.72] tracking-[-0.085em]">
              Your next level needs a plan.
            </h2>
            <p className="mt-8 max-w-xl text-base leading-8 text-[#383a31] sm:text-lg sm:leading-9">
              Tell us what you are training for. We will reply with the best coaching direction and a clear next step.
            </p>
          </div>

          <form className="relative border border-[#11120f] bg-[#f6f4ed] p-6 shadow-[14px_14px_0_#11120f] sm:p-8" onSubmit={(event) => event.preventDefault()}>
            <div className="flex items-center justify-between border-b border-[#11120f]/18 pb-5">
              <div><p className="text-[0.55rem] font-black uppercase tracking-[0.2em] text-[#67685f]">Coaching application</p><h3 className="mt-2 font-display text-3xl font-black uppercase tracking-[-0.05em]">Start the conversation.</h3></div>
              <ShieldCheck className="h-6 w-6" />
            </div>

            <div className="mt-6 grid gap-5">
              <label className="grid gap-2"><span className="text-[0.54rem] font-black uppercase tracking-[0.17em] text-[#68685f]">Your name</span><input className="min-h-12 border-b border-[#11120f]/28 bg-transparent px-0 text-base outline-none placeholder:text-[#11120f]/30 focus:border-[#625bff]" placeholder="Name" /></label>
              <label className="grid gap-2"><span className="text-[0.54rem] font-black uppercase tracking-[0.17em] text-[#68685f]">Email</span><input type="email" className="min-h-12 border-b border-[#11120f]/28 bg-transparent px-0 text-base outline-none placeholder:text-[#11120f]/30 focus:border-[#625bff]" placeholder="you@email.com" /></label>
              <label className="grid gap-2"><span className="text-[0.54rem] font-black uppercase tracking-[0.17em] text-[#68685f]">Primary goal</span><select className="min-h-12 border-b border-[#11120f]/28 bg-transparent px-0 text-base outline-none focus:border-[#625bff]" defaultValue=""><option value="" disabled>Select a direction</option><option>Build strength</option><option>Improve performance</option><option>Hybrid training</option><option>Rebuild consistency</option></select></label>
            </div>

            <button type="submit" className="mt-7 flex min-h-13 w-full items-center justify-center gap-3 bg-[#11120f] px-6 text-[0.64rem] font-black uppercase tracking-[0.2em] text-white transition hover:bg-[#625bff]">
              Apply for coaching <ArrowRight className="h-4 w-4" />
            </button>
            <p className="mt-4 text-center text-[0.52rem] font-bold uppercase tracking-[0.14em] text-[#73746a]">No pressure. Clear response within 24 hours.</p>
          </form>
        </div>
      </section>

      <footer className="bg-[#11120f] px-5 py-10 text-white sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-8 border-t border-white/14 pt-8 md:flex-row md:items-end md:justify-between">
          <BrandMark />
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-[0.56rem] font-black uppercase tracking-[0.18em] text-white/42">
            <Link className="hover:text-[#d8ff3f]" href={startHref}>Use this design</Link>
            <Link className="hover:text-[#d8ff3f]" href="/landing-pages">Back to gallery</Link>
            <span>Demo concept · GridSpell Studio</span>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fitness-hero-breathe {
          0%,100% { transform: scale(1.02); }
          50% { transform: scale(1.065); }
        }
        @keyframes fitness-glow-breathe {
          0%,100% { opacity: .42; transform: scale(.94); }
          50% { opacity: .78; transform: scale(1.08); }
        }
        @keyframes fitness-marquee {
          to { transform: translateX(-50%); }
        }
        .fitness-hero-video { animation: fitness-hero-breathe 16s ease-in-out infinite; }
        .fitness-hero-glow { animation: fitness-glow-breathe 5.5s ease-in-out infinite; }
        .fitness-marquee { animation: fitness-marquee 22s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .fitness-hero-video,
          .fitness-hero-glow,
          .fitness-marquee { animation: none !important; }
        }
      `}</style>
    </main>
  );
}
