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
  reporter: 'html',
  use: {
    actionTimeout: 10_000, 
    navigationTimeout: 30_000,
    browserName: 'chromium',
    headless: false,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure'
  },

});
