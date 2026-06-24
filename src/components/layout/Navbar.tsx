"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, LayoutDashboard, Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ActionLink } from "@/components/ui/ActionControl";
import { Logo } from "@/components/layout/Logo";
import { marketingNavigation } from "@/config/navigation";

export type MarketingViewer = {
  fullName: string | null;
  email: string | null;
  href: string;
  label: string;
  initials: string;
};

export function Navbar({ viewer }: { viewer: MarketingViewer | null }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  const accountHref = viewer?.href ?? "/login";
  const accountLabel = viewer?.label ?? "Client login";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-[#07080c]/80 backdrop-blur-2xl">
      <Container className="flex h-20 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {marketingNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-white/52 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={accountHref}
            className="hidden min-h-11 items-center gap-2.5 rounded-full px-3 text-sm text-white/62 transition-colors hover:bg-white/[0.045] hover:text-white sm:inline-flex"
            aria-label={viewer ? `Open ${accountLabel}` : "Client login"}
          >
            {viewer ? (
              <span className="grid h-8 w-8 place-items-center rounded-full border border-[#7c5cff]/45 bg-gradient-to-br from-[#7c5cff]/28 to-[#29d6ff]/18 text-[0.65rem] font-semibold text-white">
                {viewer.initials}
              </span>
            ) : null}
            <span>{accountLabel}</span>
            {viewer ? <LayoutDashboard className="h-4 w-4 text-[#8be9ff]" /> : null}
          </Link>
          <ActionLink href="/start-project" className="hidden min-h-11 px-5 sm:inline-flex">
            Start a project
            <ArrowUpRight className="h-4 w-4" />
          </ActionLink>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/12 bg-white/[0.04] text-white lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {menuOpen ? (
        <div className="border-t border-white/[0.07] bg-[#07080c]/96 px-5 py-5 backdrop-blur-2xl lg:hidden">
          <nav className="mx-auto grid max-w-[1440px] gap-1" aria-label="Mobile navigation">
            {marketingNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="rounded-2xl px-4 py-3 text-base text-white/62 transition-colors hover:bg-white/[0.045] hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={accountHref}
              onClick={closeMenu}
              className="flex items-center gap-3 rounded-2xl px-4 py-3 text-base text-white/62 transition-colors hover:bg-white/[0.045] hover:text-white"
            >
              {viewer ? (
                <span className="grid h-8 w-8 place-items-center rounded-full border border-[#7c5cff]/45 bg-gradient-to-br from-[#7c5cff]/28 to-[#29d6ff]/18 text-[0.65rem] font-semibold text-white">
                  {viewer.initials}
                </span>
              ) : null}
              <span>{accountLabel}</span>
            </Link>
            <ActionLink
              href="/start-project"
              className="mt-3 w-full"
              ariaLabel="Start a GridSpell project"
            >
              Start a project
              <ArrowUpRight className="h-4 w-4" />
            </ActionLink>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
