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
    url: "https://portfolio-demo1-psi.vercel.app/"
  },
  {
    slug: "gridspell-studio",
    url: "https://gridspellstudio.com/"
  }
];

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1600, height: 900 },
  deviceScaleFactor: 1,
  colorScheme: "dark",
  reducedMotion: "reduce"
});

for (const project of projects) {
  const page = await context.newPage();
  console.log(`Capturing ${project.url}`);

  await page.goto(project.url, {
    waitUntil: "domcontentloaded",
    timeout: 120_000
  });

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

  await page.waitForTimeout(6_000);

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

  await page.waitForTimeout(750);

  await page.screenshot({
    path: path.join(outputDir, `${project.slug}.jpg`),
    type: "jpeg",
    quality: 88,
    fullPage: false,
    animations: "disabled"
  });

  await page.close();
}

await browser.close();
console.log(`Saved ${projects.length} selected-work screenshots to ${outputDir}`);
