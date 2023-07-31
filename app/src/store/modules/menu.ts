import { toRaw } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router/index'
import { useRouteStore, useUserStore } from '@/store'
import { listToTree, treeFindPath, treeFind } from '@/utils/tree-utils'
import { fetchPermission } from '@/api/common'
import { generateStaticMenus, flatMenus } from '@/router/handler'
import type { IBaseMenu, IMenu } from '@/typings'
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
    menus: <IMenu[]>[...generateStaticMenus()],
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
      return (menuName?: string): IMenu[] => {
        const tree: IMenu[] = listToTree(this.enabledMenus.filter(item => item.isShowMenu))
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
    /**
     * 是页面直接跳转，是菜单找最近的页面再跳转
     * @todo treeFind
     * @todo enabledIndexPage, 首页需要添加到分组菜单里
     */
    navTo(routeName: string) {
      const menu = this.currentMenu(routeName)
      if (menu) {
        if (menu.type === 'page') {
          useRouteStore().handlerNav(menu)
        } else if (menu.type === 'menu') {
          // if(useRouteStore().enabledIndexPage) {
          //   router.push({path: useRouteStore().indexPagePath})
          // } else  {

          // }
          const pageMenu = treeFind([menu], node => {
            return node.type == 'page'
          })
          if (pageMenu) {
            useRouteStore().handlerNav(pageMenu)
          }
        }
      }
    },

    // 设置用户菜单、权限信息
    setMenus(menus: IBaseMenu[], roles: string[] = [], permissions: string[] = []) {
      this.menus = [
        ...generateStaticMenus(),
        ...flatMenus(menus),
      ]
      // this.permissions = [
      //   ...roles.map((item: string) => `ROLE:${item}`),
      //   ...permissions,
      // ]
      IS_INIT = true
      useRouteStore().setRoutes(this.menus)
    },

    /**
     * 设置菜单、路由
     * @todo 需要一个去重
     */
    async fetchMenus() {
      return fetchPermission().then(({ data }) => {
        this.setMenus(data.menus, data.roles, data.permissions)
      })
    },

    /**
     *动态路由并且未加载
     */
    async init(isLogin: boolean) {
      if (isLogin) {
        // if (!this.isInit) {
        //   this.isInit = true
        //   await this.fetchMenus()
        // }

        if (!IS_INIT) {
          IS_INIT = true
          useRouteStore().setRoutes(this.menus)
        }
      }
    },

    // 清除数据
    async clear() {
      IS_INIT = false
      this.$reset()
      useRouteStore().setRoutes([])
    }
  },
})
