"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  ArrowRight,
  Bath,
  BedDouble,
  CalendarDays,
  ChevronDown,
  MapPin,
  Maximize2,
  Menu,
  MoveRight,
  Pause,
  Play,
  Search,
  X
} from "lucide-react";

const startHref =
  "/start-project?package=landing-page&source=luxury-real-estate&design=Luxury+Real+Estate";

const properties = [
  {
    name: "The Ravine House",
    location: "Forest Hill, Toronto",
    price: "$6.8M",
    beds: "5 beds",
    baths: "6 baths",
    area: "6,240 sq ft",
    image:
      "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1800"
  },
  {
    name: "Glass House on the Lake",
    location: "Muskoka, Ontario",
    price: "$8.4M",
    beds: "6 beds",
    baths: "7 baths",
    area: "8,110 sq ft",
    image:
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1800"
  },
  {
    name: "The Yorkville Residence",
    location: "Yorkville, Toronto",
    price: "$4.25M",
    beds: "3 beds",
    baths: "4 baths",
    area: "3,480 sq ft",
    image:
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1800"
  }
] as const;

const services = [
  ["01", "Private acquisition", "Quiet access to on-market and privately represented residences."],
  ["02", "Strategic listing", "Editorial positioning, presentation, and launch strategy for exceptional homes."],
  ["03", "Relocation advisory", "Neighborhood intelligence and a clear path through every stage of the move."],
  ["04", "Investment guidance", "Long-term perspective for buyers building a considered property portfolio."]
] as const;

function OutlineLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex min-h-12 items-center justify-center gap-3 border border-current px-5 text-[0.68rem] font-bold uppercase tracking-[0.2em] transition hover:bg-current"
    >
      <span className="group-hover:text-[#11110f]">{children}</span>
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:text-[#11110f]" />
    </Link>
  );
}

