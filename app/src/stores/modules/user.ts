import { defineStore } from 'pinia'
import router from '@/router/index'
import { fetchProfile } from '@/api/account'
import type { IUserInfo } from '@/typings'
import { useMenuStore, useDictStore, useTabStore, useRouteStore, useSettingStore } from '@/stores'

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
    permissions: <string[]>['ROLE:ADMIN'], // setAuthorities ["ROLE:ADMIN"]
  }),
  getters: {
    isLogin: state => {
      return !!state.accessToken
    },
  },
  actions: {
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

    // 获取用户信息
    async fetchUserInfo() {
      if (this.isLogin && !this.isInit) {
        this.isInit = true
        return fetchProfile().then(({ data }) => {
          this.userInfo = data.userInfo
          this.dept = data.dept
          this.roleList = data.roleList
        })
      }
    },

    // 初始化基础必要信息: 用户信息、菜单信息、字典信息
    async initHandler() {
      return Promise.all([
        this.fetchUserInfo(), // 用户信息
        useDictStore().initHandler(this.isLogin), // 字典信息
        useMenuStore().initHandler(this.isLogin), // 菜单权限信息
      ])
    },

    /**
     * 退出系统
     */
    async logoutHandler(isClear = false) {
      // 用户信息
      this.$reset()
      // tab标签页数据
      useTabStore().$reset()
      // 菜单权限数据
      useMenuStore().$reset()
      // 字典数据
      useDictStore().$reset()

      if (isClear) {
        // route
        useSettingStore().$reset()
      }

      const loginRoute = router.getRoutes().find(row => row.name == useRouteStore().loginPageName)

      if (loginRoute) {
        window.location.assign(router.resolve(loginRoute).href)
      }
    },
  },
})
