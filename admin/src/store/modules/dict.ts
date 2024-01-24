import { defineStore } from 'pinia'
import localDicts from '@/assets/dict/index'
import { fetchDict } from '@/api/common'
import type { IDict, IDictItem } from '@/typings'
import { setGaddiDictList } from '@gaddi/components'


const storeKey = 'DICT_STORE'

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
      setGaddiDictList(this.dictList)
    },

    // 获取字典数据
    async init(isInit: boolean, isLogin: boolean) {
      if (isInit && isLogin) {
        return fetchDict().then(({ data }) => {
          this.setDictList(data)
        })
      }
    },

    // 清除数据
    async clear() {
      this.$reset()
    }
  },
})

