"use client";

import { useEffect } from "react";

export function NavigationFocusRestore() {
  useEffect(() => {
    let dialogWasOpen = false;
    let restoreAfterClose = false;

    function getDialog() {
      const dialog = document.getElementById("gridspell-menu");
      return dialog instanceof HTMLElement ? dialog : null;
    }

    function getTrigger() {
      const trigger = document.querySelector<HTMLElement>(
        'button[aria-controls="gridspell-menu"]'
      );
      return trigger instanceof HTMLElement ? trigger : null;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && getDialog()) {
        restoreAfterClose = true;
      }
    }

    function handleMutations() {
      const dialog = getDialog();

      if (dialog) {
        dialogWasOpen = true;
        return;
      }

      if (!dialogWasOpen) {
        return;
      }

      dialogWasOpen = false;

      if (!restoreAfterClose) {
        return;
      }

      restoreAfterClose = false;

      window.requestAnimationFrame(() => {
        getTrigger()?.focus({ preventScroll: true });
      });
    }

    const observer = new MutationObserver(handleMutations);
    observer.observe(document.body, { childList: true, subtree: true });
    document.addEventListener("keydown", handleKeyDown, true);

    handleMutations();

    return () => {
      observer.disconnect();
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, []);

  return null;
}
