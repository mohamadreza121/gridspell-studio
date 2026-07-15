import { expect, test } from "@playwright/test";

const turnstileStub = `
  window.turnstile = {
    render: function (_container, options) {
      Promise.resolve().then(function () {
        if (options && options.callback) {
          options.callback("playwright-performance-token");
        }
      });
      return "playwright-performance-widget";
    },
    reset: function () {},
    remove: function () {}
  };
`;

const viewports = [
  { name: "mobile", width: 390, height: 844, maxLcp: 4_000 },
  { name: "desktop", width: 1440, height: 900, maxLcp: 3_000 }
] as const;

for (const viewport of viewports) {
  test(`start-project keeps initial ${viewport.name} work within budget`, async ({ page }) => {
    let turnstileRequests = 0;
    let heroImageRequests = 0;

    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.addInitScript(() => {
      const metricsWindow = window as Window & {
        __startProjectMetrics?: {
          cls: number;
          lcp: number;
          longTaskDuration: number;
        };
      };

      metricsWindow.__startProjectMetrics = {
        cls: 0,
        lcp: 0,
        longTaskDuration: 0
      };

      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const shift = entry as PerformanceEntry & {
            hadRecentInput: boolean;
            value: number;
          };
          if (!shift.hadRecentInput && metricsWindow.__startProjectMetrics) {
            metricsWindow.__startProjectMetrics.cls += shift.value;
          }
        }
      }).observe({ type: "layout-shift", buffered: true });

      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const latest = entries.at(-1);
        if (latest && metricsWindow.__startProjectMetrics) {
          metricsWindow.__startProjectMetrics.lcp = latest.startTime;
        }
      }).observe({ type: "largest-contentful-paint", buffered: true });

      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (metricsWindow.__startProjectMetrics) {
            metricsWindow.__startProjectMetrics.longTaskDuration += entry.duration;
          }
        }
      }).observe({ type: "longtask", buffered: true });
    });

    page.on("request", (request) => {
      const url = request.url();
      if (url.includes("gridspell-studio-v4")) heroImageRequests += 1;
    });

    await page.route(
      "https://challenges.cloudflare.com/turnstile/v0/api.js**",
      async (route) => {
        turnstileRequests += 1;
        await route.fulfill({
          status: 200,
          contentType: "application/javascript",
          body: turnstileStub
        });
      }
    );

    await page.goto("/start-project", { waitUntil: "domcontentloaded" });
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /Turn the idea into a clear build plan/i
      })
    ).toBeVisible();
    await page.waitForTimeout(1_600);

    const initialMetrics = await page.evaluate(() => {
      const metricsWindow = window as Window & {
        __startProjectMetrics?: {
          cls: number;
          lcp: number;
          longTaskDuration: number;
        };
      };
      const navigation = performance.getEntriesByType("navigation")[0] as
        | PerformanceNavigationTiming
        | undefined;

      return {
        ...(metricsWindow.__startProjectMetrics ?? {
          cls: 0,
          lcp: 0,
          longTaskDuration: 0
        }),
        domContentLoaded: navigation
          ? navigation.domContentLoadedEventEnd - navigation.startTime
          : 0
      };
    });

    expect(turnstileRequests).toBe(0);
    expect(initialMetrics.cls).toBeLessThan(0.05);
    expect(initialMetrics.lcp).toBeGreaterThan(0);
    expect(initialMetrics.lcp).toBeLessThan(viewport.maxLcp);
    expect(initialMetrics.longTaskDuration).toBeLessThan(900);
    expect(initialMetrics.domContentLoaded).toBeLessThan(5_000);

    if (viewport.name === "mobile") {
      expect(heroImageRequests).toBe(0);
    }

    const verification = page.getByRole("group", {
      name: "Bot protection verification"
    });
    await verification.scrollIntoViewIfNeeded();
    await page.locator('[data-turnstile-wrapper="true"]').hover();
    await expect(page.locator('input[name="turnstileToken"]')).toHaveValue(
      "playwright-performance-token"
    );
    expect(turnstileRequests).toBe(1);
  });
}
