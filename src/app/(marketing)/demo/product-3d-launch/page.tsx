import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Box, CheckCircle2, Cpu, Rocket, ShoppingBag, Sparkles, Zap } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { getLandingPageConcept } from "@/config/landing-pages";
import { createPageMetadata } from "@/lib/metadata";

const concept = getLandingPageConcept("product-3d-launch");

export const metadata: Metadata = createPageMetadata({
  title: "3D Product Launch Landing Page Demo",
  description:
    "A premium product launch landing page demo with a lightweight CSS 3D hero, specs, benefits, and waitlist CTAs.",
  path: "/demo/product-3d-launch"
});

const specs = ["12 hour battery", "Titanium shell", "AI-ready sensors", "Magnetic dock"] as const;
const benefits = [
  [Zap, "Visual first", "Create a memorable hero without loading a heavy 3D library in the gallery."],
  [Cpu, "Spec sections", "Show the product story, technical proof, and key details cleanly."],
  [ShoppingBag, "Preorder path", "Move visitors toward preorders, waitlist, or launch notifications."]
] as const;

function startHref() {
  const params = new URLSearchParams({
    package: "landing-page",
    source: "product-3d-launch",
    design: concept?.title ?? "3D Product Launch"
  });

  return `/start-project?${params.toString()}`;
}

function ProductCube() {
  return (
    <div className="relative mx-auto h-[22rem] w-[22rem] max-w-full [perspective:1200px] sm:h-[30rem] sm:w-[30rem]">
      <div aria-hidden="true" className="absolute inset-12 rounded-full bg-cyan-300/25 blur-3xl" />
      <div aria-hidden="true" className="absolute bottom-10 left-1/2 h-16 w-64 -translate-x-1/2 rounded-[50%] bg-black/55 blur-2xl" />

      <div
        className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d] sm:h-60 sm:w-60"
        style={{ transform: "translate(-50%, -50%) rotateX(58deg) rotateZ(-38deg)" }}
      >
        <div className="absolute inset-0 rounded-[2rem] border border-cyan-200/25 bg-[linear-gradient(135deg,rgba(34,211,238,0.92),rgba(139,92,246,0.78))] shadow-[0_0_80px_rgba(34,211,238,0.28)]" />
        <div
          className="absolute inset-0 rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(139,92,246,0.88),rgba(3,7,18,0.9))]"
          style={{ transform: "translateZ(-76px) translateX(76px)" }}
        />
        <div
          className="absolute inset-0 rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(14,165,233,0.82),rgba(3,7,18,0.85))]"
          style={{ transform: "rotateY(90deg) translateZ(76px)" }}
        />
        <div
          className="absolute inset-0 rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(124,58,237,0.75),rgba(3,7,18,0.9))]"
          style={{ transform: "rotateX(90deg) translateZ(76px)" }}
        />
        <div className="absolute left-8 top-8 h-8 w-8 rounded-full border border-white/25 bg-white/20" />
        <div className="absolute bottom-8 left-8 right-8 h-3 rounded-full bg-white/25" />
      </div>

      <div className="absolute left-4 top-8 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-xs text-white/65 backdrop-blur">
        3D hero
      </div>
      <div className="absolute bottom-16 right-4 rounded-2xl border border-cyan-200/20 bg-cyan-200/10 px-4 py-3 text-xs text-cyan-100 backdrop-blur">
        Waitlist-ready
      </div>
    </div>
  );
}

export default function Product3DLaunchDemoPage() {
  return (
    <main className="overflow-hidden bg-[#030712] text-white">
      <section className="relative min-h-svh overflow-hidden pt-8">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_48%_0%,rgba(34,211,238,0.26),transparent_34rem),radial-gradient(circle_at_82%_50%,rgba(139,92,246,0.22),transparent_34rem)]" />
        <div aria-hidden="true" className="page-grid pointer-events-none absolute inset-0 opacity-20" />

        <Container className="relative">
          <nav className="flex items-center justify-between rounded-full border border-white/[0.1] bg-white/[0.045] px-4 py-3 backdrop-blur md:px-6">
            <Link href="/landing-pages" className="inline-flex items-center gap-2 text-sm font-semibold text-white/55 transition hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              Gallery
            </Link>
            <div className="hidden items-center gap-6 text-sm font-semibold text-white/45 md:flex">
              <a href="#benefits">Benefits</a>
              <a href="#specs">Specs</a>
              <a href="#waitlist">Waitlist</a>
            </div>
            <Link href={startHref()} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-bold text-[#030712] transition hover:-translate-y-0.5">
              Start with this design
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </nav>

          <div className="grid min-h-[calc(100svh-6rem)] items-center gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan-100">
                <Sparkles className="h-4 w-4" />
                3D launch demo
              </p>
              <h1 className="mt-7 max-w-[10ch] font-display text-[clamp(4rem,9vw,8.8rem)] font-semibold leading-[0.78] tracking-[-0.08em]">
                Make the product feel impossible to ignore.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/52 sm:text-xl sm:leading-9">
                A premium product launch direction with a lightweight CSS 3D hero, feature storytelling, specs, and a waitlist-focused conversion path.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link href={startHref()} className="inline-flex min-h-13 items-center gap-2 rounded-full bg-[linear-gradient(135deg,#22d3ee,#8b5cf6)] px-6 text-sm font-bold text-white shadow-[0_18px_70px_rgba(34,211,238,0.22)] transition hover:-translate-y-0.5">
                  Start with this design
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <a href="#specs" className="inline-flex min-h-13 items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-6 text-sm font-bold text-white/72 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white">
                  View specs
                </a>
              </div>
            </div>

            <ProductCube />
          </div>
        </Container>
      </section>

      <section id="benefits" className="border-y border-white/[0.06] py-24">
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            {benefits.map(([Icon, title, copy]) => (
              <article key={title} className="rounded-[1.7rem] border border-white/[0.08] bg-white/[0.035] p-6">
                <Icon className="h-6 w-6 text-cyan-200" />
                <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.055em]">{title}</h2>
                <p className="mt-4 text-sm leading-7 text-white/46">{copy}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="specs" className="py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-200">Product specs</p>
            <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.9] tracking-[-0.06em]">Specs, benefits, and launch urgency in one story.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {specs.map((item) => (
              <article key={item} className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.035] p-6">
                <Box className="h-5 w-5 text-cyan-200" />
                <p className="mt-5 font-display text-2xl font-semibold tracking-[-0.05em]">{item}</p>
                <p className="mt-3 text-sm leading-7 text-white/42">A compact technical proof block for product detail pages.</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="waitlist" className="relative py-24">
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/10 blur-[140px]" />
        <Container className="relative rounded-[2rem] border border-white/[0.1] bg-white/[0.035] p-8 text-center sm:p-12">
          <Rocket className="mx-auto h-8 w-8 text-cyan-200" />
          <h2 className="mx-auto mt-6 max-w-2xl font-display text-5xl font-semibold leading-[0.9] tracking-[-0.065em]">Ready to launch a premium product page?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/48">Use this direction for product drops, tech launches, waitlists, and premium brand campaigns.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={startHref()} className="inline-flex min-h-13 items-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-[#030712] transition hover:-translate-y-0.5">
              Start with this design
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-white/45">
            {["Hero", "Specs", "Waitlist", "FAQ"].map((item) => (
              <span key={item} className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.035] px-4 py-2"><CheckCircle2 className="h-4 w-4 text-cyan-200" />{item}</span>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