export function LuxuryRealEstateExperience() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchMode, setSearchMode] = useState<"Buy" | "Rent" | "Sell">("Buy");

  const toggleVideo = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      await video.play().catch(() => undefined);
      setVideoPlaying(true);
    } else {
      video.pause();
      setVideoPlaying(false);
    }
  };

  return (
    <main className="overflow-hidden bg-[#f2efe8] text-[#151512]">
      <section className="relative min-h-svh bg-[#11110f] text-white">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="https://images.pexels.com/videos/37694695/exterior-design-luxury-villa-modern-house-real-estate-37694695.jpeg?auto=compress&cs=tinysrgb&w=1920"
          aria-hidden="true"
        >
          <source
            src="https://videos.pexels.com/video-files/37694695/37694695-hd_1920_1080_30fps.mp4"
            type="video/mp4"
          />
          <source src="https://www.pexels.com/download/video/37694695/" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,6,.58)_0%,rgba(7,7,6,.08)_34%,rgba(7,7,6,.22)_61%,rgba(7,7,6,.78)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_28%,transparent_0%,rgba(0,0,0,.18)_52%,rgba(0,0,0,.42)_100%)]" />

        <header className="relative z-30 mx-auto flex w-full max-w-[1500px] items-center justify-between px-5 py-6 sm:px-8 lg:px-12">
          <Link href="/landing-pages" className="flex items-end gap-3" aria-label="Back to landing page gallery">
            <span className="font-display text-2xl font-medium tracking-[-0.06em] sm:text-3xl">MORROW</span>
            <span className="mb-1 hidden text-[0.56rem] font-bold uppercase tracking-[0.22em] text-white/55 sm:block">
              Private Realty
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-white/72 lg:flex">
            <a className="transition hover:text-white" href="#properties">Properties</a>
            <a className="transition hover:text-white" href="#lifestyle">Neighborhoods</a>
            <a className="transition hover:text-white" href="#services">Private sales</a>
            <a className="transition hover:text-white" href="#advisor">About</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="#inquiry"
              className="hidden border-b border-white/50 pb-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] transition hover:border-white sm:block"
            >
              Book a private tour
            </Link>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center border border-white/35 bg-black/10 backdrop-blur-md lg:hidden"
              onClick={() => setMenuOpen((value) => !value)}
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </header>

        {menuOpen ? (
          <div className="absolute inset-x-4 top-24 z-40 border border-white/20 bg-[#11110f]/95 p-7 backdrop-blur-2xl sm:inset-x-8 lg:hidden">
            <nav className="grid gap-5 text-xl font-medium">
              <a href="#properties" onClick={() => setMenuOpen(false)}>Properties</a>
              <a href="#lifestyle" onClick={() => setMenuOpen(false)}>Neighborhoods</a>
              <a href="#services" onClick={() => setMenuOpen(false)}>Private sales</a>
              <a href="#advisor" onClick={() => setMenuOpen(false)}>About</a>
              <a href="#inquiry" onClick={() => setMenuOpen(false)}>Book a private tour</a>
            </nav>
          </div>
        ) : null}

        <div className="relative z-20 mx-auto flex min-h-[calc(100svh-7rem)] w-full max-w-[1500px] flex-col justify-end px-5 pb-8 sm:px-8 sm:pb-10 lg:px-12 lg:pb-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_22rem] lg:items-end">
            <div>
              <p className="mb-6 text-[0.64rem] font-bold uppercase tracking-[0.28em] text-white/66">
                Private residences · curated globally
              </p>
              <h1 className="max-w-[10ch] font-display text-[clamp(4.5rem,9vw,10.5rem)] font-medium leading-[0.76] tracking-[-0.085em] text-white">
                Sell the lifestyle before the showing.
              </h1>
            </div>

            <div className="max-w-sm border-l border-white/30 pl-5 lg:justify-self-end">
              <p className="text-sm leading-7 text-white/72 sm:text-base">
                Exceptional homes deserve more than a listing. We position the architecture, the neighborhood, and the life waiting inside it.
              </p>
              <Link
                href="#properties"
                className="mt-7 inline-flex items-center gap-3 text-[0.66rem] font-bold uppercase tracking-[0.2em]"
              >
                Explore residences
                <MoveRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-9 grid border border-white/25 bg-black/25 backdrop-blur-xl lg:grid-cols-[auto_1fr_1fr_1fr_auto]">
            <div className="flex border-b border-white/20 lg:border-b-0 lg:border-r">
              {(["Buy", "Rent", "Sell"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setSearchMode(mode)}
                  className={`min-h-16 flex-1 px-5 text-[0.62rem] font-bold uppercase tracking-[0.18em] transition lg:flex-none ${
                    searchMode === mode ? "bg-white text-[#11110f]" : "text-white/58 hover:text-white"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            <button className="flex min-h-16 items-center justify-between border-b border-white/20 px-5 text-left lg:border-b-0 lg:border-r" type="button">
              <span>
                <small className="block text-[0.55rem] font-bold uppercase tracking-[0.2em] text-white/42">Location</small>
                <strong className="mt-1 block text-sm font-medium text-white/88">Toronto & surrounding</strong>
              </span>
              <MapPin className="h-4 w-4 text-white/55" />
            </button>

            <button className="flex min-h-16 items-center justify-between border-b border-white/20 px-5 text-left lg:border-b-0 lg:border-r" type="button">
              <span>
                <small className="block text-[0.55rem] font-bold uppercase tracking-[0.2em] text-white/42">Property type</small>
                <strong className="mt-1 block text-sm font-medium text-white/88">All residences</strong>
              </span>
              <ChevronDown className="h-4 w-4 text-white/55" />
            </button>

            <button className="flex min-h-16 items-center justify-between border-b border-white/20 px-5 text-left lg:border-b-0 lg:border-r" type="button">
              <span>
                <small className="block text-[0.55rem] font-bold uppercase tracking-[0.2em] text-white/42">Price range</small>
                <strong className="mt-1 block text-sm font-medium text-white/88">$2M — $10M+</strong>
              </span>
              <ChevronDown className="h-4 w-4 text-white/55" />
            </button>

            <button
              type="button"
              className="flex min-h-16 items-center justify-center gap-3 bg-white px-7 text-[0.64rem] font-bold uppercase tracking-[0.2em] text-[#11110f] transition hover:bg-[#d9d1c2]"
            >
              <Search className="h-4 w-4" />
              Search
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={toggleVideo}
          className="absolute right-5 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center border border-white/30 bg-black/20 text-white backdrop-blur-md transition hover:bg-black/45 sm:right-8 lg:right-12"
          aria-label={videoPlaying ? "Pause background video" : "Play background video"}
        >
          {videoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>
      </section>

      <section className="px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-12 lg:grid-cols-[0.42fr_1.58fr]">
            <div>
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-[#6e675c]">Why Morrow</p>
              <div className="mt-5 h-px bg-[#151512]/20" />
            </div>
            <div>
              <h2 className="max-w-[12ch] font-display text-[clamp(3.8rem,7vw,8rem)] font-medium leading-[0.82] tracking-[-0.07em]">
                A home is not a floor plan. It is what life feels like inside it.
              </h2>
              <div className="mt-10 grid gap-8 border-t border-[#151512]/18 pt-8 md:grid-cols-2">
                <p className="max-w-lg text-base leading-8 text-[#59564f]">
                  We present every residence as a complete point of view: morning light, quiet streets, the table everyone gathers around, and the rooms that become memories.
                </p>
                <p className="max-w-lg text-base leading-8 text-[#59564f]">
                  Clear advice and deeply considered marketing give buyers confidence and give sellers a more meaningful way to stand apart.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="properties" className="bg-[#151512] px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex flex-col gap-8 border-b border-white/15 pb-9 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-white/45">Featured residences</p>
              <h2 className="mt-4 font-display text-[clamp(3.5rem,6vw,7rem)] font-medium leading-[0.82] tracking-[-0.07em]">
                Places worth arriving at.
              </h2>
            </div>
            <Link href="#inquiry" className="inline-flex items-center gap-3 text-[0.64rem] font-bold uppercase tracking-[0.2em] text-white/72">
              View private inventory
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-9 lg:grid-cols-3">
            {properties.map((property, index) => (
              <article key={property.name} className="group">
                <div className={`relative overflow-hidden ${index === 1 ? "lg:mt-16" : ""}`}>
                  <img
                    src={property.image}
                    alt={property.name}
                    className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-[1.035]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/62 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                    <p className="text-[0.58rem] font-bold uppercase tracking-[0.18em] text-white/66">Private residence</p>
                    <span className="grid h-10 w-10 place-items-center border border-white/35 bg-black/15 backdrop-blur-md">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>

                <div className="border-b border-white/15 py-5">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <h3 className="font-display text-3xl font-medium tracking-[-0.055em]">{property.name}</h3>
                      <p className="mt-2 flex items-center gap-2 text-xs text-white/48">
                        <MapPin className="h-3.5 w-3.5" />
                        {property.location}
                      </p>
                    </div>
                    <p className="text-lg font-medium">{property.price}</p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[0.58rem] font-bold uppercase tracking-[0.14em] text-white/42">
                    <span className="inline-flex items-center gap-2"><BedDouble className="h-3.5 w-3.5" />{property.beds}</span>
                    <span className="inline-flex items-center gap-2"><Bath className="h-3.5 w-3.5" />{property.baths}</span>
                    <span className="inline-flex items-center gap-2"><Maximize2 className="h-3.5 w-3.5" />{property.area}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="lifestyle" className="grid min-h-svh bg-[#d8d0c2] lg:grid-cols-2">
        <div className="relative min-h-[68svh] overflow-hidden lg:min-h-svh">
          <img
            src="https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=2000"
            alt="Warm contemporary living room"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/52 via-transparent to-transparent" />
          <p className="absolute bottom-7 left-7 max-w-xs text-xs leading-6 text-white/72 sm:bottom-10 sm:left-10">
            Architecture creates the frame. Daily life is what makes it valuable.
          </p>
        </div>

        <div className="flex items-center px-5 py-20 sm:px-10 sm:py-28 lg:px-16 xl:px-24">
          <div className="max-w-xl">
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-[#615b51]">The neighborhood story</p>
            <h2 className="mt-6 font-display text-[clamp(4rem,7vw,7.5rem)] font-medium leading-[0.78] tracking-[-0.075em]">
              Find the rhythm that fits your life.
            </h2>
            <p className="mt-8 max-w-lg text-base leading-8 text-[#57534b]">
              The right address changes how the week feels. Walkability, schools, privacy, restaurants, green space, and community matter long after the first impression.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-7 border-t border-[#151512]/18 pt-8">
              {["Architecture", "Community", "Daily rituals", "Long-term value"].map((item, index) => (
                <div key={item}>
                  <span className="text-[0.55rem] font-bold uppercase tracking-[0.18em] text-[#6c665c]">0{index + 1}</span>
                  <p className="mt-2 font-display text-2xl font-medium tracking-[-0.04em]">{item}</p>
                </div>
              ))}
            </div>
            <Link href="#inquiry" className="mt-10 inline-flex items-center gap-3 border-b border-[#151512] pb-2 text-[0.65rem] font-bold uppercase tracking-[0.2em]">
              Explore neighborhoods
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section id="services" className="px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-12 lg:grid-cols-[0.68fr_1.32fr]">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-[#6e675c]">How we advise</p>
              <h2 className="mt-6 max-w-[7ch] font-display text-[clamp(4rem,7vw,7.5rem)] font-medium leading-[0.78] tracking-[-0.075em]">
                Guidance without the noise.
              </h2>
            </div>

            <div className="border-t border-[#151512]/22">
              {services.map(([number, title, copy]) => (
                <article key={title} className="group grid gap-5 border-b border-[#151512]/22 py-8 sm:grid-cols-[4rem_0.72fr_1.28fr] sm:items-start sm:py-10">
                  <p className="text-[0.58rem] font-bold uppercase tracking-[0.18em] text-[#777064]">{number}</p>
                  <h3 className="font-display text-3xl font-medium tracking-[-0.055em] sm:text-4xl">{title}</h3>
                  <div className="flex items-start justify-between gap-6">
                    <p className="max-w-lg text-sm leading-7 text-[#625e57] sm:text-base sm:leading-8">{copy}</p>
                    <ArrowRight className="mt-1 h-5 w-5 shrink-0 transition-transform group-hover:translate-x-2" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="advisor" className="bg-[#e5dfd4] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-36">
        <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="relative overflow-hidden">
            <img
              src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Private real estate advisor"
              className="aspect-[4/5] w-full object-cover grayscale"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/72 to-transparent p-7 pt-24 text-white sm:p-9">
              <p className="font-display text-3xl font-medium tracking-[-0.05em]">Amelia Morrow</p>
              <p className="mt-2 text-[0.58rem] font-bold uppercase tracking-[0.18em] text-white/55">Broker · Private client advisor</p>
            </div>
          </div>

          <div className="lg:pl-10 xl:pl-20">
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-[#6e675c]">A human point of view</p>
            <blockquote className="mt-7 font-display text-[clamp(3rem,5vw,6rem)] font-medium leading-[0.88] tracking-[-0.065em]">
              “The best move is the one that still feels right years later.”
            </blockquote>
            <p className="mt-8 max-w-xl text-base leading-8 text-[#5d5952]">
              One advisor, one clear strategy, and direct communication from the first conversation through closing. No handoffs. No pressure. No unnecessary theatre.
            </p>
            <div className="mt-9 flex flex-wrap gap-8 border-y border-[#151512]/18 py-7">
              <div><strong className="font-display text-4xl font-medium tracking-[-0.06em]">18</strong><p className="mt-1 text-[0.55rem] font-bold uppercase tracking-[0.16em] text-[#716b61]">Years advising</p></div>
              <div><strong className="font-display text-4xl font-medium tracking-[-0.06em]">92%</strong><p className="mt-1 text-[0.55rem] font-bold uppercase tracking-[0.16em] text-[#716b61]">Referral business</p></div>
              <div><strong className="font-display text-4xl font-medium tracking-[-0.06em]">24h</strong><p className="mt-1 text-[0.55rem] font-bold uppercase tracking-[0.16em] text-[#716b61]">Response standard</p></div>
            </div>
          </div>
        </div>
      </section>

      <section id="inquiry" className="relative min-h-[82svh] overflow-hidden bg-[#11110f] text-white">
        <img
          src="https://images.pexels.com/photos/261146/pexels-photo-261146.jpeg?auto=compress&cs=tinysrgb&w=2200"
          alt="Luxury home at dusk"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,11,9,.86),rgba(11,11,9,.44)_55%,rgba(11,11,9,.24))]" />

        <div className="relative mx-auto flex min-h-[82svh] max-w-[1500px] items-center px-5 py-24 sm:px-8 lg:px-12">
          <div className="max-w-4xl">
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.25em] text-white/52">Your next move</p>
            <h2 className="mt-6 max-w-[10ch] font-display text-[clamp(4.5rem,9vw,10rem)] font-medium leading-[0.76] tracking-[-0.085em]">
              Find the place that moves you forward.
            </h2>
            <p className="mt-8 max-w-xl text-base leading-8 text-white/65">
              Tell us what is changing, what matters most, and where you want life to go next.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <OutlineLink href={startHref}>Start this real estate design</OutlineLink>
              <Link
                href="/landing-pages"
                className="inline-flex min-h-12 items-center gap-3 border-b border-white/50 px-2 text-[0.68rem] font-bold uppercase tracking-[0.2em]"
              >
                Back to gallery
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#11110f] px-5 pb-8 text-white sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1500px] gap-9 border-t border-white/15 pt-9 md:grid-cols-[1fr_auto_auto] md:items-end">
          <div>
            <p className="font-display text-4xl font-medium tracking-[-0.065em]">MORROW</p>
            <p className="mt-3 max-w-sm text-sm leading-7 text-white/42">Private real estate represented with restraint, clarity, and a strong point of view.</p>
          </div>
          <div className="text-sm leading-7 text-white/52">
            <p>hello@morrowrealty.example</p>
            <p>+1 416 555 0148</p>
          </div>
          <div className="flex items-center gap-2 text-[0.55rem] font-bold uppercase tracking-[0.16em] text-white/36 md:justify-end">
            <CalendarDays className="h-4 w-4" />
            Private appointments
          </div>
        </div>
      </footer>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          video { display: none; }
          * { scroll-behavior: auto !important; }
        }
      `}</style>
    </main>
  );
}
