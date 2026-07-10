"use client";

import { useEffect } from "react";

type SensorKey = "heart" | "temperature" | "sleep" | "motion";
type SystemKey = "material" | "signals" | "power" | "protection";
type ReuseMode = "lab" | "vault" | null;

function readActiveSensor(stage: HTMLElement): SensorKey {
  const active = stage.querySelector<HTMLElement>(".aura-lab-card.is-active");
  if (!active) return "heart";
  if (active.classList.contains("aura-lab-card-2")) return "temperature";
  if (active.classList.contains("aura-lab-card-3")) return "sleep";
  if (active.classList.contains("aura-lab-card-4")) return "motion";
  return "heart";
}

function readActiveSystem(section: HTMLElement): SystemKey {
  const value = section.dataset.activeSystem;
  if (value === "signals" || value === "power" || value === "protection") return value;
  return "material";
}

function visibilityScore(element: HTMLElement | null, viewportHeight: number) {
  if (!element) return -1;
  const bounds = element.getBoundingClientRect();
  if (bounds.bottom <= viewportHeight * 0.03 || bounds.top >= viewportHeight * 0.97) return -1;
  const center = bounds.top + bounds.height * 0.5;
  return 1 - Math.abs(center - viewportHeight * 0.5) / Math.max(viewportHeight + bounds.height * 0.5, 1);
}

