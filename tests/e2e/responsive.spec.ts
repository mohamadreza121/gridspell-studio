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
    test(`${route} fits the viewport without runtime rendering errors`, async ({
      page
    }, testInfo) => {
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

      await page.goto(route, {
        waitUntil: "domcontentloaded"
      });

      await expect(page.locator("body")).toBeVisible();
      await page.waitForTimeout(250);

      if (
        testInfo.project.name === "small-phone-chromium" &&
        route === "/"
      ) {
        const tinyMenuButton = page.locator(
          'label[for="tiny-phone-nav-toggle"].tiny-phone-nav__button'
        );

        const tinyMenuToggle = page.locator("#tiny-phone-nav-toggle");
        const tinyMenuPanel = page.locator(".tiny-phone-nav__panel");
        const tinyMenuClose = page.locator(
          'label[for="tiny-phone-nav-toggle"].tiny-phone-nav__close'
        );

        await expect(tinyMenuButton).toBeVisible();

        await tinyMenuButton.click();
        await expect(tinyMenuToggle).toBeChecked();
        await expect(tinyMenuPanel).toBeVisible();

        await expect(
          tinyMenuPanel.getByRole("link", {
            name: /Start a project/i
          })
        ).toBeVisible();

        await expect(
          tinyMenuPanel.getByRole("link", {
            name: /Client login/i
          })
        ).toBeVisible();

        await expect(
          tinyMenuPanel.getByRole("link", {
            name: /hello@gridspellstudio\.com/i
          })
        ).toBeVisible();

        await tinyMenuClose.click();
        await expect(tinyMenuToggle).not.toBeChecked();
        await expect(tinyMenuPanel).toBeHidden();
      }

      if (
        testInfo.project.name === "small-phone-chromium" &&
        route === "/pricing"
      ) {
        await expect(
          page.getByRole("heading", {
            level: 1,
            name: /Choose a starting point/i
          })
        ).toBeVisible();
      }

      const dimensions = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth
      }));

      expect(
        dimensions.scrollWidth,
        `${route} is wider than the browser viewport`
      ).toBeLessThanOrEqual(dimensions.clientWidth + 2);

      expect(
        runtimeProblems,
        `${route} logged a hydration or Motion rendering error`
      ).toEqual([]);
    });
  }
});
