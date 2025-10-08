import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
    exclude: ['**/node_modules/**', '**/.git/**', 'src/types/**'],
    typecheck: {
      enabled: true,
      include: ['src/types/*.test.ts'],
    },
  },
});
