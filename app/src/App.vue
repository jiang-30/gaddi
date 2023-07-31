<template>
  <el-config-provider size="default" :zIndex="zIndex" :locale="zhCn">
    <RouterView />
  </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useConfigStore } from './store'

NProgress.configure({ showSpinner: false })
const configStore = useConfigStore()
const zIndex = 2000

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
