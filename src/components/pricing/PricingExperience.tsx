"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  Check,
  CheckCircle2,
  CircleDollarSign,
  FilePenLine,
  Gauge,
  Languages,
  LayoutTemplate,
  MessagesSquare,
  Minus,
  Plus,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  WandSparkles,
  X
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  useEffect,
  useMemo,
  useState,
  type ComponentType,
  type ReactNode
} from "react";

import { ActionLink, actionControlClassName } from "@/components/ui/ActionControl";
import { Container } from "@/components/ui/Container";
import {
  packages,
  type PricingPackage,
  type PricingPackageId
} from "@/config/packages";
import { cn } from "@/lib/utils";

type IconComponent = ComponentType<{ className?: string }>;
type PageChoice = "1-5" | "6-10" | "10+";
type IntegrationChoice = "none" | "booking" | "crm";
type CustomChoice = "none" | "moderate" | "advanced";
type BillingCycle = "monthly" | "annual";

type AddOn = {
  id: string;
  name: string;
  description: string;
  price: number;
  priceLabel: string;
  weeks: number;
  icon: IconComponent;
};

const addOns: readonly AddOn[] = [
  {
    id: "additional-page",
    name: "Additional page",
    description: "A new strategic page using the approved design system.",
    price: 250,
    priceLabel: "From $250",
    weeks: 0,
    icon: LayoutTemplate
  },
  {
    id: "copywriting",
    name: "Conversion copywriting",
    description: "Structured website copy shaped around clarity and action.",
    price: 900,
    priceLabel: "From $900",
    weeks: 1,
    icon: FilePenLine
  },
  {
    id: "reviews",
    name: "Google reviews integration",
    description: "A branded review feed with reliable fallback content.",
    price: 350,
    priceLabel: "From $350",
    weeks: 0,
    icon: BadgeCheck
  },
  {
    id: "multilingual",
    name: "Multilingual setup",
    description: "Language routing and reusable translated page structure.",
    price: 600,
    priceLabel: "From $600",
    weeks: 1,
    icon: Languages
  },
  {
    id: "motion",
    name: "Advanced motion direction",
    description: "A more cinematic interaction system beyond core transitions.",
    price: 750,
    priceLabel: "From $750",
    weeks: 1,
    icon: Sparkles
  },
  {
    id: "brand-refinement",
    name: "Brand refinement",
    description: "A focused visual polish for typography, colour, and digital usage.",
    price: 650,
    priceLabel: "From $650",
    weeks: 1,
    icon: WandSparkles
  }
] as const;

const carePlans = [
  {
    name: "Essential Care",
    monthlyPrice: 149,
    summary: "Reliable maintenance for a focused business website.",
    features: [
      "Software and dependency updates",
      "Uptime and form monitoring",
      "Monthly backups and health checks",
      "Small content changes",
      "Standard support response"
    ]
  },
  {
    name: "Growth Care",
    monthlyPrice: 299,
    summary: "Ongoing improvement for a website actively generating leads.",
    features: [
      "Everything in Essential Care",
      "Priority content updates",
      "Performance and analytics review",
      "Conversion tracking checks",
      "Two development hours monthly"
    ]
  },
  {
    name: "Custom Care",
    monthlyPrice: 599,
    summary: "A flexible development partnership for evolving platforms.",
    features: [
      "Ongoing feature development",
      "Integration and automation support",
      "Priority response window",
      "Monthly strategy conversation",
      "Custom development allocation"
    ]
  }
] as const;

const pricingFactors = [
  {
    title: "Number of unique page layouts",
    text: "Repeating an approved layout is efficient. Pages that require new content strategy, interaction patterns, or custom components add more design and development time."
  },
  {
    title: "Content readiness",
    text: "Projects move faster when final copy, imagery, and business details are available. Copywriting, content cleanup, and migration can be included when needed."
  },
  {
    title: "Integrations and automation",
    text: "Booking platforms, CRMs, payment systems, review feeds, email workflows, and external APIs each require configuration, testing, and failure handling."
  },
  {
    title: "Custom functionality",
    text: "Authentication, dashboards, databases, permissions, document workflows, and internal tools move the project from a marketing website into custom product development."
  },
  {
    title: "Motion and visual complexity",
    text: "Subtle interface movement is included. Cinematic transitions, custom illustrations, 3D work, and highly choreographed scenes require dedicated production time."
  }
] as const;

const currencyFormatter = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  maximumFractionDigits: 0
});

function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

function getRecommendedPackageId(
  pages: PageChoice,
  cms: boolean,
  integration: IntegrationChoice,
  custom: CustomChoice
): PricingPackageId {
  if (pages === "10+" || custom === "advanced") return "custom";
  if (pages === "6-10" || cms || integration !== "none" || custom === "moderate") {
    return "growth";
  }
  return "launch";
}

function getScopeAdjustment(
  packageId: PricingPackageId,
  pages: PageChoice,
  cms: boolean,
  integration: IntegrationChoice,
  custom: CustomChoice
) {
  let price = 0;
  let weeks = 0;

  if (packageId === "launch") {
    if (pages === "6-10") {
      price += 1700;
      weeks += 2;
    }
    if (pages === "10+") {
      price += 4000;
      weeks += 4;
    }
    if (cms) price += 750;
    if (integration === "booking") price += 500;
    if (integration === "crm") {
      price += 1250;
      weeks += 1;
    }
    if (custom === "moderate") {
      price += 1800;
      weeks += 2;
    }
    if (custom === "advanced") {
      price += 4200;
      weeks += 4;
    }
  }

  if (packageId === "growth") {
    if (pages === "10+") {
      price += 2500;
      weeks += 3;
    }
    if (integration === "crm") price += 750;
    if (custom === "moderate") {
      price += 1400;
      weeks += 2;
    }
    if (custom === "advanced") {
      price += 3200;
      weeks += 4;
    }
  }

  if (packageId === "custom") {
    if (integration === "crm") price += 500;
    if (custom === "advanced") {
      price += 1500;
      weeks += 2;
    }
  }

  return { price, weeks };
}

