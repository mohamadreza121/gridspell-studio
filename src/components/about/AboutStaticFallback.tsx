import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Code2,
  Gauge,
  Network,
  Sparkles
} from "lucide-react";

import { Container } from "@/components/ui/Container";

const chapterLinks = [
  ["01", "Founder", "founder"],
  ["02", "Philosophy", "philosophy"],
  ["03", "What we build", "build"],
  ["04", "Technology", "technology"],
  ["05", "Growth", "growth"],
  ["06", "Systems", "systems"],
  ["07", "Working together", "process"]
] as const;

const buildAreas = [
  "Business websites",
  "E-commerce",
  "Landing pages",
  "Client portals",
  "Dashboards",
  "Web applications"
] as const;

const stack = [
  "HTML",
  "Modern CSS",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Supabase",
  "PostgreSQL",
  "REST APIs",
  "Vercel"
] as const;

const growthPoints = [
  "Technical SEO and crawlability",
  "Search Console, GA4, and event measurement",
  "Google Ads and conversion tracking",
  "Core Web Vitals and ongoing improvement"
] as const;

const systemPoints = [
  "Domains, DNS, hosting, and deployment",
  "Transactional email and notifications",
  "Payments, CRM, authentication, and databases",
  "Secure APIs and third-party integrations"
] as const;

const process = [
  ["01", "Define", "Goals, audience, scope, budget, and timeline."],
  ["02", "Shape", "Information architecture and a focused design direction."],
  ["03", "Build", "Production development, integrations, and responsive QA."],
  ["04", "Launch", "Deployment, measurement, handoff, and optional care."]
] as const;

function ChapterLabel({
  number,
  children
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div className="about-mobile-chapter-label">
      <span>{number}</span>
      <i />
      <p>{children}</p>
    </div>
  );
}

function PointList({ points }: { points: readonly string[] }) {
  return (
    <ul className="about-mobile-point-list">
      {points.map((point) => (
        <li key={point}>
          <span aria-hidden="true">
            <Check />
          </span>
          {point}
        </li>
      ))}
    </ul>
  );
}

