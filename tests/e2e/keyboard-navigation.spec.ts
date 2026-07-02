import { expect, test, type Page } from "@playwright/test";

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[contenteditable="true"]',
  '[tabindex]:not([tabindex="-1"])'
].join(",");

function getMenuButton(page: Page) {
  return page.locator('button[aria-controls="gridspell-menu"]');
}

test.describe("keyboard navigation", () => {
  test("skip link moves focus to the main content", async ({ page }) => {
    await page.goto("/");

    await page.keyboard.press("Tab");

    const skipLink = page.getByRole("link", {
      name: "Skip to main content"
    });

    await expect(skipLink).toBeFocused();

    await page.keyboard.press("Enter");

    await expect(page.locator("#main-content")).toBeFocused();
  });

  test("navigation opens with focus on the first action", async ({ page }) => {
    await page.goto("/");

    const menuButton = getMenuButton(page);

    await menuButton.focus();
    await page.keyboard.press("Enter");

    const dialog = page.getByRole("dialog", {
      name: "Main navigation"
    });
    const firstElement = dialog.locator(focusableSelector).first();

    await expect(dialog).toBeVisible();
    await expect(firstElement).toBeFocused();
    await expect(menuButton).toHaveAttribute("aria-expanded", "true");
    await expect(menuButton).toHaveAttribute("aria-label", "Close navigation");
  });

  test("navigation traps focus in both directions", async ({ page }) => {
    await page.goto("/");

    const menuButton = getMenuButton(page);

    await menuButton.focus();
    await page.keyboard.press("Enter");

    const dialog = page.getByRole("dialog", {
      name: "Main navigation"
    });
    const focusableElements = dialog.locator(focusableSelector);
    const firstElement = focusableElements.first();
    const lastElement = focusableElements.last();

    await expect(firstElement).toBeFocused();
    await expect(lastElement).toBeVisible();

    await page.keyboard.press("Shift+Tab");
    await expect(lastElement).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(firstElement).toBeFocused();

    const focusRemainsInside = await dialog.evaluate(
      (element) => element.contains(document.activeElement)
    );

    expect(focusRemainsInside).toBe(true);
  });

  test("Escape closes navigation and restores trigger focus", async ({ page }) => {
    await page.goto("/");

    const menuButton = getMenuButton(page);

    await menuButton.focus();
    await page.keyboard.press("Enter");

    const dialog = page.getByRole("dialog", {
      name: "Main navigation"
    });

    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");

    await expect(dialog).toBeHidden();
    await expect(menuButton).toBeFocused();
    await expect(menuButton).toHaveAttribute("aria-expanded", "false");
    await expect(menuButton).toHaveAttribute("aria-label", "Open navigation");
  });

  test("a navigation link can be activated without a mouse", async ({ page }) => {
    await page.goto("/");

    const menuButton = getMenuButton(page);

    await menuButton.focus();
    await page.keyboard.press("Enter");

    const dialog = page.getByRole("dialog", {
      name: "Main navigation"
    });
    const firstLink = dialog.locator("a[href]").first();

    await expect(firstLink).toBeFocused();

    const href = await firstLink.getAttribute("href");
    expect(href).toBeTruthy();

    await page.keyboard.press("Enter");
    await expect(dialog).toBeHidden();
  });
});
