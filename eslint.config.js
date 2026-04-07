import { defineConfig } from '@tb-dev/eslint-config';

export default defineConfig({
  project: ['./tsconfig.json'],
  overrides: {
    typescript: {
      'naming-convention': 'off',
      'no-unnecessary-type-parameters': 'off',
      'only-throw-error': 'off',
    },
  },
});
