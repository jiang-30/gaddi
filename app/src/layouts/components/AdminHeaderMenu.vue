<template>
  <AppMenu v-if="showMenu" :menuList="menuList" :collapse="false" :bg-color="bgColor" :text-color="textColor"
    mode="horizontal"></AppMenu>
</template>

<script lang="ts" setup>
import AppMenu from './AppMenu.vue'
import { useConfigStore, useMenuStore } from '@/store'

defineProps<{
  bgColor: string
  textColor: string
}>()

const configStore = useConfigStore()
const menuStore = useMenuStore()

// 是否展示
const showMenu = computed(() => {
  return configStore.showTopMenu || configStore.showTopMenuNav
})

// 菜单数据
const menuList = computed(() => {
  if (configStore.showTopMenu) {
    return menuStore.getMenuTree()
  } else {
    return menuStore.getMenuTree().map(item => ({ ...item, children: [] }))
  }
})
</script>
