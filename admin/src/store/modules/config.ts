import { defineStore } from 'pinia'
import config from '@/app.config'
import { setThemePrimaryColor } from '@/utils/color'
import { queryPropertiesByCode } from '@/api/admin/properties'


type IThemeMode = 'light' | 'dark'

const storeKey = 'CONFIG_STORE'

export const useConfigStore = defineStore({
  id: storeKey,
  persist: {
    enabled: true,
    strategies: [
      {
        key: storeKey,
        storage: localStorage,
      },
    ],
  },
  state: () => ({
    // axios请求基础路径
    baseUrl: config.request?.baseUrl ?? '',
    // 应用标题
    appTitle: config.title,
    // 页面模块标题
    appSubTitle: '',
    // 应用标题
    appTitleImage: '',
    // 应用Logo
    appLogo: config.logo,
    // 应用 Banner
    appBanner: '',
    // 应用版权
    appCopyright: '',
    // debug
    showDebugBtn: config.theme?.debugEnabled ?? false,
    // 跳转帮助页面按钮
    showHelpBtn: config.theme?.helpEnabled ?? false,
    // 全屏按钮
    showFullscreenBtn: config.theme?.fullscreenEnabled ?? true,
    // 模式切换
    showThemeBtn: config.theme?.themeEnabled ?? false,
    // 消息通知
    showMessageBtn: config.theme?.messageEnabled ?? false,
    // 设置
    showSettingBtn: config.theme?.settingEnabled ?? false,
    // 账户设置
    userSettingBtn: config.theme?.userSettingEnabled ?? false,
    // 个人中心
    userCenterBtn: config.theme?.userCenterEnabled ?? false,
    // tab开关
    showTab: true,
    // 面包屑开关
    showBreadcrumb: false,
    // 页面布局
    adminLayout: config.theme?.adminLayout ?? 'aside',
    // 侧边栏折叠
    asideCollapse: false,
    // 主题模式
    themeMode: <IThemeMode>config.theme?.themeMode ?? 'light',
    // 灰色模式
    grayModel: config.theme?.grayModel ?? false,
    /**
     * 主题色
     */
    themeColor: config.theme?.primaryColor ?? '#409EFF',
    headerBgColor: config.theme?.headerBgColor ?? '#242f42',
    headerTextColor: config.theme?.headerTextColor ?? '#E5EAF3',
    asideBgColor: config.theme?.asideBgColor ?? '#324157',
    asideTextColor: config.theme?.asideTextColor ?? '#E5EAF3',
    // 容器最小宽高
    minWidth: config.theme?.minWidth ?? 800,
    minHeight: config.theme?.minHeight ?? 600,
    // 容器宽高
    containerWidth: 0,
    containerHeight: 0,

    // 布局模式
    layout: {
      enableMobileAdaptation: true,
    },

    // 显示模式，支持：mobile、pc
    mode: 'pc',

    // 进度条
    isLoading: false,
  }),
  getters: {
    title(state) {
      const separator = '·'
      let title = state.appTitle
      if (state.appSubTitle) {
        title = `${state.appSubTitle} ${separator} ${state.appTitle}`
      }
      return title
    },
    // 顶部菜单栏
    showTopMenu(state) {
      if (state.adminLayout == 'top') {
        return true
      }
      return false
    },
    // 顶部菜单栏
    showTopMenuNav(state) {
      if (state.adminLayout == 'topAside') {
        return true
      }
      return false
    },
    // 侧边栏按钮
    showAside(state) {
      if (['topAside', 'aside'].includes(state.adminLayout)) {
        return true
      }
      return false
    },
  },
  actions: {
    // 设置访问模式
    setMode(width: number) {
      if (this.layout.enableMobileAdaptation) {
        // 先判断 UA 是否为移动端设备（手机&平板）
        if (
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        ) {
          this.mode = 'mobile'
        } else {
          // 如果为桌面设备，再根据页面宽度判断是否需要切换为移动端展示
          if (width < 992) {
            this.mode = 'mobile'
          } else {
            this.mode = 'pc'
          }
        }
      } else {
        this.mode = 'pc'
      }
    },

    // 设置主题颜色模式
    generateThemeColor() {
      setThemePrimaryColor(this.themeColor, this.themeMode)
    },
    // 获取站点配置信息
    queryAdminProperties() {
      return queryPropertiesByCode('ADMIN_CLIENT_PROPERTY').then(res => {
        const properties = res.data.value
        if (properties.appTitle) this.appTitle = properties.appTitle
        if (properties.appCopyright) this.appCopyright = properties.appCopyright
        if (properties.appTitleImage) this.appTitleImage = this.baseUrl + properties.appTitleImage
        if (properties.appLogo) this.appLogo = this.baseUrl + properties.appLogo
        if (properties.appBanner) this.appBanner = this.baseUrl + properties.appBanner
      })
    },

    async init(isInit: boolean, isLogin: boolean) {
      if (isInit) {
        await this.queryAdminProperties()
      }
    },

    // 清除数据
    async clear() {
      this.$reset()
    }
  },
})
