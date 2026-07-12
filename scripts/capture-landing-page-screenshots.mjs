import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const baseUrl = (process.env.GALLERY_BASE_URL ?? "https://gridspellstudio.com").replace(/\/$/, "");
const outputDir = path.join(process.cwd(), "public", "landing-page-screenshots");
const slugs = [
  "contractor-pro",
  "saas-modern",
  "restaurant-local",
  "product-3d-launch",
  "luxury-real-estate",
  "dental-trust",
  "fitness-coach",
  "law-firm-classic",
  "beauty-booking",
  "creator-brand",
  "ecommerce-drop",
  "event-launch"
];

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  colorScheme: "dark",
  reducedMotion: "reduce"
});

for (const slug of slugs) {
  const page = await context.newPage();
  const url = `${baseUrl}/demo/${slug}`;

  console.log(`Capturing ${url}`);

  await page.goto(url, {
    waitUntil: "domcontentloaded",
    timeout: 120_000
  });

  await page.waitForTimeout(5_000);

  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);

    document.querySelectorAll("video").forEach((video) => {
      video.pause();
      try {
        video.currentTime = 0;
      } catch {
        // Some remote videos do not expose a seekable range immediately.
      }
    });

    document.querySelectorAll('a[href="/landing-pages"]').forEach((link) => {
      const style = window.getComputedStyle(link);
      const text = link.textContent?.toLowerCase() ?? "";
      if ((style.position === "fixed" || style.position === "sticky") && text.includes("gridspell")) {
        link.setAttribute("data-gallery-capture-hidden", "true");
        link.style.display = "none";
      }
    });
  });

  await page.screenshot({
    path: path.join(outputDir, `${slug}.jpg`),
    type: "jpeg",
    quality: 84,
    fullPage: false,
    animations: "disabled"
  });

  await page.close();
}

await browser.close();
console.log(`Saved ${slugs.length} screenshots to ${outputDir}`);
