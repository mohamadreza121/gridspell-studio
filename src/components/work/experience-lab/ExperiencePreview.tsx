"use client";

import { useMemo, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { ArrowUpRight, Check, Play, ShieldCheck, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";
import type {
  ExperienceConfiguration,
  ExperiencePalette,
  ExperienceScene
} from "@/types/experience-lab";

const motionSettings = {
  calm: { duration: 14, distance: 10 },
  balanced: { duration: 9, distance: 20 },
  expressive: { duration: 5.5, distance: 34 }
} as const;

function BackgroundAtmosphere({
  configuration,
  palette,
  active
}: {
  configuration: ExperienceConfiguration;
  palette: ExperiencePalette;
  active: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const enabled = active && !reduceMotion;
  const setting = motionSettings[configuration.motion];

  if (configuration.background === "grid") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-55"
          style={{
            backgroundImage: `linear-gradient(${palette.accentSoft} 1px, transparent 1px), linear-gradient(90deg, ${palette.accentSoft} 1px, transparent 1px)`,
            backgroundSize: "54px 54px",
            maskImage: "linear-gradient(to bottom, black, transparent 94%)"
          }}
        />
        <motion.div
          className="absolute left-[8%] top-[14%] h-px w-[72%]"
          style={{ background: `linear-gradient(90deg, transparent, ${palette.accent}, transparent)` }}
          animate={enabled ? { x: ["-20%", "45%", "-20%"] } : undefined}
          transition={{ duration: setting.duration, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute right-[12%] top-[16%] h-2 w-2 rounded-full" style={{ background: palette.accent }} />
        <div className="absolute bottom-[18%] left-[16%] h-1.5 w-1.5 rounded-full" style={{ background: palette.accent }} />
      </div>
    );
  }

  if (configuration.background === "glass") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[
          { left: "8%", top: "12%", rotate: -14, delay: 0 },
          { left: "72%", top: "18%", rotate: 18, delay: 0.7 },
          { left: "64%", top: "68%", rotate: -8, delay: 1.4 },
          { left: "14%", top: "72%", rotate: 11, delay: 2.1 }
        ].map((item, index) => (
          <motion.div
            key={index}
            className="absolute h-28 w-40 rounded-[1.6rem] border border-white/[0.12] bg-white/[0.045] shadow-2xl backdrop-blur-xl"
            style={{ left: item.left, top: item.top, rotate: item.rotate }}
            animate={
              enabled
                ? {
                    y: [-setting.distance, setting.distance, -setting.distance],
                    rotate: [item.rotate - 3, item.rotate + 3, item.rotate - 3]
                  }
                : undefined
            }
            transition={{
              duration: setting.duration + index,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay
            }}
          />
        ))}
      </div>
    );
  }

  if (configuration.background === "particles") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 18 }).map((_, index) => {
          const left = `${8 + ((index * 17) % 86)}%`;
          const top = `${7 + ((index * 23) % 82)}%`;
          const size = 2 + (index % 3);

          return (
            <motion.span
              key={index}
              className="absolute rounded-full"
              style={{
                left,
                top,
                width: size,
                height: size,
                background: index % 4 === 0 ? palette.accent : "rgba(255,255,255,0.38)",
                boxShadow: index % 4 === 0 ? `0 0 18px ${palette.accent}` : undefined
              }}
              animate={
                enabled
                  ? {
                      y: [-setting.distance, setting.distance, -setting.distance],
                      opacity: [0.22, 0.9, 0.22]
                    }
                  : undefined
              }
              transition={{
                duration: setting.duration + (index % 5),
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.12
              }}
            />
          );
        })}
      </div>
    );
  }

  if (configuration.background === "rings") {
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
              translate: "-50% -50%",
              rotateX: 67
            }}
            animate={enabled ? { rotateZ: index % 2 === 0 ? 360 : -360 } : undefined}
            transition={{
              duration: setting.duration * (2.4 + index * 0.7),
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
        <div
          className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: palette.accent, boxShadow: `0 0 34px ${palette.accent}` }}
        />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -left-[12%] -top-[30%] h-[78%] w-[78%] rounded-full blur-[120px]"
        style={{ background: palette.accentSoft }}
        animate={
          enabled
            ? {
                x: [-setting.distance, setting.distance, -setting.distance],
                y: [setting.distance, -setting.distance, setting.distance],
                scale: [0.95, 1.08, 0.95]
              }
            : undefined
        }
        transition={{ duration: setting.duration, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-[42%] right-[-10%] h-[82%] w-[82%] rounded-full blur-[140px]"
        style={{ background: `color-mix(in srgb, ${palette.accentDeep} 56%, transparent)` }}
        animate={
          enabled
            ? {
                x: [setting.distance, -setting.distance, setting.distance],
                y: [-setting.distance, setting.distance, -setting.distance],
                scale: [1.06, 0.94, 1.06]
              }
            : undefined
        }
        transition={{
          duration: setting.duration + 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}

function PreviewButton({
  label,
  configuration,
  palette
}: {
  label: string;
  configuration: ExperienceConfiguration;
  palette: ExperiencePalette;
}) {
  const reduceMotion = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [cursor, setCursor] = useState({ x: 50, y: 50 });

  function handlePointerMove(event: PointerEvent<HTMLButtonElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setCursor({ x, y });

    if (configuration.buttonEffect === "magnetic" && !reduceMotion) {
      setOffset({
        x: (x - rect.width / 2) * 0.16,
        y: (y - rect.height / 2) * 0.2
      });
    }
  }

  function resetPointer() {
    setOffset({ x: 0, y: 0 });
  }

  return (
    <motion.button
      type="button"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      onBlur={resetPointer}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 360, damping: 24 }}
      className={cn(
        "group relative inline-flex min-h-12 items-center justify-center overflow-hidden rounded-full px-5 text-sm font-semibold transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        configuration.buttonEffect === "arrow" && "hover:-translate-y-0.5",
        configuration.buttonEffect === "glow" && "hover:brightness-110"
      )}
      style={
        {
          background: palette.accent,
          color: palette.surface,
          boxShadow:
            configuration.buttonEffect === "glow"
              ? `0 16px 46px ${palette.accentSoft}`
              : "0 14px 34px rgba(0,0,0,0.24)"
        } as CSSProperties
      }
    >
      {configuration.buttonEffect === "sweep" ? (
        <span
          aria-hidden="true"
          className="absolute inset-0 -translate-x-[102%] transition-transform duration-500 ease-out group-hover:translate-x-0"
          style={{ background: palette.foreground }}
        />
      ) : null}

      {configuration.buttonEffect === "glow" ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-90"
          style={{
            left: cursor.x,
            top: cursor.y,
            background: palette.foreground
          }}
        />
      ) : null}

      <span
        className={cn(
          "relative z-10 flex items-center gap-2",
          configuration.buttonEffect === "sweep" && "transition-colors duration-500 group-hover:text-black"
        )}
      >
        {label}
        <ArrowUpRight
          className={cn(
            "h-4 w-4 transition-transform duration-300",
            configuration.buttonEffect === "arrow" &&
              "group-hover:-translate-y-0.5 group-hover:translate-x-1"
          )}
        />
      </span>
    </motion.button>
  );
}

