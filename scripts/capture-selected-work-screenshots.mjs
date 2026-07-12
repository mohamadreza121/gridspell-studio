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
    waitForPreloader: true
  },
  {
    slug: "gridspell-studio",
    url: "https://gridspellstudio.com/",
    desktopFileName: "gridspell-studio-v3.jpg",
    waitForGridspellHero: true
  }
];

const devices = [
  {
    id: "desktop",
    width: 1600,
    height: 900,
    suffix: "",
    deviceScaleFactor: 1
  },
  {
    id: "tablet",
    width: 1024,
    height: 768,
    suffix: "-tablet",
    deviceScaleFactor: 1
  },
  {
    id: "mobile",
    width: 430,
    height: 932,
    suffix: "-mobile",
    deviceScaleFactor: 1
  },
  {
    id: "small-phone",
    width: 360,
    height: 800,
    suffix: "-small-phone",
    deviceScaleFactor: 1
  }
];

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true });

async function waitForPreloader(page) {
  try {
    await page.waitForFunction(
      () => {
        const isVisible = (element) => {
          if (!(element instanceof HTMLElement)) return false;
          const style = window.getComputedStyle(element);
          if (style.display === "none" || style.visibility === "hidden") return false;
          if (Number.parseFloat(style.opacity || "1") <= 0.04) return false;
          const rect = element.getBoundingClientRect();
          return rect.width > 1 && rect.height > 1;
        };

        const explicitLoaders = Array.from(
          document.querySelectorAll(
            '[class*="preload" i], [class*="loader" i], [class*="loading" i], [id*="preload" i], [id*="loader" i], [id*="loading" i]'
          )
        ).filter(isVisible);

        if (explicitLoaders.length > 0) return false;

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const blockingOverlay = Array.from(document.body.querySelectorAll("*")).some(
          (element) => {
            if (!(element instanceof HTMLElement)) return false;
            if (element.tagName === "CANVAS" || element.tagName === "VIDEO") return false;

            const style = window.getComputedStyle(element);
            if (style.position !== "fixed" || !isVisible(element)) return false;

            const zIndex = Number.parseInt(style.zIndex || "0", 10);
            if (!Number.isFinite(zIndex) || zIndex < 20) return false;

            const rect = element.getBoundingClientRect();
            return (
              rect.width >= viewportWidth * 0.78 &&
              rect.height >= viewportHeight * 0.78
            );
          }
        );

        return !blockingOverlay && document.querySelectorAll("main, section").length > 0;
      },
      undefined,
      { timeout: 20_000 }
    );
  } catch {
    // Continue after the extended settle delay for unusual loader implementations.
  }
}

async function waitForGridspellDesktopHero(page) {
  await page.emulateMedia({ reducedMotion: "no-preference" });

  await page.addStyleTag({
    content: `
      .home-presentation-only { display: block !important; }
      .home-static-only { display: none !important; }
    `
  });

  await page.evaluate(() => {
    window.scrollTo(0, 0);
    window.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
  });

  const desktopHero = page.locator(
    ".home-presentation-only .home-presentation-track > .sticky"
  );

  await desktopHero.waitFor({ state: "visible", timeout: 30_000 });

  await page.waitForFunction(
    () => {
      const desktop = document.querySelector(".home-presentation-only");
      if (!(desktop instanceof HTMLElement)) return false;
      if (window.getComputedStyle(desktop).display === "none") return false;

      const host = desktop.querySelector(
        '.home-hero-mode-host[data-hero-mode-ready="true"]'
      );
      if (!(host instanceof HTMLElement)) return false;

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
    { timeout: 30_000 }
  );

  await page.waitForTimeout(1_500);
  return desktopHero;
}

async function freezePage(page) {
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

  await page.waitForTimeout(900);
}

for (const project of projects) {
  for (const device of devices) {
    const context = await browser.newContext({
      viewport: { width: device.width, height: device.height },
      deviceScaleFactor: device.deviceScaleFactor,
      colorScheme: "dark",
      reducedMotion: "no-preference",
      isMobile: device.id === "mobile" || device.id === "small-phone",
      hasTouch: device.id !== "desktop"
    });

    const page = await context.newPage();
    console.log(`Capturing ${project.slug} at ${device.width}x${device.height}`);

    await page.goto(project.url, {
      waitUntil: "domcontentloaded",
      timeout: 120_000
    });

    try {
      await page.waitForLoadState("networkidle", { timeout: 15_000 });
    } catch {
      // Some production sites keep analytics or media requests open.
    }

    let gridspellHero = null;

    if (project.waitForGridspellHero && device.id === "desktop") {
      gridspellHero = await waitForGridspellDesktopHero(page);
    } else {
      await page.waitForTimeout(project.settleDelayMs ?? 6_000);
      if (project.waitForPreloader) {
        await waitForPreloader(page);
      }
    }

    await freezePage(page);

    const outputName =
      device.id === "desktop" && project.desktopFileName
        ? project.desktopFileName
        : `${project.slug}${device.suffix}.jpg`;

    const screenshotOptions = {
      path: path.join(outputDir, outputName),
      type: "jpeg",
      quality: 88,
      animations: "disabled"
    };

    if (gridspellHero) {
      await gridspellHero.screenshot(screenshotOptions);
    } else {
      await page.screenshot({
        ...screenshotOptions,
        fullPage: false
      });
    }

    await context.close();
  }
}

await browser.close();
console.log(
  `Saved ${projects.length * devices.length} selected-work screenshots to ${outputDir}`
);
