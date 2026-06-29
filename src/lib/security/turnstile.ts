import "server-only";

type TurnstileResponse = {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  action?: string;
  cdata?: string;
  "error-codes"?: string[];
};

export type TurnstileVerification = {
  success: boolean;
  skipped: boolean;
  errors: string[];
};

function getConfiguredHostnames() {
  return [
    process.env.TURNSTILE_EXPECTED_HOSTNAME,
    process.env.TURNSTILE_PREVIEW_EXPECTED_HOSTNAME
  ]
    .flatMap((value) => value?.split(",") ?? [])
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
}

export async function verifyTurnstile(input: {
  token?: string | null;
  remoteIp?: string | null;
  expectedAction?: string;
}): Promise<TurnstileVerification> {
  const isPreview = process.env.VERCEL_ENV === "preview";
  const secret = isPreview
    ? process.env.TURNSTILE_PREVIEW_SECRET_KEY || process.env.TURNSTILE_SECRET_KEY
    : process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    return {
      success: true,
      skipped: true,
      errors: []
    };
  }

  const token = input.token?.trim();
  if (!token) {
    return {
      success: false,
      skipped: false,
      errors: ["missing-input-response"]
    };
  }

  const formData = new FormData();
  formData.set("secret", secret);
  formData.set("response", token);
  if (input.remoteIp && input.remoteIp !== "unknown") {
    formData.set("remoteip", input.remoteIp);
  }

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body: formData,
      cache: "no-store",
      signal: AbortSignal.timeout(8_000)
    }
  );

  if (!response.ok) {
    return {
      success: false,
      skipped: false,
      errors: [`siteverify-http-${response.status}`]
    };
  }

  const result = (await response.json()) as TurnstileResponse;
  const allowedHostnames = getConfiguredHostnames();
  const resultHostname = result.hostname?.toLowerCase();
  const previewHostnameMatches = Boolean(
    isPreview && resultHostname?.endsWith(".vercel.app")
  );
  const configuredHostnameMatches = Boolean(
    resultHostname && allowedHostnames.includes(resultHostname)
  );
  const hostnameMatches =
    allowedHostnames.length === 0 ||
    configuredHostnameMatches ||
    previewHostnameMatches;
  const actionMatches = !input.expectedAction || result.action === input.expectedAction;

  return {
    success: Boolean(result.success && hostnameMatches && actionMatches),
    skipped: false,
    errors: [
      ...(result["error-codes"] ?? []),
      ...(hostnameMatches ? [] : ["hostname-mismatch"]),
      ...(actionMatches ? [] : ["action-mismatch"])
    ]
  };
}
