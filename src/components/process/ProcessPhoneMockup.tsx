"use client";

import {
  Check,
  Clock3,
  Files,
  MessageSquareText,
  ShieldCheck
} from "lucide-react";

const phases = [
  { label: "Discovery", done: true },
  { label: "Strategy", done: true },
  { label: "Design", done: false, active: true },
  { label: "Build", done: false },
  { label: "Launch", done: false }
];

function PhoneShellSvg() {
  return (
    <svg
      viewBox="0 0 430 860"
      className="absolute inset-0 h-full w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="phoneStroke" x1="40" y1="30" x2="380" y2="820">
          <stop offset="0%" stopColor="rgba(167, 139, 250, 0.95)" />
          <stop offset="55%" stopColor="rgba(99, 102, 241, 0.85)" />
          <stop offset="100%" stopColor="rgba(34, 211, 238, 0.9)" />
        </linearGradient>

        <radialGradient id="phoneGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(320 110) rotate(120) scale(360 300)">
          <stop offset="0%" stopColor="rgba(124, 92, 255, 0.35)" />
          <stop offset="100%" stopColor="rgba(124, 92, 255, 0)" />
        </radialGradient>

        <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>

      <rect x="30" y="20" width="370" height="820" rx="54" fill="url(#phoneGlow)" filter="url(#softGlow)" />
      <rect
        x="36"
        y="26"
        width="358"
        height="808"
        rx="48"
        fill="#080A0F"
        stroke="url(#phoneStroke)"
        strokeWidth="2.2"
      />

      <rect x="140" y="48" width="150" height="28" rx="14" fill="#0E1119" stroke="rgba(255,255,255,0.08)" />
      <circle cx="214" cy="62" r="4" fill="rgba(255,255,255,0.18)" />
      <circle cx="226" cy="62" r="4" fill="rgba(255,255,255,0.12)" />

      {/* Side buttons */}
      <rect x="28" y="150" width="5" height="54" rx="2.5" fill="rgba(255,255,255,0.12)" />
      <rect x="28" y="220" width="5" height="82" rx="2.5" fill="rgba(255,255,255,0.12)" />
      <rect x="397" y="186" width="5" height="94" rx="2.5" fill="rgba(255,255,255,0.12)" />
    </svg>
  );
}

