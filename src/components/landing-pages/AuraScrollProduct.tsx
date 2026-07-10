"use client";

import { useEffect, type ReactNode } from "react";

export function AuraScrollProduct({ children }: { children: ReactNode }) {
  useEffect(() => {
    const page = document.getElementById("aura-page");
    const product = document.getElementById("aura-scroll-product");
    const story = document.getElementById("aura-story");
    const afterStory = document.getElementById("aura-after-story");

    if (!page || !product || !story || !afterStory) return;

    const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
    const mix = (from: number, to: number, progress: number) => from + (to - from) * progress;
    let ticking = false;

    const update = () => {
      ticking = false;

      const y = window.scrollY || window.pageYOffset || 0;
      const vh = window.innerHeight || 1;
      const width = window.innerWidth || 1440;
      const afterStoryTop = y + afterStory.getBoundingClientRect().top;

      const heroProgress = clamp(y / (vh * 1.05), 0, 1);
      const leftTarget = width >= 1280 ? 27 : width >= 1024 ? 31 : 50;
      const topTarget = width >= 1024 ? 52 : 42;
      const scaleTarget = width >= 1280 ? 0.58 : width >= 1024 ? 0.66 : 0.92;

      let left = mix(50, leftTarget, heroProgress);
      let top = mix(45, topTarget, heroProgress);
      let scale = mix(1, scaleTarget, heroProgress);
      let opacity = 1;

      const fadeStart = afterStoryTop - vh * 1.25;
      const fadeEnd = afterStoryTop - vh * 0.82;

      if (y > fadeStart) {
        opacity = clamp(1 - (y - fadeStart) / Math.max(fadeEnd - fadeStart, 1), 0, 1);
        left = leftTarget;
        top = topTarget;
        scale = scaleTarget;
      }

      page.style.setProperty("--aura-left", `${left.toFixed(2)}vw`);
      page.style.setProperty("--aura-top", `${top.toFixed(2)}vh`);
      page.style.setProperty("--aura-scale", scale.toFixed(3));
      page.style.setProperty("--aura-opacity", opacity.toFixed(3));

      if (y >= fadeEnd || opacity <= 0.02) {
        product.classList.add("is-hidden");
      } else {
        product.classList.remove("is-hidden");
      }
    };

    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <div id="aura-scroll-product" className="aura-scroll-product">
      <div className="aura-scroll-product-inner">{children}</div>
    </div>
  );
}
