import { expect, test } from "@playwright/test";

for (const route of ["/", "/work", "/services", "/about", "/insights"]) {
  test(`${route} remains usable with reduced motion`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(route, { waitUntil: "domcontentloaded" });
    await expect(page.locator("body")).toBeVisible();

    const reduced = await page.evaluate(
      () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
    expect(reduced).toBe(true);
  });
}