function SceneArtwork({
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
  const reduceMotion = useReducedMotion();
  const animate = active && !reduceMotion;
  const setting = motionSettings[configuration.motion];

  if (scene.id === "luxury") {
    return (
      <div className="relative min-h-[240px] overflow-hidden rounded-[1.7rem] border border-white/[0.09] bg-black/25 p-5 sm:min-h-[290px]">
        <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.07),transparent_42%)]" />
        <motion.div
          className="absolute left-[21%] top-[12%] h-[72%] w-[58%] rounded-[45%_45%_36%_36%] border border-white/15 bg-[linear-gradient(155deg,rgba(255,255,255,0.16),rgba(255,255,255,0.02))] shadow-[0_35px_80px_rgba(0,0,0,0.55)]"
          animate={animate ? { y: [-6, 6, -6], rotate: [-1.5, 1.5, -1.5] } : undefined}
          transition={{ duration: setting.duration, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute left-1/2 top-[18%] h-[42%] w-[42%] -translate-x-1/2 rounded-full border border-white/20 bg-black/35 shadow-inner">
            <div className="absolute left-1/2 top-1/2 h-[34%] w-px -translate-x-1/2 -translate-y-full bg-white/55" />
            <div className="absolute left-1/2 top-1/2 h-px w-[28%] bg-white/40" />
          </div>
          <div className="absolute inset-x-[17%] bottom-[14%] h-px" style={{ background: palette.accent }} />
        </motion.div>
        <p className="absolute bottom-5 left-5 font-mono text-[0.58rem] uppercase tracking-[0.28em] text-white/35">
          Private object 01
        </p>
      </div>
    );
  }

  if (scene.id === "creative") {
    return (
      <div className="relative min-h-[240px] overflow-hidden rounded-[1.7rem] border border-white/[0.09] bg-black/20 sm:min-h-[290px]">
        <motion.div
          className="absolute -left-[8%] top-[14%] rotate-[-8deg] whitespace-nowrap font-display text-[clamp(4.5rem,11vw,8.5rem)] font-black leading-none tracking-[-0.09em] text-white/90"
          animate={animate ? { x: [-18, 18, -18] } : undefined}
          transition={{ duration: setting.duration, repeat: Infinity, ease: "easeInOut" }}
        >
          MAKE
        </motion.div>
        <motion.div
          className="absolute right-[3%] top-[44%] rotate-[7deg] whitespace-nowrap font-display text-[clamp(4rem,10vw,8rem)] font-black leading-none tracking-[-0.09em]"
          style={{ color: palette.accent }}
          animate={animate ? { x: [18, -18, 18] } : undefined}
          transition={{ duration: setting.duration + 1, repeat: Infinity, ease: "easeInOut" }}
        >
          NOISE
        </motion.div>
        <div className="absolute bottom-5 left-5 rounded-full border border-white/15 bg-black/30 px-3 py-1.5 font-mono text-[0.58rem] uppercase tracking-[0.22em] text-white/48">
          Studio release 08
        </div>
      </div>
    );
  }

  if (scene.id === "technology") {
    return (
      <div className="relative min-h-[240px] overflow-hidden rounded-[1.7rem] border border-white/[0.09] bg-black/20 p-5 sm:min-h-[290px]">
        <div className="grid h-full min-h-[200px] grid-cols-[0.76fr_1.24fr] gap-3">
          <div className="grid gap-3">
            {[
              ["Edge status", "Protected"],
              ["Active nodes", "128"],
              ["Latency", "12ms"]
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-white/[0.08] bg-white/[0.035] p-3">
                <p className="font-mono text-[0.52rem] uppercase tracking-[0.2em] text-white/32">{label}</p>
                <p className="mt-3 text-sm font-semibold text-white/78">{value}</p>
              </div>
            ))}
          </div>
          <div className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.025]">
            <div
              className="absolute inset-0 opacity-35"
              style={{
                backgroundImage: `linear-gradient(${palette.accentSoft} 1px, transparent 1px), linear-gradient(90deg, ${palette.accentSoft} 1px, transparent 1px)`,
                backgroundSize: "32px 32px"
              }}
            />
            {[
              ["22%", "24%"],
              ["63%", "18%"],
              ["45%", "58%"],
              ["76%", "70%"],
              ["18%", "76%"]
            ].map(([left, top], index) => (
              <motion.span
                key={index}
                className="absolute h-3 w-3 rounded-full"
                style={{ left, top, background: palette.accent, boxShadow: `0 0 20px ${palette.accent}` }}
                animate={animate ? { scale: [0.75, 1.2, 0.75], opacity: [0.45, 1, 0.45] } : undefined}
                transition={{ duration: 2.4 + index * 0.4, repeat: Infinity, delay: index * 0.2 }}
              />
            ))}
            <div className="absolute bottom-3 left-3 flex items-center gap-2 text-[0.58rem] uppercase tracking-[0.18em] text-white/40">
              <ShieldCheck className="h-3.5 w-3.5" style={{ color: palette.accent }} />
              Network verified
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (scene.id === "local") {
    return (
      <div className="relative min-h-[240px] overflow-hidden rounded-[1.7rem] border border-white/[0.09] bg-black/20 p-5 sm:min-h-[290px]">
        <div className="absolute inset-x-5 top-5 h-[54%] overflow-hidden rounded-xl border border-white/[0.08] bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.015))]">
          <div className="absolute bottom-0 left-[8%] h-[68%] w-[36%] rounded-t-[40%] border border-white/10 bg-white/[0.05]" />
          <div className="absolute bottom-0 right-[10%] h-[82%] w-[32%] rounded-t-[2rem] border border-white/10 bg-white/[0.045]" />
          <div className="absolute bottom-[12%] left-[38%] h-2 w-2 rounded-full" style={{ background: palette.accent }} />
        </div>
        <div className="absolute inset-x-5 bottom-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.035] p-3">
            <p className="text-lg font-semibold" style={{ color: palette.accent }}>4.9/5</p>
            <p className="mt-1 text-[0.62rem] text-white/38">Verified local reviews</p>
          </div>
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.035] p-3">
            <p className="text-lg font-semibold text-white/80">Same day</p>
            <p className="mt-1 text-[0.62rem] text-white/38">Estimate response</p>
          </div>
        </div>
      </div>
    );
  }

  if (scene.id === "editorial") {
    return (
      <div className="relative min-h-[240px] overflow-hidden rounded-[1.7rem] border border-white/[0.09] bg-[#f0ece4] p-5 text-black sm:min-h-[290px]">
        <div className="grid h-full min-h-[200px] grid-cols-[1.1fr_0.9fr] gap-5">
          <div className="flex flex-col justify-between border-r border-black/15 pr-5">
            <p className="font-serif text-[clamp(2.2rem,5vw,4.4rem)] leading-[0.9] tracking-[-0.055em]">
              Perspective changes the work.
            </p>
            <p className="mt-8 max-w-xs text-xs leading-5 text-black/55">
              Notes on building authority through clarity, consistency, and a point of view.
            </p>
          </div>
          <div className="flex flex-col justify-between">
            <div className="aspect-[4/3] rounded-sm bg-[linear-gradient(145deg,#2c2a28,#8a8278)]" />
            <p className="mt-4 font-mono text-[0.52rem] uppercase tracking-[0.2em] text-black/42">
              Edition 04 · Field notes
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[240px] overflow-hidden rounded-[1.7rem] border border-white/[0.09] bg-black/20 p-5 sm:min-h-[290px]">
      <div className="grid h-full min-h-[200px] grid-cols-[1.05fr_0.95fr] gap-4">
        <div className="flex flex-col justify-between rounded-xl border border-white/[0.08] bg-white/[0.035] p-4">
          <div>
            <div className="flex items-center gap-2 text-[0.58rem] uppercase tracking-[0.22em] text-white/38">
              <Sparkles className="h-3.5 w-3.5" style={{ color: palette.accent }} />
              Product signal
            </div>
            <p className="mt-5 text-3xl font-semibold tracking-[-0.055em] text-white">Build momentum.</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/44">
            <Check className="h-3.5 w-3.5" style={{ color: palette.accent }} />
            Conversion path ready
          </div>
        </div>
        <div className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.025]">
          <motion.div
            className="absolute left-[16%] top-[18%] h-[44%] w-[68%] rounded-2xl border border-white/[0.1] bg-white/[0.055] shadow-2xl"
            animate={animate ? { y: [-setting.distance * 0.3, setting.distance * 0.3, -setting.distance * 0.3] } : undefined}
            transition={{ duration: setting.duration, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[13%] right-[11%] h-[42%] w-[52%] rounded-2xl border border-white/[0.1] bg-black/35 shadow-2xl"
            animate={animate ? { y: [setting.distance * 0.25, -setting.distance * 0.25, setting.distance * 0.25] } : undefined}
            transition={{ duration: setting.duration + 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute bottom-4 left-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/35">
            <Play className="ml-0.5 h-3.5 w-3.5" style={{ color: palette.accent }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ExperiencePreview({
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
  const hostname = `${scene.id}.gridspell.preview`;
  const previewKey = `${configuration.scene}-${configuration.palette}-${configuration.background}`;

  const sceneStyle = useMemo(
    () =>
      ({
        "--lab-accent": palette.accent,
        "--lab-accent-soft": palette.accentSoft,
        "--lab-surface": palette.surface,
        "--lab-surface-raised": palette.surfaceRaised,
        color: palette.foreground,
        background: palette.surface
      }) as CSSProperties,
    [palette]
  );

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.12] bg-[#030407] p-1.5 shadow-[0_45px_140px_rgba(0,0,0,0.56)] sm:p-2">
      <div className="overflow-hidden rounded-[1.65rem] border border-black bg-black">
        <div className="flex h-11 items-center gap-3 border-b border-white/[0.08] bg-[#0a0b10] px-3 sm:h-12 sm:px-4">
          <div className="flex gap-1.5 sm:gap-2">
            <span className="h-2 w-2 rounded-full bg-white/20 sm:h-2.5 sm:w-2.5" />
            <span className="h-2 w-2 rounded-full bg-white/12 sm:h-2.5 sm:w-2.5" />
            <span className="h-2 w-2 rounded-full bg-white/[0.07] sm:h-2.5 sm:w-2.5" />
          </div>
          <div className="mx-auto max-w-[62%] truncate rounded-full border border-white/[0.07] bg-white/[0.035] px-4 py-1.5 font-mono text-[0.52rem] tracking-[0.08em] text-white/32 sm:px-8">
            {hostname}
          </div>
          <span className="h-2 w-8 rounded-full bg-white/[0.06]" />
        </div>

        <motion.div
          key={previewKey}
          initial={{ opacity: 0, scale: 0.985, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-[610px] overflow-hidden p-4 sm:min-h-[650px] sm:p-7 lg:min-h-[690px] lg:p-9"
          style={sceneStyle}
        >
          <BackgroundAtmosphere configuration={configuration} palette={palette} active={active} />

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="grid h-8 w-8 place-items-center rounded-lg border text-[0.65rem] font-black"
                style={{ borderColor: palette.accentSoft, color: palette.accent }}
              >
                G
              </span>
              <span className="text-xs font-semibold tracking-[0.14em] text-white/72">GRID/01</span>
            </div>
            <div className="hidden items-center gap-5 text-[0.58rem] uppercase tracking-[0.2em] text-white/34 sm:flex">
              {scene.navItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <span
              className="rounded-full border px-3 py-1.5 text-[0.56rem] font-semibold uppercase tracking-[0.18em]"
              style={{ borderColor: palette.accentSoft, color: palette.accent }}
            >
              Live concept
            </span>
          </div>

          <div className="relative z-10 mt-14 grid gap-9 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-9" style={{ background: palette.accent }} />
                <p className="text-[0.58rem] font-semibold uppercase tracking-[0.28em]" style={{ color: palette.accent }}>
                  {scene.eyebrow}
                </p>
              </div>

              <h3
                className={cn(
                  "mt-6 max-w-2xl text-balance font-display font-semibold tracking-[-0.065em] text-white",
                  scene.id === "luxury" || scene.id === "editorial"
                    ? "text-[clamp(3rem,6.2vw,5.7rem)] leading-[0.9]"
                    : "text-[clamp(3rem,6.5vw,6rem)] leading-[0.86]"
                )}
              >
                {scene.headline}
              </h3>

              <p className="mt-6 max-w-xl text-sm leading-7 text-white/48 sm:text-base sm:leading-8">
                {scene.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <PreviewButton label={scene.primaryAction} configuration={configuration} palette={palette} />
                <button
                  type="button"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.035] px-5 text-sm font-semibold text-white/66 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
                >
                  {scene.secondaryAction}
                </button>
              </div>

              <div className="mt-10 flex flex-wrap gap-6 border-t border-white/[0.08] pt-6">
                {scene.proof.map((item) => (
                  <div key={item.label}>
                    <p className="font-display text-2xl font-semibold tracking-[-0.04em] text-white/88">
                      {item.value}
                    </p>
                    <p className="mt-1 text-[0.58rem] uppercase tracking-[0.18em] text-white/30">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <SceneArtwork
              scene={scene}
              palette={palette}
              configuration={configuration}
              active={active}
            />
          </div>

          <div className="relative z-10 mt-9 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.07] pt-5">
            <p className="font-mono text-[0.54rem] uppercase tracking-[0.2em] text-white/26">
              {scene.category}
            </p>
            <div className="flex flex-wrap gap-2">
              {scene.idealFor.map((item) => (
                <span
                  key={item}
                  className="rounded-full border px-3 py-1.5 text-[0.56rem] text-white/44"
                  style={{ borderColor: palette.accentSoft }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
