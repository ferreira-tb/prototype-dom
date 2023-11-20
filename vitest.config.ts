import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: false,
    browser: {
      name: 'chrome',
      enabled: true,
      headless: true
    },
    watch: false,
    coverage: {
      provider: 'istanbul',
      reporter: ['html']
    }
  }
});
