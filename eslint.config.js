import { defineConfig } from '@tb-dev/eslint-config';

export default defineConfig({
  project: ['./tsconfig.json'],
  overrides: {
    typescript: {
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/no-unnecessary-type-parameters': 'off',
      '@typescript-eslint/only-throw-error': 'off',
    },
  },
});
