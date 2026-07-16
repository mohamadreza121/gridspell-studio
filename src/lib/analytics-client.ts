export function trackAnalyticsEvent(
  name: string,
  parameters: Record<string, string | number | boolean> = {}
) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, parameters);
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
