"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { ActionLink } from "@/components/ui/ActionControl";

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

function HeroActions() {
  return (
    <div className="home-hero-card-actions flex flex-col gap-3 sm:flex-row">
      <ActionLink href="/start-project" className="min-h-14 flex-1 justify-center px-6">
        Start a project
        <ArrowUpRight className="h-4 w-4" />
      </ActionLink>
      <ActionLink
        href="/work"
        className="min-h-14 flex-1 justify-center border-white/[0.12] bg-none bg-white/[0.035] px-6 shadow-none hover:bg-white/[0.07]"
      >
        Explore selected work
        <ArrowUpRight className="h-4 w-4" />
      </ActionLink>
    </div>
  );
}

export function HomeHeroActionsPlacement() {
  const [hosts, setHosts] = useState<HTMLElement[]>([]);

  useEffect(() => {
    const root = document.querySelector(".home-experience");
    if (!root) return;

    const createdHosts = new Set<HTMLElement>();
    const hiddenOriginals = new Set<HTMLElement>();

    const syncPlacement = () => {
      const modeHosts = Array.from(
        root.querySelectorAll<HTMLElement>(".home-hero-mode-host")
      );

      modeHosts.forEach((modeHost, index) => {
        const tabs = modeHost.previousElementSibling;
        const scene = tabs?.closest("section") ?? null;
        const originalActions = findHeroActionGroup(scene);

        if (originalActions) {
          originalActions.classList.add("home-hero-original-actions-hidden");
          hiddenOriginals.add(originalActions);
        }

        let actionsHost = modeHost.nextElementSibling as HTMLElement | null;
        if (!actionsHost?.classList.contains("home-hero-card-actions-host")) {
          actionsHost = document.createElement("div");
          actionsHost.className = "home-hero-card-actions-host";
          actionsHost.dataset.heroActionsHost = String(index);
          modeHost.insertAdjacentElement("afterend", actionsHost);
        }

        createdHosts.add(actionsHost);
      });

      setHosts(
        Array.from(createdHosts).filter((host) => host.isConnected)
      );
    };

    syncPlacement();

    const frame = window.requestAnimationFrame(syncPlacement);
    const delayedSync = window.setTimeout(syncPlacement, 120);
    const observer = new MutationObserver(syncPlacement);
    observer.observe(root, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      window.clearTimeout(delayedSync);
      hiddenOriginals.forEach((original) => {
        original.classList.remove("home-hero-original-actions-hidden");
      });
      createdHosts.forEach((host) => host.remove());
      setHosts([]);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        .home-hero-original-actions-hidden {
          display: none !important;
        }

        .home-hero-card-actions-host {
          position: relative;
          z-index: 30;
          width: 100%;
          max-width: 46rem;
          margin-top: 0.9rem;
          pointer-events: auto;
        }

        .home-hero-card-actions {
          width: 100%;
        }

        @media (min-width: 1280px) {
          .home-presentation-only .home-hero-mode-host {
            bottom: clamp(7.75rem, 11vh, 9.75rem) !important;
          }

          .home-presentation-only .home-hero-card-actions-host {
            position: absolute;
            right: clamp(1.75rem, 4.2vw, 5.25rem);
            bottom: clamp(1.8rem, 3.2vh, 2.8rem);
            width: min(34vw, 31rem);
            max-width: none;
            margin-top: 0;
          }
        }

        @media (min-width: 1280px) and (max-height: 800px) {
          .home-presentation-only .home-hero-mode-host {
            bottom: 6.9rem !important;
          }

          .home-presentation-only .home-hero-card-actions-host {
            right: 2rem;
            bottom: 1.2rem;
            width: min(31vw, 28rem);
          }

          .home-presentation-only .home-hero-card-actions > a {
            min-height: 3rem;
            padding-inline: 0.9rem;
            font-size: 0.72rem;
          }
        }

        @media (max-width: 1279px) {
          .home-hero-card-actions-host {
            margin-top: 1rem;
            padding-bottom: 0.25rem;
          }
        }
      `}</style>

      {hosts.map((host, index) =>
        createPortal(<HeroActions />, host, `home-hero-actions-${index}`)
      )}
    </>
  );
}
