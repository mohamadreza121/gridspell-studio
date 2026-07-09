"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const SelectedBuildsOrbRuntime = dynamic(
  () =>
    import("./SelectedBuildsOrbRuntime").then(
      (module) => module.SelectedBuildsOrbRuntime
    ),
  {
    ssr: false,
    loading: () => null
  }
);

export function SelectedBuildsRouteEffect() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const selectedSection = document.querySelector<HTMLElement>(
      ".home-proof-selected-section"
    );

    if (!selectedSection) return;

    const mediaQuery = window.matchMedia("(min-width: 1280px)");
    let observer: IntersectionObserver | undefined;

    const cleanupObserver = () => {
      observer?.disconnect();
      observer = undefined;
    };

    const prepareObserver = () => {
      cleanupObserver();

      if (!mediaQuery.matches) return;

      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          setShouldLoad(true);
          cleanupObserver();
        },
        {
          root: null,
          rootMargin: "420px 0px 420px 0px",
          threshold: 0.01
        }
      );

      observer.observe(selectedSection);
    };

    prepareObserver();
    mediaQuery.addEventListener("change", prepareObserver);

    return () => {
      cleanupObserver();
      mediaQuery.removeEventListener("change", prepareObserver);
    };
  }, []);

  return shouldLoad ? <SelectedBuildsOrbRuntime /> : null;
}
