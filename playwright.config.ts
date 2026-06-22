import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 2,
  workers: 4,
  reporter: 'html',

  use: {
  baseURL: 'https://dev3.vcssoftware.com',
  ignoreHTTPSErrors: true,
  trace: 'on-first-retry',
  screenshot: 'on',  // 👈 add this
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
