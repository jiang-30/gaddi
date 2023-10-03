import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv, type ConfigEnv } from "vite";
import { createVitePlugins } from "./build/index";
import tailwindcss from "tailwindcss";


export default ({ command, mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      port: 5190,
      proxy: {

        "/ai": {
          target: "http://222.74.215.220:38000",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/ai/, ""),
        },
        "/api/amap": {
          target: 'https://restapi.amap.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/amap/, ""),
        },
        "/api": {
          target: env.VITE_APP_HTTP_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    css: {
      postcss: {
        plugins: [tailwindcss({ config: "./tailwind.config.cjs" }) as any],
      },
    },
    build: {
      chunkSizeWarningLimit: 1000, // 包大小超过多少K有提示信息
      // cssCodeSplit: true, // css 文件也拆分
      // sourcemap: false,
      minify: "terser", // esbuild 速度快, terser 体积小
      assetsInlineLimit: 4000, // 小于4000 被编译成base64
      rollupOptions: {
        external: [],
        output: {
          // 分包, 自定义哪些文件打包到哪里 voctor
          manualChunks(filePath) {
            // console.log(filePath)
          },
        },
      },
    },
    plugins: createVitePlugins()
  });
};
