<template>
  <div class="app-title" @click="$router.push({ name: routeStore.indexPageName })">
    <img class="app-title-logo" :src="configStore.appLogo" alt="logo" />
    <h1 class="app-title-text">{{ configStore.appTitle }}</h1>
  </div>
</template>

<script lang="ts" setup>
import { useRouteStore, useConfigStore } from '@/store'

const configStore = useConfigStore()
const routeStore = useRouteStore()

defineProps<{
  textColor: string
}>()
</script>

<style scoped>
.app-title {
  display: flex;
  align-items: center;
  height: 48px;
  min-width: 200px;
  padding-left: 10px;
}

.app-title:hover {
  cursor: pointer;
}

.app-title-logo {
  width: 44px;
  height: 44px;
  object-fit: contain;
}

.app-title-text {
  word-break: keep-all;
  margin-left: 10px;
  line-height: 1;
  font-size: 18px;
  font-weight: 600;
  color: v-bind(textColor);
}
</style>
