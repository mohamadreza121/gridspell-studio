"use client";

import { useEffect } from "react";

import {
  Navbar,
  type MarketingViewer
} from "@/components/layout/Navbar";
import { NavigationAccessibilityController } from "@/components/layout/NavigationAccessibilityController";
import { NavigationFocusRestore } from "@/components/layout/NavigationFocusRestore";

type NavigationRuntimeProps = {
  viewer: MarketingViewer | null;
  openOnMount: boolean;
};

export function NavigationRuntime({
  viewer,
  openOnMount
}: NavigationRuntimeProps) {
  useEffect(() => {
    if (!openOnMount) return;

    let frameId = 0;
    let attempts = 0;

    const openMenu = () => {
      const trigger = document.querySelector<HTMLButtonElement>(
        'button[aria-controls="gridspell-menu"]'
      );

      if (trigger) {
        trigger.focus({ preventScroll: true });
        trigger.click();
        return;
      }

      attempts += 1;
      if (attempts < 6) {
        frameId = window.requestAnimationFrame(openMenu);
      }
    };

    frameId = window.requestAnimationFrame(openMenu);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [openOnMount]);

  return (
    <>
      <NavigationAccessibilityController />
      <NavigationFocusRestore />
      <Navbar viewer={viewer} />
    </>
  );
}
