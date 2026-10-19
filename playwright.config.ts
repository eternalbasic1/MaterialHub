import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "tests",
  testMatch: "**/*.smoke.ts",
  fullyParallel: true,
  use: { baseURL: process.env.TEST_BASE_URL || "http://localhost:3000" },
  reporter: "list",
});
