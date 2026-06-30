"use client";

import { useEffect } from "react";

function findHeroActionGroup(scene: Element | null) {
  if (!scene) return null;

  const startLink = scene.querySelector<HTMLAnchorElement>('a[href="/start-project"]');
  const workLink = scene.querySelector<HTMLAnchorElement>('a[href="/work"]');
  if (!startLink || !workLink) return null;

  let candidate: HTMLElement | null = startLink.parentElement;
  while (candidate && candidate !== scene && !candidate.contains(workLink)) {
    candidate = candidate.parentElement;
  }

  return candidate && candidate !== scene ? candidate : null;
}

export function HomeHeroActionsPlacement() {
  useEffect(() => {
    const root = document.querySelector(".home-experience");
    if (!root) return;

    const hosts = Array.from(root.querySelectorAll<HTMLElement>(".home-hero-mode-host"));
    const cleanupItems: Array<() => void> = [];

    hosts.forEach((host, index) => {
      const tabs = host.previousElementSibling;
      const scene = tabs?.closest("section") ?? null;
      const originalActions = findHeroActionGroup(scene);
      if (!originalActions) return;

      originalActions.classList.add("home-hero-original-actions-hidden");

      const actionsHost = document.createElement("div");
      actionsHost.className = "home-hero-card-actions-host";
      actionsHost.dataset.heroActionsHost = String(index);

      const clonedActions = originalActions.cloneNode(true) as HTMLElement;
      clonedActions.classList.add("home-hero-card-actions");
      clonedActions.classList.remove("xl:justify-end");
      actionsHost.appendChild(clonedActions);
      host.insertAdjacentElement("afterend", actionsHost);

      cleanupItems.push(() => {
        originalActions.classList.remove("home-hero-original-actions-hidden");
        actionsHost.remove();
      });
    });

    return () => cleanupItems.forEach((cleanup) => cleanup());
  }, []);

  return (
    <style jsx global>{`
      .home-hero-original-actions-hidden {
        display: none !important;
      }

      .home-hero-card-actions-host {
        position: relative;
        z-index: 21;
        width: 100%;
        max-width: 46rem;
        margin-top: 0.85rem;
      }

      .home-hero-card-actions {
        width: 100%;
      }

      .home-hero-card-actions > a {
        flex: 1 1 0%;
        justify-content: center;
      }

      @media (min-width: 1280px) {
        .home-presentation-only .home-hero-mode-host {
          bottom: clamp(7.25rem, 10.5vh, 9.25rem) !important;
        }

        .home-presentation-only .home-hero-card-actions-host {
          position: absolute;
          right: clamp(1.75rem, 4.2vw, 5.25rem);
          bottom: clamp(2.25rem, 4vh, 3.5rem);
          width: min(34vw, 31rem);
          max-width: none;
          margin-top: 0;
        }
      }

      @media (min-width: 1280px) and (max-height: 800px) {
        .home-presentation-only .home-hero-mode-host {
          bottom: 6.6rem !important;
        }

        .home-presentation-only .home-hero-card-actions-host {
          right: 2rem;
          bottom: 1.45rem;
          width: min(31vw, 28rem);
        }

        .home-presentation-only .home-hero-card-actions > a {
          min-height: 3rem;
          padding-inline: 1rem;
          font-size: 0.75rem;
        }
      }

      @media (max-width: 639px) {
        .home-hero-card-actions {
          display: grid !important;
          grid-template-columns: 1fr;
        }
      }
    `}</style>
  );
}
