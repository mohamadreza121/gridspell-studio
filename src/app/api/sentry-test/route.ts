import * as Sentry from "@sentry/nextjs";

export const runtime = "nodejs";

export async function GET() {
  const error = new Error("GridSpell explicit Sentry test error");

  const eventId = Sentry.captureException(error);
  const flushed = await Sentry.flush(5000);

  return Response.json({
    dsnConfigured: Boolean(
      process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN
    ),
    clientInitialized: Boolean(Sentry.getClient()),
    eventId,
    flushed,
    environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV,
  });
}