"use client";

import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Mail,
  MessageSquareText,
  Phone,
  UserRound,
  WandSparkles
} from "lucide-react";
import { trackAnalyticsEvent } from "@/components/analytics/GoogleAnalytics";
import { TurnstileWidget } from "@/components/security/TurnstileWidget";
import { ActionButton } from "@/components/ui/ActionControl";
import { leadSchema, type LeadField } from "@/validations/lead";

const projectOptions = [
  "Business website",
  "Website redesign",
  "Landing page",
  "Client portal or dashboard",
  "Full-stack web application",
  "Not sure yet"
];

const budgetOptions = [
  "CAD $2,500–$5,000",
  "CAD $5,000–$10,000",
  "CAD $10,000–$20,000",
  "CAD $20,000+",
  "Need guidance"
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

export function ProjectBriefForm() {
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
    function readField(name: string) {
      const field = form.elements.namedItem(name);

      if (
        field instanceof HTMLInputElement ||
        field instanceof HTMLTextAreaElement ||
        field instanceof HTMLSelectElement
      ) {
        return field.value;
      }

      return "";
    }

    const data = {
      name: readField("name"),
      email: readField("email"),
      company: readField("company"),
      phone: readField("phone"),
      projectType: readField("projectType"),
      budget: readField("budget"),
      timeline: readField("timeline"),
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
        project_type: validation.data.projectType
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

      <div className="border-b border-white/[0.08] p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-[#8be9ff]">
              Project brief
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
              Give us the useful details.
            </h2>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.035] px-3 py-2 text-xs text-white/38">
            <WandSparkles className="h-3.5 w-3.5 text-[#8be9ff]" />
            About 4 minutes
          </span>
        </div>
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
              Company
              <span className="relative block">
                <FieldIcon>
                  <Building2 className="h-4 w-4" />
                </FieldIcon>
                <input
                  name="company"
                  maxLength={140}
                  autoComplete="organization"
                  className="form-field form-field-with-icon"
                  placeholder="Company name"
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
          </div>
        </fieldset>

        <fieldset className="border-t border-white/[0.08] pt-9">
          <legend className="text-xs font-semibold uppercase tracking-[0.28em] text-white/30">
            02 · Scope
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
              Estimated investment
              <span className="relative block">
                <FieldIcon>
                  <CircleDollarSign className="h-4 w-4" />
                </FieldIcon>
                <select
                  name="budget"
                  required
                  defaultValue=""
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
          </div>

          <label className="mt-5 grid gap-2 text-sm text-white/58">
            Preferred timeline
            <span className="relative block">
              <FieldIcon>
                <Clock3 className="h-4 w-4" />
              </FieldIcon>
              <input
                name="timeline"
                maxLength={100}
                className="form-field form-field-with-icon"
                placeholder="Example: launch within 8–10 weeks"
                {...commonInputProps("timeline")}
              />
            </span>
            <FieldError id="timeline-error" message={fieldErrors.timeline} />
          </label>
        </fieldset>

        <fieldset className="border-t border-white/[0.08] pt-9">
          <legend className="text-xs font-semibold uppercase tracking-[0.28em] text-white/30">
            03 · Context
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
                placeholder="What is not working now? What should the new website or platform accomplish? Mention important features, integrations, or deadlines."
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
