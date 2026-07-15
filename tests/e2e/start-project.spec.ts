import { expect, test } from "@playwright/test";

const turnstileStub = `
  window.turnstile = {
    render: function (_container, options) {
      Promise.resolve().then(function () {
        if (options && options.callback) {
          options.callback("playwright-project-brief-token");
        }
      });
      return "playwright-project-brief-widget";
    },
    reset: function () {},
    remove: function () {}
  };
`;

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

test("package context survives the redesigned project brief and submits", async ({ page }) => {
  let submittedPayload: Record<string, unknown> | null = null;

  await page.route("**/api/leads", async (route) => {
    submittedPayload = route.request().postDataJSON() as Record<string, unknown>;
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true })
    });
  });

  await page.goto(
    "/start-project?package=launch&estimateLow=1800&estimateHigh=3000&timeline=6%E2%80%938%20weeks&addOns=Analytics"
  );

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /Turn the idea into a clear build plan/i
    })
  ).toBeVisible();
  await expect(page.getByText("Launch package", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("definition").filter({ hasText: "$1,800–$3,000" })
  ).toBeVisible();

  await expect(page.getByLabel("Selected package")).toHaveValue("launch");
  await expect(page.getByLabel("Estimated investment")).toHaveValue(
    "Launch website — CAD $1,800–$3,000"
  );
  await expect(page.getByLabel("Preferred timeline")).toHaveValue("6–8 weeks");

  await page.getByLabel("Your name").fill("Test Client");
  await page.getByLabel("Email").fill("client@example.com");
  await page.getByLabel("Business name").fill("Example Studio");
  await page.getByLabel("What are you building?").selectOption("Business website");
  await page.getByLabel("Custom design").check();
  await page.getByLabel("Next.js development").check();
  await page
    .getByLabel("Business problem and goal")
    .fill("We need a clearer website that explains our services and generates qualified project inquiries.");

  await page.getByRole("button", { name: /Submit project brief/i }).click();

  await expect(
    page.getByRole("heading", { name: /Your project is ready for review/i })
  ).toBeVisible();

  expect(submittedPayload).toMatchObject({
    name: "Test Client",
    email: "client@example.com",
    company: "Example Studio",
    projectType: "Business website",
    selectedPackage: "launch",
    budget: "Launch website — CAD $1,800–$3,000",
    timeline: "6–8 weeks",
    estimateLow: "1800",
    estimateHigh: "3000",
    pricingTimeline: "6–8 weeks",
    addOns: "Analytics",
    servicesNeeded: ["Custom design", "Next.js development"]
  });
});

test("invalid project briefs still surface field errors and focus the first field", async ({ page }) => {
  await page.goto("/start-project");
  await page.getByRole("button", { name: /Submit project brief/i }).click();

  await expect(page.getByText("Enter your full name.", { exact: true })).toBeVisible();
  await expect(page.getByText("Enter a valid email address.", { exact: true })).toBeVisible();
  await expect(page.getByText("Select a project type.", { exact: true })).toBeVisible();
  await expect(page.getByText("Select an investment range.", { exact: true })).toBeVisible();
  await expect(page.getByLabel("Your name")).toBeFocused();
});