function getBaseTimeline(packageId: PricingPackageId) {
  if (packageId === "launch") return [3, 4] as const;
  if (packageId === "growth") return [5, 7] as const;
  return [8, 10] as const;
}

function Reveal({
  children,
  className,
  delay = 0
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.52, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <Reveal>
      <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#8be9ff]">
        {eyebrow}
      </p>
      <h2 className="mt-5 max-w-4xl text-balance font-display text-4xl font-semibold leading-[0.94] tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
        {title}
      </h2>
      <p className="mt-6 max-w-2xl text-base leading-8 text-white/44 sm:text-lg sm:leading-9">
        {description}
      </p>
    </Reveal>
  );
}

function EstimateNumber({ low, high }: { low: number; high: number }) {
  const reduceMotion = useReducedMotion();
  const key = `${low}-${high}`;

  return (
    <div className="relative min-h-[3.5rem] overflow-hidden" aria-live="polite">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.p
          key={key}
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -18 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
          className="absolute inset-x-0 top-0 font-display text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-none tracking-[-0.065em] text-white"
        >
          {formatCurrency(low)}–{formatCurrency(high)}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

function PackageCard({
  item,
  selected,
  recommended,
  onOpen
}: {
  item: PricingPackage;
  selected: boolean;
  recommended: boolean;
  onOpen: () => void;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      whileHover={reduceMotion ? undefined : { y: -6, scale: 1.008 }}
      whileTap={reduceMotion ? undefined : { scale: 0.992 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      aria-label={`Explore the ${item.name} package`}
      className={cn(
        "group relative flex h-full min-h-[37rem] w-full flex-col overflow-hidden rounded-[2rem] border p-7 text-left transition-[border-color,background-color,box-shadow] duration-300 sm:p-8",
        item.highlighted
          ? "border-[#7c5cff]/48 bg-[radial-gradient(circle_at_90%_5%,rgba(41,214,255,0.12),transparent_16rem),linear-gradient(145deg,rgba(124,92,255,0.16),rgba(11,13,19,0.96))] shadow-[0_28px_100px_rgba(55,38,115,0.18)] lg:-translate-y-3"
          : "border-white/[0.09] bg-white/[0.025] hover:border-white/[0.17] hover:bg-white/[0.04]",
        selected &&
          "border-[#8be9ff]/60 bg-[radial-gradient(circle_at_90%_5%,rgba(41,214,255,0.14),transparent_17rem),rgba(11,13,19,0.96)] shadow-[0_22px_80px_rgba(41,214,255,0.12)]"
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#7c5cff]/10 blur-[70px] transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-[#8be9ff]">
            {item.eyebrow}
          </p>
          <h3 className="mt-4 font-display text-4xl font-semibold tracking-[-0.06em] text-white">
            {item.name}
          </h3>
        </div>
        <div className="flex flex-col items-end gap-2">
          {item.highlighted ? (
            <span className="rounded-full border border-[#8be9ff]/18 bg-[#8be9ff]/7 px-3 py-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-[#8be9ff]">
              Most popular
            </span>
          ) : null}
          {recommended ? (
            <span className="rounded-full border border-[#69e6ad]/20 bg-[#69e6ad]/8 px-3 py-1.5 text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-[#7aefb9]">
              Recommended
            </span>
          ) : null}
          {selected ? (
            <span className="grid h-8 w-8 place-items-center rounded-full border border-[#8be9ff]/30 bg-[#8be9ff]/10 text-[#8be9ff]">
              <Check className="h-4 w-4" />
            </span>
          ) : null}
        </div>
      </div>

      <div className="relative mt-10">
        <p className="font-display text-[clamp(2.1rem,3.3vw,3.2rem)] font-semibold leading-none tracking-[-0.065em] text-white">
          {item.price}
        </p>
        <div className="mt-5 flex items-center gap-2 text-xs text-white/34">
          <CalendarDays className="h-3.5 w-3.5 text-[#8be9ff]" />
          Typical timeline: {item.timeline}
        </div>
        <p className="mt-6 text-sm leading-7 text-white/44">{item.summary}</p>
      </div>

      <ul className="relative mt-8 grid gap-3 border-t border-white/[0.08] pt-7">
        {item.features.map((feature) => (
          <li key={feature} className="flex gap-3 text-sm leading-6 text-white/52">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#8be9ff]" />
            {feature}
          </li>
        ))}
      </ul>

      <div className="relative mt-auto flex items-center justify-between border-t border-white/[0.08] pt-7">
        <span className="text-xs font-semibold text-white/58">
          {selected ? "Selected package" : "Explore package"}
        </span>
        <span className="grid h-10 w-10 place-items-center rounded-full border border-white/[0.1] bg-white/[0.035] text-white/46 transition duration-200 group-hover:translate-x-1 group-hover:border-[#8be9ff]/25 group-hover:text-[#8be9ff]">
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </motion.button>
  );
}

function PackageDrawer({
  item,
  onClose,
  onChoose
}: {
  item: PricingPackage | null;
  onClose: () => void;
  onChoose: (id: PricingPackageId) => void;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {item ? (
        <div className="fixed inset-0 z-[80]">
          <motion.button
            type="button"
            aria-label="Close package details"
            className="absolute inset-0 bg-black/72 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="package-drawer-title"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 48, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 48, y: 10 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 bottom-0 max-h-[92dvh] overflow-y-auto rounded-t-[2rem] border border-white/[0.11] bg-[#0a0c12] shadow-2xl lg:inset-y-0 lg:left-auto lg:right-0 lg:max-h-none lg:w-[min(44rem,48vw)] lg:rounded-none lg:rounded-l-[2rem]"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/[0.08] bg-[#0a0c12]/92 px-6 py-5 backdrop-blur-xl sm:px-8">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-[#8be9ff]">
                Package details
              </p>
              <button
                type="button"
                onClick={onClose}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/[0.1] bg-white/[0.03] text-white/45 transition hover:border-white/20 hover:text-white"
                aria-label="Close package details"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-6 sm:p-8 lg:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/28">
                {item.eyebrow}
              </p>
              <h2
                id="package-drawer-title"
                className="mt-5 font-display text-5xl font-semibold tracking-[-0.07em] text-white sm:text-6xl"
              >
                {item.name}
              </h2>
              <p className="mt-6 font-display text-3xl font-semibold tracking-[-0.055em] text-white/88">
                {item.price}
              </p>
              <p className="mt-3 text-sm text-[#8be9ff]">Estimated timeline: {item.timeline}</p>
              <p className="mt-7 text-base leading-8 text-white/46">{item.summary}</p>

              <div className="mt-9 rounded-[1.5rem] border border-[#8be9ff]/16 bg-[#8be9ff]/5 p-5">
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-[#8be9ff]">
                  Best suited for
                </p>
                <p className="mt-3 text-sm leading-7 text-white/55">{item.bestFor}</p>
              </div>

              <div className="mt-10">
                <h3 className="font-display text-2xl font-semibold tracking-[-0.04em] text-white">
                  Everything included
                </h3>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {item.fullFeatures.map((feature, index) => (
                    <motion.li
                      key={feature}
                      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: reduceMotion ? 0 : index * 0.035 }}
                      className="flex gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 text-sm leading-6 text-white/48"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#8be9ff]" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.025] p-5">
                  <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-white/28">
                    Typical example
                  </p>
                  <p className="mt-4 text-sm leading-7 text-white/48">{item.example}</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.025] p-5">
                  <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-white/28">
                    Not normally included
                  </p>
                  <ul className="mt-4 grid gap-2 text-sm leading-6 text-white/42">
                    {item.exclusions.map((exclusion) => (
                      <li key={exclusion} className="flex gap-2">
                        <Minus className="mt-1 h-3.5 w-3.5 shrink-0 text-white/22" />
                        {exclusion}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10 rounded-[1.5rem] border border-white/[0.08] bg-white/[0.025] p-5">
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-white/28">
                  Typical payment structure
                </p>
                <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                  {[
                    ["40%", "Project start"],
                    ["30%", "Design approval"],
                    ["30%", "Before launch"]
                  ].map(([amount, label]) => (
                    <div key={label} className="rounded-xl border border-white/[0.07] bg-black/15 p-3">
                      <p className="font-display text-xl font-semibold text-white">{amount}</p>
                      <p className="mt-1 text-[0.56rem] leading-4 text-white/30">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onChoose(item.id)}
                className={cn(actionControlClassName, "mt-10 w-full")}
              >
                Choose {item.name}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
}

function OptionButton({
  selected,
  title,
  description,
  onClick
}: {
  selected: boolean;
  title: string;
  description: string;
  onClick: () => void;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={reduceMotion ? undefined : { scale: 0.985 }}
      className={cn(
        "relative min-h-28 rounded-[1.35rem] border p-5 text-left transition-[border-color,background-color,box-shadow] duration-200",
        selected
          ? "border-[#8be9ff]/42 bg-[#8be9ff]/7 shadow-[0_12px_38px_rgba(41,214,255,0.08)]"
          : "border-white/[0.08] bg-white/[0.025] hover:border-white/[0.16] hover:bg-white/[0.04]"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={cn("text-sm font-semibold", selected ? "text-white" : "text-white/64")}>
            {title}
          </p>
          <p className="mt-2 text-xs leading-6 text-white/32">{description}</p>
        </div>
        <span
          className={cn(
            "grid h-7 w-7 shrink-0 place-items-center rounded-full border transition",
            selected
              ? "border-[#8be9ff]/40 bg-[#8be9ff]/12 text-[#8be9ff]"
              : "border-white/[0.1] text-transparent"
          )}
        >
          <Check className="h-3.5 w-3.5" />
        </span>
      </div>
    </motion.button>
  );
}

export function PricingExperience() {
  const reduceMotion = useReducedMotion();
  const [selectedPackageId, setSelectedPackageId] = useState<PricingPackageId | null>(null);
  const [detailPackageId, setDetailPackageId] = useState<PricingPackageId | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [pages, setPages] = useState<PageChoice>("1-5");
  const [cms, setCms] = useState(false);
  const [integration, setIntegration] = useState<IntegrationChoice>("none");
  const [custom, setCustom] = useState<CustomChoice>("none");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [openFactor, setOpenFactor] = useState<number | null>(0);

  const detailPackage = packages.find((item) => item.id === detailPackageId) ?? null;
  const recommendedPackageId = useMemo(
    () => getRecommendedPackageId(pages, cms, integration, custom),
    [pages, cms, integration, custom]
  );
  const activePackageId = selectedPackageId ?? recommendedPackageId;
  const activePackage = packages.find((item) => item.id === activePackageId) ?? packages[0];

  const chosenAddOns = useMemo(
    () => addOns.filter((item) => selectedAddOns.includes(item.id)),
    [selectedAddOns]
  );
  const addOnTotal = chosenAddOns.reduce((sum, item) => sum + item.price, 0);
  const addOnWeeks = chosenAddOns.reduce((sum, item) => sum + item.weeks, 0);
  const scopeAdjustment = getScopeAdjustment(
    activePackage.id,
    pages,
    cms,
    integration,
    custom
  );
  const estimateLow = activePackage.startingPrice + scopeAdjustment.price + addOnTotal;
  const estimateHigh =
    estimateLow + Math.max(1000, Math.round((estimateLow * 0.18) / 50) * 50);
  const [baseLowWeeks, baseHighWeeks] = getBaseTimeline(activePackage.id);
  const timelineLow = baseLowWeeks + scopeAdjustment.weeks + addOnWeeks;
  const timelineHigh = baseHighWeeks + scopeAdjustment.weeks + addOnWeeks;
  const timelineLabel = `${timelineLow}–${timelineHigh} weeks`;

  const pricingParams = useMemo(() => {
    const params = new URLSearchParams({
      package: activePackage.id,
      estimateLow: String(estimateLow),
      estimateHigh: String(estimateHigh),
      timeline: timelineLabel,
      pages,
      cms: cms ? "yes" : "no",
      integration,
      custom
    });

    if (chosenAddOns.length > 0) {
      params.set("addOns", chosenAddOns.map((item) => item.name).join(", "));
    }

    return params.toString();
  }, [
    activePackage.id,
    estimateHigh,
    estimateLow,
    timelineLabel,
    pages,
    cms,
    integration,
    custom,
    chosenAddOns
  ]);

  useEffect(() => {
    if (!detailPackageId) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setDetailPackageId(null);
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [detailPackageId]);

  function selectPackage(id: PricingPackageId) {
    setSelectedPackageId(id);
    setDetailPackageId(null);
    window.setTimeout(() => {
      document.getElementById("estimate-builder")?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start"
      });
    }, reduceMotion ? 0 : 180);
  }

  function advanceQuestion() {
    window.setTimeout(
      () => setQuestionIndex((current) => Math.min(3, current + 1)),
      reduceMotion ? 0 : 170
    );
  }

  function toggleAddOn(id: string) {
    setSelectedAddOns((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }

  return (
    <main className="overflow-x-clip bg-[#07080c]">
      <section className="relative min-h-[82vh] overflow-hidden border-b border-white/[0.07] pb-24 pt-36 lg:pb-32 lg:pt-44">
        <div aria-hidden="true" className="page-grid pointer-events-none absolute inset-0 opacity-35" />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-20 h-[36rem] w-[36rem] rounded-full bg-[#7c5cff]/13 blur-[170px]"
          animate={reduceMotion ? undefined : { x: [0, 18, 0], y: [0, -10, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-10rem] top-[-4rem] h-[34rem] w-[34rem] rounded-full bg-[#29d6ff]/10 blur-[160px]"
          animate={reduceMotion ? undefined : { x: [0, -14, 0], y: [0, 12, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />

        <Container className="relative">
          <div className="grid gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div>
              <motion.p
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-xs font-semibold uppercase tracking-[0.36em] text-[#8be9ff]"
              >
                Clear scope. Honest pricing.
              </motion.p>
              <motion.h1
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="mt-7 max-w-[11ch] text-balance font-display text-[clamp(4.2rem,9vw,9rem)] font-semibold leading-[0.82] tracking-[-0.085em] text-white"
              >
                Choose a starting point. Build the right website.
              </motion.h1>
              <motion.p
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.16 }}
                className="mt-8 max-w-2xl text-base leading-8 text-white/46 sm:text-lg sm:leading-9"
              >
                Every GridSpell project is custom. These packages provide a practical
                starting point for scope, timeline, and investment—then the estimator helps
                shape a more useful range.
              </motion.p>
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.23 }}
                className="mt-9 flex flex-wrap gap-3 text-xs text-white/34"
              >
                {["Custom design", "Responsive development", "Transparent scope"].map(
                  (label) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-4 py-2.5"
                    >
                      <Check className="h-3.5 w-3.5 text-[#8be9ff]" />
                      {label}
                    </span>
                  )
                )}
              </motion.div>
            </div>

            <motion.aside
              initial={reduceMotion ? false : { opacity: 0, scale: 0.98, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.62, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-[2rem] border border-white/[0.1] bg-[radial-gradient(circle_at_90%_0%,rgba(41,214,255,0.11),transparent_18rem),rgba(11,13,19,0.88)] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:p-8"
            >
              <div aria-hidden="true" className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#8be9ff]/60 to-transparent" />
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-[#8be9ff]">
                    Your estimate preview
                  </p>
                  <p className="mt-2 text-xs text-white/28">Updates as you configure the project</p>
                </div>
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-[#8be9ff]/18 bg-[#8be9ff]/7">
                  <CircleDollarSign className="h-5 w-5 text-[#8be9ff]" />
                </span>
              </div>

              <dl className="mt-8 grid gap-4">
                <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] pb-4">
                  <dt className="text-xs text-white/30">Package</dt>
                  <dd className="text-sm font-semibold text-white/72">
                    {selectedPackageId ? activePackage.name : "Not selected"}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] pb-4">
                  <dt className="text-xs text-white/30">Current recommendation</dt>
                  <dd className="text-sm font-semibold text-[#8be9ff]">{activePackage.name}</dd>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] pb-4">
                  <dt className="text-xs text-white/30">Add-ons</dt>
                  <dd className="text-sm font-semibold text-white/72">{chosenAddOns.length}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-xs text-white/30">Timeline</dt>
                  <dd className="text-sm font-semibold text-white/72">{timelineLabel}</dd>
                </div>
              </dl>

              <div className="mt-8 border-t border-white/[0.08] pt-7">
                <p className="text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-white/25">
                  Estimated investment
                </p>
                <div className="mt-4">
                  <EstimateNumber low={estimateLow} high={estimateHigh} />
                </div>
                <p className="mt-3 text-xs leading-6 text-white/28">
                  An initial planning range—not an automatic quote.
                </p>
              </div>
            </motion.aside>
          </div>
        </Container>
      </section>

      <section className="relative py-24 lg:py-32">
        <Container>
          <SectionHeading
            eyebrow="Choose a starting point"
            title="Three clear ways to build."
            description="Open any package for the complete scope, typical use case, payment structure, and exclusions. The entire card is interactive."
          />

          <div className="mt-16 grid gap-5 lg:grid-cols-3 lg:items-stretch">
            {packages.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.07}>
                <PackageCard
                  item={item}
                  selected={selectedPackageId === item.id}
                  recommended={recommendedPackageId === item.id && selectedPackageId !== item.id}
                  onOpen={() => setDetailPackageId(item.id)}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section
        id="estimate-builder"
        className="relative scroll-mt-24 border-y border-white/[0.07] bg-white/[0.012] py-24 lg:py-32"
      >
        <div aria-hidden="true" className="page-grid pointer-events-none absolute inset-0 opacity-20" />
        <Container className="relative">
          <SectionHeading
            eyebrow="Build your estimate"
            title="Answer four useful questions."
            description="The range updates immediately as the scope changes. It is designed to create a better first conversation—not replace a reviewed proposal."
          />

          <div className="mt-16 grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-start">
            <Reveal>
              <div className="overflow-hidden rounded-[2rem] border border-white/[0.09] bg-[#0b0d13]/90">
                <div className="border-b border-white/[0.08] p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-5">
                    <div>
                      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-[#8be9ff]">
                        Scope questionnaire
                      </p>
                      <p className="mt-2 text-sm text-white/34">Question {questionIndex + 1} of 4</p>
                    </div>
                    <div className="flex gap-2" aria-label="Estimator progress">
                      {[0, 1, 2, 3].map((index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setQuestionIndex(index)}
                          aria-label={`Go to estimator question ${index + 1}`}
                          className={cn(
                            "h-2 rounded-full transition-all duration-300",
                            index === questionIndex
                              ? "w-10 bg-[#8be9ff]"
                              : index < questionIndex
                                ? "w-5 bg-[#7c5cff]/70"
                                : "w-5 bg-white/[0.1]"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="min-h-[29rem] p-6 sm:p-8">
                  <AnimatePresence mode="wait" initial={false}>
                    {questionIndex === 0 ? (
                      <motion.div
                        key="pages"
                        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                        transition={{ duration: 0.24 }}
                      >
                        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-white/24">
                          01 · Page scope
                        </p>
                        <h3 className="mt-4 font-display text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
                          How many pages do you expect?
                        </h3>
                        <p className="mt-4 max-w-xl text-sm leading-7 text-white/38">
                          Count unique business pages—not every repeated article or project entry.
                        </p>
                        <div className="mt-8 grid gap-3 sm:grid-cols-3">
                          <OptionButton
                            selected={pages === "1-5"}
                            title="1–5 pages"
                            description="A focused brochure or service website."
                            onClick={() => {
                              setPages("1-5");
                              advanceQuestion();
                            }}
                          />
                          <OptionButton
                            selected={pages === "6-10"}
                            title="6–10 pages"
                            description="More services, proof, and sales content."
                            onClick={() => {
                              setPages("6-10");
                              advanceQuestion();
                            }}
                          />
                          <OptionButton
                            selected={pages === "10+"}
                            title="10+ pages"
                            description="A larger content system or platform."
                            onClick={() => {
                              setPages("10+");
                              advanceQuestion();
                            }}
                          />
                        </div>
                      </motion.div>
                    ) : null}

                    {questionIndex === 1 ? (
                      <motion.div
                        key="cms"
                        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                        transition={{ duration: 0.24 }}
                      >
                        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-white/24">
                          02 · Content management
                        </p>
                        <h3 className="mt-4 font-display text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
                          Will your team edit content?
                        </h3>
                        <p className="mt-4 max-w-xl text-sm leading-7 text-white/38">
                          A CMS is useful for articles, projects, services, team profiles, and frequently changing information.
                        </p>
                        <div className="mt-8 grid gap-3 sm:grid-cols-2">
                          <OptionButton
                            selected={!cms}
                            title="No CMS needed"
                            description="GridSpell manages structural changes after launch."
                            onClick={() => {
                              setCms(false);
                              advanceQuestion();
                            }}
                          />
                          <OptionButton
                            selected={cms}
                            title="Editable content"
                            description="My team needs a controlled editing workflow."
                            onClick={() => {
                              setCms(true);
                              advanceQuestion();
                            }}
                          />
                        </div>
                      </motion.div>
                    ) : null}

                    {questionIndex === 2 ? (
                      <motion.div
                        key="integrations"
                        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                        transition={{ duration: 0.24 }}
                      >
                        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-white/24">
                          03 · Connected systems
                        </p>
                        <h3 className="mt-4 font-display text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
                          What should the website connect to?
                        </h3>
                        <p className="mt-4 max-w-xl text-sm leading-7 text-white/38">
                          Select the closest starting point. The final discovery process confirms the exact systems.
                        </p>
                        <div className="mt-8 grid gap-3 sm:grid-cols-3">
                          <OptionButton
                            selected={integration === "none"}
                            title="Core forms only"
                            description="Standard inquiries delivered reliably."
                            onClick={() => {
                              setIntegration("none");
                              advanceQuestion();
                            }}
                          />
                          <OptionButton
                            selected={integration === "booking"}
                            title="Booking or reviews"
                            description="One practical third-party integration."
                            onClick={() => {
                              setIntegration("booking");
                              advanceQuestion();
                            }}
                          />
                          <OptionButton
                            selected={integration === "crm"}
                            title="CRM and automation"
                            description="Connected lead routing and workflows."
                            onClick={() => {
                              setIntegration("crm");
                              advanceQuestion();
                            }}
                          />
                        </div>
                      </motion.div>
                    ) : null}

                    {questionIndex === 3 ? (
                      <motion.div
                        key="custom"
                        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                        transition={{ duration: 0.24 }}
                      >
                        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-white/24">
                          04 · Custom functionality
                        </p>
                        <h3 className="mt-4 font-display text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
                          Does the project behave like software?
                        </h3>
                        <p className="mt-4 max-w-xl text-sm leading-7 text-white/38">
                          Accounts, dashboards, data, permissions, and custom workflows require a different delivery plan.
                        </p>
                        <div className="mt-8 grid gap-3 sm:grid-cols-3">
                          <OptionButton
                            selected={custom === "none"}
                            title="Marketing website"
                            description="Public pages and lead generation."
                            onClick={() => setCustom("none")}
                          />
                          <OptionButton
                            selected={custom === "moderate"}
                            title="Some custom workflows"
                            description="Advanced forms, data, or automation."
                            onClick={() => setCustom("moderate")}
                          />
                          <OptionButton
                            selected={custom === "advanced"}
                            title="Portal or application"
                            description="Accounts, dashboards, and permissions."
                            onClick={() => setCustom("advanced")}
                          />
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>

                  <div className="mt-9 flex items-center justify-between border-t border-white/[0.08] pt-6">
                    <button
                      type="button"
                      disabled={questionIndex === 0}
                      onClick={() => setQuestionIndex((current) => Math.max(0, current - 1))}
                      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/[0.09] px-4 text-xs font-semibold text-white/42 transition enabled:hover:border-white/18 enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-25"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      Previous
                    </button>
                    <button
                      type="button"
                      disabled={questionIndex === 3}
                      onClick={() => setQuestionIndex((current) => Math.min(3, current + 1))}
                      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/[0.09] px-4 text-xs font-semibold text-white/42 transition enabled:hover:border-white/18 enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-25"
                    >
                      Next
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <aside className="lg:sticky lg:top-28">
                <div className="relative overflow-hidden rounded-[2rem] border border-[#8be9ff]/18 bg-[radial-gradient(circle_at_100%_0%,rgba(41,214,255,0.11),transparent_20rem),rgba(11,13,19,0.94)] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-[#8be9ff]">
                        Live estimate
                      </p>
                      <p className="mt-2 text-xs text-white/28">Updates with every choice</p>
                    </div>
                    <motion.span
                      key={`${estimateLow}-${estimateHigh}`}
                      initial={reduceMotion ? false : { scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="rounded-full border border-[#69e6ad]/22 bg-[#69e6ad]/8 px-3 py-2 text-[0.58rem] font-semibold uppercase tracking-[0.17em] text-[#7aefb9]"
                    >
                      Estimate updated
                    </motion.span>
                  </div>

                  <div className="mt-8 rounded-[1.4rem] border border-white/[0.08] bg-black/15 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[0.56rem] uppercase tracking-[0.2em] text-white/24">
                          {selectedPackageId ? "Selected package" : "Recommended package"}
                        </p>
                        <p className="mt-2 font-display text-3xl font-semibold tracking-[-0.055em] text-white">
                          {activePackage.name}
                        </p>
                      </div>
                      {!selectedPackageId ? (
                        <span className="rounded-full border border-[#7c5cff]/25 bg-[#7c5cff]/10 px-3 py-1.5 text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-[#b7a7ff]">
                          Suggested
                        </span>
                      ) : null}
                    </div>
                    {!selectedPackageId ? (
                      <button
                        type="button"
                        onClick={() => setSelectedPackageId(activePackage.id)}
                        className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-[#8be9ff] transition hover:text-white"
                      >
                        Use this recommendation
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setSelectedPackageId(null)}
                        className="mt-5 text-xs font-semibold text-white/34 transition hover:text-white/70"
                      >
                        Return to automatic recommendation
                      </button>
                    )}
                  </div>

                  <div className="mt-8">
                    <p className="text-[0.56rem] font-semibold uppercase tracking-[0.2em] text-white/24">
                      Estimated investment
                    </p>
                    <div className="mt-4">
                      <EstimateNumber low={estimateLow} high={estimateHigh} />
                    </div>
                  </div>

                  <dl className="mt-7 grid gap-4 border-t border-white/[0.08] pt-6">
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-xs text-white/30">Base package</dt>
                      <dd className="text-sm font-semibold text-white/68">
                        {formatCurrency(activePackage.startingPrice)}+
                      </dd>
                    </div>
                    {scopeAdjustment.price > 0 ? (
                      <div className="flex items-center justify-between gap-4">
                        <dt className="text-xs text-white/30">Scope adjustment</dt>
                        <dd className="text-sm font-semibold text-white/68">
                          +{formatCurrency(scopeAdjustment.price)}
                        </dd>
                      </div>
                    ) : null}
                    {chosenAddOns.map((item) => (
                      <motion.div
                        layout
                        key={item.id}
                        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex items-center justify-between gap-4"
                      >
                        <dt className="text-xs text-white/30">{item.name}</dt>
                        <dd className="text-sm font-semibold text-white/68">
                          +{formatCurrency(item.price)}
                        </dd>
                      </motion.div>
                    ))}
                    <div className="flex items-center justify-between gap-4 border-t border-white/[0.07] pt-4">
                      <dt className="text-xs text-white/30">Estimated timeline</dt>
                      <dd className="text-sm font-semibold text-[#8be9ff]">{timelineLabel}</dd>
                    </div>
                  </dl>

                  <Link
                    href={`/start-project?${pricingParams}`}
                    className={cn(actionControlClassName, "mt-8 w-full")}
                  >
                    Continue with this estimate
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <p className="mt-4 text-center text-[0.68rem] leading-5 text-white/24">
                    Final pricing is confirmed after GridSpell reviews the complete scope.
                  </p>
                </div>
              </aside>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-24 lg:py-32">
        <Container>
          <SectionHeading
            eyebrow="Optional additions"
            title="Add only what the project needs."
            description="Select common additions to include them in the planning range. Each choice updates the estimate and timeline without shifting the card layout."
          />

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {addOns.map((item, index) => {
              const selected = selectedAddOns.includes(item.id);
              const Icon = item.icon;

              return (
                <Reveal key={item.id} delay={index * 0.045}>
                  <motion.button
                    type="button"
                    onClick={() => toggleAddOn(item.id)}
                    whileTap={reduceMotion ? undefined : { scale: 0.985 }}
                    className={cn(
                      "group flex min-h-56 w-full flex-col rounded-[1.7rem] border p-6 text-left transition-[border-color,background-color,box-shadow] duration-300",
                      selected
                        ? "border-[#8be9ff]/38 bg-[#8be9ff]/7 shadow-[0_16px_55px_rgba(41,214,255,0.08)]"
                        : "border-white/[0.08] bg-white/[0.025] hover:border-white/[0.16] hover:bg-white/[0.04]"
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className={cn(
                          "grid h-11 w-11 place-items-center rounded-xl border transition",
                          selected
                            ? "border-[#8be9ff]/28 bg-[#8be9ff]/10 text-[#8be9ff]"
                            : "border-white/[0.08] bg-white/[0.03] text-white/34"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span
                        className={cn(
                          "grid h-9 w-9 place-items-center rounded-full border transition",
                          selected
                            ? "rotate-0 border-[#8be9ff]/30 bg-[#8be9ff]/10 text-[#8be9ff]"
                            : "border-white/[0.1] bg-white/[0.025] text-white/35"
                        )}
                      >
                        <AnimatePresence mode="wait" initial={false}>
                          {selected ? (
                            <motion.span
                              key="check"
                              initial={reduceMotion ? false : { rotate: -45, opacity: 0 }}
                              animate={{ rotate: 0, opacity: 1 }}
                              exit={{ opacity: 0 }}
                            >
                              <Check className="h-4 w-4" />
                            </motion.span>
                          ) : (
                            <motion.span key="plus" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                              <Plus className="h-4 w-4" />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </span>
                    </div>
                    <h3 className="mt-7 font-display text-2xl font-semibold tracking-[-0.045em] text-white">
                      {item.name}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-white/38">{item.description}</p>
                    <p className="mt-auto pt-6 text-xs font-semibold text-[#8be9ff]">{item.priceLabel}</p>
                  </motion.button>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-y border-white/[0.07] bg-white/[0.012] py-24 lg:py-32">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Website care"
              title="Launch is only the beginning."
              description="Care plans keep the website reliable, current, and useful after launch. They are optional and quoted separately from the build."
            />
            <div className="flex w-fit items-center rounded-full border border-white/[0.09] bg-white/[0.025] p-1">
              {(["monthly", "annual"] as const).map((cycle) => (
                <button
                  key={cycle}
                  type="button"
                  onClick={() => setBillingCycle(cycle)}
                  className={cn(
                    "relative min-h-10 rounded-full px-4 text-xs font-semibold capitalize transition",
                    billingCycle === cycle ? "text-white" : "text-white/34 hover:text-white/60"
                  )}
                >
                  {billingCycle === cycle ? (
                    <motion.span
                      layoutId="billing-cycle"
                      className="absolute inset-0 rounded-full border border-[#8be9ff]/20 bg-[#8be9ff]/8"
                      transition={{ type: "spring", stiffness: 360, damping: 30 }}
                    />
                  ) : null}
                  <span className="relative">{cycle}</span>
                </button>
              ))}
              <span className="mr-1 rounded-full border border-[#69e6ad]/18 bg-[#69e6ad]/8 px-3 py-1.5 text-[0.56rem] font-semibold uppercase tracking-[0.15em] text-[#7aefb9]">
                Save 10%
              </span>
            </div>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {carePlans.map((plan, index) => {
              const annualPrice = Math.round(plan.monthlyPrice * 12 * 0.9);
              const displayedPrice =
                billingCycle === "monthly" ? plan.monthlyPrice : annualPrice;

              return (
                <Reveal key={plan.name} delay={index * 0.06}>
                  <article className="h-full rounded-[1.8rem] border border-white/[0.085] bg-white/[0.025] p-7 transition duration-300 hover:-translate-y-1 hover:border-white/[0.16] hover:bg-white/[0.04]">
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-white/28">
                      {plan.name}
                    </p>
                    <div className="mt-7 flex items-end gap-2">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.p
                          key={`${plan.name}-${billingCycle}`}
                          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                          className="font-display text-4xl font-semibold tracking-[-0.06em] text-white"
                        >
                          {formatCurrency(displayedPrice)}
                        </motion.p>
                      </AnimatePresence>
                      <span className="pb-1 text-xs text-white/28">
                        /{billingCycle === "monthly" ? "month" : "year"}
                      </span>
                    </div>
                    <p className="mt-5 text-sm leading-7 text-white/40">{plan.summary}</p>
                    <ul className="mt-7 grid gap-3 border-t border-white/[0.08] pt-6">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex gap-3 text-sm leading-6 text-white/46">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#8be9ff]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-24 lg:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.76fr_1.24fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                eyebrow="Pricing clarity"
                title="What changes the final number?"
                description="The proposal is based on real effort and risk. These are the most common factors that move a project above its starting package."
              />
            </div>

            <Reveal delay={0.08}>
              <div className="grid gap-3">
                {pricingFactors.map((factor, index) => {
                  const open = openFactor === index;
                  return (
                    <article
                      key={factor.title}
                      className={cn(
                        "overflow-hidden rounded-[1.5rem] border transition duration-300",
                        open
                          ? "border-[#8be9ff]/20 bg-[#8be9ff]/5"
                          : "border-white/[0.08] bg-white/[0.025]"
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFactor(open ? null : index)}
                        className="flex min-h-20 w-full items-center justify-between gap-5 px-5 text-left sm:px-6"
                        aria-expanded={open}
                      >
                        <span className="font-display text-xl font-semibold tracking-[-0.035em] text-white/76">
                          {factor.title}
                        </span>
                        <motion.span
                          animate={{ rotate: open ? 45 : 0 }}
                          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/[0.1] bg-white/[0.025] text-white/42"
                        >
                          <Plus className="h-4 w-4" />
                        </motion.span>
                      </button>
                      <AnimatePresence initial={false}>
                        {open ? (
                          <motion.div
                            initial={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease: "easeOut" }}
                          >
                            <p className="max-w-2xl px-5 pb-6 text-sm leading-7 text-white/42 sm:px-6">
                              {factor.text}
                            </p>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </article>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-y border-white/[0.07] bg-white/[0.012] py-24 lg:py-32">
        <Container>
          <SectionHeading
            eyebrow="Payment structure"
            title="Progress is tied to clear milestones."
            description="A common structure keeps commitment balanced across the project. The final proposal confirms the exact schedule for the approved scope."
          />

          <Reveal className="mt-16">
            <div className="relative grid gap-5 lg:grid-cols-3">
              <motion.div
                aria-hidden="true"
                initial={reduceMotion ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-[16%] right-[16%] top-8 hidden h-px origin-left bg-gradient-to-r from-[#7c5cff] via-[#8be9ff] to-[#29d6ff] lg:block"
              />
              {[
                {
                  amount: "40%",
                  label: "Project start",
                  text: "Reserves the production window and begins discovery."
                },
                {
                  amount: "30%",
                  label: "Design approval",
                  text: "Confirms the approved direction before full development."
                },
                {
                  amount: "30%",
                  label: "Before launch",
                  text: "Completes the project before production release."
                }
              ].map((step, index) => (
                <motion.article
                  key={step.label}
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  className="relative rounded-[1.7rem] border border-white/[0.085] bg-[#0b0d13] p-7"
                >
                  <span className="relative z-10 grid h-16 w-16 place-items-center rounded-full border border-[#8be9ff]/25 bg-[#0b0d13] font-display text-xl font-semibold text-[#8be9ff]">
                    {step.amount}
                  </span>
                  <p className="mt-7 font-display text-2xl font-semibold tracking-[-0.045em] text-white">
                    {step.label}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white/38">{step.text}</p>
                </motion.article>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="relative overflow-hidden py-24 lg:py-36">
        <div aria-hidden="true" className="page-grid pointer-events-none absolute inset-0 opacity-25" />
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[70rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7c5cff]/11 blur-[180px]" />
        <Container className="relative">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.4rem] border border-[#8be9ff]/17 bg-[radial-gradient(circle_at_88%_12%,rgba(41,214,255,0.13),transparent_23rem),linear-gradient(145deg,rgba(124,92,255,0.13),rgba(11,13,19,0.94))] p-8 text-center shadow-[0_32px_110px_rgba(0,0,0,0.3)] sm:p-12 lg:p-16">
              <div aria-hidden="true" className="absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-[#8be9ff]/65 to-transparent" />
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-[#8be9ff]/22 bg-[#8be9ff]/8">
                <MessagesSquare className="h-6 w-6 text-[#8be9ff]" />
              </span>
              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.34em] text-[#8be9ff]">
                A clear next step
              </p>
              <h2 className="mx-auto mt-6 max-w-[16ch] text-balance font-display text-4xl font-semibold leading-[0.94] tracking-[-0.065em] text-white sm:text-6xl lg:text-7xl">
                You do not need to know the perfect package yet.
              </h2>
              <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-white/44 sm:text-lg sm:leading-9">
                Share what you are building and GridSpell will recommend the right scope,
                timeline, and investment range.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ActionLink href={`/start-project?${pricingParams}`}>
                  Start your project
                  <ArrowUpRight className="h-4 w-4" />
                </ActionLink>
                <Link
                  href="/contact?intent=discovery-call"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.035] px-6 text-sm font-semibold text-white/58 transition hover:-translate-y-0.5 hover:border-white/22 hover:text-white"
                >
                  Book a discovery call
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mx-auto mt-10 grid max-w-3xl gap-3 border-t border-white/[0.08] pt-8 sm:grid-cols-3">
                {[
                  [SearchCheck, "Scope reviewed by a person"],
                  [ShieldCheck, "No automatic commitment"],
                  [Gauge, "Clear recommended next step"]
                ].map(([Icon, label]) => {
                  const FeatureIcon = Icon as IconComponent;
                  return (
                    <div key={String(label)} className="flex items-center justify-center gap-2 text-xs text-white/32">
                      <FeatureIcon className="h-4 w-4 text-[#8be9ff]" />
                      {String(label)}
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 px-4 lg:hidden">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pointer-events-auto mx-auto flex max-w-md items-center justify-between gap-4 rounded-full border border-white/[0.12] bg-[#0b0d13]/94 p-2 pl-5 shadow-2xl backdrop-blur-xl"
        >
          <div>
            <p className="text-[0.52rem] font-semibold uppercase tracking-[0.2em] text-white/24">
              Current estimate
            </p>
            <p className="mt-0.5 text-sm font-semibold text-white">
              {formatCurrency(estimateLow)}+
            </p>
          </div>
          <Link
            href={`/start-project?${pricingParams}`}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gradient-to-r from-[#7c5cff] to-[#29d6ff] px-4 text-xs font-semibold !text-[#071014]"
          >
            View summary
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>
      </div>

      <PackageDrawer
        item={detailPackage}
        onClose={() => setDetailPackageId(null)}
        onChoose={selectPackage}
      />
    </main>
  );
}
