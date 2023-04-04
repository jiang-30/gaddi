import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
  type RouteRecordRaw,
} from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import { useSettingStore, useTabStore, useUserStore, useRouteStore } from '@/store'
import { allRoutes, constantRoutes } from './routes'
import type { IMenu } from '@/typings'

// console.log('enabledPages', allRoutes)

// 静态路由 constant: true 的路由
// 动态路由 通过menu配置的路由，可能覆盖静态路由；动态路由可以本地配置也可以远程加载

// 创建 VueRouter 路由实例
const router = createRouter({
  // try_files $uri $uri/ /index.html;
  history: createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(constantRoutes),
})

let IS_INIT = false

// 路由拦截器
// 1. 已登录
//    初始化数据 字典数据 权限数据; 动态路由加载后需要重新定向
//    跳转登录页重新跳转到首页
//    404页面需要判断是动态加载重新跳转
// 2. 未登录: 忽略路径则继续, 其他跳转到登录页面
router.beforeEach(async to => {
  const routeStore = useRouteStore()
  const userStore = useUserStore()
  const settingStore = useSettingStore()

  // console.log('to: ', to)

  settingStore.isLoading = true
  useTabStore().removeTab()

  // 已登录
  if (userStore.isLogin) {
    await userStore.initHandler()

    if (to.name === routeStore.loginPageName) {
      return { name: routeStore.indexPageName }
    } else if (!useUserStore().isAuth(to.meta.permission)) {
      return { name: routeStore.notAuthorizedPageName }
    } else if (to.name == routeStore.notFoundPageName && !IS_INIT) {
      IS_INIT = true
      return { path: to.fullPath }
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
  // 停止 loading 关闭进度条
  useSettingStore().isLoading = false

  // 更新标题 title
  useSettingStore().appSubTitle = to.meta.title

  // 设置 tab 标签页
  useTabStore().addTab(to, from)

  // 页面缓冲
  useRouteStore().generateKeepAlive(to)
})

// 异常捕获
router.onError(error => {
  console.error('route error: ', error)
})

/**
 * 动态路由
 * 1. 移除动态加载的路由
 * 2. 动态加载
 *    没有设置 component 则通过 name 在已有路由中找
 *    如果有同名路由, 发出警告, 本地配置的不能移除，但是会优先使用传入数据
 */
export function generateRoutes(dynamicRouteMenus: IMenu[]) {
  const routeStore = useRouteStore()
  const dynamicRoutes: RouteRecordRaw[] = []

  // 格式化路由数据
  dynamicRouteMenus.forEach(menu => {
    // 只匹配一级路由, 嵌套路由需要反向查找 || route.name === menu.name
    const component = allRoutes.find(route => {
      return route.path === menu.component
    })

    if (component && component.component) {
      dynamicRoutes.push({
        path: menu.path,
        name: menu.name,
        component: component.component,
        children: component.children,
        props: true,
        meta: {
          ...menu,
        },
      })
    } else {
      console.warn('菜单配置的路由未找到对应的组件', menu)
    }
  })

  // 为路由组件添加布局容器
  const layoutRoutes = setupLayouts(dynamicRoutes)

  // console.log('layoutRoutes', layoutRoutes)

  // 删除存在的动态路由
  routeStore.removeRoutes.forEach((item: () => void) => item())
  const removeRoutes: (() => void)[] = []

  // 添加路由
  layoutRoutes.forEach(item => {
    removeRoutes.push(router.addRoute(item))
  })

  // console.log(router.getRoutes())

  // 并记录动态添加的路由
  routeStore.removeRoutes = removeRoutes
}

export default router
