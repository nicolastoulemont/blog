/// <reference types="vitest" />

// Configure Vitest (https://vitest.dev/config/)

import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vite.setup.ts",
  },
})