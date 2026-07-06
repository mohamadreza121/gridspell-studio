import { chromium, devices } from "@playwright/test";

const browser = await chromium.launch();
const context = await browser.newContext({
  ...devices["iPhone 5"],
  deviceScaleFactor: 2
});

const page = await context.newPage();
await page.goto("https://gridspellstudio.com/", { waitUntil: "networkidle" });

await page.screenshot({
  path: "screenshots/iphone5-home-top.png",
  fullPage: false
});

await page.evaluate(() => window.scrollTo(0, 500));
await page.waitForTimeout(500);
await page.screenshot({
  path: "screenshots/iphone5-home-scroll-500.png",
  fullPage: false
});

await page.evaluate(() => window.scrollTo(0, 1000));
await page.waitForTimeout(500);
await page.screenshot({
  path: "screenshots/iphone5-home-scroll-1000.png",
  fullPage: false
});

await page.evaluate(() => window.scrollTo(0, 1600));
await page.waitForTimeout(500);
await page.screenshot({
  path: "screenshots/iphone5-home-scroll-1600.png",
  fullPage: false
});

await browser.close();
