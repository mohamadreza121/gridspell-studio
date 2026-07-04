import { expect, test, type Page } from "@playwright/test";

const publicRoutes = [
  "/",
  "/work",
  "/work/desa-foam-insulation",
  "/work/gridspell-studio",
  "/work/network-engineering-portfolio",
  "/services",
  "/services/business-websites",
  "/services/website-redesign",
  "/services/landing-pages",
  "/services/client-portals",
  "/services/full-stack-apps",
  "/services/care-plans",
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

function isSmallPhoneProject(projectName: string) {
  return projectName === "small-phone-chromium";
}

async function expectHomepageProofContent(page: Page) {
  await expect(
    page.getByRole("heading", {
      name: /Real proof, not just polish/i
    })
  ).toBeVisible();

  await expect(
    page.getByRole("heading", {
      name: /More than a pretty homepage/i
    })
  ).toBeVisible();

  await expect(page.getByRole("heading", { name: /DESA Foam Insulation/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /GridSpell Studio/i })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /Network Engineering Portfolio/i })
  ).toBeVisible();
}

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

      if (route === "/") {
        await expectHomepageProofContent(page);

        await expect(
          page.locator(".small-phone-home-pricing, .small-phone-home-pricing-only")
        ).toHaveCount(0);
      }

      if (route.startsWith("/services/")) {
        await expect(page.getByText(/Why it matters/i)).toBeVisible();
        await expect(page.getByText(/Outcomes/i)).toBeVisible();
        await expect(page.getByText(/Core deliverables/i)).toBeVisible();
      }

      if (isSmallPhoneProject(testInfo.project.name) && route === "/") {
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

      if (isSmallPhoneProject(testInfo.project.name) && route === "/pricing") {
        await expect(
          page.getByRole("heading", {
            level: 1,
            name: /Choose a starting point/i
          })
        ).toBeVisible();
      }

      if (route === "/work/gridspell-studio") {
        await expect(
          page.getByRole("heading", {
            level: 1,
            name: /GridSpell Studio/i
          })
        ).toBeVisible();

        await expect(
          page.getByText(/studio website that proves the offer/i)
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
