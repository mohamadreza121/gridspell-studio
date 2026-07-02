"use client";

import { useSyncExternalStore, type ReactNode } from "react";

function subscribe() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export function HydrationBoundary({
  fallback,
  children
}: {
  fallback: ReactNode;
  children: ReactNode;
}) {
  const hydrated = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  return hydrated ? children : fallback;
}
