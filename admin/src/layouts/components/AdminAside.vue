<template>
  <section v-if="showAside" class="app-aside" :class="asideCollapse ? 'app-aside__close' : 'app-aside_open'"
    :style="{ backgroundColor: asideBgColor }">
    <main class="app-aside__main">
      <el-scrollbar>
        <AppMenu mode="vertical" :menuList="menuList" :collapse="asideCollapse" :bgColor="asideBgColor"
          :text-color="asideTextColor"></AppMenu>
      </el-scrollbar>
    </main>
    <footer class="app-aside__footer">
      <div class="app-aside-collapse" @click="settingStore.asideCollapse = !asideCollapse">
        <el-icon class="app-aside-collapse__icon" :size="24" :color="asideTextColor">
          <Expand v-if="asideCollapse" />
          <Fold v-else />
        </el-icon>
      </div>
    </footer>
  </section>
</template>

<script lang="ts" setup>
import { Expand, Fold } from '@element-plus/icons-vue'
import { useMenuStore, useConfigStore } from '@/store'
import { storeToRefs } from 'pinia'
import { computed } from 'vue';
import AppMenu from './AppMenu.vue'

const settingStore = useConfigStore()
const menuStore = useMenuStore()
const { asideBgColor, asideTextColor, asideCollapse } = storeToRefs(settingStore)

// 菜单数据
const menuList = computed(() => {
  const menuName = useConfigStore().showTopMenuNav ? menuStore.currentMenuStack[0]?.name : undefined
  return menuStore.getMenuTree(menuName)
})

// 是否展示菜单栏
const showAside = computed(() => {
  return settingStore.showAside && menuList.value.length
})

</script>

<style scoped>
.app-aside {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* .app-aside-section {
  flex: 1 0 0;
  display: flex;
} */

.app-aside__main {
  flex: 1 1 0;
  overflow: hidden;
  box-sizing: content-box;
  transition: all 0.3s linear;
}

.app-aside.app-aside_open .app-aside__main {
  width: 200px;
}

.app-aside.app-aside__close .app-aside__main {
  width: 64px;
}

.app-aside__footer {
  flex-shrink: 0;
  border-top: 1px solid #1d2732;
}

.app-aside-collapse {
  display: flex;
  justify-content: center;
  padding: 5px 10px;
  cursor: pointer;
}

.app-menu.el-menu {
  border-right: none;
}

.app-menu :deep(.el-menu-item.is-active) {
  background-color: rgb(0 0 0 / 10%);
}

.app-menu.el-menu--vertical :deep(.el-menu-item.is-active) {
  border-left: 2px solid var(--el-menu-active-color);
}

.app-menu :deep(.el-sub-menu.is-active > .el-sub-menu__title) {
  color: var(--el-menu-active-color) !important;
}

.app-menu :deep(.el-sub-menu__title:hover),
.app-menu :deep(.el-menu-item:hover) {
  background-color: var(--el-menu-hover-bg-color) !important;
}
</style>
