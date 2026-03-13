import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["**/__tests__/**/*.test.ts", "**/__tests__/**/*.test.tsx"],
    exclude: ["**/node_modules/**", "**/dist/**", "**/.next/**", "**/e2e/**"],
    coverage: {
      provider: "v8",
      include: [
        "apps/web/src/lib/**",
        "packages/seo/src/**",
        "packages/analytics/src/**",
      ],
      exclude: ["**/*.d.ts", "**/__tests__/**"],
    },
  },
});
