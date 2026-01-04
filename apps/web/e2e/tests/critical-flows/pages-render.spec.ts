import { test, expect } from "@playwright/test";

/**
 * Critical Flow: All Pages Render
 *
 * Verifies each page renders without crashing.
 * MUST pass before any PR can be created.
 */

const pages = [
  { path: "/", name: "Home" },
  { path: "/hardware-store", name: "Hardware Store" },
  { path: "/members", name: "Members" },
  { path: "/league-lore", name: "League Lore" },
  { path: "/analytics", name: "Analytics" },
];

test.describe("All Pages Render", () => {
  for (const { path, name } of pages) {
    test(`${name} page (${path}) renders without error`, async ({ page }) => {
      const errors: string[] = [];

      page.on("pageerror", (error) => {
        errors.push(error.message);
      });

      await page.goto(path);
      await page.waitForLoadState("domcontentloaded");

      // Basic check: page should have content
      const bodyContent = await page.locator("body").textContent();
      expect(bodyContent?.length).toBeGreaterThan(0);

      // No React/JS crash errors
      const errorBoundary = page.locator("[data-testid='error-boundary'], .error-boundary");
      await expect(errorBoundary).not.toBeVisible();

      expect(errors, `${name} page should not have JS errors`).toHaveLength(0);
    });
  }
});

test.describe("Pages Render - Mobile Viewport", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  for (const { path, name } of pages) {
    test(`${name} page renders on mobile`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState("domcontentloaded");

      // Should not have horizontal scroll
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      // Allow small variance for mobile
      if (hasHorizontalScroll) {
        const scrollDiff = await page.evaluate(() => {
          return document.documentElement.scrollWidth - document.documentElement.clientWidth;
        });
        expect(scrollDiff, `${name} page should not have significant horizontal scroll`).toBeLessThan(50);
      }
    });
  }
});
