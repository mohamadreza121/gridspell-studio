"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { PulseCan3DRealistic } from "@/components/landing-pages/PulseCan3DRealistic";
import { pulseFlavors, type PulseFlavor } from "@/components/landing-pages/PulseCan3D";

export function PulseCanRealismPortal() {
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const [flavor, setFlavor] = useState<PulseFlavor>(pulseFlavors[0]);

  useEffect(() => {
    const stage = document.querySelector<HTMLElement>(".pulse-can-stage");
    if (!stage) return;

    const page = stage.closest<HTMLElement>("main");
    stage.classList.add("pulse-can-realism-host");
    window.requestAnimationFrame(() => setTarget(stage));

    const originalCanvas = stage.querySelector<HTMLCanvasElement>("canvas");
    const originalContext = originalCanvas?.getContext("webgl");
    const contextControl = originalContext?.getExtension("WEBGL_lose_context");
    contextControl?.loseContext();

    const syncFlavor = () => {
      if (!page) return;
      const activeColor = getComputedStyle(page).getPropertyValue("--pulse-primary").trim().toLowerCase();
      const nextFlavor = pulseFlavors.find((item) => item.base.toLowerCase() === activeColor);
      if (nextFlavor) setFlavor(nextFlavor);
    };

    syncFlavor();
    const observer = new MutationObserver(syncFlavor);
    if (page) observer.observe(page, { attributes: true, attributeFilter: ["style"] });

    return () => {
      observer.disconnect();
      stage.classList.remove("pulse-can-realism-host");
      contextControl?.restoreContext();
    };
  }, []);

  if (!target) return null;

  return createPortal(
    <>
      <style>{`
        .pulse-can-stage.pulse-can-realism-host > :not(.pulse-can-realistic-root) {
          display: none !important;
        }
      `}</style>
      <PulseCan3DRealistic flavor={flavor} className="absolute inset-0" />
    </>,
    target
  );
}
