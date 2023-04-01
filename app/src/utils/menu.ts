import menuList from '@/router/menus'
import type { IMenu } from '@/typings'
import type { RouteMeta, RouteRecordRaw } from 'vue-router'
import { constantRoutes, allRoutes } from '@/router/routes'
import { setDefaultMenuMate } from '@/router/handler'

// 格式化菜单并使菜单扁平化, 菜单结构在 useMenuStore 中生成
// 添加id、格式化数据
// 只能是菜单,  页面需要从路由中查找,并修改配置
// 权限 本地菜单的页面权限问题
function flatTree<T>(treeMenus: T[], fun: (menu: T, pId?: string) => void) {
  function treeForEach(tree: any, pId?: string) {
    tree.forEach((menu: any) => {
      fun(menu, pId)
      if (menu.children && menu.children.length) {
        treeForEach(menu.children, menu.id)
      }
    })
  }

  treeForEach(treeMenus)
}

// 配置菜单或者远程菜单 - 菜单数据扁平化并格式化数据
export function flatMenus(treeMenu: IMenu[]) {
  const menus: IMenu[] = []

  flatTree<IMenu>(treeMenu, (menu: any, pId) => {
    menu.type = menu.type ?? 'menu'
    menu.parentId = menu.parentId ?? pId
    menu.isEnabled = menu.isEnabled === '1' || menu.isEnabled === true ? true : false
    menu.isAlive = menu.isAlive === '1' || menu.isAlive === true ? true : false
    menu.isShow = menu.isShow === '1' || menu.isShow === true ? true : false
    menu.isTab = menu.isTab === '1' || menu.isTab === true ? true : false
    // 使用页面数据
    if (menu.type === 'page') {
      const component = allRoutes.find(route => {
        return route.path === menu.component
      })
      if (component && component.meta) {
        for (const key of Object.keys(component.meta)) {
          if (key === 'permission' && typeof menu[key] == 'string' && menu[key]) {
            menu[key] = (menu.permission as string).split(',')
          }
          if (menu[key] === null || menu[key] === undefined || menu[key] === '') {
            menu[key] = component.meta[key]
          }
        }
      }
    }
    // 未设置name时使用菜单id
    menu.name = menu.name ?? menu.id

    menus.push(menu)
  })

  return menus
}

// 子级是动态路由不考虑
function flatPageMenus(treeData: RouteRecordRaw[]) {
  const list: RouteMeta[] = []

  flatTree(treeData, route => {
    const routeMeta = route.meta
    if (routeMeta) {
      list.push(routeMeta)
    }
  })

  return list
}

// 静态路由及菜单列表（扁平化列表） = 路由格式化 + 本地菜单格式化
export const getStaticMenuList = () => {
  return [...flatMenus(menuList as IMenu[]), ...flatPageMenus(constantRoutes)]
}
