import { defineConfig } from 'vite'
import path from 'path'
import AutoImport from 'unplugin-auto-import/dist/vite.cjs'

export default defineConfig({
  root: './src',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@scss': path.resolve(__dirname, './src/scss'),
      '@ts': path.resolve(__dirname, './src/ts'),
    },
  },

  assetsInclude: ['./src/assets/**/*.*'],

  build: {
    emptyOutDir: true,
    outDir: '../dist',

    rollupOptions: {
      output: {
        entryFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`,
      },
    },
  },

  plugins: [
    AutoImport({
      dts: true, // or a custom path
      include: [/\.[tj]s?$/], // only .ts and .js files

      imports: [
        // auto import helper function
        { '@ts/helper/array-access.helper.ts': ['ArrayAccess'] },
        {
          '@ts/helper/device-detection.helper.ts': [
            'DeviceDetection',
          ],
        },
        { '@ts/helper/dom.helper.ts': ['Dom'] },
        { '@ts/helper/formatting.helper.ts': ['Formatting'] },
        { '@ts/helper/selector.helper.ts': ['Selector'] },
        { '@ts/helper/utilities.helper.ts': ['Utilities'] },

        // auto import vendor modules
        { '@ts/vendor/bootstrap/bootstrap.ts': ['bootstrap'] },
      ],

      eslintrc: { enabled: true },
    }),
  ],
})
