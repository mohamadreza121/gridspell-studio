"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Eye,
  ScanSearch
} from "lucide-react";

import { Container } from "@/components/ui/Container";

type AnatomyMode = "visitor" | "strategy";

const anatomyDecisions = [
  {
    number: "01",
    short: "Clarity",
    title: "Five-second clarity",
    description:
      "The opening screen identifies the audience, the offer, and the value before asking visitors to interpret the design.",
    visitor: "I know what this is and whether it is meant for me.",
    business: "Fewer confused visits and better-fit conversations.",
    x: "22%",
    y: "34%"
  },
  {
    number: "02",
    short: "Hierarchy",
    title: "A deliberate reading order",
    description:
      "Scale, contrast, spacing, and motion guide attention through one useful sequence instead of making every element compete.",
    visitor: "The page feels easy to understand and effortless to scan.",
    business: "The most important message is seen in the right order.",
    x: "53%",
    y: "26%"
  },
  {
    number: "03",
    short: "Trust",
    title: "Evidence before friction",
    description:
      "Specific outcomes, process signals, and credibility cues appear before the page asks someone to commit or share information.",
    visitor: "I have enough confidence to keep moving.",
    business: "The call to action arrives after credibility is established.",
    x: "77%",
    y: "63%"
  },
  {
    number: "04",
    short: "Action",
    title: "One obvious next step",
    description:
      "The primary action stays consistent while secondary paths remain available without distracting from the main journey.",
    visitor: "I know exactly what to do next.",
    business: "Intent moves into a measurable inquiry or transaction.",
    x: "35%",
    y: "69%"
  },
  {
    number: "05",
    short: "Responsive",
    title: "Designed again for smaller screens",
    description:
      "Mobile hierarchy is intentionally reorganized around reach, reading speed, and touch—not simply reduced from the desktop layout.",
    visitor: "The experience still feels considered on my phone.",
    business: "The conversion path remains useful on every screen.",
    x: "88%",
    y: "35%"
  }
] as const;

