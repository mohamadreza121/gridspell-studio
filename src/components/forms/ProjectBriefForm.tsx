"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Globe2,
  Layers3,
  Mail,
  MessageSquareText,
  Phone,
  UserRound,
  WandSparkles
} from "lucide-react";

import { trackAnalyticsEvent } from "@/components/analytics/GoogleAnalytics";
import { TurnstileWidget } from "@/components/security/TurnstileWidget";
import { ActionButton } from "@/components/ui/ActionControl";
import { packages } from "@/config/packages";
import { leadSchema, type LeadField } from "@/validations/lead";

const projectOptions = [
  "Business website",
  "Website redesign",
  "Landing page",
  "Client portal or dashboard",
  "Full-stack web application",
  "Google Ads landing page",
  "Not sure yet"
] as const;

const budgetOptions = [
  "Starter / landing page — CAD $950+",
  "Launch website — CAD $1,800–$3,000",
  "Growth website — CAD $4,500–$7,500",
  "Custom portal / system — CAD $7,500+",
  "Not sure yet"
] as const;

const serviceOptions = [
  "Custom design",
  "Next.js development",
  "Website redesign",
  "Landing page",
  "CMS or editable content",
  "Booking or CRM integration",
  "Google reviews integration",
  "Analytics and conversion tracking",
  "Client portal or dashboard",
  "Maintenance / care plan"
] as const;

const packageAliases: Record<string, string> = {
  "landing-page": "starter",
  landing: "starter",
  starter: "starter",
  launch: "launch",
  growth: "growth",
  custom: "custom",
  portal: "custom",
  application: "custom"
};

type FieldErrors = Partial<Record<LeadField, string>>;

function FieldIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-white/26">
      {children}
    </span>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;

  return (
    <span id={id} className="text-xs leading-5 text-[#ff9aa3]" role="alert">
      {message}
    </span>
  );
}

function normalizePackageId(packageId: string) {
  return packageAliases[packageId.trim().toLowerCase()] ?? packageId;
}

function humanizeContext(value: string) {
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function inferProjectType(explicitType: string, source: string, designReference: string) {
  if (projectOptions.includes(explicitType as (typeof projectOptions)[number])) {
    return explicitType;
  }

  const context = `${source} ${designReference}`.toLowerCase();

  if (/event|landing|campaign|launch page/.test(context)) return "Landing page";
  if (/redesign/.test(context)) return "Website redesign";
  if (/portal|dashboard/.test(context)) return "Client portal or dashboard";
  if (/application|app|full-stack/.test(context)) return "Full-stack web application";
  if (/google ads|paid search/.test(context)) return "Google Ads landing page";

  return "";
}

function budgetFromPackage(packageId: string | null) {
  if (packageId === "starter") return "Starter / landing page — CAD $950+";
  if (packageId === "launch") return "Launch website — CAD $1,800–$3,000";
  if (packageId === "growth") return "Growth website — CAD $4,500–$7,500";
  if (packageId === "custom") return "Custom portal / system — CAD $7,500+";
  return "";
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0
  }).format(value);
}

function getEstimateLabel(low: string | null, high: string | null) {
  const lowNumber = Number(low);
  const highNumber = Number(high);

  if (!Number.isFinite(lowNumber) || !Number.isFinite(highNumber)) return null;
  if (lowNumber <= 0 || highNumber <= 0) return null;

  return `${formatCurrency(lowNumber)}–${formatCurrency(highNumber)}`;
}

