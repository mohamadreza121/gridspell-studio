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

    const startInteractiveLayer = () => {
      if (cancelled) return;
      document.documentElement.dataset.homeHeroInteractive = "true";
      setReady(true);
    };

    const idleWindow = window as IdleWindow;

    if (idleWindow.requestIdleCallback && idleWindow.cancelIdleCallback) {
      const idleId = idleWindow.requestIdleCallback(startInteractiveLayer, {
        timeout: 1200
      });

      return () => {
        cancelled = true;
        idleWindow.cancelIdleCallback?.(idleId);
      };
    }

    const timeoutId = window.setTimeout(startInteractiveLayer, 700);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, []);

  if (!ready) {
    return null;
  }

  return <HomeHeroModeShowcaseClient />;
}
