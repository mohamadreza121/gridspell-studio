import { expect, test } from "@playwright/test";

const publicRoutes = [
  "/",
  "/work",
  "/services",
  "/process",
  "/pricing",
  "/about",
  "/insights",
  "/contact",
  "/start-project",
  "/privacy",
  "/terms"
];

test.describe("responsive marketing pages", () => {
  for (const route of publicRoutes) {
    test(`${route} has no viewport overflow`, async ({ page }) => {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await expect(page.locator("body")).toBeVisible();

      const dimensions = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth
      }));

      expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 2);
    });
  }
});
