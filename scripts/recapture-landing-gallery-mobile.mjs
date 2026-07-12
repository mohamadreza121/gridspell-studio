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

const url = "https://gridspellstudio.com/work/landing-page-gallery";
const devices = [
  { id: "mobile", width: 430, height: 932, file: "landing-page-gallery-mobile-v3.jpg" },
  { id: "small-phone", width: 360, height: 800, file: "landing-page-gallery-small-phone-v3.jpg" }
];

await mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({ headless: true });

async function waitForStyledGallery(page) {
  await page.waitForLoadState("domcontentloaded");

  try {
    await page.waitForLoadState("networkidle", { timeout: 20_000 });
  } catch {
    // Analytics and image services can keep the network open.
  }

  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;

    const images = Array.from(document.images).filter((image) => {
      const rect = image.getBoundingClientRect();
      return rect.top < window.innerHeight * 1.5;
    });

    await Promise.all(
      images.map(async (image) => {
        if (image.complete && image.naturalWidth > 0) {
          try {
            await image.decode();
          } catch {
            // A decoded image is preferred, but a loaded image is enough.
          }
          return;
        }

        await new Promise((resolve) => {
          const done = () => resolve(undefined);
          image.addEventListener("load", done, { once: true });
          image.addEventListener("error", done, { once: true });
          setTimeout(done, 8_000);
        });
      })
    );
  });

  await page.waitForFunction(
    () => {
      const stylesheets = Array.from(document.styleSheets);
      const hasLoadedStyles = stylesheets.some((sheet) => {
        try {
          return Boolean(sheet.cssRules && sheet.cssRules.length > 20);
        } catch {
          return Boolean(sheet.href);
        }
      });

      const main = document.querySelector("main");
      const heroHeading = Array.from(document.querySelectorAll("h1, h2")).find((heading) =>
        /gallery|design|sales/i.test(heading.textContent || "")
      );

      if (!(main instanceof HTMLElement) || !(heroHeading instanceof HTMLElement)) return false;

      const mainStyle = getComputedStyle(main);
      const headingStyle = getComputedStyle(heroHeading);
      const mainRect = main.getBoundingClientRect();
      const headingRect = heroHeading.getBoundingClientRect();
      const bodyWidth = document.documentElement.scrollWidth;

      return (
        hasLoadedStyles &&
        mainRect.width >= window.innerWidth * 0.9 &&
        headingRect.width > 180 &&
        headingRect.height > 40 &&
        Number.parseFloat(headingStyle.fontSize) >= 32 &&
        mainStyle.display !== "inline" &&
        bodyWidth <= window.innerWidth + 4
      );
    },
    undefined,
    { timeout: 30_000 }
  );

  await page.waitForTimeout(2_000);
}

async function preparePage(page) {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 120_000 });

  try {
    await waitForStyledGallery(page);
  } catch {
    await page.reload({ waitUntil: "domcontentloaded", timeout: 120_000 });
    await waitForStyledGallery(page);
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
    document.getAnimations().forEach((animation) => animation.pause());
  });

  await page.waitForTimeout(750);
}

for (const device of devices) {
  const context = await browser.newContext({
    viewport: { width: device.width, height: device.height },
    deviceScaleFactor: 1,
    colorScheme: "dark",
    reducedMotion: "no-preference",
    isMobile: true,
    hasTouch: true
  });

  const page = await context.newPage();
  console.log(`Recapturing landing-page-gallery at ${device.width}x${device.height}`);

  await preparePage(page);

  await page.screenshot({
    path: path.join(outputDir, device.file),
    type: "jpeg",
    quality: 90,
    animations: "disabled",
    fullPage: false
  });

  await context.close();
}

await browser.close();
console.log("Saved corrected Landing Page Gallery phone screenshots.");
