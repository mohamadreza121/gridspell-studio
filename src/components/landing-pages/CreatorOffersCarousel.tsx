"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { createPortal } from "react-dom";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Camera,
  Mic2,
  type LucideIcon
} from "lucide-react";

type Offer = {
  number: string;
  title: string;
  label: string;
  copy: string;
  meta: string;
  image: string;
  points: string[];
  surface: string;
  accent: string;
  text: string;
  muted: string;
  Icon: LucideIcon;
};

const offers: Offer[] = [
  {
    number: "01",
    title: "Brand direction",
    label: "For founders and creators",
    copy:
      "A focused strategy sprint for clarifying your point of view, audience, offer, and the body of work your brand should become known for.",
    meta: "Two-week private sprint",
    image:
      "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1800",
    points: ["Positioning and message", "Offer architecture", "90-day editorial plan"],
    surface: "#d8a73a",
    accent: "#7f3528",
    text: "#241b16",
    muted: "rgba(36,27,22,.62)",
    Icon: BriefcaseBusiness
  },
  {
    number: "02",
    title: "Creative studio",
    label: "Campaigns and editorial",
    copy:
      "Concept, writing, and creative direction for launches, brand stories, editorial campaigns, and digital experiences that deserve a longer shelf life.",
    meta: "Project-based collaboration",
    image:
      "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1800",
    points: ["Creative concept", "Narrative and copy", "Launch direction"],
    surface: "#a7462b",
    accent: "#edc66a",
    text: "#f6ead5",
    muted: "rgba(246,234,213,.64)",
    Icon: Camera
  },
  {
    number: "03",
    title: "Talks and workshops",
    label: "Teams and communities",
    copy:
      "Practical sessions on creative confidence, recognizable work, and content systems that protect the voice instead of flattening it.",
    meta: "Keynotes · workshops · podcasts",
    image:
      "https://images.pexels.com/photos/6326374/pexels-photo-6326374.jpeg?auto=compress&cs=tinysrgb&w=1800",
    points: ["Custom topic design", "Live audience exercises", "Post-session resources"],
    surface: "#7a7047",
    accent: "#f1c75f",
    text: "#fff3dc",
    muted: "rgba(255,243,220,.63)",
    Icon: Mic2
  },
  {
    number: "04",
    title: "The working library",
    label: "Self-guided resources",
    copy:
      "Field notes, templates, workshops, and systems for independent people building thoughtful businesses without becoming content machines.",
    meta: "Digital resources from $28",
    image:
      "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1800",
    points: ["Editorial systems", "Offer templates", "Creative planning tools"],
    surface: "#f0dfbf",
    accent: "#a7462b",
    text: "#241b16",
    muted: "rgba(36,27,22,.62)",
    Icon: BookOpen
  }
];

function CreatorOffersCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, startX: 0, startScroll: 0, moved: false });
  const rafRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragging, setDragging] = useState(false);

  const nearestIndex = () => {
    const track = trackRef.current;
    if (!track) return 0;

    const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-creator-offer-card]"));
    let nearest = 0;
    let distance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const nextDistance = Math.abs(card.offsetLeft - track.scrollLeft);
      if (nextDistance < distance) {
        distance = nextDistance;
        nearest = index;
      }
    });

    return nearest;
  };

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;

    const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-creator-offer-card]"));
    const normalized = (index + cards.length) % cards.length;
    const card = cards[normalized];
    if (!card) return;

    setActiveIndex(normalized);
    track.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
  };

  const syncActiveCard = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => setActiveIndex(nearestIndex()));
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || event.pointerType === "touch") return;

    dragRef.current = {
      active: true,
      startX: event.clientX,
      startScroll: track.scrollLeft,
      moved: false
    };
    setDragging(true);
    track.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || !dragRef.current.active) return;

    const delta = event.clientX - dragRef.current.startX;
    if (Math.abs(delta) > 5) dragRef.current.moved = true;
    track.scrollLeft = dragRef.current.startScroll - delta;
  };

  const finishPointerDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || !dragRef.current.active) return;

    dragRef.current.active = false;
    setDragging(false);
    if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
    scrollToIndex(nearestIndex());
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="creator-offers-carousel-root mx-auto max-w-[1480px]">
      <style>{`
        #offers.creator-offers-carousel-ready > :not(.creator-offers-carousel-root) {
          display: none !important;
        }

        #offers.creator-offers-carousel-ready {
          overflow: hidden;
        }

        .creator-offers-track {
          scrollbar-width: none;
          scroll-snap-type: x mandatory;
          scroll-padding-left: 0;
          overscroll-behavior-x: contain;
        }

        .creator-offers-track::-webkit-scrollbar {
          display: none;
        }

        .creator-offer-card {
          scroll-snap-align: start;
          transition: opacity 420ms ease, transform 520ms cubic-bezier(.2,.8,.2,1), filter 420ms ease;
        }

        .creator-offer-card[data-active="false"] {
          opacity: .56;
          filter: saturate(.75);
          transform: scale(.965);
        }

        .creator-offer-card[data-active="true"] {
          opacity: 1;
          filter: saturate(1);
          transform: scale(1);
        }

        .creator-offer-image {
          transition: transform 1s cubic-bezier(.2,.8,.2,1);
        }

        .creator-offer-card[data-active="true"] .creator-offer-image {
          transform: scale(1.035);
        }

        .creator-offers-dragging {
          cursor: grabbing !important;
          scroll-snap-type: none;
          user-select: none;
        }

        @media (max-width: 767px) {
          .creator-offer-card[data-active="false"] {
            opacity: .78;
            transform: scale(.985);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .creator-offer-card,
          .creator-offer-image {
            transition: none !important;
          }
        }
      `}</style>

      <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
        <div>
          <p className="text-[0.58rem] font-black uppercase tracking-[0.24em] text-[#d8a73a]">
            Ways to work together
          </p>
          <h2 className="mt-6 max-w-[8ch] font-display text-[clamp(4rem,7vw,8rem)] font-semibold leading-[0.77] tracking-[-0.075em]">
            Good ideas deserve a useful shape.
          </h2>
        </div>

        <div className="lg:justify-self-end lg:pb-3">
          <p className="max-w-xl text-base leading-8 text-[#f6ead5]/50 sm:text-lg sm:leading-9">
            Four ways to turn a strong idea into something people can understand, use, remember, and return to.
          </p>

          <div className="mt-7 flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollToIndex(activeIndex - 1)}
              className="grid h-12 w-12 place-items-center rounded-full border border-[#f6ead5]/22 text-[#f6ead5] transition hover:border-[#d8a73a] hover:bg-[#d8a73a] hover:text-[#241b16]"
              aria-label="Previous offer"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollToIndex(activeIndex + 1)}
              className="grid h-12 w-12 place-items-center rounded-full border border-[#f6ead5]/22 text-[#f6ead5] transition hover:border-[#d8a73a] hover:bg-[#d8a73a] hover:text-[#241b16]"
              aria-label="Next offer"
            >
              <ArrowRight className="h-4 w-4" />
            </button>

            <div className="ml-2 flex min-w-[9rem] flex-1 items-center gap-2 sm:min-w-[14rem]">
              {offers.map((offer, index) => (
                <button
                  key={offer.number}
                  type="button"
                  onClick={() => scrollToIndex(index)}
                  className="group flex-1 py-3"
                  aria-label={`Show ${offer.title}`}
                  aria-current={activeIndex === index ? "true" : undefined}
                >
                  <span className="block h-px overflow-hidden bg-[#f6ead5]/18">
                    <span
                      className={`block h-full origin-left bg-[#d8a73a] transition-transform duration-500 ${
                        index <= activeIndex ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </span>
                </button>
              ))}
            </div>

            <span className="ml-2 text-[0.54rem] font-black uppercase tracking-[0.18em] text-[#f6ead5]/42">
              0{activeIndex + 1} / 04
            </span>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={syncActiveCard}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishPointerDrag}
        onPointerCancel={finishPointerDrag}
        onPointerLeave={(event) => {
          if (dragRef.current.active) finishPointerDrag(event);
        }}
        className={`creator-offers-track mt-14 grid cursor-grab auto-cols-[min(86vw,64rem)] grid-flow-col gap-5 overflow-x-auto pb-8 pr-[12vw] sm:auto-cols-[min(82vw,64rem)] lg:auto-cols-[min(76vw,68rem)] ${
          dragging ? "creator-offers-dragging" : ""
        }`}
      >
        {offers.map((offer, index) => {
          const Icon = offer.Icon;
          const active = index === activeIndex;

          return (
            <article
              key={offer.title}
              data-creator-offer-card
              data-active={active}
              className="creator-offer-card overflow-hidden rounded-[2.15rem] border border-[#f6ead5]/14 shadow-[0_34px_110px_rgba(10,7,5,.22)]"
              style={{ backgroundColor: offer.surface, color: offer.text }}
            >
              <div className="grid min-h-[42rem] md:grid-cols-[1.08fr_0.92fr]">
                <div className="relative min-h-[25rem] overflow-hidden md:min-h-full">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="creator-offer-image absolute inset-0 h-full w-full object-cover"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,19,15,.02),rgba(28,19,15,.08)_48%,rgba(28,19,15,.72)_100%)]" />
                  <div className="absolute left-5 top-5 rounded-full border border-white/30 bg-[#241b16]/30 px-4 py-2 text-[#fff4df] backdrop-blur-xl sm:left-7 sm:top-7">
                    <p className="text-[0.5rem] font-black uppercase tracking-[0.21em]">{offer.label}</p>
                  </div>
                  <div className="absolute inset-x-6 bottom-6 border-t border-white/28 pt-5 text-white sm:inset-x-8 sm:bottom-8">
                    <p className="text-[0.5rem] font-black uppercase tracking-[0.19em] text-white/52">Format</p>
                    <p className="mt-2 font-display text-2xl font-semibold tracking-[-0.045em]">{offer.meta}</p>
                  </div>
                </div>

                <div className="flex flex-col justify-between p-6 sm:p-9 lg:p-11">
                  <div>
                    <div className="flex items-start justify-between gap-5">
                      <span className="text-[0.53rem] font-black uppercase tracking-[0.2em]" style={{ color: offer.muted }}>
                        Collaboration {offer.number}
                      </span>
                      <span className="grid h-12 w-12 place-items-center rounded-full border" style={{ borderColor: offer.muted }}>
                        <Icon className="h-5 w-5" />
                      </span>
                    </div>

                    <h3 className="mt-10 max-w-[8ch] font-display text-[clamp(3.7rem,5.8vw,6.7rem)] font-semibold leading-[0.78] tracking-[-0.07em]">
                      {offer.title}
                    </h3>
                    <p className="mt-7 max-w-lg text-base leading-8" style={{ color: offer.muted }}>
                      {offer.copy}
                    </p>
                  </div>

                  <div className="mt-10">
                    <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1 xl:grid-cols-3">
                      {offer.points.map((point, pointIndex) => (
                        <div key={point} className="border-t pt-4" style={{ borderColor: offer.muted }}>
                          <span className="text-[0.48rem] font-black uppercase tracking-[0.18em]" style={{ color: offer.accent }}>
                            0{pointIndex + 1}
                          </span>
                          <p className="mt-2 text-sm font-semibold">{point}</p>
                        </div>
                      ))}
                    </div>

                    <Link
                      href="#letter"
                      className="mt-8 inline-flex min-h-[3.2rem] items-center gap-3 rounded-full border px-5 text-[0.6rem] font-black uppercase tracking-[0.19em] transition hover:-translate-y-0.5"
                      style={{ borderColor: offer.muted }}
                    >
                      Explore this direction
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <p className="mt-2 text-[0.5rem] font-black uppercase tracking-[0.19em] text-[#f6ead5]/34">
        Drag, swipe, or use the controls to explore
      </p>
    </div>
  );
}

export function CreatorOffersCarouselPortal() {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const section = document.querySelector<HTMLElement>("#offers");
    if (!section) return;

    section.classList.add("creator-offers-carousel-ready");
    setTarget(section);

    return () => {
      section.classList.remove("creator-offers-carousel-ready");
    };
  }, []);

  return target ? createPortal(<CreatorOffersCarousel />, target) : null;
}
