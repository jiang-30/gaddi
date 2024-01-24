import type { IConfig } from './typings'
// const ENV = import.meta.env

const config: IConfig & Record<string, any> = {
  version: '',
  // 登录， 用户信息，用户权限
  isLocalLogin: false,

  title: '管理系统',

  logo: '/logo.png',

  description: 'vue3 + TypeScript 后台管理系统',

  clientCode: 'ADMIN',

  secret: 'uBdUx82vPHkDKb284d7NkjFoNcKWBuka',

  amap: {
    key: '8590441b668b5ec58a8921edaab94a0a',
  },

  theme: {
    themeMode: 'light',
    helpEnabled: true,
    fullscreenEnabled: true,
    themeEnabled: true,
    messageEnabled: true,
    settingEnabled: true,
    debugEnabled: true,
    userSettingEnabled: true,
    userCenterEnabled: false,
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
