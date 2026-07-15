import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const turnstileStub = `
  window.turnstile = {
    render: function (_container, options) {
      Promise.resolve().then(function () {
        if (options && options.callback) {
          options.callback("playwright-accessibility-token");
        }
      });
      return "playwright-widget";
    },
    reset: function () {},
    remove: function () {}
  };
`;

async function stubTurnstile(page: Page) {
  await page.route(
    "https://challenges.cloudflare.com/turnstile/v0/api.js**",
    async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/javascript",
        body: turnstileStub
      });
    }
  );
}

async function activateTurnstile(page: Page) {
  const verification = page.getByRole("group", {
    name: "Bot protection verification"
  });
  await verification.scrollIntoViewIfNeeded();
  await page
    .locator('[data-turnstile-wrapper="true"]')
    .dispatchEvent("pointerenter");
  return verification;
}

test("skip link reaches the main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");

  const skipLink = page.getByRole("link", { name: "Skip to main content" });
  await expect(skipLink).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});

test("navigation dialog traps focus and closes with Escape", async ({ page }) => {
  await page.goto("/");
  const menuButton = page.getByRole("button", { name: "Open navigation" });
  await menuButton.click();

  const dialog = page.getByRole("dialog", { name: "Main navigation" });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator("a,button").first()).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(menuButton).toBeFocused();
});

test("project form exposes validation errors accessibly", async ({ page }) => {
  await stubTurnstile(page);
  await page.goto("/start-project");
  await activateTurnstile(page);

  const turnstileToken = page.locator('input[name="turnstileToken"]');
  await expect(turnstileToken).toHaveValue("playwright-accessibility-token");

  await page.getByRole("button", { name: "Submit project brief" }).click();

  await expect(page.getByRole("alert").first()).toBeVisible();
  await expect(page.locator("input[name='name']")).toHaveAttribute(
    "aria-invalid",
    "true"
  );
  await expect(page.locator("input[name='name']")).toBeFocused();
});

test("project verification uses a valid named accessibility group", async ({ page }) => {
  await stubTurnstile(page);
  await page.goto("/start-project");

  const verification = await activateTurnstile(page);
  await expect(verification).toBeVisible();
  await expect(verification).toHaveAttribute("aria-labelledby", /turnstile-label-/);
  await expect(verification).toHaveAttribute("aria-describedby", /turnstile-description-/);

  const results = await new AxeBuilder({ page })
    .include("#project-brief")
    .withRules(["aria-allowed-attr", "aria-valid-attr", "aria-valid-attr-value"])
    .analyze();

  expect(results.violations).toEqual([]);
});

test("public homepage has no critical accessibility violations", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  const results = await new AxeBuilder({ page })
    .disableRules(["color-contrast"])
    .analyze();

  const serious = results.violations.filter((violation) =>
    ["critical", "serious"].includes(violation.impact ?? "")
  );

  expect(serious).toEqual([]);
});
