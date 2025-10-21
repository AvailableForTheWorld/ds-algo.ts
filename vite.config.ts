import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import path from 'node:path'

export default defineConfig(({ mode }) => {
  const name = (mode as 'shared' | 'ds' | 'algo') || 'shared'
  const libName = name === 'shared' ? 'Shared' : name === 'ds' ? 'DS' : 'Algo'
  const root = path.resolve(__dirname, `packages/${name}`)
  const entry = path.resolve(__dirname, `packages/${name}/src/index.ts`)
  const outDir = path.resolve(__dirname, `packages/${name}/dist`)
  const external = name === 'shared' ? [] : ['@ds-algo.ts/shared']
  const globals: Record<string, string> | undefined = name === 'shared' ? undefined : { '@ds-algo.ts/shared': 'Shared' }

  return {
    root,
    build: {
      sourcemap: true,
      lib: {
        entry,
        name: libName,
        fileName: (format) => (format === 'es' ? `${name}.js` : `${name}.umd.cjs`),
        formats: ['es', 'umd']
      },
      rollupOptions: {
        external,
        output: {
          exports: 'named',
          globals
        }
      },
      outDir,
      emptyOutDir: false
    },
    plugins: [
      dts({
        entryRoot: path.resolve(__dirname, `packages/${name}/src`),
        outDir,
        insertTypesEntry: true,
        tsconfigPath: path.resolve(__dirname, `packages/${name}/tsconfig.json`)
      })
    ]
  }
})
