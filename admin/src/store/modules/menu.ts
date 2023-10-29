import { toRaw } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router/index'
import { useRouteStore, useUserStore } from '@/store'
import { listToTree, treeFindPath, treeFind } from '@/utils/tree-utils'
import { fetchPermission } from '@/api/common'
import { generateStaticMenus, flatMenus } from '@/router/handler'
import type { IBaseMenu, IMenu } from '@/typings'
import type { RouteRecordName } from 'vue-router'
import { cloneDeep } from 'lodash-es'

const storeKey = 'MENU_STORE'

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
    activeLayoutType: '',
    menus: <IMenu[]>[],
  }),
  getters: {
    /**
     * 某种布局下的首页
     */
    indexPageName: (state) => {
      const layoutType = state.activeLayoutType || useUserStore().layoutType
      const menu = state.menus.find(item => item.layout == layoutType && item.type == 'page' && item.isIndex);
      return menu?.name ?? useRouteStore().indexPageName
    },
    /**
     * 菜单列表 启用、授权
     */
    enabledMenus(state) {
      // const menus = toRaw(state.menus)
      const enabledMenuList = state.menus.filter(
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
     * 菜单树 结构
     */
    menuTree(state) {
      const tree: IMenu[] = listToTree(cloneDeep(toRaw(this.enabledMenus)))
      return tree
    },

    /**
     * 指定节点下的菜单树 - 只包含 isShowMenu: true 的菜单
     */
    getMenuTree(state) {
      return (menuName?: string): IMenu[] => {
        const enabledMenus = cloneDeep(toRaw(this.enabledMenus))
        const tree: IMenu[] = listToTree(enabledMenus.filter(item => item.isShowMenu))
        let foTree = tree

        if (menuName) {
          const subItem = treeFind(tree, node => {
            return node.name === menuName
          })
          foTree = (subItem ? subItem.children : []) as IMenu[]
        }

        return foTree.filter(item => item.type == 'page' ||
          (item.children && item.children.length))
      }
    },

    /**
     * 当前路由路径下的菜单栈 - 页面路径
     */
    currentMenuStack(state) {
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
     * 路由对应的菜单
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
    setMenus(menus: IBaseMenu[]) {
      this.menus = [
        ...generateStaticMenus(),
        ...flatMenus(menus),
      ]
      useRouteStore().setRoutes(this.enabledMenus)
    },

    /**
     * 设置菜单、路由
     * @todo 需要一个去重
     */
    async fetchMenus() {
      return fetchPermission().then(({ data }) => {
        this.setMenus(data.menus)
        useUserStore().setPermissions(data.permissions)
      })
    },

    /**
     *动态路由并且未加载
     */
    async init(isLogin: boolean) {
      if (isLogin) {
        await this.fetchMenus()
        useRouteStore().setRoutes(this.menus)
      }
    },

    // 清除数据
    async clear() {
      this.setMenus([])
      this.$reset()
    }
  },
})
