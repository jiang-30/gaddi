/// <reference types="vite/client" />
/// <reference types="vite-plugin-vue-layouts/client" />
/// <reference types="vite-plugin-pages/client" />
/// <reference types="unplugin-icons/types/vue3" />
/// <reference types="element-plus/global" />
/// <reference types="@gaddi/components/global" />
/// <reference types="unplugin-icons/types/vue3" />

/**
 * evn环境变量
 */
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;

  /**
   * http 请求地址 http://ip:port
   */
  readonly VITE_APP_HTTP_URL: string;
}

/**
 * import.meta
 */
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/**
 * Window 全局扩展
 */
interface Window {
  _AMapSecurityConfig: {
    readonly securityJsCode: string;
  };
}

// declare module "element-plus/dist/locale/zh-cn.mjs";
