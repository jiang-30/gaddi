import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
} from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import { useConfigStore, useTabStore, useUserStore, useRouteStore, useMenuStore } from '@/store'
import { constantRoutes } from './routes'

// console.log('enabledPages', allRoutes)

// 动态路由 通过menu配置的路由，可能覆盖静态路由；动态路由可以本地配置也可以远程加载
// 创建 VueRouter 路由实例
const router = createRouter({
  // try_files $uri $uri/ /index.html;
  history: createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(constantRoutes),
})

let IS_INIT = true

// 路由拦截器
// 1. 已登录
//    初始化数据 字典数据 权限数据; 动态路由加载后需要重新定向
//    跳转登录页重新跳转到首页
//    404页面需要判断是动态加载重新跳转
// 2. 未登录: 忽略路径则继续, 其他跳转到登录页面
router.beforeEach(async to => {
  const routeStore = useRouteStore()
  const userStore = useUserStore()
  const settingStore = useConfigStore()

  // console.log('to: ', to)

  settingStore.isLoading = true
  useTabStore().removeTab()
  await userStore.initHandler()

  // 已登录
  if (userStore.isLogin) {
    const defaultIndexPageName = useMenuStore().indexPageName

    if (!useUserStore().isAuth(to.meta.permission)) {
      return { name: routeStore.notAuthorizedPageName }
    } else if (to.name === routeStore.loginPageName) {
      return { name: defaultIndexPageName }
    } else if (to.name == routeStore.notFoundPageName && IS_INIT) {
      IS_INIT = false
      return { path: to.fullPath }
    } else if (to.name == routeStore.notFoundPageName && to.path == '/') {
      return { name: defaultIndexPageName }
    } else {
      return true
    }
  } else {
    if (routeStore.isIgnore(to) && to.name !== routeStore.notFoundPageName) {
      return true
    } else {
      return {
        name: routeStore.loginPageName,
        query: {
          redirect: to.fullPath,
        },
      }
    }
  }
})

// 路由拦后置截器
router.afterEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  // console.log('afterEach: ', to)
  // 停止 loading 关闭进度条
  useConfigStore().isLoading = false

  // 更新标题 title
  useConfigStore().appSubTitle = to.meta.title

  // 设置 tab 标签页
  useTabStore().addTab(to, from)

  // 页面缓冲
  useRouteStore().generateKeepAlive(to)
})

// 异常捕获
router.onError(error => {
  console.error('route error: ', error)
})

export default router
