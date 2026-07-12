"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";

type Review = readonly [quote: string, name: string];

export function RestaurantReviewCarousel({ reviews }: { reviews: readonly Review[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  function move(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;

    track.scrollBy({
      left: direction * Math.max(280, track.clientWidth * 0.78),
      behavior: "smooth"
    });
  }

  return (
    <div className="min-w-0">
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-[0.56rem] font-black uppercase tracking-[0.24em] text-[#9c6d46]">
          Swipe through the notes
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => move(-1)}
            className="grid h-11 w-11 place-items-center rounded-full border border-[#4d2417]/12 bg-[#f8ead4] text-[#5f3927] transition hover:-translate-y-0.5 hover:bg-[#fff8e9]"
            aria-label="Previous review"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            className="grid h-11 w-11 place-items-center rounded-full border border-[#4d2417]/12 bg-[#7a1f1f] text-white transition hover:-translate-y-0.5 hover:bg-[#8d2828]"
            aria-label="Next review"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 pr-8 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map(([quote, name], index) => (
          <article
            key={name}
            className="relative min-h-[18rem] min-w-0 flex-[0_0_88%] snap-center overflow-hidden rounded-[1.55rem] border border-[#4d2417]/10 bg-[#fbf1df] p-6 shadow-[0_18px_52px_rgba(74,31,18,.09)] sm:flex-basis-[58%] lg:flex-basis-[42%] xl:flex-basis-[35%]"
          >
            <span className="absolute right-5 top-4 font-mono text-[0.58rem] tracking-[0.2em] text-[#9c6d46]/60">
              0{index + 1}
            </span>
            <Quote className="h-6 w-6 text-[#c17433]" />
            <p className="mt-8 font-display text-[clamp(1.9rem,3vw,2.8rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-[#32160f]">
              “{quote}”
            </p>
            <div className="mt-8 flex gap-1 text-[#c17433]">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <div className="mt-5 border-t border-[#4d2417]/10 pt-5">
              <p className="font-semibold text-[#32160f]">{name}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#9c6d46]">Casa Ember guest</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
