"use client";

import { InsightsExperience } from "@/components/insights/InsightsExperience";
import { InsightsStaticFallback } from "@/components/insights/InsightsStaticFallback";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

export function InsightsExperienceBoundary() {
  const reduceMotion = usePrefersReducedMotion();

  if (reduceMotion) {
    return <InsightsStaticFallback />;
  }

  return <InsightsExperience />;
}
