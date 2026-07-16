import { expect, test } from "@playwright/test";

test("desktop navigation runtime stays out of the initial start-project load", async ({
  page
}) => {
  const scriptUrls = new Set<string>();

  page.on("response", (response) => {
    const url = response.url();
    if (url.includes("/_next/static/chunks/") && url.endsWith(".js")) {
      scriptUrls.add(url);
    }
  });

  await page.goto("/start-project", { waitUntil: "networkidle" });

  const initialScriptCount = scriptUrls.size;
  const menuButton = page.getByRole("button", { name: "Open navigation" });

  await expect(menuButton).toBeVisible();
  await expect(page.getByRole("dialog", { name: "Main navigation" })).toHaveCount(0);

  await menuButton.click();

  await expect(page.getByRole("dialog", { name: "Main navigation" })).toBeVisible();
  await expect.poll(() => scriptUrls.size).toBeGreaterThan(initialScriptCount);
});
