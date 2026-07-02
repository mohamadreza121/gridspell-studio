"use client";

import { InsightsExperience } from "@/components/insights/InsightsExperience";
import { InsightsStaticFallback } from "@/components/insights/InsightsStaticFallback";
import {
  useHydrated,
  usePrefersReducedMotion
} from "@/hooks/useMediaQuery";

export function InsightsExperienceBoundary() {
  const hydrated = useHydrated();
  const reduceMotion = usePrefersReducedMotion();

  if (!hydrated || reduceMotion) {
    return <InsightsStaticFallback />;
  }

  return <InsightsExperience />;
}
