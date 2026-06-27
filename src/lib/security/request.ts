import "server-only";

export function getClientIp(request: Request) {
  const headers = request.headers;
  const forwarded = headers.get("x-forwarded-for");

  return (
    headers.get("cf-connecting-ip") ||
    headers.get("x-real-ip") ||
    forwarded?.split(",")[0]?.trim() ||
    "unknown"
  );
}

export function getRequestFingerprint(request: Request) {
  const userAgent = request.headers.get("user-agent") || "unknown";
  return `${getClientIp(request)}|${userAgent.slice(0, 240)}`;
}
