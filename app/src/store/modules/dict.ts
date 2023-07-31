import { defineStore } from 'pinia'
import localDicts from '@/assets/dict/index'
import { fetchDict } from '@/api/common'
import type { IDict, IDictItem } from '@/typings'

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
      dictList: <IDict[]>[...localDicts],
      isInit: false,
    }
  },
  getters: {
    findByKey() {
      return {}
    },
    items() {
      return (code: string): IDictItem[] => {
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
    // 设置字典列表
    async setDictList(data: IDict[]) {
      this.dictList = [...data, ...localDicts]
    },

    // 获取字典数据
    async init(isLogin: boolean) {
      // if (isLogin && !this.isInit) {
      //   this.isInit = true
      //   return fetchDict().then(({ data }) => {
      //     this.setDictList(data)
      //   })
      // }
    },

    // 清除数据
    async clear() {
      this.$reset()
    }
  },
})
