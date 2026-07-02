import { expect, test } from "@playwright/test";

const runtimeProblemPattern =
  /hydration failed|server rendered html didn't match|not an animatable value|reduced motion enabled/i;

for (const route of ["/", "/work", "/services", "/about", "/insights"]) {
  test(`${route} remains usable with reduced motion`, async ({ page }) => {
    const runtimeProblems: string[] = [];

    page.on("console", (message) => {
      if (runtimeProblemPattern.test(message.text())) {
        runtimeProblems.push(message.text());
      }
    });

    page.on("pageerror", (error) => {
      if (runtimeProblemPattern.test(error.message)) {
        runtimeProblems.push(error.message);
      }
    });

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(route, { waitUntil: "domcontentloaded" });
    await expect(page.locator("body")).toBeVisible();

    if (route === "/") {
      await expect(page.locator(".work-carousel-card video")).toHaveCount(0);
    }

    const reduced = await page.evaluate(
      () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );

    expect(reduced).toBe(true);
    expect(runtimeProblems).toEqual([]);
  });
}
