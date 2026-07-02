"use client";

import { AnimatePresence } from "motion/react";

import { ServicesShowcaseScene } from "@/components/services/ServicesShowcaseScene";
import { ServicesStaticFallback } from "@/components/services/ServicesStaticFallback";
import {
  useMediaQuery,
  usePrefersReducedMotion
} from "@/hooks/useMediaQuery";

export function ServicesExperienceBoundary() {
  const reduceMotion = usePrefersReducedMotion();
  const useDesktopExperience = useMediaQuery("(min-width: 1280px)");

  if (reduceMotion || !useDesktopExperience) {
    return <ServicesStaticFallback />;
  }

  return (
    <AnimatePresence initial={false}>
      <ServicesShowcaseScene />
    </AnimatePresence>
  );
}
