import path from 'node:path'
import * as process from 'node:process'
import { defineConfig, } from 'vite'
import UniHelperComponents from '@uni-helper/vite-plugin-uni-components'
import { WotResolver, } from '@uni-helper/vite-plugin-uni-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import Uni from '@dcloudio/vite-plugin-uni'
import UniHelperPages from '@uni-helper/vite-plugin-uni-pages'
import UniHelperManifest from '@uni-helper/vite-plugin-uni-manifest'

// https://vitejs.dev/config/
export default async() => {
  const UnoCSS = (await import('unocss/vite')).default

  return defineConfig({
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), 'src',),
        '@wot': path.resolve(process.cwd(), 'node_modules/wot-design-uni/components',),
      },
    },
    plugins: [
      // https://github.com/uni-helper/vite-plugin-uni-manifest
      UniHelperManifest(),
      // https://github.com/uni-helper/vite-plugin-uni-pages
      UniHelperPages({
        dts: 'types/uni-pages.d.ts',
      },),
      // https://github.com/uni-helper/vite-plugin-uni-components
      UniHelperComponents({
        resolvers: [ WotResolver(), ],
        dts: 'types/components.d.ts',
        directoryAsNamespace: true,
      },),
      AutoImport({
        imports: [ 'vue', 'uni-app', {
          from: 'uni-mini-router',
          imports: [ 'createRouter', 'useRouter', 'useRoute', ],
        }, ],
        dts: 'types/auto-imports.d.ts',
        dirs: [ 'src/composables', 'src/utils', ],
        vueTemplate: true,
      },),
      Uni(),
      UnoCSS(),
    ],
  },)
}
