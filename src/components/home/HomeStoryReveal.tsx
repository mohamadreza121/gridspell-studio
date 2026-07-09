"use client";

import { useEffect } from "react";

const REVEAL_SELECTOR = ".home-story-reveal";

export function HomeStoryReveal() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 1280px)");
    const observed = new WeakSet<HTMLElement>();
    let observer: IntersectionObserver | undefined;

    const show = (target: HTMLElement) => {
      target.dataset.storyVisible = "true";
      observer?.unobserve(target);
    };

    const prepareTarget = (target: HTMLElement) => {
      if (observed.has(target)) return;
      observed.add(target);

      if (!desktop.matches || reduceMotion.matches) {
        show(target);
        return;
      }

      target.dataset.storyObserved = "true";

      const rect = target.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.82) {
        show(target);
        return;
      }

      observer?.observe(target);
    };

    const scan = () => {
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach(prepareTarget);
    };

    if (desktop.matches && !reduceMotion.matches) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            show(entry.target as HTMLElement);
          });
        },
        {
          root: null,
          rootMargin: "0px 0px -14% 0px",
          threshold: 0.14
        }
      );
    }

    const frameId = window.requestAnimationFrame(scan);
    const quickScan = window.setTimeout(scan, 160);
    const lateScan = window.setTimeout(scan, 700);
    const mutationObserver = new MutationObserver(scan);
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    const observerCleanup = window.setTimeout(() => mutationObserver.disconnect(), 3200);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(quickScan);
      window.clearTimeout(lateScan);
      window.clearTimeout(observerCleanup);
      mutationObserver.disconnect();
      observer?.disconnect();
    };
  }, []);

  return null;
}
