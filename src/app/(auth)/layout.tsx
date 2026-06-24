import type { ReactNode } from "react";
import Link from "next/link";
import { BadgeCheck, Files, FolderKanban, Sparkles } from "lucide-react";
import { Logo } from "@/components/layout/Logo";

const benefits = [
  {
    icon: FolderKanban,
    title: "Project clarity",
    text: "See the current phase, milestones, responsibilities, and what happens next."
  },
  {
    icon: BadgeCheck,
    title: "Approvals in context",
    text: "Review deliverables and keep decisions connected to the actual work."
  },
  {
    icon: Files,
    title: "One source of truth",
    text: "Keep project files, requests, messages, and billing in one secure workspace."
  }
];

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07080c] px-5 py-8 sm:px-7 lg:grid lg:place-items-center lg:py-12">
      <div className="page-grid fixed inset-0 -z-20 opacity-38" />
      <div className="fixed left-[18%] top-[16%] -z-10 h-[30rem] w-[30rem] rounded-full bg-[#7c5cff]/12 blur-[140px]" />
      <div className="fixed bottom-[4%] right-[10%] -z-10 h-[26rem] w-[26rem] rounded-full bg-[#29d6ff]/7 blur-[140px]" />

      <div className="mx-auto grid w-full max-w-[1180px] overflow-hidden rounded-[2.25rem] border border-white/[0.09] bg-[#0b0d13]/90 shadow-[0_32px_120px_rgba(0,0,0,0.46)] backdrop-blur-2xl lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative overflow-hidden border-b border-white/[0.08] p-7 sm:p-10 lg:border-b-0 lg:border-r lg:p-14">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_15%,rgba(124,92,255,.22),transparent_19rem),radial-gradient(circle_at_90%_85%,rgba(41,214,255,.10),transparent_20rem)]" />
          <Logo />

          <div className="mt-14 max-w-xl lg:mt-24">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white/48">
              <Sparkles className="h-3.5 w-3.5 text-[#8be9ff]" />
              Secure GridSpell client workspace
            </div>
            <h1 className="mt-7 font-display text-4xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl">
              The premium experience continues after the sale.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-white/44">
              Clients receive a focused workspace for progress, approvals, content,
              project communication, and billing.
            </p>
          </div>

          <div className="mt-12 grid gap-3">
            {benefits.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="grid grid-cols-[44px_1fr] gap-4 rounded-[1.35rem] border border-white/[0.075] bg-black/10 p-4"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.04]">
                  <Icon className="h-5 w-5 text-[#8be9ff]" />
                </span>
                <div>
                  <h2 className="text-sm font-semibold text-white">{title}</h2>
                  <p className="mt-1 text-xs leading-6 text-white/36">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="flex min-h-[660px] items-center p-6 sm:p-10 lg:p-14">
          <div className="w-full">
            {children}
            <Link
              href="/"
              className="mt-8 inline-flex text-sm text-white/34 transition-colors hover:text-white"
            >
              ← Return to GridSpell
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