export function ProjectBriefForm() {
  const searchParams = useSearchParams();
  const rawPackageId = searchParams.get("package") ?? "";
  const selectedPackageId = normalizePackageId(rawPackageId);
  const selectedPackage = packages.find((item) => item.id === selectedPackageId);
  const estimateLow = searchParams.get("estimateLow") ?? "";
  const estimateHigh = searchParams.get("estimateHigh") ?? "";
  const pricingTimeline = searchParams.get("timeline") || selectedPackage?.timeline || "";
  const originalAddOns = searchParams.get("addOns") ?? "";
  const projectSource = searchParams.get("source")?.trim() ?? "";
  const designReference = searchParams.get("design")?.trim() ?? "";
  const requestedProjectType = searchParams.get("projectType")?.trim() ?? "";
  const initialProjectType = inferProjectType(
    requestedProjectType,
    projectSource,
    designReference
  );
  const estimateLabel = getEstimateLabel(estimateLow, estimateHigh);
  const defaultBudget = budgetFromPackage(selectedPackageId);
  const sourceLabel = projectSource ? humanizeContext(projectSource) : "";
  const importedContext = [
    originalAddOns,
    sourceLabel ? `Project source: ${sourceLabel}` : "",
    designReference ? `Design reference: ${designReference}` : ""
  ]
    .filter(Boolean)
    .join(" | ");
  const hasImportedContext = Boolean(projectSource || designReference);

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formStartedAt] = useState(() => Date.now());

  function clearFieldError(field: LeadField) {
    setFieldErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");
    setFieldErrors({});

    const form = event.currentTarget;
    const formData = new FormData(form);

    function readField(name: string) {
      return String(formData.get(name) ?? "");
    }

    function readFields(name: string) {
      return formData
        .getAll(name)
        .map((value) => String(value).trim())
        .filter(Boolean);
    }

    const data = {
      name: readField("name"),
      email: readField("email"),
      company: readField("company"),
      phone: readField("phone"),
      currentWebsite: readField("currentWebsite"),
      projectType: readField("projectType"),
      selectedPackage: readField("selectedPackage"),
      budget: readField("budget"),
      timeline: readField("timeline"),
      servicesNeeded: readFields("servicesNeeded"),
      estimateLow: readField("estimateLow"),
      estimateHigh: readField("estimateHigh"),
      pricingTimeline: readField("pricingTimeline"),
      addOns: readField("addOns"),
      message: readField("message"),
      formStartedAt: readField("formStartedAt"),
      turnstileToken: readField("turnstileToken")
    };

    const turnstileRequired = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

    if (turnstileRequired && !data.turnstileToken) {
      setStatus("error");
      setMessage(
        "The security check could not load in this browser. Please refresh, use a newer browser, or email hello@gridspellstudio.com."
      );
      return;
    }

    const validation = leadSchema.safeParse(data);

    if (!validation.success) {
      const nextErrors: FieldErrors = {};
      for (const issue of validation.error.issues) {
        const field = issue.path[0] as LeadField | undefined;
        if (field && !nextErrors[field]) nextErrors[field] = issue.message;
      }

      setFieldErrors(nextErrors);
      setStatus("error");
      setMessage("Review the highlighted fields and submit the form again.");

      requestAnimationFrame(() => {
        const firstInvalid = form.querySelector<HTMLElement>("[aria-invalid='true']");
        firstInvalid?.focus();
      });
      return;
    }

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "Your project brief could not be submitted.");
      }

      form.reset();
      window.turnstile?.reset();
      trackAnalyticsEvent("generate_lead", {
        form_name: "project_brief",
        project_type: validation.data.projectType,
        budget_range: validation.data.budget,
        selected_package: validation.data.selectedPackage || "not_selected"
      });
      setStatus("success");
    } catch (error) {
      window.turnstile?.reset();
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="project-brief-success" role="status" aria-live="polite">
        <div className="grid h-14 w-14 place-items-center border border-[#35d07f]/30 bg-[#35d07f]/8">
          <CheckCircle2 className="h-7 w-7 text-[#35d07f]" />
        </div>
        <p className="mt-8 text-xs uppercase tracking-[0.34em] text-[#7ce3aa]">
          Project brief received
        </p>
        <h2 className="mt-5 max-w-xl font-display text-4xl font-semibold tracking-[-0.055em]">
          Your project is ready for review.
        </h2>
        <p className="mt-5 max-w-xl leading-8 text-white/46">
          GridSpell will review the business goal, scope, budget, and timing before the next conversation.
        </p>
      </div>
    );
  }

  const commonInputProps = (field: LeadField) => ({
    "aria-invalid": Boolean(fieldErrors[field]),
    "aria-describedby": fieldErrors[field] ? `${field}-error` : undefined,
    onChange: () => clearFieldError(field)
  });

  return (
    <form onSubmit={submit} noValidate className="project-brief-form">
      <input type="hidden" name="formStartedAt" value={formStartedAt} />
      <input type="hidden" name="estimateLow" value={estimateLow} />
      <input type="hidden" name="estimateHigh" value={estimateHigh} />
      <input type="hidden" name="pricingTimeline" value={pricingTimeline} />
      <input type="hidden" name="addOns" value={importedContext} />

      <header className="project-brief-header">
        <div>
          <p className="text-xs uppercase tracking-[0.34em] text-[#8be9ff]">Project brief</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">
            Map the useful details.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/42">
            Each section captures one decision layer. Package, pricing, and demo context stay connected to the submission.
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 border-l border-[#8be9ff]/30 px-3 py-2 text-xs text-white/38">
          <WandSparkles className="h-3.5 w-3.5 text-[#8be9ff]" />
          About 4 minutes
        </span>

        {hasImportedContext ? (
          <div className="project-origin-context">
            <span className="project-origin-index">IN</span>
            <div>
              <p className="text-[0.52rem] font-black uppercase tracking-[0.18em] text-white/28">
                Imported project direction
              </p>
              <p className="mt-2 text-sm font-semibold text-white/72">
                {designReference || sourceLabel}
              </p>
              <p className="mt-1 text-xs leading-5 text-white/34">
                This reference will be included with the inquiry automatically.
              </p>
            </div>
            {sourceLabel ? <span className="project-origin-source">{sourceLabel}</span> : null}
          </div>
        ) : null}

        {selectedPackage ? (
          <div className="project-origin-context">
            <span className="project-origin-index">PK</span>
            <div>
              <p className="text-[0.52rem] font-black uppercase tracking-[0.18em] text-white/28">
                Attached package
              </p>
              <p className="mt-2 text-sm font-semibold text-white/72">{selectedPackage.name}</p>
              <p className="mt-1 text-xs leading-5 text-white/34">
                {estimateLabel ?? selectedPackage.price} · {pricingTimeline}
              </p>
            </div>
            <span className="project-origin-source">Package context</span>
          </div>
        ) : null}
      </header>

      <div className="project-brief-body">
        <fieldset className="project-brief-step">
          <legend>
            <span className="project-step-number">01</span>
            Contact
          </legend>
          <div className="project-fields-grid">
            <label className="project-field-label">
              Your name
              <span className="relative block">
                <FieldIcon><UserRound className="h-4 w-4" /></FieldIcon>
                <input name="name" required maxLength={100} autoComplete="name" className="form-field form-field-with-icon" placeholder="Full name" {...commonInputProps("name")} />
              </span>
              <FieldError id="name-error" message={fieldErrors.name} />
            </label>

            <label className="project-field-label">
              Email
              <span className="relative block">
                <FieldIcon><Mail className="h-4 w-4" /></FieldIcon>
                <input name="email" type="email" required maxLength={180} autoComplete="email" className="form-field form-field-with-icon" placeholder="you@company.com" {...commonInputProps("email")} />
              </span>
              <FieldError id="email-error" message={fieldErrors.email} />
            </label>

            <label className="project-field-label">
              Business name
              <span className="relative block">
                <FieldIcon><Building2 className="h-4 w-4" /></FieldIcon>
                <input name="company" maxLength={140} autoComplete="organization" className="form-field form-field-with-icon" placeholder="Company or brand name" {...commonInputProps("company")} />
              </span>
              <FieldError id="company-error" message={fieldErrors.company} />
            </label>

            <label className="project-field-label">
              Phone
              <span className="relative block">
                <FieldIcon><Phone className="h-4 w-4" /></FieldIcon>
                <input name="phone" maxLength={40} autoComplete="tel" className="form-field form-field-with-icon" placeholder="Optional" {...commonInputProps("phone")} />
              </span>
              <FieldError id="phone-error" message={fieldErrors.phone} />
            </label>

            <label className="project-field-label project-field-span-two">
              Current website
              <span className="relative block">
                <FieldIcon><Globe2 className="h-4 w-4" /></FieldIcon>
                <input name="currentWebsite" maxLength={220} inputMode="url" autoComplete="url" className="form-field form-field-with-icon" placeholder="https://yourwebsite.com or leave blank" {...commonInputProps("currentWebsite")} />
              </span>
              <FieldError id="currentWebsite-error" message={fieldErrors.currentWebsite} />
            </label>
          </div>
        </fieldset>

        <fieldset className="project-brief-step">
          <legend>
            <span className="project-step-number">02</span>
            Scope and pricing
          </legend>
          <div className="project-fields-grid">
            <label className="project-field-label">
              What are you building?
              <span className="relative block">
                <FieldIcon><WandSparkles className="h-4 w-4" /></FieldIcon>
                <select name="projectType" required defaultValue={initialProjectType} className="form-field form-field-with-icon" {...commonInputProps("projectType")}>
                  <option value="" disabled>Select project type</option>
                  {projectOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              </span>
              <FieldError id="projectType-error" message={fieldErrors.projectType} />
            </label>

            <label className="project-field-label">
              Selected package
              <span className="relative block">
                <FieldIcon><Layers3 className="h-4 w-4" /></FieldIcon>
                <select name="selectedPackage" defaultValue={selectedPackage?.id ?? ""} className="form-field form-field-with-icon" {...commonInputProps("selectedPackage")}>
                  <option value="">Not selected yet</option>
                  {packages.map((item) => <option key={item.id} value={item.id}>{item.name} — {item.price}</option>)}
                </select>
              </span>
              <FieldError id="selectedPackage-error" message={fieldErrors.selectedPackage} />
            </label>

            <label className="project-field-label">
              Estimated investment
              <span className="relative block">
                <FieldIcon><CircleDollarSign className="h-4 w-4" /></FieldIcon>
                <select name="budget" required defaultValue={defaultBudget} className="form-field form-field-with-icon" {...commonInputProps("budget")}>
                  <option value="" disabled>Select budget range</option>
                  {budgetOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              </span>
              <FieldError id="budget-error" message={fieldErrors.budget} />
            </label>

            <label className="project-field-label">
              Preferred timeline
              <span className="relative block">
                <FieldIcon><Clock3 className="h-4 w-4" /></FieldIcon>
                <input name="timeline" maxLength={100} defaultValue={pricingTimeline} className="form-field form-field-with-icon" placeholder="Example: launch within 8–10 weeks" {...commonInputProps("timeline")} />
              </span>
              <FieldError id="timeline-error" message={fieldErrors.timeline} />
            </label>
          </div>
        </fieldset>

        <fieldset className="project-brief-step">
          <legend>
            <span className="project-step-number">03</span>
            Services needed
          </legend>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/38">
            Select everything that might be useful. GridSpell will narrow this into a clear scope before a proposal is written.
          </p>
          <div className="project-services-grid">
            {serviceOptions.map((option) => (
              <label key={option} className="project-service-option">
                <input type="checkbox" name="servicesNeeded" value={option} className="peer sr-only" onChange={() => clearFieldError("servicesNeeded")} />
                <span className="project-checkmark"><Check className="h-3.5 w-3.5" /></span>
                <span className="relative z-10">{option}</span>
              </label>
            ))}
          </div>
          <FieldError id="servicesNeeded-error" message={fieldErrors.servicesNeeded} />
        </fieldset>

        <fieldset className="project-brief-step">
          <legend>
            <span className="project-step-number">04</span>
            Context
          </legend>
          <label className="project-field-label mt-6">
            Business problem and goal
            <span className="relative block">
              <MessageSquareText className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-white/26" />
              <textarea name="message" required minLength={20} maxLength={4000} rows={8} className="form-field min-h-48 resize-y" placeholder="What is not working now? What should the new website or platform accomplish? Mention important features, integrations, deadlines, competitors, or examples you like." {...commonInputProps("message")} />
            </span>
            <FieldError id="message-error" message={fieldErrors.message} />
          </label>
        </fieldset>

        <div className="border-b border-white/[0.08] py-8">
          <TurnstileWidget />
        </div>

        {status === "error" ? (
          <p className="border-l-2 border-[#ff5f6d] bg-[#ff5f6d]/8 px-4 py-3 text-sm leading-6 text-[#ff9aa3]" role="alert" aria-live="assertive">
            {message}
          </p>
        ) : null}

        <div className="project-submit-zone">
          <p className="max-w-md text-xs leading-6 text-white/28">
            Every inquiry is reviewed for scope, fit, timing, and a realistic path to delivery. Submitting does not create an automatic quote.
          </p>
          <ActionButton type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "Submitting…" : "Submit project brief"}
            <ArrowRight className="h-4 w-4" />
          </ActionButton>
        </div>
      </div>
    </form>
  );
}
