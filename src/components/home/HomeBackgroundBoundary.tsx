"use client";

import { MobileHomeGBackground } from "@/components/home/MobileHomeGBackground";
import {
  useMediaQuery,
  usePrefersReducedMotion
} from "@/hooks/useMediaQuery";

export function HomeBackgroundBoundary() {
  const reduceMotion = usePrefersReducedMotion();
  const useMobileBackground = useMediaQuery("(max-width: 1279px)");

  if (reduceMotion || !useMobileBackground) {
    return null;
  }

  return <MobileHomeGBackground />;
}