function AnatomyInterface({
  mode,
  activeIndex,
  onSelect
}: {
  mode: AnatomyMode;
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="home-anatomy-browser" data-mode={mode}>
      <div className="home-anatomy-browser-bar" aria-hidden="true">
        <div>
          <i />
          <i />
          <i />
        </div>
        <span>northstar.systems</span>
        <b>Live concept</b>
      </div>

      <div className="home-anatomy-interface">
        <div className="home-anatomy-visitor-layer" aria-hidden="true">
          <header className="home-anatomy-demo-nav">
            <span>NORTH/STAR</span>
            <div>
              <i>Services</i>
              <i>Process</i>
              <b>Start a project</b>
            </div>
          </header>

          <div className="home-anatomy-demo-hero">
            <div className="home-anatomy-demo-copy">
              <span>Connected business systems</span>
              <h3>Work smarter from the first click.</h3>
              <p>
                One clear experience for attracting, qualifying, and serving the
                right customers.
              </p>
              <div>
                <b>Plan your system</b>
                <i>See how it works</i>
              </div>
            </div>

            <div className="home-anatomy-demo-signal">
              <div className="home-anatomy-signal-head">
                <span>New qualified inquiry</span>
                <i>Live</i>
              </div>
              <strong>Website redesign</strong>
              <p>8 pages · CRM connection · Toronto</p>
              <div className="home-anatomy-signal-progress">
                <span />
              </div>
              <div className="home-anatomy-signal-facts">
                <span>
                  <small>Fit</small>
                  <b>Strong</b>
                </span>
                <span>
                  <small>Action</small>
                  <b>Reply</b>
                </span>
                <span>
                  <small>Status</small>
                  <b>Qualified</b>
                </span>
              </div>
            </div>
          </div>

          <div className="home-anatomy-demo-proof">
            <span>
              <small>01</small>
              Clear positioning
            </span>
            <span>
              <small>02</small>
              Guided decisions
            </span>
            <span>
              <small>03</small>
              Measurable action
            </span>
          </div>
        </div>

        <div className="home-anatomy-strategy-layer" aria-hidden="true">
          <div className="home-anatomy-blueprint-grid" />
          <svg viewBox="0 0 1000 620" preserveAspectRatio="none">
            <path d="M220 210 C340 92 430 110 530 160 S700 340 770 390" />
            <path d="M220 210 C236 330 280 390 350 430" />
            <path d="M530 160 C680 120 790 150 880 220" />
          </svg>
          <span className="home-anatomy-zone home-anatomy-zone--message">
            Message zone
          </span>
          <span className="home-anatomy-zone home-anatomy-zone--flow">
            Reading path
          </span>
          <span className="home-anatomy-zone home-anatomy-zone--trust">
            Trust before ask
          </span>
          <span className="home-anatomy-zone home-anatomy-zone--action">
            Primary action
          </span>
          <span className="home-anatomy-zone home-anatomy-zone--mobile">
            Mobile order
          </span>
          <div className="home-anatomy-scan" />
        </div>

        {anatomyDecisions.map((decision, index) => (
          <button
            key={decision.number}
            type="button"
            className="home-anatomy-hotspot"
            data-active={activeIndex === index ? "true" : "false"}
            style={{
              left: decision.x,
              top: decision.y
            }}
            onClick={() => onSelect(index)}
            aria-label={`Explain ${decision.title}`}
            aria-pressed={activeIndex === index}
          >
            <span>{decision.number}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function HomeDesignAnatomySection() {
  const [mode, setMode] = useState<AnatomyMode>("strategy");
  const [activeIndex, setActiveIndex] = useState(0);
  const activeDecision = anatomyDecisions[activeIndex];

  return (
    <section className="home-anatomy-section home-story-section relative border-t border-white/[0.06] py-24 sm:py-32">
      <Container className="relative">
        <div className="home-anatomy-intro">
          <div>
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.42em] text-[#8be9ff]">
              Design anatomy
            </p>
            <h2 className="mt-6 max-w-[10ch] text-balance font-display text-[clamp(3.2rem,7vw,7.2rem)] font-semibold leading-[0.84] tracking-[-0.075em]">
              Every screen has a job.
            </h2>
          </div>

          <div className="home-anatomy-intro-copy">
            <p>
              A polished interface is the visible layer. Switch views to see the
              decisions guiding attention, trust, and action underneath it.
            </p>

            <div className="home-anatomy-mode-switch" aria-label="Design anatomy view">
              <button
                type="button"
                onClick={() => setMode("visitor")}
                aria-pressed={mode === "visitor"}
                data-active={mode === "visitor" ? "true" : "false"}
              >
                <Eye aria-hidden="true" />
                Visitor view
              </button>
              <button
                type="button"
                onClick={() => setMode("strategy")}
                aria-pressed={mode === "strategy"}
                data-active={mode === "strategy" ? "true" : "false"}
              >
                <ScanSearch aria-hidden="true" />
                Strategy view
              </button>
            </div>
          </div>
        </div>

        <div className="home-anatomy-stage">
          <AnatomyInterface
            mode={mode}
            activeIndex={activeIndex}
            onSelect={setActiveIndex}
          />

          <aside className="home-anatomy-decision" aria-live="polite">
            <div className="home-anatomy-decision-topline">
              <span>{activeDecision.number}</span>
              <p>Strategy signal</p>
            </div>
            <h3>{activeDecision.title}</h3>
            <p className="home-anatomy-decision-description">
              {activeDecision.description}
            </p>

            <dl>
              <div>
                <dt>Visitor understands</dt>
                <dd>{activeDecision.visitor}</dd>
              </div>
              <div>
                <dt>Business gains</dt>
                <dd>{activeDecision.business}</dd>
              </div>
            </dl>

            <p className="home-anatomy-decision-count">
              Decision {activeIndex + 1} of {anatomyDecisions.length}
            </p>
          </aside>
        </div>

        <div className="home-anatomy-rail" aria-label="Explore design decisions">
          {anatomyDecisions.map((decision, index) => (
            <button
              key={decision.number}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-pressed={activeIndex === index}
              data-active={activeIndex === index ? "true" : "false"}
            >
              <span>{decision.number}</span>
              <p>{decision.short}</p>
            </button>
          ))}
        </div>

        <div className="home-anatomy-footer">
          <p>Good design makes the next decision feel natural.</p>
          <Link href="/process">
            See the complete process
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
