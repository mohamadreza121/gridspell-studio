import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  MousePointer2,
  Palette,
  Shuffle,
  WandSparkles
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import {
  backgroundOptions,
  buttonEffects,
  experiencePalettes,
  experienceScenes,
  motionOptions
} from "@/config/experience-lab";
import { featuredProjects, type FeaturedProject } from "@/config/work";

function startProjectHref(project: FeaturedProject) {
  const packageId =
    project.slug === "gridspell-studio"
      ? "custom"
      : project.slug === "network-engineering-portfolio"
        ? "launch"
        : "growth";
  const params = new URLSearchParams({ package: packageId, source: project.slug });

  return `/start-project?${params.toString()}`;
}

function StaticExperienceLab() {
  const selectedScene = experienceScenes[0];
  const selectedPalette = experiencePalettes[0];

  return (
    <section className="relative border-t border-white/[0.08] py-20 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-12rem] top-10 h-[28rem] w-[28rem] rounded-full bg-[#7c5cff]/12 blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-14rem] bottom-[-10rem] h-[28rem] w-[28rem] rounded-full bg-[#29d6ff]/8 blur-[150px]"
      />

      <div className="relative">
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

            <h2 className="mt-8 text-balance font-display text-[clamp(3.4rem,11vw,7.4rem)] font-semibold leading-[0.82] tracking-[-0.08em] text-white">
              Build your first impression.
            </h2>
          </div>

          <div className="lg:pb-3">
            <p className="max-w-2xl text-base leading-8 text-white/46 sm:text-lg sm:leading-9">
              Choose a direction, tune the atmosphere, and see how strategic design choices
              can completely change the way a business feels online.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/start-project?scene=launch&palette=violet&button=magnetic&background=aurora&motion=expressive"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-r from-[#7c5cff] to-[#29d6ff] px-5 text-sm font-semibold !text-[#05070b] shadow-[0_14px_40px_rgba(41,214,255,0.18)] transition hover:-translate-y-0.5 hover:brightness-110"
              >
                Start with this direction
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/work?scene=creative&palette=ember&button=sweep&background=glass&motion=expressive"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/12 bg-white/[0.035] px-5 text-sm font-semibold text-white/62 transition hover:border-white/22 hover:bg-white/[0.06] hover:text-white"
              >
                <Shuffle className="h-4 w-4" />
                Try another style
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(310px,0.45fr)] xl:items-start">
          <div className="overflow-hidden rounded-[2rem] border border-white/[0.1] bg-[radial-gradient(circle_at_80%_12%,rgba(41,214,255,0.14),transparent_24rem),linear-gradient(145deg,rgba(124,92,255,0.16),rgba(255,255,255,0.03))] p-4 sm:p-6">
            <div className="grid min-h-[250px] gap-4 rounded-[1.45rem] border border-white/10 bg-black/20 p-4 sm:min-h-[330px] sm:grid-cols-[1.05fr_0.95fr]">
              <div className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#080a0f] p-5">
                <div className="absolute right-[-4rem] top-[-4rem] h-40 w-40 rounded-full bg-[#8b6cff]/30 blur-3xl" />
                <div className="relative">
                  <p className="text-[0.55rem] uppercase tracking-[0.22em] text-[#8be9ff]">
                    {selectedScene.eyebrow}
                  </p>
                  <h3 className="mt-5 max-w-[11ch] font-display text-[clamp(2.8rem,12vw,5.8rem)] font-semibold leading-[0.82] tracking-[-0.08em] text-white">
                    {selectedScene.headline}
                  </h3>
                  <p className="mt-5 max-w-md text-sm leading-7 text-white/46">
                    {selectedScene.description}
                  </p>
                </div>
              </div>

              <div className="grid gap-3">
                {selectedScene.proof.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-white/[0.08] bg-white/[0.035] p-4"
                  >
                    <p className="font-mono text-3xl text-white">{item.value}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.16em] text-white/34">
                      {item.label}
                    </p>
                  </div>
                ))}
                <div className="rounded-xl border border-[#8be9ff]/16 bg-[#8be9ff]/7 p-4">
                  <p className="text-[0.55rem] uppercase tracking-[0.2em] text-[#8be9ff]">
                    Selected palette
                  </p>
                  <p className="mt-3 text-lg font-semibold text-white">{selectedPalette.label}</p>
                  <div
                    className="mt-4 h-3 rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${selectedPalette.accent}, ${selectedPalette.accentDeep})`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-white/[0.1] bg-[#0b0d13]/92 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-6">
            <div>
              <p className="text-[0.58rem] font-semibold uppercase tracking-[0.3em] text-[#8be9ff]">
                Creative controls
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.045em] text-white">
                Shape the direction.
              </h3>
            </div>

            <div className="mt-7 grid gap-7">
              <fieldset>
                <legend className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-white/30">
                  01 · Website direction
                </legend>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {experienceScenes.map((scene, index) => (
                    <span
                      key={scene.id}
                      className={`min-h-12 rounded-xl border px-3 py-3 text-xs font-semibold ${index === 0 ? "border-[#8be9ff]/38 bg-[#8be9ff]/8 text-white" : "border-white/[0.08] bg-white/[0.025] text-white/48"}`}
                    >
                      {scene.label}
                    </span>
                  ))}
                </div>
              </fieldset>

              <fieldset className="border-t border-white/[0.07] pt-6">
                <legend className="flex items-center gap-2 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-white/30">
                  <Palette className="h-3.5 w-3.5" />
                  02 · Accent palette
                </legend>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {experiencePalettes.map((palette, index) => (
                    <span
                      key={palette.id}
                      className={`min-h-16 rounded-xl border p-2.5 ${index === 0 ? "border-white/30 bg-white/[0.055]" : "border-white/[0.08] bg-white/[0.02]"}`}
                    >
                      <span
                        className="block h-6 w-full rounded-lg"
                        style={{ background: `linear-gradient(135deg, ${palette.accent}, ${palette.accentDeep})` }}
                      />
                      <span className="mt-2 block truncate text-[0.56rem] text-white/40">
                        {palette.label}
                      </span>
                    </span>
                  ))}
                </div>
              </fieldset>

              <fieldset className="border-t border-white/[0.07] pt-6">
                <legend className="flex items-center gap-2 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-white/30">
                  <MousePointer2 className="h-3.5 w-3.5" />
                  03 · Button response
                </legend>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {buttonEffects.map((effect, index) => (
                    <span
                      key={effect.id}
                      className={`rounded-xl border px-3 py-3 text-left text-xs font-semibold ${index === 0 ? "border-[#8be9ff]/38 bg-[#8be9ff]/8 text-white" : "border-white/[0.08] bg-white/[0.025] text-white/48"}`}
                    >
                      {effect.label}
                      <span className="mt-1 block text-[0.6rem] font-normal text-white/28">
                        {effect.description}
                      </span>
                    </span>
                  ))}
                </div>
              </fieldset>

              <fieldset className="border-t border-white/[0.07] pt-6">
                <legend className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-white/30">
                  04 · Background atmosphere
                </legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {backgroundOptions.map((background, index) => (
                    <span
                      key={background.id}
                      className={`rounded-full border px-3.5 py-2 text-xs font-semibold ${index === 0 ? "border-[#8be9ff]/38 bg-[#8be9ff]/8 text-white" : "border-white/[0.08] bg-white/[0.025] text-white/42"}`}
                    >
                      {background.label}
                    </span>
                  ))}
                </div>
              </fieldset>

              <fieldset className="border-t border-white/[0.07] pt-6">
                <legend className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-white/30">
                  05 · Motion personality
                </legend>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {motionOptions.map((option, index) => (
                    <span
                      key={option.id}
                      className={`rounded-xl border px-3 py-3 text-center text-xs font-semibold ${index === 1 ? "border-[#8be9ff]/38 bg-[#8be9ff]/8 text-white" : "border-white/[0.08] bg-white/[0.025] text-white/48"}`}
                    >
                      {option.label}
                    </span>
                  ))}
                </div>
              </fieldset>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function MiniInterfacePreview({ project }: { project: FeaturedProject }) {
  return (
    <div className="relative overflow-hidden rounded-[1.35rem] border border-white/[0.08] bg-[#07080c] p-4">
      <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3">
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/12" />
        <span className="h-2 w-2 rounded-full bg-white/[0.07]" />
        <span className="ml-auto rounded-full border border-white/[0.08] px-3 py-1 text-[0.52rem] uppercase tracking-[0.16em] text-white/24">
          {project.slug.replaceAll("-", ".")}
        </span>
      </div>

      <div className="mt-5 grid gap-3">
        <div className="h-2 w-20 rounded-full bg-[#8be9ff]/40" />
        <div className="h-8 w-[78%] rounded-xl bg-white/[0.09]" />
        <div className="h-8 w-[58%] rounded-xl bg-white/[0.055]" />
        <div className="mt-2 grid grid-cols-3 gap-2">
          <span className="h-16 rounded-xl border border-white/[0.06] bg-white/[0.035]" />
          <span className="h-16 rounded-xl border border-[#8be9ff]/12 bg-[#8be9ff]/7" />
          <span className="h-16 rounded-xl border border-white/[0.06] bg-white/[0.035]" />
        </div>
      </div>

      <div className="pointer-events-none absolute right-[-4rem] top-[-4rem] h-36 w-36 rounded-full bg-[#7c5cff]/18 blur-3xl" />
    </div>
  );
}

