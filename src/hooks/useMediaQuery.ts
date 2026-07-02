"use client";

import { useSyncExternalStore } from "react";

function createMediaQueryStore(query: string) {
  function subscribe(onStoreChange: () => void) {
    const mediaQuery = window.matchMedia(query);

    mediaQuery.addEventListener("change", onStoreChange);

    return () => {
      mediaQuery.removeEventListener("change", onStoreChange);
    };
  }

  function getSnapshot() {
    return window.matchMedia(query).matches;
  }

  function getServerSnapshot() {
    return false;
  }

  return {
    subscribe,
    getSnapshot,
    getServerSnapshot
  };
}

const stores = new Map<string, ReturnType<typeof createMediaQueryStore>>();

export function useMediaQuery(query: string) {
  let store = stores.get(query);

  if (!store) {
    store = createMediaQueryStore(query);
    stores.set(query, store);
  }

  return useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot
  );
}

export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
