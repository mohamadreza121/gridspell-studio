import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import type { CaseStudyDevice } from "@/config/work-case-studies";

const deviceLabels: Record<CaseStudyDevice["device"], string> = {
  laptop: "Desktop screen",
  tablet: "Tablet screen",
  phone: "Phone screen"
};

export function SmallPhoneDeviceShowcase({
  devices
}: {
  devices: CaseStudyDevice[];
}) {
  return (
    <section className="small-phone-case-study">
      <div aria-hidden="true" className="page-grid pointer-events-none absolute inset-0 opacity-24" />
      <div aria-hidden="true" className="pointer-events-none absolute right-[-8rem] top-28 h-72 w-72 rounded-full bg-[#29d6ff]/8 blur-[90px]" />
      <div aria-hidden="true" className="pointer-events-none absolute left-[-9rem] top-[42rem] h-72 w-72 rounded-full bg-[#7c5cff]/12 blur-[90px]" />

      <Container className="relative">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-[#8be9ff]">
          Responsive screens
        </p>
        <h2 className="mt-5 max-w-[11ch] font-display text-[clamp(2.8rem,15vw,4rem)] font-semibold leading-[0.88] tracking-[-0.07em] text-white">
          The site across every device.
        </h2>
        <p className="mt-5 text-sm leading-7 text-white/46">
          Small phones use direct video cards instead of the heavy cinematic device
          frames, so the desktop, tablet, and phone previews remain visible and easy to play.
        </p>

        <div className="mt-8 grid gap-5">
          {devices.map((item, index) => (
            <article key={item.id} className="small-phone-card">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[0.56rem] font-semibold uppercase tracking-[0.22em] text-[#8be9ff]">
                    {String(index + 1).padStart(2, "0")} · {deviceLabels[item.device]}
                  </p>
                  <h3 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-[-0.055em] text-white">
                    {item.title}
                  </h3>
                </div>
                <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-[#8be9ff]" aria-hidden="true" />
              </div>

              <p className="mt-4 text-sm leading-7 text-white/46">{item.description}</p>

              <div className="mt-5 overflow-hidden rounded-[1.15rem] border border-white/[0.1] bg-black">
                <video
                  className="w-full bg-black object-contain"
                  style={{ aspectRatio: `${item.videoWidth} / ${item.videoHeight}` }}
                  controls
                  muted
                  playsInline
                  preload="metadata"
                  poster={item.posterSrc}
                  aria-label={`${item.title} video preview`}
                >
                  <source src={item.videoSrc} type="video/mp4" />
                </video>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
