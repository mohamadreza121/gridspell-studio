"use client";

import { useEffect } from "react";

type SensorKey = "heart" | "temperature" | "sleep" | "motion";

function readActiveSensor(stage: HTMLElement): SensorKey {
  const active = stage.querySelector<HTMLElement>(".aura-lab-card.is-active");
  if (!active) return "heart";
  if (active.classList.contains("aura-lab-card-2")) return "temperature";
  if (active.classList.contains("aura-lab-card-3")) return "sleep";
  if (active.classList.contains("aura-lab-card-4")) return "motion";
  return "heart";
}

export function AuraSensorLabRingReuse() {
  useEffect(() => {
    let disposed = false;
    let frame = 0;
    let stage: HTMLElement | null = null;
    let product: HTMLElement | null = null;
    let active = false;
    let classObserver: MutationObserver | null = null;
    let cardObserver: MutationObserver | null = null;

    const syncFallback = () => {
      if (!stage || !product) return;
      const canUseRealRing = active && product.classList.contains("aura-ring-webgl-ready");
      stage.classList.toggle("aura-use-existing-ring", canUseRealRing);
    };

    const syncSensorTone = () => {
      if (!stage || !product) return;
      product.dataset.labSensor = readActiveSensor(stage);
    };

    const update = () => {
      frame = 0;
      if (disposed || !stage || !product) return;

      const bounds = stage.getBoundingClientRect();
      const viewportHeight = Math.max(window.innerHeight, 1);
      const viewportWidth = Math.max(window.innerWidth, 1);
      const visible = bounds.bottom > viewportHeight * 0.04 && bounds.top < viewportHeight * 0.96;

      active = visible;

      if (visible) {
        const verticalAnchor = viewportWidth < 680 ? 0.25 : viewportWidth < 1100 ? 0.38 : 0.50;
        const targetX = bounds.left + bounds.width * 0.5;
        const targetY = bounds.top + bounds.height * verticalAnchor;
        const scale = viewportWidth < 680 ? 0.78 : viewportWidth < 1100 ? 0.84 : 0.92;

        product.style.setProperty("--aura-lab-left", `${targetX.toFixed(2)}px`);
        product.style.setProperty("--aura-lab-top", `${targetY.toFixed(2)}px`);
        product.style.setProperty("--aura-lab-scale", scale.toFixed(3));
        product.classList.add("aura-sensor-lab-ring-active");
        product.classList.remove("is-hidden");
        syncSensorTone();
      } else {
        product.classList.remove("aura-sensor-lab-ring-active");
        stage.classList.remove("aura-use-existing-ring");
        delete product.dataset.labSensor;
      }

      syncFallback();
    };

    const requestUpdate = () => {
      if (frame || disposed) return;
      frame = window.requestAnimationFrame(update);
    };

    const connect = () => {
      stage = document.querySelector<HTMLElement>("#aura-after-story .aura-lab-stage");
      product = document.getElementById("aura-scroll-product");
      if (!stage || !product) return false;

      classObserver = new MutationObserver(() => {
        if (active && product?.classList.contains("is-hidden")) product.classList.remove("is-hidden");
        syncFallback();
      });
      classObserver.observe(product, { attributes: true, attributeFilter: ["class"] });

      cardObserver = new MutationObserver(syncSensorTone);
      cardObserver.observe(stage, {
        attributes: true,
        subtree: true,
        attributeFilter: ["class", "aria-pressed"]
      });

      window.addEventListener("scroll", requestUpdate, { passive: true });
      window.addEventListener("resize", requestUpdate);
      requestUpdate();
      return true;
    };

    if (!connect()) {
      const observer = new MutationObserver(() => {
        if (!connect()) return;
        observer.disconnect();
      });
      observer.observe(document.body, { childList: true, subtree: true });

      return () => {
        disposed = true;
        observer.disconnect();
        if (frame) window.cancelAnimationFrame(frame);
      };
    }

    return () => {
      disposed = true;
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      classObserver?.disconnect();
      cardObserver?.disconnect();
      stage?.classList.remove("aura-use-existing-ring");
      product?.classList.remove("aura-sensor-lab-ring-active");
      if (product) delete product.dataset.labSensor;
    };
  }, []);

  return (
    <style>{`
      #aura-scroll-product.aura-sensor-lab-ring-active {
        display: block !important;
        left: var(--aura-lab-left) !important;
        top: var(--aura-lab-top) !important;
        width: min(49rem, 66vw) !important;
        height: min(49rem, 66vw) !important;
        opacity: 1 !important;
        transform: translate(-50%, -50%) scale(var(--aura-lab-scale, .92)) !important;
        z-index: 7 !important;
        filter: drop-shadow(0 46px 90px rgba(0, 4, 12, .52));
      }

      #aura-scroll-product.aura-sensor-lab-ring-active .aura-ring-webgl-layer {
        inset: -4% !important;
        overflow: visible !important;
      }

      #aura-scroll-product.aura-sensor-lab-ring-active .aura-ring-webgl-canvas {
        transform: translateY(2%) scale(.88) !important;
        filter: drop-shadow(0 42px 82px rgba(0, 8, 20, .52)) !important;
      }

      #aura-scroll-product.aura-sensor-lab-ring-active .aura-ring-webgl-glow {
        inset: 19% !important;
        opacity: .82 !important;
        background: radial-gradient(circle, rgba(103,232,249,.24), rgba(34,211,238,.07) 44%, transparent 72%) !important;
      }

      #aura-scroll-product.aura-sensor-lab-ring-active[data-lab-sensor="temperature"] .aura-ring-webgl-glow {
        background: radial-gradient(circle, rgba(196,181,253,.24), rgba(139,92,246,.08) 44%, transparent 72%) !important;
      }

      #aura-scroll-product.aura-sensor-lab-ring-active[data-lab-sensor="motion"] .aura-ring-webgl-glow {
        background: radial-gradient(circle, rgba(226,232,240,.21), rgba(103,232,249,.05) 46%, transparent 72%) !important;
      }

      #aura-scroll-product.aura-sensor-lab-ring-active .aura-ring-webgl-shadow {
        left: 21% !important;
        right: 21% !important;
        bottom: 10% !important;
        height: 8% !important;
        opacity: .88;
      }

      #aura-scroll-product.aura-sensor-lab-ring-active .aura-ring-orbits {
        opacity: .72 !important;
      }

      .aura-lab-stage > .aura-lab-ring-wrap {
        transition: opacity 420ms ease, visibility 420ms ease;
      }

      .aura-lab-stage.aura-use-existing-ring > .aura-lab-ring-wrap {
        opacity: 0 !important;
        visibility: hidden !important;
      }

      @media (max-width: 1100px) {
        #aura-scroll-product.aura-sensor-lab-ring-active {
          width: min(44rem, 88vw) !important;
          height: min(44rem, 88vw) !important;
        }
      }

      @media (max-width: 680px) {
        #aura-scroll-product.aura-sensor-lab-ring-active {
          width: 112vw !important;
          height: 112vw !important;
        }

        #aura-scroll-product.aura-sensor-lab-ring-active .aura-ring-orbits {
          display: none !important;
        }
      }
    `}</style>
  );
}
