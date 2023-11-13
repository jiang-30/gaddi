<template>
  <section class="translation-container">
    <!-- 等级, 列表, 等级列表, 复制 -->

    <nav class="translation-nav">
      <img class="logo-img" src="@/assets/images/alogo.png" alt="" />

      <el-menu
        style="flex: 1 0 0"
        mode="horizontal"
        :default-active="route.path"
        router
        :background-color="bgColor"
        :text-color="textColor"
      >
        <el-menu-item index="/translation">翻译</el-menu-item>
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

    <header class="translation-header"></header>

    <main class="translation-main">
      <RouterView />
    </main>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import { useRoute } from 'vue-router'
import { useUserStore, useDictStore } from '@/store'
import { ElMessageBox } from 'element-plus'

const bgColor = '#3364e4'
const textColor = '#FFFFFF'
const route = useRoute()
const userStore = useUserStore()

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
  height: 24vw;
  background: url('@/assets/images/banner.png') center / cover no-repeat;
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
  padding: 0 10px;
  height: 62px;
  color: #fff;
  gap: 20px;
  /* box-shadow: 2px 2px 2px 2px var(--el-menu-bg-color);  */
}
.el-menu--horizontal {
  border-bottom: none;
}

.translation-nav .logo-img {
  height: 100%;
  width: auto;
}

.translation-nav .level {
}
</style>
