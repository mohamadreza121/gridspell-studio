"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowUpRight, ChevronUp, Crosshair, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import styles from "./DotaCinematicExperience.module.css";

const heroes = [
  {
    letter: "D",
    name: "Axe",
    title: "The army of one.",
    attribute: "Strength",
    role: "Initiator · Durable",
    image: "axe",
    color: "#cf5539",
    shade: "#281513",
    glow: "#743523",
    letterArt: { x: -20, y: 12, size: 400 },
    quote: "No army. No equal. No retreat."
  },
  {
    letter: "O",
    name: "Drow Ranger",
    title: "Silence. Then the storm.",
    attribute: "Agility",
    role: "Carry · Disabler",
    image: "drow_ranger",
    color: "#82b8c6",
    shade: "#101d30",
    glow: "#355c81",
    letterArt: { x: -134, y: -4, size: 460 },
    quote: "A whisper from the woods. An arrow from the dark."
  },
  {
    letter: "T",
    name: "Terrorblade",
    title: "Fear your reflection.",
    attribute: "Agility",
    role: "Carry · Pusher",
    image: "terrorblade",
    color: "#70b7a7",
    shade: "#0d2429",
    glow: "#24676b",
    letterArt: { x: -75, y: -65, size: 470 },
    quote: "Even your darkest self has something to fear."
  },
  {
    letter: "A",
    name: "Juggernaut",
    title: "Beyond the blade.",
    attribute: "Agility",
    role: "Carry · Pusher",
    image: "juggernaut",
    color: "#dca97b",
    shade: "#302016",
    glow: "#91603a",
    letterArt: { x: -95, y: -2, size: 440 },
    quote: "A single blade. A thousand possibilities."
  },
  {
    letter: "2",
    name: "Enigma",
    title: "Embrace the void.",
    attribute: "Universal",
    role: "Disabler · Initiator",
    image: "enigma",
    color: "#b79cfa",
    shade: "#201440",
    glow: "#7553a8",
    letterArt: { x: -44, y: -23, size: 430 },
    quote: "All paths lead to the singularity."
  }
] as const;

// Original vector letterforms. Even-odd counters remain transparent through the extrusion.
const letterPaths = [
  "M22 20H145C235 20 284 72 284 169C284 269 235 320 145 320H22V297H45V43H22ZM112 75V265H143C191 265 213 232 213 169C213 107 191 75 143 75Z",
  "M150 14C239 14 285 73 285 170C285 267 239 326 150 326C61 326 15 267 15 170C15 73 61 14 150 14ZM150 74C106 74 88 108 88 170C88 232 106 266 150 266C194 266 212 232 212 170C212 108 194 74 150 74Z",
  "M10 20H290V102H269L253 77H185V296H211V320H89V296H115V77H47L31 102H10Z",
  "M120 20H182L277 296H296V320H174V296H198L181 244H104L87 296H111V320H4V296H23ZM143 112L119 192H167Z",
  "M22 106C22 45 72 14 151 14C228 14 276 45 276 105C276 151 244 179 207 209L132 267H225L246 237H278V320H21V270L158 156C191 128 205 114 205 96C205 78 185 69 155 69C121 69 96 82 88 106L82 126H22Z"
];

const clamp = (n: number) => Math.max(0, Math.min(1, n));
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (n: number) => {
  const t = clamp(n);
  return t * t * (3 - 2 * t);
};

function AncientMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 36" fill="currentColor" aria-hidden="true">
      <path
        d="M3 2L34 4L32 34L2 32ZM9 7L6 13L25 30L30 24ZM7 22L6 29L15 30ZM23 7L30 15L30 7Z"
        fillRule="evenodd"
      />
    </svg>
  );
}

