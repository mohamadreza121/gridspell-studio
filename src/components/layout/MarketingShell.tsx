import type { ReactNode } from "react";

import { DeferredNavbar } from "@/components/layout/DeferredNavbar";
import { Footer } from "@/components/layout/Footer";
import { Logo } from "@/components/layout/Logo";
import type { MarketingViewer } from "@/components/layout/Navbar";
import { TinyViewportRecoveryStyles } from "@/components/layout/TinyViewportRecoveryStyles";
import { marketingNavigation } from "@/config/navigation";
import { getViewerContext } from "@/lib/supabase/auth";

function initials(fullName: string | null, email: string | null) {
  const source = fullName?.trim() || email?.split("@")[0] || "GS";
  const words = source.split(/\s+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0] ?? ""}${words.at(-1)?.[0] ?? ""}`.toUpperCase();
}

export async function MarketingShell({ children }: { children: ReactNode }) {
  const context = await getViewerContext();

  let viewer: MarketingViewer | null = null;
  if (context) {
    const staff = Boolean(context.staffRole);
    const hasWorkspace = context.organizationMemberships.length > 0;

    viewer = {
      fullName: context.fullName,
      email: context.email,
      href: staff ? "/admin" : hasWorkspace ? "/portal" : "/accept-invite",
      label: staff
        ? "Admin dashboard"
        : hasWorkspace
          ? "Client portal"
          : "Complete setup",
      initials: initials(context.fullName, context.email)
    };
  }

  return (
    <>
      <TinyViewportRecoveryStyles />
      <a href="#primary-content" className="skip-link">
        Skip to main content
      </a>
      <DeferredNavbar
        viewer={viewer}
        navigation={marketingNavigation}
        brand={<Logo responsiveCompact />}
      />
      <div id="primary-content" tabIndex={-1} className="focus:outline-none">
        {children}
      </div>
      <Footer />
    </>
  );
}
