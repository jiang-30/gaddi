import { defineStore } from 'pinia'
import router from '@/router/index'
import { useRouteStore, useUserStore } from '@/store'
import { listToTree, treeFindPath, treeFind } from '@/utils/tree-utils'
import { fetchPermission } from '@/api/common'
import { getStaticMenuList, flatMenus } from '@/utils/menu'
import type { IMenu } from '@/typings'
import type { RouteRecordName } from 'vue-router'

const storeKey = 'MENU_STORE'
let IS_INIT = false

export const useMenuStore = defineStore({
  id: storeKey,
  persist: {
    enabled: true,
    strategies: [
      {
        key: storeKey,
      },
    ],
  },
  state: () => ({
    menus: <IMenu[]>[],
    permissions: <string[]>['ROLE:ADMIN'], // setAuthorities ["ROLE:ADMIN"]
    isInit: false,
  }),
  getters: {
    /**
     * 启用的菜单列表 启用、授权
     * @todo 对constant 为true 的菜单根据用户角色过滤
     */
    enabledMenus(state) {
      const menus = toRaw(state.menus)
      const enabledMenuList = menus.filter(
        item =>
          item.isEnabled === true &&
          ['page', 'menu'].includes(item.type) &&
          useUserStore().isAuth(item.permission),
      )
      enabledMenuList.sort((prev, next) => {
        return prev.sort - next.sort
      })
      return enabledMenuList
    },

    /**
     * 菜单树结构
     * @todo toRaw
     */
    menuTree() {
      const tree: IMenu[] = listToTree(this.enabledMenus)
      return tree
    },

    /**
     * 获取指定路径下的菜单树
     * 可以展示设置 showMenu: true 的菜单
     */
    getMenuTree() {
      return (menuName?: string) => {
        const tree: IMenu[] = listToTree(this.enabledMenus.filter(item => item.isShow))
        let foTree: IMenu[]

        if (menuName) {
          const subItem = treeFind(tree, node => {
            return node.name === menuName
          })
          foTree = (subItem ? subItem.children : []) as IMenu[]
        } else {
          foTree = tree
        }

        return foTree.filter(item => item.type == 'page' || (item.children && item.children.length))
      }
    },

    /**
     * 当前路由路径下的菜单栈 currentMemuStack
     */
    menuStack() {
      const currentRouteName = router.currentRoute.value.name
      const stack: IMenu[] = []

      treeFindPath(
        this.menuTree,
        node => {
          if (node.name === currentRouteName) {
            return true
          }
          return false
        },
        stack,
      )
      return stack
    },

    /**
     * 根据访问路径获取菜单, 当前路由对应的菜单
     */
    currentMenu(state) {
      return (routeName: RouteRecordName) => {
        const menu = state.menus.find(item => item.name === routeName)
        return menu
      }
    },
  },
  actions: {
    isAuth(permissions: string[]) {
      if (permissions && permissions.length) {
        return !!permissions.find(permission => {
          return !!this.permissions.find(item => item == permission)
        })
      } else {
        return true
      }
    },
    /**
     * 菜单导航: path - target
     * @todo _self _blank http
     */
    handlerNav(menu: IMenu) {
      if (menu.type === 'page') {
        if (menu.path?.startsWith('http')) {
          window.open(menu.path, menu.target)
        } else {
          router.push({ name: menu.name })
        }
      }
    },

    /**
     * 是页面直接跳转，是菜单找最近的页面再跳转
     * @todo treeFind
     * @todo enabledIndexPage, 首页需要添加到分组菜单里
     */
    navTo(routeName: string) {
      const menu = this.currentMenu(routeName)

      if (menu) {
        if (menu.type === 'page') {
          this.handlerNav(menu)
        } else if (menu.type === 'menu') {
          // if(useRouteStore().enabledIndexPage) {
          //   router.push({path: useRouteStore().indexPagePath})
          // } else  {

          // }
          const pageMenu = treeFind([menu], node => {
            return node.type == 'page'
          })
          if (pageMenu) {
            this.handlerNav(pageMenu)
          }
        }
      }
    },

    /**
     * 设置菜单、路由,
     * @todo 需要一个去重
     */
    async fetchMenus() {
      return fetchPermission().then(({ data }) => {
        this.menus = [...getStaticMenuList(), ...flatMenus(data.menus)]
        this.permissions = [...data.roles.map((item: string) => `ROLE:${item}`), data.permissions]
      })
    },

    /**
     *动态路由并且未加载
     */
    async initHandler(isLogin: boolean) {
      if (isLogin) {
        if (!this.isInit) {
          this.isInit = true
          await this.fetchMenus()
        }
        if (!IS_INIT) {
          IS_INIT = true
          useRouteStore().setRoutes(this.menus)
        }
      }
    },
  },
})
