"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error, {
      tags: error.digest ? { digest: error.digest } : undefined
    });
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "32px",
          background: "#07080c",
          color: "#f6f7fb",
          fontFamily: "Arial, sans-serif"
        }}
      >
        <div style={{ maxWidth: 640, textAlign: "center" }}>
          <p
            style={{
              color: "#8be9ff",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: ".28em",
              textTransform: "uppercase"
            }}
          >
            GridSpell system error
          </p>
          <h1 style={{ margin: "24px 0 0", fontSize: 54, lineHeight: 1 }}>
            The application could not finish loading.
          </h1>
          <p style={{ margin: "24px 0 0", color: "#a8adbd", lineHeight: 1.8 }}>
            The error has been recorded. Reload the application or try again.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: 28,
              minHeight: 48,
              padding: "0 24px",
              border: 0,
              borderRadius: 999,
              background: "#ffffff",
              color: "#08090d",
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
