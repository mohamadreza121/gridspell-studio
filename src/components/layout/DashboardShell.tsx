import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/layout/Logo";
import { signOutAction } from "@/features/auth/actions";

export type DashboardViewer = {
  fullName: string | null;
  email: string | null;
  initials: string;
  workspaceLabel?: string | null;
};

type Item = { label: string; href: string };

export function DashboardShell({
  title,
  navigation,
  viewer,
  homeHref = "/portal",
  children
}: {
  title: string;
  navigation: readonly Item[];
  viewer: DashboardViewer;
  homeHref?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#07080c] lg:grid lg:grid-cols-[290px_1fr]">
      <aside className="border-b border-white/[.08] bg-[#0b0d13] p-6 lg:sticky lg:top-0 lg:min-h-screen lg:self-start lg:border-b-0 lg:border-r">
        <Logo />
        <p className="mt-10 text-[.65rem] uppercase tracking-[.36em] text-white/24">
          {title}
        </p>
        <nav className="mt-5 grid gap-1">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl px-4 py-3 text-sm text-white/48 transition hover:bg-white/[.055] hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-10 border-t border-white/[.08] pt-5">
          <div className="flex items-center gap-3 rounded-2xl border border-white/[.08] bg-white/[.025] p-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#7c5cff]/45 bg-gradient-to-br from-[#7c5cff]/28 to-[#29d6ff]/18 text-xs font-semibold text-white">
              {viewer.initials}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white/78">
                {viewer.fullName || "GridSpell client"}
              </p>
              <p className="truncate text-xs text-white/30">{viewer.email}</p>
            </div>
          </div>
          {viewer.workspaceLabel ? (
            <p className="mt-3 px-1 text-xs text-white/28">{viewer.workspaceLabel}</p>
          ) : null}
        </div>

        <div className="mt-6 grid gap-3">
          <Link href="/" className="text-sm text-[#8be9ff] transition hover:text-white">
            Return to website
          </Link>
          <form action={signOutAction}>
            <button type="submit" className="text-sm text-white/34 transition hover:text-white">
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <div className="min-w-0">
        <header className="flex h-20 items-center justify-between border-b border-white/[.08] px-5 sm:px-8">
          <div>
            <p className="font-display text-lg font-semibold">{title}</p>
            {viewer.workspaceLabel ? (
              <p className="mt-0.5 text-xs text-white/30">{viewer.workspaceLabel}</p>
            ) : null}
          </div>
          <Link
            href={homeHref}
            className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#7c5cff] to-[#29d6ff] text-xs font-semibold text-white shadow-[0_10px_35px_rgba(124,92,255,.25)]"
            aria-label="Open portal overview"
          >
            {viewer.initials}
          </Link>
        </header>
        <main className="p-5 sm:p-8 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
