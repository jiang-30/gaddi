<template>
  <!-- Search -->
  <el-tooltip content="功能搜索">
    <el-button link @click="onSearch">
      <AppIcon icon="d:search" :size="26" :color="textColor" />
    </el-button>
  </el-tooltip>

  <!-- Debug -->
  <el-tooltip v-if="configStore.showDebugBtn" content="系统异常">
    <el-button link @click="onNav('Debug')">
      <AppIcon icon="d:bug" :size="26" :color="textColor" />
    </el-button>
  </el-tooltip>

  <!-- Help -->
  <el-tooltip v-if="configStore.showHelpBtn" content="帮助文档">
    <el-button link @click="onNav('Help')">
      <AppIcon icon="d:help" :size="22" :color="textColor" />
    </el-button>
  </el-tooltip>

  <!-- FullScreen -->
  <el-tooltip v-if="configStore.showFullscreenBtn" content="全屏">
    <el-button link @click="toggle">
      <AppIcon
        :icon="isFullscreen ? 'd:fullscreen-exit' : 'd:fullscreen'"
        :size="28"
        :color="textColor"
      />
    </el-button>
  </el-tooltip>

  <!-- ThemeMode -->
  <el-tooltip v-if="configStore.showThemeBtn" content="暗黑模式">
    <el-button
      link
      @click="configStore.themeMode = configStore.themeMode == 'dark' ? 'light' : 'dark'"
    >
      <AppIcon
        :icon="configStore.themeMode == 'dark' ? 'd:sunny' : 'd:moon'"
        :size="23"
        :color="textColor"
      />
    </el-button>
  </el-tooltip>
</template>

<script lang="ts" setup>
import { useSearchBar } from '@/hooks/use-search-bar'
import { useConfigStore } from '@/store'
import { useFullscreen } from '@vueuse/core'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

defineProps<{
  textColor: string
}>()

const router = useRouter()
const configStore = useConfigStore()
const { isFullscreen, toggle } = useFullscreen()
const { openSearchBar } = useSearchBar()

onMounted(() => {
  window.addEventListener('keydown', event => {
    if (event.ctrlKey && event.key === 'k') {
      openSearchBar()
    }
  })
})

// 页面跳转
function onNav(pageName: string) {
  router.push({ name: pageName })
}

// 功能搜索
const onSearch = () => {
  openSearchBar()
}
</script>
