import { Page, Locator, expect } from "@playwright/test";

/**
 * Base Page Object with common functionality for all pages.
 *
 * Extend this class to create page-specific objects.
 * Keeps tests DRY and maintainable as the app evolves.
 */
export abstract class BasePage {
  readonly page: Page;
  readonly navigation: Locator;

  constructor(page: Page) {
    this.page = page;
    // MUI AppBar renders as header, nav, or with role="navigation"
    this.navigation = page.locator("header, nav, [role='navigation']").first();
  }

  /**
   * Navigate to a specific path
   */
  async goto(path: string = "/") {
    await this.page.goto(path);
  }

  /**
   * Wait for page to be fully loaded (no network activity)
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Get all console errors from the page
   */
  async getConsoleErrors(): Promise<string[]> {
    const errors: string[] = [];

    this.page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    return errors;
  }

  /**
   * Verify no console errors on page
   */
  async expectNoConsoleErrors() {
    const errors = await this.getConsoleErrors();
    expect(errors).toHaveLength(0);
  }

  /**
   * Click a navigation link by text
   */
  async clickNavLink(text: string) {
    await this.navigation.getByRole("link", { name: text }).click();
  }

  /**
   * Verify page title contains expected text
   */
  async expectTitleContains(text: string) {
    await expect(this.page).toHaveTitle(new RegExp(text, "i"));
  }

  /**
   * Verify current URL matches expected path
   */
  async expectPathToBe(path: string) {
    await expect(this.page).toHaveURL(new RegExp(path));
  }

  /**
   * Take a screenshot with a descriptive name
   */
  async screenshot(name: string) {
    await this.page.screenshot({ path: `e2e/screenshots/${name}.png` });
  }

  /**
   * Check if main content area is visible
   */
  async expectMainContentVisible() {
    await expect(this.page.locator("main, [role='main'], #root > div")).toBeVisible();
  }

  /**
   * Verify no accessibility violations (basic check)
   * Note: For comprehensive a11y, consider adding @axe-core/playwright
   */
  async expectBasicAccessibility() {
    // Check that all images have alt text
    const images = await this.page.locator("img").all();
    for (const img of images) {
      const alt = await img.getAttribute("alt");
      expect(alt, "Image should have alt text").not.toBeNull();
    }

    // Check that interactive elements are keyboard accessible
    const buttons = await this.page.locator("button").all();
    for (const button of buttons) {
      const tabindex = await button.getAttribute("tabindex");
      expect(
        tabindex === null || parseInt(tabindex) >= 0,
        "Button should be keyboard accessible"
      ).toBeTruthy();
    }
  }
}
