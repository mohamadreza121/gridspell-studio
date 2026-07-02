import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

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
  await page.route(
    "https://challenges.cloudflare.com/turnstile/v0/api.js**",
    async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/javascript",
        body: `
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
        `
      });
    }
  );

  await page.goto("/start-project");

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
