import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright configuration for Jake's Dad Fantasy Football
 *
 * E2E tests run before PR creation to ensure critical flows work.
 * Uses Page Object Model for maintainability and extensibility.
 *
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./e2e/tests",

  // Run tests in parallel for speed
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only - flaky tests should be fixed locally
  retries: process.env.CI ? 2 : 0,

  // Limit workers on CI for stability
  workers: process.env.CI ? 1 : undefined,

  // Reporter configuration
  reporter: [
    ["html", { open: "never" }],
    ["list"], // Console output for quick feedback
  ],

  // Shared settings for all projects
  use: {
    // Base URL for navigation
    baseURL: "http://localhost:5173",

    // Collect trace when retrying failed test
    trace: "on-first-retry",

    // Screenshot on failure for debugging
    screenshot: "only-on-failure",

    // Video on failure for complex issues
    video: "on-first-retry",
  },

  // Configure projects for major browsers
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    // Mobile viewport for responsive testing
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 5"] },
    },
  ],

  // Start dev server before running tests
  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
