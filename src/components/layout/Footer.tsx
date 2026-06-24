import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ActionLink } from "@/components/ui/ActionControl";
import { Logo } from "@/components/layout/Logo";
import { marketingNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#050609]">
      <Container className="py-16 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <Logo />
            <h2 className="mt-10 max-w-3xl font-display text-4xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-6xl">
              Have a serious idea?
              <span className="block text-white/28">
                Let&apos;s make it impossible to ignore.
              </span>
            </h2>
            <ActionLink href="/start-project" className="mt-10">
              Start your project
              <ArrowUpRight className="h-4 w-4" />
            </ActionLink>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-xs uppercase tracking-[0.34em] text-white/24">Explore</p>
              <div className="mt-6 grid gap-3">
                {marketingNavigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm text-white/48 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.34em] text-white/24">Contact</p>
              <div className="mt-6 grid gap-3 text-sm text-white/48">
                <a className="transition-colors hover:text-white" href={`mailto:${siteConfig.email}`}>
                  {siteConfig.email}
                </a>
                <span>{siteConfig.location}</span>
                <Link className="transition-colors hover:text-white" href="/privacy">
                  Privacy
                </Link>
                <Link className="transition-colors hover:text-white" href="/terms">
                  Terms
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/[0.08] pt-8 text-xs text-white/28 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}.
          </p>
          <p>{siteConfig.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
