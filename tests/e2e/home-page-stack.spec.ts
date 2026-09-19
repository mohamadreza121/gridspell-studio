import { expect, test } from "@playwright/test";

const stackSelector = "[data-home-page-stack]";
const panelSelector = "[data-stack-panel]";

test("three pages stack only after their full content has scrolled", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const stack = page.locator(stackSelector);
  await expect(stack).toHaveAttribute("data-stack-active", "true");
  const panels = stack.locator(panelSelector);
  await expect(panels).toHaveCount(3);
  await expect(panels.nth(0)).toHaveAttribute("data-stack-panel", "design-anatomy");
  await expect(panels.nth(1)).toHaveAttribute("data-stack-panel", "build-proof");
  await expect(panels.nth(2)).toHaveAttribute("data-stack-panel", "faq");
  // Resolve the preceding homepage scenes' lazy layout before measuring.
  await stack.scrollIntoViewIfNeeded();
  const geometry = await stack.evaluate((root) => ({
    start: root.getBoundingClientRect().top + window.scrollY,
    heights: Array.from(root.children).map(
      (panel) => (panel as HTMLElement).offsetHeight
    ),
    viewport: window.innerHeight
  }));
  let start = geometry.start;
  for (let index = 0; index < 2; index++) {
    const height = geometry.heights[index];
    // At the end of each tall page its bottom remains readable, then the next
    // sheet overlaps it. No fixed-height crop or nested scrolling is involved.
    await page.evaluate(
      (top) => window.scrollTo(0, top),
      start + height - geometry.viewport * 0.65
    );
    await expect
      .poll(async () =>
        panels.nth(index).evaluate((panel) => {
          const surface = panel.firstElementChild as HTMLElement;
          return Number(surface.style.getPropertyValue("--stack-scale"));
        })
      )
      .toBeLessThan(1);
    const bounds = await panels.nth(index).boundingBox();
    const nextBounds = await panels.nth(index + 1).boundingBox();
    expect(bounds).not.toBeNull();
    expect(nextBounds!.y).toBeGreaterThan(0);
    expect(nextBounds!.y).toBeLessThan(geometry.viewport);
    expect(bounds!.y + bounds!.height).toBeGreaterThan(nextBounds!.y);
    await expect(panels.nth(index)).toHaveCSS("position", "sticky");
    start += height;
  }
  await expect(panels.last()).toHaveCSS("position", "relative");
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)
  ).toBe(true);
  await page
    .locator("body > footer, #primary-content + footer")
    .last()
    .scrollIntoViewIfNeeded();
  await expect(
    page.getByText("Have a serious idea?", { exact: false }).last()
  ).toBeVisible();
});

test("FAQ remains interactive and keyboard focus can return to a covered page", async ({
  page
}) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const stack = page.locator(stackSelector);
  await expect(stack).toHaveAttribute("data-stack-active", "true");
  const faq = stack.locator('[data-stack-panel="faq"]');
  const question = faq.getByRole("button", { name: /What does GridSpell build/ });
  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "true");
  await expect(faq.getByText(/GridSpell builds premium websites/)).toBeVisible();
  const previousScroll = await page.evaluate(() => scrollY);
  const visitor = stack.getByRole("button", { name: "Visitor view", exact: true });
  await visitor.focus();
  await expect(visitor).toBeFocused();
  expect(await page.evaluate(() => scrollY)).toBeLessThan(previousScroll);
  await visitor.press("Enter");
  await expect(visitor).toHaveAttribute("aria-pressed", "true");
});

test("reduced motion restores ordinary flow, including preference changes", async ({
  page
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const panels = page.locator(panelSelector);
  await expect(panels).toHaveCount(3);
  for (const panel of await panels.all()) {
    await expect(panel).toHaveCSS("position", "relative");
    await expect(panel.locator(":scope > div")).toHaveCSS("transform", "none");
  }
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator(stackSelector)).toHaveAttribute("data-stack-active", "true");
  await expect(panels.first()).toHaveCSS("position", "sticky");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(panels.first()).toHaveCSS("position", "relative");
});
