import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

function clearSupabaseAuthCookies(
  request: NextRequest,
  response: NextResponse
) {
  for (const cookie of request.cookies.getAll()) {
    if (!cookie.name.startsWith("sb-")) continue;

    request.cookies.delete(cookie.name);
    response.cookies.set(cookie.name, "", {
      path: "/",
      maxAge: 0
    });
  }
}

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) return supabaseResponse;

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headersToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
        Object.entries(headersToSet).forEach(([key, value]) =>
          supabaseResponse.headers.set(key, value)
        );
      }
    }
  });

  // Keep this immediately after createServerClient. It validates/refreshes
  // the cookie session before Server Components read it.
  const { error } = await supabase.auth.getClaims();

  // A local database reset removes auth.refresh_tokens. Browsers may still
  // hold the old cookie, so remove it instead of logging the same error on
  // every request. The visitor simply becomes signed out and can log in again.
  const staleRefreshToken =
    error?.code === "refresh_token_not_found" ||
    error?.code === "refresh_token_already_used" ||
    error?.message.toLowerCase().includes("refresh token");

  if (staleRefreshToken) {
    clearSupabaseAuthCookies(request, supabaseResponse);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"
  ]
};
