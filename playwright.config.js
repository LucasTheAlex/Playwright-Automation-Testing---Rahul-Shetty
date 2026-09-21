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
    timeout: 5000, // 5 seconds
  },
  reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: false
  },

});
