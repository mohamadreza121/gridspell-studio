import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const outputDir = path.join(
  process.cwd(),
  "public",
  "images",
  "work",
  "selected-work"
);

const projects = [
  {
    slug: "landing-page-gallery",
    url: "https://gridspellstudio.com/work/landing-page-gallery"
  },
  {
    slug: "desa-foam-insulation",
    url: "https://desafoaminsulation.com/"
  },
  {
    slug: "network-engineering-portfolio",
    url: "https://portfolio-demo1-psi.vercel.app/",
    settleDelayMs: 10_000,
    postFreezeDelayMs: 1_800,
    waitForPreloader: true
  },
  {
    slug: "gridspell-studio",
    url: "https://gridspellstudio.com/",
    fileName: "gridspell-studio-v3.jpg",
    reducedMotion: "no-preference",
    waitForGridspellHero: true,
    postFreezeDelayMs: 1_200
  }
];

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1600, height: 900 },
  deviceScaleFactor: 1,
  colorScheme: "dark",
  reducedMotion: "no-preference"
});

for (const project of projects) {
  const page = await context.newPage();

  if (project.reducedMotion) {
    await page.emulateMedia({
      reducedMotion: project.reducedMotion
    });
  }

  console.log(`Capturing ${project.url}`);

  await page.goto(project.url, {
    waitUntil: "domcontentloaded",
    timeout: 120_000
  });

  try {
    await page.waitForLoadState("networkidle", { timeout: 15_000 });
  } catch {
    // Some sites keep analytics or media requests open after the page is visually ready.
  }

  // Let entrance sequences finish before freezing animation. Freezing first can leave
  // loader overlays permanently visible on sites with animated preloaders.
if (project.waitForGridspellHero) {
  await page.emulateMedia({
    reducedMotion: "no-preference"
  });

  // Force the real pinned desktop homepage and hide the duplicate static layout.
  await page.addStyleTag({
    content: `
      .home-presentation-only {
        display: block !important;
      }

      .home-static-only {
        display: none !important;
      }
    `
  });

  await page.evaluate(() => {
    window.scrollTo(0, 0);

    // Starts GridSpell's lazily hydrated hero immediately.
    window.dispatchEvent(
      new PointerEvent("pointerdown", {
        bubbles: true
      })
    );
  });

  const desktopHero = page.locator(
    ".home-presentation-only .home-presentation-track > .sticky"
  );

  await desktopHero.waitFor({
    state: "visible",
    timeout: 30_000
  });

  await page.waitForFunction(
    () => {
      const desktop = document.querySelector(
        ".home-presentation-only"
      );

      if (!(desktop instanceof HTMLElement)) {
        return false;
      }

      const desktopStyle = window.getComputedStyle(desktop);

      if (desktopStyle.display === "none") {
        return false;
      }

      const host = desktop.querySelector(
        '.home-hero-mode-host[data-hero-mode-ready="true"]'
      );

      if (!(host instanceof HTMLElement)) {
        return false;
      }

      const style = window.getComputedStyle(host);
      const rect = host.getBoundingClientRect();

      return (
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        Number.parseFloat(style.opacity || "1") > 0.9 &&
        rect.width > 300 &&
        rect.height > 180 &&
        rect.top >= 0 &&
        rect.bottom <= window.innerHeight + 20
      );
    },
    undefined,
    {
      timeout: 30_000
    }
  );

  await page.waitForTimeout(1_500);
  } else {
    await page.waitForTimeout(project.settleDelayMs ?? 6_000);

    if (project.waitForPreloader) {
      try {
        await page.waitForFunction(
          () => {
            const isVisible = (element) => {
              if (!(element instanceof HTMLElement)) return false;

              const style = window.getComputedStyle(element);

              if (
                style.display === "none" ||
                style.visibility === "hidden"
              ) {
                return false;
              }

              if (Number.parseFloat(style.opacity || "1") <= 0.04) {
                return false;
              }

              const rect = element.getBoundingClientRect();

              return rect.width > 1 && rect.height > 1;
            };

            const explicitLoaders = Array.from(
              document.querySelectorAll(
                '[class*="preload" i], ' +
                  '[class*="loader" i], ' +
                  '[class*="loading" i], ' +
                  '[id*="preload" i], ' +
                  '[id*="loader" i], ' +
                  '[id*="loading" i]'
              )
            ).filter(isVisible);

            if (explicitLoaders.length > 0) return false;

            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            const blockingOverlay = Array.from(
              document.body.querySelectorAll("*")
            )
              .filter((element) => element instanceof HTMLElement)
              .some((element) => {
                if (
                  element.tagName === "CANVAS" ||
                  element.tagName === "VIDEO"
                ) {
                  return false;
                }

                const style = window.getComputedStyle(element);

                if (style.position !== "fixed") return false;
                if (!isVisible(element)) return false;

                const zIndex = Number.parseInt(
                  style.zIndex || "0",
                  10
                );

                if (!Number.isFinite(zIndex) || zIndex < 20) {
                  return false;
                }

                const rect = element.getBoundingClientRect();

                return (
                  rect.width >= viewportWidth * 0.78 &&
                  rect.height >= viewportHeight * 0.78
                );
              });

            return (
              !blockingOverlay &&
              document.querySelectorAll("main, section").length > 0
            );
          },
          undefined,
          { timeout: 18_000 }
        );
      } catch {
        // Continue after the normal settle delay.
      }
    }
  }

  await page.addStyleTag({
    content: `
      html { scroll-behavior: auto !important; }
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        caret-color: transparent !important;
      }
    `
  });

  await page.evaluate(() => {
    window.scrollTo(0, 0);

    document.querySelectorAll("video").forEach((video) => {
      video.pause();
      try {
        video.currentTime = 0;
      } catch {
        // Some remote videos are not seekable immediately.
      }
    });

    document.getAnimations().forEach((animation) => animation.pause());
  });

  await page.waitForTimeout(project.postFreezeDelayMs ?? 750);

  const outputName =
    project.fileName ?? `${project.slug}.jpg`;

  if (project.waitForGridspellHero) {
    const desktopHero = page.locator(
      ".home-presentation-only .home-presentation-track > .sticky"
    );

    await desktopHero.screenshot({
      path: path.join(outputDir, outputName),
      type: "jpeg",
      quality: 88,
      animations: "disabled"
    });
  } else {
    await page.screenshot({
      path: path.join(outputDir, outputName),
      type: "jpeg",
      quality: 88,
      fullPage: false,
      animations: "disabled"
    });
  }

  await page.close();
}

await browser.close();
console.log(`Saved ${projects.length} selected-work screenshots to ${outputDir}`);
