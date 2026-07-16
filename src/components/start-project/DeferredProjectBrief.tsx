"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentType
} from "react";

export function DeferredProjectBrief() {
  const hostRef = useRef<HTMLDivElement>(null);
  const loadPromiseRef = useRef<Promise<void> | null>(null);
  const [Interactive, setInteractive] = useState<ComponentType | null>(null);

  const loadInteractive = useCallback(() => {
    if (Interactive || loadPromiseRef.current) return;

    loadPromiseRef.current = import("./ProjectBriefInteractive").then((module) => {
      setInteractive(() => module.ProjectBriefInteractive);
    });
  }, [Interactive]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || Interactive) return;

    const handleHashChange = () => {
      if (window.location.hash === "#project-form") {
        loadInteractive();
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    if (!("IntersectionObserver" in window)) {
      loadInteractive();
      return () => window.removeEventListener("hashchange", handleHashChange);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          loadInteractive();
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px" }
    );

    observer.observe(host);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [Interactive, loadInteractive]);

  return (
    <div
      id="project-form"
      ref={hostRef}
      className="scroll-mt-24"
      onFocusCapture={loadInteractive}
      onPointerEnter={loadInteractive}
      onPointerDown={loadInteractive}
    >
      {Interactive ? (
        <Interactive />
      ) : (
        <div
          aria-busy="true"
          aria-live="polite"
          className="min-h-[3600px] border border-white/[0.08] bg-[linear-gradient(145deg,rgba(255,255,255,.025),transparent_26%),rgba(8,11,17,.86)] p-6 sm:min-h-[3000px] sm:p-8 lg:min-h-[2400px] xl:min-h-[2200px]"
        >
          <div className="max-w-xl border-l-2 border-[#8be9ff]/50 pl-5">
            <p className="text-[0.56rem] font-black uppercase tracking-[0.24em] text-[#8be9ff]">
              Secure project form
            </p>
            <p className="mt-4 text-sm leading-7 text-white/42">
              Loading the interactive form only when it is needed keeps the first screen faster on mobile and desktop.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
