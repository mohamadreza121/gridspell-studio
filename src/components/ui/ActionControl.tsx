import Link from "next/link";
import type {
  ButtonHTMLAttributes,
  ComponentProps,
  ReactNode
} from "react";
import { cn } from "@/lib/utils";

export const actionControlClassName =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-[linear-gradient(135deg,#7c5cff_0%,#6477ff_48%,#29d6ff_100%)] px-6 text-sm font-semibold text-white shadow-[0_14px_44px_rgba(92,104,255,0.26)] transition-[transform,box-shadow,filter] duration-300 hover:-translate-y-0.5 hover:text-white hover:shadow-[0_18px_58px_rgba(92,104,255,0.36)] hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8be9ff]/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07080c] disabled:pointer-events-none disabled:opacity-50";

type ActionLinkProps = Omit<
  ComponentProps<typeof Link>,
  "className" | "children"
> & {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
};

export function ActionLink({
  children,
  className,
  ariaLabel,
  ...props
}: ActionLinkProps) {
  return (
    <Link
      {...props}
      aria-label={ariaLabel}
      className={cn(actionControlClassName, className)}
    >
      {children}
    </Link>
  );
}

export function ActionButton({
  className,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={cn(actionControlClassName, className)}
      {...props}
    />
  );
}
