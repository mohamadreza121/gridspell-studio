"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./HomePageStack.module.css";

/** Native document scrolling; tall pages pin only once their bottom is visible. */
export function HomePageStack({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let panels: HTMLElement[] = [];
    let surfaces: HTMLElement[] = [];
    let heights: number[] = [];
    let frame = 0;
    let measureNeeded = true;
    let disposed = false;

    function render() {
      frame = 0;
      if (!root || disposed) return;
      if (preference.matches) {
        delete root.dataset.stackActive;
        panels.forEach((panel) => panel.style.removeProperty("--stack-top"));
        surfaces.forEach((surface) => {
          surface.style.removeProperty("--stack-scale");
          surface.style.removeProperty("--stack-shade");
        });
        return;
      }
      if (!panels.length) return;
      const viewport = window.innerHeight;
      const edge = window.innerWidth < 768 ? 8 : 18;
      if (measureNeeded) {
        // offsetHeight is untransformed: accordion expansion changes the real
        // document height without feeding the scale animation back into layout.
        heights = surfaces.map((surface) => surface.offsetHeight);
        panels.forEach((panel, index) => {
          panel.style.setProperty(
            "--stack-top",
            `${Math.min(edge, viewport - heights[index] - edge)}px`
          );
          panel.style.setProperty("--stack-order", String(index + 1));
        });
        root.dataset.stackActive = "true";
        measureNeeded = false;
      }
      const tops = panels.map((panel) => panel.getBoundingClientRect().top);
      surfaces.forEach((surface, index) => {
        const nextTop = tops[index + 1];
        const progress =
          nextTop === undefined
            ? 0
            : Math.max(0, Math.min(1, (viewport - nextTop) / (viewport - edge)));
        const eased = progress * progress * (3 - 2 * progress);
        surface.style.setProperty("--stack-scale", String(1 - eased * 0.035));
        surface.style.setProperty("--stack-shade", String(eased * 0.24));
      });
    }

    function schedule(measure = false) {
      measureNeeded ||= measure;
      if (!frame && !disposed) frame = window.requestAnimationFrame(render);
    }
    const resizeObserver = new ResizeObserver(() => schedule(true));
    function discover() {
      if (!root) return;
      const found = Array.from(root.querySelectorAll<HTMLElement>("[data-stack-panel]"));
      if (
        found.length === panels.length &&
        found.every((panel, index) => panel === panels[index])
      )
        return;
      resizeObserver.disconnect();
      panels = found;
      surfaces = panels.map((panel) => panel.firstElementChild as HTMLElement);
      surfaces.forEach((surface) => resizeObserver.observe(surface));
      schedule(true);
    }
    // The existing sections load asynchronously. Watch only for changed panel
    // membership, not the inline style updates made on each animation frame.
    const mutationObserver = new MutationObserver(discover);
    mutationObserver.observe(root, { childList: true, subtree: true });
    discover();
    const onScroll = () => schedule();
    const onResize = () => schedule(true);
    const onPreference = () => schedule(true);
    function onFocus(event: FocusEvent) {
      if (!root || preference.matches || !(event.target instanceof HTMLElement)) return;
      const target = event.target;
      const panel = target.closest<HTMLElement>("[data-stack-panel]");
      const index = panel ? panels.indexOf(panel) : -1;
      if (index < 0 || !panels[index + 1]) return;
      const nextTop = panels[index + 1].getBoundingClientRect().top;
      if (target.getBoundingClientRect().bottom <= nextTop) return;
      // A keyboard user can return to an earlier sheet even while it is covered.
      const start =
        root.getBoundingClientRect().top +
        window.scrollY +
        heights.slice(0, index).reduce((sum, height) => sum + height, 0);
      const localTop =
        target.getBoundingClientRect().top - panels[index].getBoundingClientRect().top;
      window.scrollTo({
        top: start + localTop - window.innerHeight * 0.4,
        behavior: "instant"
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    preference.addEventListener("change", onPreference);
    root.addEventListener("focusin", onFocus);
    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      preference.removeEventListener("change", onPreference);
      root.removeEventListener("focusin", onFocus);
      delete root.dataset.stackActive;
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.stack} data-home-page-stack>
      {children}
    </div>
  );
}

export function HomeStackPanel({
  children,
  name
}: {
  children: ReactNode;
  name: string;
}) {
  return (
    <div className={styles.panel} data-stack-panel={name}>
      <div className={styles.surface}>
        {children}
        <div className={styles.shade} aria-hidden="true" />
      </div>
    </div>
  );
}