function HeroLetter({ index }: { index: number }) {
  const hero = heroes[index];
  return (
    <div
      className={styles.letter}
      data-letter={hero.letter}
      style={{ "--index": index, "--hero-color": hero.color } as CSSProperties}
    >
      <svg className={styles.letterShadow} viewBox="0 0 300 340" aria-hidden="true">
        <path d={letterPaths[index]} fillRule="evenodd" />
      </svg>
      {Array.from({ length: 22 }, (_, layer) => (
        <svg
          key={layer}
          className={styles.depth}
          viewBox="0 0 300 340"
          aria-hidden="true"
          style={{ transform: `translateZ(${-66 + layer * 3}px)` }}
        >
          <path
            d={letterPaths[index]}
            fillRule="evenodd"
            fill={layer % 5 === 0 ? "#82715b" : layer > 17 ? "#6b5945" : "#332c24"}
            stroke={layer % 5 === 0 ? "#9a8261" : "#42372c"}
            strokeWidth="1"
          />
        </svg>
      ))}
      <svg className={styles.letterFace} viewBox="0 0 300 340" aria-hidden="true">
        <defs>
          <clipPath id={`dota-letter-${index}`}>
            <path d={letterPaths[index]} clipRule="evenodd" />
          </clipPath>
          <radialGradient id={`dota-aura-${index}`} cx=".55" cy=".3" r=".85">
            <stop stopColor={hero.glow} />
            <stop offset=".65" stopColor={hero.shade} />
            <stop offset="1" stopColor="#0c1013" />
          </radialGradient>
          <linearGradient id={`dota-light-${index}`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#eee0be" stopOpacity=".15" />
            <stop offset=".42" stopColor={hero.color} stopOpacity=".03" />
            <stop offset="1" stopColor="#090908" stopOpacity=".4" />
          </linearGradient>
        </defs>
        <g clipPath={`url(#dota-letter-${index})`}>
          <path d={letterPaths[index]} fill={`url(#dota-aura-${index})`} />
          <image
            href={`/images/dota/${hero.image}.webp`}
            x={hero.letterArt.x}
            y={hero.letterArt.y}
            width={hero.letterArt.size}
            height={hero.letterArt.size}
            preserveAspectRatio="xMidYMid meet"
          />
          <path d={letterPaths[index]} fill={`url(#dota-light-${index})`} />
          <path
            d="M0 86L300 32M0 88L300 34M0 269L300 215"
            stroke="#e4d2b2"
            strokeOpacity=".12"
            strokeWidth="1"
          />
        </g>
        <path
          d={letterPaths[index]}
          fill="none"
          stroke="#d1b991"
          strokeWidth="2.3"
          strokeOpacity=".8"
        />
        <path d={letterPaths[index]} fill="none" stroke={hero.color} strokeWidth=".7" />
      </svg>
    </div>
  );
}

function WorldBackground() {
  const video = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const media = video.current;
    if (!media) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;

    const syncPlayback = () => {
      if (!visible || document.hidden || motion.matches || paused) {
        media.pause();
        return;
      }
      // Streamable's public MP4 endpoint resolves a fresh CDN URL on each load.
      // No video request during the intro; the original MOV stays out of Git.
      if (!media.getAttribute("src")) {
        media.src = "https://api-f.streamable.com/api/v1/videos/6jy2g2/mp4";
      }
      void media.play().catch(() => {
        // Keep the charcoal fallback if playback is unavailable or blocked.
      });
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    });
    observer.observe(media);
    motion.addEventListener("change", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      observer.disconnect();
      media.pause();
      motion.removeEventListener("change", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
    };
  }, [paused]);

  return (
    <>
      <div className={styles.worldMedia} aria-hidden="true">
        <video
          ref={video}
          className={styles.worldVideo}
          muted
          loop
          playsInline
          preload="none"
          tabIndex={-1}
          onCanPlay={() => setReady(true)}
          onError={() => setReady(false)}
        />
      </div>
      {ready && (
        <button
          type="button"
          className={styles.worldPlayback}
          onClick={() => setPaused((value) => !value)}
          aria-label={paused ? "Play background video" : "Pause background video"}
        >
          {paused ? <Play size={12} /> : <Pause size={12} />}
          {paused ? "Play background" : "Pause background"}
        </button>
      )}
    </>
  );
}

