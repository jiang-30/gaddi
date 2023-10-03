<template>
  <el-config-provider :size="size" :zIndex="zIndex" :locale="zhCn">
    <RouterView />
  </el-config-provider>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { watchEffect, onMounted } from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useConfigStore } from './store'
import { useSearchBar } from '@/hooks/use-search-bar'

NProgress.configure({ showSpinner: false })
const configStore = useConfigStore()
const zIndex = 2000;
const size = "default";

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

const { openSearchBar } = useSearchBar()

onMounted(() => {
  window.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === " ") {
      openSearchBar()
    }
  })
})
</script>
