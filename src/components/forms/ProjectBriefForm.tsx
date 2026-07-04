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
];

const budgetOptions = [
  "Starter / landing page — CAD $950+",
  "Launch website — CAD $1,800–$3,000",
  "Growth website — CAD $4,500–$7,500",
  "Custom portal / system — CAD $7,500+",
  "Not sure yet"
];

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
];

type FieldErrors = Partial<Record<LeadField, string>>;

function FieldIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/26">
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

function budgetFromPackage(packageId: string | null) {
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
  const selectedPackageId = searchParams.get("package") ?? "";
  const selectedPackage = packages.find((item) => item.id === selectedPackageId);
  const estimateLow = searchParams.get("estimateLow") ?? "";
  const estimateHigh = searchParams.get("estimateHigh") ?? "";
  const pricingTimeline = searchParams.get("timeline") || selectedPackage?.timeline || "";
  const addOns = searchParams.get("addOns") ?? "";
  const estimateLabel = getEstimateLabel(estimateLow, estimateHigh);
  const defaultBudget = budgetFromPackage(selectedPackageId);

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

    const turnstileRequired = Boolean(
      process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
    );

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
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    }
  }

  if (status === "success") {
    return (
      <div
        className="glass-panel rounded-[2rem] p-8 sm:p-10"
        role="status"
        aria-live="polite"
      >
        <div className="grid h-14 w-14 place-items-center rounded-2xl border border-[#35d07f]/30 bg-[#35d07f]/8">
          <CheckCircle2 className="h-7 w-7 text-[#35d07f]" />
        </div>
        <p className="mt-8 text-xs uppercase tracking-[0.34em] text-[#7ce3aa]">
          Project brief received
        </p>
        <h2 className="mt-5 max-w-xl font-display text-4xl font-semibold tracking-[-0.055em]">
          Your project is ready for review.
        </h2>
        <p className="mt-5 max-w-xl leading-8 text-white/46">
          GridSpell will review the business goal, scope, budget, and timing before the
          next conversation.
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
    <form
      onSubmit={submit}
      noValidate
      className="glass-panel overflow-hidden rounded-[2rem]"
    >
      <input type="hidden" name="formStartedAt" value={formStartedAt} />
      <input type="hidden" name="estimateLow" value={estimateLow} />
      <input type="hidden" name="estimateHigh" value={estimateHigh} />
      <input type="hidden" name="pricingTimeline" value={pricingTimeline} />
      <input type="hidden" name="addOns" value={addOns} />

      <div className="border-b border-white/[0.08] p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-[#8be9ff]">
              Project brief
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
              Give GridSpell the useful details.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/42">
              The form is package-aware, so your selected pricing range and project type
              stay attached to the lead before the first conversation.
            </p>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.035] px-3 py-2 text-xs text-white/38">
            <WandSparkles className="h-3.5 w-3.5 text-[#8be9ff]" />
            About 4 minutes
          </span>
        </div>

        {selectedPackage ? (
          <div className="mt-6 grid gap-3 rounded-[1.5rem] border border-[#8be9ff]/18 bg-[#8be9ff]/6 p-4 sm:grid-cols-3">
            <div>
              <p className="text-[0.55rem] uppercase tracking-[0.2em] text-white/28">Package</p>
              <p className="mt-2 text-sm font-semibold text-white/72">{selectedPackage.name}</p>
            </div>
            <div>
              <p className="text-[0.55rem] uppercase tracking-[0.2em] text-white/28">Planning range</p>
              <p className="mt-2 text-sm font-semibold text-white/72">{estimateLabel ?? selectedPackage.price}</p>
            </div>
            <div>
              <p className="text-[0.55rem] uppercase tracking-[0.2em] text-white/28">Timeline</p>
              <p className="mt-2 text-sm font-semibold text-white/72">{pricingTimeline}</p>
            </div>
          </div>
        ) : null}
      </div>

      <div className="grid gap-9 p-6 sm:p-8">
        <fieldset>
          <legend className="text-xs font-semibold uppercase tracking-[0.28em] text-white/30">
            01 · Contact
          </legend>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm text-white/58">
              Your name
              <span className="relative block">
                <FieldIcon>
                  <UserRound className="h-4 w-4" />
                </FieldIcon>
                <input
                  name="name"
                  required
                  maxLength={100}
                  autoComplete="name"
                  className="form-field form-field-with-icon"
                  placeholder="Full name"
                  {...commonInputProps("name")}
                />
              </span>
              <FieldError id="name-error" message={fieldErrors.name} />
            </label>

            <label className="grid gap-2 text-sm text-white/58">
              Email
              <span className="relative block">
                <FieldIcon>
                  <Mail className="h-4 w-4" />
                </FieldIcon>
                <input
                  name="email"
                  type="email"
                  required
                  maxLength={180}
                  autoComplete="email"
                  className="form-field form-field-with-icon"
                  placeholder="you@company.com"
                  {...commonInputProps("email")}
                />
              </span>
              <FieldError id="email-error" message={fieldErrors.email} />
            </label>

            <label className="grid gap-2 text-sm text-white/58">
              Business name
              <span className="relative block">
                <FieldIcon>
                  <Building2 className="h-4 w-4" />
                </FieldIcon>
                <input
                  name="company"
                  maxLength={140}
                  autoComplete="organization"
                  className="form-field form-field-with-icon"
                  placeholder="Company or brand name"
                  {...commonInputProps("company")}
                />
              </span>
              <FieldError id="company-error" message={fieldErrors.company} />
            </label>

            <label className="grid gap-2 text-sm text-white/58">
              Phone
              <span className="relative block">
                <FieldIcon>
                  <Phone className="h-4 w-4" />
                </FieldIcon>
                <input
                  name="phone"
                  maxLength={40}
                  autoComplete="tel"
                  className="form-field form-field-with-icon"
                  placeholder="Optional"
                  {...commonInputProps("phone")}
                />
              </span>
              <FieldError id="phone-error" message={fieldErrors.phone} />
            </label>

            <label className="grid gap-2 text-sm text-white/58 sm:col-span-2">
              Current website
              <span className="relative block">
                <FieldIcon>
                  <Globe2 className="h-4 w-4" />
                </FieldIcon>
                <input
                  name="currentWebsite"
                  maxLength={220}
                  inputMode="url"
                  autoComplete="url"
                  className="form-field form-field-with-icon"
                  placeholder="https://yourwebsite.com or leave blank"
                  {...commonInputProps("currentWebsite")}
                />
              </span>
              <FieldError id="currentWebsite-error" message={fieldErrors.currentWebsite} />
            </label>
          </div>
        </fieldset>

        <fieldset className="border-t border-white/[0.08] pt-9">
          <legend className="text-xs font-semibold uppercase tracking-[0.28em] text-white/30">
            02 · Scope and pricing
          </legend>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm text-white/58">
              What are you building?
              <span className="relative block">
                <FieldIcon>
                  <WandSparkles className="h-4 w-4" />
                </FieldIcon>
                <select
                  name="projectType"
                  required
                  defaultValue=""
                  className="form-field form-field-with-icon"
                  {...commonInputProps("projectType")}
                >
                  <option value="" disabled>
                    Select project type
                  </option>
                  {projectOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </span>
              <FieldError id="projectType-error" message={fieldErrors.projectType} />
            </label>

            <label className="grid gap-2 text-sm text-white/58">
              Selected package
              <span className="relative block">
                <FieldIcon>
                  <Layers3 className="h-4 w-4" />
                </FieldIcon>
                <select
                  name="selectedPackage"
                  defaultValue={selectedPackage?.id ?? ""}
                  className="form-field form-field-with-icon"
                  {...commonInputProps("selectedPackage")}
                >
                  <option value="">Not selected yet</option>
                  {packages.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} — {item.price}
                    </option>
                  ))}
                </select>
              </span>
              <FieldError id="selectedPackage-error" message={fieldErrors.selectedPackage} />
            </label>

            <label className="grid gap-2 text-sm text-white/58">
              Estimated investment
              <span className="relative block">
                <FieldIcon>
                  <CircleDollarSign className="h-4 w-4" />
                </FieldIcon>
                <select
                  name="budget"
                  required
                  defaultValue={defaultBudget}
                  className="form-field form-field-with-icon"
                  {...commonInputProps("budget")}
                >
                  <option value="" disabled>
                    Select budget range
                  </option>
                  {budgetOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </span>
              <FieldError id="budget-error" message={fieldErrors.budget} />
            </label>

            <label className="grid gap-2 text-sm text-white/58">
              Preferred timeline
              <span className="relative block">
                <FieldIcon>
                  <Clock3 className="h-4 w-4" />
                </FieldIcon>
                <input
                  name="timeline"
                  maxLength={100}
                  defaultValue={pricingTimeline}
                  className="form-field form-field-with-icon"
                  placeholder="Example: launch within 8–10 weeks"
                  {...commonInputProps("timeline")}
                />
              </span>
              <FieldError id="timeline-error" message={fieldErrors.timeline} />
            </label>
          </div>
        </fieldset>

        <fieldset className="border-t border-white/[0.08] pt-9">
          <legend className="text-xs font-semibold uppercase tracking-[0.28em] text-white/30">
            03 · Services needed
          </legend>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/38">
            Select everything that might be useful. GridSpell will narrow this into a clear
            scope before a proposal is written.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {serviceOptions.map((option) => (
              <label
                key={option}
                className="group flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.025] px-4 py-3 text-sm text-white/54 transition hover:border-[#8be9ff]/24 hover:bg-[#8be9ff]/5 hover:text-white/72"
              >
                <input
                  type="checkbox"
                  name="servicesNeeded"
                  value={option}
                  className="peer sr-only"
                  onChange={() => clearFieldError("servicesNeeded")}
                />
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md border border-white/[0.16] bg-black/10 text-transparent transition peer-checked:border-[#8be9ff]/40 peer-checked:bg-[#8be9ff]/12 peer-checked:text-[#8be9ff]">
                  <Check className="h-3.5 w-3.5" />
                </span>
                {option}
              </label>
            ))}
          </div>
          <FieldError id="servicesNeeded-error" message={fieldErrors.servicesNeeded} />
        </fieldset>

        <fieldset className="border-t border-white/[0.08] pt-9">
          <legend className="text-xs font-semibold uppercase tracking-[0.28em] text-white/30">
            04 · Context
          </legend>
          <label className="mt-5 grid gap-2 text-sm text-white/58">
            Business problem and goal
            <span className="relative block">
              <MessageSquareText className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-white/26" />
              <textarea
                name="message"
                required
                minLength={20}
                maxLength={4000}
                rows={8}
                className="form-field form-field-with-icon min-h-48 resize-y py-4"
                placeholder="What is not working now? What should the new website or platform accomplish? Mention important features, integrations, deadlines, competitors, or examples you like."
                {...commonInputProps("message")}
              />
            </span>
            <FieldError id="message-error" message={fieldErrors.message} />
          </label>
        </fieldset>

        <div className="border-t border-white/[0.08] pt-8">
          <TurnstileWidget />
        </div>

        {status === "error" ? (
          <p
            className="rounded-2xl border border-[#ff5f6d]/25 bg-[#ff5f6d]/8 px-4 py-3 text-sm leading-6 text-[#ff9aa3]"
            role="alert"
            aria-live="assertive"
          >
            {message}
          </p>
        ) : null}

        <div className="flex flex-col gap-5 border-t border-white/[0.08] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-xs leading-6 text-white/28">
            Every inquiry is reviewed for scope, fit, timing, and a realistic path to
            delivery. Submitting does not create an automatic quote.
          </p>
          <ActionButton
            type="submit"
            disabled={status === "submitting"}
            className="shrink-0"
          >
            {status === "submitting" ? "Submitting…" : "Submit project brief"}
            <ArrowRight className="h-4 w-4" />
          </ActionButton>
        </div>
      </div>
    </form>
  );
}
