<template>
  <el-sub-menu v-if="menu.children && menu.children.length > 0" :index="menu.name">
    <template #title>
      <AppIcon v-if="menu.icon" :size="18" :icon="menu.icon" />
      <span>{{ menu.title }}</span>
    </template>
    <template #default>
      <AppMenuItem v-for="item in menu.children" :key="item.name" :menu="item"></AppMenuItem>
    </template>
  </el-sub-menu>

  <el-menu-item v-else :index="menu.name">
    <AppIcon v-if="menu.icon" :size="18" :icon="menu.icon" />
    <span>{{ menu.title }}</span>
  </el-menu-item>
</template>

<script lang="ts" setup>
import type { IMenu } from "@/typings";
import AppMenuItem from './AppMenuItem.vue'

defineOptions({
  name: "AppMenuItem"
})
defineProps<{ menu: IMenu }>();
</script>