export function DotaCinematicExperience() {
  const intro = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [assembled, setAssembled] = useState(false);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const section = intro.current;
    const scene = stage.current;
    if (!section || !scene) return;
    const letters = [...scene.querySelectorAll<HTMLElement>("[data-letter]")];
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let currentActive = -1;
    let currentAssembled = false;

    const render = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const w = scene.clientWidth;
      const h = scene.clientHeight;
      const reduced = motion.matches;
      const p = reduced ? 1 : clamp(-rect.top / Math.max(1, section.offsetHeight - h));
      const focus = Math.min(4, (p / 0.76) * 4);
      const gather = ease((p - 0.78) / 0.16);
      const width = Math.min(w * 0.71, h * (h < 600 ? 0.56 : 0.78), 650);
      const finalWidth = Math.min(w * 0.165, h * 0.3);
      const nextActive = Math.min(4, Math.round(focus));
      const nextAssembled = gather > 0.6;
      if (nextActive !== currentActive) {
        setActive(nextActive);
        currentActive = nextActive;
      }
      if (nextAssembled !== currentAssembled) {
        setAssembled(nextAssembled);
        currentAssembled = nextAssembled;
      }
      scene.style.setProperty("--scroll-progress", String(p));
      scene.style.setProperty("--gather", String(gather));
      letters.forEach((letter, index) => {
        const distance = index - focus;
        const x = mix(
          distance * width * 1.5 + (w > 700 ? w * 0.065 : 0),
          (index - 2) * finalWidth * 1.1,
          gather
        );
        const y = mix(Math.abs(distance) * 35 - h * 0.035, -h * 0.015, gather);
        const scale = mix(
          1 - Math.min(Math.abs(distance), 1) * 0.12,
          finalWidth / width,
          gather
        );
        letter.style.width = `${width}px`;
        letter.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0) rotateX(${mix(48, 0, gather)}deg) rotateY(${mix(-20 + distance * 13, 0, gather)}deg) rotateZ(${mix(-24 + distance * 5, 0, gather)}deg) scale(${scale})`;
        letter.style.visibility =
          Math.abs(distance) > 1.6 && gather === 0 ? "hidden" : "visible";
        letter.style.zIndex = String(10 - Math.round(Math.abs(distance)));
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    section.dataset.enhanced = "true";
    render();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    motion.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      motion.removeEventListener("change", schedule);
      delete section.dataset.enhanced;
    };
  }, []);

  const hero = heroes[active];
  const rosterHero = heroes[selected];

  function goToChapter(index: number) {
    const section = intro.current;
    const scene = stage.current;
    if (!section || !scene) return;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: top + Math.max(0, section.offsetHeight - scene.clientHeight) * index * 0.19,
      behavior: reduced ? "instant" : "smooth"
    });
  }

  return (
    <main id="dota-experience" className={styles.page}>
      <a className={styles.skipLink} href="#dota-content">
        Skip to content
      </a>
      <section
        ref={intro}
        className={styles.intro}
        aria-label="Dota 2 cinematic letter reveal"
      >
        <div
          ref={stage}
          className={styles.stage}
          style={{ "--chapter-color": hero.color } as CSSProperties}
        >
          <header className={styles.header}>
            <a
              href="#dota-content"
              className={styles.brand}
              aria-label="Dota 2 — explore the demo"
            >
              <AncientMark />
              <span>
                DOTA <b>2</b>
              </span>
            </a>
            <span className={styles.edition}>
              THE ANCIENTS COLLECTION <i /> VOL. 01
            </span>
            <Link href="/landing-pages" className={styles.galleryLink}>
              <ArrowLeft size={14} />
              <span>Back to gallery</span>
            </Link>
          </header>

          <div className={styles.stageLine} aria-hidden="true" />
          <div className={styles.ambient} aria-hidden="true" />
          <div className={styles.floor} aria-hidden="true" />
          <div className={styles.scene} aria-hidden="true">
            {heroes.map((h, i) => (
              <HeroLetter key={h.letter} index={i} />
            ))}
          </div>
          <div className={styles.sideNote} aria-hidden="true">
            RADIANT / DIRE <span>EST. IN THE ANCIENT WORLD</span>
          </div>
          <span className={styles.coordinate} aria-hidden="true">
            5 HEROES.
            <br />
            ONE ANCIENT.
          </span>

          <div className={styles.chapter} data-assembled={assembled}>
            <p className={styles.eyebrow}>
              <span />
              {assembled
                ? "THE BATTLE IS CALLING"
                : `${String(active + 1).padStart(2, "0")} / ${hero.attribute.toUpperCase()}`}
            </p>
            <h1>{assembled ? "DEFEND THE ANCIENT." : hero.name.toUpperCase()}</h1>
            <p className={styles.chapterSub}>
              {assembled
                ? "Every hero has a story. This one starts with you."
                : hero.title}
            </p>
          </div>
          <div className={styles.chapterRail} aria-label="Jump to a letter">
            {heroes.map((h, index) => (
              <button
                key={h.letter}
                onClick={() => goToChapter(index)}
                aria-label={`Reveal ${h.letter} — ${h.name}`}
                aria-current={active === index && !assembled ? "step" : undefined}
              >
                <span>{h.letter}</span>
                <i />
              </button>
            ))}
          </div>
          <div className={styles.scrollHint}>
            <span>{assembled ? "ENTER THE WORLD" : "SCROLL TO SUMMON"}</span>
            <ArrowDown size={17} />
          </div>
          <div className={styles.stageFooter}>
            <span>AN UNOFFICIAL DOTA 2 CONCEPT</span>
            <a href="#dota-content">
              Skip intro <ArrowDown size={12} />
            </a>
            <span>
              {assembled ? "DOTA 2" : `${String(active + 1).padStart(2, "0")} — 05`}
            </span>
          </div>
          <div className={styles.progress} aria-hidden="true" />
        </div>
      </section>

      <section id="dota-content" className={styles.manifesto}>
        <WorldBackground />
        <div className={styles.sectionTop}>
          <p className={styles.eyebrow}>01 / THE WORLD</p>
          <span>STRATEGY. INSTINCT. IMMORTALITY.</span>
        </div>
        <div className={styles.manifestoGrid}>
          <h2>
            NOT JUST
            <br />A GAME.
            <br />
            <em>
              A WORLD
              <br />
              TO CONQUER.
            </em>
          </h2>
          <div className={styles.manifestoAside}>
            <AncientMark />
            <p>Two sides. Five heroes. One objective.</p>
            <p>
              From the first clash to the final stand, every decision leaves its mark.
              Find your hero. Forge your own way to the Ancient.
            </p>
            <a href="#heroes" className={styles.textLink}>
              Meet the collection <ArrowDown size={18} />
            </a>
            <span className={styles.demoNote}>CONCEPT PREVIEW / DEMO CONTENT</span>
          </div>
        </div>
      </section>

      <section id="heroes" className={styles.roster}>
        <div className={styles.sectionTop}>
          <p className={styles.eyebrow}>02 / THE HEROES</p>
          <span>CHOOSE YOUR NATURE</span>
        </div>
        <div className={styles.rosterHeading}>
          <h2>
            POWER HAS
            <br />
            <em>MANY FACES.</em>
          </h2>
          <span>
            THE FIRST FIVE
            <br />
            OF YOUR NEXT STORY.
          </span>
        </div>
        <div className={styles.rosterGrid}>
          <div
            className={styles.rosterList}
            role="tablist"
            aria-label="Explore the hero collection"
            aria-orientation="vertical"
          >
            {heroes.map((h, index) => (
              <button
                key={h.name}
                id={`hero-tab-${index}`}
                role="tab"
                aria-selected={selected === index}
                aria-controls="hero-panel"
                tabIndex={selected === index ? 0 : -1}
                onClick={() => setSelected(index)}
                onKeyDown={(event) => {
                  const direction =
                    event.key === "ArrowDown" ? 1 : event.key === "ArrowUp" ? -1 : 0;
                  if (direction || event.key === "Home" || event.key === "End") {
                    event.preventDefault();
                    const next =
                      event.key === "Home"
                        ? 0
                        : event.key === "End"
                          ? 4
                          : (selected + direction + 5) % 5;
                    setSelected(next);
                    document.getElementById(`hero-tab-${next}`)?.focus();
                  }
                }}
              >
                <span>0{index + 1}</span>
                <strong>{h.name}</strong>
                <ArrowUpRight size={22} />
              </button>
            ))}
          </div>
          <div
            id="hero-panel"
            role="tabpanel"
            aria-labelledby={`hero-tab-${selected}`}
            tabIndex={0}
            className={styles.heroPanel}
            style={
              {
                "--hero-color": rosterHero.color,
                "--hero-shade": rosterHero.shade,
                "--hero-glow": rosterHero.glow
              } as CSSProperties
            }
          >
            <Image
              key={rosterHero.image}
              src={`/images/dota/${rosterHero.image}.webp`}
              width={1440}
              height={1440}
              alt={`${rosterHero.name} from Dota 2`}
              sizes="(max-width: 700px) 100vw, 55vw"
            />
            <span className={styles.heroAttribute}>
              <Crosshair size={14} />
              {rosterHero.attribute}
            </span>
            <div className={styles.heroCaption}>
              <p>{rosterHero.role}</p>
              <h3>{rosterHero.quote}</h3>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.battle} id="the-battle">
        <p className={styles.eyebrow}>03 / THE NEXT CHAPTER</p>
        <span className={styles.battleRune} aria-hidden="true">
          II
        </span>
        <h2>
          THE ANCIENT
          <br />
          WON’T DEFEND
          <br />
          <em>ITSELF.</em>
        </h2>
        <p>
          Your next chapter belongs here.
          <br />A launch, a community, a new way to play.
        </p>
        <Link
          href="/start-project?package=landing-page&source=product-3d-launch&design=DOTA+2+Cinematic"
          className={styles.cta}
        >
          Build your own world <ArrowUpRight size={20} />
        </Link>
        <span className={styles.demoNote}>
          A LANDING PAGE CONCEPT BY GRIDSPELL STUDIO
        </span>
      </section>
      <footer className={styles.footer}>
        <a href="#dota-experience" className={styles.brand}>
          <AncientMark />
          <span>
            DOTA <b>2</b>
          </span>
        </a>
        <p>
          Independent fan concept. Dota 2 and hero artwork © Valve Corporation.
          <br />
          Not affiliated with or endorsed by Valve. Demo content only.
        </p>
        <a href="#dota-experience">
          Back to top <ChevronUp size={15} />
        </a>
      </footer>
    </main>
  );
}
