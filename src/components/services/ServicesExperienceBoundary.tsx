"use client";

import dynamic from "next/dynamic";

import { ServicesStaticFallback } from "@/components/services/ServicesStaticFallback";
import { Container } from "@/components/ui/Container";
import { services } from "@/config/services";
import {
  useHydrated,
  useMediaQuery,
  usePrefersReducedMotion
} from "@/hooks/useMediaQuery";

function ServicesDesktopLoading() {
  const service = services[0];

  return (
    <section
      className="relative h-[1030dvh] bg-[#07080c] text-white"
      aria-label="Loading desktop services experience"
    >
      <div className="sticky top-0 h-dvh overflow-hidden">
        <div aria-hidden="true" className="page-grid absolute inset-0 opacity-42" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_25%_42%,rgba(124,92,255,0.13),transparent_37rem),radial-gradient(circle_at_82%_62%,rgba(41,214,255,0.075),transparent_31rem)]"
        />
        <Container className="relative flex h-full flex-col pb-6 pt-24">
          <div className="flex min-h-10 items-center gap-4">
            <span className="h-px w-12 bg-gradient-to-r from-[#7c5cff] to-[#29d6ff]" />
            <p className="text-[0.64rem] font-semibold uppercase tracking-[0.38em] text-[#8be9ff]">
              Services · Systems in motion
            </p>
          </div>
          <div className="grid min-h-0 flex-1 items-center gap-12 xl:grid-cols-[1.08fr_0.92fr]">
            <div
              aria-hidden="true"
              className="mx-auto aspect-square w-[78%] rounded-full border border-[#8be9ff]/12 bg-[radial-gradient(circle,rgba(124,92,255,0.18),transparent_68%)]"
            />
            <div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-[0.62rem] tracking-[0.2em] text-white/28">
                  {service.number}
                </span>
                <span className="h-px w-11 bg-gradient-to-r from-[#7c5cff] to-[#29d6ff]" />
                <span className="text-[0.64rem] font-semibold uppercase tracking-[0.3em] text-[#8be9ff]">
                  {service.shortTitle}
                </span>
              </div>
              <p className="mt-6 max-w-[13ch] font-display text-[clamp(2rem,2.5vw,3.55rem)] font-semibold leading-[0.96] tracking-[-0.055em]">
                {service.title}
              </p>
              <p className="mt-5 max-w-xl text-lg leading-8 text-white/46">
                Preparing the interactive service system…
              </p>
            </div>
          </div>
          <div className="h-px bg-white/[0.09]" />
        </Container>
      </div>
    </section>
  );
}

const ServicesShowcaseScene = dynamic(
  () =>
    import("@/components/services/ServicesShowcaseScene").then(
      (module) => module.ServicesShowcaseScene
    ),
  {
    ssr: false,
    loading: ServicesDesktopLoading
  }
);

export function ServicesExperienceBoundary() {
  const hydrated = useHydrated();
  const reduceMotion = usePrefersReducedMotion();
  const useDesktopExperience = useMediaQuery("(min-width: 1280px)");

  if (!hydrated) {
    return (
      <>
        <div className="services-experience__desktop-initial">
          <ServicesDesktopLoading />
        </div>
        <div className="services-experience__static-initial">
          <ServicesStaticFallback />
        </div>
      </>
    );
  }

  if (reduceMotion || !useDesktopExperience) {
    return <ServicesStaticFallback />;
  }

  return <ServicesShowcaseScene />;
}
