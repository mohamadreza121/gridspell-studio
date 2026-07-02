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

const runtimeProblemPattern =
  /hydration failed|server rendered html didn't match|not an animatable value/i;

const turnstileStub = `
  window.turnstile = {
    render: function (_container, options) {
      Promise.resolve().then(function () {
        if (options && options.callback) {
          options.callback("playwright-responsive-token");
        }
      });
      return "playwright-responsive-widget";
    },
    reset: function () {},
    remove: function () {}
  };
`;

test.describe("responsive marketing pages", () => {
  test.beforeEach(async ({ page }) => {
    await page.route(
      "https://challenges.cloudflare.com/turnstile/v0/api.js**",
      (route) =>
        route.fulfill({
          status: 200,
          contentType: "application/javascript",
          body: turnstileStub
        })
    );
  });

  for (const route of publicRoutes) {
    test(`${route} has no viewport overflow`, async ({ page }) => {
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

      await page.goto(route, { waitUntil: "domcontentloaded" });
      await expect(page.locator("body")).toBeVisible();
      await page.waitForTimeout(250);

      const dimensions = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth
      }));

      expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 2);
      expect(runtimeProblems).toEqual([]);
    });
  }
});
