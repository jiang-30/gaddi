import vue from "@vitejs/plugin-vue";
import vueJsx from '@vitejs/plugin-vue-jsx'
import { visualizer } from "rollup-plugin-visualizer";
import { viteMockServe } from "vite-plugin-mock";
import viteCompression from "vite-plugin-compression";
import createHtml from "./html";
import createPages from "./pages";
import createAuto from "./auto";
import createLint from "./lint";
import createFavicon from "./favicon";
import { PluginOption } from "vite";
// @ts-ignore
import { generatePlugin } from "./generate";

// import vue from '@vitejs/plugin-vue'
// import vueJsx from '@vitejs/plugin-vue-jsx'
//  * vite-plugin-banner 当你在你的项目上运行 npm run build 打包的时候，在 dist 文件夹（或者你在 vite.config.ts 配置的其他 build.outDir ），除了 vendor 文件外，所有的 js 和 css 文件都会添加一个 banner 注释在文件顶部。
//  * vite-plugin-html
//  * vite-plugin-mock
//  * vite-plugin-vue-layouts
//  * vite-plugin-pages
//  * vite-plugin-vue-setup-extend
//  * vite-plugin-compression
//  * vite-plugin-spritesmith
//  * @vitejs/plugin-legacy 打包后的文件提供传统浏览器兼容性
//  * vite-plugin-restart
//  *     // 打包 .gz 文件 vite-plugin-compression
// viteCompression({
//   verbose: true,
//   disable: false,
//   threshold: 10240,
//   algorithm: 'gzip',
//   ext: '.gz'
// })
//

export function createVitePlugins(): any[] {
  return [
    vue(),
    vueJsx(),
    createHtml(),
    createFavicon(),
    // ...createLint(),
    ...createAuto(),
    ...createPages(),
    // mock 读取 src/api 目录下的以 mock.ts 结尾的文件
    viteMockServe({
      localEnabled: false,
      logger: true,
      mockPath: "./src/api/",
      ignore(fileName) {
        return /.*mock.ts$/.test(fileName);
      },
    }),
    // .gzip 压缩
    viteCompression({
      verbose: false, // 控制台输出
      threshold: 20000, // 体积多少压缩, 单位 b
      disable: false, // 禁用
    }),
    // 查看包体积
    visualizer({
      open: false,
    }),
    generatePlugin()
  ];
}
