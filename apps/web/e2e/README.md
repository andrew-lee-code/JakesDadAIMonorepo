# E2E Tests

End-to-end tests using Playwright for Jake's Dad Fantasy Football.

## Structure

```
e2e/
├── fixtures/           # Test fixtures (page objects, auth, etc.)
├── page-objects/       # Page Object Model classes
│   ├── BasePage.ts     # Common page functionality
│   ├── HomePage.ts     # Home page interactions
│   ├── NavigationPage.ts # Navigation testing
│   └── index.ts        # Exports
└── tests/
    └── critical-flows/ # Must-pass tests before PR
        ├── app-loads.spec.ts    # App loads without errors
        ├── navigation.spec.ts   # All routes work
        └── pages-render.spec.ts # Pages render correctly
```

## Running Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run with UI (for debugging)
npm run test:e2e:ui

# Run specific test file
npx playwright test navigation.spec.ts

# Run in headed mode (see browser)
npx playwright test --headed
```

## Adding New Tests

### For a new feature:
1. Create a page object in `page-objects/` if needed
2. Add test file in `tests/features/[feature-name].spec.ts`

### For critical flows:
1. Add test to `tests/critical-flows/`
2. These run before every PR

## Page Object Pattern

All tests use the Page Object Model for maintainability:

```typescript
import { HomePage } from "../page-objects";

test("example test", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.expectPageLoaded();
});
```

## Best Practices

1. **Use page objects** - Keep selectors in one place
2. **Test user flows** - Not implementation details
3. **Use data-testid** - For stable selectors
4. **Keep tests independent** - No shared state
5. **Add to critical-flows** - For must-pass functionality
