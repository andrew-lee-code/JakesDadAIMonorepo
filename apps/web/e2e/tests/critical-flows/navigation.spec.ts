import { test, expect } from "@playwright/test";
import { NavigationPage } from "../../page-objects";

/**
 * Critical Flow: Navigation Works
 *
 * Verifies all main routes are accessible and render correctly.
 * MUST pass before any PR can be created.
 */
test.describe("Navigation Works", () => {
  test("all main routes load successfully", async ({ page }) => {
    const navPage = new NavigationPage(page);

    for (const route of NavigationPage.ROUTES) {
      await test.step(`Route ${route.path} loads`, async () => {
        await page.goto(route.path);
        await navPage.waitForPageLoad();
        await navPage.expectMainContentVisible();

        // Verify we're on the right page
        await expect(page).toHaveURL(new RegExp(route.path.replace("/", "\\/")));
      });
    }
  });

  test("navigation links are visible", async ({ page }) => {
    const navPage = new NavigationPage(page);
    await navPage.goto();
    await navPage.waitForPageLoad();

    // Check that nav element exists
    await expect(navPage.navigation).toBeVisible();
  });

  test("clicking nav links navigates correctly", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Find and click a nav link (hardware store as example)
    const hardwareLink = page.getByRole("link", { name: /hardware/i });

    if (await hardwareLink.isVisible()) {
      await hardwareLink.click();
      await page.waitForLoadState("networkidle");
      await expect(page).toHaveURL(/hardware-store/);
    }
  });

  test("browser back button works after navigation", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Navigate to another page
    await page.goto("/hardware-store");
    await page.waitForLoadState("networkidle");

    // Go back
    await page.goBack();
    await page.waitForLoadState("networkidle");

    // Should be back on home
    await expect(page).toHaveURL(/\/$/);
  });
});

test.describe("Navigation - Mobile", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test("mobile navigation is accessible", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Navigation should still be present (MUI uses header/AppBar)
    const nav = page.locator("header, nav, [role='navigation']").first();
    await expect(nav).toBeAttached();
  });
});
