import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/**', 'dist/**', '**/*.config.*', '**/*.d.ts']
    }
  },
  resolve: {
    alias: {
      '@ds-algo.ts/shared': path.resolve(__dirname, 'packages/shared/src/index.ts'),
      '@ds-algo.ts/ds': path.resolve(__dirname, 'packages/ds/src/index.ts'),
      '@ds-algo.ts/algo': path.resolve(__dirname, 'packages/algo/src/index.ts')
    }
  }
})
