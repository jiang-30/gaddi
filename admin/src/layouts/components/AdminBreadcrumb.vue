<template>
  <el-breadcrumb v-if="showBreadcrumb && isShow" style="padding: 10px 10px 0" separator="/">
    <el-breadcrumb-item class="app-breadcrumb-item" v-for="item in menuStore.currentMenuStack" :key="item.name"
      :to="getTo(item)">
      <AppIcon v-if="item.icon" :icon="item.icon"></AppIcon>
      <span>{{ item.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { useMenuStore, useConfigStore } from '@/store'
import { computed } from 'vue';
const menuStore = useMenuStore()

const showBreadcrumb = computed(() => {
  return useConfigStore().showBreadcrumb
})

const isShow = computed(() => {
  return menuStore.currentMenuStack.length && menuStore.currentMenuStack.length > 1
})

function getTo(item: any) {
  if (item.type == 'page') {
    return { name: item.name }
  } else {
    return {}
  }
}
</script>

<style scoped>
.app-breadcrumb-item :deep(.el-breadcrumb__inner) {
  display: inline-flex;
  align-items: center;
}
</style>
