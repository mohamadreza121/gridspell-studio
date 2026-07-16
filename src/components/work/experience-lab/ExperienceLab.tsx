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
  useMotionValue,
  useSpring,
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
import { trackAnalyticsEvent } from "@/lib/analytics-client";
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

function buildExperienceUrl(configuration: ExperienceConfiguration) {
  const params = new URLSearchParams({
    scene: configuration.scene,
    palette: configuration.palette,
    button: configuration.buttonEffect,
    background: configuration.background,
    motion: configuration.motion
  });

  return `/work?${params.toString()}#experience-lab`;
}

function buildProjectUrl(configuration: ExperienceConfiguration) {
  const params = new URLSearchParams({
    scene: configuration.scene,
    palette: configuration.palette,
    button: configuration.buttonEffect,
    background: configuration.background,
    motion: configuration.motion
  });

  return `/start-project?${params.toString()}`;
}

function getScene(sceneId: ExperienceSceneId) {
  return experienceScenes.find((scene) => scene.id === sceneId) ?? experienceScenes[0];
}

function getPalette(paletteId: ExperiencePaletteId) {
  return experiencePalettes.find((palette) => palette.id === paletteId) ?? experiencePalettes[0];
}

function getButtonEffect(buttonId: ExperienceButtonEffect) {
  return buttonEffects.find((button) => button.id === buttonId) ?? buttonEffects[0];
}

function getBackground(backgroundId: ExperienceBackground) {
  return backgroundOptions.find((background) => background.id === backgroundId) ?? backgroundOptions[0];
}

function getMotionOption(motionId: ExperienceMotionLevel) {
  return motionOptions.find((motionOption) => motionOption.id === motionId) ?? motionOptions[0];
}

function isApprovedCombination(configuration: ExperienceConfiguration) {
  return approvedExperienceCombinations.some(
    (combination) =>
      combination.scene === configuration.scene &&
      combination.palette === configuration.palette &&
      combination.buttonEffect === configuration.buttonEffect &&
      combination.background === configuration.background &&
      combination.motion === configuration.motion
  );
}

function getSafeConfiguration(configuration: ExperienceConfiguration) {
  if (isApprovedCombination(configuration)) return configuration;

  return (
    approvedExperienceCombinations.find(
      (combination) => combination.scene === configuration.scene
    ) ?? defaultExperienceConfiguration
  );
}

function randomApprovedConfiguration(current: ExperienceConfiguration) {
  const alternatives = approvedExperienceCombinations.filter(
    (combination) =>
      combination.scene !== current.scene ||
      combination.palette !== current.palette ||
      combination.buttonEffect !== current.buttonEffect ||
      combination.background !== current.background ||
      combination.motion !== current.motion
  );

  return alternatives[Math.floor(Math.random() * alternatives.length)] ?? defaultExperienceConfiguration;
}

function updateUrl(configuration: ExperienceConfiguration) {
  if (typeof window === "undefined") return;
  window.history.replaceState(null, "", buildExperienceUrl(configuration));
}

function SelectionButton({
  selected,
  label,
  onClick
}: {
  selected: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "group flex min-h-11 w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-xs font-semibold transition",
        selected
          ? "border-[#8be9ff]/30 bg-[#8be9ff]/10 text-white"
          : "border-white/[0.08] bg-white/[0.025] text-white/48 hover:border-white/20 hover:text-white"
      )}
    >
      <span>{label}</span>
      <Check
        aria-hidden="true"
        className={cn(
          "h-3.5 w-3.5 transition",
          selected ? "text-[#8be9ff] opacity-100" : "opacity-0"
        )}
      />
    </button>
  );
}

