<template>
  <section class="translation-container">
    <!-- 等级, 列表, 等级列表, 复制 -->

    <nav class="translation-nav">
      <img v-if="configStore.appTitleImage" class="logo-img" :src="configStore.appTitleImage" />
      <img v-else class="logo-img" src="@/assets/images/alogo.png" alt="" />

      <el-menu
        style="flex: 1 0 0"
        mode="horizontal"
        :default-active="route.path"
        router
        :background-color="bgColor"
        :text-color="textColor"
      >
        <el-menu-item index="/translation">翻译</el-menu-item>
        <el-menu-item index="/translation/list-user">我的翻译</el-menu-item>
        <el-menu-item index="/translation/list">列表</el-menu-item>
      </el-menu>

      <div>
        <span>{{ username }}</span>
        <el-text type="danger">
          ({{ useDictStore().filter(userStore.userInfo.level, 'security_level') }})
        </el-text>
      </div>

      <el-button type="primary" text @click="logoutHandle">退出</el-button>
    </nav>

    <header class="translation-header">
      <img
        v-if="configStore.appBanner"
        class="translation-header-banner"
        :src="configStore.appBanner"
      />
      <img v-else class="translation-header-banner" src="@/assets/images/banner.png" />
    </header>

    <main class="translation-main">
      <RouterView />
    </main>

    <footer v-if="configStore.appCopyright" class="translate-footer">
      {{ configStore.appCopyright }}
    </footer>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterView } from 'vue-router'
import { useRoute } from 'vue-router'
import { useUserStore, useDictStore, useConfigStore } from '@/store'
import { ElMessageBox } from 'element-plus'

const bgColor = '#3364e4'
const textColor = '#FFFFFF'
const route = useRoute()
const userStore = useUserStore()
const configStore = useConfigStore()

const username = computed(() => {
  return userStore.userInfo.nickname || userStore.userInfo.username
})

const logoutHandle = () => {
  ElMessageBox.confirm('确定要退出系统吗', '提示', { type: 'warning' })
    .then(async () => {
      userStore.logoutHandler()
    })
    .catch(() => {})
}
</script>

<style scoped>
.translation-container {
  padding-top: 60px;
}

.translation-header {
  width: 100%;
  height: 20vw;
}

.translation-header-banner {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.translation-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  --el-menu-bg-color: #3364e4;
  --el-menu-active-color: #fff;
  /* --el-menu-active-color:  */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--el-menu-bg-color);
  height: 62px;
  color: #fff;
  gap: 20px;
  /* box-shadow: 2px 2px 2px 2px var(--el-menu-bg-color);  */
}
.el-menu--horizontal {
  border-bottom: none;
}

.translation-nav .logo-img {
  width: 200px;
  height: 60px;
  object-fit: cover;
}

.translation-nav .level {
}

.translate-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60px;
  color: #999;
  font-size: 14px;
  background-color: #f1f1f1;
}
</style>
