"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDownRight, ArrowUpRight, LayoutDashboard, Mail, X } from "lucide-react";

import { Logo } from "@/components/layout/Logo";
import { marketingNavigation } from "@/config/navigation";

export type MarketingViewer = {
  fullName: string | null;
  email: string | null;
  href: string;
  label: string;
  initials: string;
};

const revealTransition = {
  duration: 0.72,
  ease: [0.76, 0, 0.24, 1] as const
};

export function Navbar({ viewer }: { viewer: MarketingViewer | null }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuDialogRef = useRef<HTMLDivElement>(null);

  const accountHref = viewer?.href ?? "/login";
  const accountLabel = viewer?.label ?? "Client login";

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const menuButton = menuButtonRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    const frame = window.requestAnimationFrame(() => {
      const firstFocusable = menuDialogRef.current?.querySelector<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      firstFocusable?.focus();
    });

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        return;
      }

      if (event.key !== "Tab" || !menuDialogRef.current) return;

      const focusable = Array.from(
        menuDialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => !element.hasAttribute("disabled"));

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1] || first;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;

      const focusTarget =
        previouslyFocused?.isConnected && previouslyFocused !== document.body
          ? previouslyFocused
          : menuButton;
      focusTarget?.focus();
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  function isActiveLink(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <>
      {/* Transparent navbar layer */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[100] bg-transparent">
        <div className="mx-auto flex h-24 w-full max-w-[1920px] items-center justify-between px-5 sm:px-8 lg:px-12">
          {/* Logo */}
          <motion.div
            className="pointer-events-auto relative z-10"
            animate={{
              opacity: menuOpen ? 0.86 : 1,
              y: menuOpen ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            <Logo />
          </motion.div>

          {/* Menu trigger */}
          <button
            ref={menuButtonRef}
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="gridspell-menu"
            onClick={() => {
              setMenuOpen((current) => !current);
            }}
            className={[
              "pointer-events-auto group relative z-10 flex h-14 -translate-y-[2px] items-center overflow-hidden rounded-full border transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8be9ff]/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07080c]",
              menuOpen
                ? "border-[#8be9ff]/30 bg-[#090c12]/88 text-white shadow-[0_18px_70px_rgba(0,0,0,0.42)] backdrop-blur-2xl hover:border-[#8be9ff]/50 hover:bg-[#10141d]"
                : "border-white/[0.13] bg-black/10 text-white shadow-[0_16px_50px_rgba(0,0,0,0.12)] backdrop-blur-md hover:border-white/25 hover:bg-black/25"
            ].join(" ")}
          >
            <span
              aria-hidden="true"
              className={[
                "pointer-events-none absolute inset-0 transition-opacity duration-500",
                menuOpen
                  ? "bg-[radial-gradient(circle_at_80%_50%,rgba(41,214,255,0.11),transparent_45%)] opacity-100"
                  : "opacity-0"
              ].join(" ")}
            />

            <span className="relative flex h-full items-center gap-3 px-5">
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em]">
                {menuOpen ? "Close" : "Menu"}
              </span>

              <span className="relative grid h-7 w-7 place-items-center">
                {menuOpen ? (
                  <X className="h-4 w-4 text-[#8be9ff]" />
                ) : (
                  <span className="relative block h-3.5 w-5">
                    <span className="absolute left-0 top-0 h-px w-5 bg-current transition-transform duration-300 group-hover:translate-x-1" />
                    <span className="absolute right-0 top-1/2 h-px w-3.5 -translate-y-1/2 bg-current transition-all duration-300 group-hover:w-5" />
                    <span className="absolute bottom-0 left-0 h-px w-5 bg-current transition-transform duration-300 group-hover:-translate-x-1" />
                  </span>
                )}
              </span>
            </span>

            {menuOpen ? (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-5 bottom-0 h-px bg-gradient-to-r from-transparent via-[#8be9ff]/70 to-transparent"
              />
            ) : null}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            ref={menuDialogRef}
            id="gridspell-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Main navigation"
            initial={{
              clipPath: "circle(0% at calc(100% - 5rem) 3rem)"
            }}
            animate={{
              clipPath: "circle(160% at calc(100% - 5rem) 3rem)"
            }}
            exit={{
              clipPath: "circle(0% at calc(100% - 5rem) 3rem)"
            }}
            transition={revealTransition}
            className="fixed inset-0 z-[90] overflow-y-auto bg-[#07080c] text-white"
          >
            {/* Grid background */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
                backgroundSize: "72px 72px"
              }}
            />

            {/* Subtle dark fade at the top */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#07080c] via-[#07080c]/70 to-transparent"
            />

            {/* Cyan ambience */}
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.82 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.16, duration: 0.9 }}
              className="pointer-events-none absolute -right-48 top-4 h-[42rem] w-[42rem] rounded-full bg-[#29d6ff]/12 blur-[150px]"
            />

            {/* Violet ambience */}
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.82 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.9 }}
              className="pointer-events-none absolute -bottom-72 left-[15%] h-[46rem] w-[46rem] rounded-full bg-[#7c5cff]/17 blur-[160px]"
            />

            <div className="relative mx-auto flex min-h-screen w-full max-w-[1920px] flex-col px-5 pb-8 pt-32 sm:px-8 lg:px-12 lg:pb-12">
              <div className="grid flex-1 gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(20rem,0.6fr)] lg:gap-20">
                {/* Main navigation links */}
                <nav
                  className="flex flex-col justify-center"
                  aria-label="Main navigation"
                >
                  <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.23, duration: 0.45 }}
                    className="mb-7 text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-[#8be9ff]"
                  >
                    Navigate GridSpell
                  </motion.p>

                  <div className="border-t border-white/[0.1]">
                    {marketingNavigation.map((item, index) => {
                      const active = isActiveLink(item.href);

                      return (
                        <motion.div
                          key={item.href}
                          initial={{ opacity: 0, y: 34 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 18 }}
                          transition={{
                            delay: 0.24 + index * 0.055,
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1]
                          }}
                        >
                          <Link
                            href={item.href}
                            onClick={closeMenu}
                            aria-current={active ? "page" : undefined}
                            className="group relative flex items-center justify-between overflow-hidden border-b border-white/[0.1] py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#8be9ff]/70 sm:py-5 lg:py-6"
                          >
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 origin-left scale-x-0 bg-white/[0.035] transition-transform duration-500 ease-out group-hover:scale-x-100"
                            />

                            <span
                              aria-hidden="true"
                              className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-[#7c5cff] to-[#29d6ff] transition-all duration-500 group-hover:w-full"
                            />

                            <span className="relative flex items-start gap-4 sm:gap-7">
                              <span
                                className={[
                                  "mt-2 font-mono text-[0.58rem] tracking-[0.18em] transition-colors duration-300 sm:mt-3",
                                  active
                                    ? "text-[#8be9ff]"
                                    : "text-white/24 group-hover:text-[#8be9ff]"
                                ].join(" ")}
                              >
                                {String(index + 1).padStart(2, "0")}
                              </span>

                              <span
                                className={[
                                  "font-display text-[clamp(2.2rem,6.3vw,6.8rem)] font-semibold leading-[0.86] tracking-[-0.07em] transition-all duration-500",
                                  active
                                    ? "translate-x-2 text-white"
                                    : "text-white/54 group-hover:translate-x-2 group-hover:text-white"
                                ].join(" ")}
                              >
                                {item.label}
                              </span>
                            </span>

                            <span className="relative mr-1 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/[0.1] text-white/32 transition-all duration-500 group-hover:rotate-[-45deg] group-hover:border-[#8be9ff]/40 group-hover:bg-[#8be9ff]/10 group-hover:text-[#8be9ff] sm:h-14 sm:w-14">
                              <ArrowDownRight className="h-4 w-4 sm:h-5 sm:w-5" />
                            </span>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </nav>

                {/* Right-side project panel */}
                <motion.aside
                  initial={{ opacity: 0, x: 45 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 25 }}
                  transition={{
                    delay: 0.45,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="flex flex-col justify-end lg:border-l lg:border-white/[0.1] lg:pl-10 xl:pl-14"
                >
                  <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.1] bg-white/[0.025] p-6 backdrop-blur-sm sm:p-8">
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#29d6ff]/9 blur-3xl"
                    />

                    <div className="relative">
                      <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <span className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-white/34">
                          Studio status
                        </span>

                        <span className="flex items-center gap-2 text-xs text-[#8be9ff]">
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#29d6ff] opacity-60" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#29d6ff]" />
                          </span>
                          Available for select projects
                        </span>
                      </div>

                      <p className="max-w-md font-display text-3xl font-semibold leading-[1.05] tracking-[-0.05em] sm:text-4xl">
                        Have a business worth presenting properly?
                      </p>

                      <p className="mt-5 max-w-sm text-sm leading-7 text-white/43">
                        Let&apos;s turn the strategy, interface, and technology into one
                        clear digital experience.
                      </p>

                      <Link
                        href="/start-project"
                        onClick={closeMenu}
                        className="group mt-8 flex min-h-14 items-center justify-between overflow-hidden rounded-full border border-white/[0.14] bg-white px-5 text-sm font-semibold text-[#08090d] transition-all duration-300 hover:scale-[1.015]"
                      >
                        <span>Start a project</span>

                        <span className="grid h-9 w-9 place-items-center rounded-full bg-[#090a0f] text-white transition-transform duration-300 group-hover:rotate-45">
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      </Link>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    <Link
                      href={accountHref}
                      onClick={closeMenu}
                      className="group flex min-h-16 items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.02] px-5 text-sm text-white/56 transition-all duration-300 hover:border-white/[0.16] hover:bg-white/[0.045] hover:text-white"
                    >
                      <span className="flex items-center gap-3">
                        {viewer ? (
                          <span className="grid h-8 w-8 place-items-center rounded-full border border-[#7c5cff]/40 bg-[#7c5cff]/15 text-[0.62rem] font-semibold text-white">
                            {viewer.initials}
                          </span>
                        ) : null}

                        {accountLabel}
                      </span>

                      {viewer ? (
                        <LayoutDashboard className="h-4 w-4 text-[#8be9ff]" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      )}
                    </Link>

                    <a
                      href="mailto:hello@gridspellstudio.com"
                      className="group flex min-h-16 items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.02] px-5 text-sm text-white/56 transition-all duration-300 hover:border-white/[0.16] hover:bg-white/[0.045] hover:text-white"
                    >
                      <span>Email the studio</span>
                      <Mail className="h-4 w-4 text-[#8be9ff]" />
                    </a>
                  </div>
                </motion.aside>
              </div>

              {/* Bottom information */}
              <motion.footer
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.62, duration: 0.5 }}
                className="mt-12 flex flex-col gap-4 border-t border-white/[0.1] pt-5 text-[0.62rem] uppercase tracking-[0.24em] text-white/28 sm:flex-row sm:items-center sm:justify-between"
              >
                <span>Toronto · Canada · Working worldwide</span>
                <span>Built on structure. Designed to captivate.</span>
              </motion.footer>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
