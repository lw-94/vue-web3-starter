import { URL, fileURLToPath } from 'node:url'

import ViteYaml from '@modyfi/vite-plugin-yaml'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    AutoImport({
      imports: ['vue'],
      resolvers: [
        IconsResolver({
          prefix: 'Icon'
        }),
        ElementPlusResolver()
      ]
    }),
    Components({
      resolvers: [
        IconsResolver({
          enabledCollections: ['ep']
        }),
        ElementPlusResolver()
      ]
    }),
    Icons({
      autoInstall: true
    }),
    ViteYaml()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