export function AuraSensorLabRingReuse() {
  useEffect(() => {
    let disposed = false;
    let frame = 0;
    let product: HTMLElement | null = null;
    let labStage: HTMLElement | null = null;
    let vaultTarget: HTMLElement | null = null;
    let vaultSection: HTMLElement | null = null;
    let mode: ReuseMode = null;
    let classObserver: MutationObserver | null = null;
    let interactionObserver: MutationObserver | null = null;
    let targetObserver: MutationObserver | null = null;

    const resolveTargets = () => {
      product = product ?? document.getElementById("aura-scroll-product");
      labStage = labStage ?? document.querySelector<HTMLElement>("#aura-after-story .aura-lab-stage");
      vaultTarget = vaultTarget ?? document.querySelector<HTMLElement>("#specs .aura-vault-ring-target");
      vaultSection = vaultSection ?? document.querySelector<HTMLElement>("#specs .aura-engineering-vault");
    };

    const syncInteractiveTone = () => {
      if (!product) return;

      if (mode === "lab" && labStage) {
        product.dataset.labSensor = readActiveSensor(labStage);
        delete product.dataset.engineeringSystem;
      } else if (mode === "vault" && vaultSection) {
        product.dataset.engineeringSystem = readActiveSystem(vaultSection);
        delete product.dataset.labSensor;
      }
    };

    const clearMode = () => {
      product?.classList.remove("aura-sensor-lab-ring-active", "aura-engineering-vault-ring-active");
      labStage?.classList.remove("aura-use-existing-ring");
      if (product) {
        delete product.dataset.labSensor;
        delete product.dataset.engineeringSystem;
      }
    };

    const activateMode = (nextMode: Exclude<ReuseMode, null>, bounds: DOMRect, viewportWidth: number) => {
      if (!product) return;

      const isLab = nextMode === "lab";
      const verticalAnchor = isLab
        ? viewportWidth < 680 ? 0.25 : viewportWidth < 1100 ? 0.38 : 0.50
        : 0.50;
      const scale = isLab
        ? viewportWidth < 680 ? 0.78 : viewportWidth < 1100 ? 0.84 : 0.92
        : viewportWidth < 680 ? 0.72 : viewportWidth < 1100 ? 0.80 : 0.88;
      const targetX = bounds.left + bounds.width * 0.5;
      const targetY = bounds.top + bounds.height * verticalAnchor;

      product.style.setProperty("--aura-reuse-left", `${targetX.toFixed(2)}px`);
      product.style.setProperty("--aura-reuse-top", `${targetY.toFixed(2)}px`);
      product.style.setProperty("--aura-reuse-scale", scale.toFixed(3));
      product.classList.toggle("aura-sensor-lab-ring-active", isLab);
      product.classList.toggle("aura-engineering-vault-ring-active", !isLab);
      product.classList.remove("is-hidden");
      labStage?.classList.toggle("aura-use-existing-ring", isLab);
      syncInteractiveTone();
    };

    const update = () => {
      frame = 0;
      if (disposed) return;
      resolveTargets();
      if (!product) return;

      const viewportHeight = Math.max(window.innerHeight, 1);
      const viewportWidth = Math.max(window.innerWidth, 1);
      const labScore = visibilityScore(labStage, viewportHeight);
      const vaultScore = visibilityScore(vaultTarget, viewportHeight);
      const nextMode: ReuseMode = labScore < 0 && vaultScore < 0 ? null : vaultScore > labScore ? "vault" : "lab";

      mode = nextMode;

      if (mode === "lab" && labStage) {
        activateMode("lab", labStage.getBoundingClientRect(), viewportWidth);
      } else if (mode === "vault" && vaultTarget) {
        activateMode("vault", vaultTarget.getBoundingClientRect(), viewportWidth);
      } else {
        clearMode();
      }
    };

    const requestUpdate = () => {
      if (frame || disposed) return;
      frame = window.requestAnimationFrame(update);
    };

    const connectObservers = () => {
      resolveTargets();
      if (!product) return false;

      classObserver = new MutationObserver(() => {
        if (mode && product?.classList.contains("is-hidden")) product.classList.remove("is-hidden");
      });
      classObserver.observe(product, { attributes: true, attributeFilter: ["class"] });

      interactionObserver = new MutationObserver(() => {
        syncInteractiveTone();
        requestUpdate();
      });
      interactionObserver.observe(document.body, {
        attributes: true,
        subtree: true,
        attributeFilter: ["class", "aria-pressed", "data-active-system"]
      });

      targetObserver = new MutationObserver(() => {
        resolveTargets();
        requestUpdate();
      });
      targetObserver.observe(document.body, { childList: true, subtree: true });

      window.addEventListener("scroll", requestUpdate, { passive: true });
      window.addEventListener("resize", requestUpdate);
      requestUpdate();
      return true;
    };

    if (!connectObservers()) {
      const observer = new MutationObserver(() => {
        if (!connectObservers()) return;
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
      interactionObserver?.disconnect();
      targetObserver?.disconnect();
      clearMode();
    };
  }, []);

  return (
    <style>{`
      #aura-scroll-product.aura-sensor-lab-ring-active,
      #aura-scroll-product.aura-engineering-vault-ring-active {
        display: block !important;
        left: var(--aura-reuse-left) !important;
        top: var(--aura-reuse-top) !important;
        opacity: 1 !important;
        transform: translate(-50%, -50%) scale(var(--aura-reuse-scale, .9)) !important;
        z-index: 7 !important;
        transition: left .48s cubic-bezier(.2,.85,.2,1), top .48s cubic-bezier(.2,.85,.2,1), transform .48s cubic-bezier(.2,.85,.2,1), opacity .3s ease;
      }

      #aura-scroll-product.aura-sensor-lab-ring-active {
        width: min(49rem, 66vw) !important;
        height: min(49rem, 66vw) !important;
        filter: drop-shadow(0 46px 90px rgba(0,4,12,.52));
      }

      #aura-scroll-product.aura-engineering-vault-ring-active {
        width: min(45rem, 52vw) !important;
        height: min(45rem, 52vw) !important;
        filter: drop-shadow(0 48px 96px rgba(0,4,12,.58));
      }

      #aura-scroll-product.aura-sensor-lab-ring-active .aura-ring-webgl-layer,
      #aura-scroll-product.aura-engineering-vault-ring-active .aura-ring-webgl-layer {
        inset: -4% !important;
        overflow: visible !important;
      }

      #aura-scroll-product.aura-sensor-lab-ring-active .aura-ring-webgl-canvas {
        transform: translateY(2%) scale(.88) !important;
        filter: drop-shadow(0 42px 82px rgba(0,8,20,.52)) !important;
      }

      #aura-scroll-product.aura-engineering-vault-ring-active .aura-ring-webgl-canvas {
        transform: translateY(1%) rotate(3deg) scale(.84) !important;
        filter: drop-shadow(0 46px 86px rgba(0,8,20,.58)) saturate(1.04) !important;
      }

      #aura-scroll-product.aura-engineering-vault-ring-active .aura-scroll-product-inner {
        transform: rotate(3deg) scale(.88);
        transform-origin: 50% 50%;
      }

      #aura-scroll-product.aura-sensor-lab-ring-active .aura-ring-webgl-glow,
      #aura-scroll-product.aura-engineering-vault-ring-active .aura-ring-webgl-glow {
        inset: 19% !important;
        opacity: .82 !important;
        background: radial-gradient(circle,rgba(103,232,249,.24),rgba(34,211,238,.07) 44%,transparent 72%) !important;
      }

      #aura-scroll-product.aura-sensor-lab-ring-active[data-lab-sensor="temperature"] .aura-ring-webgl-glow,
      #aura-scroll-product.aura-engineering-vault-ring-active[data-engineering-system="power"] .aura-ring-webgl-glow {
        background: radial-gradient(circle,rgba(196,181,253,.24),rgba(139,92,246,.08) 44%,transparent 72%) !important;
      }

      #aura-scroll-product.aura-sensor-lab-ring-active[data-lab-sensor="motion"] .aura-ring-webgl-glow,
      #aura-scroll-product.aura-engineering-vault-ring-active[data-engineering-system="protection"] .aura-ring-webgl-glow {
        background: radial-gradient(circle,rgba(226,232,240,.21),rgba(103,232,249,.05) 46%,transparent 72%) !important;
      }

      #aura-scroll-product.aura-engineering-vault-ring-active[data-engineering-system="signals"] .aura-ring-webgl-glow {
        opacity: .98 !important;
        background: radial-gradient(circle,rgba(165,243,252,.30),rgba(34,211,238,.09) 42%,transparent 72%) !important;
      }

      #aura-scroll-product.aura-sensor-lab-ring-active .aura-ring-webgl-shadow,
      #aura-scroll-product.aura-engineering-vault-ring-active .aura-ring-webgl-shadow {
        left: 21% !important;
        right: 21% !important;
        bottom: 10% !important;
        height: 8% !important;
        opacity: .88;
      }

      #aura-scroll-product.aura-sensor-lab-ring-active .aura-ring-orbits { opacity:.72 !important; }
      #aura-scroll-product.aura-engineering-vault-ring-active .aura-ring-orbits { opacity:.28 !important; transform:scale(.90); }
      #aura-scroll-product.aura-engineering-vault-ring-active[data-engineering-system="signals"] .aura-ring-orbits { opacity:.78 !important; }
      #aura-scroll-product.aura-engineering-vault-ring-active[data-engineering-system="power"] .aura-ring-orbits { opacity:.52 !important; }
      #aura-scroll-product.aura-engineering-vault-ring-active[data-engineering-system="protection"] .aura-ring-orbits { opacity:.16 !important; }

      #aura-scroll-product.aura-engineering-vault-ring-active .aura-ring-webgl-layer::before,
      #aura-scroll-product.aura-engineering-vault-ring-active .aura-ring-webgl-layer::after {
        content:"";
        position:absolute;
        left:20%;
        right:20%;
        top:31%;
        bottom:31%;
        border-radius:50%;
        border:1px solid rgba(165,243,252,.18);
        pointer-events:none;
        opacity:.72;
        transition:transform .38s ease,opacity .3s ease,border-color .3s ease;
      }

      #aura-scroll-product.aura-engineering-vault-ring-active .aura-ring-webgl-layer::before {
        transform:translate3d(-11px,-7px,0) scale(1.035) rotate(-4deg);
        box-shadow:0 0 28px rgba(34,211,238,.06);
      }

      #aura-scroll-product.aura-engineering-vault-ring-active .aura-ring-webgl-layer::after {
        transform:translate3d(12px,9px,0) scale(.965) rotate(5deg);
        border-color:rgba(196,181,253,.13);
      }

      #aura-scroll-product.aura-engineering-vault-ring-active[data-engineering-system="signals"] .aura-ring-webgl-layer::before,
      #aura-scroll-product.aura-engineering-vault-ring-active[data-engineering-system="signals"] .aura-ring-webgl-layer::after {
        opacity:.34;
        transform:translate3d(0,0,0) scale(1);
      }

      #aura-scroll-product.aura-engineering-vault-ring-active[data-engineering-system="power"] .aura-ring-webgl-layer::before {
        border-style:dashed;
        border-color:rgba(196,181,253,.28);
        transform:translate3d(-4px,-4px,0) scale(1.08) rotate(-7deg);
      }

      #aura-scroll-product.aura-engineering-vault-ring-active[data-engineering-system="protection"] .aura-ring-webgl-layer::before,
      #aura-scroll-product.aura-engineering-vault-ring-active[data-engineering-system="protection"] .aura-ring-webgl-layer::after {
        opacity:.88;
        border-color:rgba(224,252,255,.22);
        transform:translate3d(0,0,0) scale(1.12);
      }

      .aura-lab-stage > .aura-lab-ring-wrap { transition:opacity 420ms ease,visibility 420ms ease; }
      .aura-lab-stage.aura-use-existing-ring > .aura-lab-ring-wrap { opacity:0 !important; visibility:hidden !important; }

      @media (max-width:1100px) {
        #aura-scroll-product.aura-sensor-lab-ring-active {
          width:min(44rem,88vw) !important;
          height:min(44rem,88vw) !important;
        }
        #aura-scroll-product.aura-engineering-vault-ring-active {
          width:min(42rem,86vw) !important;
          height:min(42rem,86vw) !important;
        }
      }

      @media (max-width:680px) {
        #aura-scroll-product.aura-sensor-lab-ring-active {
          width:112vw !important;
          height:112vw !important;
        }
        #aura-scroll-product.aura-engineering-vault-ring-active {
          width:108vw !important;
          height:108vw !important;
        }
        #aura-scroll-product.aura-sensor-lab-ring-active .aura-ring-orbits,
        #aura-scroll-product.aura-engineering-vault-ring-active .aura-ring-orbits {
          display:none !important;
        }
      }

      @media (prefers-reduced-motion:reduce) {
        #aura-scroll-product.aura-sensor-lab-ring-active,
        #aura-scroll-product.aura-engineering-vault-ring-active {
          transition:none !important;
        }
      }
    `}</style>
  );
}
