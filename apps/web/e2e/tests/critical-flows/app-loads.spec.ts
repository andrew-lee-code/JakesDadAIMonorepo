import { test, expect } from "@playwright/test";
import { HomePage } from "../../page-objects";

/**
 * Critical Flow: App Loads Successfully
 *
 * These tests verify the app loads without errors.
 * MUST pass before any PR can be created.
 */
test.describe("App Loads Successfully", () => {
  test("home page loads without JavaScript errors", async ({ page }) => {
    const errors: string[] = [];

    // Capture console errors
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    // Capture page errors
    page.on("pageerror", (error) => {
      errors.push(error.message);
    });

    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.waitForPageLoad();

    // Filter out known non-critical errors (e.g., analytics, third-party)
    const criticalErrors = errors.filter(
      (err) =>
        !err.includes("analytics") &&
        !err.includes("third-party") &&
        !err.includes("favicon")
    );

    expect(criticalErrors, "No critical JavaScript errors on load").toHaveLength(0);
  });

  test("main content area renders", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.expectMainContentVisible();
  });

  test("page has a title", async ({ page }) => {
    await page.goto("/");
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
  });

  test("no network request failures on initial load", async ({ page }) => {
    const failedRequests: string[] = [];

    page.on("requestfailed", (request) => {
      // Ignore optional resources (analytics, tracking, etc.)
      const url = request.url();
      const ignoredPatterns = ["favicon", "analytics", "vercel-scripts", "vercel.com"];
      const shouldIgnore = ignoredPatterns.some((pattern) => url.includes(pattern));
      if (!shouldIgnore) {
        failedRequests.push(`${request.failure()?.errorText}: ${url}`);
      }
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    expect(failedRequests, "No critical network failures").toHaveLength(0);
  });
});
