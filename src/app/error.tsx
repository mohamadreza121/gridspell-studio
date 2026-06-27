"use client";

import * as Sentry from "@sentry/nextjs";
import Link from "next/link";
import { useEffect } from "react";
import { ArrowLeft, RotateCcw } from "lucide-react";

export default function ErrorPage({
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
    <main className="grid min-h-svh place-items-center bg-[#07080c] px-6 py-28 text-white">
      <div className="max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#8be9ff]">
          Something went wrong
        </p>
        <h1 className="mt-6 font-display text-5xl font-semibold tracking-[-0.06em] sm:text-7xl">
          The page hit an unexpected error.
        </h1>
        <p className="mt-6 text-base leading-8 text-white/45">
          The error has been recorded. Try the page again, or return to the homepage if
          the problem continues.
        </p>
        {error.digest ? (
          <p className="mt-4 font-mono text-xs text-white/25">
            Reference: {error.digest}
          </p>
        ) : null}
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#08090d]"
          >
            <RotateCcw className="h-4 w-4" /> Try again
          </button>
          <Link
            href="/"
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-6 text-sm font-semibold text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
