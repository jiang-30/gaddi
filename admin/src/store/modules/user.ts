import { defineStore } from 'pinia'
import type { IUserInfo, ITokenInfo } from '@/typings'
import router from '@/router/index'
import { fetchProfile } from '@/api/common'
import { useMenuStore, useDictStore, useTabStore, useRouteStore, useConfigStore } from '@/store'

const storeKey = 'USER_STORE'
let IS_INIT = false

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
    isInit: false,
    userInfo: <IUserInfo>{},
    dept: {},
    roleList: {},
    // 当前用户的权限列表
    permissions: <string[]>[], // setAuthorities ["ROLE:ADMIN"]
  }),
  getters: {
    isLogin: state => {
      return !!state.accessToken
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

    // 校验用户登录态
    async fetchCheck() {
      return true
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

    // 设置用户的权限信息 角色可以使用 ROLE:ADMIN 表示
    async setPermissions(permissions: string[]) {
      this.permissions = permissions
    },

    // 获取用户信息
    async fetchUserInfo() {
      return fetchProfile().then(({ data }) => {
        this.userInfo = data.userInfo
        this.dept = data.dept
        this.roleList = data.roleList
      })
    },

    async init() {
      // if (this.isLogin && !this.isInit) {
      //   this.isInit = true
      //   await this.fetchUserInfo() // 用户信息
      // }
    },

    async clear() {
      this.$reset()
    },

    // 初始化基础必要信息: 用户信息、菜单信息、字典信息
    async initHandler() {
      return Promise.all([
        this.init(),
        useDictStore().init(this.isLogin), // 字典信息
        useMenuStore().init(this.isLogin), // 菜单权限信息
      ])
    },

    /**
     * 退出系统
     */
    async logoutHandler(isClear = false) {
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
