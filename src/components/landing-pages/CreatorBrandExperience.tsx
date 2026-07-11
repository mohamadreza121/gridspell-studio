"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Camera,
  Check,
  ChevronRight,
  Mail,
  Menu,
  Mic2,
  Quote,
  Sparkles,
  X,
  type LucideIcon
} from "lucide-react";

const startHref =
  "/start-project?package=landing-page&source=creator-brand&design=Retro+Modern+Creator+Brand";

type OfferKey = "strategy" | "studio" | "speaking" | "library";

type Offer = {
  key: OfferKey;
  number: string;
  title: string;
  label: string;
  copy: string;
  meta: string;
  image: string;
  points: string[];
  Icon: LucideIcon;
};

const offers: Offer[] = [
  {
    key: "strategy",
    number: "01",
    title: "Brand direction",
    label: "For founders and creators",
    copy:
      "A focused strategy sprint for clarifying your point of view, audience, offer, and the body of work your brand should become known for.",
    meta: "Two-week private sprint",
    image:
      "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1800",
    points: ["Positioning and message", "Offer architecture", "90-day editorial plan"],
    Icon: BriefcaseBusiness
  },
  {
    key: "studio",
    number: "02",
    title: "Creative studio",
    label: "Campaigns and editorial",
    copy:
      "Concept, writing, and creative direction for launches, brand stories, editorial campaigns, and digital experiences that deserve a longer shelf life.",
    meta: "Project-based collaboration",
    image:
      "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1800",
    points: ["Creative concept", "Narrative and copy", "Launch direction"],
    Icon: Camera
  },
  {
    key: "speaking",
    number: "03",
    title: "Talks and workshops",
    label: "Teams and communities",
    copy:
      "Practical sessions on creative confidence, building a recognizable body of work, and designing content systems that do not flatten your voice.",
    meta: "Keynotes · workshops · podcasts",
    image:
      "https://images.pexels.com/photos/6326374/pexels-photo-6326374.jpeg?auto=compress&cs=tinysrgb&w=1800",
    points: ["Custom topic design", "Live audience exercises", "Post-session resources"],
    Icon: Mic2
  },
  {
    key: "library",
    number: "04",
    title: "The working library",
    label: "Self-guided resources",
    copy:
      "Field notes, templates, workshops, and systems for independent people building thoughtful businesses without turning themselves into content machines.",
    meta: "Digital resources from $28",
    image:
      "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1800",
    points: ["Editorial systems", "Offer templates", "Creative planning tools"],
    Icon: BookOpen
  }
];

const notes = [
  {
    quote:
      "Nora helped us find the sentence that changed the entire direction of the company—and then built the system around it.",
    name: "Mara Chen",
    role: "Founder, Common Thread"
  },
  {
    quote:
      "The work felt rigorous without losing its humanity. We left with a clearer brand and a much better way of making decisions.",
    name: "Elias Moore",
    role: "Creative director"
  },
  {
    quote:
      "Her workshop gave our team language for ideas we had felt for years but never knew how to articulate.",
    name: "Samira Cole",
    role: "Head of brand, Northline"
  }
] as const;

