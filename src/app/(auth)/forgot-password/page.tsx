import { Mail, ShieldCheck } from "lucide-react";
import { ActionLink } from "@/components/ui/ActionControl";

export default function ForgotPasswordPage() {
  return (
    <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
      <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/[0.09] bg-white/[0.04]">
        <ShieldCheck className="h-5 w-5 text-[#8be9ff]" />
      </div>
      <p className="mt-8 text-xs uppercase tracking-[0.34em] text-[#8be9ff]">
        Account recovery
      </p>
      <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.055em]">
        Reset your password.
      </h2>
      <p className="mt-4 text-sm leading-7 text-white/42">
        The final reset email action will be connected during the Supabase
        authentication setup. The page design is ready now.
      </p>

      <label className="mt-8 grid gap-2 text-sm text-white/58">
        Account email
        <span className="relative block">
          <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/26" />
          <input
            type="email"
            disabled
            className="form-field cursor-not-allowed pl-11 opacity-55"
            placeholder="you@company.com"
          />
        </span>
      </label>

      <ActionLink href="/login" className="mt-6 w-full">
        Return to login
      </ActionLink>

      <p className="mt-6 text-center text-xs leading-6 text-white/28">
        Need direct help? Contact GridSpell from the public contact page.
      </p>
    </div>
  );
}
