import { expect, test } from "@playwright/test";

for (const route of ["/", "/work", "/services", "/about", "/insights"]) {
  test(`${route} remains usable with reduced motion`, async ({ page }) => {
    const hydrationErrors: string[] = [];

    page.on("console", (message) => {
      if (
        message.type() === "error" &&
        /hydration failed|server rendered html didn't match/i.test(message.text())
      ) {
        hydrationErrors.push(message.text());
      }
    });

    page.on("pageerror", (error) => {
      if (/hydration failed|server rendered html didn't match/i.test(error.message)) {
        hydrationErrors.push(error.message);
      }
    });

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(route, { waitUntil: "domcontentloaded" });
    await expect(page.locator("body")).toBeVisible();

    const reduced = await page.evaluate(
      () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );

    expect(reduced).toBe(true);
    expect(hydrationErrors).toEqual([]);
  });
}
