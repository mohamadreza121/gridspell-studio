import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function AdminHeader({ eyebrow = "Admin", title, text, action }: { eyebrow?: string; title: string; text?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[.34em] text-[#8be9ff]">{eyebrow}</p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-[-.04em] sm:text-5xl">{title}</h1>
        {text ? <p className="mt-4 max-w-3xl text-sm leading-7 text-white/42">{text}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function AdminNotice({ error, message }: { error?: string; message?: string }) {
  if (!error && !message) return null;
  return (
    <p className={cn("mt-6 rounded-2xl border px-4 py-3 text-sm", error ? "border-[#ff5f6d]/25 bg-[#ff5f6d]/8 text-[#ff9aa3]" : "border-[#35d07f]/25 bg-[#35d07f]/8 text-[#7ce3aa]")}>{error ?? message}</p>
  );
}

export function AdminPanel({ title, eyebrow, children, className }: { title?: string; eyebrow?: string; children: ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-[1.55rem] border border-white/[.09] bg-white/[.025] p-5 sm:p-6", className)}>
      {eyebrow ? <p className="text-[.62rem] uppercase tracking-[.28em] text-white/25">{eyebrow}</p> : null}
      {title ? <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-.035em] text-white">{title}</h2> : null}
      {children}
    </section>
  );
}

export function MetricCard({ label, value, detail }: { label: string; value: string; detail?: string }) {
  return (
    <article className="rounded-[1.45rem] border border-white/[.09] bg-white/[.025] p-5 sm:p-6">
      <p className="text-[.62rem] uppercase tracking-[.26em] text-white/26">{label}</p>
      <p className="mt-6 font-display text-3xl font-semibold tracking-[-.04em] text-white">{value}</p>
      {detail ? <p className="mt-2 text-xs text-white/30">{detail}</p> : null}
    </article>
  );
}

export function StatusBadge({ value }: { value: string }) {
  const normalized = value.toLowerCase();
  const tone = normalized.includes("paid") || normalized.includes("won") || normalized.includes("approved") || normalized.includes("completed") || normalized.includes("active") || normalized.includes("launched")
    ? "border-[#35d07f]/25 bg-[#35d07f]/8 text-[#7ce3aa]"
    : normalized.includes("lost") || normalized.includes("void") || normalized.includes("blocked") || normalized.includes("overdue") || normalized.includes("declined")
      ? "border-[#ff5f6d]/25 bg-[#ff5f6d]/8 text-[#ff9aa3]"
      : normalized.includes("review") || normalized.includes("sent") || normalized.includes("negotiating") || normalized.includes("open")
        ? "border-[#f6c453]/25 bg-[#f6c453]/8 text-[#f8d786]"
        : "border-white/10 bg-white/[.04] text-white/48";
  return <span className={cn("inline-flex rounded-full border px-2.5 py-1 text-[.62rem] font-medium uppercase tracking-[.17em]", tone)}>{value.replaceAll("_", " ")}</span>;
}

export function EmptyState({ children }: { children: ReactNode }) {
  return <div className="rounded-2xl border border-dashed border-white/10 p-6 text-sm text-white/32">{children}</div>;
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className="text-sm font-medium text-[#8be9ff] transition hover:text-white">{children}</Link>;
}

export function formatMoney(value: number | string | null | undefined, currency = "CAD") {
  return new Intl.NumberFormat("en-CA", { style: "currency", currency, maximumFractionDigits: 0 }).format(Number(value ?? 0));
}

export function formatDate(value: string | null | undefined) {
  if (!value) return "Not set";
  return new Intl.DateTimeFormat("en-CA", { dateStyle: "medium" }).format(new Date(value));
}
