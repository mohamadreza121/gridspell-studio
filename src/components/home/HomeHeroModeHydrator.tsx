"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

type IdleDeadlineLike = {
  didTimeout: boolean;
  timeRemaining: () => number;
};

type IdleWindow = Window &
  typeof globalThis & {
    requestIdleCallback?: (
      callback: (deadline: IdleDeadlineLike) => void,
      options?: { timeout?: number }
    ) => number;
    cancelIdleCallback?: (handle: number) => void;
  };

const HERO_INTERACTION_EVENTS = [
  "pointerdown",
  "keydown",
  "touchstart",
  "wheel"
] as const;

const HomeHeroModeShowcaseClient = dynamic(
  () =>
    import("@/components/home/HomeHeroModeShowcase.client").then(
      (module) => module.HomeHeroModeShowcaseClient
    ),
  {
    ssr: false,
    loading: () => null
  }
);

export function HomeHeroModeHydrator() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let started = false;
    let timeoutId: number | undefined;
    let idleId: number | undefined;

    const idleWindow = window as IdleWindow;

    const cleanupListeners = () => {
      HERO_INTERACTION_EVENTS.forEach((eventName) => {
        window.removeEventListener(eventName, startInteractiveLayer);
      });

      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }

      if (idleId !== undefined) {
        idleWindow.cancelIdleCallback?.(idleId);
      }
    };

    function startInteractiveLayer() {
      if (cancelled || started) return;
      started = true;
      cleanupListeners();
      document.documentElement.dataset.homeHeroInteractive = "true";
      setReady(true);
    }

    HERO_INTERACTION_EVENTS.forEach((eventName) => {
      window.addEventListener(eventName, startInteractiveLayer, {
        once: true,
        passive: true
      });
    });

    if (idleWindow.requestIdleCallback && idleWindow.cancelIdleCallback) {
      idleId = idleWindow.requestIdleCallback(startInteractiveLayer, {
        timeout: 1800
      });
    } else {
      timeoutId = window.setTimeout(startInteractiveLayer, 1500);
    }

    return () => {
      cancelled = true;
      cleanupListeners();
    };
  }, []);

  if (!ready) {
    return null;
  }

  return <HomeHeroModeShowcaseClient />;
}