function ScenePreview({
  scene,
  palette,
  background,
  buttonEffect,
  motionLevel
}: {
  scene: ExperienceScene;
  palette: ExperiencePalette;
  background: ReturnType<typeof getBackground>;
  buttonEffect: ReturnType<typeof getButtonEffect>;
  motionLevel: ExperienceMotionLevel;
}) {
  const reducedMotion = useReducedMotion();
  const previewRef = useRef<HTMLDivElement>(null);
  const inView = useInView(previewRef, { once: false, amount: 0.35 });
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 100, damping: 18 });
  const springY = useSpring(pointerY, { stiffness: 100, damping: 18 });
  const motionProfile = motionProfiles[motionLevel];
  const animateScene = !reducedMotion && inView;

  const previewStyle = useMemo(
    () =>
      ({
        "--experience-primary": palette.primary,
        "--experience-secondary": palette.secondary,
        "--experience-accent": palette.accent,
        "--experience-surface": palette.surface,
        "--experience-text": palette.text,
        "--experience-muted": palette.muted,
        "--experience-background": background.background,
        "--experience-background-overlay": background.overlay
      }) as CSSProperties,
    [background, palette]
  );

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reducedMotion || motionLevel === "calm") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    pointerX.set(x * motionProfile.distance);
    pointerY.set(y * motionProfile.distance);
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <div
      ref={previewRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      className="relative min-h-[32rem] overflow-hidden rounded-[2.4rem] border border-white/[0.1] bg-black/30 p-4 sm:min-h-[38rem] sm:p-6"
      style={previewStyle}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `var(--experience-background)`,
          opacity: background.opacity
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: `var(--experience-background-overlay)` }}
      />

      <motion.div
        style={{ x: springX, y: springY }}
        animate={
          animateScene
            ? {
                y: [0, -motionProfile.distance * 0.35, 0],
                rotate: [0, motionProfile.intensity * 0.35, 0]
              }
            : { y: 0, rotate: 0 }
        }
        transition={{
          duration: motionProfile.duration,
          ease: "easeInOut",
          repeat: animateScene ? Number.POSITIVE_INFINITY : 0
        }}
        className="relative z-10 mx-auto flex min-h-[30rem] max-w-3xl items-center justify-center sm:min-h-[35rem]"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${scene.id}-${palette.id}-${buttonEffect.id}`}
            initial={reducedMotion ? false : { opacity: 0, scale: 0.97, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, scale: 0.98, y: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full overflow-hidden rounded-[2rem] border border-white/[0.1] bg-[var(--experience-surface)]/90 p-6 shadow-[0_30px_100px_rgba(0,0,0,.35)] backdrop-blur-xl sm:p-9"
          >
            <div className="flex items-center justify-between gap-5 border-b border-white/[0.08] pb-5">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/[0.1] bg-white/[0.04] text-[var(--experience-accent)]">
                  <Sparkles className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[0.54rem] font-semibold uppercase tracking-[0.22em] text-[var(--experience-muted)]">
                    Live direction
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[var(--experience-text)]">
                    {scene.label}
                  </p>
                </div>
              </div>
              <span className="rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-1.5 text-[0.5rem] font-semibold uppercase tracking-[0.16em] text-[var(--experience-muted)]">
                {palette.label}
              </span>
            </div>

            <div className="mt-8 grid gap-7 md:grid-cols-[1.12fr_.88fr] md:items-end">
              <div>
                <p className="text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-[var(--experience-primary)]">
                  {scene.eyebrow}
                </p>
                <h3 className="mt-5 max-w-[10ch] font-display text-[clamp(2.6rem,7vw,5.4rem)] font-semibold leading-[0.82] tracking-[-0.075em] text-[var(--experience-text)]">
                  {scene.headline}
                </h3>
                <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--experience-muted)] sm:text-base sm:leading-8">
                  {scene.description}
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    className={cn(
                      "experience-preview-primary inline-flex min-h-12 items-center justify-center gap-2 px-5 text-sm font-semibold transition",
                      buttonEffect.className
                    )}
                    style={{
                      background: `linear-gradient(135deg,var(--experience-primary),var(--experience-secondary))`,
                      color: `var(--experience-text)`
                    }}
                  >
                    {scene.primaryAction}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.035] px-5 text-sm font-semibold text-[var(--experience-text)]/70"
                  >
                    {scene.secondaryAction}
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="grid gap-3">
                {scene.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4"
                  >
                    <p className="font-display text-2xl font-semibold tracking-[-0.05em] text-[var(--experience-text)]">
                      {metric.value}
                    </p>
                    <p className="mt-1 text-[0.54rem] uppercase tracking-[0.17em] text-[var(--experience-muted)]">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export function ExperienceLab() {
  const [configuration, setConfiguration] = useState<ExperienceConfiguration>(
    defaultExperienceConfiguration
  );
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const urlConfiguration = getConfigurationFromUrl();
    if (urlConfiguration) {
      setConfiguration(getSafeConfiguration(urlConfiguration));
    }
  }, []);

  const scene = getScene(configuration.scene);
  const palette = getPalette(configuration.palette);
  const buttonEffect = getButtonEffect(configuration.buttonEffect);
  const background = getBackground(configuration.background);
  const motionOption = getMotionOption(configuration.motion);
  const projectUrl = buildProjectUrl(configuration);

  function selectConfiguration(next: ExperienceConfiguration) {
    const safe = getSafeConfiguration(next);
    setConfiguration(safe);
    updateUrl(safe);
    trackAnalyticsEvent("experience_lab_change", {
      scene: safe.scene,
      palette: safe.palette,
      button_effect: safe.buttonEffect,
      background: safe.background,
      motion: safe.motion
    });
  }

  async function copyDirection() {
    const url = new URL(buildExperienceUrl(configuration), window.location.origin).toString();
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
    trackAnalyticsEvent("experience_lab_copy", {
      scene: configuration.scene,
      palette: configuration.palette
    });
  }

  return (
    <section id="experience-lab" className="relative overflow-hidden border-y border-white/[0.055] bg-[#07080c] py-20 sm:py-28">
      <div aria-hidden="true" className="page-grid pointer-events-none absolute inset-0 opacity-25" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-52 top-0 h-[30rem] w-[30rem] rounded-full bg-[#7c5cff]/12 blur-[140px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-48 bottom-0 h-[34rem] w-[34rem] rounded-full bg-[#29d6ff]/9 blur-[150px]" />

      <Container className="relative">
        <div className="grid gap-8 border-b border-white/[0.08] pb-10 lg:grid-cols-[.78fr_1.22fr] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 text-[0.6rem] font-black uppercase tracking-[0.3em] text-[#8be9ff]">
              <WandSparkles className="h-4 w-4" /> Experience Lab
            </p>
            <h2 className="mt-6 max-w-[9ch] font-display text-[clamp(3.4rem,7vw,7.6rem)] font-semibold leading-[0.8] tracking-[-0.08em] text-white">
              Shape the direction before discovery.
            </h2>
          </div>
          <div className="max-w-3xl lg:justify-self-end">
            <p className="text-base leading-8 text-white/44 sm:text-lg sm:leading-9">
              Choose a scene, palette, interaction, atmosphere, and motion level. GridSpell keeps the approved combinations usable while showing how the same strategy can feel completely different.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-[0.55rem] uppercase tracking-[0.17em] text-white/28">
              <span className="rounded-full border border-white/[0.08] px-3 py-2">Live combinations</span>
              <span className="rounded-full border border-white/[0.08] px-3 py-2">Shareable URL</span>
              <span className="rounded-full border border-white/[0.08] px-3 py-2">Discovery context</span>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-8 xl:grid-cols-[0.72fr_1.28fr]">
          <div className="grid content-start gap-5">
            <div className="rounded-[2rem] border border-white/[0.08] bg-white/[0.025] p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Palette className="h-4 w-4 text-[#8be9ff]" />
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/58">
                    Scene
                  </h3>
                </div>
                <span className="text-[0.5rem] uppercase tracking-[0.16em] text-white/24">
                  {scene.label}
                </span>
              </div>
              <div className="mt-5 grid gap-2">
                {experienceScenes.map((item) => (
                  <SelectionButton
                    key={item.id}
                    selected={configuration.scene === item.id}
                    label={item.label}
                    onClick={() =>
                      selectConfiguration({ ...configuration, scene: item.id })
                    }
                  />
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/[0.08] bg-white/[0.025] p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Palette className="h-4 w-4 text-[#8be9ff]" />
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/58">
                    Palette
                  </h3>
                </div>
                <span className="text-[0.5rem] uppercase tracking-[0.16em] text-white/24">
                  {palette.label}
                </span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-2">
                {experiencePalettes.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={configuration.palette === item.id}
                    onClick={() =>
                      selectConfiguration({ ...configuration, palette: item.id })
                    }
                    className={cn(
                      "rounded-2xl border p-3 text-left transition",
                      configuration.palette === item.id
                        ? "border-[#8be9ff]/30 bg-[#8be9ff]/10"
                        : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"
                    )}
                  >
                    <span className="flex gap-1.5" aria-hidden="true">
                      {[item.primary, item.secondary, item.accent].map((color) => (
                        <span
                          key={color}
                          className="h-5 flex-1 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </span>
                    <span className="mt-3 block text-xs font-semibold text-white/62">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/[0.08] bg-white/[0.025] p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <MousePointer2 className="h-4 w-4 text-[#8be9ff]" />
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/58">
                    Button
                  </h3>
                </div>
                <span className="text-[0.5rem] uppercase tracking-[0.16em] text-white/24">
                  {buttonEffect.label}
                </span>
              </div>
              <div className="mt-5 grid gap-2">
                {buttonEffects.map((item) => (
                  <SelectionButton
                    key={item.id}
                    selected={configuration.buttonEffect === item.id}
                    label={item.label}
                    onClick={() =>
                      selectConfiguration({ ...configuration, buttonEffect: item.id })
                    }
                  />
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/[0.08] bg-white/[0.025] p-5 sm:p-6">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/58">
                Atmosphere
              </h3>
              <div className="mt-5 grid gap-2">
                {backgroundOptions.map((item) => (
                  <SelectionButton
                    key={item.id}
                    selected={configuration.background === item.id}
                    label={item.label}
                    onClick={() =>
                      selectConfiguration({ ...configuration, background: item.id })
                    }
                  />
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/[0.08] bg-white/[0.025] p-5 sm:p-6">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/58">
                Motion
              </h3>
              <div className="mt-5 grid grid-cols-3 gap-2">
                {motionOptions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={configuration.motion === item.id}
                    onClick={() =>
                      selectConfiguration({ ...configuration, motion: item.id })
                    }
                    className={cn(
                      "rounded-2xl border px-3 py-3 text-xs font-semibold transition",
                      configuration.motion === item.id
                        ? "border-[#8be9ff]/30 bg-[#8be9ff]/10 text-white"
                        : "border-white/[0.08] bg-white/[0.02] text-white/46 hover:border-white/20 hover:text-white"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              <button
                type="button"
                onClick={() => selectConfiguration(randomApprovedConfiguration(configuration))}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.035] px-5 text-sm font-semibold text-white/64 transition hover:border-white/20 hover:text-white"
              >
                <Shuffle className="h-4 w-4" /> Surprise me
              </button>
              <button
                type="button"
                onClick={copyDirection}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#8be9ff]/18 bg-[#8be9ff]/7 px-5 text-sm font-semibold text-[#8be9ff] transition hover:border-[#8be9ff]/30"
              >
                <Copy className="h-4 w-4" /> {copied ? "Copied" : "Copy direction"}
              </button>
            </div>
          </div>

          <div className="min-w-0">
            <ScenePreview
              scene={scene}
              palette={palette}
              background={background}
              buttonEffect={buttonEffect}
              motionLevel={motionOption.id}
            />

            <div className="mt-5 grid gap-4 rounded-[2rem] border border-white/[0.08] bg-white/[0.025] p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6">
              <div>
                <p className="text-[0.56rem] font-semibold uppercase tracking-[0.2em] text-[#8be9ff]">
                  Current direction
                </p>
                <p className="mt-2 text-sm leading-7 text-white/44">
                  {scene.label} · {palette.label} · {buttonEffect.label} · {background.label} · {motionOption.label}
                </p>
              </div>
              <Link
                href={projectUrl}
                onClick={() =>
                  trackAnalyticsEvent("experience_lab_start_project", {
                    scene: configuration.scene,
                    palette: configuration.palette
                  })
                }
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#7c5cff] to-[#29d6ff] px-5 text-sm font-semibold text-white shadow-[0_18px_55px_rgba(92,104,255,.24)] transition hover:-translate-y-0.5"
              >
                Use this direction
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