export function AboutStaticFallback() {
  return (
    <main className="about-mobile-page">
      <div className="about-mobile-backdrop" aria-hidden="true">
      </div>

      <section className="about-mobile-hero">
        <Container className="about-mobile-hero-inner">
          <div className="about-mobile-hero-kicker">
            <span>About GridSpell</span>
            <span>Toronto · Canada</span>
          </div>

          <div className="about-mobile-orbit" aria-hidden="true">
            <svg viewBox="0 0 420 420" fill="none">
              <circle
                cx="210"
                cy="210"
                r="164"
                stroke="currentColor"
                strokeDasharray="4 11"
              />
              <ellipse
                cx="210"
                cy="210"
                rx="94"
                ry="151"
                stroke="currentColor"
              />
              <path
                d="M105 155 210 96l111 68v124l-111 64-116-72Z"
                stroke="url(#about-mobile-orbit-gradient)"
              />
              <path
                d="m105 155 105 71 111-62M210 226v126m0-126L94 280"
                stroke="currentColor"
              />
              <circle cx="210" cy="226" r="24" stroke="#8be9ff" />
              <circle cx="210" cy="46" r="5" fill="#8be9ff" />
              <defs>
                <linearGradient
                  id="about-mobile-orbit-gradient"
                  x1="94"
                  y1="96"
                  x2="321"
                  y2="352"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#a895ff" />
                  <stop offset="1" stopColor="#29d6ff" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="about-mobile-hero-copy">
            <h1>
              <span>Structure,</span>
              <span>craft, and a</span>
              <span className="about-mobile-gradient-text">little magic.</span>
            </h1>

            <p>
              An independent web design and development studio founded by
              Mohammadreza Heidarpoor.
            </p>
          </div>

          <div className="about-mobile-hero-meta">
            <p>
              <span aria-hidden="true" />
              Independent studio
            </p>
            <p>Strategy → launch</p>
          </div>

          <a className="about-mobile-scroll-cue" href="#founder">
            Meet the studio
            <ArrowDown aria-hidden="true" />
          </a>
        </Container>
      </section>

      <nav className="about-mobile-chapter-nav" aria-label="About page chapters">
        <ol>
          {chapterLinks.map(([number, label, id]) => (
            <li key={id}>
              <a href={`#${id}`}>
                <span>{number}</span>
                {label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <section className="about-mobile-story" aria-label="About GridSpell">
        <Container>
          <div className="about-mobile-story-intro">
            <p>One studio · Every layer</p>
            <h2>Designed with character. Built like a system.</h2>
          </div>

          <article
            className="about-mobile-chapter about-mobile-founder"
            id="founder"
          >
            <ChapterLabel number="01">About the founder</ChapterLabel>

            <div className="about-mobile-founder-visual">
              <Image
                src="/images/about/mohammadreza.webp"
                alt="Mohammadreza Heidarpoor, founder of GridSpell Studio"
                fill
                sizes="(max-width: 639px) calc(100vw - 2.5rem), (max-width: 1279px) 46vw, 1px"
                quality={68}
              />
              <div className="about-mobile-image-shade" />
              <p>Founder · Designer · Developer</p>
              <span>Toronto, ON</span>
            </div>

            <div className="about-mobile-chapter-copy">
              <h2>
                Hi, I’m Mohammadreza. I built GridSpell to make serious
                businesses look and work the part online.
              </h2>
              <p>
                My background in network engineering means I approach websites
                as complete digital systems: the presentation people see, the
                technology underneath it, and the path that turns attention into
                a real business result.
              </p>
              <PointList
                points={[
                  "Direct collaboration from planning through launch",
                  "Strategy, design, development, and production setup",
                  "A practical technical foundation built around the business"
                ]}
              />
            </div>
          </article>

          <article
            className="about-mobile-chapter about-mobile-philosophy about-mobile-deferred"
            id="philosophy"
          >
            <ChapterLabel number="02">The philosophy</ChapterLabel>

            <div className="about-mobile-chapter-copy">
              <h2>Grid is the structure. Spell is the experience people remember.</h2>
              <p>
                Every project connects reliable systems with a distinct visual
                point of view. The design supports the offer, the code supports
                the experience, and the experience supports the business.
              </p>
            </div>

            <div className="about-mobile-duality">
              <div>
                <span>01 · Grid</span>
                <strong>Clarity</strong>
                <p>Hierarchy, usability, consistency, and room to grow.</p>
              </div>
              <div>
                <span>02 · Spell</span>
                <strong>Memory</strong>
                <p>Character, movement, atmosphere, and credibility.</p>
              </div>
            </div>
          </article>

          <article
            className="about-mobile-chapter about-mobile-deferred"
            id="build"
          >
            <ChapterLabel number="03">What we build</ChapterLabel>

            <div className="about-mobile-chapter-copy">
              <h2>From focused business websites to working digital products.</h2>
              <p>
                The format follows what the business needs to communicate,
                automate, sell, or organize—not a preselected template.
              </p>
            </div>

            <div className="about-mobile-build-grid">
              {buildAreas.map((area, index) => (
                <div key={area}>
                  <span>0{index + 1}</span>
                  <p>{area}</p>
                  <ArrowUpRight aria-hidden="true" />
                </div>
              ))}
            </div>
          </article>

          <article
            className="about-mobile-chapter about-mobile-deferred"
            id="technology"
          >
            <ChapterLabel number="04">Technology</ChapterLabel>

            <div className="about-mobile-icon-heading">
              <span aria-hidden="true">
                <Code2 />
              </span>
              <div>
                <h2>Modern tools, selected for the project.</h2>
                <p>
                  Performance, maintainability, security, content needs, and
                  future growth decide the stack—not buzzwords.
                </p>
              </div>
            </div>

            <div className="about-mobile-stack" aria-label="Technology stack">
              {stack.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>
          </article>

          <article
            className="about-mobile-chapter about-mobile-split about-mobile-deferred"
            id="growth"
          >
            <ChapterLabel number="05">Search, advertising, and growth</ChapterLabel>

            <div className="about-mobile-split-visual">
              <Image
                src="/images/about/growth-and-analytics.webp"
                alt="Analytics and growth systems designed by GridSpell"
                fill
                sizes="(max-width: 639px) calc(100vw - 2.5rem), (max-width: 1279px) 42vw, 1px"
                quality={64}
              />
              <div className="about-mobile-image-shade" />
              <span aria-hidden="true">
                <Gauge />
              </span>
            </div>

            <div className="about-mobile-chapter-copy">
              <h2>A launch matters when the right people can find you and act.</h2>
              <PointList points={growthPoints} />
            </div>
          </article>

          <article
            className="about-mobile-chapter about-mobile-split about-mobile-split--reverse about-mobile-deferred"
            id="systems"
          >
            <ChapterLabel number="06">Infrastructure and integrations</ChapterLabel>

            <div className="about-mobile-split-visual">
              <Image
                src="/images/about/systems-and-infrastructure.webp"
                alt="Connected infrastructure and integration systems"
                fill
                sizes="(max-width: 639px) calc(100vw - 2.5rem), (max-width: 1279px) 42vw, 1px"
                quality={60}
              />
              <div className="about-mobile-image-shade" />
              <span aria-hidden="true">
                <Network />
              </span>
            </div>

            <div className="about-mobile-chapter-copy">
              <h2>The invisible setup matters as much as the page people see.</h2>
              <PointList points={systemPoints} />
            </div>
          </article>

          <article
            className="about-mobile-chapter about-mobile-process about-mobile-deferred"
            id="process"
          >
            <ChapterLabel number="07">Working with GridSpell</ChapterLabel>

            <div className="about-mobile-icon-heading">
              <span aria-hidden="true">
                <Sparkles />
              </span>
              <div>
                <h2>One technical partner, from first idea to launch—and after.</h2>
                <p>
                  You work directly with the person planning, designing, and
                  developing the project, with clear milestones and approval
                  points throughout.
                </p>
              </div>
            </div>

            <ol className="about-mobile-process-list">
              {process.map(([number, title, description]) => (
                <li key={number}>
                  <span>{number}</span>
                  <div>
                    <strong>{title}</strong>
                    <p>{description}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="about-mobile-cta">
              <p>Have a serious idea?</p>
              <h2>Let’s build the system behind it.</h2>
              <div>
                <Link href="/start-project">
                  Start a project
                  <ArrowUpRight aria-hidden="true" />
                </Link>
                <a href="mailto:hello@gridspellstudio.com">Email the studio</a>
              </div>
            </div>
          </article>
        </Container>
      </section>
    </main>
  );
}
