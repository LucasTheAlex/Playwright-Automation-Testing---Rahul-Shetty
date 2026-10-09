# Playwright Automation Testing

End-to-end and API test automation with **Playwright (JavaScript)**, built while following Rahul Shetty's Playwright course and extended with CI/CD and cloud execution.

Tests run against the public practice apps at [rahulshettyacademy.com](https://rahulshettyacademy.com).

## What this project covers
- **UI tests:** locators, UI controls, child windows/tabs, popups and special locators (`getByRole`, `getByLabel`, etc.)
- **Page Object Model:** `LoginPage`, `DashboardPage` and a `POManager` in `src/page`
- **Custom fixtures:** authenticated page fixture in `src/fixtures`
- **API + UI together:** login and order creation through the API (`APIUtils`), then validation in the UI
- **Session reuse:** `storageState` to skip repeated logins
- **Data-driven tests:** test data from JSON (`src/utils/PlaceOrderTestData.json`) and tags (`@e2e`, `@Web`)
- **Reliability settings:** retries, parallel workers, screenshots on failure and traces kept on failure

## CI/CD
GitHub Actions (`.github/workflows/playwright.yml`) runs the suite on every push and pull request:
1. Installs dependencies
2. Logs in to Azure
3. Runs the tests on **Azure Playwright Testing** (cloud browsers, 3 workers)
4. Uploads the HTML report as a build artifact

## Project structure
```
src/
  page/       # Page Objects
  fixtures/   # Custom fixtures
  utils/      # API helpers and test data
tests/        # Test specs
playwright.config.js          # Local config
playwright.service.config.js  # Azure Playwright Testing config
```

## How to run
```bash
npm ci
npx playwright install
npx playwright test                 # run all tests locally
npx playwright test --grep @e2e     # run tagged tests
npx playwright show-report          # open the HTML report
```
