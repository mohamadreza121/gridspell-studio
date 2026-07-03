import { ArrowUpRight, LockKeyhole, Mail } from "lucide-react";

import { marketingNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";

type TinyPhoneNavProps = {
  accountHref: string;
  accountLabel: string;
};

export function TinyPhoneNav({
  accountHref,
  accountLabel
}: TinyPhoneNavProps) {
  const contactEmail = siteConfig.email;

  return (
    <div className="tiny-phone-nav" aria-label="Small phone navigation">
      <input
        id="tiny-phone-nav-toggle"
        type="checkbox"
        className="tiny-phone-nav__input"
        aria-hidden="true"
      />

      <label
        htmlFor="tiny-phone-nav-toggle"
        className="tiny-phone-nav__button"
        aria-label="Open navigation"
      >
        <span className="tiny-phone-nav__icon" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </label>

      <div className="tiny-phone-nav__panel">
        <div className="tiny-phone-nav__panel-inner">
          <div className="tiny-phone-nav__panel-top">
            <span className="tiny-phone-nav__eyebrow">
              Navigate GridSpell
            </span>

            <label
              htmlFor="tiny-phone-nav-toggle"
              className="tiny-phone-nav__close"
              aria-label="Close navigation"
            >
              ×
            </label>
          </div>

          <nav className="tiny-phone-nav__links" aria-label="Primary navigation">
            {[{ label: "Home", href: "/" }, ...marketingNavigation].map(
              (item, index) => (
                <a key={item.href} href={item.href} className="tiny-phone-nav__link">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item.label}</strong>
                </a>
              )
            )}
          </nav>

          <div className="tiny-phone-nav__actions">
            <a href="/start-project" className="tiny-phone-nav__cta">
              Start a project
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <a href={accountHref} className="tiny-phone-nav__secondary">
              <LockKeyhole className="h-4 w-4" aria-hidden="true" />
              {accountLabel}
            </a>

            <a href={`mailto:${contactEmail}`} className="tiny-phone-nav__email">
              <Mail className="h-4 w-4" aria-hidden="true" />
              {contactEmail}
            </a>
          </div>

          <p className="tiny-phone-nav__note">
            Use the project form for new website requests, or email GridSpell directly
            for support, billing, privacy, and existing project questions.
          </p>
        </div>
      </div>
    </div>
  );
}
