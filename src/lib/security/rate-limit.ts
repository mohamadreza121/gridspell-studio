import "server-only";

import { createHash } from "node:crypto";
import { createAdminClient } from "@/lib/supabase/admin";

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

function normalizeIdentifier(value: string) {
  return value.trim().toLowerCase().slice(0, 500);
}

export function hashRateLimitIdentifier(namespace: string, value: string) {
  const salt =
    process.env.RATE_LIMIT_SALT ||
    process.env.SUPABASE_SECRET_KEY ||
    "gridspell-development-rate-limit-salt";

  return createHash("sha256")
    .update(`${namespace}:${normalizeIdentifier(value)}:${salt}`)
    .digest("hex");
}

export async function consumeRateLimit(input: {
  namespace: string;
  identifier: string;
  limit: number;
  windowSeconds: number;
  blockSeconds?: number;
}): Promise<RateLimitResult> {
  const admin = createAdminClient();
  const keyHash = hashRateLimitIdentifier(input.namespace, input.identifier || "unknown");

  const { data, error } = await admin.rpc("consume_request_rate_limit", {
    p_key_hash: keyHash,
    p_limit: input.limit,
    p_window_seconds: input.windowSeconds,
    p_block_seconds: input.blockSeconds ?? 3600
  });

  if (error) {
    // A temporary rate-limit storage failure should not silently make the lead
    // form unusable. The route will still apply the honeypot, timing check, and
    // Turnstile validation when configured.
    console.error("Rate-limit check failed:", error.message);
    return {
      allowed: true,
      remaining: 0,
      retryAfterSeconds: 0
    };
  }

  const result = Array.isArray(data) ? data[0] : data;

  return {
    allowed: Boolean(result?.allowed),
    remaining: Number(result?.remaining ?? 0),
    retryAfterSeconds: Number(result?.retry_after_seconds ?? 0)
  };
}
