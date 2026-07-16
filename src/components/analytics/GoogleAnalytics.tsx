const ANALYTICS_INTERACTION_EVENTS = [
  "pointerdown",
  "keydown",
  "touchstart",
  "wheel"
] as const;

export function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (!measurementId) return null;

  const bootstrap = `
    (() => {
      if (window.__gridspellAnalyticsBootstrapped) return;
      window.__gridspellAnalyticsBootstrapped = true;

      const measurementId = ${JSON.stringify(measurementId)};
      const interactionEvents = ${JSON.stringify(ANALYTICS_INTERACTION_EVENTS)};
      let loaded = false;
      let lastTrackedLocation = "";

      const sendPageView = () => {
        if (typeof window.gtag !== "function") return;

        const pageLocation = window.location.href;
        if (pageLocation === lastTrackedLocation) return;
        lastTrackedLocation = pageLocation;

        window.gtag("event", "page_view", {
          page_path: window.location.pathname + window.location.search,
          page_location: pageLocation,
          page_title: document.title
        });
      };

      const handleRouteChange = () => {
        window.setTimeout(sendPageView, 0);
      };

      const installRouteTracking = () => {
        if (window.__gridspellAnalyticsRouteTracking) return;
        window.__gridspellAnalyticsRouteTracking = true;

        const pushState = history.pushState;
        const replaceState = history.replaceState;

        history.pushState = function (...args) {
          const result = pushState.apply(this, args);
          handleRouteChange();
          return result;
        };

        history.replaceState = function (...args) {
          const result = replaceState.apply(this, args);
          handleRouteChange();
          return result;
        };

        window.addEventListener("popstate", handleRouteChange, { passive: true });
      };

      const removeActivationListeners = () => {
        interactionEvents.forEach((eventName) => {
          window.removeEventListener(eventName, loadAnalytics);
        });
      };

      function loadAnalytics() {
        if (loaded) return;
        loaded = true;
        removeActivationListeners();
        window.clearTimeout(timeoutId);

        window.dataLayer = window.dataLayer || [];
        window.gtag = window.gtag || function () {
          window.dataLayer.push(arguments);
        };

        window.gtag("js", new Date());
        window.gtag("config", measurementId, {
          send_page_view: false,
          allow_google_signals: false
        });

        installRouteTracking();
        sendPageView();

        const script = document.createElement("script");
        script.async = true;
        script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(measurementId);
        document.head.appendChild(script);
      }

      interactionEvents.forEach((eventName) => {
        window.addEventListener(eventName, loadAnalytics, {
          once: true,
          passive: true
        });
      });

      const timeoutId = window.setTimeout(loadAnalytics, 5200);
    })();
  `;

  return (
    <script
      id="gridspell-ga-bootstrap"
      dangerouslySetInnerHTML={{ __html: bootstrap }}
    />
  );
}

declare global {
  interface Window {
    __gridspellAnalyticsBootstrapped?: boolean;
    __gridspellAnalyticsRouteTracking?: boolean;
    dataLayer: IArguments[];
    gtag?: (...args: unknown[]) => void;
  }
}
