import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

/**
 * Page Object for navigation testing across all pages.
 * Verifies the main navigation component works correctly.
 */
export class NavigationPage extends BasePage {
  readonly navLinks: Locator;
  readonly logo: Locator;
  readonly mobileMenuButton: Locator;

  // Expected navigation links and their paths
  static readonly ROUTES = [
    { name: /home/i, path: "/" },
    { name: /hardware/i, path: "/hardware-store" },
    { name: /members/i, path: "/members" },
    { name: /lore|league/i, path: "/league-lore" },
    { name: /analytics/i, path: "/analytics" },
  ] as const;

  constructor(page: Page) {
    super(page);
    this.navLinks = page.locator("nav a, nav button");
    this.logo = page.locator("[data-testid='logo'], nav img, nav .logo").first();
    this.mobileMenuButton = page.locator(
      "[data-testid='mobile-menu'], nav button[aria-label*='menu']"
    );
  }

  async goto() {
    await super.goto("/");
  }

  /**
   * Navigate to a route by clicking the nav link
   */
  async navigateTo(routeName: RegExp) {
    const link = this.page.getByRole("link", { name: routeName });
    await link.click();
    await this.waitForPageLoad();
  }

  /**
   * Verify all navigation links are present
   */
  async expectAllNavLinksPresent() {
    for (const route of NavigationPage.ROUTES) {
      const link = this.page.getByRole("link", { name: route.name });
      await expect(link).toBeVisible();
    }
  }

  /**
   * Test navigation to all routes and verify they load
   */
  async testAllRoutes() {
    const results: { route: string; success: boolean; error?: string }[] = [];

    for (const route of NavigationPage.ROUTES) {
      try {
        await this.page.goto(route.path);
        await this.waitForPageLoad();
        await this.expectMainContentVisible();
        results.push({ route: route.path, success: true });
      } catch (error) {
        results.push({
          route: route.path,
          success: false,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }

    return results;
  }

  /**
   * Open mobile menu if present (for responsive testing)
   */
  async openMobileMenu() {
    if (await this.mobileMenuButton.isVisible()) {
      await this.mobileMenuButton.click();
    }
  }
}
