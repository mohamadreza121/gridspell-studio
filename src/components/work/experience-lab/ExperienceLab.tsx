"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Copy,
  MousePointer2,
  Palette,
  Shuffle,
  Sparkles,
  WandSparkles
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion
} from "motion/react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent
} from "react";

import { trackAnalyticsEvent } from "@/components/analytics/GoogleAnalytics";
import { Container } from "@/components/ui/Container";
import {
  approvedExperienceCombinations,
  backgroundOptions,
  buttonEffects,
  defaultExperienceConfiguration,
  experiencePalettes,
  experienceScenes,
  motionOptions
} from "@/config/experience-lab";
import { cn } from "@/lib/utils";
import type {
  ExperienceBackground,
  ExperienceButtonEffect,
  ExperienceConfiguration,
  ExperienceMotionLevel,
  ExperiencePalette,
  ExperiencePaletteId,
  ExperienceScene,
  ExperienceSceneId
} from "@/types/experience-lab";

const sceneIds = new Set(experienceScenes.map((scene) => scene.id));
const paletteIds = new Set(experiencePalettes.map((palette) => palette.id));
const buttonEffectIds = new Set(buttonEffects.map((effect) => effect.id));
const backgroundIds = new Set(backgroundOptions.map((background) => background.id));
const motionIds = new Set(motionOptions.map((option) => option.id));

const motionProfiles: Record<
  ExperienceMotionLevel,
  { distance: number; duration: number; intensity: number }
> = {
  calm: { distance: 8, duration: 10, intensity: 0.55 },
  balanced: { distance: 16, duration: 7, intensity: 0.85 },
  expressive: { distance: 28, duration: 4.5, intensity: 1.2 }
};

function getConfigurationFromUrl(): ExperienceConfiguration | null {
  if (typeof window === "undefined") return null;

  const params = new URLSearchParams(window.location.search);
  const scene = params.get("scene");
  const palette = params.get("palette");
  const buttonEffect = params.get("button");
  const background = params.get("background");
  const motion = params.get("motion");

  if (
    !scene ||
    !palette ||
    !buttonEffect ||
    !background ||
    !motion ||
    !sceneIds.has(scene as ExperienceSceneId) ||
    !paletteIds.has(palette as ExperiencePaletteId) ||
    !buttonEffectIds.has(buttonEffect as ExperienceButtonEffect) ||
    !backgroundIds.has(background as ExperienceBackground) ||
    !motionIds.has(motion as ExperienceMotionLevel)
  ) {
    return null;
  }

  return {
    scene: scene as ExperienceSceneId,
    palette: palette as ExperiencePaletteId,
    buttonEffect: buttonEffect as ExperienceButtonEffect,
    background: background as ExperienceBackground,
    motion: motion as ExperienceMotionLevel
  };
}

function buildExperienceParams(configuration: ExperienceConfiguration) {
  const params = new URLSearchParams();
  params.set("scene", configuration.scene);
  params.set("palette", configuration.palette);
  params.set("button", configuration.buttonEffect);
  params.set("background", configuration.background);
  params.set("motion", configuration.motion);
  return params;
}

function trackSelection(
  eventName: string,
  value: string,
  configuration: ExperienceConfiguration
) {
  trackAnalyticsEvent(eventName, {
    selected_value: value,
    experience_scene: configuration.scene
  });
}

