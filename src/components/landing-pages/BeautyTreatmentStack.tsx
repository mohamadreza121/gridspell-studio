"use client";

import Image from "next/image";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  Scissors,
  Sparkles,
  Star,
  type LucideIcon
} from "lucide-react";

type Treatment = {
  key: string;
  number: string;
  title: string;
  label: string;
  description: string;
  duration: string;
  price: string;
  image: string;
  inclusions: string[];
  accent: string;
  surface: string;
  Icon: LucideIcon;
};

const treatments: Treatment[] = [
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
    accent: "#f4c3ae",
    surface: "#9d523f",
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
    accent: "#f2d6c8",
    surface: "#6f4538",
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
    accent: "#f5c9bd",
    surface: "#8a4d55",
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
    accent: "#efb99d",
    surface: "#4a302a",
    Icon: Star
  }
];

function cardStyle(position: number, surface: string): CSSProperties {
  const transforms = [
    "translate3d(0,0,0) scale(1) rotate(0deg)",
    "translate3d(18px,18px,0) scale(.975) rotate(1.2deg)",
    "translate3d(34px,36px,0) scale(.95) rotate(-1.4deg)",
    "translate3d(48px,54px,0) scale(.925) rotate(.8deg)"
  ];

  return {
    zIndex: treatments.length - position,
    transform: transforms[position] ?? transforms[transforms.length - 1],
    backgroundColor: surface,
    pointerEvents: position === 0 ? "auto" : "none"
  };
}

