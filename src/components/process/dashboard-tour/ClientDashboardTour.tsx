"use client";

import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  Circle,
  Clock3,
  FileText,
  FolderOpen,
  LayoutDashboard,
  MessageSquareText,
  Milestone,
  MousePointer2,
  PanelLeft,
  Paperclip,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Upload,
  UsersRound
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll
} from "motion/react";
import { useRef, useState } from "react";

import { Container } from "@/components/ui/Container";
import {
  dashboardTourSteps,
  type DashboardTourStep,
  type DashboardTourStepId
} from "@/config/dashboard-tour";
import { cn } from "@/lib/utils";

const iconMap = {
  overview: LayoutDashboard,
  tasks: CheckCircle2,
  files: FolderOpen,
  approvals: ShieldCheck,
  messages: MessageSquareText,
  launch: Rocket
} satisfies Record<DashboardTourStepId, typeof LayoutDashboard>;

function DashboardSection({
  id,
  activeId,
  children,
  className
}: {
  id: DashboardTourStepId;
  activeId: DashboardTourStepId;
  children: React.ReactNode;
  className?: string;
}) {
  const active = id === activeId;

  return (
    <div
      className={cn(
        "relative rounded-xl border bg-[#11151d] transition duration-500",
        active
          ? "border-[#8be9ff]/55 shadow-[0_0_0_1px_rgba(139,233,255,0.1),0_18px_60px_rgba(41,214,255,0.12)]"
          : "border-white/[0.07]",
        className
      )}
    >
      {children}
      {active ? (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-xl border border-[#8be9ff]/40"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: [0.35, 0.9, 0.35], scale: [0.995, 1.005, 0.995] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}
    </div>
  );
}

function StatusPill({ children, tone = "cyan" }: { children: React.ReactNode; tone?: "cyan" | "green" | "violet" }) {
  const tones = {
    cyan: "border-[#8be9ff]/20 bg-[#8be9ff]/8 text-[#8be9ff]",
    green: "border-[#56dfa1]/20 bg-[#56dfa1]/8 text-[#75e8b3]",
    violet: "border-[#9c7cff]/20 bg-[#9c7cff]/8 text-[#b49dff]"
  };

  return (
    <span className={cn("inline-flex items-center rounded-full border px-2 py-1 text-[0.44rem] font-semibold uppercase tracking-[0.16em]", tones[tone])}>
      {children}
    </span>
  );
}

function DashboardCanvas({
  activeStep,
  animate = true,
  compact = false
}: {
  activeStep: DashboardTourStep;
  animate?: boolean;
  compact?: boolean;
}) {
  const activeId = activeStep.id;

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#070910]" aria-label={`Client dashboard preview focused on ${activeStep.label}`}>
      <motion.div
        className="absolute inset-0 origin-center"
        animate={
          animate
            ? {
                scale: compact ? Math.min(activeStep.transform.scale, 1.24) : activeStep.transform.scale,
                x: compact ? "0%" : activeStep.transform.x,
                y: compact ? "0%" : activeStep.transform.y
              }
            : { scale: 1, x: "0%", y: "0%" }
        }
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="grid h-full min-h-[570px] grid-cols-[17%_83%] bg-[#080b11] text-white">
          <aside className="border-r border-white/[0.07] bg-[#090c12] p-[2.2%]">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg border border-[#8be9ff]/24 bg-[#8be9ff]/7 text-xs font-bold text-[#8be9ff]">
                G
              </span>
              <div>
                <p className="text-[0.6rem] font-semibold tracking-[-0.02em] text-white/88">GridSpell</p>
                <p className="text-[0.38rem] uppercase tracking-[0.2em] text-white/22">Client OS</p>
              </div>
            </div>

            <nav className="mt-8 grid gap-1.5">
              {dashboardTourSteps.map((step) => {
                const Icon = iconMap[step.id];
                const active = step.id === activeId;

                return (
                  <div
                    key={step.id}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-2.5 py-2 text-[0.48rem] font-semibold transition",
                      active
                        ? "bg-[#8be9ff]/9 text-[#8be9ff]"
                        : "text-white/28"
                    )}
                  >
                    <Icon className="h-3 w-3" />
                    <span>{step.label}</span>
                  </div>
                );
              })}
            </nav>

            <div className="mt-8 rounded-xl border border-white/[0.07] bg-white/[0.025] p-3">
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-[#7c5cff]/15 text-[0.46rem] font-bold text-[#b4a6ff]">AR</span>
                <div>
                  <p className="text-[0.48rem] font-semibold text-white/70">Alex Rivera</p>
                  <p className="text-[0.38rem] text-white/22">Project contact</p>
                </div>
              </div>
            </div>
          </aside>

          <main className="min-w-0 p-[2.1%]">
            <header className="flex items-center justify-between">
              <div>
                <p className="text-[0.43rem] uppercase tracking-[0.22em] text-[#8be9ff]">Northstar website rebuild</p>
                <h3 className="mt-1 text-[1rem] font-semibold tracking-[-0.04em] text-white/90">Good afternoon, Alex.</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="hidden items-center gap-1.5 rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-[0.42rem] text-white/30 sm:inline-flex">
                  <Search className="h-2.5 w-2.5" />
                  Search workspace
                </span>
                <span className="grid h-8 w-8 place-items-center rounded-lg border border-white/[0.07] bg-white/[0.025] text-white/35">
                  <Bell className="h-3 w-3" />
                </span>
              </div>
            </header>

            <DashboardSection id="overview" activeId={activeId} className="mt-[2.3%] p-[2%]">
              <div className="grid grid-cols-[1.3fr_0.7fr_0.7fr_0.7fr] gap-[1.4%]">
                <div className="rounded-lg border border-white/[0.06] bg-[#0c1017] p-[5%]">
                  <div className="flex items-center justify-between">
                    <p className="text-[0.42rem] uppercase tracking-[0.17em] text-white/24">Project progress</p>
                    <StatusPill>Design</StatusPill>
                  </div>
                  <div className="mt-[8%] flex items-end justify-between">
                    <p className="text-[1.4rem] font-semibold tracking-[-0.06em] text-white">64%</p>
                    <p className="text-[0.42rem] text-white/25">On schedule</p>
                  </div>
                  <div className="mt-[7%] h-1.5 overflow-hidden rounded-full bg-white/[0.055]">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-[#7c5cff] to-[#29d6ff]"
                      initial={{ width: 0 }}
                      animate={{ width: "64%" }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>

                {[
                  { label: "Next milestone", value: "Design review", icon: Milestone },
                  { label: "Due date", value: "Jul 08", icon: CalendarDays },
                  { label: "Your actions", value: "2 open", icon: CheckCircle2 }
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="rounded-lg border border-white/[0.06] bg-[#0c1017] p-[9%]">
                    <Icon className="h-3.5 w-3.5 text-[#8be9ff]" />
                    <p className="mt-[18%] text-[0.4rem] uppercase tracking-[0.15em] text-white/22">{label}</p>
                    <p className="mt-[7%] text-[0.64rem] font-semibold text-white/76">{value}</p>
                  </div>
                ))}
              </div>
            </DashboardSection>

            <div className="mt-[1.7%] grid grid-cols-[1.32fr_0.68fr] gap-[1.7%]">
              <div className="grid gap-[2.4%]">
                <DashboardSection id={activeId === "launch" ? "launch" : "tasks"} activeId={activeId} className="p-[3%]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[0.42rem] uppercase tracking-[0.18em] text-white/24">
                        {activeId === "launch" ? "Project timeline" : "Tasks and next actions"}
                      </p>
                      <p className="mt-1 text-[0.7rem] font-semibold text-white/78">
                        {activeId === "launch" ? "From discovery to launch" : "What keeps the project moving"}
                      </p>
                    </div>
                    <span className="rounded-full border border-white/[0.07] px-2 py-1 text-[0.4rem] text-white/28">View all</span>
                  </div>

                  {activeId === "launch" ? (
                    <div className="mt-[5%] grid grid-cols-5 gap-[2%]">
                      {[
                        ["Discovery", true],
                        ["Strategy", true],
                        ["Design", true],
                        ["Development", false],
                        ["Launch", false]
                      ].map(([label, complete], index) => (
                        <div key={String(label)} className="relative text-center">
                          <span className={cn("relative z-10 mx-auto grid h-7 w-7 place-items-center rounded-full border text-[0.45rem]", complete ? "border-[#56dfa1]/30 bg-[#56dfa1]/10 text-[#75e8b3]" : index === 3 ? "border-[#8be9ff]/35 bg-[#8be9ff]/10 text-[#8be9ff]" : "border-white/[0.08] bg-[#0a0d13] text-white/20")}>{complete ? <Check className="h-3 w-3" /> : index + 1}</span>
                          {index < 4 ? <span className="absolute left-[62%] top-3.5 h-px w-[78%] bg-white/[0.08]" /> : null}
                          <p className="mt-2 text-[0.4rem] text-white/40">{label}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-[4%] grid gap-2">
                      {[
                        { title: "Review homepage direction", owner: "Your action", due: "Today", complete: false },
                        { title: "Prepare service page content", owner: "GridSpell", due: "Jul 02", complete: true },
                        { title: "Confirm booking workflow", owner: "Your action", due: "Jul 04", complete: false }
                      ].map((task) => (
                        <div key={task.title} className="flex items-center gap-3 rounded-lg border border-white/[0.055] bg-[#0b0f16] px-3 py-2.5">
                          <span className={cn("grid h-5 w-5 shrink-0 place-items-center rounded-full border", task.complete ? "border-[#56dfa1]/30 bg-[#56dfa1]/10 text-[#75e8b3]" : "border-white/12 text-white/18")}>{task.complete ? <Check className="h-2.5 w-2.5" /> : <Circle className="h-2.5 w-2.5" />}</span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[0.52rem] font-semibold text-white/67">{task.title}</p>
                            <p className="mt-0.5 text-[0.4rem] text-white/22">{task.owner}</p>
                          </div>
                          <span className="text-[0.4rem] text-white/25">{task.due}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </DashboardSection>

                <DashboardSection id="files" activeId={activeId} className="p-[3%]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[0.42rem] uppercase tracking-[0.18em] text-white/24">Recent files</p>
                      <p className="mt-1 text-[0.7rem] font-semibold text-white/78">Everything attached to the project</p>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1.5 text-[0.42rem] font-semibold text-[#080b11]">
                      <Upload className="h-2.5 w-2.5" /> Upload
                    </span>
                  </div>
                  <div className="mt-[4%] grid grid-cols-3 gap-[2%]">
                    {[
                      { name: "Brand-assets.zip", type: "ZIP", icon: Paperclip },
                      { name: "Homepage-v3.pdf", type: "PDF", icon: FileText },
                      { name: "Service-copy.docx", type: "DOC", icon: FolderOpen }
                    ].map(({ name, type, icon: Icon }) => (
                      <div key={name} className="rounded-lg border border-white/[0.055] bg-[#0b0f16] p-3">
                        <Icon className="h-3.5 w-3.5 text-[#8be9ff]" />
                        <p className="mt-3 truncate text-[0.48rem] font-semibold text-white/62">{name}</p>
                        <p className="mt-1 text-[0.38rem] uppercase tracking-[0.16em] text-white/20">{type}</p>
                      </div>
                    ))}
                  </div>
                </DashboardSection>
              </div>

              <div className="grid gap-[2.4%]">
                <DashboardSection id="approvals" activeId={activeId} className="p-[5%]">
                  <div className="flex items-center justify-between">
                    <p className="text-[0.42rem] uppercase tracking-[0.18em] text-white/24">Awaiting approval</p>
                    <StatusPill tone="violet">Design</StatusPill>
                  </div>
                  <div className="mt-[6%] overflow-hidden rounded-lg border border-white/[0.07] bg-[#0a0d13]">
                    <div className="aspect-[1.7] bg-[radial-gradient(circle_at_70%_30%,rgba(41,214,255,0.16),transparent_30%),linear-gradient(145deg,#151a25,#080a0f)] p-[7%]">
                      <span className="block h-1.5 w-16 rounded-full bg-white/13" />
                      <span className="mt-3 block h-5 w-[74%] rounded-md bg-white/10" />
                      <span className="mt-2 block h-2 w-[52%] rounded-full bg-white/[0.06]" />
                    </div>
                  </div>
                  <p className="mt-[5%] text-[0.58rem] font-semibold text-white/72">Homepage design direction</p>
                  <p className="mt-1 text-[0.42rem] leading-4 text-white/28">Review the layout and confirm the visual direction.</p>
                  <div className="mt-[6%] grid grid-cols-2 gap-2">
                    <button type="button" className="rounded-lg border border-white/[0.08] bg-white/[0.025] py-2 text-[0.44rem] font-semibold text-white/38">Request changes</button>
                    <button type="button" className="rounded-lg bg-gradient-to-r from-[#7c5cff] to-[#29d6ff] py-2 text-[0.44rem] font-semibold text-[#071014]">Approve</button>
                  </div>
                </DashboardSection>

                <DashboardSection id="messages" activeId={activeId} className="p-[5%]">
                  <div className="flex items-center justify-between">
                    <p className="text-[0.42rem] uppercase tracking-[0.18em] text-white/24">Latest update</p>
                    <MessageSquareText className="h-3.5 w-3.5 text-[#8be9ff]" />
                  </div>
                  <div className="mt-[7%] flex gap-2.5">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#8be9ff]/10 text-[0.42rem] font-bold text-[#8be9ff]">GS</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-[0.48rem] font-semibold text-white/70">GridSpell</p>
                        <span className="text-[0.36rem] text-white/18">2h ago</span>
                      </div>
                      <p className="mt-2 text-[0.44rem] leading-4 text-white/32">The homepage direction is ready. We highlighted the decisions that need your review.</p>
                    </div>
                  </div>
                  <div className="mt-[7%] flex items-center gap-2 rounded-lg border border-white/[0.06] bg-[#0a0d13] px-3 py-2.5 text-[0.42rem] text-white/24">
                    <span className="flex-1">Write a reply…</span>
                    <ArrowRight className="h-3 w-3 text-[#8be9ff]" />
                  </div>
                </DashboardSection>
              </div>
            </div>
          </main>
        </div>
      </motion.div>

      {animate && !compact ? (
        <>
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute rounded-xl border-2 border-[#8be9ff]/75 shadow-[0_0_0_999px_rgba(4,6,10,0.24),0_0_36px_rgba(41,214,255,0.2)]"
            animate={{
              left: activeStep.focus.left,
              top: activeStep.focus.top,
              width: activeStep.focus.width,
              height: activeStep.focus.height
            }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute z-20"
            animate={{ left: activeStep.cursor.left, top: activeStep.cursor.top }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              className="absolute -left-4 -top-4 h-8 w-8 rounded-full border border-[#8be9ff]/35 bg-[#8be9ff]/10"
              animate={{ scale: [0.8, 1.45, 0.8], opacity: [0.65, 0, 0.65] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <MousePointer2 className="relative h-5 w-5 fill-white text-[#071014] drop-shadow-[0_3px_8px_rgba(0,0,0,0.45)]" />
          </motion.div>
        </>
      ) : null}
    </div>
  );
}

function MonitorFrame({
  activeStep,
  animate = true,
  compact = false
}: {
  activeStep: DashboardTourStep;
  animate?: boolean;
  compact?: boolean;
}) {
  return (
    <div className="relative mx-auto w-full max-w-[980px]">
      <div className="relative rounded-[1.4rem] border border-white/[0.16] bg-gradient-to-b from-[#242832] to-[#0b0d12] p-2 shadow-[0_55px_150px_rgba(0,0,0,0.58),inset_0_1px_0_rgba(255,255,255,0.13)] sm:rounded-[2rem] sm:p-3">
        <div className="overflow-hidden rounded-[1rem] border border-black bg-black sm:rounded-[1.45rem]">
          <div className="flex h-9 items-center justify-between border-b border-white/[0.07] bg-[#090b10] px-3 sm:h-11 sm:px-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-white/20" />
              <span className="h-2 w-2 rounded-full bg-white/12" />
              <span className="h-2 w-2 rounded-full bg-white/[0.07]" />
            </div>
            <div className="rounded-full border border-white/[0.07] bg-white/[0.03] px-5 py-1 text-[0.46rem] tracking-[0.1em] text-white/28">
              portal.gridspellstudio.com
            </div>
            <PanelLeft className="h-3.5 w-3.5 text-white/20" />
          </div>
          <div className={cn("relative aspect-[16/10]", compact && "min-h-[260px]")}> 
            <DashboardCanvas activeStep={activeStep} animate={animate} compact={compact} />
          </div>
        </div>
      </div>

      {!compact ? (
        <div aria-hidden="true" className="mx-auto hidden sm:block">
          <div className="mx-auto h-16 w-24 bg-gradient-to-b from-[#242832] to-[#0b0d12] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]" />
          <div className="mx-auto h-3 w-56 rounded-[50%] border border-white/[0.1] bg-[#171a21] shadow-[0_18px_45px_rgba(0,0,0,0.5)]" />
        </div>
      ) : null}
    </div>
  );
}

function TourCopy({ step }: { step: DashboardTourStep }) {
  const Icon = iconMap[step.id];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step.id}
        initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl border border-[#8be9ff]/22 bg-[#8be9ff]/7 text-[#8be9ff]">
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <p className="font-mono text-[0.58rem] tracking-[0.22em] text-white/24">{step.number} / 06</p>
            <p className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.27em] text-[#8be9ff]">{step.eyebrow}</p>
          </div>
        </div>

        <h3 className="mt-7 text-balance font-display text-[clamp(2.8rem,4.8vw,5.5rem)] font-semibold leading-[0.88] tracking-[-0.07em] text-white">
          {step.title}
        </h3>

        <p className="mt-6 max-w-xl text-base leading-8 text-white/46">{step.description}</p>

        <div className="mt-7 border-l border-[#8be9ff]/30 pl-5">
          <p className="text-[0.57rem] font-semibold uppercase tracking-[0.24em] text-white/25">Why it matters</p>
          <p className="mt-3 max-w-lg text-sm leading-7 text-white/64">{step.benefit}</p>
        </div>

        <div className="mt-7 flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.025] px-4 py-4">
          <MousePointer2 className="h-4 w-4 shrink-0 text-[#8be9ff]" />
          <p className="text-xs font-semibold text-white/48">{step.action}</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function DesktopDashboardTour() {
  const trackRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const nextIndex = Math.min(
      dashboardTourSteps.length - 1,
      Math.max(0, Math.round(value * (dashboardTourSteps.length - 1)))
    );
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  const activeStep = dashboardTourSteps[activeIndex];

  function scrollToStep(index: number) {
    const track = trackRef.current;
    if (!track) return;

    const top = window.scrollY + track.getBoundingClientRect().top;
    const distance = Math.max(0, track.offsetHeight - window.innerHeight);
    const ratio = index / (dashboardTourSteps.length - 1);

    window.scrollTo({
      top: top + distance * ratio,
      behavior: "smooth"
    });
  }

  return (
    <section
      ref={trackRef}
      className="relative hidden lg:block"
      style={{ height: `${dashboardTourSteps.length * 105 + 80}vh` }}
    >
      <div className="sticky top-0 h-dvh overflow-hidden bg-[#07080c]">
        <div aria-hidden="true" className="page-grid pointer-events-none absolute inset-0 opacity-35" />
        <div aria-hidden="true" className="pointer-events-none absolute left-[20%] top-[18%] h-[34rem] w-[34rem] rounded-full bg-[#7c5cff]/8 blur-[150px]" />
        <div aria-hidden="true" className="pointer-events-none absolute right-[5%] top-[38%] h-[28rem] w-[28rem] rounded-full bg-[#29d6ff]/6 blur-[140px]" />

        <Container className="relative h-full py-20">
          <div className="grid h-full grid-cols-[1.45fr_0.55fr] items-center gap-12 xl:gap-20">
            <div className="min-w-0">
              <MonitorFrame activeStep={activeStep} />
            </div>

            <div className="flex h-full min-h-0 flex-col justify-center">
              <TourCopy step={activeStep} />

              <div className="mt-9 flex items-center gap-2">
                {dashboardTourSteps.map((step, index) => (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => scrollToStep(index)}
                    aria-label={`Show ${step.label}`}
                    aria-current={activeIndex === index ? "step" : undefined}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      activeIndex === index
                        ? "w-9 bg-[#8be9ff]"
                        : "w-2 bg-white/16 hover:bg-white/38"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-7 left-6 flex items-center gap-3 text-[0.56rem] uppercase tracking-[0.24em] text-white/22">
            <ArrowDown className="h-3.5 w-3.5" />
            Scroll to explore the workspace
          </div>
        </Container>
      </div>
    </section>
  );
}

function MobileDashboardTour({ reduceMotion = false }: { reduceMotion?: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = dashboardTourSteps[activeIndex];

  return (
    <section className={cn("py-14", !reduceMotion && "lg:hidden")}>
      <Container>
        <div className="overflow-x-auto pb-3">
          <div className="flex min-w-max gap-2">
            {dashboardTourSteps.map((step, index) => {
              const Icon = iconMap[step.id];
              const active = index === activeIndex;

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-pressed={active}
                  className={cn(
                    "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-xs font-semibold transition",
                    active
                      ? "border-[#8be9ff]/35 bg-[#8be9ff]/8 text-white"
                      : "border-white/[0.08] bg-white/[0.025] text-white/38"
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {step.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-5">
          <MonitorFrame activeStep={activeStep} animate={!reduceMotion} compact />
        </div>

        <div className="mt-8 rounded-[2rem] border border-white/[0.09] bg-white/[0.025] p-6 sm:p-8">
          <TourCopy step={activeStep} />

          <div className="mt-8 flex items-center justify-between gap-3 border-t border-white/[0.08] pt-6">
            <button
              type="button"
              onClick={() => setActiveIndex((current) => Math.max(0, current - 1))}
              disabled={activeIndex === 0}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/[0.09] px-4 text-xs font-semibold text-white/46 transition enabled:hover:border-white/18 enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-25"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Previous
            </button>
            <span className="font-mono text-[0.6rem] tracking-[0.2em] text-white/24">
              {String(activeIndex + 1).padStart(2, "0")} / 06
            </span>
            <button
              type="button"
              onClick={() =>
                setActiveIndex((current) =>
                  Math.min(dashboardTourSteps.length - 1, current + 1)
                )
              }
              disabled={activeIndex === dashboardTourSteps.length - 1}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gradient-to-r from-[#7c5cff] to-[#29d6ff] px-4 text-xs font-semibold !text-[#071014] transition enabled:hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-30"
            >
              Next
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function ClientDashboardTour() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.08 });

  return (
    <section ref={sectionRef} id="client-workspace" className="relative overflow-hidden bg-[#07080c] pt-24 lg:pt-32">
      <div aria-hidden="true" className="page-grid pointer-events-none absolute inset-0 opacity-35" />
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[34rem] w-[76rem] -translate-x-1/2 rounded-full bg-[#7c5cff]/9 blur-[180px]" />

      <Container className="relative">
        <div className="grid gap-10 border-b border-white/[0.08] pb-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:pb-20">
          <div>
            <div className="flex items-center gap-4">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-[#8be9ff]/22 bg-[#8be9ff]/7">
                <LayoutDashboard className="h-5 w-5 text-[#8be9ff]" />
              </span>
              <p className="text-[0.64rem] font-semibold uppercase tracking-[0.36em] text-[#8be9ff]">Client workspace</p>
            </div>
            <h2 className="mt-8 text-balance font-display text-[clamp(4rem,9vw,8.4rem)] font-semibold leading-[0.8] tracking-[-0.085em] text-white">
              Your project, under control.
            </h2>
          </div>

          <div className="lg:pb-2">
            <p className="max-w-2xl text-base leading-8 text-white/46 sm:text-lg sm:leading-9">
              Every GridSpell client receives one clear workspace for progress, files, feedback, approvals, communication, and launch preparation.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {[
                ["No complicated setup", Sparkles],
                ["Desktop and mobile", LayoutDashboard],
                ["Everything in one place", ShieldCheck]
              ].map(([label, Icon]) => {
                const FeatureIcon = Icon as typeof Sparkles;
                return (
                  <div key={String(label)} className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.025] px-4 py-3">
                    <FeatureIcon className="h-4 w-4 shrink-0 text-[#8be9ff]" />
                    <span className="text-xs font-semibold text-white/42">{String(label)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>

      {reduceMotion ? (
        <MobileDashboardTour reduceMotion />
      ) : (
        <>
          {inView ? <DesktopDashboardTour /> : <div className="hidden min-h-[100vh] lg:block" />}
          <MobileDashboardTour />
        </>
      )}

      <Container className="relative pb-24 pt-14 lg:pb-32 lg:pt-20">
        <div className="overflow-hidden rounded-[2rem] border border-[#8be9ff]/18 bg-[radial-gradient(circle_at_85%_15%,rgba(41,214,255,0.1),transparent_24rem),linear-gradient(145deg,rgba(124,92,255,0.11),rgba(255,255,255,0.02))] p-7 sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-[#8be9ff]">Designed to be understood from day one</p>
              <h3 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-[0.94] tracking-[-0.06em] text-white sm:text-6xl">
                The dashboard keeps everything visible. The process keeps everything moving.
              </h3>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/44 sm:text-base">
                You stay informed without becoming a project-management expert—and every important decision has a clear place to happen.
              </p>
            </div>

            <a
              href="#process-steps"
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#7c5cff] to-[#29d6ff] px-6 text-sm font-semibold !text-[#071014] shadow-[0_14px_40px_rgba(41,214,255,0.16)] transition hover:-translate-y-0.5 hover:brightness-110"
            >
              See the full process
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
