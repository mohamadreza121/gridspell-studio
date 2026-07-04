import { NextResponse } from "next/server";
import {
  backgroundOptions,
  buttonEffects,
  experiencePalettes,
  experienceScenes,
  motionOptions
} from "@/config/experience-lab";
import { packages } from "@/config/packages";
import {
  adminLeadNotificationTemplate,
  leadConfirmationTemplate
} from "@/lib/email/templates";
import { sendTransactionalEmail } from "@/lib/email/send";
import { getSiteUrl } from "@/lib/env";
import { consumeRateLimit } from "@/lib/security/rate-limit";
import { getClientIp, getRequestFingerprint } from "@/lib/security/request";
import { verifyTurnstile } from "@/lib/security/turnstile";
import { createAdminClient } from "@/lib/supabase/admin";
import { leadSubmissionSchema } from "@/validations/lead";

const MAX_BODY_BYTES = 40_000;
const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1000;
const INTAKE_DETAILS_MARKER = "--- Project intake details ---";

type ProjectIntakeLead = {
  currentWebsite?: string | null;
  selectedPackage?: string | null;
  estimateLow?: number;
  estimateHigh?: number;
  pricingTimeline?: string | null;
  addOns?: string | null;
  servicesNeeded: string[];
};

function jsonError(message: string, status: number, retryAfter?: number) {
  return NextResponse.json(
    { error: message },
    {
      status,
      headers: retryAfter ? { "Retry-After": String(Math.max(1, retryAfter)) } : undefined
    }
  );
}

function getExperienceSelection(request: Request) {
  const referer = request.headers.get("referer");
  if (!referer) return null;

  try {
    const url = new URL(referer);
    const scene = experienceScenes.find((item) => item.id === url.searchParams.get("scene"));
    const palette = experiencePalettes.find(
      (item) => item.id === url.searchParams.get("palette")
    );
    const button = buttonEffects.find((item) => item.id === url.searchParams.get("button"));
    const background = backgroundOptions.find(
      (item) => item.id === url.searchParams.get("background")
    );
    const motion = motionOptions.find((item) => item.id === url.searchParams.get("motion"));

    if (!scene || !palette || !button || !background || !motion) {
      return null;
    }

    return [
      `Direction: ${scene.label}`,
      `Palette: ${palette.label}`,
      `Button: ${button.label}`,
      `Background: ${background.label}`,
      `Motion: ${motion.label}`
    ].join("\n");
  } catch {
    return null;
  }
}

function packageLabel(packageId?: string | null) {
  if (!packageId) return null;
  const selectedPackage = packages.find((item) => item.id === packageId);
  return selectedPackage ? `${selectedPackage.name} (${selectedPackage.price})` : packageId;
}

function formatCurrency(value?: number | null) {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;

  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0
  }).format(value);
}

function estimateRange(input: { estimateLow?: number; estimateHigh?: number }) {
  const low = formatCurrency(input.estimateLow);
  const high = formatCurrency(input.estimateHigh);

  if (low && high) return `${low}–${high}`;
  if (low) return low;
  if (high) return high;
  return null;
}

function buildProjectIntakeDetails(lead: ProjectIntakeLead) {
  const rows: Array<[string, string | null | undefined]> = [
    ["Current website", lead.currentWebsite],
    ["Selected package", packageLabel(lead.selectedPackage)],
    ["Planning range", estimateRange(lead)],
    ["Pricing timeline", lead.pricingTimeline],
    ["Selected additions", lead.addOns],
    ["Services needed", lead.servicesNeeded.length ? lead.servicesNeeded.join(", ") : null]
  ];

  return rows
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");
}

