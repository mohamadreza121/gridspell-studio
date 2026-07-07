"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const ANALYTICS_INTERACTION_EVENTS = [
  "pointerdown",
  "keydown",
  "touchstart",
  "wheel"
] as const;

export function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [shouldLoad, setShouldLoad] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!measurementId || shouldLoad) return;

    let cancelled = false;

    const loadAnalytics = () => {
      if (cancelled) return;
      setShouldLoad(true);
    };

    ANALYTICS_INTERACTION_EVENTS.forEach((eventName) => {
      window.addEventListener(eventName, loadAnalytics, {
        once: true,
        passive: true
      });
    });

    const timeoutId = window.setTimeout(loadAnalytics, 5200);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);

      ANALYTICS_INTERACTION_EVENTS.forEach((eventName) => {
        window.removeEventListener(eventName, loadAnalytics);
      });
    };
  }, [measurementId, shouldLoad]);

  useEffect(() => {
    if (!measurementId || !ready || !window.gtag) return;

    const query = searchParams.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;

    window.gtag("event", "page_view", {
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title
    });
  }, [measurementId, pathname, ready, searchParams]);

  if (!measurementId || !shouldLoad) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="lazyOnload"
      />
      <Script
        id="gridspell-ga4"
        strategy="lazyOnload"
        onReady={() => setReady(true)}
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            send_page_view: false,
            allow_google_signals: false
          });
        `}
      </Script>
    </>
  );
}

export function trackAnalyticsEvent(
  name: string,
  parameters: Record<string, string | number | boolean> = {}
) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, parameters);
}
