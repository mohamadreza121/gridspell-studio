import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const outputDir = path.join(process.cwd(), "public", "images", "services", "mobile");

const baseUrl = process.env.SERVICE_CAPTURE_BASE_URL ?? "https://gridspellstudio.com";

const services = [
  {
    slug: "business-websites",
    title: "Business Website Design & Development"
  },
  {
    slug: "website-redesign",
    title: "Strategic Website Redesign"
  },
  {
    slug: "landing-pages",
    title: "Campaign & Landing Pages"
  },
  {
    slug: "client-portals",
    title: "Client Portals & Dashboards"
  },
  {
    slug: "full-stack-apps",
    title: "Custom Full-Stack Web Applications"
  },
  {
    slug: "care-plans",
    title: "Website Care & Growth"
  }
];

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1600, height: 1000 },
  deviceScaleFactor: 1,
  colorScheme: "dark",
  reducedMotion: "no-preference"
});
const page = await context.newPage();

await page.goto(`${baseUrl}/services`, {
  waitUntil: "networkidle",
  timeout: 60_000
});

await page.locator('[data-service-visual="business-websites"]').waitFor({
  state: "attached",
  timeout: 30_000
});

await page.evaluate(() => document.fonts.ready);

for (const service of services) {
  const chapter = page.locator(`[data-service-chapter="${service.slug}"]`);

  await page.getByRole("button", { name: `Show ${service.title}`, exact: true }).click();

  await page.waitForFunction(
    (slug) =>
      document
        .querySelector(`[data-service-chapter="${slug}"]`)
        ?.getAttribute("data-active") === "true",
    service.slug,
    { timeout: 15_000 }
  );

  await page.waitForTimeout(1_100);

  const screenshot = await chapter
    .locator(`[data-service-visual="${service.slug}"]`)
    .screenshot({
      type: "jpeg",
      quality: 90,
      animations: "disabled"
    });

  await sharp(screenshot)
    .webp({ quality: 82 })
    .toFile(path.join(outputDir, `${service.slug}.webp`));
}

await context.close();
await browser.close();

console.log(`Saved ${services.length} service visual renders to ${outputDir}`);
