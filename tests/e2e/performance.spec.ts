import { expect, test } from "@playwright/test";

test.describe.configure({ mode: "serial" });

for (const route of ["/", "/work", "/services", "/insights", "/start-project"]) {
  test(`${route} loads without failed first-party requests`, async ({ page }) => {
    const failures: string[] = [];

    page.on("requestfailed", (request) => {
      const url = new URL(request.url());
      if (url.hostname === "127.0.0.1" || url.hostname === "localhost") {
        failures.push(`${request.method()} ${url.pathname}`);
      }
    });

    await page.goto(route, { waitUntil: "networkidle" });

    const timing = await page.evaluate(() => {
      const navigation = performance.getEntriesByType("navigation")[0] as
        | PerformanceNavigationTiming
        | undefined;

      return navigation
        ? {
            domContentLoaded: navigation.domContentLoadedEventEnd - navigation.startTime,
            load: navigation.loadEventEnd - navigation.startTime
          }
        : null;
    });

    expect(failures).toEqual([]);
    expect(timing).not.toBeNull();
    expect(timing?.domContentLoaded ?? 0).toBeLessThan(15_000);
  });
}
