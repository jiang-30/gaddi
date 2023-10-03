<route lang="yaml">
meta:
  isEnabled: true
  isStatic: true
  title: 首页
  icon: mdi:home
  name: Home
  path: /
  layout: admin
  isTab: true
  isShowMenu: true
  sort: -1
</route>

<template>
  <div class="h-full w-full flex items-center justify-center">
    <span class="text-5xl text-orange-500"> 欢迎您！ </span>
  </div>
</template>

<script lang="ts" setup>
import { useMenuStore } from '@/store'

// console.log(useMenuStore().menuTree)
// console.log(useMenuStore().getMenuTree())
defineOptions({
  name: 'Dashboard'
})
</script>
