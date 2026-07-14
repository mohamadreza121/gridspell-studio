import Link from "next/link";
import type { CSSProperties } from "react";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BellRing,
  Braces,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Code2,
  Database,
  Gauge,
  Layers3,
  LayoutDashboard,
  LockKeyhole,
  MessageSquareText,
  Monitor,
  MousePointerClick,
  RefreshCw,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Workflow,
  Wrench,
  type LucideIcon
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import type { PricingPackage } from "@/config/packages";
import type { Service } from "@/config/services";

import styles from "./ModernServiceExperience.module.css";

type ModernServiceSlug =
  | "website-redesign"
  | "landing-pages"
  | "client-portals"
  | "full-stack-apps"
  | "care-plans";

type ServiceWorld = {
  slug: ModernServiceSlug;
  eyebrow: string;
  heroTitle: string;
  heroLead: string;
  tags: readonly string[];
  accent: string;
  accentRgb: string;
  accent2: string;
  accent2Rgb: string;
  visual: "redesign" | "landing" | "portal" | "app" | "care";
  metrics: readonly { label: string; value: string; note: string }[];
  shiftBefore: string;
  shiftAfter: string;
  decisionTitle: string;
  decisionLead: string;
  cards: readonly {
    title: string;
    text: string;
    icon: LucideIcon;
  }[];
  ctaLabel: string;
};

type ServiceStyle = CSSProperties & {
  "--svc-accent": string;
  "--svc-accent-rgb": string;
  "--svc-accent-2": string;
  "--svc-accent-2-rgb": string;
};

type ModernServiceExperienceProps = {
  service: Service;
  recommendedPackage?: PricingPackage;
  relatedServices: readonly Service[];
};

const serviceWorlds: Record<ModernServiceSlug, ServiceWorld> = {
  "website-redesign": {
    slug: "website-redesign",
    eyebrow: "Strategic relaunch",
    heroTitle: "Turn the current website into the version the business has grown into.",
    heroLead:
      "A redesign that fixes the message, structure, mobile experience, performance, and launch path—not just the colour palette.",
    tags: ["Audit", "Reframe", "Relaunch"],
    accent: "#9a86ff",
    accentRgb: "154 134 255",
    accent2: "#ff79c9",
    accent2Rgb: "255 121 201",
    visual: "redesign",
    metrics: [
      { label: "Current friction", value: "Mapped", note: "Pages, message, mobile, search" },
      { label: "Migration risk", value: "Controlled", note: "Redirects and launch checks" },
      { label: "New direction", value: "Measured", note: "Clarity before decoration" }
    ],
    shiftBefore: "Outdated pages, mixed messaging, weak hierarchy, and a mobile experience that feels like an afterthought.",
    shiftAfter: "A sharper brand, clearer service paths, stronger proof, and a safer relaunch built around real business goals.",
    decisionTitle: "A redesign should change the decision—not only the surface.",
    decisionLead:
      "Every improvement is tied to how customers understand the offer, compare the business, and move toward the next step.",
    cards: [
      { title: "Audit the friction", text: "Find the pages, messages, and mobile moments making the business feel harder to trust.", icon: Search },
      { title: "Rebuild the hierarchy", text: "Give the offer, proof, services, and calls to action a clearer order.", icon: Layers3 },
      { title: "Protect the relaunch", text: "Plan redirects, metadata, analytics, QA, and launch checks before replacing the old site.", icon: ShieldCheck },
      { title: "Create room to grow", text: "Use reusable page systems so future services and content do not require another rebuild.", icon: RefreshCw }
    ],
    ctaLabel: "Plan the redesign"
  },
  "landing-pages": {
    slug: "landing-pages",
    eyebrow: "Campaign conversion system",
    heroTitle: "A focused page that turns campaign attention into one measurable action.",
    heroLead:
      "One offer, one audience, one conversion path—supported by proof, tracking, and a visual direction built for the campaign.",
    tags: ["Offer", "Proof", "Conversion"],
    accent: "#ff916d",
    accentRgb: "255 145 109",
    accent2: "#ffcf62",
    accent2Rgb: "255 207 98",
    visual: "landing",
    metrics: [
      { label: "Primary action", value: "One", note: "No competing paths" },
      { label: "Message focus", value: "Tight", note: "Offer-specific structure" },
      { label: "Tracking", value: "Ready", note: "Events and form flow" }
    ],
    shiftBefore: "Campaign traffic lands on a general homepage with too many choices and not enough offer-specific proof.",
    shiftAfter: "Every section moves the same audience from attention to understanding, trust, and one clear action.",
    decisionTitle: "The page should behave like the campaign has a job to do.",
    decisionLead:
      "The offer, objections, proof, form, and tracking plan are designed as one conversion system rather than separate pieces.",
    cards: [
      { title: "Frame the offer", text: "Make the promise, audience, and value understandable within the first few seconds.", icon: Sparkles },
      { title: "Control the path", text: "Remove distractions and guide visitors through one deliberate narrative.", icon: MousePointerClick },
      { title: "Answer objections", text: "Use proof, process, FAQs, and specifics exactly where hesitation usually appears.", icon: MessageSquareText },
      { title: "Measure the action", text: "Connect forms, booking, analytics events, and campaign review from launch.", icon: Gauge }
    ],
    ctaLabel: "Start a landing page"
  },
  "client-portals": {
    slug: "client-portals",
    eyebrow: "Secure client workspace",
    heroTitle: "Give clients one secure place to see progress and move work forward.",
    heroLead:
      "Projects, files, messages, approvals, tasks, and billing brought into a clear role-based workspace instead of scattered tools.",
    tags: ["Access", "Workflow", "Visibility"],
    accent: "#59e6d0",
    accentRgb: "89 230 208",
    accent2: "#43a9ff",
    accent2Rgb: "67 169 255",
    visual: "portal",
    metrics: [
      { label: "Access model", value: "Role-based", note: "Only the right people see it" },
      { label: "Project status", value: "Visible", note: "Fewer update emails" },
      { label: "Admin work", value: "Reduced", note: "Clearer client handoffs" }
    ],
    shiftBefore: "Updates, files, approvals, and questions live across email threads, cloud folders, messages, and spreadsheets.",
    shiftAfter: "Clients know where to look, teams know what is waiting, and every important project action has a visible home.",
    decisionTitle: "A portal should remove friction from the relationship—not add another login.",
    decisionLead:
      "The workspace is shaped around the real client journey, including what clients need to see and what the team needs to manage.",
    cards: [
      { title: "Clarify ownership", text: "Show what is active, waiting, approved, or blocked without another status meeting.", icon: LayoutDashboard },
      { title: "Protect access", text: "Use authentication, roles, permissions, and account states appropriate to the workflow.", icon: LockKeyhole },
      { title: "Centralize exchange", text: "Keep files, messages, milestones, and approvals connected to the right project.", icon: Workflow },
      { title: "Support operations", text: "Give the internal team tools to manage clients instead of building only the client-facing screen.", icon: Wrench }
    ],
    ctaLabel: "Scope a client portal"
  },
  "full-stack-apps": {
    slug: "full-stack-apps",
    eyebrow: "Custom product build",
    heroTitle: "Build the workflow your business needs—not another tool it has to work around.",
    heroLead:
      "A purpose-built web application connecting interface, logic, data, permissions, and integrations around a real operational problem.",
    tags: ["Product", "Logic", "Data"],
    accent: "#7f9dff",
    accentRgb: "127 157 255",
    accent2: "#48e6ff",
    accent2Rgb: "72 230 255",
    visual: "app",
    metrics: [
      { label: "Business logic", value: "Custom", note: "Built around the workflow" },
      { label: "Data layer", value: "Connected", note: "One reliable system" },
      { label: "Release path", value: "Staged", note: "Scope, test, then expand" }
    ],
    shiftBefore: "Important work is forced through generic software, manual handoffs, duplicate data, and fragile workarounds.",
    shiftAfter: "The interface, data, permissions, and integrations support the exact workflow the business wants to run.",
    decisionTitle: "Useful software starts with the operation—not the feature list.",
    decisionLead:
      "The product is scoped around users, decisions, data, failure states, and the smallest release that can prove real value.",
    cards: [
      { title: "Map the workflow", text: "Define users, states, handoffs, decisions, and the operational result before choosing features.", icon: Workflow },
      { title: "Design the system", text: "Connect interface, database, server logic, permissions, and integrations as one architecture.", icon: Braces },
      { title: "Secure the data", text: "Build authentication, authorization, validation, and server-side controls into the foundation.", icon: Database },
      { title: "Release in stages", text: "Ship the smallest useful version, learn from real usage, and expand with a controlled roadmap.", icon: Code2 }
    ],
    ctaLabel: "Discuss a custom app"
  },
  "care-plans": {
    slug: "care-plans",
    eyebrow: "Website operations",
    heroTitle: "Keep the website healthy, current, and ready for the next change.",
    heroLead:
      "Ongoing monitoring, updates, fixes, content support, and practical improvements after launch—without waiting for problems to become emergencies.",
    tags: ["Monitor", "Maintain", "Improve"],
    accent: "#68e6a8",
    accentRgb: "104 230 168",
    accent2: "#42d7ff",
    accent2Rgb: "66 215 255",
    visual: "care",
    metrics: [
      { label: "Website state", value: "Watched", note: "Health and uptime signals" },
      { label: "Updates", value: "Scheduled", note: "Less reactive maintenance" },
      { label: "Support", value: "Prioritized", note: "A clear place to ask" }
    ],
    shiftBefore: "The site launches, then updates pile up, small problems go unnoticed, and every change becomes a new one-off project.",
    shiftAfter: "The website stays reliable, receives planned attention, and can improve as the business learns what visitors need.",
    decisionTitle: "Launch is a handoff into operations—not the end of the website.",
    decisionLead:
      "A care plan creates a practical rhythm for monitoring, maintenance, content changes, and measured improvements.",
    cards: [
      { title: "Monitor the essentials", text: "Keep an eye on uptime, forms, key routes, and signals that affect customer trust.", icon: Activity },
      { title: "Maintain the foundation", text: "Handle dependency updates, fixes, checks, and technical housekeeping on a planned rhythm.", icon: Wrench },
      { title: "Support real changes", text: "Make content, service, CTA, and page updates without rebuilding the entire website.", icon: RefreshCw },
      { title: "Improve with evidence", text: "Use analytics and business feedback to prioritize changes that are actually useful.", icon: Gauge }
    ],
    ctaLabel: "Choose ongoing support"
  }
};

