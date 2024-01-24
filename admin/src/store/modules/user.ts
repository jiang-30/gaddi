import { defineStore } from 'pinia'
import type { IUserInfo, ITokenInfo } from '@/typings'
import router from '@/router/index'
import { fetchProfile } from '@/api/common'
import { useMenuStore, useDictStore, useTabStore, useRouteStore, useConfigStore } from '@/store'
import { setGaddiPermission } from '@gaddi/components'

const storeKey = 'USER_STORE'
let IS_INIT = true

export const useUserStore = defineStore({
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
    accessToken: '',
    refreshToken: '',
    expires: 0,
    userInfo: <IUserInfo>{},
    dept: {},
    roleList: <any[]>[],
    // 当前用户的权限列表
    permissions: <string[]>[], // setAuthorities ["ROLE:ADMIN"]
  }),
  getters: {
    isLogin: state => {
      return !!state.accessToken
    },
    layoutType: state => {
      return state.userInfo.layoutType ?? 'admin'
    },
  },
  actions: {
    // 路由权限判断
    isAuth(permission: string[]) {
      if (permission && permission.length) {
        return !!permission.find(it => {
          return !!this.permissions.find(item => item == it)
        })
      } else {
        return true
      }
    },

    // 设置认证信息
    async setTokenInfo(tokenInfo: ITokenInfo) {
      this.accessToken = tokenInfo.accessToken
      this.refreshToken = tokenInfo.refreshToken ?? ''
      this.expires = tokenInfo.expires ?? 0
    },

    // 设置用户信息
    async setUserInfo(userInfo: IUserInfo) {
      this.userInfo = userInfo
    },
    // 设置部门信息
    async setDept(dept: any) {
      this.dept = dept
    },
    // 设置角色列表
    async setRoleList(roleList: any[]) {
      this.roleList = roleList
    },
    // 设置用户的权限信息 角色可以使用 ROLE:ADMIN 表示
    async setPermissions(permissions: string[]) {
      this.permissions = [...this.roleList.map((item: any) => `ROLE:${item.code}`), ...permissions]
      setGaddiPermission(this.permissions)
    },

    // 校验用户登录态
    async fetchCheck() {
      return true
    },
    // 获取用户信息
    async fetchUserInfo() {
      return fetchProfile().then(({ data }) => {
        this.setUserInfo(data.userInfo)
        this.setDept(data.dept)
        this.setRoleList(data.roleList)
      })
    },

    async init(isInit: boolean) {
      if (this.isLogin && isInit) {
        await this.fetchUserInfo() // 用户信息
      }
    },
    async clear() {
      this.$reset()
    },

    // 初始化基础必要信息: 用户信息、菜单信息、字典信息
    async initHandler(isReset: boolean = false) {
      if (isReset) {
        IS_INIT = true;
      }

      await Promise.all([
        this.init(IS_INIT),
        useConfigStore().init(IS_INIT, this.isLogin), // 配置信息
        useDictStore().init(IS_INIT, this.isLogin), // 字典信息
        useMenuStore().init(IS_INIT, this.isLogin), // 菜单权限信息
      ])
      IS_INIT = false
    },

    /**
     * 退出系统
     */
    async logoutHandler(isClear = false) {
      IS_INIT = true;
      // 用户信息
      this.clear()
      // tab标签页数据
      useTabStore().clear()
      // 菜单权限数据
      useMenuStore().clear()
      // 字典数据
      useDictStore().clear()

      if (isClear) {
        useConfigStore().clear()
      }

      const loginRoute = router.getRoutes().find(row => row.name == useRouteStore().loginPageName)

      if (loginRoute) {
        window.location.assign(router.resolve(loginRoute).href)
      }
    },
  },
})
