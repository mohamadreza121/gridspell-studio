"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ActionLink } from "@/components/ui/ActionControl";
import { Logo } from "@/components/layout/Logo";
import { marketingNavigation } from "@/config/navigation";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

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
            href="/login"
            className="hidden rounded-full px-4 py-2 text-sm text-white/58 transition-colors hover:text-white sm:inline-flex"
          >
            Client login
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
              href="/login"
              onClick={closeMenu}
              className="rounded-2xl px-4 py-3 text-base text-white/62 transition-colors hover:bg-white/[0.045] hover:text-white"
            >
              Client login
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
