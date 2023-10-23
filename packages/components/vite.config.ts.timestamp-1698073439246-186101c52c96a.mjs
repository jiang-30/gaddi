// vite.config.ts
import { defineConfig } from "file:///Users/jiangbo/project/gaddi/node_modules/.pnpm/vite@4.4.9_@types+node@16.18.57/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/jiangbo/project/gaddi/node_modules/.pnpm/@vitejs+plugin-vue@4.4.0_vite@4.4.9_vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import dts from "file:///Users/jiangbo/project/gaddi/node_modules/.pnpm/vite-plugin-dts@3.6.0_@types+node@16.18.57_rollup@3.29.4_typescript@5.2.2_vite@4.4.9/node_modules/vite-plugin-dts/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    dts({
      // 指定使用的tsconfig.json为我们整个项目根目录下掉,如果不配置,你也可以在components下新建tsconfig.json
      tsconfigPath: "tsconfig.json",
      outDir: "es",
      entryRoot: "./src",
      staticImport: true
    })
  ],
  build: {
    target: "modules",
    // 打包文件目录
    outDir: "dist",
    // chunkSizeWarningLimit: 1000, // 包大小超过多少K有提示信息
    // css 文件也拆分
    // cssCodeSplit: true,
    // 构建后是否生成 source map 文件
    // sourcemap: false,
    // minify: 'terser', // esbuild 速度快, terser 体积小
    // assetsInlineLimit: 4000, // 小于4000 被编译成base64
    // 压缩
    minify: false,
    lib: {
      entry: "./src/index.ts",
      name: "GaddiComponents"
    },
    rollupOptions: {
      //忽略打包vue文件
      external: ["vue", "element-plus", "@element-plus/icons-vue", "axios", "@vueuse/core", "lodash-es"],
      output: [
        {
          globals: {
            "vue": "vue",
            "element-plus": "elementPlus",
            "@element-plus/icons-vue": "iconsVue",
            "lodash-es": "lodashEs",
            "@vueuse/core": "vueUse"
          },
          format: "umd",
          name: "WhirlComponents",
          exports: "named",
          // 不用打包成.es.js,这里我们想把它打包成.js
          entryFileNames: "[name].umd.js",
          // 让打包目录和我们目录对应
          // preserveModules: true,
          // 配置打包根目录
          dir: "dist"
          // preserveModulesRoot: "src",
        },
        {
          format: "es",
          // 不用打包成.es.js,这里我们想把它打包成.js
          entryFileNames: "[name].mjs",
          // 让打包目录和我们目录对应
          preserveModules: true,
          // 配置打包根目录
          dir: "es",
          preserveModulesRoot: "src"
        },
        {
          format: "cjs",
          exports: "named",
          entryFileNames: "[name].js",
          // 配置打包根目录
          dir: "lib",
          // 让打包目录和我们目录对应
          preserveModules: true,
          // 输入模块的目录路径，应该从输出中剥离。Dir输出路径。保存模块的值为true。
          preserveModulesRoot: "src"
        }
      ]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvamlhbmdiby9wcm9qZWN0L2dhZGRpL3BhY2thZ2VzL2NvbXBvbmVudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9qaWFuZ2JvL3Byb2plY3QvZ2FkZGkvcGFja2FnZXMvY29tcG9uZW50cy92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvamlhbmdiby9wcm9qZWN0L2dhZGRpL3BhY2thZ2VzL2NvbXBvbmVudHMvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XG5pbXBvcnQgZHRzIGZyb20gXCJ2aXRlLXBsdWdpbi1kdHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHZ1ZSgpLFxuICAgIGR0cyh7XG4gICAgICAvLyBcdTYzMDdcdTVCOUFcdTRGN0ZcdTc1MjhcdTc2ODR0c2NvbmZpZy5qc29uXHU0RTNBXHU2MjExXHU0RUVDXHU2NTc0XHU0RTJBXHU5ODc5XHU3NkVFXHU2ODM5XHU3NkVFXHU1RjU1XHU0RTBCXHU2Mzg5LFx1NTk4Mlx1Njc5Q1x1NEUwRFx1OTE0RFx1N0Y2RSxcdTRGNjBcdTRFNUZcdTUzRUZcdTRFRTVcdTU3Mjhjb21wb25lbnRzXHU0RTBCXHU2NUIwXHU1RUZBdHNjb25maWcuanNvblxuICAgICAgdHNjb25maWdQYXRoOiBcInRzY29uZmlnLmpzb25cIixcbiAgICAgIG91dERpcjogXCJlc1wiLFxuICAgICAgZW50cnlSb290OiBcIi4vc3JjXCIsXG4gICAgICBzdGF0aWNJbXBvcnQ6IHRydWUsXG4gICAgfSksXG4gIF0sXG4gIGJ1aWxkOiB7XG4gICAgdGFyZ2V0OiBcIm1vZHVsZXNcIixcbiAgICAvLyBcdTYyNTNcdTUzMDVcdTY1ODdcdTRFRjZcdTc2RUVcdTVGNTVcbiAgICBvdXREaXI6IFwiZGlzdFwiLFxuICAgIC8vIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTAwMCwgLy8gXHU1MzA1XHU1OTI3XHU1QzBGXHU4RDg1XHU4RkM3XHU1OTFBXHU1QzExS1x1NjcwOVx1NjNEMFx1NzkzQVx1NEZFMVx1NjA2RlxuICAgIC8vIGNzcyBcdTY1ODdcdTRFRjZcdTRFNUZcdTYyQzZcdTUyMDZcbiAgICAvLyBjc3NDb2RlU3BsaXQ6IHRydWUsXG4gICAgLy8gXHU2Nzg0XHU1RUZBXHU1NDBFXHU2NjJGXHU1NDI2XHU3NTFGXHU2MjEwIHNvdXJjZSBtYXAgXHU2NTg3XHU0RUY2XG4gICAgLy8gc291cmNlbWFwOiBmYWxzZSxcbiAgICAvLyBtaW5pZnk6ICd0ZXJzZXInLCAvLyBlc2J1aWxkIFx1OTAxRlx1NUVBNlx1NUZFQiwgdGVyc2VyIFx1NEY1M1x1NzlFRlx1NUMwRlxuICAgIC8vIGFzc2V0c0lubGluZUxpbWl0OiA0MDAwLCAvLyBcdTVDMEZcdTRFOEU0MDAwIFx1ODhBQlx1N0YxNlx1OEJEMVx1NjIxMGJhc2U2NFxuICAgIC8vIFx1NTM4Qlx1N0YyOVxuICAgIG1pbmlmeTogZmFsc2UsXG4gICAgbGliOiB7XG4gICAgICBlbnRyeTogXCIuL3NyYy9pbmRleC50c1wiLFxuICAgICAgbmFtZTogXCJHYWRkaUNvbXBvbmVudHNcIixcbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIC8vXHU1RkZEXHU3NTY1XHU2MjUzXHU1MzA1dnVlXHU2NTg3XHU0RUY2XG4gICAgICBleHRlcm5hbDogW1widnVlXCIsIFwiZWxlbWVudC1wbHVzXCIsICdAZWxlbWVudC1wbHVzL2ljb25zLXZ1ZScsICdheGlvcycsICdAdnVldXNlL2NvcmUnLCAnbG9kYXNoLWVzJ10sXG4gICAgICBvdXRwdXQ6IFtcbiAgICAgICAge1xuICAgICAgICAgIGdsb2JhbHM6IHtcbiAgICAgICAgICAgICd2dWUnOiAndnVlJyxcbiAgICAgICAgICAgICdlbGVtZW50LXBsdXMnOiAnZWxlbWVudFBsdXMnLFxuICAgICAgICAgICAgJ0BlbGVtZW50LXBsdXMvaWNvbnMtdnVlJzogJ2ljb25zVnVlJyxcbiAgICAgICAgICAgICdsb2Rhc2gtZXMnOiAnbG9kYXNoRXMnLFxuICAgICAgICAgICAgJ0B2dWV1c2UvY29yZSc6ICd2dWVVc2UnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgZm9ybWF0OiBcInVtZFwiLFxuICAgICAgICAgIG5hbWU6IFwiV2hpcmxDb21wb25lbnRzXCIsXG4gICAgICAgICAgZXhwb3J0czogXCJuYW1lZFwiLFxuICAgICAgICAgIC8vIFx1NEUwRFx1NzUyOFx1NjI1M1x1NTMwNVx1NjIxMC5lcy5qcyxcdThGRDlcdTkxQ0NcdTYyMTFcdTRFRUNcdTYwRjNcdTYyOEFcdTVCODNcdTYyNTNcdTUzMDVcdTYyMTAuanNcbiAgICAgICAgICBlbnRyeUZpbGVOYW1lczogXCJbbmFtZV0udW1kLmpzXCIsXG4gICAgICAgICAgLy8gXHU4QkE5XHU2MjUzXHU1MzA1XHU3NkVFXHU1RjU1XHU1NDhDXHU2MjExXHU0RUVDXHU3NkVFXHU1RjU1XHU1QkY5XHU1RTk0XG4gICAgICAgICAgLy8gcHJlc2VydmVNb2R1bGVzOiB0cnVlLFxuICAgICAgICAgIC8vIFx1OTE0RFx1N0Y2RVx1NjI1M1x1NTMwNVx1NjgzOVx1NzZFRVx1NUY1NVxuICAgICAgICAgIGRpcjogXCJkaXN0XCIsXG4gICAgICAgICAgLy8gcHJlc2VydmVNb2R1bGVzUm9vdDogXCJzcmNcIixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGZvcm1hdDogXCJlc1wiLFxuICAgICAgICAgIC8vIFx1NEUwRFx1NzUyOFx1NjI1M1x1NTMwNVx1NjIxMC5lcy5qcyxcdThGRDlcdTkxQ0NcdTYyMTFcdTRFRUNcdTYwRjNcdTYyOEFcdTVCODNcdTYyNTNcdTUzMDVcdTYyMTAuanNcbiAgICAgICAgICBlbnRyeUZpbGVOYW1lczogXCJbbmFtZV0ubWpzXCIsXG4gICAgICAgICAgLy8gXHU4QkE5XHU2MjUzXHU1MzA1XHU3NkVFXHU1RjU1XHU1NDhDXHU2MjExXHU0RUVDXHU3NkVFXHU1RjU1XHU1QkY5XHU1RTk0XG4gICAgICAgICAgcHJlc2VydmVNb2R1bGVzOiB0cnVlLFxuICAgICAgICAgIC8vIFx1OTE0RFx1N0Y2RVx1NjI1M1x1NTMwNVx1NjgzOVx1NzZFRVx1NUY1NVxuICAgICAgICAgIGRpcjogXCJlc1wiLFxuICAgICAgICAgIHByZXNlcnZlTW9kdWxlc1Jvb3Q6IFwic3JjXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBmb3JtYXQ6IFwiY2pzXCIsXG4gICAgICAgICAgZXhwb3J0czogXCJuYW1lZFwiLFxuICAgICAgICAgIGVudHJ5RmlsZU5hbWVzOiBcIltuYW1lXS5qc1wiLFxuICAgICAgICAgIC8vIFx1OTE0RFx1N0Y2RVx1NjI1M1x1NTMwNVx1NjgzOVx1NzZFRVx1NUY1NVxuICAgICAgICAgIGRpcjogXCJsaWJcIixcbiAgICAgICAgICAvLyBcdThCQTlcdTYyNTNcdTUzMDVcdTc2RUVcdTVGNTVcdTU0OENcdTYyMTFcdTRFRUNcdTc2RUVcdTVGNTVcdTVCRjlcdTVFOTRcbiAgICAgICAgICBwcmVzZXJ2ZU1vZHVsZXM6IHRydWUsXG4gICAgICAgICAgLy8gXHU4RjkzXHU1MTY1XHU2QTIxXHU1NzU3XHU3Njg0XHU3NkVFXHU1RjU1XHU4REVGXHU1Rjg0XHVGRjBDXHU1RTk0XHU4QkU1XHU0RUNFXHU4RjkzXHU1MUZBXHU0RTJEXHU1MjY1XHU3OUJCXHUzMDAyRGlyXHU4RjkzXHU1MUZBXHU4REVGXHU1Rjg0XHUzMDAyXHU0RkREXHU1QjU4XHU2QTIxXHU1NzU3XHU3Njg0XHU1MDNDXHU0RTNBdHJ1ZVx1MzAwMlxuICAgICAgICAgIHByZXNlcnZlTW9kdWxlc1Jvb3Q6IFwic3JjXCIsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBa1UsU0FBUyxvQkFBb0I7QUFDL1YsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sU0FBUztBQUVoQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixJQUFJO0FBQUE7QUFBQSxNQUVGLGNBQWM7QUFBQSxNQUNkLFFBQVE7QUFBQSxNQUNSLFdBQVc7QUFBQSxNQUNYLGNBQWM7QUFBQSxJQUNoQixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBO0FBQUEsSUFFUixRQUFRO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBU1IsUUFBUTtBQUFBLElBQ1IsS0FBSztBQUFBLE1BQ0gsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLElBQ1I7QUFBQSxJQUNBLGVBQWU7QUFBQTtBQUFBLE1BRWIsVUFBVSxDQUFDLE9BQU8sZ0JBQWdCLDJCQUEyQixTQUFTLGdCQUFnQixXQUFXO0FBQUEsTUFDakcsUUFBUTtBQUFBLFFBQ047QUFBQSxVQUNFLFNBQVM7QUFBQSxZQUNQLE9BQU87QUFBQSxZQUNQLGdCQUFnQjtBQUFBLFlBQ2hCLDJCQUEyQjtBQUFBLFlBQzNCLGFBQWE7QUFBQSxZQUNiLGdCQUFnQjtBQUFBLFVBQ2xCO0FBQUEsVUFDQSxRQUFRO0FBQUEsVUFDUixNQUFNO0FBQUEsVUFDTixTQUFTO0FBQUE7QUFBQSxVQUVULGdCQUFnQjtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBSWhCLEtBQUs7QUFBQTtBQUFBLFFBRVA7QUFBQSxRQUNBO0FBQUEsVUFDRSxRQUFRO0FBQUE7QUFBQSxVQUVSLGdCQUFnQjtBQUFBO0FBQUEsVUFFaEIsaUJBQWlCO0FBQUE7QUFBQSxVQUVqQixLQUFLO0FBQUEsVUFDTCxxQkFBcUI7QUFBQSxRQUN2QjtBQUFBLFFBQ0E7QUFBQSxVQUNFLFFBQVE7QUFBQSxVQUNSLFNBQVM7QUFBQSxVQUNULGdCQUFnQjtBQUFBO0FBQUEsVUFFaEIsS0FBSztBQUFBO0FBQUEsVUFFTCxpQkFBaUI7QUFBQTtBQUFBLFVBRWpCLHFCQUFxQjtBQUFBLFFBQ3ZCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
