"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { pulseFlavors } from "@/components/landing-pages/PulseCan3D";
import { PulseCan3DStaticFrontPreview } from "@/components/landing-pages/PulseCan3DStaticFrontPreview";

export function PulseFlavorCardCanPortal() {
  const [targets, setTargets] = useState<HTMLElement[]>([]);

  useEffect(() => {
    let frame = 0;
    let attachedTargets: HTMLElement[] = [];

    const findTargets = () => {
      const cards = Array.from(document.querySelectorAll<HTMLElement>("#flavors article"));
      const nextTargets = cards
        .map((card) => card.querySelector<HTMLElement>('div[style*="linear-gradient(145deg"]'))
        .filter((target): target is HTMLElement => Boolean(target))
        .slice(0, pulseFlavors.length);

      if (nextTargets.length === pulseFlavors.length) {
        nextTargets.forEach((target) => target.classList.add("pulse-static-can-host"));
        attachedTargets = nextTargets;
        setTargets(nextTargets);
        return;
      }

      frame = requestAnimationFrame(findTargets);
    };

    findTargets();

    return () => {
      cancelAnimationFrame(frame);
      attachedTargets.forEach((target) => target.classList.remove("pulse-static-can-host"));
    };
  }, []);

  if (targets.length !== pulseFlavors.length) return null;

  return (
    <>
      <style>{`
        #flavors .pulse-static-can-host {
          width: 10.5rem !important;
          height: 21rem !important;
          overflow: visible !important;
          border: 0 !important;
          border-radius: 0 !important;
          background: transparent !important;
          box-shadow: none !important;
          transform: none !important;
          translate: none !important;
          rotate: none !important;
          scale: none !important;
          animation: none !important;
          transition: none !important;
          will-change: auto !important;
        }

        #flavors .pulse-static-can-host > :not(.pulse-card-can-model) {
          display: none !important;
        }

        #flavors article:hover .pulse-static-can-host,
        #flavors article:focus-within .pulse-static-can-host,
        #flavors .group:hover .pulse-static-can-host {
          transform: none !important;
          translate: none !important;
          rotate: none !important;
          scale: none !important;
          animation: none !important;
        }

        #flavors .pulse-card-can-model,
        #flavors .pulse-card-can-model canvas {
          transform: none !important;
          translate: none !important;
          rotate: none !important;
          scale: none !important;
          animation: none !important;
          transition: none !important;
          pointer-events: none !important;
        }

        @media (max-width: 640px) {
          #flavors .pulse-static-can-host {
            width: 8.4rem !important;
            height: 18rem !important;
          }
        }
      `}</style>

      {targets.map((target, index) =>
        createPortal(
          <PulseCan3DStaticFrontPreview key={pulseFlavors[index].key} flavor={pulseFlavors[index]} />,
          target
        )
      )}
    </>
  );
}
