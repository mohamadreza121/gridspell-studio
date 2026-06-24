import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export function PortalPageHeader({
  eyebrow,
  title,
  description,
  action
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[.34em] text-[#8be9ff]">{eyebrow}</p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/40">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

export function PortalPanel({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-[1.6rem] border border-white/[.085] bg-white/[.025] p-5 shadow-[0_24px_80px_rgba(0,0,0,.18)] sm:p-6",
        className
      )}
    >
      {children}
    </section>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const normalized = status.replaceAll("_", " ");
  const positive = ["active", "approved", "completed", "paid", "resolved", "launched"].includes(
    status
  );
  const warning = ["blocked", "overdue", "urgent", "paused"].includes(status);
  const review = ["review", "in_review", "open", "in_progress", "waiting_on_client"].includes(
    status
  );

  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-2.5 py-1 text-[0.62rem] font-medium uppercase tracking-[.18em]",
        positive && "border-[#35d07f]/25 bg-[#35d07f]/8 text-[#7ce3aa]",
        warning && "border-[#ff8b5f]/25 bg-[#ff8b5f]/8 text-[#ffb29a]",
        review && "border-[#8be9ff]/25 bg-[#8be9ff]/8 text-[#8be9ff]",
        !positive && !warning && !review && "border-white/10 bg-white/[.035] text-white/42"
      )}
    >
      {normalized}
    </span>
  );
}

export function EmptyState({
  title,
  text,
  href,
  linkLabel
}: {
  title: string;
  text: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <PortalPanel className="grid min-h-[280px] place-items-center text-center">
      <div className="max-w-md">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-white/[.09] bg-white/[.035] text-[#8be9ff]">
          <FolderOpen className="h-6 w-6" />
        </span>
        <h2 className="mt-5 font-display text-2xl font-semibold">{title}</h2>
        <p className="mt-3 text-sm leading-7 text-white/38">{text}</p>
        {href && linkLabel ? (
          <Link
            href={href}
            className="mt-6 inline-flex items-center gap-2 text-sm text-[#8be9ff] transition hover:text-white"
          >
            {linkLabel} <ArrowRight className="h-4 w-4" />
          </Link>
        ) : null}
      </div>
    </PortalPanel>
  );
}

export function FlashMessage({
  error,
  message
}: {
  error?: string;
  message?: string;
}) {
  if (!error && !message) return null;
  return (
    <div
      className={cn(
        "mt-6 rounded-2xl border px-4 py-3 text-sm",
        error
          ? "border-[#ff5f6d]/25 bg-[#ff5f6d]/8 text-[#ff9aa3]"
          : "border-[#35d07f]/25 bg-[#35d07f]/8 text-[#7ce3aa]"
      )}
    >
      {error ?? message}
    </div>
  );
}

export function formatDate(value: string | null | undefined) {
  if (!value) return "Not scheduled";
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(new Date(value));
}

export function formatDateTime(value: string | null | undefined) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-CA", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(value));
}

export function formatCurrency(value: number | null | undefined, currency = "CAD") {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(Number(value ?? 0));
}

export function formatBytes(value: number | null | undefined) {
  const bytes = Number(value ?? 0);
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
