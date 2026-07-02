"use client";

import { useEffect } from "react";

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[contenteditable="true"]',
  '[tabindex]:not([tabindex="-1"])'
].join(",");

function getNavigationDialog() {
  const dialog = document.getElementById("gridspell-menu");
  return dialog instanceof HTMLElement && dialog.getAttribute("role") === "dialog"
    ? dialog
    : null;
}

function getMenuButton() {
  const button = document.querySelector<HTMLElement>(
    'button[aria-controls="gridspell-menu"]'
  );
  return button instanceof HTMLElement ? button : null;
}

function getFocusableElements(dialog: HTMLElement) {
  return Array.from(
    dialog.querySelectorAll<HTMLElement>(focusableSelector)
  ).filter((element) =>
    !element.hasAttribute("disabled") &&
    element.getAttribute("aria-hidden") !== "true" &&
    element.tabIndex >= 0 &&
    element.getClientRects().length > 0
  );
}

function focusWithoutScrolling(element: HTMLElement, dialog?: HTMLElement) {
  const scrollTop = dialog?.scrollTop ?? 0;
  const scrollLeft = dialog?.scrollLeft ?? 0;

  element.focus({ preventScroll: true });

  if (dialog) {
    dialog.scrollTop = scrollTop;
    dialog.scrollLeft = scrollLeft;
  }
}

export function NavigationAccessibilityController() {
  useEffect(() => {
    let firstFrame: number | null = null;
    let secondFrame: number | null = null;
    let activeDialog: HTMLElement | null = null;
    let restoreTriggerFocus = false;

    function cancelScheduledFocus() {
      if (firstFrame !== null) {
        window.cancelAnimationFrame(firstFrame);
        firstFrame = null;
      }
      if (secondFrame !== null) {
        window.cancelAnimationFrame(secondFrame);
        secondFrame = null;
      }
    }

    function scheduleInitialFocus(dialog: HTMLElement) {
      cancelScheduledFocus();
      firstFrame = window.requestAnimationFrame(() => {
        secondFrame = window.requestAnimationFrame(() => {
          if (!dialog.isConnected) return;
          const firstElement = getFocusableElements(dialog)[0] ?? dialog;
          focusWithoutScrolling(firstElement, dialog);
        });
      });
    }

    function synchronizeDialogState() {
      const dialog = getNavigationDialog();

      if (dialog) {
        activeDialog = dialog;
        if (dialog.dataset.keyboardFocusReady !== "true") {
          dialog.dataset.keyboardFocusReady = "true";
          scheduleInitialFocus(dialog);
        }
        return;
      }

      if (activeDialog && !activeDialog.isConnected) {
        activeDialog = null;
        if (restoreTriggerFocus) {
          restoreTriggerFocus = false;
          const trigger = getMenuButton();
          if (trigger) focusWithoutScrolling(trigger);
        }
      }
    }

    synchronizeDialogState();

    const observer = new MutationObserver(synchronizeDialogState);
    observer.observe(document.body, { childList: true, subtree: true });

    function handleKeyDown(event: KeyboardEvent) {
      const dialog = getNavigationDialog();

      if (event.key === "Escape") {
        if (dialog) restoreTriggerFocus = true;
        return;
      }

      if (event.key !== "Tab" || !dialog) return;

      const focusableElements = getFocusableElements(dialog);
      if (focusableElements.length === 0) {
        event.preventDefault();
        event.stopImmediatePropagation();
        focusWithoutScrolling(dialog, dialog);
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1) ?? firstElement;
      const activeElement = document.activeElement;
      const focusIsInsideDialog =
        activeElement instanceof Node && dialog.contains(activeElement);

      if (activeElement === dialog || !focusIsInsideDialog) {
        event.preventDefault();
        event.stopImmediatePropagation();
        focusWithoutScrolling(event.shiftKey ? lastElement : firstElement, dialog);
        return;
      }

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        event.stopImmediatePropagation();
        focusWithoutScrolling(lastElement, dialog);
        return;
      }

      if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        event.stopImmediatePropagation();
        focusWithoutScrolling(firstElement, dialog);
      }
    }

    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      cancelScheduledFocus();
      observer.disconnect();
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, []);

  return (
    <style>{`
      #gridspell-menu :is(
        a[href],
        button:not([disabled]),
        [tabindex]:not([tabindex="-1"])
      ):focus-visible {
        outline: 2px solid rgba(139, 233, 255, 0.95);
        outline-offset: 4px;
        box-shadow: 0 0 0 5px rgba(41, 214, 255, 0.12);
      }
    `}</style>
  );
}