function ActionLink({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-[3.2rem] items-center justify-center gap-3 border px-6 text-[0.63rem] font-black uppercase tracking-[0.19em] transition ${
        light
          ? "border-[#f2e3c8]/42 text-[#f2e3c8] hover:bg-[#f2e3c8] hover:text-[#241b16]"
          : "border-[#241b16] bg-[#241b16] text-[#f6ead5] hover:border-[#a7462b] hover:bg-[#a7462b]"
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
      <span className="grid h-10 w-10 place-items-center rounded-full border border-current/30 bg-[#d8a73a] text-[#241b16]">
        <span className="font-display text-lg font-black tracking-[-0.08em]">NV</span>
      </span>
      <span>
        <strong className="block font-display text-xl font-semibold leading-none tracking-[-0.06em]">NORA VALE</strong>
        <small className="mt-1 block text-[0.46rem] font-black uppercase tracking-[0.24em] opacity-55">Writer · strategist · maker</small>
      </span>
    </span>
  );
}

export function CreatorBrandExperience() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeOffer, setActiveOffer] = useState<OfferKey>("strategy");

  const active = offers.find((offer) => offer.key === activeOffer) ?? offers[0];
  const ActiveIcon = active.Icon;

  return (
    <main className="overflow-hidden bg-[#f2e3c8] text-[#241b16]">
      <section className="creator-paper relative min-h-svh overflow-hidden border-b border-[#241b16]/16 bg-[#f2e3c8]">
        <header className="relative z-40 mx-auto flex w-full max-w-[1560px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12 lg:py-7">
          <Link href="/landing-pages" aria-label="Back to landing page gallery">
            <BrandMark />
          </Link>

          <nav className="hidden items-center gap-8 text-[0.61rem] font-black uppercase tracking-[0.19em] text-[#241b16]/60 lg:flex">
            <a className="transition hover:text-[#a7462b]" href="#work">Selected work</a>
            <a className="transition hover:text-[#a7462b]" href="#offers">Work together</a>
            <a className="transition hover:text-[#a7462b]" href="#letter">The letter</a>
            <a className="transition hover:text-[#a7462b]" href="#about">About</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="#letter"
              className="hidden min-h-11 items-center gap-3 rounded-full border border-[#241b16]/18 bg-[#fff7e8]/55 px-5 text-[0.6rem] font-black uppercase tracking-[0.18em] shadow-[0_14px_38px_rgba(55,37,25,0.07)] backdrop-blur-xl transition hover:border-[#a7462b] hover:text-[#a7462b] sm:inline-flex"
            >
              <Mail className="h-4 w-4" />
              Join the letter
            </Link>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full border border-[#241b16]/20 bg-[#fff7e8]/55 backdrop-blur-xl lg:hidden"
              onClick={() => setMenuOpen((value) => !value)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </header>

        {menuOpen ? (
          <div className="absolute inset-x-4 top-20 z-50 rounded-[1.5rem] border border-[#241b16]/14 bg-[#f9ecd5]/96 p-7 shadow-[0_30px_90px_rgba(54,37,25,.16)] backdrop-blur-2xl sm:inset-x-8 lg:hidden">
            <nav className="grid gap-5 font-display text-3xl font-semibold tracking-[-0.05em]">
              <a href="#work" onClick={() => setMenuOpen(false)}>Selected work</a>
              <a href="#offers" onClick={() => setMenuOpen(false)}>Work together</a>
              <a href="#letter" onClick={() => setMenuOpen(false)}>The letter</a>
              <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            </nav>
          </div>
        ) : null}

        <div className="relative z-10 mx-auto grid min-h-[calc(100svh-5.5rem)] w-full max-w-[1560px] gap-9 px-5 pb-6 sm:px-8 sm:pb-9 lg:grid-cols-[0.88fr_1.12fr] lg:px-12 lg:pb-12">
          <div className="flex flex-col justify-center py-14 lg:pr-8 lg:py-20">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#241b16]/14 bg-[#f7dca5]/62 px-3 py-2 text-[0.56rem] font-black uppercase tracking-[0.2em] text-[#74442b]">
              <Sparkles className="h-3.5 w-3.5" />
              Independent studio · Toronto + everywhere
            </div>

            <h1 className="mt-8 max-w-[9.5ch] font-display text-[clamp(4.7rem,8.5vw,10rem)] font-semibold leading-[0.75] tracking-[-0.085em]">
              Build a body of work people come back to.
            </h1>

            <p className="mt-8 max-w-xl text-base leading-8 text-[#655046] sm:text-lg sm:leading-9">
              Strategy, stories, and creative systems for thoughtful people who want to be recognizable without becoming repetitive.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <ActionLink href="#offers">Work with Nora</ActionLink>
              <Link
                href="#work"
                className="group inline-flex min-h-[3.2rem] items-center gap-3 px-2 text-[0.63rem] font-black uppercase tracking-[0.19em]"
              >
                Browse the work
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="mt-12 grid max-w-xl grid-cols-3 border-y border-[#241b16]/15 py-6">
              <div>
                <strong className="font-display text-3xl font-semibold tracking-[-0.055em] sm:text-4xl">68k</strong>
                <p className="mt-2 text-[0.5rem] font-black uppercase tracking-[0.15em] text-[#7a655a]">Readers monthly</p>
              </div>
              <div className="border-x border-[#241b16]/12 px-5">
                <strong className="font-display text-3xl font-semibold tracking-[-0.055em] sm:text-4xl">11</strong>
                <p className="mt-2 text-[0.5rem] font-black uppercase tracking-[0.15em] text-[#7a655a]">Years making</p>
              </div>
              <div className="pl-5">
                <strong className="font-display text-3xl font-semibold tracking-[-0.055em] sm:text-4xl">47</strong>
                <p className="mt-2 text-[0.5rem] font-black uppercase tracking-[0.15em] text-[#7a655a]">Letter issues</p>
              </div>
            </div>
          </div>

          <div className="relative min-h-[72svh] py-4 lg:min-h-0 lg:py-8">
            <div className="absolute inset-x-[8%] inset-y-[3%] rounded-[2.2rem] bg-[#a7462b]" />
            <div className="absolute inset-x-[4%] inset-y-[8%] rotate-[-2deg] rounded-[2.2rem] border border-[#241b16]/22 bg-[#d8a73a]" />
            <div className="absolute inset-x-[10%] inset-y-[1%] rotate-[1.4deg] overflow-hidden rounded-[2.2rem] border border-[#241b16]/18 bg-[#7a7047] shadow-[0_38px_110px_rgba(58,38,25,.2)]">
              <img
                src="https://images.pexels.com/photos/3764016/pexels-photo-3764016.jpeg?auto=compress&cs=tinysrgb&w=1900"
                alt="Independent creator working in a warm studio"
                className="absolute inset-0 h-full w-full object-cover grayscale-[8%] sepia-[10%]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(35,25,18,.02),rgba(35,25,18,.06)_50%,rgba(35,25,18,.68)_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_12%,rgba(244,211,155,.28),transparent_35%)]" />

              <div className="absolute left-5 top-5 rounded-full border border-[#f6ead5]/45 bg-[#241b16]/26 px-4 py-2 text-[#f6ead5] backdrop-blur-xl sm:left-7 sm:top-7">
                <p className="text-[0.5rem] font-black uppercase tracking-[0.2em]">Issue 047 · The Sunday Note</p>
              </div>

              <div className="absolute inset-x-6 bottom-6 border-t border-[#f6ead5]/38 pt-5 text-[#f6ead5] sm:inset-x-9 sm:bottom-9">
                <p className="text-[0.52rem] font-black uppercase tracking-[0.2em] text-[#f6ead5]/55">Current field note</p>
                <p className="mt-2 max-w-lg font-display text-3xl font-semibold leading-tight tracking-[-0.05em] sm:text-4xl">
                  How to stay recognizable while your work keeps changing.
                </p>
              </div>
            </div>

            <div className="absolute bottom-[7%] left-0 w-[42%] rotate-[-5deg] rounded-[1.4rem] border border-[#241b16]/18 bg-[#f7ecd8] p-3 shadow-[0_24px_70px_rgba(58,38,25,.18)] sm:p-4">
              <img
                src="https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Notebook and creative planning"
                className="aspect-[4/3] w-full rounded-[1rem] object-cover sepia-[18%]"
              />
              <div className="flex items-end justify-between gap-3 px-1 pb-1 pt-3">
                <div>
                  <p className="text-[0.46rem] font-black uppercase tracking-[0.18em] text-[#8d6757]">Studio archive</p>
                  <p className="mt-1 font-display text-lg font-semibold tracking-[-0.04em]">Notes before polish.</p>
                </div>
                <span className="text-[0.48rem] font-black uppercase tracking-[0.15em]">35mm</span>
              </div>
            </div>

            <div className="absolute right-0 top-[10%] grid h-28 w-28 rotate-[7deg] place-items-center rounded-full border border-[#241b16]/22 bg-[#d8a73a] text-center shadow-[0_20px_50px_rgba(58,38,25,.15)] sm:h-36 sm:w-36">
              <div>
                <p className="font-display text-2xl font-black tracking-[-0.06em] sm:text-3xl">Since</p>
                <p className="text-[0.58rem] font-black uppercase tracking-[0.2em]">2018</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-b border-[#241b16]/14 bg-[#241b16] py-4 text-[#f2e3c8]">
        <div className="creator-marquee flex min-w-max items-center gap-8 whitespace-nowrap text-[0.58rem] font-black uppercase tracking-[0.22em]">
          {["Creative direction", "Brand strategy", "Essays", "Workshops", "Editorial systems", "Independent business", "Creative direction", "Brand strategy", "Essays", "Workshops", "Editorial systems", "Independent business"].map((item, index) => (
            <span key={`${item}-${index}`} className="flex items-center gap-8">
              {item}
              <span className="h-1.5 w-1.5 rounded-full bg-[#d8a73a]" />
            </span>
          ))}
        </div>
      </section>

      <section id="work" className="creator-paper px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="mx-auto max-w-[1480px]">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-[0.58rem] font-black uppercase tracking-[0.24em] text-[#a7462b]">Selected work</p>
              <h2 className="mt-6 max-w-[8ch] font-display text-[clamp(4rem,7vw,8rem)] font-semibold leading-[0.77] tracking-[-0.075em]">
                A body of work, not a content treadmill.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-8 text-[#68544a] lg:justify-self-end lg:pb-3 sm:text-lg sm:leading-9">
              Essays, tools, conversations, and brand collaborations designed to remain useful after the feed moves on.
            </p>
          </div>

          <div className="mt-14 grid auto-rows-[minmax(15rem,auto)] gap-5 lg:grid-cols-12">
            <article className="group relative min-h-[38rem] overflow-hidden rounded-[2rem] bg-[#7a7047] lg:col-span-7 lg:row-span-2">
              <img
                src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1900"
                alt="Creative team working around a table"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#241b16]/90 via-[#241b16]/8 to-transparent" />
              <div className="absolute left-6 top-6 rounded-full border border-white/28 bg-black/15 px-4 py-2 text-white backdrop-blur-xl">
                <p className="text-[0.5rem] font-black uppercase tracking-[0.2em]">Field guide · 26 pages</p>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-10">
                <p className="text-[0.54rem] font-black uppercase tracking-[0.2em] text-[#edc66a]">Featured release</p>
                <h3 className="mt-4 max-w-[9ch] font-display text-[clamp(3.8rem,6vw,6.8rem)] font-semibold leading-[0.78] tracking-[-0.07em]">
                  The recognizable work playbook.
                </h3>
                <div className="mt-7 flex items-center gap-3 text-[0.6rem] font-black uppercase tracking-[0.18em]">
                  Read the field guide <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </article>

            <article className="relative overflow-hidden rounded-[2rem] border border-[#241b16]/14 bg-[#d8a73a] p-7 lg:col-span-5 sm:p-9">
              <div aria-hidden="true" className="absolute -right-10 -top-12 h-44 w-44 rounded-full border-[34px] border-[#241b16]/[0.06]" />
              <Mic2 className="h-6 w-6" />
              <p className="mt-10 text-[0.52rem] font-black uppercase tracking-[0.22em] text-[#66471c]">The long conversation</p>
              <h3 className="mt-4 max-w-[10ch] font-display text-4xl font-semibold leading-[0.9] tracking-[-0.06em] sm:text-5xl">
                A podcast about what creative work asks of us.
              </h3>
              <div className="mt-9 flex items-center justify-between border-t border-[#241b16]/18 pt-5">
                <span className="text-[0.54rem] font-black uppercase tracking-[0.18em]">Season two · 08 episodes</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </article>

            <article className="group relative min-h-[25rem] overflow-hidden rounded-[2rem] bg-[#a7462b] text-[#f6ead5] lg:col-span-5">
              <img
                src="https://images.pexels.com/photos/261949/pexels-photo-261949.jpeg?auto=compress&cs=tinysrgb&w=1400"
                alt="Old books and editorial references"
                className="absolute inset-0 h-full w-full object-cover opacity-42 mix-blend-multiply transition duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#5f2518]/94 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                <p className="text-[0.52rem] font-black uppercase tracking-[0.21em] text-[#f3cb78]">Archive 014</p>
                <h3 className="mt-4 max-w-[10ch] font-display text-4xl font-semibold leading-[0.9] tracking-[-0.06em] sm:text-5xl">Why taste needs friction.</h3>
                <p className="mt-5 max-w-md text-sm leading-7 text-[#f6ead5]/68">An essay on references, restraint, and letting an idea become specific before it becomes visible.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="offers" className="bg-[#241b16] px-5 py-24 text-[#f6ead5] sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="mx-auto max-w-[1480px]">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-[0.58rem] font-black uppercase tracking-[0.24em] text-[#d8a73a]">Ways to work together</p>
              <h2 className="mt-6 max-w-[8ch] font-display text-[clamp(4rem,7vw,8rem)] font-semibold leading-[0.77] tracking-[-0.075em]">
                Good ideas deserve a useful shape.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-8 text-[#f6ead5]/50 lg:justify-self-end lg:pb-3 sm:text-lg sm:leading-9">
              Choose the kind of support your work needs now—from private strategy to creative direction, workshops, or self-guided tools.
            </p>
          </div>

          <div className="mt-14 grid overflow-hidden rounded-[2rem] border border-[#f6ead5]/14 lg:grid-cols-[0.76fr_1.24fr]">
            <div className="border-b border-[#f6ead5]/14 lg:border-b-0 lg:border-r">
              {offers.map((offer) => (
                <button
                  key={offer.key}
                  type="button"
                  onMouseEnter={() => setActiveOffer(offer.key)}
                  onFocus={() => setActiveOffer(offer.key)}
                  onClick={() => setActiveOffer(offer.key)}
                  className={`group grid w-full grid-cols-[3rem_1fr_auto] items-center gap-4 border-b border-[#f6ead5]/12 py-7 pr-5 text-left transition last:border-b-0 ${
                    activeOffer === offer.key
                      ? "bg-[#d8a73a] pl-5 text-[#241b16]"
                      : "hover:bg-white/[0.04] hover:pl-3"
                  }`}
                  aria-pressed={activeOffer === offer.key}
                >
                  <span className={`text-[0.54rem] font-black tracking-[0.16em] ${activeOffer === offer.key ? "text-[#241b16]/55" : "text-white/30"}`}>{offer.number}</span>
                  <span className="font-display text-2xl font-semibold tracking-[-0.045em] sm:text-3xl">{offer.title}</span>
                  <ChevronRight className={`h-4 w-4 transition ${activeOffer === offer.key ? "opacity-100" : "-translate-x-2 opacity-25"}`} />
                </button>
              ))}
            </div>

            <div className="relative min-h-[43rem] overflow-hidden">
              <img src={active.image} alt={active.title} className="absolute inset-0 h-full w-full object-cover transition duration-700" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,19,15,.04),rgba(28,19,15,.18)_44%,rgba(28,19,15,.94)_100%)]" />
              <div className="absolute left-5 top-5 rounded-full border border-white/25 bg-black/18 px-4 py-2 backdrop-blur-xl sm:left-8 sm:top-8">
                <p className="text-[0.5rem] font-black uppercase tracking-[0.21em]">{active.label}</p>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9 lg:p-12">
                <ActiveIcon className="h-6 w-6 text-[#edc66a]" />
                <p className="mt-5 text-[0.53rem] font-black uppercase tracking-[0.21em] text-[#edc66a]">{active.meta}</p>
                <h3 className="mt-4 max-w-[9ch] font-display text-[clamp(3.6rem,6vw,6.8rem)] font-semibold leading-[0.78] tracking-[-0.07em]">{active.title}</h3>
                <p className="mt-6 max-w-xl text-base leading-8 text-white/62">{active.copy}</p>
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {active.points.map((point, index) => (
                    <div key={point} className="border-t border-white/20 pt-4">
                      <span className="text-[0.48rem] font-black uppercase tracking-[0.18em] text-[#edc66a]">0{index + 1}</span>
                      <p className="mt-2 text-sm font-semibold text-white/82">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="letter" className="creator-paper px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="mx-auto max-w-[1480px]">
          <div className="relative overflow-hidden rounded-[2.4rem] bg-[#7f3528] px-6 py-16 text-[#f6ead5] sm:px-10 sm:py-20 lg:px-16 lg:py-24">
            <div aria-hidden="true" className="absolute -right-24 -top-28 h-[26rem] w-[26rem] rounded-full border-[72px] border-[#d8a73a]/12" />
            <div aria-hidden="true" className="absolute bottom-10 right-[12%] h-28 w-36 rotate-[8deg] border-2 border-dashed border-[#f6ead5]/28 p-3 text-center text-[0.48rem] font-black uppercase tracking-[0.16em] text-[#f6ead5]/48 sm:grid sm:place-items-center">
              Posted Sundays<br />Toronto, Canada
            </div>

            <div className="relative grid gap-12 lg:grid-cols-[1fr_0.72fr] lg:items-end">
              <div>
                <p className="text-[0.58rem] font-black uppercase tracking-[0.24em] text-[#edc66a]">The Sunday Note</p>
                <h2 className="mt-7 max-w-[9ch] font-display text-[clamp(4.6rem,8vw,9.2rem)] font-semibold leading-[0.75] tracking-[-0.08em]">
                  One useful idea for the week ahead.
                </h2>
                <p className="mt-8 max-w-xl text-base leading-8 text-[#f6ead5]/64 sm:text-lg sm:leading-9">
                  A letter about creative work, independent business, and building a recognizable point of view without manufacturing a louder personality.
                </p>
              </div>

              <form className="relative rounded-[1.8rem] border border-[#f6ead5]/22 bg-[#f3e4ca] p-6 text-[#241b16] shadow-[16px_16px_0_rgba(36,27,22,.42)] sm:p-8" onSubmit={(event) => event.preventDefault()}>
                <div className="flex items-start justify-between gap-5 border-b border-[#241b16]/16 pb-5">
                  <div>
                    <p className="text-[0.52rem] font-black uppercase tracking-[0.19em] text-[#826b5f]">Free weekly letter</p>
                    <h3 className="mt-2 font-display text-3xl font-semibold tracking-[-0.05em]">Come read along.</h3>
                  </div>
                  <Mail className="h-6 w-6 text-[#a7462b]" />
                </div>
                <label className="mt-6 grid gap-2">
                  <span className="text-[0.52rem] font-black uppercase tracking-[0.17em] text-[#80685c]">Email address</span>
                  <input type="email" className="min-h-12 border-b border-[#241b16]/26 bg-transparent px-0 text-base outline-none placeholder:text-[#241b16]/30 focus:border-[#a7462b]" placeholder="you@email.com" />
                </label>
                <button type="submit" className="mt-7 flex min-h-[3.2rem] w-full items-center justify-center gap-3 rounded-full bg-[#241b16] px-6 text-[0.63rem] font-black uppercase tracking-[0.2em] text-white transition hover:bg-[#a7462b]">
                  Join 18,000+ readers <ArrowRight className="h-4 w-4" />
                </button>
                <p className="mt-4 text-center text-[0.49rem] font-bold uppercase tracking-[0.14em] text-[#897469]">No growth hacks. No daily noise. Unsubscribe anytime.</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="bg-[#7a7047] px-5 py-24 text-[#f6ead5] sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="mx-auto grid max-w-[1480px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative min-h-[44rem]">
            <div className="absolute left-[8%] top-[4%] h-[82%] w-[72%] rotate-[-3deg] rounded-[2rem] bg-[#d8a73a]" />
            <img
              src="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Nora Vale in her studio"
              className="absolute left-[4%] top-0 h-[84%] w-[74%] rotate-[1.5deg] rounded-[2rem] object-cover grayscale-[10%] sepia-[8%] shadow-[0_34px_90px_rgba(28,20,15,.28)]"
            />
            <div className="absolute bottom-[2%] right-[2%] w-[48%] rotate-[4deg] rounded-[1.5rem] border border-[#241b16]/18 bg-[#f2e3c8] p-5 text-[#241b16] shadow-[0_24px_70px_rgba(28,20,15,.24)] sm:p-7">
              <p className="text-[0.5rem] font-black uppercase tracking-[0.2em] text-[#9a583f]">A note from Nora</p>
              <p className="mt-4 font-display text-2xl font-semibold leading-tight tracking-[-0.045em]">Make the work honest first. Make it impressive second.</p>
            </div>
          </div>

          <div className="lg:pl-10 xl:pl-20">
            <p className="text-[0.58rem] font-black uppercase tracking-[0.24em] text-[#edc66a]">About the studio</p>
            <blockquote className="mt-7 max-w-[10ch] font-display text-[clamp(3.8rem,6vw,7rem)] font-semibold leading-[0.8] tracking-[-0.07em]">
              “The internet moves quickly. Good work does not have to.”
            </blockquote>
            <p className="mt-8 max-w-xl text-base leading-8 text-[#f6ead5]/62 sm:text-lg sm:leading-9">
              Nora is a writer and creative strategist helping independent founders, teams, and creators turn scattered ideas into a body of work with memory, usefulness, and a point of view.
            </p>
            <div className="mt-10 grid gap-5 border-y border-[#f6ead5]/18 py-7 sm:grid-cols-3">
              {[["11+", "Years creating"], ["32", "Brand collaborations"], ["9", "Countries taught"]].map(([value, label]) => (
                <div key={label}>
                  <strong className="font-display text-4xl font-semibold tracking-[-0.06em]">{value}</strong>
                  <p className="mt-2 text-[0.5rem] font-black uppercase tracking-[0.15em] text-[#f6ead5]/42">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="creator-paper px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="mx-auto max-w-[1480px]">
          <div className="flex flex-col gap-8 border-b border-[#241b16]/16 pb-9 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[0.58rem] font-black uppercase tracking-[0.24em] text-[#a7462b]">Notes from the work</p>
              <h2 className="mt-5 max-w-[9ch] font-display text-[clamp(4rem,7vw,8rem)] font-semibold leading-[0.77] tracking-[-0.075em]">Kind words, kept in the archive.</h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-[#6d584e]">A few notes from founders, teams, and creative people who invited Nora into the room.</p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {notes.map((note, index) => (
              <article key={note.name} className={`rounded-[1.8rem] border p-7 sm:p-8 ${index === 1 ? "border-[#241b16] bg-[#241b16] text-[#f6ead5] md:-translate-y-8" : "border-[#241b16]/14 bg-[#f8ecd8]"}`}>
                <Quote className={`h-6 w-6 ${index === 1 ? "text-[#d8a73a]" : "text-[#a7462b]"}`} />
                <p className="mt-8 font-display text-2xl font-semibold leading-[1.15] tracking-[-0.045em]">“{note.quote}”</p>
                <div className={`mt-8 border-t pt-5 ${index === 1 ? "border-white/16" : "border-[#241b16]/12"}`}>
                  <p className="text-[0.54rem] font-black uppercase tracking-[0.18em]">{note.name}</p>
                  <p className={`mt-2 text-xs ${index === 1 ? "text-white/42" : "text-[#7c675c]"}`}>{note.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#d8a73a] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div aria-hidden="true" className="absolute -bottom-32 -right-24 h-[30rem] w-[30rem] rounded-full border-[80px] border-[#241b16]/[0.06]" />
        <div className="relative mx-auto flex max-w-[1480px] flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[0.58rem] font-black uppercase tracking-[0.24em] text-[#6d481a]">Make the next thing count</p>
            <h2 className="mt-7 max-w-[10ch] font-display text-[clamp(4.8rem,8.5vw,10rem)] font-semibold leading-[0.73] tracking-[-0.085em]">Bring the good idea. We will give it a useful shape.</h2>
          </div>
          <div className="shrink-0 lg:pb-3">
            <ActionLink href={startHref}>Use this design</ActionLink>
          </div>
        </div>
      </section>

      <footer className="bg-[#241b16] px-5 py-10 text-[#f6ead5] sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1480px] flex-col gap-8 border-t border-white/14 pt-8 md:flex-row md:items-end md:justify-between">
          <BrandMark />
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-[0.54rem] font-black uppercase tracking-[0.18em] text-white/40">
            <Link className="hover:text-[#d8a73a]" href={startHref}>Use this design</Link>
            <Link className="hover:text-[#d8a73a]" href="/landing-pages">Back to gallery</Link>
            <span>Demo concept · GridSpell Studio</span>
          </div>
        </div>
      </footer>

      <style>{`
        .creator-paper {
          background-color: #f2e3c8;
          background-image:
            radial-gradient(circle at 10% 20%, rgba(167,70,43,.055) 0 1px, transparent 1.6px),
            radial-gradient(circle at 82% 64%, rgba(36,27,22,.045) 0 1px, transparent 1.5px);
          background-size: 22px 22px, 29px 29px;
        }
        @keyframes creator-marquee {
          to { transform: translateX(-50%); }
        }
        .creator-marquee { animation: creator-marquee 28s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .creator-marquee { animation: none !important; }
        }
      `}</style>
    </main>
  );
}
