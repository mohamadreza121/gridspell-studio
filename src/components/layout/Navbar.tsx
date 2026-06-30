"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowDownRight,
  ArrowUpRight,
  LayoutDashboard,
  Mail,
  X
} from "lucide-react";

import { Logo } from "@/components/layout/Logo";
import { marketingNavigation } from "@/config/navigation";

export type MarketingViewer = {
  fullName: string | null;
  email: string | null;
  href: string;
  label: string;
  initials: string;
};

const desktopRevealTransition = {
  duration: 0.72,
  ease: [0.76, 0, 0.24, 1] as const
};

const compactRevealTransition = {
  duration: 0.3,
  ease: [0.22, 1, 0.36, 1] as const
};

export function Navbar({
  viewer
}: {
  viewer: MarketingViewer | null;
}) {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [compactMenu, setCompactMenu] = useState(false);

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuDialogRef = useRef<HTMLDivElement>(null);

  const accountHref = viewer?.href ?? "/login";
  const accountLabel = viewer?.label ?? "Client login";

  /*
   * Phones and tablets use a lightweight opacity/transform animation.
   * Desktop keeps the circular reveal effect.
   */
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");

    function updateCompactMenu() {
      setCompactMenu(mediaQuery.matches);
    }

    updateCompactMenu();
    mediaQuery.addEventListener("change", updateCompactMenu);

    return () => {
      mediaQuery.removeEventListener("change", updateCompactMenu);
    };
  }, []);

  /*
   * Close the menu automatically after navigating.
   */
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  /*
   * Lock the page without changing its visual scroll position.
   * This prevents the navbar and page content from shifting horizontally
   * when the scrollbar disappears.
   */
  useEffect(() => {
    if (!menuOpen) return;

    const html = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY;

    const previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const previousStyles = {
      htmlOverflow: html.style.overflow,
      htmlOverscrollBehavior: html.style.overscrollBehavior,
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyLeft: body.style.left,
      bodyRight: body.style.right,
      bodyWidth: body.style.width,
      bodyPaddingRight: body.style.paddingRight
    };

    const scrollbarWidth = Math.max(
      0,
      window.innerWidth - html.clientWidth
    );

    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";

    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    /*
     * Focus the dialog itself instead of the first link.
     * Focusing the first link could cause the menu to auto-scroll.
     */
    const focusFrame = window.requestAnimationFrame(() => {
      menuDialogRef.current?.focus({
        preventScroll: true
      });
    });

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        return;
      }

      if (
        event.key !== "Tab" ||
        !menuDialogRef.current
      ) {
        return;
      }

      const focusableElements = Array.from(
        menuDialogRef.current.querySelectorAll<HTMLElement>(
          [
            'a[href]',
            'button:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            '[tabindex]:not([tabindex="-1"])'
          ].join(",")
        )
      ).filter(
        (element) =>
          !element.hasAttribute("disabled") &&
          element.getAttribute("aria-hidden") !== "true"
      );

      if (focusableElements.length === 0) {
        event.preventDefault();
        menuDialogRef.current.focus({
          preventScroll: true
        });
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement =
        focusableElements[focusableElements.length - 1] ??
        firstElement;

      if (
        event.shiftKey &&
        document.activeElement === firstElement
      ) {
        event.preventDefault();
        lastElement.focus({
          preventScroll: true
        });
      } else if (
        !event.shiftKey &&
        document.activeElement === lastElement
      ) {
        event.preventDefault();
        firstElement.focus({
          preventScroll: true
        });
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);

      html.style.overflow = previousStyles.htmlOverflow;
      html.style.overscrollBehavior =
        previousStyles.htmlOverscrollBehavior;

      body.style.overflow = previousStyles.bodyOverflow;
      body.style.position = previousStyles.bodyPosition;
      body.style.top = previousStyles.bodyTop;
      body.style.left = previousStyles.bodyLeft;
      body.style.right = previousStyles.bodyRight;
      body.style.width = previousStyles.bodyWidth;
      body.style.paddingRight =
        previousStyles.bodyPaddingRight;

      window.scrollTo(0, scrollY);

      const focusTarget =
        previouslyFocused?.isConnected &&
        previouslyFocused !== document.body
          ? previouslyFocused
          : menuButtonRef.current;

      focusTarget?.focus({
        preventScroll: true
      });
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  function toggleMenu() {
    setMenuOpen((current) => !current);
  }

  function isActiveLink(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  }

  return (
    <>
      {/* Persistent transparent navigation bar */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[100] bg-transparent">
        <div className="mx-auto flex h-24 w-full max-w-[1920px] items-center justify-between px-5 sm:px-8 lg:px-12">
          {/* Logo */}
          <motion.div
            className="pointer-events-auto relative z-10"
            animate={{
              opacity: menuOpen ? 0.86 : 1
            }}
            transition={{
              duration: 0.25,
              ease: "easeOut"
            }}
          >
            <Logo />
          </motion.div>

          {/* Menu trigger */}
          <button
            ref={menuButtonRef}
            type="button"
            aria-label={
              menuOpen
                ? "Close navigation"
                : "Open navigation"
            }
            aria-expanded={menuOpen}
            aria-controls="gridspell-menu"
            aria-haspopup="dialog"
            onClick={toggleMenu}
            className={[
              "pointer-events-auto group relative z-10 flex h-14 w-[8.5rem] items-center justify-center overflow-hidden rounded-full border",
              "transition-[border-color,background-color,box-shadow] duration-300",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8be9ff]/80",
              "focus-visible:ring-offset-2 focus-visible:ring-offset-[#07080c]",
              "sm:w-[9rem]",
              menuOpen
                ? "border-[#8be9ff]/30 bg-[#090c12]/92 text-white shadow-[0_18px_70px_rgba(0,0,0,0.42)] backdrop-blur-2xl hover:border-[#8be9ff]/50 hover:bg-[#10141d]"
                : "border-white/[0.13] bg-black/10 text-white shadow-[0_16px_50px_rgba(0,0,0,0.12)] backdrop-blur-md hover:border-white/25 hover:bg-black/25"
            ].join(" ")}
          >
            <span
              aria-hidden="true"
              className={[
                "pointer-events-none absolute inset-0 transition-opacity duration-300",
                menuOpen
                  ? "bg-[radial-gradient(circle_at_80%_50%,rgba(41,214,255,0.11),transparent_45%)] opacity-100"
                  : "opacity-0"
              ].join(" ")}
            />

            <span className="relative flex h-full w-full items-center justify-between gap-3 px-5">
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em]">
                {menuOpen ? "Close" : "Menu"}
              </span>

              <span className="relative grid h-7 w-7 shrink-0 place-items-center">
                <AnimatePresence
                  initial={false}
                  mode="wait"
                >
                  {menuOpen ? (
                    <motion.span
                      key="close-icon"
                      initial={{
                        opacity: 0,
                        rotate: -45,
                        scale: 0.85
                      }}
                      animate={{
                        opacity: 1,
                        rotate: 0,
                        scale: 1
                      }}
                      exit={{
                        opacity: 0,
                        rotate: 45,
                        scale: 0.85
                      }}
                      transition={{
                        duration: 0.2
                      }}
                      className="absolute inset-0 grid place-items-center"
                    >
                      <X className="h-4 w-4 text-[#8be9ff]" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu-icon"
                      initial={{
                        opacity: 0,
                        scale: 0.9
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.9
                      }}
                      transition={{
                        duration: 0.18
                      }}
                      className="relative block h-3.5 w-5"
                    >
                      <span className="absolute left-0 top-0 h-px w-5 bg-current transition-transform duration-300 group-hover:translate-x-1" />
                      <span className="absolute right-0 top-1/2 h-px w-3.5 -translate-y-1/2 bg-current transition-all duration-300 group-hover:w-5" />
                      <span className="absolute bottom-0 left-0 h-px w-5 bg-current transition-transform duration-300 group-hover:-translate-x-1" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
            </span>

            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-5 bottom-0 h-px bg-gradient-to-r from-transparent via-[#8be9ff]/70 to-transparent"
              animate={{
                opacity: menuOpen ? 1 : 0,
                scaleX: menuOpen ? 1 : 0.35
              }}
              transition={{
                duration: 0.3
              }}
            />
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
            tabIndex={-1}
            initial={
              compactMenu
                ? {
                    opacity: 0,
                    y: -10,
                    scale: 0.995
                  }
                : {
                    clipPath:
                      "circle(0% at calc(100% - 5rem) 3rem)"
                  }
            }
            animate={
              compactMenu
                ? {
                    opacity: 1,
                    y: 0,
                    scale: 1
                  }
                : {
                    clipPath:
                      "circle(160% at calc(100% - 5rem) 3rem)"
                  }
            }
            exit={
              compactMenu
                ? {
                    opacity: 0,
                    y: -8,
                    scale: 0.995
                  }
                : {
                    clipPath:
                      "circle(0% at calc(100% - 5rem) 3rem)"
                  }
            }
            transition={
              compactMenu
                ? compactRevealTransition
                : desktopRevealTransition
            }
            className={[
              "fixed inset-0 z-[90] h-[100dvh] overflow-y-auto overscroll-contain bg-[#07080c] text-white",
              "touch-pan-y transform-gpu focus:outline-none",
              "[-webkit-overflow-scrolling:touch]",
              compactMenu
                ? "[will-change:opacity,transform]"
                : "[will-change:clip-path]"
            ].join(" ")}
          >
            {/* Technical grid */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-45 sm:opacity-60"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
                backgroundSize: compactMenu
                  ? "52px 52px"
                  : "72px 72px"
              }}
            />

            {/* Dark top fade */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#07080c] via-[#07080c]/80 to-transparent sm:h-40"
            />

            {/* Cyan ambience */}
            <motion.div
              aria-hidden="true"
              initial={{
                opacity: 0,
                scale: 0.9
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}
              exit={{
                opacity: 0
              }}
              transition={{
                delay: compactMenu ? 0.04 : 0.16,
                duration: compactMenu ? 0.45 : 0.9
              }}
              className={[
                "pointer-events-none absolute rounded-full bg-[#29d6ff]/10",
                compactMenu
                  ? "-right-28 top-12 h-80 w-80 blur-[90px]"
                  : "-right-48 top-4 h-[42rem] w-[42rem] bg-[#29d6ff]/12 blur-[150px]"
              ].join(" ")}
            />

            {/* Violet ambience */}
            <motion.div
              aria-hidden="true"
              initial={{
                opacity: 0,
                scale: 0.9
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}
              exit={{
                opacity: 0
              }}
              transition={{
                delay: compactMenu ? 0.02 : 0.1,
                duration: compactMenu ? 0.45 : 0.9
              }}
              className={[
                "pointer-events-none absolute rounded-full bg-[#7c5cff]/13",
                compactMenu
                  ? "-bottom-40 left-[-5rem] h-80 w-80 blur-[95px]"
                  : "-bottom-72 left-[15%] h-[46rem] w-[46rem] bg-[#7c5cff]/17 blur-[160px]"
              ].join(" ")}
            />

            <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-[1920px] flex-col px-5 pb-7 pt-28 sm:px-8 sm:pb-8 sm:pt-32 lg:px-12 lg:pb-12">
              <div className="grid flex-1 gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(20rem,0.6fr)] lg:gap-20">
                {/* Main navigation */}
                <nav
                  className="flex flex-col justify-center"
                  aria-label="Main navigation"
                >
                  <motion.p
                    initial={{
                      opacity: 0,
                      y: 14
                    }}
                    animate={{
                      opacity: 1,
                      y: 0
                    }}
                    exit={{
                      opacity: 0
                    }}
                    transition={{
                      delay: compactMenu ? 0.08 : 0.23,
                      duration: 0.4
                    }}
                    className="mb-6 text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-[#8be9ff] sm:mb-7 sm:text-[0.65rem] sm:tracking-[0.34em]"
                  >
                    Navigate GridSpell
                  </motion.p>

                  <div className="border-t border-white/[0.1]">
                    {marketingNavigation.map(
                      (item, index) => {
                        const active = isActiveLink(
                          item.href
                        );

                        return (
                          <motion.div
                            key={item.href}
                            initial={{
                              opacity: 0,
                              y: compactMenu ? 18 : 34
                            }}
                            animate={{
                              opacity: 1,
                              y: 0
                            }}
                            exit={{
                              opacity: 0,
                              y: compactMenu ? 8 : 18
                            }}
                            transition={{
                              delay: compactMenu
                                ? 0.08 + index * 0.035
                                : 0.24 + index * 0.055,
                              duration: compactMenu
                                ? 0.34
                                : 0.5,
                              ease: [
                                0.22,
                                1,
                                0.36,
                                1
                              ]
                            }}
                          >
                            <Link
                              href={item.href}
                              onClick={closeMenu}
                              aria-current={
                                active
                                  ? "page"
                                  : undefined
                              }
                              className="group relative flex items-center justify-between overflow-hidden border-b border-white/[0.1] py-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#8be9ff]/70 sm:py-5 lg:py-6"
                            >
                              <span
                                aria-hidden="true"
                                className="absolute inset-0 origin-left scale-x-0 bg-white/[0.035] transition-transform duration-500 ease-out group-hover:scale-x-100"
                              />

                              <span
                                aria-hidden="true"
                                className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-[#7c5cff] to-[#29d6ff] transition-all duration-500 group-hover:w-full"
                              />

                              <span className="relative flex min-w-0 items-start gap-3 sm:gap-7">
                                <span
                                  className={[
                                    "mt-1.5 shrink-0 font-mono text-[0.54rem] tracking-[0.16em] transition-colors duration-300 sm:mt-3 sm:text-[0.58rem] sm:tracking-[0.18em]",
                                    active
                                      ? "text-[#8be9ff]"
                                      : "text-white/24 group-hover:text-[#8be9ff]"
                                  ].join(" ")}
                                >
                                  {String(
                                    index + 1
                                  ).padStart(2, "0")}
                                </span>

                                <span
                                  className={[
                                    "min-w-0 font-display text-[clamp(2.05rem,10vw,4.5rem)] font-semibold leading-[0.88] tracking-[-0.065em] transition-[color,transform] duration-500 lg:text-[clamp(2.2rem,6.3vw,6.8rem)] lg:leading-[0.86] lg:tracking-[-0.07em]",
                                    active
                                      ? "translate-x-1.5 text-white sm:translate-x-2"
                                      : "text-white/54 group-hover:translate-x-1.5 group-hover:text-white sm:group-hover:translate-x-2"
                                  ].join(" ")}
                                >
                                  {item.label}
                                </span>
                              </span>

                              <span className="relative mr-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/[0.1] text-white/32 transition-all duration-500 group-hover:rotate-[-45deg] group-hover:border-[#8be9ff]/40 group-hover:bg-[#8be9ff]/10 group-hover:text-[#8be9ff] sm:h-14 sm:w-14">
                                <ArrowDownRight className="h-4 w-4 sm:h-5 sm:w-5" />
                              </span>
                            </Link>
                          </motion.div>
                        );
                      }
                    )}
                  </div>
                </nav>

                {/* Project and account panel */}
                <motion.aside
                  initial={
                    compactMenu
                      ? {
                          opacity: 0,
                          y: 18
                        }
                      : {
                          opacity: 0,
                          x: 45
                        }
                  }
                  animate={
                    compactMenu
                      ? {
                          opacity: 1,
                          y: 0
                        }
                      : {
                          opacity: 1,
                          x: 0
                        }
                  }
                  exit={
                    compactMenu
                      ? {
                          opacity: 0,
                          y: 10
                        }
                      : {
                          opacity: 0,
                          x: 25
                        }
                  }
                  transition={{
                    delay: compactMenu ? 0.2 : 0.45,
                    duration: compactMenu ? 0.4 : 0.6,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="flex flex-col justify-end lg:border-l lg:border-white/[0.1] lg:pl-10 xl:pl-14"
                >
                  <div className="relative overflow-hidden rounded-[1.6rem] border border-white/[0.1] bg-white/[0.025] p-5 backdrop-blur-sm sm:rounded-[2rem] sm:p-8">
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#29d6ff]/9 blur-3xl"
                    />

                    <div className="relative">
                      <div className="mb-7 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-center sm:justify-between">
                        <span className="text-[0.58rem] font-semibold uppercase tracking-[0.25em] text-white/34 sm:text-[0.62rem] sm:tracking-[0.28em]">
                          Studio status
                        </span>

                        <span className="flex items-center gap-2 text-[0.7rem] text-[#8be9ff] sm:text-xs">
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#29d6ff] opacity-60" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#29d6ff]" />
                          </span>

                          Available for select projects
                        </span>
                      </div>

                      <p className="max-w-md font-display text-2xl font-semibold leading-[1.05] tracking-[-0.05em] sm:text-4xl">
                        Have a business worth presenting
                        properly?
                      </p>

                      <p className="mt-4 max-w-sm text-sm leading-7 text-white/43 sm:mt-5">
                        Let&apos;s turn the strategy,
                        interface, and technology into one
                        clear digital experience.
                      </p>

                      <Link
                        href="/start-project"
                        onClick={closeMenu}
                        className="group mt-7 flex min-h-14 items-center justify-between overflow-hidden rounded-full border border-white/[0.14] bg-white px-5 text-sm font-semibold text-[#08090d] transition-transform duration-300 hover:scale-[1.015] sm:mt-8"
                      >
                        <span>Start a project</span>

                        <span className="grid h-9 w-9 place-items-center rounded-full bg-[#090a0f] text-white transition-transform duration-300 group-hover:rotate-45">
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      </Link>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 sm:mt-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
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
                initial={{
                  opacity: 0,
                  y: 14
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                exit={{
                  opacity: 0
                }}
                transition={{
                  delay: compactMenu ? 0.28 : 0.62,
                  duration: 0.45
                }}
                className="mt-10 flex flex-col gap-3 border-t border-white/[0.1] pt-5 text-[0.56rem] uppercase tracking-[0.2em] text-white/28 sm:mt-12 sm:flex-row sm:items-center sm:justify-between sm:text-[0.62rem] sm:tracking-[0.24em]"
              >
                <span>
                  Toronto · Canada · Working worldwide
                </span>

                <span>
                  Built on structure. Designed to captivate.
                </span>
              </motion.footer>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}