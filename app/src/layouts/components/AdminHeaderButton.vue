<template>
  <!-- Help -->
  <el-tooltip v-if="configStore.showHelpBtn" content="帮助文档">
    <el-button link @click="onNav('Help')">
      <el-icon :size="26" :color="textColor">
        <icon-mdi-help-circle-outline />
      </el-icon>
    </el-button>
  </el-tooltip>

  <!-- FullScreen -->
  <el-tooltip v-if="configStore.showFullscreenBtn" content="全屏">
    <el-button link @click="toggle">
      <el-icon :size="28" :color="textColor">
        <icon-mdi-fullscreen-exit v-if="isFullscreen" />
        <icon-mdi-fullscreen v-else />
      </el-icon>
    </el-button>
  </el-tooltip>

  <!-- ThemeMode -->
  <el-tooltip v-if="configStore.showThemeBtn" content="暗黑模式">
    <el-button link @click="configStore.themeMode = configStore.themeMode == 'dark' ? 'light' : 'dark'">
      <el-icon :size="26" :color="textColor">
        <icon-mdi-white-balance-sunny v-if="configStore.themeMode == 'dark'" />
        <icon-mdi:moon-waning-crescent v-else />
      </el-icon>
    </el-button>
  </el-tooltip>
</template>

<script lang="ts" setup>
import { useConfigStore } from '@/store'
import { useFullscreen } from '@vueuse/core'

defineProps<{
  textColor: string
}>()

const router = useRouter()
const configStore = useConfigStore()
const { isFullscreen, toggle } = useFullscreen()

// 页面跳转
function onNav(pageName: string) {
  router.push({ name: pageName })
}
</script>
