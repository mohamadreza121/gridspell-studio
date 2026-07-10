"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { AuraSensorLab } from "@/components/landing-pages/AuraSensorLab";

export function AuraSensorLabPortal() {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const host = document.getElementById("aura-after-story");
    if (!host) return;

    host.classList.add("aura-sensor-lab-host");
    setTarget(host);

    const cleanupId = window.requestAnimationFrame(() => {
      const nestedLab = host.querySelector<HTMLElement>(":scope > .aura-sensor-lab");
      nestedLab?.removeAttribute("id");
    });

    return () => {
      window.cancelAnimationFrame(cleanupId);
      host.classList.remove("aura-sensor-lab-host");
    };
  }, []);

  return (
    <>
      {target ? createPortal(<AuraSensorLab />, target) : null}
      <style>{`
        #aura-after-story.aura-sensor-lab-host {
          padding: 0 !important;
          background: #05080d !important;
          color: white !important;
        }

        #aura-after-story.aura-sensor-lab-host > :not(.aura-sensor-lab) {
          display: none !important;
        }

        #aura-after-story.aura-sensor-lab-host > .aura-sensor-lab {
          display: block;
          width: 100%;
        }
      `}</style>
    </>
  );
}
