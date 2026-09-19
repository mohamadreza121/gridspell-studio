import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, Sparkles, Plus } from "lucide-react";
import type { LandingPageConcept } from "@/config/landing-pages";
import styles from "./GalleryShowcase.module.css";

const directions: Record<string, { theme: string; signal: string; note: string }> = {
  "event-launch": {
    theme: "event",
    signal: "Turn attention into anticipation.",
    note: "Oversized type, electric contrast, and a ticket-led composition build the energy of a live launch."
  },
  "beauty-booking": {
    theme: "beauty",
    signal: "A little room to exhale.",
    note: "Warm paper tones, editorial spacing, and intimate imagery make booking feel like the beginning of the experience."
  },
  "ecommerce-drop": {
    theme: "commerce",
    signal: "Built for the first impression.",
    note: "A sharp grid and an unmistakable product close-up put the offer at the center of the campaign."
  },
  "creator-brand": {
    theme: "creator",
    signal: "Personality is the point.",
    note: "An asymmetric cover, warm color, and handwritten details give a personal brand its own editorial voice."
  },
  "law-firm-classic": {
    theme: "law",
    signal: "Confidence, without the noise.",
    note: "Measured symmetry, fine brass rules, and a restrained serif establish a composed, authoritative presence."
  },
  "dental-trust": {
    theme: "dental",
    signal: "Care starts with clarity.",
    note: "Airy spacing, gentle color, and a clear appointment path make the next step feel approachable."
  }
};

function Preview({
  concept,
  className = ""
}: {
  concept: LandingPageConcept;
  className?: string;
}) {
  return (
    <Link
      href={concept.demoHref ?? "/landing-pages"}
      className={`${styles.preview} ${className}`}
      aria-label={`Explore ${concept.title} live demo`}
    >
      <div className={styles.browserBar} aria-hidden="true">
        <span />
        <span />
        <span />
        <small>{concept.slug.replaceAll("-", " ")} / live concept</small>
        <ArrowUpRight size={12} />
      </div>
      <Image
        src={`/landing-page-screenshots/${concept.slug}.jpg`}
        width={1440}
        height={900}
        alt={`${concept.title} — actual landing page preview`}
        unoptimized
        loading="lazy"
      />
    </Link>
  );
}

function Detail({
  concept,
  className = ""
}: {
  concept: LandingPageConcept;
  className?: string;
}) {
  return (
    <div className={`${styles.detail} ${className}`} aria-hidden="true">
      <Image
        src={`/landing-page-screenshots/${concept.slug}.jpg`}
        alt=""
        width={1440}
        height={900}
        unoptimized
        loading="lazy"
      />
    </div>
  );
}

