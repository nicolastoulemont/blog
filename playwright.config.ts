import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://127.0.0.1:4323',
    trace: 'retain-on-failure',
  },
  webServer: [
    {
      command: 'pnpm build && pnpm preview --host 127.0.0.1 --port 4323 --ignore-lock',
      url: 'http://127.0.0.1:4323',
      reuseExistingServer: false,
      timeout: 120000,
    },
    {
      command: 'pnpm dev --host 127.0.0.1 --port 4324 --ignore-lock',
      env: { BLOG_E2E: '1' },
      url: 'http://127.0.0.1:4324',
      reuseExistingServer: false,
      timeout: 120000,
    },
  ],
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'chromium-dev',
      use: { ...devices['Desktop Chrome'], baseURL: 'http://127.0.0.1:4324' },
    },
  ],
})
