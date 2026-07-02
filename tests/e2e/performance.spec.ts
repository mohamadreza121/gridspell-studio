import { expect, test } from "@playwright/test";

test.describe.configure({ mode: "serial" });

function isFirstParty(url: URL) {
  return url.hostname === "127.0.0.1" || url.hostname === "localhost";
}

function isExpectedMediaCancellation(resourceType: string, errorText: string) {
  return (
    resourceType === "media" &&
    /abort|cancel/i.test(errorText)
  );
}

for (const route of ["/", "/work", "/services", "/insights", "/start-project"]) {
  test(`${route} loads without failed first-party requests`, async ({ page }) => {
    const failures = new Set<string>();

    page.on("requestfailed", (request) => {
      const url = new URL(request.url());

      if (!isFirstParty(url)) {
        return;
      }

      const errorText = request.failure()?.errorText ?? "unknown request failure";

      if (isExpectedMediaCancellation(request.resourceType(), errorText)) {
        return;
      }

      failures.add(`${request.method()} ${url.pathname} (${errorText})`);
    });

    page.on("response", (response) => {
      const url = new URL(response.url());

      if (isFirstParty(url) && response.status() >= 400) {
        failures.add(
          `${response.request().method()} ${url.pathname} (HTTP ${response.status()})`
        );
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

    expect([...failures]).toEqual([]);
    expect(timing).not.toBeNull();
    expect(timing?.domContentLoaded ?? 0).toBeLessThan(15_000);
  });
}
