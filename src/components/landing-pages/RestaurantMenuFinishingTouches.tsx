"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { RestaurantFinalCourse } from "@/components/landing-pages/RestaurantFinalCourse";
import { RestaurantReviewCarousel } from "@/components/landing-pages/RestaurantReviewCarousel";

const reviews = [
  ["A hidden neighborhood dining room with the polish of a destination restaurant.", "Mina R."],
  ["The pasta alone is worth the reservation. The room makes you stay for another glass.", "Toronto Table"],
  ["Warm, confident, and effortless—from the first click to the final course.", "Local guest"]
] as const;

type Targets = {
  reviews: HTMLElement | null;
  finalCourse: HTMLElement | null;
};

export function RestaurantMenuFinishingTouches({ startHref }: { startHref: string }) {
  const [targets, setTargets] = useState<Targets>({ reviews: null, finalCourse: null });

  useEffect(() => {
    let frame = 0;

    function findTargets() {
      const headings = Array.from(document.querySelectorAll<HTMLElement>("h2"));
      const reviewHeading = headings.find((heading) =>
        heading.textContent?.includes("Notes left in the margin")
      );
      const finalHeading = headings.find((heading) =>
        heading.textContent?.includes("Turn hungry visitors into reservations")
      );

      const reviewSection = reviewHeading?.closest<HTMLElement>("section") ?? null;
      const finalCard =
        finalHeading?.closest<HTMLElement>("div.relative.overflow-hidden") ?? null;

      if (reviewSection && finalCard) {
        reviewSection.classList.add("restaurant-guest-notes-host");
        finalCard.classList.add("restaurant-final-course-host");
        setTargets({ reviews: reviewSection, finalCourse: finalCard });
        return;
      }

      frame = requestAnimationFrame(findTargets);
    }

    findTargets();

    return () => {
      cancelAnimationFrame(frame);
      targets.reviews?.classList.remove("restaurant-guest-notes-host");
      targets.finalCourse?.classList.remove("restaurant-final-course-host");
    };
  }, []);

  return (
    <>
      <style>{`
        .restaurant-guest-notes-host > :not(.restaurant-finishing-touch-root),
        .restaurant-final-course-host > :not(.restaurant-finishing-touch-root) {
          display: none !important;
        }

        .restaurant-final-course-host {
          overflow: visible !important;
          border: 0 !important;
          border-radius: 0 !important;
          background: transparent !important;
          padding: 0 !important;
          box-shadow: none !important;
        }
      `}</style>

      {targets.reviews
        ? createPortal(
            <div className="restaurant-finishing-touch-root grid min-w-0 gap-8 lg:grid-cols-[0.58fr_1.42fr] lg:items-start">
              <div>
                <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-full border border-[#4d2417]/14 bg-[#f5e6ca] px-3 font-mono text-[0.58rem] font-semibold tracking-[0.18em] text-[#8e6041]">
                  05
                </span>
                <p className="mt-8 text-[0.6rem] font-black uppercase tracking-[0.28em] text-[#9c6d46]">
                  Guest notes
                </p>
                <h2 className="mt-4 max-w-[9ch] font-display text-5xl font-semibold leading-[0.84] tracking-[-0.07em] text-[#32160f] sm:text-6xl">
                  Notes left in the margin.
                </h2>
                <p className="mt-5 max-w-sm text-sm leading-7 text-[#7b5844]">
                  A simple reel of the comments guests remember after the plates are cleared.
                </p>
              </div>

              <RestaurantReviewCarousel reviews={reviews} />
            </div>,
            targets.reviews
          )
        : null}

      {targets.finalCourse
        ? createPortal(
            <div className="restaurant-finishing-touch-root">
              <RestaurantFinalCourse startHref={startHref} />
            </div>,
            targets.finalCourse
          )
        : null}
    </>
  );
}
