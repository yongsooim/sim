import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env
  },
  plugins: [
    svelte(),
    viteCommonjs(),
    chunkSplitPlugin({
      strategy: 'single-vendor',
      customSplitting: {
        'firmata': ['./src/lib/firmata.ts', './src/lib/encoder7bit.ts', './src/lib/onewireutils.ts', ],
      }
    }),
    viteStaticCopy({
      targets: [
        {
          src: './src/static/*',
          dest: './static'
        },
        {
          src: './CNAME',
          dest: './'
        }
      ]
    }),
  ],
  base: './',
})
