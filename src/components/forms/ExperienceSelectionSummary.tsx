"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useSearchParams } from "next/navigation";

import {
  backgroundOptions,
  buttonEffects,
  experiencePalettes,
  experienceScenes,
  motionOptions
} from "@/config/experience-lab";

export function ExperienceSelectionSummary() {
  const searchParams = useSearchParams();
  const scene = experienceScenes.find((item) => item.id === searchParams.get("scene"));
  const palette = experiencePalettes.find((item) => item.id === searchParams.get("palette"));
  const button = buttonEffects.find((item) => item.id === searchParams.get("button"));
  const background = backgroundOptions.find(
    (item) => item.id === searchParams.get("background")
  );
  const motion = motionOptions.find((item) => item.id === searchParams.get("motion"));

  if (!scene || !palette || !button || !background || !motion) {
    return null;
  }

  const workParams = new URLSearchParams({
    scene: scene.id,
    palette: palette.id,
    button: button.id,
    background: background.id,
    motion: motion.id
  });

  return (
    <div className="rounded-[2rem] border border-[#8be9ff]/20 bg-[radial-gradient(circle_at_90%_0%,rgba(41,214,255,0.1),transparent_18rem),rgba(11,13,19,0.9)] p-6 sm:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-[#8be9ff]/20 bg-[#8be9ff]/7">
              <Sparkles className="h-4 w-4 text-[#8be9ff]" />
            </span>
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-[#8be9ff]">
              Experience Lab selection
            </p>
          </div>

          <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.05em] text-white">
            {scene.label} · {palette.label}
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/44">
            GridSpell will use this as creative context during discovery—not as a fixed template.
          </p>
        </div>

        <Link
          href={`/work?${workParams.toString()}`}
          className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.035] px-4 text-xs font-semibold text-white/54 transition hover:border-white/20 hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Adjust direction
        </Link>
      </div>

      <dl className="mt-6 grid gap-3 border-t border-white/[0.08] pt-6 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/[0.07] bg-black/15 p-4">
          <dt className="text-[0.55rem] uppercase tracking-[0.18em] text-white/25">Button</dt>
          <dd className="mt-2 text-sm font-semibold text-white/68">{button.label}</dd>
        </div>
        <div className="rounded-2xl border border-white/[0.07] bg-black/15 p-4">
          <dt className="text-[0.55rem] uppercase tracking-[0.18em] text-white/25">Atmosphere</dt>
          <dd className="mt-2 text-sm font-semibold text-white/68">{background.label}</dd>
        </div>
        <div className="rounded-2xl border border-white/[0.07] bg-black/15 p-4">
          <dt className="text-[0.55rem] uppercase tracking-[0.18em] text-white/25">Motion</dt>
          <dd className="mt-2 text-sm font-semibold text-white/68">{motion.label}</dd>
        </div>
      </dl>
    </div>
  );
}
