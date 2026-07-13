"use client";

import dynamic from "next/dynamic";

import { ServicesStaticFallback } from "@/components/services/ServicesStaticFallback";
import { useMediaQuery, usePrefersReducedMotion } from "@/hooks/useMediaQuery";

const ServicesShowcaseScene = dynamic(
  () =>
    import("@/components/services/ServicesShowcaseScene").then(
      (module) => module.ServicesShowcaseScene
    ),
  { ssr: false }
);

export function ServicesExperienceBoundary() {
  const reduceMotion = usePrefersReducedMotion();
  const useDesktopExperience = useMediaQuery("(min-width: 1280px)");

  if (reduceMotion || !useDesktopExperience) {
    return <ServicesStaticFallback />;
  }

  return <ServicesShowcaseScene />;
}
