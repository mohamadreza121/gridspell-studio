"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import type { CaseStudyDevice } from "@/config/work-case-studies";
import { cn } from "@/lib/utils";

type DeviceVideoProps = {
  src: string;
  poster?: string;
  label: string;
  className?: string;
};

function DeviceVideo({ src, poster, label, className }: DeviceVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();

  const isInView = useInView(videoRef, {
    amount: 0.22
  });

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (isInView && !reduceMotion) {
      void video.play().catch(() => {
        // Browser may temporarily block playback.
      });
    } else {
      video.pause();
    }
  }, [isInView, reduceMotion]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#020306]">
      <video
        ref={videoRef}
        className={cn(
          "absolute inset-0 h-full w-full object-cover object-center",
          className
        )}
        autoPlay={!reduceMotion}
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        disablePictureInPicture
        controlsList="nodownload noplaybackrate nofullscreen"
        aria-label={label}
      >
        <source src={src} type="video/mp4" />
      </video>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(118deg,rgba(255,255,255,0.04),transparent_22%,transparent_72%,rgba(139,233,255,0.02))]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.06]"
      />
    </div>
  );
}

function LaptopFrame({
  videoSrc,
  posterSrc,
  label,
  videoWidth,
  videoHeight
}: {
  videoSrc: string;
  posterSrc?: string;
  label: string;
  videoWidth: number;
  videoHeight: number;
}) {
  return (
    <div className="relative mx-auto w-full max-w-[1020px] [perspective:1800px]">
      {/* Ambient shadow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[7%] bottom-[-5%] h-[16%] rounded-[50%] bg-black/70 blur-3xl"
      />

      {/* Display lid */}
      <div className="relative mx-auto w-[94%]">
        <div className="relative rounded-[2rem] border border-white/[0.18] bg-[linear-gradient(145deg,#2a2e38_0%,#11141b_24%,#06080d_58%,#252a35_100%)] p-[10px] shadow-[0_48px_130px_rgba(0,0,0,0.58),inset_0_1px_0_rgba(255,255,255,0.18)] sm:p-[12px]">
          {/* Outer metallic highlight */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-[1px] rounded-[calc(2rem-1px)] bg-[linear-gradient(135deg,rgba(255,255,255,0.12),transparent_22%,transparent_76%,rgba(139,233,255,0.05))]"
          />

          {/* Black bezel */}
          <div className="relative overflow-hidden rounded-[1.45rem] border border-black bg-[#020305] p-[7px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] sm:p-[9px]">
            {/* Camera */}
            <div className="absolute left-1/2 top-[3px] z-20 flex -translate-x-1/2 items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#151923] shadow-[0_0_0_1px_rgba(255,255,255,0.05)]" />
              <span className="h-1 w-1 rounded-full bg-[#202c3b]" />
            </div>

            <div className="overflow-hidden rounded-[1.05rem] bg-black">
              <div
                style={{
                  aspectRatio: `${videoWidth} / ${videoHeight}`
                }}
              >
                <DeviceVideo src={videoSrc} poster={posterSrc} label={label} />
              </div>
            </div>

            {/* Bottom display chin */}
            <div className="relative flex h-5 items-center justify-center">
              <span className="h-1.5 w-1.5 rounded-full border border-white/[0.08] bg-white/[0.025]" />
            </div>
          </div>
        </div>
      </div>

      {/* Hinge */}
      <div className="relative z-10 mx-auto -mt-[2px] flex h-3 w-[84%] items-start justify-center">
        <div className="h-2 w-[17%] rounded-b-full bg-[linear-gradient(180deg,#343945,#11141a)] shadow-[0_3px_8px_rgba(0,0,0,0.55)]" />
      </div>

      {/* Laptop base */}
      <div className="relative mx-auto -mt-1 w-full">
        <div
          className="relative h-7 border-x border-b border-white/[0.1] bg-[linear-gradient(180deg,#2b303a_0%,#171a21_35%,#090b10_100%)] shadow-[0_22px_45px_rgba(0,0,0,0.48)]"
          style={{
            clipPath:
              "polygon(5.5% 0%, 94.5% 0%, 100% 82%, 98.5% 100%, 1.5% 100%, 0% 82%)"
          }}
        >
          <div className="absolute left-1/2 top-0 h-[3px] w-[16%] -translate-x-1/2 rounded-b-full bg-black/45" />

          <div className="absolute inset-x-[18%] top-[6px] h-[1px] bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />

          {/* Trackpad indentation */}
          <div className="absolute left-1/2 top-[5px] h-3 w-[16%] -translate-x-1/2 rounded-b-lg border-x border-b border-black/35 bg-black/[0.08]" />
        </div>

        <div className="mx-auto h-[5px] w-[93%] rounded-b-[70%] bg-[linear-gradient(180deg,#12151b,#050609)]" />
      </div>

      {/* Floor reflection */}
      <div
        aria-hidden="true"
        className="pointer-events-none mx-auto mt-5 h-12 w-[82%] rounded-[50%] bg-[radial-gradient(ellipse,rgba(124,92,255,0.13),transparent_68%)] blur-xl"
      />
    </div>
  );
}

function TabletFrame({
  videoSrc,
  posterSrc,
  label,
  videoWidth,
  videoHeight
}: {
  videoSrc: string;
  posterSrc?: string;
  label: string;
  videoWidth: number;
  videoHeight: number;
}) {
  return (
    <div className="relative mx-auto w-full max-w-[680px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[9%] bottom-[-7%] h-[14%] rounded-[50%] bg-black/65 blur-3xl"
      />

      {/* Top button */}
      <div className="absolute -top-[3px] right-[17%] z-20 h-[4px] w-14 rounded-t-md bg-[#343945]" />

      {/* Side controls */}
      <div className="absolute -right-[4px] top-[20%] z-20 grid gap-3">
        <span className="h-14 w-[4px] rounded-r-md bg-[linear-gradient(90deg,#171a20,#3a404b)]" />
        <span className="h-9 w-[4px] rounded-r-md bg-[linear-gradient(90deg,#171a20,#3a404b)]" />
      </div>

      {/* Frame */}
      <div className="relative rounded-[2.65rem] border border-white/[0.2] bg-[linear-gradient(145deg,#383e49_0%,#151820_20%,#07090e_60%,#2d333e_100%)] p-[12px] shadow-[0_48px_125px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.2)] sm:p-[14px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-[1px] rounded-[calc(2.65rem-1px)] bg-[linear-gradient(135deg,rgba(255,255,255,0.13),transparent_24%,transparent_72%,rgba(41,214,255,0.05))]"
        />

        <div className="relative overflow-hidden rounded-[2rem] border border-black bg-[#020305] p-[7px]">
          {/* Camera */}
          <div className="absolute left-1/2 top-[4px] z-20 h-2 w-2 -translate-x-1/2 rounded-full border border-white/[0.05] bg-[#0a0d12]">
            <span className="absolute inset-[2px] rounded-full bg-[#15283b]" />
          </div>

          <div className="overflow-hidden rounded-[1.65rem]">
            <div
              style={{
                aspectRatio: `${videoWidth} / ${videoHeight}`
              }}
            >
              <DeviceVideo src={videoSrc} poster={posterSrc} label={label} />
            </div>
          </div>
        </div>
      </div>

      {/* Tablet reflection */}
      <div
        aria-hidden="true"
        className="pointer-events-none mx-auto mt-6 h-14 w-[78%] rounded-[50%] bg-[radial-gradient(ellipse,rgba(41,214,255,0.09),transparent_66%)] blur-xl"
      />
    </div>
  );
}

function PhoneFrame({
  videoSrc,
  posterSrc,
  label,
  videoWidth,
  videoHeight
}: {
  videoSrc: string;
  posterSrc?: string;
  label: string;
  videoWidth: number;
  videoHeight: number;
}) {
  return (
    <div className="relative mx-auto w-full max-w-[325px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[12%] bottom-[-7%] h-[14%] rounded-[50%] bg-black/70 blur-2xl"
      />

      {/* Left buttons */}
      <div className="absolute -left-[5px] top-[20%] z-20 grid gap-3">
        <span className="h-8 w-[5px] rounded-l-md bg-[linear-gradient(270deg,#1c2028,#424955)]" />
        <span className="h-14 w-[5px] rounded-l-md bg-[linear-gradient(270deg,#1c2028,#424955)]" />
        <span className="h-14 w-[5px] rounded-l-md bg-[linear-gradient(270deg,#1c2028,#424955)]" />
      </div>

      {/* Right button */}
      <div className="absolute -right-[5px] top-[27%] z-20">
        <span className="block h-20 w-[5px] rounded-r-md bg-[linear-gradient(90deg,#1c2028,#424955)]" />
      </div>

      {/* Phone shell */}
      <div className="relative rounded-[3.35rem] border border-white/[0.22] bg-[linear-gradient(145deg,#454c58_0%,#161920_18%,#05070b_58%,#343a45_100%)] p-[8px] shadow-[0_48px_125px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.22)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-[1px] rounded-[calc(3.35rem-1px)] bg-[linear-gradient(130deg,rgba(255,255,255,0.16),transparent_25%,transparent_73%,rgba(124,92,255,0.07))]"
        />

        {/* Antenna marks */}
        <span className="absolute left-[17%] top-0 h-[2px] w-8 bg-black/45" />
        <span className="absolute right-[17%] top-0 h-[2px] w-8 bg-black/45" />
        <span className="absolute bottom-0 left-[17%] h-[2px] w-8 bg-black/45" />
        <span className="absolute bottom-0 right-[17%] h-[2px] w-8 bg-black/45" />

        <div className="relative overflow-hidden rounded-[2.88rem] border border-black bg-black p-[3px]">
          {/* Dynamic Island */}
          <div className="absolute left-1/2 top-3 z-30 flex h-7 w-[31%] -translate-x-1/2 items-center justify-end rounded-full border border-white/[0.025] bg-[#020204] px-2 shadow-[0_1px_5px_rgba(0,0,0,0.8)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#102033] shadow-[0_0_0_1px_rgba(255,255,255,0.03)]" />
          </div>

          <div className="overflow-hidden rounded-[2.65rem] bg-black">
            <div
              className="px-[3px] pb-[3px] pt-[36px]"
              style={{
                aspectRatio: `${videoWidth} / ${videoHeight}`
              }}
            >
              <div className="h-full overflow-hidden rounded-[2.4rem]">
                <DeviceVideo
                  src={videoSrc}
                  poster={posterSrc}
                  label={label}
                />
              </div>
            </div>
          </div>

          {/* Home indicator */}
          <div className="pointer-events-none absolute bottom-2.5 left-1/2 z-30 h-1 w-[31%] -translate-x-1/2 rounded-full bg-white/65 shadow-[0_1px_4px_rgba(0,0,0,0.5)]" />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none mx-auto mt-6 h-12 w-[76%] rounded-[50%] bg-[radial-gradient(ellipse,rgba(124,92,255,0.13),transparent_66%)] blur-xl"
      />
    </div>
  );
}

function DeviceFrame({ item }: { item: CaseStudyDevice }) {
  const label = `${item.title} — ${item.eyebrow}`;

  if (item.device === "laptop") {
    return (
      <LaptopFrame
        videoSrc={item.videoSrc}
        posterSrc={item.posterSrc}
        label={label}
        videoWidth={item.videoWidth}
        videoHeight={item.videoHeight}
      />
    );
  }

  if (item.device === "tablet") {
    return (
      <TabletFrame
        videoSrc={item.videoSrc}
        posterSrc={item.posterSrc}
        label={label}
        videoWidth={item.videoWidth}
        videoHeight={item.videoHeight}
      />
    );
  }

  return (
    <PhoneFrame
      videoSrc={item.videoSrc}
      posterSrc={item.posterSrc}
      label={label}
      videoWidth={item.videoWidth}
      videoHeight={item.videoHeight}
    />
  );
}

const deviceDetails: Record<
  CaseStudyDevice["device"],
  {
    name: string;
    specification: string;
    backgroundLabel: string;
  }
> = {
  laptop: {
    name: "Laptop",
    specification: "16:10 desktop presentation",
    backgroundLabel: "DESKTOP"
  },
  tablet: {
    name: "Tablet",
    specification: "4:3 touch experience",
    backgroundLabel: "TABLET"
  },
  phone: {
    name: "Phone",
    specification: "9:19.5 mobile experience",
    backgroundLabel: "MOBILE"
  }
};

export function DeviceShowcase({ devices }: { devices: CaseStudyDevice[] }) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative bg-[#07080c]">
      {devices.map((item, index) => {
        const detail = deviceDetails[item.device];
        const reversed = index % 2 === 1;

        return (
          <section
            key={item.id}
            className="relative min-h-[145svh] border-t border-white/[0.055]"
          >
            <div className="sticky top-0 flex min-h-svh items-center overflow-hidden pb-16 pt-32 sm:pt-36">
              {/* Large background typography */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-display text-[clamp(8rem,19vw,24rem)] font-semibold tracking-[-0.09em] text-white/[0.018]"
              >
                {detail.backgroundLabel}
              </div>

              {/* Background grid */}
              <div
                aria-hidden="true"
                className="page-grid pointer-events-none absolute inset-0 opacity-30"
              />

              {/* Ambient lighting */}
              <div
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute top-[16%] h-[34rem] w-[34rem] rounded-full blur-[150px]",
                  reversed ? "left-[8%] bg-[#29d6ff]/8" : "right-[8%] bg-[#7c5cff]/12"
                )}
              />

              <div
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute bottom-[5%] h-[28rem] w-[28rem] rounded-full blur-[140px]",
                  reversed ? "right-[4%] bg-[#7c5cff]/10" : "left-[4%] bg-[#29d6ff]/7"
                )}
              />

              <Container
                className={cn(
                  "relative grid w-full items-center gap-14 xl:gap-20",
                  item.device === "phone"
                    ? "xl:grid-cols-[0.82fr_1.18fr]"
                    : "xl:grid-cols-[0.58fr_1.42fr]"
                )}
              >
                {/* Text */}
                <motion.div
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          x: reversed ? 45 : -45,
                          y: 20
                        }
                  }
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    y: 0
                  }}
                  viewport={{
                    once: true,
                    amount: 0.35
                  }}
                  transition={{
                    duration: 0.75,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className={cn("max-w-xl", reversed && "xl:order-2")}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[0.62rem] tracking-[0.22em] text-white/30">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="h-px w-10 bg-gradient-to-r from-[#7c5cff] to-[#29d6ff]" />

                    <span className="text-[0.64rem] font-semibold uppercase tracking-[0.3em] text-[#8be9ff]">
                      {item.eyebrow}
                    </span>
                  </div>

                  <h2 className="mt-7 text-balance font-display text-[clamp(2.8rem,4.7vw,5.8rem)] font-semibold leading-[0.88] tracking-[-0.068em] text-white">
                    {item.title}
                  </h2>

                  <p className="mt-7 max-w-lg text-base leading-8 text-white/46 sm:text-lg">
                    {item.description}
                  </p>

                  <div className="mt-9 flex flex-wrap gap-3">
                    <span className="rounded-full border border-white/[0.09] bg-white/[0.025] px-4 py-2 text-[0.62rem] uppercase tracking-[0.2em] text-white/42">
                      {detail.name}
                    </span>

                    <span className="rounded-full border border-white/[0.09] bg-white/[0.025] px-4 py-2 text-[0.62rem] uppercase tracking-[0.2em] text-white/42">
                      {detail.specification}
                    </span>
                  </div>
                </motion.div>

                {/* Device */}
                <motion.div
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          x: reversed ? -55 : 55,
                          y: 45,
                          scale: 0.94,
                          rotateY: reversed ? 5 : -5
                        }
                  }
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotateY: 0
                  }}
                  viewport={{
                    once: true,
                    amount: 0.25
                  }}
                  transition={{
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className={cn(
                    "relative [transform-style:preserve-3d]",
                    reversed && "xl:order-1"
                  )}
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-[8%] rounded-[4rem] bg-[radial-gradient(circle_at_50%_45%,rgba(124,92,255,0.17),rgba(41,214,255,0.06)_40%,transparent_72%)] blur-3xl"
                  />

                  <div className="relative">
                    <DeviceFrame item={item} />
                  </div>
                </motion.div>
              </Container>

              {/* Section progress */}
              <div className="pointer-events-none absolute bottom-8 left-1/2 hidden w-[min(42rem,65vw)] -translate-x-1/2 items-center gap-4 xl:flex">
                <span className="font-mono text-[0.56rem] tracking-[0.2em] text-white/24">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="h-px flex-1 bg-white/[0.08]">
                  <div
                    className="h-full bg-gradient-to-r from-[#7c5cff] to-[#29d6ff]"
                    style={{
                      width: `${((index + 1) / devices.length) * 100}%`
                    }}
                  />
                </div>

                <span className="font-mono text-[0.56rem] tracking-[0.2em] text-white/24">
                  {String(devices.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </section>
        );
      })}
    </section>
  );
}
