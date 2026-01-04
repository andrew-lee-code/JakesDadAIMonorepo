import { test as base } from "@playwright/test";
import { HomePage, NavigationPage } from "../page-objects";

/**
 * Custom test fixtures for Jake's Dad Fantasy Football E2E tests.
 *
 * Fixtures provide reusable page objects and test utilities.
 * Extend this file to add authentication, database seeding, etc.
 */

// Extend base test with custom fixtures
export const test = base.extend<{
  homePage: HomePage;
  navigationPage: NavigationPage;
}>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  navigationPage: async ({ page }, use) => {
    const navigationPage = new NavigationPage(page);
    await use(navigationPage);
  },
});

export { expect } from "@playwright/test";
