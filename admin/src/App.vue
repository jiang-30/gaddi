<template>
  <el-config-provider :size="size" :zIndex="zIndex" :locale="zhCn">
    <UseNetwork v-slot="{ isOnline }">
      <RouterView v-if="isOnline" />
      <AppOffline v-else></AppOffline>
    </UseNetwork>
  </el-config-provider>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { UseNetwork } from '@vueuse/components'
import AppOffline from './components/AppOffline.vue'
import { watchEffect } from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useConfigStore } from './store'

NProgress.configure({ showSpinner: false })
const configStore = useConfigStore()
const zIndex = 2000
const size = 'default'

// 设置应用title
watchEffect(() => {
  document.title = configStore.title
})

// 初始化主题
watchEffect(() => {
  const el = document.documentElement
  if (configStore.themeMode == 'dark') {
    el.classList.add('dark')
  } else {
    el.classList.remove('dark')
  }
})

// 初始化主题色
watchEffect(() => {
  configStore.generateThemeColor()
})

// 灰色模式
watchEffect(() => {
  if (configStore.grayModel) {
    document.body.classList.add('gray-model')
  } else {
    document.body.classList.remove('gray-model')
  }
})

// NProgress 进度条
watchEffect(() => {
  if (configStore.isLoading) {
    NProgress.start()
  } else {
    NProgress.done()
  }
})
</script>
