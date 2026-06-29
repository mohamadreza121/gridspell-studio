"use client";

import Script from "next/script";
import { useEffect, useId, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "compact" | "flexible";
          action?: string;
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: (errorCode: string) => boolean | void;
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

function isPreviewHostname(hostname: string) {
  return hostname.endsWith(".vercel.app");
}

function getTurnstileErrorMessage(errorCode: string) {
  if (errorCode.startsWith("110200")) {
    return "This preview hostname is not authorized in Cloudflare Turnstile yet. Add the exact Vercel preview hostname to the widget's Hostname Management settings, then refresh.";
  }

  if (
    errorCode.startsWith("110100") ||
    errorCode.startsWith("110110") ||
    errorCode.startsWith("400020") ||
    errorCode.startsWith("400070")
  ) {
    return "The Turnstile site key is not configured correctly for this environment. Check the Preview environment variables in Vercel.";
  }

  return "The security check could not connect. Disable any VPN or content blocker, refresh the page, and try again.";
}

export function TurnstileWidget({ action = "lead_form" }: { action?: string }) {
  const productionSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const previewSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_PREVIEW_SITE_KEY;
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [siteKey, setSiteKey] = useState<string | null>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const [token, setToken] = useState("");
  const [widgetError, setWidgetError] = useState("");
  const reactId = useId().split(":").join("");

  useEffect(() => {
    const preview = isPreviewHostname(window.location.hostname);
    setSiteKey(preview ? previewSiteKey || productionSiteKey || null : productionSiteKey || null);
  }, [previewSiteKey, productionSiteKey]);

  useEffect(() => {
    const container = containerRef.current;

    if (!siteKey || !scriptReady || !container || !window.turnstile) {
      return;
    }

    if (widgetIdRef.current) {
      window.turnstile.remove(widgetIdRef.current);
      widgetIdRef.current = null;
    }

    widgetIdRef.current = window.turnstile.render(container, {
      sitekey: siteKey,
      theme: "dark",
      size: "flexible",
      action,

      callback: (newToken) => {
        setToken(newToken);
        setWidgetError("");
      },

      "expired-callback": () => {
        setToken("");
        setWidgetError("The security check expired. Please complete it again.");
      },

      "error-callback": (errorCode) => {
        setToken("");
        setWidgetError(getTurnstileErrorMessage(errorCode));

        console.warn("Turnstile client error:", errorCode, {
          hostname: window.location.hostname,
          usingPreviewKey: Boolean(
            isPreviewHostname(window.location.hostname) && previewSiteKey
          )
        });

        return !errorCode.startsWith("110") && !errorCode.startsWith("4000");
      }
    });

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [action, previewSiteKey, scriptReady, siteKey]);

  if (!siteKey) {
    return (
      <p className="rounded-xl border border-[#ff5f6d]/25 bg-[#ff5f6d]/8 px-4 py-3 text-xs leading-5 text-[#ff9aa3]">
        Turnstile is not configured for this environment. Add the appropriate site key in Vercel.
      </p>
    );
  }

  return (
    <div className="grid gap-2">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
        onReady={() => setScriptReady(true)}
      />

      <input type="hidden" name="turnstileToken" value={token} readOnly />

      <div
        id={`turnstile-${reactId}`}
        ref={containerRef}
        className="min-h-[65px] w-full"
        aria-label="Bot protection verification"
      />

      {widgetError ? (
        <p
          role="alert"
          className="rounded-xl border border-[#ff5f6d]/25 bg-[#ff5f6d]/8 px-4 py-3 text-xs leading-5 text-[#ff9aa3]"
        >
          {widgetError}
        </p>
      ) : null}

      <p className="text-xs leading-5 text-white/28">
        This form uses Cloudflare Turnstile to reduce automated submissions.
      </p>
    </div>
  );
}
