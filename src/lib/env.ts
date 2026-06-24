function required(value: string | undefined, name: string) {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const getSiteUrl = () =>
  required(process.env.NEXT_PUBLIC_SITE_URL, "NEXT_PUBLIC_SITE_URL").replace(/\/$/, "");

export const getSupabaseUrl = () =>
  required(process.env.NEXT_PUBLIC_SUPABASE_URL, "NEXT_PUBLIC_SUPABASE_URL");

export const getSupabasePublicKey = () =>
  required(
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"
  );

export const getSupabaseSecretKey = () =>
  required(
    process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY,
    "SUPABASE_SECRET_KEY"
  );