function TreatmentStack() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTreatment = treatments[activeIndex];

  const orderedCards = useMemo(
    () =>
      treatments.map((treatment, index) => ({
        treatment,
        index,
        position: (index - activeIndex + treatments.length) % treatments.length
      })),
    [activeIndex]
  );

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + treatments.length) % treatments.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % treatments.length);
  };

  return (
    <div className="beauty-treatment-stack-root mx-auto max-w-[1450px]">
      <style>{`
        #services.beauty-treatment-stack-ready > :not(.beauty-treatment-stack-root) {
          display: none !important;
        }

        .beauty-treatment-card {
          transition:
            transform 680ms cubic-bezier(.2,.8,.2,1),
            opacity 420ms ease,
            filter 420ms ease,
            box-shadow 520ms ease;
          transform-origin: 50% 100%;
        }

        .beauty-treatment-card[data-position="0"] {
          box-shadow: 0 42px 120px rgba(72, 38, 30, .22);
          filter: saturate(1);
        }

        .beauty-treatment-card:not([data-position="0"]) {
          filter: saturate(.82) brightness(.9);
        }

        .beauty-treatment-image {
          transition: transform 1.1s cubic-bezier(.2,.8,.2,1);
        }

        .beauty-treatment-card[data-position="0"] .beauty-treatment-image {
          transform: scale(1.025);
        }

        @media (max-width: 1023px) {
          .beauty-treatment-deck {
            min-height: 44rem;
          }
        }

        @media (max-width: 639px) {
          .beauty-treatment-deck {
            min-height: 46rem;
          }

          .beauty-treatment-card {
            transform: none !important;
            opacity: 0;
            pointer-events: none !important;
          }

          .beauty-treatment-card[data-position="0"] {
            opacity: 1;
            pointer-events: auto !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .beauty-treatment-card,
          .beauty-treatment-image {
            transition: none !important;
          }
        }
      `}</style>

      <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
        <div>
          <p className="text-[0.58rem] font-black uppercase tracking-[0.24em] text-[#a45f4e]">
            The treatment edit
          </p>
          <h2 className="mt-6 max-w-[8ch] font-display text-[clamp(4rem,7vw,8rem)] font-medium leading-[0.78] tracking-[-0.075em]">
            A smaller menu, done beautifully.
          </h2>
        </div>

        <div className="lg:justify-self-end">
          <p className="max-w-xl text-base leading-8 text-[#6c5952] sm:text-lg sm:leading-9">
            Four focused treatments, each given the time, detail, and space to feel entirely personal.
          </p>
          <div className="mt-7 flex items-center gap-3">
            <button
              type="button"
              onClick={showPrevious}
              className="grid h-12 w-12 place-items-center rounded-full border border-[#3b241f]/16 bg-[#fffaf5] transition hover:border-[#b7644e] hover:text-[#b7644e]"
              aria-label="Previous treatment"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={showNext}
              className="grid h-12 w-12 place-items-center rounded-full border border-[#3b241f]/16 bg-[#fffaf5] transition hover:border-[#b7644e] hover:text-[#b7644e]"
              aria-label="Next treatment"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <p className="ml-2 text-[0.54rem] font-black uppercase tracking-[0.18em] text-[#8a6d64]">
              {activeTreatment.number} / 04
            </p>
          </div>
        </div>
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-[0.38fr_1.62fr] lg:items-start">
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
          {treatments.map((treatment, index) => {
            const Icon = treatment.Icon;
            const selected = index === activeIndex;

            return (
              <button
                key={treatment.key}
                type="button"
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                className={`group flex min-h-[5.8rem] items-center gap-4 rounded-[1.45rem] border p-4 text-left transition sm:p-5 ${
                  selected
                    ? "border-[#3b241f] bg-[#3b241f] text-white shadow-[0_20px_55px_rgba(59,36,31,.16)]"
                    : "border-[#3b241f]/10 bg-[#fffaf5] hover:-translate-y-0.5 hover:border-[#b7644e]/45"
                }`}
                aria-pressed={selected}
              >
                <span
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border ${
                    selected ? "border-white/20 bg-white/10" : "border-[#3b241f]/12 bg-[#f4ded2]"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className={`block text-[0.5rem] font-black uppercase tracking-[0.19em] ${selected ? "text-white/48" : "text-[#9b776c]"}`}>
                    {treatment.label}
                  </span>
                  <span className="mt-2 block font-display text-xl font-semibold leading-tight tracking-[-0.04em]">
                    {treatment.title}
                  </span>
                </span>
                <ArrowRight className={`h-4 w-4 shrink-0 transition-transform ${selected ? "translate-x-0" : "-translate-x-1 opacity-30 group-hover:translate-x-0 group-hover:opacity-100"}`} />
              </button>
            );
          })}
        </div>

        <div className="beauty-treatment-deck relative min-h-[48rem] pr-5 pb-14 sm:pr-12 sm:pb-20 lg:min-h-[45rem]">
          {orderedCards.map(({ treatment, position }) => {
            const Icon = treatment.Icon;

            return (
              <article
                key={treatment.key}
                className="beauty-treatment-card absolute inset-x-0 top-0 overflow-hidden rounded-[2.5rem] border border-white/18 text-white"
                data-position={position}
                style={cardStyle(position, treatment.surface)}
                aria-hidden={position !== 0}
              >
                <div className="grid min-h-[42rem] lg:grid-cols-[1.08fr_0.92fr]">
                  <div className="relative min-h-[22rem] overflow-hidden lg:min-h-full">
                    <Image width={1600} height={1000} sizes="100vw" unoptimized
                      src={treatment.image}
                      alt={treatment.title}
                      className="beauty-treatment-image absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(36,20,16,.02),rgba(36,20,16,.12)_52%,rgba(36,20,16,.62)_100%)]" />
                    <div className="absolute left-5 top-5 rounded-full border border-white/30 bg-[#3b241f]/24 px-4 py-2 backdrop-blur-xl sm:left-7 sm:top-7">
                      <p className="text-[0.52rem] font-black uppercase tracking-[0.2em]">{treatment.label}</p>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4 sm:bottom-8 sm:left-8 sm:right-8">
                      <p className="max-w-xs text-sm leading-7 text-white/74">Tailored consultation included with every appointment.</p>
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/30 bg-white/12 backdrop-blur-xl">
                        <Icon className="h-5 w-5" />
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between p-6 sm:p-9 lg:p-11" style={{ backgroundColor: treatment.surface }}>
                    <div>
                      <div className="flex items-start justify-between gap-5">
                        <span className="text-[0.55rem] font-black uppercase tracking-[0.2em] text-white/45">Treatment {treatment.number}</span>
                        <div className="flex flex-wrap justify-end gap-2 text-[0.52rem] font-black uppercase tracking-[0.15em] text-white/68">
                          <span className="rounded-full border border-white/18 px-3 py-2">{treatment.duration}</span>
                          <span className="rounded-full border border-white/18 px-3 py-2">{treatment.price}</span>
                        </div>
                      </div>

                      <h3 className="mt-8 max-w-[8ch] font-display text-[clamp(3.4rem,5.8vw,6.2rem)] font-medium leading-[0.78] tracking-[-0.07em]">
                        {treatment.title}
                      </h3>
                      <p className="mt-7 max-w-lg text-base leading-8 text-white/68">
                        {treatment.description}
                      </p>
                    </div>

                    <div className="mt-10">
                      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                        {treatment.inclusions.map((item, index) => (
                          <div key={item} className="border-t border-white/18 pt-4">
                            <span className="text-[0.48rem] font-black uppercase tracking-[0.18em]" style={{ color: treatment.accent }}>
                              0{index + 1}
                            </span>
                            <p className="mt-2 text-sm font-semibold text-white/82">{item}</p>
                          </div>
                        ))}
                      </div>

                      <a
                        href="#book"
                        className="mt-8 inline-flex min-h-[3.2rem] items-center gap-3 rounded-full border border-white/24 px-5 text-[0.6rem] font-black uppercase tracking-[0.19em] transition hover:bg-white hover:text-[#3b241f]"
                      >
                        Reserve this treatment
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function BeautyTreatmentStackPortal() {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const section = document.querySelector<HTMLElement>("#services");
    if (!section) return;

    section.classList.add("beauty-treatment-stack-ready");
    window.requestAnimationFrame(() => setTarget(section));

    return () => {
      section.classList.remove("beauty-treatment-stack-ready");
    };
  }, []);

  return target ? createPortal(<TreatmentStack />, target) : null;
}
