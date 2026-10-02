import { defineConfig, devices } from '@playwright/test';

// const config = ({
//   testDir: './tests',
//   timeout: 40 * 1000, // miliseconds
//   expect: {
//     timeout: 40 * 1000, // miliseconds
//   },
//   reporter: 'html',
//   use: {
//     browserName: 'webkit',
//     headless: true
//   },

// });

// module.exports = config;

export default defineConfig({
  testDir: './tests',
  timeout: 40 * 1000, // 40 seconds
  expect: {
    timeout: 12000, // 12 seconds
  },
  retries: 2,
  retryStrategy: 'isolated',
  reporter: 'html',
  fullyParallel: true,
  workers: 2,
  use: {
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
    browserName: 'chromium',
    headless: false,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: {
        actionTimeout: 10_000,
        navigationTimeout: 30_000,
        browserName: 'chromium',
        headless: true,
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
        viewport: {
          width: 720,
          height: 720
        }
      }
    },
    // {
    //   name: 'firefox',
    //   use: {
    //     actionTimeout: 10_000,
    //     navigationTimeout: 30_000,
    //     browserName: 'firefox',
    //     headless: false,
    //     screenshot: 'only-on-failure',
    //     trace: 'retain-on-failure'
    //   }
    // },
    // {
    //   name: 'webkit',
    //   use: {
    //     actionTimeout: 10_000,
    //     navigationTimeout: 30_000,
    //     browserName: 'webkit',
    //     headless: false,
    //     screenshot: 'only-on-failure',
    //     trace: 'retain-on-failure',
    //     ...devices['iPhone 12'],
    //     ignoreHTTPSErrors: true,
    //     permissions: [
    //       'geolocation'
    //     ],
    //     video: 'retain-on-failure',
    //     trace: 'retain-on-failure'
    //   }
    // }
  ]
});
