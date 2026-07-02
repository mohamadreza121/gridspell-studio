"use client";

import { AboutExperience } from "@/components/about/AboutExperience";
import { AboutStaticFallback } from "@/components/about/AboutStaticFallback";
import {
  useMediaQuery,
  usePrefersReducedMotion
} from "@/hooks/useMediaQuery";

export function AboutExperienceBoundary() {
  const reduceMotion = usePrefersReducedMotion();
  const useDesktopExperience = useMediaQuery("(min-width: 1280px)");

  if (reduceMotion || !useDesktopExperience) {
    return <AboutStaticFallback />;
  }

  return <AboutExperience />;
}