function getEstimatedValue(input: { estimateLow?: number; estimateHigh?: number }) {
  if (typeof input.estimateHigh === "number" && Number.isFinite(input.estimateHigh)) {
    return input.estimateHigh;
  }

  if (typeof input.estimateLow === "number" && Number.isFinite(input.estimateLow)) {
    return input.estimateLow;
  }

  return null;
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return jsonError("The submitted form is too large.", 413);
  }

  const fingerprint = getRequestFingerprint(request);
  const ipLimit = await consumeRateLimit({
    namespace: "lead-ip",
    identifier: fingerprint,
    limit: 5,
    windowSeconds: 15 * 60,
    blockSeconds: 60 * 60
  });

  if (!ipLimit.allowed) {
    return jsonError(
      "Too many project inquiries were submitted from this connection. Please try again later.",
      429,
      ipLimit.retryAfterSeconds
    );
  }

  try {
    const requestBody = await request.json();
    const parsed = leadSubmissionSchema.safeParse(requestBody);

    if (!parsed.success) {
      console.warn(
        "Lead validation failed:",
        parsed.error.issues.map((issue) => ({
          path: issue.path.join("."),
          code: issue.code
        }))
      );

      return jsonError(
        "Please review the required fields and try again.",
        400
      );
    }

    const lead = parsed.data;
    const formAge = Date.now() - lead.formStartedAt;

    if (formAge > MAX_FORM_AGE_MS) {
      return jsonError(
        "This form session expired. Refresh the page and submit it again.",
        400
      );
    }

    const emailLimit = await consumeRateLimit({
      namespace: "lead-email",
      identifier: lead.email,
      limit: 3,
      windowSeconds: 60 * 60,
      blockSeconds: 6 * 60 * 60
    });

    if (!emailLimit.allowed) {
      return jsonError(
        "This email address has submitted several inquiries recently. Please try again later.",
        429,
        emailLimit.retryAfterSeconds
      );
    }

    const turnstile = await verifyTurnstile({
      token: lead.turnstileToken,
      remoteIp: getClientIp(request),
      expectedAction: "lead_form"
    });

    if (!turnstile.success) {
      console.warn("Turnstile validation failed:", turnstile.errors.join(", "));
      return jsonError(
        "The security check could not be verified. Refresh the page and try again.",
        400
      );
    }

    const experienceSelection = getExperienceSelection(request);
    const projectIntakeDetails = buildProjectIntakeDetails(lead);
    const messageBlocks = [lead.message];

    if (projectIntakeDetails) {
      messageBlocks.push(`${INTAKE_DETAILS_MARKER}\n${projectIntakeDetails}`);
    }

    if (experienceSelection) {
      messageBlocks.push(`Experience Lab selection:\n${experienceSelection}`);
    }

    const messageForStorage = messageBlocks.join("\n\n");
    const estimatedValue = getEstimatedValue(lead);

    const admin = createAdminClient();
    const { data, error } = await admin
      .from("leads")
      .insert({
        name: lead.name,
        email: lead.email,
        company: lead.company || null,
        phone: lead.phone || null,
        project_type: lead.projectType,
        budget_range: lead.budget,
        timeline: lead.timeline || lead.pricingTimeline || null,
        message: messageForStorage,
        estimated_value: estimatedValue,
        source: "website"
      })
      .select("id")
      .single();

    if (error || !data) {
      console.error(error);
      return jsonError("The inquiry could not be saved. Please try again.", 500);
    }

    const siteUrl = getSiteUrl();
    const adminEmail =
      process.env.ADMIN_NOTIFICATION_EMAIL || process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";

    const emailJobs: Promise<unknown>[] = [
      sendTransactionalEmail({
        to: lead.email,
        template: leadConfirmationTemplate({
          name: lead.name,
          projectType: lead.projectType,
          selectedPackage: packageLabel(lead.selectedPackage),
          budget: lead.budget,
          timeline: lead.timeline || lead.pricingTimeline,
          estimatedRange: estimateRange(lead),
          siteUrl
        }),
        replyTo: adminEmail || undefined,
        metadata: { leadId: data.id }
      })
    ];

    if (adminEmail) {
      emailJobs.push(
        sendTransactionalEmail({
          to: adminEmail,
          template: adminLeadNotificationTemplate({
            name: lead.name,
            email: lead.email,
            company: lead.company,
            phone: lead.phone,
            currentWebsite: lead.currentWebsite,
            projectType: lead.projectType,
            selectedPackage: packageLabel(lead.selectedPackage),
            budget: lead.budget,
            estimatedRange: estimateRange(lead),
            timeline: lead.timeline || lead.pricingTimeline,
            servicesNeeded: lead.servicesNeeded,
            addOns: lead.addOns,
            message: lead.message,
            adminUrl: `${siteUrl}/admin/leads`
          }),
          replyTo: lead.email,
          metadata: { leadId: data.id }
        })
      );
    }

    await Promise.allSettled(emailJobs);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error(error);
    return jsonError("The form is temporarily unavailable. Please try again.", 503);
  }
}
