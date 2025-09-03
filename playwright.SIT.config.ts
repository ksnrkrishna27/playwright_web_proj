import { defineConfig } from "@playwright/test";
import baseConfig from "./playwright.config";

export default defineConfig({
  ...baseConfig,
  testDir: "./tests/web-e2e",
  use: {
    ...baseConfig.use,
    headless: false,
    screenshot: "only-on-failure",
    video: "on",
  },
});
