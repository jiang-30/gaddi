<template>
  <el-sub-menu v-if="menu.children && menu.children.length > 0" :index="menu.name || menu.id" teleported>
    <template #title>
      <AppIcon v-if="menu.icon" :size="18" :icon="menu.icon" />
      <span>{{ menu.title }}</span>
    </template>
    <AppMenuItem v-for="item in menu.children" :key="item.name" :menu="item"></AppMenuItem>
  </el-sub-menu>

  <el-menu-item v-else :index="menu.name || menu.id">
    <AppIcon v-if="menu.icon" :size="18" :icon="menu.icon" />
    <span>{{ menu.title }}</span>
  </el-menu-item>
</template>

<script lang="ts" setup>
import type { IMenu } from "@/typings";

defineOptions({
  name: 'AppMenuItem'
})

defineProps<{ menu: IMenu }>();
</script>