export function GalleryShowcase({
  concept,
  index
}: {
  concept: LandingPageConcept;
  index: number;
}) {
  const direction = directions[concept.slug];
  if (!direction) return null;
  const params = new URLSearchParams({
    package: "landing-page",
    source: concept.slug,
    design: concept.title
  });
  const titleId = `showcase-${concept.slug}`;
  return (
    <article
      className={`${styles.showcase} ${styles[direction.theme]}`}
      aria-labelledby={titleId}
      data-gallery-showcase={direction.theme}
    >
      <div className={styles.art}>
        <div className={styles.eyebrow}>
          <span>
            0{index + 1} / {concept.category}
          </span>
          <span>
            GridSpell collection <ArrowUpRight size={13} />
          </span>
        </div>
        {direction.theme === "event" && (
          <>
            <div className={styles.eventHeading}>
              <h3 id={titleId}>
                Event
                <br />
                <em>Launch.</em>
              </h3>
              <p>{direction.signal}</p>
              <span className={styles.eventStamp} aria-hidden="true">
                LIVE
                <br />& LOUD ↗
              </span>
            </div>
            <div className={styles.eventStage}>
              <Preview concept={concept} />
              <div className={styles.ticket}>
                <span>THE ALL-ACCESS EDIT</span>
                <strong>
                  ADMIT
                  <br />
                  YOUR NEXT
                  <br />
                  BIG IDEA.
                </strong>
                <div className={styles.barcode} aria-hidden="true" />
                <span>CONCEPT 001 / EVENTS</span>
              </div>
            </div>
          </>
        )}
        {direction.theme === "beauty" && (
          <>
            <div className={styles.beautyHeading}>
              <span className={styles.smallLabel}>THE BEAUTY EDIT</span>
              <h3 id={titleId}>
                Beauty
                <br />
                <em>Booking.</em>
              </h3>
              <p>{direction.signal}</p>
              <Sparkles size={30} strokeWidth={1} aria-hidden="true" />
            </div>
            <div className={styles.beautyStage}>
              <div className={styles.beautyHalo} aria-hidden="true" />
              <Preview concept={concept} />
              <div className={styles.beautyInset}>
                <Detail concept={concept} />
                <span>Soft detail. Strong impression.</span>
              </div>
              <span className={styles.beautyCaption}>
                Considered, down to the last detail.
              </span>
            </div>
          </>
        )}
        {direction.theme === "commerce" && (
          <>
            <span className={styles.dropWord} aria-hidden="true">
              DROP
            </span>
            <div className={styles.commerceHeading}>
              <h3 id={titleId}>
                Ecommerce
                <br />
                <em>Drop.</em>
              </h3>
              <p>{direction.signal}</p>
            </div>
            <div className={styles.commerceStage}>
              <div className={styles.productPlate}>
                <span className={styles.smallLabel}>PRODUCT IN FOCUS</span>
                <Detail concept={concept} />
                <span className={styles.productLabel}>01 — MAKE IT UNMISSABLE ↗</span>
              </div>
              <Preview concept={concept} />
            </div>
            <div className={styles.commerceStrip} aria-hidden="true">
              <span>HIGH CONTRAST</span>
              <Plus size={16} />
              <span>PRODUCT FIRST</span>
              <Plus size={16} />
              <span>ZERO HESITATION</span>
            </div>
          </>
        )}
        {direction.theme === "creator" && (
          <>
            <div className={styles.creatorHeading}>
              <span className={styles.smallLabel}>THE INDEPENDENT ISSUE / 004</span>
              <h3 id={titleId}>
                Creator <em>Brand.</em>
              </h3>
              <p>{direction.signal}</p>
            </div>
            <div className={styles.creatorStage}>
              <div className={styles.creatorPortrait}>
                <Detail concept={concept} />
                <span>
                  A point of view
                  <br />
                  worth following.
                </span>
              </div>
              <Preview concept={concept} />
              <span className={styles.handwritten}>
                Make it feel
                <br />
                like you. ↗
              </span>
              <span className={styles.creatorSeal} aria-hidden="true">
                OWN
                <br />
                YOUR
                <br />
                VOICE
              </span>
            </div>
          </>
        )}
        {direction.theme === "law" && (
          <>
            <div className={styles.lawHeading}>
              <span className={styles.lawMonogram} aria-hidden="true">
                §
              </span>
              <span className={styles.smallLabel}>THE AUTHORITY OF RESTRAINT</span>
              <h3 id={titleId}>
                Law Firm <em>Classic.</em>
              </h3>
              <p>{direction.signal}</p>
            </div>
            <div className={styles.lawStage}>
              <span className={styles.lawMargin}>PRECISION / DISCRETION / TRUST</span>
              <Preview concept={concept} />
              <span className={styles.lawPlate}>PLATE V — PROFESSIONAL SERVICES</span>
            </div>
          </>
        )}
        {direction.theme === "dental" && (
          <>
            <div className={styles.dentalHeading}>
              <span className={styles.dentalMark} aria-hidden="true">
                <Plus size={32} strokeWidth={1.3} />
              </span>
              <h3 id={titleId}>
                Dental
                <br />
                <em>Trust.</em>
              </h3>
              <p>{direction.signal}</p>
              <span className={styles.smallLabel}>
                A CALMER KIND OF DIGITAL EXPERIENCE
              </span>
            </div>
            <div className={styles.dentalStage}>
              <div className={styles.dentalOrbit} aria-hidden="true" />
              <Preview concept={concept} />
              <div className={styles.appointment}>
                <span className={styles.smallLabel}>BOOKING FLOW / CONCEPT PREVIEW</span>
                <strong>
                  A little closer
                  <br />
                  to your best smile.
                </strong>
                <span className={styles.appointmentRule} />
                <span>Your next step</span>
                <Link
                  href={`${concept.demoHref}#book`}
                  className={styles.appointmentLink}
                >
                  Explore booking <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
      <footer className={styles.footer}>
        <div className={styles.designNote}>
          <span className={styles.smallLabel}>THE DESIGN INTENT</span>
          <p>{direction.note}</p>
        </div>
        <div className={styles.actions}>
          <Link href={concept.demoHref ?? "/landing-pages"} className={styles.primary}>
            Open live demo <ExternalLink size={15} />
          </Link>
          <Link href={`/start-project?${params}`} className={styles.secondary}>
            Use this direction <ArrowUpRight size={16} />
          </Link>
        </div>
      </footer>
    </article>
  );
}