export function WorkStaticFallback() {
  return (
    <main className="relative overflow-hidden bg-[#07080c] pb-24 pt-32">
      <div
        aria-hidden="true"
        className="page-grid pointer-events-none absolute inset-0 opacity-35"
      />

      <Container className="relative">
        <div className="max-w-4xl">
          <p className="text-[0.64rem] font-semibold uppercase tracking-[0.38em] text-[#8be9ff]">
            Selected work
          </p>

          <h1 className="mt-7 text-balance font-display text-[clamp(4rem,12vw,7.5rem)] font-semibold leading-[0.82] tracking-[-0.075em] text-white">
            Designed with a reason.
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-white/45 sm:text-lg">
            Each case study explains the business problem, what GridSpell built,
            the system behind the interface, and the result the website is meant to support.
          </p>
        </div>

        <StaticExperienceLab />

        <div className="grid gap-16">
          {featuredProjects.map((project, index) => (
            <article
              key={project.slug}
              className="border-t border-white/[0.08] pt-8"
            >
              <Link
                href={`/work/${project.slug}`}
                className="group block overflow-hidden rounded-[1.6rem] border border-white/[0.1] bg-[#080a0f]"
              >
                <div className="relative aspect-video overflow-hidden bg-[radial-gradient(circle_at_70%_20%,rgba(41,214,255,.16),transparent_28rem),linear-gradient(145deg,#0b0d13,#11182a)]">
                  {project.previewImage ? (
                    <Image
                      src={project.previewImage}
                      alt={project.previewAlt ?? `${project.title} website preview`}
                      fill
                      sizes="(min-width: 1024px) 70vw, 92vw"
                      className="object-cover object-top transition duration-500 group-hover:scale-[1.015]"
                      priority={index === 0}
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center p-8 text-center">
                      <p className="max-w-[14ch] font-display text-[clamp(2.2rem,7vw,5.5rem)] font-semibold leading-[0.9] tracking-[-0.065em] text-white">
                        {project.title}
                      </p>
                    </div>
                  )}
                </div>
              </Link>

              <div className="mt-7">
                <p className="font-mono text-[0.62rem] tracking-[0.2em] text-[#8be9ff]">
                  {String(index + 1).padStart(2, "0")} · {project.category}
                </p>

                <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.055em] text-white sm:text-5xl">
                  {project.title}
                </h2>

                <p className="mt-5 max-w-2xl text-base leading-8 text-white/44">
                  {project.description}
                </p>

                {project.proof ? (
                  <div className="mt-7 grid gap-4 lg:grid-cols-3">
                    {([
                      ["Problem", project.proof.problem],
                      ["Built", project.proof.built],
                      ["Result", project.proof.result]
                    ] as const).map(([label, text]) => (
                      <div key={label} className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
                        <p className="text-[0.56rem] font-semibold uppercase tracking-[0.2em] text-white/25">{label}</p>
                        <p className="mt-3 text-sm leading-7 text-white/43">{text}</p>
                      </div>
                    ))}
                  </div>
                ) : null}

                {project.proof ? (
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {project.proof.features.map((feature) => (
                      <li key={feature} className="flex gap-3 text-sm leading-7 text-white/52">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#8be9ff]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                ) : null}

                <div className="mt-7 flex flex-wrap gap-4">
                  <Link
                    href={`/work/${project.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#8be9ff]"
                  >
                    View case study
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href={startProjectHref(project)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white/56"
                  >
                    Start similar project
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>

                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-white/50"
                    >
                      Live website
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </main>
  );
}
