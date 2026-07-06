import { chromium } from "@playwright/test";

const browser = await chromium.launch({
  headless: true
});

const context = await browser.newContext({
  viewport: { width: 320, height: 568 },
  screen: { width: 320, height: 568 },
  deviceScaleFactor: 1,
  isMobile: true,
  hasTouch: true,
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/14E5239e Safari/602.1"
});

const page = await context.newPage();

await page.goto("https://gridspellstudio.com/", {
  waitUntil: "networkidle"
});

const size = await page.evaluate(() => ({
  innerWidth: window.innerWidth,
  innerHeight: window.innerHeight,
  visualWidth: window.visualViewport?.width,
  visualHeight: window.visualViewport?.height,
  userAgent: navigator.userAgent
}));

console.log("REAL VIEWPORT:", size);

const shots = [
  ["top", 0],
  ["scroll-450", 450],
  ["scroll-900", 900],
  ["scroll-1400", 1400],
  ["scroll-2000", 2000]
];

for (const [name, y] of shots) {
  await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
  await page.waitForTimeout(600);

  await page.screenshot({
    path: `screenshots/iphone5-${name}.png`,
    fullPage: false
  });
}

await browser.close();