export function supportsModernServiceExperience(slug: string): slug is ModernServiceSlug {
  return slug in serviceWorlds;
}

function WindowBar({ label }: { label: string }) {
  return (
    <div className="flex h-11 items-center justify-between border-b border-white/8 px-4 sm:h-12 sm:px-5">
      <div className="flex gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-white/18" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/11" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/7" />
      </div>
      <span className="rounded-full border border-white/8 bg-white/[0.035] px-4 py-1.5 font-mono text-[0.48rem] uppercase tracking-[0.14em] text-white/28">
        {label}
      </span>
      <span className="h-7 w-7 rounded-full border border-white/8 bg-white/[0.035]" />
    </div>
  );
}

function RedesignVisual() {
  return (
    <div aria-hidden="true" className="relative mx-auto min-h-[34rem] w-full max-w-[760px] sm:min-h-[40rem]">
      <div className="absolute inset-[15%_10%] rounded-full bg-[rgb(var(--svc-accent-rgb)/.17)] blur-[105px]" />
      <div className={`${styles.floatReverse} absolute left-0 top-12 w-[76%] overflow-hidden rounded-[1.8rem] border border-white/9 bg-[#0b0d12]/95 p-2 opacity-55 shadow-[0_35px_110px_rgba(0,0,0,.45)] sm:left-[2%] sm:w-[70%]`}>
        <div className="overflow-hidden rounded-[1.35rem] border border-white/7 bg-[#0a0c11]">
          <WindowBar label="Current site" />
          <div className="grid aspect-[1.15] gap-4 p-5 sm:p-7">
            <div className="h-3 w-20 rounded-full bg-white/10" />
            <div className="h-12 w-[88%] rounded-xl bg-white/12" />
            <div className="h-12 w-[64%] rounded-xl bg-white/8" />
            <div className="grid grid-cols-3 gap-3 pt-3">
              <span className="h-24 rounded-xl bg-white/[0.045]" />
              <span className="h-24 rounded-xl bg-white/[0.045]" />
              <span className="h-24 rounded-xl bg-white/[0.045]" />
            </div>
            <div className="mt-auto h-10 w-32 rounded-full border border-white/8 bg-white/[0.035]" />
          </div>
        </div>
      </div>

      <div className={`${styles.floatSlow} absolute bottom-3 right-0 z-10 w-[90%] overflow-hidden rounded-[2rem] border border-[rgb(var(--svc-accent-rgb)/.24)] bg-[#0d1017] p-2.5 shadow-[0_42px_120px_rgba(0,0,0,.58)] sm:right-[2%] sm:w-[82%] sm:p-3`}>
        <div className="relative overflow-hidden rounded-[1.5rem] border border-white/8 bg-[#080b11] sm:rounded-[1.7rem]">
          <WindowBar label="Strategic relaunch" />
          <div className="relative grid min-h-[27rem] gap-px bg-white/7 sm:grid-cols-[1.3fr_.7fr]">
            <div className="relative overflow-hidden bg-[#0a0d14] p-5 sm:p-7">
              <div className="absolute -right-16 top-8 h-48 w-48 rounded-full bg-[rgb(var(--svc-accent-2-rgb)/.14)] blur-[70px]" />
              <p className="relative font-mono text-[0.48rem] uppercase tracking-[0.2em] text-[var(--svc-accent)]">New direction</p>
              <p className="relative mt-5 max-w-[9ch] font-display text-[clamp(2.8rem,7vw,5rem)] font-semibold leading-[0.78] tracking-[-0.08em] text-white">Clearer at every level.</p>
              <div className="relative mt-6 h-2 w-[88%] rounded-full bg-white/9" />
              <div className="relative mt-2 h-2 w-[66%] rounded-full bg-white/6" />
              <div className="relative mt-7 flex gap-2">
                <span className={`${styles.accentGradient} rounded-full px-4 py-2 text-[0.6rem] font-black text-white`}>Primary action</span>
                <span className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-[0.6rem] font-semibold text-white/48">Proof path</span>
              </div>
              <div className="relative mt-9 grid grid-cols-3 gap-2">
                {["Message", "Proof", "Action"].map((label, index) => (
                  <div key={label} className="rounded-xl border border-white/8 bg-white/[0.03] p-3">
                    <span className="font-mono text-[0.44rem] text-white/22">0{index + 1}</span>
                    <p className="mt-3 text-[0.62rem] font-semibold text-white/56">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-px bg-white/7 sm:grid-rows-3">
              {["Structure", "Mobile", "Launch"].map((label, index) => (
                <div key={label} className="bg-[#10141c] p-4 sm:p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-[0.5rem] font-black uppercase tracking-[0.16em] text-white/30">{label}</p>
                    <CheckCircle2 className="h-4 w-4 text-[var(--svc-accent)]" />
                  </div>
                  <div className="mt-4 h-1.5 rounded-full bg-white/7">
                    <div className={`${styles.barGrow} h-full rounded-full bg-[linear-gradient(90deg,var(--svc-accent-2),var(--svc-accent))]`} style={{ width: `${72 + index * 9}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={`${styles.scanLine} pointer-events-none absolute inset-x-0 top-12 h-px bg-gradient-to-r from-transparent via-[var(--svc-accent)] to-transparent shadow-[0_0_24px_rgb(var(--svc-accent-rgb)/.7)]`} />
        </div>
      </div>
    </div>
  );
}

function LandingVisual() {
  return (
    <div aria-hidden="true" className="relative mx-auto min-h-[35rem] w-full max-w-[760px] sm:min-h-[40rem]">
      <div className="absolute inset-[12%_10%] rounded-full bg-[rgb(var(--svc-accent-rgb)/.14)] blur-[110px]" />
      <div className={`${styles.floatSlow} absolute inset-x-0 top-4 overflow-hidden rounded-[2rem] border border-white/11 bg-[#0d1016] p-2.5 shadow-[0_42px_120px_rgba(0,0,0,.52)] sm:inset-x-[4%] sm:p-3`}>
        <div className="overflow-hidden rounded-[1.55rem] border border-white/8 bg-[#090b10]">
          <WindowBar label="Campaign control" />
          <div className="grid min-h-[28rem] gap-px bg-white/7 sm:grid-cols-[1.08fr_.92fr]">
            <div className="relative overflow-hidden bg-[#0a0d13] p-5 sm:p-7">
              <div className="absolute right-[-4rem] top-[-2rem] h-48 w-48 rounded-full bg-[rgb(var(--svc-accent-2-rgb)/.14)] blur-[75px]" />
              <div className="relative flex items-center justify-between">
                <span className="rounded-full border border-[rgb(var(--svc-accent-rgb)/.2)] bg-[rgb(var(--svc-accent-rgb)/.07)] px-3 py-1.5 text-[0.48rem] font-black uppercase tracking-[0.17em] text-[var(--svc-accent)]">Offer live</span>
                <span className="flex items-center gap-2 text-[0.5rem] font-semibold text-white/35"><span className={`${styles.pulseDot} h-2 w-2 rounded-full bg-[#68e6a8]`} /> Tracking</span>
              </div>
              <p className="relative mt-8 max-w-[8ch] font-display text-[clamp(3rem,7.8vw,5.4rem)] font-semibold leading-[0.76] tracking-[-0.085em] text-white">One message. One move.</p>
              <div className="relative mt-6 h-2 w-[92%] rounded-full bg-white/9" />
              <div className="relative mt-2 h-2 w-[68%] rounded-full bg-white/6" />
              <div className="relative mt-7 flex flex-wrap gap-2">
                <span className={`${styles.accentGradient} rounded-full px-5 py-2.5 text-[0.62rem] font-black text-[#100b08]`}>Get the offer</span>
                <span className="rounded-full border border-white/10 bg-white/[0.035] px-5 py-2.5 text-[0.62rem] font-semibold text-white/50">See proof</span>
              </div>
              <div className="relative mt-9 grid grid-cols-3 gap-2">
                {["Attention", "Proof", "Action"].map((label, index) => (
                  <div key={label} className="rounded-xl border border-white/8 bg-white/[0.03] p-3 text-center">
                    <p className="font-display text-xl font-semibold text-white">{index === 0 ? "100" : index === 1 ? "62" : "24"}</p>
                    <p className="mt-1 text-[0.48rem] uppercase tracking-[0.12em] text-white/28">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-px bg-white/7 sm:grid-rows-[.85fr_1.15fr]">
              <div className="bg-[#11151c] p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <p className="text-[0.5rem] font-black uppercase tracking-[0.17em] text-white/30">Conversion path</p>
                  <MousePointerClick className="h-4 w-4 text-[var(--svc-accent)]" />
                </div>
                <div className="mt-5 grid gap-3">
                  {[92, 68, 41].map((width, index) => (
                    <div key={width}>
                      <div className="flex justify-between text-[0.48rem] text-white/28"><span>Stage 0{index + 1}</span><span>{width}%</span></div>
                      <div className="mt-2 h-2 rounded-full bg-white/7"><div className={`${styles.barGrow} h-full rounded-full bg-[linear-gradient(90deg,var(--svc-accent),var(--svc-accent-2))]`} style={{ width: `${width}%` }} /></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[#0d1118] p-5 sm:p-6">
                <p className="text-[0.5rem] font-black uppercase tracking-[0.17em] text-white/30">Live experiment</p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {["Headline A", "CTA B"].map((label, index) => (
                    <div key={label} className={`rounded-[1.1rem] border p-4 ${index === 1 ? "border-[rgb(var(--svc-accent-rgb)/.25)] bg-[rgb(var(--svc-accent-rgb)/.07)]" : "border-white/8 bg-white/[0.03]"}`}>
                      <p className="text-[0.48rem] uppercase tracking-[0.14em] text-white/26">{label}</p>
                      <p className="mt-3 font-display text-2xl font-semibold text-white">{index === 1 ? "+18%" : "Base"}</p>
                    </div>
                  ))}
                </div>
                <div className={`${styles.flowLine} mt-5 h-px bg-[linear-gradient(90deg,transparent,var(--svc-accent),var(--svc-accent-2),transparent)]`} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.floatReverse} absolute bottom-0 right-[3%] z-10 w-[36%] min-w-[150px] max-w-[230px] rounded-[2rem] border border-white/15 bg-[#0b0e14] p-2.5 shadow-[0_30px_90px_rgba(0,0,0,.56)] sm:right-[8%]`}>
        <div className="overflow-hidden rounded-[1.45rem] border border-white/8 bg-[#090c12] px-4 pb-5 pt-3">
          <div className="mx-auto h-1.5 w-12 rounded-full bg-white/13" />
          <p className="mt-6 text-[0.46rem] font-black uppercase tracking-[0.17em] text-[var(--svc-accent)]">Mobile action</p>
          <div className="mt-4 h-7 w-[88%] rounded-md bg-white/14" />
          <div className="mt-2 h-7 w-[58%] rounded-md bg-white/9" />
          <div className="mt-5 h-2 w-full rounded-full bg-white/7" />
          <div className="mt-2 h-2 w-4/5 rounded-full bg-white/5" />
          <div className={`${styles.accentGradient} mt-6 h-10 w-full rounded-full`} />
        </div>
      </div>
    </div>
  );
}

function PortalVisual() {
  return (
    <div aria-hidden="true" className="relative mx-auto min-h-[35rem] w-full max-w-[760px] sm:min-h-[40rem]">
      <div className="absolute inset-[14%_8%] rounded-full bg-[rgb(var(--svc-accent-rgb)/.14)] blur-[115px]" />
      <div className={`${styles.floatSlow} absolute inset-x-0 top-5 overflow-hidden rounded-[2rem] border border-[rgb(var(--svc-accent-rgb)/.2)] bg-[#0d1117] p-2.5 shadow-[0_42px_120px_rgba(0,0,0,.55)] sm:inset-x-[3%] sm:p-3`}>
        <div className="overflow-hidden rounded-[1.55rem] border border-white/8 bg-[#090c12]">
          <WindowBar label="Secure workspace" />
          <div className="grid min-h-[29rem] gap-px bg-white/7 sm:grid-cols-[.3fr_.7fr]">
            <aside className="hidden bg-[#0d1118] p-5 sm:block">
              <div className="flex items-center gap-2">
                <span className={`${styles.accentGradient} grid h-9 w-9 place-items-center rounded-xl text-[0.58rem] font-black text-[#07110f]`}>GS</span>
                <span className="text-xs font-semibold text-white/62">Client space</span>
              </div>
              <div className="mt-8 grid gap-2">
                {["Overview", "Milestones", "Files", "Approvals", "Messages"].map((label, index) => (
                  <div key={label} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-[0.62rem] font-semibold ${index === 0 ? "border border-[rgb(var(--svc-accent-rgb)/.18)] bg-[rgb(var(--svc-accent-rgb)/.07)] text-[var(--svc-accent)]" : "text-white/34"}`}>
                    <span className="h-2 w-2 rounded-full bg-current opacity-70" />
                    {label}
                  </div>
                ))}
              </div>
              <div className="mt-10 rounded-xl border border-white/8 bg-white/[0.025] p-3">
                <p className="text-[0.45rem] uppercase tracking-[0.15em] text-white/22">Signed in as</p>
                <p className="mt-2 text-[0.62rem] font-semibold text-white/54">Client account</p>
              </div>
            </aside>
            <div className="relative overflow-hidden bg-[#0a0e14] p-5 sm:p-6 lg:p-7">
              <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[rgb(var(--svc-accent-2-rgb)/.13)] blur-[75px]" />
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-[0.48rem] font-black uppercase tracking-[0.18em] text-[var(--svc-accent)]">Project overview</p>
                  <p className="mt-2 font-display text-2xl font-semibold tracking-[-0.045em] text-white sm:text-3xl">Website relaunch</p>
                </div>
                <span className="rounded-full border border-[#68e6a8]/18 bg-[#68e6a8]/7 px-3 py-1.5 text-[0.48rem] font-black uppercase tracking-[0.13em] text-[#7cf0b8]">On track</span>
              </div>
              <div className="relative mt-6 grid gap-3 min-[520px]:grid-cols-3">
                {[["Progress", "74%"], ["Next milestone", "Review"], ["Open items", "03"]].map(([label, value]) => (
                  <div key={label} className="rounded-[1.1rem] border border-white/8 bg-white/[0.03] p-4">
                    <p className="text-[0.46rem] uppercase tracking-[0.14em] text-white/24">{label}</p>
                    <p className="mt-3 font-display text-2xl font-semibold text-white">{value}</p>
                  </div>
                ))}
              </div>
              <div className="relative mt-4 grid gap-4 min-[520px]:grid-cols-[1.15fr_.85fr]">
                <div className="rounded-[1.3rem] border border-white/8 bg-white/[0.025] p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[0.5rem] font-black uppercase tracking-[0.16em] text-white/28">Milestones</p>
                    <Clock3 className="h-4 w-4 text-[var(--svc-accent)]" />
                  </div>
                  <div className="mt-4 grid gap-3">
                    {["Strategy approved", "Homepage review", "Launch QA"].map((label, index) => (
                      <div key={label} className="flex items-center gap-3 rounded-xl border border-white/7 bg-black/12 px-3 py-3">
                        <span className={`grid h-7 w-7 place-items-center rounded-full border text-[0.46rem] ${index === 0 ? "border-[#68e6a8]/20 bg-[#68e6a8]/8 text-[#7cf0b8]" : "border-white/9 bg-white/[0.03] text-white/30"}`}>{index === 0 ? "✓" : `0${index + 1}`}</span>
                        <span className="text-[0.62rem] font-semibold text-white/52">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-[1.3rem] border border-[rgb(var(--svc-accent-rgb)/.16)] bg-[rgb(var(--svc-accent-rgb)/.05)] p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[0.5rem] font-black uppercase tracking-[0.16em] text-white/28">Approval</p>
                    <BellRing className={`${styles.pulseDot} h-4 w-4 text-[var(--svc-accent)]`} />
                  </div>
                  <p className="mt-5 text-sm font-semibold leading-6 text-white/66">Homepage direction is ready for your review.</p>
                  <div className={`${styles.accentGradient} mt-5 rounded-full py-2.5 text-center text-[0.58rem] font-black text-[#07110f]`}>Review now</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.floatReverse} absolute bottom-0 left-[4%] z-10 flex items-center gap-3 rounded-2xl border border-white/12 bg-[#0b0e14]/94 px-4 py-3 shadow-[0_24px_70px_rgba(0,0,0,.5)] backdrop-blur-xl sm:left-[8%]`}>
        <span className="relative grid h-10 w-10 place-items-center rounded-xl border border-[rgb(var(--svc-accent-rgb)/.18)] bg-[rgb(var(--svc-accent-rgb)/.07)]">
          <LockKeyhole className="h-4 w-4 text-[var(--svc-accent)]" />
          <span className={`${styles.pulseRing} absolute inset-0 rounded-xl border border-[rgb(var(--svc-accent-rgb)/.3)]`} />
        </span>
        <div><p className="text-[0.46rem] uppercase tracking-[0.15em] text-white/24">Access state</p><p className="mt-1 text-[0.62rem] font-semibold text-white/62">Role verified</p></div>
      </div>
    </div>
  );
}

function AppVisual() {
  const nodes = [
    { label: "Interface", icon: Monitor, position: "left-[7%] top-[13%]" },
    { label: "Auth", icon: LockKeyhole, position: "right-[8%] top-[16%]" },
    { label: "Logic", icon: Braces, position: "left-[5%] bottom-[16%]" },
    { label: "Database", icon: Database, position: "right-[7%] bottom-[13%]" }
  ];

  return (
    <div aria-hidden="true" className="relative mx-auto min-h-[35rem] w-full max-w-[760px] sm:min-h-[40rem]">
      <div className="absolute inset-[12%_8%] rounded-full bg-[rgb(var(--svc-accent-rgb)/.15)] blur-[115px]" />
      <div className={`${styles.floatSlow} absolute inset-x-0 top-3 overflow-hidden rounded-[2rem] border border-[rgb(var(--svc-accent-rgb)/.2)] bg-[#0c1018] p-2.5 shadow-[0_42px_120px_rgba(0,0,0,.55)] sm:inset-x-[3%] sm:p-3`}>
        <div className="overflow-hidden rounded-[1.55rem] border border-white/8 bg-[#080b12]">
          <WindowBar label="Application architecture" />
          <div className="relative min-h-[30rem] overflow-hidden bg-[radial-gradient(circle_at_center,rgb(var(--svc-accent-rgb)/.08),transparent_45%),#090d15] p-5 sm:p-7">
            <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.055)_1px,transparent_1px)] [background-size:2.2rem_2.2rem]" />
            <div className="absolute left-1/2 top-1/2 h-px w-[74%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[rgb(var(--svc-accent-rgb)/.45)] to-transparent" />
            <div className="absolute left-1/2 top-1/2 h-[68%] w-px -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-[rgb(var(--svc-accent-2-rgb)/.42)] to-transparent" />
            <div className={`${styles.flowLine} absolute left-[19%] right-[19%] top-[31%] h-px rotate-[20deg] bg-[linear-gradient(90deg,transparent,var(--svc-accent),var(--svc-accent-2),transparent)]`} />
            <div className={`${styles.flowLine} absolute bottom-[31%] left-[19%] right-[19%] h-px -rotate-[20deg] bg-[linear-gradient(90deg,transparent,var(--svc-accent-2),var(--svc-accent),transparent)]`} />

            <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
              <div className={`${styles.breathe} absolute inset-[-3rem] rounded-full bg-[rgb(var(--svc-accent-rgb)/.12)] blur-2xl`} />
              <div className="relative grid h-32 w-32 place-items-center rounded-[2rem] border border-[rgb(var(--svc-accent-rgb)/.26)] bg-[#101722] shadow-[0_0_70px_rgb(var(--svc-accent-rgb)/.16)] sm:h-40 sm:w-40">
                <div className="text-center">
                  <Code2 className="mx-auto h-7 w-7 text-[var(--svc-accent)]" />
                  <p className="mt-3 text-[0.54rem] font-black uppercase tracking-[0.16em] text-white/36">Core product</p>
                  <p className="mt-1 font-display text-xl font-semibold text-white sm:text-2xl">Business logic</p>
                </div>
              </div>
            </div>

            {nodes.map((node, index) => {
              const Icon = node.icon;
              return (
                <div key={node.label} className={`${styles.floatReverse} absolute ${node.position} z-10`} style={{ animationDelay: `${index * 180}ms` }}>
                  <div className="rounded-[1.3rem] border border-white/11 bg-[#10151e]/95 p-3.5 shadow-[0_20px_60px_rgba(0,0,0,.4)] backdrop-blur-xl sm:p-4">
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-[rgb(var(--svc-accent-rgb)/.16)] bg-[rgb(var(--svc-accent-rgb)/.06)] text-[var(--svc-accent)]"><Icon className="h-4 w-4" /></span>
                    <p className="mt-3 text-[0.58rem] font-semibold text-white/60">{node.label}</p>
                  </div>
                </div>
              );
            })}

            <div className="absolute inset-x-5 bottom-5 grid grid-cols-3 gap-2 sm:inset-x-7">
              {[["API", "Connected"], ["Data", "Validated"], ["Release", "Staged"]].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-white/8 bg-black/20 p-3 text-center backdrop-blur-sm">
                  <p className="text-[0.44rem] uppercase tracking-[0.13em] text-white/22">{label}</p>
                  <p className="mt-2 text-[0.56rem] font-semibold text-white/58">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CareVisual() {
  return (
    <div aria-hidden="true" className="relative mx-auto min-h-[35rem] w-full max-w-[760px] sm:min-h-[40rem]">
      <div className="absolute inset-[12%_8%] rounded-full bg-[rgb(var(--svc-accent-rgb)/.14)] blur-[115px]" />
      <div className={`${styles.floatSlow} absolute inset-x-0 top-4 overflow-hidden rounded-[2rem] border border-[rgb(var(--svc-accent-rgb)/.2)] bg-[#0c1116] p-2.5 shadow-[0_42px_120px_rgba(0,0,0,.54)] sm:inset-x-[4%] sm:p-3`}>
        <div className="overflow-hidden rounded-[1.55rem] border border-white/8 bg-[#090d12]">
          <WindowBar label="Website health" />
          <div className="grid min-h-[29rem] gap-px bg-white/7 sm:grid-cols-[1.08fr_.92fr]">
            <div className="relative overflow-hidden bg-[#0a0f14] p-5 sm:p-7">
              <div className="absolute right-[-4rem] top-[-3rem] h-52 w-52 rounded-full bg-[rgb(var(--svc-accent-2-rgb)/.12)] blur-[80px]" />
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-[0.48rem] font-black uppercase tracking-[0.18em] text-[var(--svc-accent)]">System status</p>
                  <p className="mt-3 font-display text-4xl font-semibold tracking-[-0.06em] text-white sm:text-5xl">Healthy</p>
                </div>
                <span className="relative grid h-12 w-12 place-items-center rounded-full border border-[#68e6a8]/20 bg-[#68e6a8]/7">
                  <span className={`${styles.pulseDot} h-3 w-3 rounded-full bg-[#68e6a8] shadow-[0_0_18px_rgba(104,230,168,.75)]`} />
                  <span className={`${styles.pulseRing} absolute inset-1 rounded-full border border-[#68e6a8]/28`} />
                </span>
              </div>

              <div className="relative mt-8 overflow-hidden rounded-[1.35rem] border border-white/8 bg-black/18 p-4">
                <div className="flex items-center justify-between text-[0.48rem] uppercase tracking-[0.14em] text-white/24"><span>Response signal</span><span>Last 24h</span></div>
                <svg viewBox="0 0 520 150" className="mt-4 h-32 w-full overflow-visible" role="presentation">
                  <defs>
                    <linearGradient id="care-line" x1="0" x2="1">
                      <stop offset="0" stopColor="var(--svc-accent-2)" />
                      <stop offset="1" stopColor="var(--svc-accent)" />
                    </linearGradient>
                  </defs>
                  <path d="M0 105 C45 102 58 94 86 96 S132 111 158 86 S210 48 244 73 S290 116 330 83 S378 62 408 77 S463 90 520 42" fill="none" stroke="url(#care-line)" strokeWidth="5" strokeLinecap="round" />
                  <path d="M0 105 C45 102 58 94 86 96 S132 111 158 86 S210 48 244 73 S290 116 330 83 S378 62 408 77 S463 90 520 42 L520 150 L0 150 Z" fill="rgb(var(--svc-accent-rgb) / .08)" />
                </svg>
                <div className={`${styles.flowLine} h-px bg-[linear-gradient(90deg,transparent,var(--svc-accent),var(--svc-accent-2),transparent)]`} />
              </div>

              <div className="relative mt-4 grid grid-cols-3 gap-2">
                {[["Uptime", "99.9%"], ["Forms", "Passing"], ["Routes", "Stable"]].map(([label, value]) => (
                  <div key={label} className="rounded-xl border border-white/8 bg-white/[0.03] p-3 text-center">
                    <p className="text-[0.44rem] uppercase tracking-[0.13em] text-white/22">{label}</p>
                    <p className="mt-2 text-[0.58rem] font-semibold text-white/60">{value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-px bg-white/7 sm:grid-rows-[1fr_1fr]">
              <div className="bg-[#10161b] p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <p className="text-[0.5rem] font-black uppercase tracking-[0.17em] text-white/28">Maintenance orbit</p>
                  <RefreshCw className={`${styles.orbit} h-4 w-4 text-[var(--svc-accent)]`} />
                </div>
                <div className="relative mx-auto mt-5 h-36 w-36">
                  <div className={`${styles.orbit} absolute inset-0 rounded-full border border-dashed border-[rgb(var(--svc-accent-rgb)/.24)]`} />
                  <div className={`${styles.orbitReverse} absolute inset-5 rounded-full border border-dashed border-[rgb(var(--svc-accent-2-rgb)/.22)]`} />
                  <div className="absolute inset-10 grid place-items-center rounded-full border border-white/8 bg-white/[0.035]"><Wrench className="h-5 w-5 text-[var(--svc-accent)]" /></div>
                  <span className="absolute left-1/2 top-[-4px] h-3 w-3 -translate-x-1/2 rounded-full bg-[var(--svc-accent)] shadow-[0_0_16px_rgb(var(--svc-accent-rgb)/.7)]" />
                  <span className="absolute bottom-3 right-3 h-2.5 w-2.5 rounded-full bg-[var(--svc-accent-2)] shadow-[0_0_14px_rgb(var(--svc-accent-2-rgb)/.7)]" />
                </div>
              </div>
              <div className="bg-[#0d1217] p-5 sm:p-6">
                <p className="text-[0.5rem] font-black uppercase tracking-[0.17em] text-white/28">Upcoming care</p>
                <div className="mt-5 grid gap-3">
                  {[["Dependency review", "Tue"], ["Content update", "Thu"], ["Monthly report", "Jul 31"]].map(([label, time], index) => (
                    <div key={label} className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.03] px-3 py-3">
                      <div className="flex items-center gap-3"><span className={`h-2 w-2 rounded-full ${index === 0 ? "bg-[var(--svc-accent)]" : "bg-white/18"}`} /><span className="text-[0.58rem] font-semibold text-white/54">{label}</span></div>
                      <span className="text-[0.48rem] text-white/24">{time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceVisual({ world }: { world: ServiceWorld }) {
  switch (world.visual) {
    case "redesign":
      return <RedesignVisual />;
    case "landing":
      return <LandingVisual />;
    case "portal":
      return <PortalVisual />;
    case "app":
      return <AppVisual />;
    case "care":
      return <CareVisual />;
  }
}

export function ModernServiceExperience({ service, recommendedPackage, relatedServices }: ModernServiceExperienceProps) {
  if (!supportsModernServiceExperience(service.slug)) return null;

  const world = serviceWorlds[service.slug];
  const themeStyle: ServiceStyle = {
    "--svc-accent": world.accent,
    "--svc-accent-rgb": world.accentRgb,
    "--svc-accent-2": world.accent2,
    "--svc-accent-2-rgb": world.accent2Rgb
  };

  return (
    <main className={`${styles.root} overflow-hidden text-white`} style={themeStyle}>
      <section className="relative min-h-svh overflow-hidden border-b border-white/7 pt-28 sm:pt-32">
        <div aria-hidden="true" className="page-grid pointer-events-none absolute inset-0 opacity-35" />
        <div aria-hidden="true" className="pointer-events-none absolute -left-44 top-16 h-[34rem] w-[34rem] rounded-full bg-[rgb(var(--svc-accent-2-rgb)/.12)] blur-[145px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-44 top-0 h-[40rem] w-[40rem] rounded-full bg-[rgb(var(--svc-accent-rgb)/.11)] blur-[155px]" />

        <Container className="relative grid min-h-[calc(100svh-7rem)] min-w-0 gap-12 py-14 sm:py-18 xl:grid-cols-[.86fr_1.14fr] xl:items-center xl:gap-16 xl:py-20">
          <div className={`${styles.heroCopy} min-w-0`}>
            <p className={`${styles.accentText} inline-flex items-center gap-2 text-[0.6rem] font-black uppercase tracking-[0.32em]`}>
              <Sparkles className="h-4 w-4" /> Service {service.number} · {world.eyebrow}
            </p>
            <h1 className="mt-7 max-w-[10.5ch] text-balance font-display text-[clamp(3.3rem,8.2vw,8.4rem)] font-semibold leading-[0.78] tracking-[-0.085em]">
              {world.heroTitle}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/48 sm:text-lg sm:leading-9">
              {world.heroLead}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href={`/start-project?service=${service.slug}`} className={`${styles.accentGradient} ${styles.accentGlow} inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-black text-[#08090d] transition hover:-translate-y-1`}>
                {world.ctaLabel} <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href="#scope" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.035] px-6 text-sm font-semibold text-white/68 transition hover:border-white/24 hover:bg-white/[0.075] hover:text-white">
                See the scope <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap gap-2">
              {world.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-white/42">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3 border-t border-white/8 pt-6">
              {world.metrics.map((metric) => (
                <div key={metric.label} className="min-w-0">
                  <p className={`${styles.accentText} truncate font-display text-[clamp(1.35rem,3vw,2.3rem)] font-semibold tracking-[-0.055em]`}>{metric.value}</p>
                  <p className="mt-1 text-[0.52rem] font-bold uppercase tracking-[0.14em] text-white/30 sm:text-[0.58rem]">{metric.label}</p>
                  <p className="mt-2 hidden text-xs leading-5 text-white/28 sm:block">{metric.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`${styles.heroVisual} min-w-0`}>
            <ServiceVisual world={world} />
          </div>
        </Container>
      </section>

      <section className={`${styles.viewReveal} relative border-b border-white/7 py-20 sm:py-28`}>
        <Container className="relative">
          <div className="grid gap-10 xl:grid-cols-[.72fr_1.28fr] xl:items-end">
            <div>
              <p className={`${styles.accentText} text-[0.6rem] font-black uppercase tracking-[0.32em]`}>Why it matters</p>
              <h2 className="mt-6 max-w-[9.5ch] font-display text-[clamp(3.2rem,7vw,7.2rem)] font-semibold leading-[0.8] tracking-[-0.08em]">
                The work is the shift between these two states.
              </h2>
            </div>
            <p className="max-w-3xl text-base leading-8 text-white/45 sm:text-lg sm:leading-9 xl:justify-self-end">
              {service.problem} {service.promise}
            </p>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            <article className={`${styles.card} relative overflow-hidden rounded-[2rem] border border-white/9 bg-white/[0.022] p-6 sm:p-8`}>
              <div className="absolute inset-y-0 left-0 w-1 bg-white/12" />
              <p className="text-[0.56rem] font-black uppercase tracking-[0.22em] text-white/28">Before</p>
              <p className="mt-5 max-w-2xl font-display text-2xl font-semibold leading-tight tracking-[-0.045em] text-white/62 sm:text-3xl">{world.shiftBefore}</p>
            </article>
            <article className={`${styles.card} ${styles.accentBorder} relative overflow-hidden rounded-[2rem] border bg-[linear-gradient(145deg,rgb(var(--svc-accent-rgb)/.075),rgba(255,255,255,.018))] p-6 sm:p-8`}>
              <div className={`${styles.accentGradient} absolute inset-y-0 left-0 w-1`} />
              <p className={`${styles.accentText} text-[0.56rem] font-black uppercase tracking-[0.22em]`}>After</p>
              <p className="mt-5 max-w-2xl font-display text-2xl font-semibold leading-tight tracking-[-0.045em] text-white sm:text-3xl">{world.shiftAfter}</p>
            </article>
          </div>
        </Container>
      </section>

      <section className={`${styles.viewReveal} relative border-b border-white/7 py-20 sm:py-28`}>
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-96 w-[70%] -translate-x-1/2 rounded-full bg-[rgb(var(--svc-accent-rgb)/.06)] blur-[130px]" />
        <Container className="relative">
          <div className="grid gap-8 xl:grid-cols-[.8fr_1.2fr] xl:items-end">
            <div>
              <p className={`${styles.accentText} text-[0.6rem] font-black uppercase tracking-[0.32em]`}>Outcomes</p>
              <h2 className="mt-6 max-w-[10ch] font-display text-[clamp(3.2rem,6.8vw,7rem)] font-semibold leading-[0.8] tracking-[-0.08em]">{world.decisionTitle}</h2>
            </div>
            <p className="max-w-3xl text-base leading-8 text-white/44 sm:text-lg sm:leading-9 xl:justify-self-end">{world.decisionLead}</p>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-12">
            {world.cards.map((card, index) => {
              const Icon = card.icon;
              const wide = index === 0 || index === 3;
              return (
                <article key={card.title} className={`${styles.card} ${wide ? "lg:col-span-7" : "lg:col-span-5"} relative overflow-hidden rounded-[2rem] border border-white/9 bg-[#0c0f15]/86 p-6 sm:p-8`}>
                  <div className="absolute right-[-4rem] top-[-4rem] h-40 w-40 rounded-full bg-[rgb(var(--svc-accent-rgb)/.08)] blur-[60px]" />
                  <div className="relative flex items-start justify-between gap-5">
                    <span className={`${styles.accentBorder} ${styles.accentSurface} grid h-12 w-12 shrink-0 place-items-center rounded-2xl border text-[var(--svc-accent)]`}><Icon className="h-5 w-5" /></span>
                    <span className="font-mono text-[0.52rem] tracking-[0.17em] text-white/20">0{index + 1}</span>
                  </div>
                  <h3 className="relative mt-8 max-w-[13ch] font-display text-3xl font-semibold leading-[0.92] tracking-[-0.055em] text-white sm:text-4xl">{card.title}</h3>
                  <p className="relative mt-5 max-w-2xl text-sm leading-7 text-white/43 sm:text-base sm:leading-8">{card.text}</p>
                  <div className={`${styles.flowLine} relative mt-7 h-px bg-[linear-gradient(90deg,var(--svc-accent),var(--svc-accent-2),transparent)] opacity-40`} />
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className={`${styles.viewReveal} relative border-b border-white/7 py-20 sm:py-28`}>
        <Container>
          <div className="grid gap-12 xl:grid-cols-[.72fr_1.28fr]">
            <div className="xl:sticky xl:top-28 xl:self-start">
              <p className={`${styles.accentText} text-[0.6rem] font-black uppercase tracking-[0.32em]`}>The build route</p>
              <h2 className="mt-6 max-w-[9ch] font-display text-[clamp(3.3rem,6.8vw,7rem)] font-semibold leading-[0.79] tracking-[-0.08em]">A clear sequence from idea to launch.</h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/42">Each phase has a decision to make, an output to review, and a reason it happens before the next one.</p>
            </div>

            <div className="relative grid gap-4">
              <div className="absolute bottom-12 left-7 top-12 hidden w-px bg-gradient-to-b from-[var(--svc-accent)] via-[rgb(var(--svc-accent-rgb)/.25)] to-transparent sm:block" />
              {service.process.map((step, index) => (
                <article key={step.title} className={`${styles.card} relative rounded-[1.8rem] border border-white/9 bg-white/[0.022] p-6 sm:grid sm:grid-cols-[auto_1fr] sm:gap-7 sm:p-8`}>
                  <span className={`${styles.accentGradient} relative z-10 grid h-14 w-14 place-items-center rounded-2xl font-mono text-[0.56rem] font-black text-[#08090d]`}>0{index + 1}</span>
                  <div className="mt-5 sm:mt-0">
                    <h3 className="font-display text-3xl font-semibold tracking-[-0.055em] text-white sm:text-4xl">{step.title}</h3>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-white/43 sm:text-base sm:leading-8">{step.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section id="scope" className={`${styles.viewReveal} relative border-b border-white/7 py-20 sm:py-28`}>
        <Container>
          <div className="grid gap-5 xl:grid-cols-[1.15fr_.85fr]">
            <article className="rounded-[2.2rem] border border-white/9 bg-[#0c0f15]/88 p-6 sm:p-8 lg:p-10">
              <div className="flex items-center justify-between gap-5">
                <div>
                  <p className={`${styles.accentText} text-[0.58rem] font-black uppercase tracking-[0.24em]`}>Core deliverables</p>
                  <h2 className="mt-5 font-display text-[clamp(3rem,5vw,5.4rem)] font-semibold leading-[0.84] tracking-[-0.075em]">What ships.</h2>
                </div>
                <span className={`${styles.accentBorder} ${styles.accentSurface} hidden h-14 w-14 place-items-center rounded-2xl border text-[var(--svc-accent)] sm:grid`}><CheckCircle2 className="h-5 w-5" /></span>
              </div>
              <div className="mt-9 grid gap-3 sm:grid-cols-2">
                {service.deliverables.map((item) => (
                  <div key={item} className="flex min-h-24 gap-4 rounded-[1.25rem] border border-white/8 bg-white/[0.026] p-4 sm:p-5">
                    <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[var(--svc-accent)]" />
                    <p className="text-sm leading-6 text-white/52">{item}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className={`${styles.accentBorder} relative overflow-hidden rounded-[2.2rem] border bg-[linear-gradient(155deg,rgb(var(--svc-accent-2-rgb)/.14),rgb(var(--svc-accent-rgb)/.06),rgba(9,12,18,.95))] p-6 sm:p-8 lg:p-10`}>
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[rgb(var(--svc-accent-rgb)/.14)] blur-[90px]" />
              <div className="relative">
                <p className={`${styles.accentText} text-[0.58rem] font-black uppercase tracking-[0.24em]`}>Recommended starting point</p>
                <h2 className="mt-5 font-display text-5xl font-semibold tracking-[-0.07em] text-white sm:text-6xl">{recommendedPackage?.name ?? "Custom"}</h2>
                <p className={`${styles.accentText} mt-3 text-lg font-black`}>{recommendedPackage?.price ?? "Quoted by scope"}</p>
                <p className="mt-2 text-sm text-white/34">{recommendedPackage?.timeline ?? "Timeline based on approved roadmap"}</p>
                <p className="mt-7 text-sm leading-7 text-white/46 sm:text-base sm:leading-8">{recommendedPackage?.summary ?? service.idealFor}</p>
                <div className="mt-8 rounded-[1.35rem] border border-white/9 bg-black/16 p-5">
                  <p className="text-[0.5rem] font-black uppercase tracking-[0.17em] text-white/28">Best fit</p>
                  <p className="mt-3 text-sm leading-7 text-white/54">{service.idealFor}</p>
                </div>
                <Link href={`/start-project?service=${service.slug}&package=${recommendedPackage?.id ?? "custom"}`} className={`${styles.accentGradient} mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-6 text-sm font-black text-[#08090d] transition hover:-translate-y-1`}>
                  {world.ctaLabel} <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          </div>
        </Container>
      </section>

      <section className={`${styles.viewReveal} relative border-b border-white/7 py-20 sm:py-28`}>
        <Container className="grid gap-10 xl:grid-cols-[.72fr_1.28fr]">
          <div>
            <p className={`${styles.accentText} text-[0.6rem] font-black uppercase tracking-[0.32em]`}>Questions</p>
            <h2 className="mt-6 max-w-[9ch] font-display text-[clamp(3.2rem,6.5vw,6.6rem)] font-semibold leading-[0.8] tracking-[-0.08em]">What clients usually ask first.</h2>
          </div>
          <div className="grid gap-3">
            {service.faqs.map((faq, index) => (
              <details key={faq.question} className={`${styles.card} group rounded-[1.5rem] border border-white/9 bg-white/[0.022] open:border-[rgb(var(--svc-accent-rgb)/.2)] open:bg-[rgb(var(--svc-accent-rgb)/.045)]`}>
                <summary className="grid cursor-pointer list-none grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-5 sm:px-6 sm:py-6 [&::-webkit-details-marker]:hidden">
                  <span className={`${styles.accentText} font-mono text-[0.5rem] tracking-[0.16em]`}>0{index + 1}</span>
                  <span className="font-display text-xl font-semibold tracking-[-0.035em] text-white/78 sm:text-2xl">{faq.question}</span>
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-white/9 bg-white/[0.03] text-white/42 transition group-open:rotate-180 group-open:border-[rgb(var(--svc-accent-rgb)/.2)] group-open:text-[var(--svc-accent)]"><ChevronDown className="h-4 w-4" /></span>
                </summary>
                <div className="px-5 pb-6 pl-[3.2rem] sm:px-6 sm:pb-7 sm:pl-[4.15rem]">
                  <p className="max-w-3xl text-sm leading-7 text-white/46 sm:text-base sm:leading-8">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section className={`${styles.viewReveal} relative py-20 sm:py-28`}>
        <div aria-hidden="true" className="page-grid pointer-events-none absolute inset-0 opacity-22" />
        <Container className="relative">
          <div className={`${styles.accentBorder} relative overflow-hidden rounded-[2.5rem] border bg-[radial-gradient(circle_at_90%_10%,rgb(var(--svc-accent-rgb)/.16),transparent_24rem),radial-gradient(circle_at_8%_90%,rgb(var(--svc-accent-2-rgb)/.13),transparent_24rem),#0b0e14] p-7 sm:p-10 lg:p-12`}>
            <div className="grid gap-10 xl:grid-cols-[1fr_auto] xl:items-end">
              <div>
                <p className={`${styles.accentText} text-[0.6rem] font-black uppercase tracking-[0.3em]`}>Ready to shape it?</p>
                <h2 className="mt-6 max-w-[13ch] font-display text-[clamp(3.2rem,6.8vw,7rem)] font-semibold leading-[0.8] tracking-[-0.08em]">Turn the service idea into a clear, buildable next step.</h2>
                <p className="mt-6 max-w-2xl text-base leading-8 text-white/44 sm:text-lg sm:leading-9">The project brief keeps the goal, users, scope, budget, and timeline together so the first conversation can be useful.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row xl:flex-col">
                <Link href={`/start-project?service=${service.slug}`} className={`${styles.accentGradient} inline-flex min-h-13 items-center justify-center gap-2 rounded-full px-7 text-sm font-black text-[#08090d] transition hover:-translate-y-1`}>
                  {world.ctaLabel} <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link href="/services" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.035] px-7 text-sm font-semibold text-white/64 transition hover:border-white/24 hover:bg-white/[0.075] hover:text-white">
                  View all services <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {relatedServices.map((item) => (
              <Link key={item.slug} href={`/services/${item.slug}`} className={`${styles.card} rounded-[1.5rem] border border-white/8 bg-white/[0.022] p-5 sm:p-6`}>
                <p className={`${styles.accentText} text-[0.52rem] font-black uppercase tracking-[0.18em]`}>{item.number} · Related</p>
                <p className="mt-4 font-display text-2xl font-semibold tracking-[-0.045em] text-white sm:text-3xl">{item.shortTitle}</p>
                <p className="mt-3 text-sm leading-7 text-white/36">{item.summary}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-white/46">Explore service <ArrowRight className="h-3.5 w-3.5" /></span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