function LabBackground({
  kind,
  palette,
  motionLevel,
  active
}: {
  kind: ExperienceBackground;
  palette: ExperiencePalette;
  motionLevel: ExperienceMotionLevel;
  active: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const profile = motionProfiles[motionLevel];
  const animate = active && !reduceMotion;

  if (kind === "grid") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-55"
          style={{
            backgroundImage: `linear-gradient(${palette.accentSoft} 1px, transparent 1px), linear-gradient(90deg, ${palette.accentSoft} 1px, transparent 1px)`,
            backgroundSize: "42px 42px",
            maskImage: "linear-gradient(to bottom, black, transparent 92%)"
          }}
        />
        <motion.div
          className="absolute left-[-20%] top-[34%] h-px w-[140%]"
          style={{ background: `linear-gradient(90deg, transparent, ${palette.accent}, transparent)` }}
          animate={animate ? { y: [-90, 210, -90], opacity: [0, 0.7, 0] } : undefined}
          transition={{ duration: profile.duration, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (kind === "glass") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[
          { left: "7%", top: "16%", rotate: -12, size: 150 },
          { left: "74%", top: "10%", rotate: 16, size: 180 },
          { left: "68%", top: "68%", rotate: -8, size: 130 }
        ].map((item, index) => (
          <motion.div
            key={`${item.left}-${item.top}`}
            className="absolute rounded-[2rem] border border-white/15 bg-white/[0.045] shadow-2xl backdrop-blur-xl"
            style={{
              left: item.left,
              top: item.top,
              width: item.size,
              height: item.size * 0.66,
              rotate: item.rotate
            }}
            animate={
              animate
                ? {
                    y: [-profile.distance, profile.distance, -profile.distance],
                    rotate: [item.rotate, item.rotate + (index % 2 ? 7 : -7), item.rotate]
                  }
                : undefined
            }
            transition={{
              duration: profile.duration + index * 1.4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    );
  }

  if (kind === "particles") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 14 }).map((_, index) => {
          const left = `${8 + ((index * 19) % 86)}%`;
          const top = `${10 + ((index * 29) % 78)}%`;
          const size = 3 + (index % 4) * 1.5;

          return (
            <motion.span
              key={`${left}-${top}`}
              className="absolute rounded-full"
              style={{
                left,
                top,
                width: size,
                height: size,
                background: index % 3 === 0 ? palette.accent : "rgba(255,255,255,0.42)",
                boxShadow:
                  index % 3 === 0 ? `0 0 18px ${palette.accent}` : undefined
              }}
              animate={
                animate
                  ? {
                      y: [0, -profile.distance * (0.5 + (index % 3) * 0.25), 0],
                      opacity: [0.24, 0.9, 0.24],
                      scale: [0.8, 1.25, 0.8]
                    }
                  : undefined
              }
              transition={{
                duration: profile.duration + (index % 5),
                repeat: Infinity,
                delay: index * 0.12,
                ease: "easeInOut"
              }}
            />
          );
        })}
      </div>
    );
  }

  if (kind === "rings") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="absolute left-1/2 top-1/2 rounded-full border"
            style={{
              width: `${42 + index * 18}%`,
              aspectRatio: "1",
              borderColor: index === 0 ? palette.accentSoft : "rgba(255,255,255,0.08)",
              x: "-50%",
              y: "-50%",
              rotateX: 68,
              rotateZ: index * 23
            }}
            animate={animate ? { rotateZ: [index * 23, index * 23 + 360] } : undefined}
            transition={{
              duration: profile.duration * (2.8 + index),
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -left-[16%] -top-[28%] h-[78%] w-[72%] rounded-full blur-[90px]"
        style={{ background: palette.accentSoft }}
        animate={
          animate
            ? {
                x: [-profile.distance, profile.distance, -profile.distance],
                y: [0, profile.distance * 0.7, 0],
                scale: [0.95, 1.08, 0.95]
              }
            : undefined
        }
        transition={{ duration: profile.duration * 1.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-[35%] right-[-14%] h-[82%] w-[74%] rounded-full blur-[110px]"
        style={{ background: `color-mix(in srgb, ${palette.accentDeep} 55%, transparent)` }}
        animate={
          animate
            ? {
                x: [profile.distance, -profile.distance, profile.distance],
                y: [0, -profile.distance, 0],
                scale: [1.05, 0.94, 1.05]
              }
            : undefined
        }
        transition={{ duration: profile.duration * 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function PreviewButton({
  effect,
  palette,
  children
}: {
  effect: ExperienceButtonEffect;
  palette: ExperiencePalette;
  children: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function handlePointerMove(event: PointerEvent<HTMLButtonElement>) {
    if (effect !== "magnetic" || reduceMotion || event.pointerType === "touch") return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    setOffset({ x: x * 0.16, y: y * 0.16 });
  }

  const effectClasses = {
    magnetic: "hover:shadow-[0_18px_55px_rgba(0,0,0,0.28)]",
    sweep:
      "before:absolute before:inset-0 before:-translate-x-[110%] before:bg-white/22 before:transition-transform before:duration-500 hover:before:translate-x-0",
    glow:
      "after:absolute after:inset-[-40%] after:rounded-full after:opacity-0 after:blur-2xl after:transition-opacity after:duration-300 hover:after:opacity-60",
    arrow: ""
  }[effect];

  return (
    <motion.button
      type="button"
      className={cn(
        "group relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-5 text-sm font-semibold",
        effectClasses
      )}
      style={{
        background: palette.accent,
        color: palette.surface,
        x: offset.x,
        y: offset.y
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setOffset({ x: 0, y: 0 })}
      onPointerDown={() => setOffset({ x: 0, y: 1 })}
      onPointerUp={() => setOffset({ x: 0, y: 0 })}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      {effect === "glow" ? (
        <span
          aria-hidden="true"
          className="absolute inset-[-45%] -z-0 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-70"
          style={{ background: palette.accent }}
        />
      ) : null}
      <span className="relative z-10">{children}</span>
      <ArrowRight
        className={cn(
          "relative z-10 h-4 w-4 transition-transform duration-300",
          effect === "arrow"
            ? "group-hover:-translate-y-0.5 group-hover:translate-x-1.5"
            : "group-hover:translate-x-0.5"
        )}
      />
    </motion.button>
  );
}

function SceneArtwork({
  scene,
  palette,
  motionLevel,
  active
}: {
  scene: ExperienceScene;
  palette: ExperiencePalette;
  motionLevel: ExperienceMotionLevel;
  active: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const profile = motionProfiles[motionLevel];
  const animate = active && !reduceMotion;

  if (scene.id === "luxury") {
    return (
      <div className="relative min-h-[250px] overflow-hidden rounded-[1.4rem] border border-white/10 bg-black/20 sm:min-h-[330px]">
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 text-[0.58rem] uppercase tracking-[0.24em] text-white/38">
          <span>Edition 01</span>
          <span>Private collection</span>
        </div>
        <motion.div
          className="absolute left-1/2 top-1/2 aspect-square w-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15"
          style={{
            background: `radial-gradient(circle at 34% 28%, rgba(255,255,255,0.5), ${palette.accentSoft} 18%, ${palette.surfaceRaised} 54%, #020203 74%)`,
            boxShadow: `0 45px 100px ${palette.accentSoft}`
          }}
          animate={animate ? { rotate: [0, 4, 0], scale: [0.98, 1.03, 0.98] } : undefined}
          transition={{ duration: profile.duration * 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute inset-[15%] rounded-full border border-white/15" />
          <div className="absolute left-1/2 top-1/2 h-[34%] w-px origin-bottom -translate-x-1/2 -translate-y-full bg-white/70" />
          <div className="absolute left-1/2 top-1/2 h-px w-[27%] origin-left bg-white/45" />
        </motion.div>
        <p className="absolute bottom-5 left-5 font-display text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
          The Meridian
        </p>
      </div>
    );
  }

  if (scene.id === "technology") {
    return (
      <div className="grid min-h-[250px] gap-3 rounded-[1.4rem] border border-white/10 bg-black/25 p-4 sm:min-h-[330px] sm:grid-cols-[1fr_0.72fr]">
        <div className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-black/30 p-4">
          <div className="flex items-center gap-2 text-[0.55rem] uppercase tracking-[0.2em] text-white/34">
            <span className="h-2 w-2 rounded-full" style={{ background: palette.accent }} />
            Live network map
          </div>
          <svg className="mt-4 h-[190px] w-full" viewBox="0 0 440 220" role="img" aria-label="Abstract network diagram">
            <g stroke={palette.accent} strokeOpacity="0.28" fill="none">
              <path d="M40 160 L128 78 L220 120 L310 48 L398 118" />
              <path d="M80 36 L128 78 L178 28 L220 120 L260 190 L398 118" />
              <path d="M40 160 L170 176 L260 190 L310 48" />
            </g>
            {[
              [40, 160],
              [80, 36],
              [128, 78],
              [170, 176],
              [178, 28],
              [220, 120],
              [260, 190],
              [310, 48],
              [398, 118]
            ].map(([cx, cy], index) => (
              <motion.circle
                key={`${cx}-${cy}`}
                cx={cx}
                cy={cy}
                r={index === 5 ? 8 : 5}
                fill={index === 5 ? palette.accent : "rgba(255,255,255,0.45)"}
                animate={animate ? { opacity: [0.35, 1, 0.35] } : undefined}
                transition={{ duration: 2.4 + (index % 3), repeat: Infinity, delay: index * 0.08 }}
              />
            ))}
          </svg>
        </div>
        <div className="grid grid-rows-3 gap-3">
          {["Threat response", "System health", "Active nodes"].map((label, index) => (
            <div key={label} className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-4">
              <p className="text-[0.55rem] uppercase tracking-[0.2em] text-white/28">{label}</p>
              <p className="mt-3 font-mono text-xl text-white/86">
                {index === 0 ? "00:41" : index === 1 ? "99.98%" : "1,284"}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (scene.id === "local") {
    return (
      <div className="grid min-h-[250px] gap-3 rounded-[1.4rem] border border-white/10 bg-black/18 p-4 sm:min-h-[330px] sm:grid-cols-[1.1fr_0.9fr]">
        <div
          className="relative overflow-hidden rounded-xl border border-white/[0.08]"
          style={{
            background: `linear-gradient(145deg, ${palette.accentSoft}, transparent 45%), linear-gradient(135deg, #20242b, #0b0d11)`
          }}
        >
          <div className="absolute inset-x-5 top-5 flex items-center justify-between">
            <span className="rounded-full bg-black/35 px-3 py-2 text-[0.55rem] uppercase tracking-[0.18em] text-white/65 backdrop-blur">
              Serving the GTA
            </span>
            <span className="rounded-full bg-white px-3 py-2 text-[0.55rem] font-semibold text-black">
              4.9 ★
            </span>
          </div>
          <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2">
            {["Licensed", "Insured", "20+ years"].map((item) => (
              <div key={item} className="rounded-lg border border-white/10 bg-black/35 px-2 py-3 text-center text-[0.55rem] text-white/62 backdrop-blur">
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-3">
          {["Residential", "Commercial", "Free estimates"].map((label, index) => (
            <motion.div
              key={label}
              className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.03] p-4"
              animate={animate ? { x: [0, index % 2 ? -4 : 4, 0] } : undefined}
              transition={{ duration: profile.duration, repeat: Infinity, delay: index * 0.4 }}
            >
              <span className="text-sm text-white/68">{label}</span>
              <ChevronRight className="h-4 w-4" style={{ color: palette.accent }} />
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (scene.id === "editorial") {
    return (
      <div className="grid min-h-[250px] gap-4 rounded-[1.4rem] border border-white/10 bg-[#f1eee6] p-5 text-[#151515] sm:min-h-[330px] sm:grid-cols-[0.8fr_1.2fr]">
        <div className="flex flex-col justify-between border-r border-black/15 pr-4">
          <div>
            <p className="text-[0.54rem] uppercase tracking-[0.24em] text-black/45">Issue No. 12</p>
            <h3 className="mt-4 font-display text-3xl font-semibold leading-[0.92] tracking-[-0.055em] sm:text-4xl">
              The value of a clear point of view.
            </h3>
          </div>
          <p className="text-xs leading-5 text-black/52">Field notes on building trust before asking for attention.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="relative overflow-hidden rounded-sm bg-[#24201b] sm:row-span-2">
            <motion.div
              className="absolute inset-[18%] rounded-full"
              style={{ background: palette.accent, filter: "blur(1px)" }}
              animate={animate ? { scale: [0.88, 1.04, 0.88], y: [8, -8, 8] } : undefined}
              transition={{ duration: profile.duration, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <div className="border-t border-black/20 pt-3 text-xs leading-5 text-black/58">
            Strategy is the discipline of deciding what deserves emphasis.
          </div>
          <div className="border-t border-black/20 pt-3 text-xs leading-5 text-black/58">
            Design gives that decision a memorable form.
          </div>
        </div>
      </div>
    );
  }

  if (scene.id === "creative") {
    return (
      <div className="relative min-h-[250px] overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#f0f047] sm:min-h-[330px]">
        <motion.div
          className="absolute -left-[7%] top-[14%] h-24 w-[60%] -rotate-6 bg-[#111]"
          animate={animate ? { x: [-profile.distance, profile.distance, -profile.distance] } : undefined}
          transition={{ duration: profile.duration, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[8%] top-[9%] aspect-square w-[28%] rounded-full"
          style={{ background: palette.accent }}
          animate={animate ? { rotate: [0, 360], scale: [0.9, 1.08, 0.9] } : undefined}
          transition={{ duration: profile.duration * 1.6, repeat: Infinity, ease: "linear" }}
        />
        <p className="absolute left-[7%] top-[32%] max-w-[78%] font-display text-[clamp(3rem,8vw,6rem)] font-black leading-[0.78] tracking-[-0.08em] text-[#111]">
          MAKE
          <br />
          SOME
          <br />
          NOISE
        </p>
        <div className="absolute bottom-5 right-5 rounded-full border-2 border-black px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-black">
          Studio release 08
        </div>
      </div>
    );
  }

  return (
    <div className="grid min-h-[250px] gap-3 rounded-[1.4rem] border border-white/10 bg-black/20 p-4 sm:min-h-[330px] sm:grid-cols-[1.08fr_0.92fr]">
      <div className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.025] p-4">
        <p className="text-[0.55rem] uppercase tracking-[0.2em] text-white/30">Product momentum</p>
        <div className="mt-6 flex h-[170px] items-end gap-2">
          {[36, 54, 44, 70, 62, 92, 78, 112].map((height, index) => (
            <motion.span
              key={`${height}-${index}`}
              className="flex-1 rounded-t-md"
              style={{
                height,
                background:
                  index > 5
                    ? palette.accent
                    : `color-mix(in srgb, ${palette.accent} ${28 + index * 7}%, transparent)`
              }}
              animate={animate ? { scaleY: [0.78, 1, 0.78] } : undefined}
              transition={{ duration: profile.duration, repeat: Infinity, delay: index * 0.12 }}
            />
          ))}
        </div>
      </div>
      <div className="grid gap-3">
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
          <p className="text-[0.55rem] uppercase tracking-[0.2em] text-white/28">Early access</p>
          <p className="mt-4 font-display text-3xl font-semibold tracking-[-0.05em] text-white">12,480</p>
          <p className="mt-2 text-xs text-white/38">people joined before launch</p>
        </div>
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-white/52">Launch readiness</p>
            <span className="text-xs" style={{ color: palette.accent }}>92%</span>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div
              className="h-full rounded-full"
              style={{ background: palette.accent }}
              initial={{ width: 0 }}
              animate={{ width: "92%" }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ExperiencePreview({
  scene,
  palette,
  configuration,
  active
}: {
  scene: ExperienceScene;
  palette: ExperiencePalette;
  configuration: ExperienceConfiguration;
  active: boolean;
}) {
  const style = {
    "--lab-accent": palette.accent,
    "--lab-accent-soft": palette.accentSoft,
    "--lab-surface": palette.surface,
    "--lab-surface-raised": palette.surfaceRaised,
    "--lab-foreground": palette.foreground
  } as CSSProperties;

  return (
    <div
      className="relative overflow-hidden rounded-[2rem] border border-white/[0.13] bg-[#050609] p-2 shadow-[0_50px_150px_rgba(0,0,0,0.55)] sm:p-3"
      style={style}
    >
      <div className="overflow-hidden rounded-[1.5rem] border border-white/[0.08]" style={{ background: palette.surface }}>
        <div className="flex h-11 items-center gap-3 border-b border-white/[0.08] bg-black/30 px-4 sm:h-12">
          <div className="flex gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/[0.07]" />
          </div>
          <div className="mx-auto max-w-[66%] truncate rounded-full border border-white/[0.07] bg-white/[0.035] px-5 py-1.5 text-[0.52rem] tracking-[0.1em] text-white/32">
            yourbrand.gridspell.preview
          </div>
          <Sparkles className="h-3.5 w-3.5" style={{ color: palette.accent }} />
        </div>

        <div className="relative min-h-[620px] overflow-hidden px-5 pb-6 pt-5 sm:px-8 sm:pb-8 lg:min-h-[670px] lg:px-10">
          <LabBackground
            kind={configuration.background}
            palette={palette}
            motionLevel={configuration.motion}
            active={active}
          />

          <div className="relative z-10">
            <nav className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className="grid h-9 w-9 place-items-center rounded-xl border text-sm font-bold"
                  style={{
                    borderColor: palette.accentSoft,
                    background: palette.accentSoft,
                    color: palette.accent
                  }}
                >
                  G
                </span>
                <span className="text-sm font-semibold tracking-[-0.02em] text-white/86">
                  Northstar
                </span>
              </div>

              <div className="hidden items-center gap-6 text-[0.62rem] uppercase tracking-[0.16em] text-white/36 sm:flex">
                {scene.navItems.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>

              <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-2 text-[0.6rem] font-semibold text-white/56">
                Menu
              </span>
            </nav>

            <AnimatePresence mode="wait">
              <motion.div
                key={scene.id}
                initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-8 pb-4 pt-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-10 lg:pt-16"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className="h-px w-9" style={{ background: palette.accent }} />
                    <p className="text-[0.6rem] font-semibold uppercase tracking-[0.28em]" style={{ color: palette.accent }}>
                      {scene.eyebrow}
                    </p>
                  </div>

                  <h3 className="mt-6 max-w-2xl font-display text-[clamp(2.7rem,6.2vw,5.4rem)] font-semibold leading-[0.86] tracking-[-0.075em] text-white">
                    {scene.headline}
                  </h3>

                  <p className="mt-6 max-w-xl text-sm leading-7 text-white/48 sm:text-base sm:leading-8">
                    {scene.description}
                  </p>

                  <div className="mt-7 flex flex-wrap items-center gap-4">
                    <PreviewButton effect={configuration.buttonEffect} palette={palette}>
                      {scene.primaryAction}
                    </PreviewButton>
                    <button type="button" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-5 text-sm font-semibold text-white/58 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white">
                      {scene.secondaryAction}
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-9 grid grid-cols-2 gap-3 border-t border-white/[0.08] pt-6">
                    {scene.proof.map((item) => (
                      <div key={item.label}>
                        <p className="font-display text-2xl font-semibold tracking-[-0.04em] text-white">
                          {item.value}
                        </p>
                        <p className="mt-1 text-[0.58rem] uppercase tracking-[0.16em] text-white/28">
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <SceneArtwork
                  scene={scene}
                  palette={palette}
                  motionLevel={configuration.motion}
                  active={active}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function SegmentedButton({
  selected,
  onClick,
  children,
  description
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  description?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "relative min-h-12 rounded-xl border px-3 py-3 text-left transition",
        selected
          ? "border-[#8be9ff]/38 bg-[#8be9ff]/8 text-white"
          : "border-white/[0.08] bg-white/[0.025] text-white/48 hover:border-white/15 hover:bg-white/[0.045] hover:text-white/72"
      )}
    >
      <span className="block text-xs font-semibold">{children}</span>
      {description ? <span className="mt-1 block text-[0.6rem] text-white/28">{description}</span> : null}
      {selected ? (
        <span className="absolute right-2.5 top-2.5 grid h-5 w-5 place-items-center rounded-full bg-[#8be9ff] text-[#071014]">
          <Check className="h-3 w-3" />
        </span>
      ) : null}
    </button>
  );
}

function ExperienceControls({
  configuration,
  onChange,
  onSurprise
}: {
  configuration: ExperienceConfiguration;
  onChange: <Key extends keyof ExperienceConfiguration>(
    key: Key,
    value: ExperienceConfiguration[Key]
  ) => void;
  onSurprise: () => void;
}) {
  return (
    <aside className="rounded-[2rem] border border-white/[0.1] bg-[#0b0d13]/92 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-6 lg:sticky lg:top-28">
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-[0.58rem] font-semibold uppercase tracking-[0.3em] text-[#8be9ff]">
            Creative controls
          </p>
          <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.045em] text-white">
            Shape the direction.
          </h3>
        </div>
        <button
          type="button"
          onClick={onSurprise}
          className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.035] px-3 text-[0.64rem] font-semibold text-white/56 transition hover:border-[#8be9ff]/35 hover:text-white"
        >
          <Shuffle className="h-3.5 w-3.5" />
          Surprise me
        </button>
      </div>

      <div className="mt-7 grid gap-7">
        <fieldset>
          <legend className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-white/30">
            01 · Website direction
          </legend>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {experienceScenes.map((scene) => (
              <SegmentedButton
                key={scene.id}
                selected={configuration.scene === scene.id}
                onClick={() => onChange("scene", scene.id)}
              >
                {scene.label}
              </SegmentedButton>
            ))}
          </div>
        </fieldset>

        <fieldset className="border-t border-white/[0.07] pt-6">
          <legend className="flex items-center gap-2 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-white/30">
            <Palette className="h-3.5 w-3.5" />
            02 · Accent palette
          </legend>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {experiencePalettes.map((palette) => {
              const selected = configuration.palette === palette.id;
              return (
                <button
                  key={palette.id}
                  type="button"
                  onClick={() => onChange("palette", palette.id)}
                  aria-label={`Use ${palette.label}`}
                  aria-pressed={selected}
                  className={cn(
                    "group min-h-16 rounded-xl border p-2.5 text-left transition",
                    selected
                      ? "border-white/30 bg-white/[0.055]"
                      : "border-white/[0.08] bg-white/[0.02] hover:border-white/16"
                  )}
                >
                  <span
                    className="block h-6 w-full rounded-lg"
                    style={{
                      background: `linear-gradient(135deg, ${palette.accent}, ${palette.accentDeep})`,
                      boxShadow: selected ? `0 0 22px ${palette.accentSoft}` : undefined
                    }}
                  />
                  <span className="mt-2 block truncate text-[0.56rem] text-white/40 group-hover:text-white/65">
                    {palette.label}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="border-t border-white/[0.07] pt-6">
          <legend className="flex items-center gap-2 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-white/30">
            <MousePointer2 className="h-3.5 w-3.5" />
            03 · Button response
          </legend>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {buttonEffects.map((effect) => (
              <SegmentedButton
                key={effect.id}
                selected={configuration.buttonEffect === effect.id}
                onClick={() => onChange("buttonEffect", effect.id)}
                description={effect.description}
              >
                {effect.label}
              </SegmentedButton>
            ))}
          </div>
        </fieldset>

        <fieldset className="border-t border-white/[0.07] pt-6">
          <legend className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-white/30">
            04 · Background atmosphere
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {backgroundOptions.map((background) => (
              <button
                key={background.id}
                type="button"
                onClick={() => onChange("background", background.id)}
                aria-pressed={configuration.background === background.id}
                className={cn(
                  "min-h-10 rounded-full border px-3.5 text-xs font-semibold transition",
                  configuration.background === background.id
                    ? "border-[#8be9ff]/38 bg-[#8be9ff]/8 text-white"
                    : "border-white/[0.08] bg-white/[0.025] text-white/42 hover:border-white/15 hover:text-white/70"
                )}
              >
                {background.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="border-t border-white/[0.07] pt-6">
          <legend className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-white/30">
            05 · Motion personality
          </legend>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {motionOptions.map((option) => (
              <SegmentedButton
                key={option.id}
                selected={configuration.motion === option.id}
                onClick={() => onChange("motion", option.id)}
              >
                {option.label}
              </SegmentedButton>
            ))}
          </div>
        </fieldset>
      </div>
    </aside>
  );
}

function StrategyPanel({ scene }: { scene: ExperienceScene }) {
  const items = [
    { label: "Brand perception", value: scene.perception },
    { label: "Primary goal", value: scene.conversionGoal },
    { label: "Motion character", value: scene.motionCharacter }
  ];

  return (
    <div className="grid gap-6 rounded-[2rem] border border-white/[0.09] bg-white/[0.025] p-6 sm:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
      <div>
        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-[#8be9ff]">
          Why this direction works
        </p>
        <h3 className="mt-5 max-w-2xl font-display text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
          The visual choices support a business decision.
        </h3>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-white/46 sm:text-base sm:leading-8">
          {scene.strategy}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {scene.idealFor.map((item) => (
            <span key={item} className="rounded-full border border-white/[0.09] bg-white/[0.025] px-3 py-2 text-[0.62rem] font-semibold text-white/42">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-3">
        {items.map((item) => (
          <div key={item.label} className="rounded-2xl border border-white/[0.08] bg-black/15 p-4">
            <p className="text-[0.56rem] uppercase tracking-[0.2em] text-white/25">{item.label}</p>
            <p className="mt-2 text-sm font-semibold text-white/72">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ExperienceLab() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.12 });
  const [configuration, setConfiguration] = useState<ExperienceConfiguration>(
    defaultExperienceConfiguration
  );
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fromUrl = getConfigurationFromUrl();
    if (fromUrl) setConfiguration(fromUrl);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const url = new URL(window.location.href);
    const params = buildExperienceParams(configuration);
    params.forEach((value, key) => url.searchParams.set(key, value));
    window.history.replaceState({}, "", url);
  }, [configuration]);

  const scene = useMemo(
    () => experienceScenes.find((item) => item.id === configuration.scene) ?? experienceScenes[0],
    [configuration.scene]
  );

  const palette = useMemo(
    () => experiencePalettes.find((item) => item.id === configuration.palette) ?? experiencePalettes[0],
    [configuration.palette]
  );

  const startProjectHref = `/start-project?${buildExperienceParams(configuration).toString()}`;

  function updateConfiguration<Key extends keyof ExperienceConfiguration>(
    key: Key,
    value: ExperienceConfiguration[Key]
  ) {
    setConfiguration((current) => {
      const next = { ...current, [key]: value };
      trackSelection(`experience_${String(key)}_selected`, String(value), next);
      return next;
    });
  }

  function surpriseMe() {
    setConfiguration((current) => {
      const currentIndex = approvedExperienceCombinations.findIndex(
        (item) => JSON.stringify(item) === JSON.stringify(current)
      );
      const next = approvedExperienceCombinations[(currentIndex + 1) % approvedExperienceCombinations.length];
      trackAnalyticsEvent("experience_lab_randomized", {
        experience_scene: next.scene
      });
      return next;
    });
  }

  async function copyDirection() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      trackAnalyticsEvent("experience_lab_shared", {
        experience_scene: configuration.scene
      });
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#07080c] pb-28 pt-32 lg:pb-36 lg:pt-40">
      <div aria-hidden="true" className="page-grid pointer-events-none absolute inset-0 opacity-40" />
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[38rem] w-[72rem] -translate-x-1/2 rounded-full bg-[#7c5cff]/10 blur-[170px]" />

      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <div className="flex items-center gap-4">
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-[#8be9ff]/24 bg-[#8be9ff]/7">
                <WandSparkles className="h-4.5 w-4.5 text-[#8be9ff]" />
              </span>
              <p className="text-[0.64rem] font-semibold uppercase tracking-[0.38em] text-[#8be9ff]">
                The Experience Lab
              </p>
            </div>

            <h2 className="mt-8 text-balance font-display text-[clamp(4rem,9vw,8.6rem)] font-semibold leading-[0.8] tracking-[-0.085em] text-white">
              Build your first impression.
            </h2>
          </div>

          <div className="lg:pb-3">
            <p className="max-w-2xl text-base leading-8 text-white/46 sm:text-lg sm:leading-9">
              Choose a direction, tune the atmosphere, and see how strategic design choices can completely change the way a business feels online.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => sectionRef.current?.querySelector<HTMLElement>("[data-lab-workspace]")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-r from-[#7c5cff] to-[#29d6ff] px-5 text-sm font-semibold !text-[#05070b] shadow-[0_14px_40px_rgba(41,214,255,0.18)] transition hover:-translate-y-0.5 hover:brightness-110"
              >
                Start designing
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={surpriseMe}
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/12 bg-white/[0.035] px-5 text-sm font-semibold text-white/62 transition hover:border-white/22 hover:bg-white/[0.06] hover:text-white"
              >
                <Shuffle className="h-4 w-4" />
                Surprise me
              </button>
            </div>
          </div>
        </div>

        <div data-lab-workspace className="scroll-mt-28 mt-16 grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(310px,0.45fr)] xl:items-start">
          <ExperiencePreview
            scene={scene}
            palette={palette}
            configuration={configuration}
            active={isInView}
          />
          <ExperienceControls
            configuration={configuration}
            onChange={updateConfiguration}
            onSurprise={surpriseMe}
          />
        </div>

        <div className="mt-6">
          <StrategyPanel scene={scene} />
        </div>

        <div className="mt-6 overflow-hidden rounded-[2rem] border border-[#7c5cff]/22 bg-[radial-gradient(circle_at_90%_15%,rgba(41,214,255,0.12),transparent_24rem),linear-gradient(145deg,rgba(124,92,255,0.13),rgba(255,255,255,0.025))] p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-[#8be9ff]">
                Your selected direction
              </p>
              <h3 className="mt-5 max-w-3xl font-display text-3xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
                {scene.label} · {palette.label}
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/44 sm:text-base">
                This is a starting point—not a template. GridSpell develops the direction around your audience, content, offer, and business goals.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              <button
                type="button"
                onClick={copyDirection}
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/12 bg-white/[0.035] px-5 text-sm font-semibold text-white/58 transition hover:border-white/20 hover:text-white"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Link copied" : "Share direction"}
              </button>
              <Link
                href={startProjectHref}
                onClick={() =>
                  trackAnalyticsEvent("experience_direction_submitted", {
                    experience_scene: configuration.scene,
                    experience_palette: configuration.palette
                  })
                }
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#08090d] transition hover:-translate-y-0.5"
              >
                Start a project with this style
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-28 border-t border-white/[0.08] pt-14 text-center lg:mt-36 lg:pt-20">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-[#8be9ff]">
            Ideas become meaningful when they are built
          </p>
          <h2 className="mx-auto mt-6 max-w-4xl font-display text-[clamp(3.6rem,8vw,7rem)] font-semibold leading-[0.84] tracking-[-0.075em] text-white">
            Now see the thinking become real.
          </h2>
        </div>
      </Container>
    </section>
  );
}
