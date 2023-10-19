<template>
  <section class="app-layout-container bg-page">
    <!-- 状态栏 -->
    <header class="app-layout-header">
      <AdminHeader />
    </header>
    <!-- 侧边栏 -->
    <AdminiAside class="app-layout-aside" />
    <!-- tab栏和面包屑 -->
    <nav class="app-layout-nav">
      <AdminTab />
      <AdminBreadcrumb />
    </nav>
    <!-- 内容区 -->
    <main class="app-layout-main" ref="mainRef">
      <RouterView v-slot="{ Component, route }">
        <!-- <transition name="main" mode="out-in" appear></transition> -->
        <keep-alive :max="10" :include="routeStore.keepAliveList">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </RouterView>
    </main>
    <!-- 脚注 -->
    <footer class="app-layout-footer">
      <AdminFooter />
    </footer>
  </section>
</template>

<script lang="ts" setup>
import { ref, watch, onBeforeUnmount } from 'vue'
import { RouterView } from 'vue-router'
import AdminiAside from './components/AdminAside.vue'
import AdminHeader from './components/AdminHeader.vue'
import AdminBreadcrumb from './components/AdminBreadcrumb.vue'
import AdminTab from './components/AdminTab.vue'
import AdminFooter from './components/AdminFooter.vue'
import { useMenuStore, useRouteStore, useConfigStore } from '@/store'
import { useEventBus, useResizeObserver } from '@vueuse/core'

const menuStore = useMenuStore()
const routeStore = useRouteStore()
const configStore = useConfigStore()
const mainRef = ref()
const eventBus = useEventBus('container-resize')
// const viewStyle = computed(() => {
//   return {
//     // 'width': configStore.containerWidth + 'px',
//     // 'height': configStore.containerHeight + 'px',
//     'min-width': configStore.minWidth + 'px',
//     'min-height': configStore.minHeight + 'px'
//   }
// })

watch(menuStore.menus, () => {
  console.log('useMenuStore menus change')
})

// 监听 main 区域的 resize
useResizeObserver(mainRef, event => {
  const { width, height } = event[0].contentRect
  configStore.containerWidth = width
  configStore.containerHeight = height
  eventBus.emit('container-resize')
})
// 监听 body 区域的 resize
useResizeObserver(document.body, event => {
  const { width } = event[0].contentRect
  if (width <= configStore.minWidth && !configStore.asideCollapse) {
    configStore.asideCollapse = true
  }
})

onBeforeUnmount(() => {
  eventBus.reset()
})
</script>

<style scoped>
.app-layout-container {
  display: grid;
  grid-template:
    'header header' auto
    'aside nav' auto
    'aside main' 1fr
    'aside footer' auto / auto 1fr;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.app-layout-header {
  grid-area: header;
  overflow: hidden;
}

.app-layout-aside {
  grid-area: aside;
}

.app-layout-nav {
  grid-area: nav;
  min-width: 0;
}

.app-layout-main {
  grid-area: main;
  min-width: 0;
  overflow: hidden;
}

.app-layout-footer {
  grid-area: footer;
  min-width: 0;
}

.main-enter-active {
  transition: 0.2s;
}

.main-leave-active {
  transition: 0.15s;
}

.main-enter-from {
  opacity: 0;
  margin-left: -20px;
}

.main-leave-to {
  opacity: 0;
  margin-left: 20px;
}
</style>
