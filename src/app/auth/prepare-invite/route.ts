import { NextResponse } from "next/server";

const INVITE_COOKIE = "gridspell_invite_token";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const tokenHash = url.searchParams.get("token_hash");

  if (!tokenHash || tokenHash.length < 20) {
    return NextResponse.redirect(
      new URL(
        "/login?error=The%20invitation%20link%20is%20invalid",
        url.origin
      )
    );
  }

  const response = NextResponse.redirect(
    new URL("/confirm-invite", url.origin)
  );

  response.cookies.set(INVITE_COOKIE, tokenHash, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 15 * 60
  });

  return response;
}