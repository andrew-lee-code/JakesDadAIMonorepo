import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

/**
 * Page Object for the Home page
 */
export class HomePage extends BasePage {
  readonly heroSection: Locator;
  readonly leagueStandings: Locator;
  readonly weeklyMatchups: Locator;

  constructor(page: Page) {
    super(page);
    this.heroSection = page.locator("[data-testid='hero-section'], .hero, h1").first();
    this.leagueStandings = page.locator("[data-testid='standings'], .standings");
    this.weeklyMatchups = page.locator("[data-testid='matchups'], .matchups");
  }

  async goto() {
    await super.goto("/");
  }

  async expectHeroVisible() {
    await expect(this.heroSection).toBeVisible();
  }

  async expectPageLoaded() {
    await this.waitForPageLoad();
    await this.expectMainContentVisible();
  }
}