export function ProcessPhoneMockup() {
  return (
    <div className="mx-auto w-full max-w-[320px]">
      <div className="relative aspect-[430/860]">
        <PhoneShellSvg />

        <div className="absolute inset-[4.1%_7.2%_4.4%_7.2%] overflow-hidden rounded-[2.2rem] bg-[#07090f]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,92,255,0.14),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.08),transparent_35%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:22px_22px]" />

          <div className="relative z-10 flex h-full flex-col px-4 pb-4 pt-5 text-white">
            {/* Top header */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[0.52rem] font-semibold uppercase tracking-[0.22em] text-[#8be9ff]">
                  Client Portal
                </p>
                <h3 className="mt-2 text-sm font-semibold text-white">
                  Northstar website rebuild
                </h3>
                <p className="mt-1 text-[0.66rem] text-white/42">
                  Live project view
                </p>
              </div>

              <span className="rounded-full border border-[#69e6ad]/20 bg-[#69e6ad]/10 px-2.5 py-1 text-[0.54rem] font-semibold uppercase tracking-[0.14em] text-[#7aefb9]">
                On track
              </span>
            </div>

            {/* Progress */}
            <div className="mt-5 rounded-[1.25rem] border border-white/[0.08] bg-white/[0.03] p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <p className="text-[0.52rem] uppercase tracking-[0.18em] text-white/28">
                  Project progress
                </p>
                <p className="text-sm font-semibold text-white">64%</p>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                <div className="h-full w-[64%] rounded-full bg-gradient-to-r from-[#7c5cff] to-[#29d6ff]" />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/[0.07] bg-black/20 p-3">
                  <p className="text-[0.48rem] uppercase tracking-[0.15em] text-white/24">
                    Current phase
                  </p>
                  <p className="mt-2 text-xs font-medium text-white/68">Design</p>
                </div>

                <div className="rounded-xl border border-white/[0.07] bg-black/20 p-3">
                  <p className="text-[0.48rem] uppercase tracking-[0.15em] text-white/24">
                    Next milestone
                  </p>
                  <p className="mt-2 text-xs font-medium text-white/68">Review</p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="mt-5 rounded-[1.25rem] border border-white/[0.08] bg-white/[0.03] p-4">
              <p className="text-[0.52rem] uppercase tracking-[0.18em] text-white/28">
                Delivery path
              </p>

              <div className="mt-4 flex items-start justify-between gap-2">
                {phases.map((phase) => (
                  <div key={phase.label} className="flex flex-1 flex-col items-center text-center">
                    <div
                      className={[
                        "grid h-8 w-8 place-items-center rounded-full border text-[0.58rem]",
                        phase.done
                          ? "border-[#69e6ad]/25 bg-[#69e6ad]/10 text-[#7aefb9]"
                          : phase.active
                          ? "border-[#8be9ff]/25 bg-[#8be9ff]/10 text-[#8be9ff]"
                          : "border-white/[0.08] bg-white/[0.03] text-white/22"
                      ].join(" ")}
                    >
                      {phase.done ? <Check className="h-3.5 w-3.5" /> : phase.label[0]}
                    </div>

                    <p
                      className={[
                        "mt-2 text-[0.58rem]",
                        phase.active
                          ? "text-white/72"
                          : phase.done
                          ? "text-white/56"
                          : "text-white/28"
                      ].join(" ")}
                    >
                      {phase.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Info cards */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-[1.1rem] border border-white/[0.08] bg-white/[0.03] p-3">
                <div className="flex items-center gap-2 text-[#8be9ff]">
                  <Clock3 className="h-4 w-4" />
                  <span className="text-[0.48rem] uppercase tracking-[0.16em] text-white/28">
                    Target launch
                  </span>
                </div>
                <p className="mt-3 text-sm font-semibold text-white">Aug 23</p>
                <p className="mt-1 text-[0.66rem] text-white/36">8 weeks total</p>
              </div>

              <div className="rounded-[1.1rem] border border-white/[0.08] bg-white/[0.03] p-3">
                <div className="flex items-center gap-2 text-[#8be9ff]">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="text-[0.48rem] uppercase tracking-[0.16em] text-white/28">
                    Open actions
                  </span>
                </div>
                <p className="mt-3 text-sm font-semibold text-white">2 items</p>
                <p className="mt-1 text-[0.66rem] text-white/36">Nothing overdue</p>
              </div>
            </div>

            {/* Bottom activity */}
            <div className="mt-5 rounded-[1.25rem] border border-white/[0.08] bg-white/[0.03] p-4">
              <div className="flex items-center gap-2">
                <MessageSquareText className="h-4 w-4 text-[#8be9ff]" />
                <p className="text-[0.52rem] uppercase tracking-[0.18em] text-white/28">
                  Latest update
                </p>
              </div>

              <p className="mt-3 text-xs font-medium text-white/70">
                Homepage direction is ready
              </p>
              <p className="mt-2 text-[0.68rem] leading-5 text-white/38">
                Version 3 includes the revised service hierarchy and improved mobile navigation.
              </p>
            </div>

            {/* Bottom nav */}
            <div className="mt-auto pt-4">
              <div className="grid grid-cols-3 gap-2 rounded-[1rem] border border-white/[0.08] bg-black/20 p-2">
                <div className="rounded-[0.8rem] border border-[#8be9ff]/20 bg-[#8be9ff]/10 px-3 py-2 text-center">
                  <p className="text-[0.58rem] font-medium text-white">Overview</p>
                </div>
                <div className="rounded-[0.8rem] px-3 py-2 text-center">
                  <p className="text-[0.58rem] text-white/34">Files</p>
                </div>
                <div className="rounded-[0.8rem] px-3 py-2 text-center">
                  <p className="text-[0.58rem] text-white/34">Messages</p>
                </div>
              </div>

              <div className="mt-3 flex justify-center">
                <div className="h-1.5 w-24 rounded-full bg-white/15" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}