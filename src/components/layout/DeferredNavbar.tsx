"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type ReactNode
} from "react";

import type { MarketingViewer } from "@/components/layout/Navbar";

type NavigationItem = {
  href: string;
  label: string;
};

type NavigationRuntimeProps = {
  viewer: MarketingViewer | null;
  openOnMount: boolean;
};

type DeferredNavbarProps = {
  viewer: MarketingViewer | null;
  navigation: readonly NavigationItem[];
  brand: ReactNode;
};

let navigationRuntimePromise: Promise<{
  NavigationRuntime: ComponentType<NavigationRuntimeProps>;
}> | null = null;

function preloadNavigationRuntime() {
  navigationRuntimePromise ??= import("./NavigationRuntime");
  return navigationRuntimePromise;
}

export function DeferredNavbar({
  viewer,
  navigation,
  brand
}: DeferredNavbarProps) {
  const mountedRef = useRef(true);
  const [Runtime, setRuntime] = useState<ComponentType<NavigationRuntimeProps> | null>(
    null
  );
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  const preload = useCallback(() => {
    void preloadNavigationRuntime();
  }, []);

  const openNavigation = useCallback(() => {
    if (Runtime || opening) return;

    setOpening(true);

    void preloadNavigationRuntime()
      .then(({ NavigationRuntime }) => {
        if (!mountedRef.current) return;
        setRuntime(() => NavigationRuntime);
      })
      .catch(() => {
        navigationRuntimePromise = null;
        if (mountedRef.current) setOpening(false);
      });
  }, [Runtime, opening]);

  if (Runtime) {
    return <Runtime viewer={viewer} openOnMount />;
  }

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[100] bg-transparent">
      <div className="mx-auto flex h-20 w-full max-w-[1920px] items-center justify-between px-3 min-[380px]:h-24 min-[380px]:px-5 sm:px-8 lg:px-12">
        <div className="pointer-events-auto relative z-10">{brand}</div>

        <div className="tiny-nav">
          <input
            id="tiny-nav-toggle"
            type="checkbox"
            className="tiny-nav__input"
            aria-hidden="true"
          />

          <label
            htmlFor="tiny-nav-toggle"
            className="tiny-nav__button"
            aria-label="Open navigation"
          >
            <span className="tiny-nav__icon" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </label>

          <div className="tiny-nav__panel">
            <div className="tiny-nav__panel-inner">
              <div className="tiny-nav__panel-top">
                <span className="tiny-nav__eyebrow">Navigate GridSpell</span>

                <label
                  htmlFor="tiny-nav-toggle"
                  className="tiny-nav__close"
                  aria-label="Close navigation"
                >
                  ×
                </label>
              </div>

              <nav className="tiny-nav__links" aria-label="Small phone navigation">
                {navigation.map((item, index) => (
                  <a key={item.href} href={item.href} className="tiny-nav__link">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{item.label}</strong>
                  </a>
                ))}
              </nav>

              <a href="/start-project" className="tiny-nav__cta">
                Start a project
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>

        <button
          type="button"
          aria-label={opening ? "Opening navigation" : "Open navigation"}
          aria-expanded="false"
          aria-controls="gridspell-menu"
          aria-haspopup="dialog"
          disabled={opening}
          onClick={openNavigation}
          onFocus={preload}
          onPointerEnter={preload}
          onTouchStart={preload}
          className="pointer-events-auto group relative z-10 hidden h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/[0.13] bg-black/10 text-white shadow-[0_16px_50px_rgba(0,0,0,0.12)] backdrop-blur-md transition-[border-color,background-color,box-shadow,opacity] duration-300 hover:border-white/25 hover:bg-black/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8be9ff]/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07080c] disabled:cursor-wait disabled:opacity-70 min-[380px]:flex min-[380px]:h-14 min-[380px]:w-[8.5rem] sm:w-[9rem]"
        >
          <span className="relative flex h-full w-full items-center justify-center px-0 min-[380px]:justify-between min-[380px]:gap-3 min-[380px]:px-5">
            <span className="hidden text-[0.68rem] font-semibold uppercase tracking-[0.24em] min-[380px]:inline">
              {opening ? "Opening" : "Menu"}
            </span>

            <span className="relative block h-3.5 w-5" aria-hidden="true">
              <span className="absolute left-0 top-0 h-px w-5 bg-current transition-transform duration-300 group-hover:translate-x-1" />
              <span className="absolute right-0 top-1/2 h-px w-3.5 -translate-y-1/2 bg-current transition-all duration-300 group-hover:w-5" />
              <span className="absolute bottom-0 left-0 h-px w-5 bg-current transition-transform duration-300 group-hover:-translate-x-1" />
            </span>
          </span>
        </button>
      </div>
    </header>
  );
}
