import { defineStore } from 'pinia'
import localDicts from '@/constant/dict/index'
import { fetchDict } from '@/api/common'
import type { IDict } from '@/typings'

const storeKey = 'DICT_STORE'
let IS_INIT = false

export const useDictStore = defineStore({
  id: storeKey,
  persist: {
    enabled: true,
    strategies: [
      {
        key: storeKey,
        storage: localStorage,
      },
    ],
  },
  state() {
    return {
      dictList: <IDict[]>[],
      isInit: false,
    }
  },
  getters: {
    findByKey() {
      return {}
    },
    items() {
      return (code: string) => {
        return this.dictList.find(item => item.code == code)?.items ?? []
      }
    },
    filter() {
      return (value: string, code: string) => {
        return (
          this.dictList.find(item => item.code == code)?.items.find(item => item.value == value)
            ?.label ?? value
        )
      }
    },
  },
  actions: {
    // 获取字典数据
    async initHandler(isLogin: boolean) {
      if (isLogin && !this.isInit) {
        this.isInit = true
        return fetchDict().then(({ data }) => {
          this.dictList = [...data, ...localDicts]
        })
      }
    },
  },
})
