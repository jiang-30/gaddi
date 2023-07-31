import type { IConfig } from './typings'
const ENV = import.meta.env

const config: IConfig & Record<string, any> = {
  // 登录， 用户信息，用户权限
  isLocalLogin: true,
  // 字典项
  remoteDict: false,

  title: '管理系统',

  description: 'vue3 + TypeScript 后台管理系统',

  clientCode: 'ADMIN',

  clientSecret: '',

  amap: {
    key: '8590441b668b5ec58a8921edaab94a0a',
  },

  theme: {
    themeMode: 'light',
    fullscreenEnabled: true,
    themeEnabled: true,
    settingEnabled: true,
    debugEnabled: false,
    userSettingEnabled: true,
  },

  request: {
    baseUrl: '/api',

    timeout: 30000,
  },

  router: {
    ignorePagePath: [],
  },
}

export default config
