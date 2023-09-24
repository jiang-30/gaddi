import type { IBaseMenu, IMenu } from '@/typings'
import type { RouteRecordRaw } from 'vue-router'
import { useRouteStore } from '@/store'
import { setupLayouts } from 'virtual:generated-layouts'
import router from './index'
import menuList from './menus'
import { constantRoutes, allRoutes } from './routes'
import { generateDefaultMenu } from './default'

/**
 * 动态路由
 * 1. 移除动态加载的路由
 * 2. 动态加载
 *    没有设置 component 则通过 name 在已有路由中找
 *    如果有同名路由, 发出警告, 本地配置的不能移除，但是会优先使用传入数据
 */
export function generateDynamicRoutes(dynamicRouteMenus: IMenu[]) {
  const routeStore = useRouteStore()
  const dynamicRoutes: RouteRecordRaw[] = []

  // console.log(allRoutes)

  // 格式化路由数据
  dynamicRouteMenus.forEach(menu => {
    // 只匹配一级路由, 嵌套路由需要反向查找 || route.name === menu.name
    const component = allRoutes.find(route => {
      return route.path === menu.componentPath
    })

    if (component && component.component) {
      dynamicRoutes.push({
        path: menu.path ?? component.path,
        name: menu.name ?? component.path,
        component: component.component,
        children: component.children,
        props: true,
        meta: {
          ...menu,
        },
      })
    } else {
      console.warn('菜单配置的路由未找到对应的组件', menu, component)
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

// 静态路由及菜单列表（扁平化列表） = 路由格式化 + 本地菜单格式化
export function generateStaticMenus(): IMenu[] {
  return [...flatMenus(menuList), ...flatPageMenus(constantRoutes)]
}

// 配置菜单或者远程菜单 - 菜单数据扁平化并格式化数据
export function flatMenus(treeMenu: IBaseMenu[]): IMenu[] {
  const menus: IMenu[] = []

  treeForEach<IBaseMenu>(treeMenu, (menu, pId) => {
    menu.parentId = menu.parentId ?? pId
    menus.push(generateMenu(menu))
  })

  return menus
}

// 根据基础菜单信息 生成菜单, 配置优先级 menu > route.meta > default
export function generateMenu(menu: IBaseMenu): IMenu {
  const routePage = allRoutes.find(route => {
    return menu.type == 'page' && menu.componentPath === route.path
  })
  return generateDefaultMenu(menu, routePage?.meta)
}

// 子级是动态路由不考虑
function flatPageMenus(treeData: RouteRecordRaw[]): IMenu[] {
  const list: IMenu[] = []
  treeForEach(treeData, route => {
    if (route.meta) {
      list.push({ ...route.meta })
    }
  })
  return list
}


// 格式化菜单并使菜单扁平化, 菜单结构在 useMenuStore 中生成
// 添加id、格式化数据
// 只能是菜单,  页面需要从路由中查找,并修改配置
// 权限 本地菜单的页面权限问题
function treeForEach<T>(treeMenus: T[], fun: (menu: T, pId?: string) => void) {
  function _treeForEach(tree: T[], pId?: string) {
    tree.forEach((menu: any) => {
      fun(menu, pId)
      if (menu.children && menu.children.length) {
        _treeForEach(menu.children, menu.id)
      }
    })
  }
  _treeForEach(treeMenus)
}
