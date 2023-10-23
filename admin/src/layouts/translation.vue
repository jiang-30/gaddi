<template>
  <section class="d-container">
    <!-- 等级, 列表, 等级列表, 复制 -->
    <header class="d-header"> header image </header>
    <nav class="d-nav">
      <el-button>等级</el-button>
      <el-button @click="navHandle('/translation')">翻译</el-button>
      <el-button @click="navHandle('/translation/list')">列表</el-button>
      <el-button @click="navHandle('/translation/list')">等级列表</el-button>
      <el-button>退出</el-button>
    </nav>
    <main class="d-main">
      <RouterView />
    </main>
  </section>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useRouter } from 'vue-router'

const router = useRouter()

const navHandle = (path: string) => {
  router.push(path)
}
</script>

<style scoped>
.d-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.d-header {
}

.d-nav {
  display: flex;
  justify-content: center;
  background-color: #ddd;
  padding: 10px 0;
  gap: 20px;
}

.d-main {
  flex: 1 0 0;
  min-height: 0;
}
</style>
