<route lang="yaml">
meta:
  isEnabled: true
  isStatic: true
  title: 翻译
  layout: translation
</route>

<template>
  <section class="translation-wrapper">
    <section class="translation-box">
      <header class="translation-header">
        <el-tag>中文</el-tag>
      </header>
      <main class="translation-main">
        <el-input v-model="source" type="textarea"></el-input>
      </main>
      <footer class="translation-footer"></footer>
    </section>
    <section class="translation-action">
      <el-button type="primary" @click="translationHandle">翻译</el-button>
    </section>
    <section class="translation-box">
      <header class="translation-header">
        <el-tag>蒙文</el-tag>
      </header>
      <main class="translation-main">{{ result }}</main>
      <footer class="translation-footer">
        <el-button :icon="List" circle @click="navHandle"></el-button>
        <el-button :icon="CopyDocument" circle @click="copyHandle"></el-button>
      </footer>
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElDialog, ElMessage, ElMessageBox } from 'element-plus'
import { CopyDocument, List } from '@element-plus/icons-vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useClipboard } from '@vueuse/core'

const router = useRouter()
const { copy } = useClipboard()
const source = ref('你好')
const result = ref('')

const translationHandle = () => {
  axios
    .get(`/api/translation/index.php?act=chat_gpt&op=index&content=${source.value}&frm=zh&to=mw`)
    .then(res => {
      result.value = res.data
    })
}

const navHandle = () => {
  router.push('/translation/list')
}

const copyHandle = () => {
  copy(result.value).then(() => {
    ElMessage.success('复制成功')
  })
}
</script>

<style scoped>
.translation-wrapper {
  display: flex;
  padding: 80px 50px 200px 50px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
.translation-box {
  flex: 1 0 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  border: 1px solid #999;
}

.translation-header {
  padding: 10px;
  text-align: center;
}

.translation-main {
  flex: 1 0 0;
  min-height: 0;
}

.translation-main .el-textarea {
  width: 100%;
  height: 100%;
}

.translation-footer {
  display: flex;
  justify-content: flex-end;
  gap: 5px;
  padding: 5px 20px 10px 10px;
}

.translation-action {
  margin: 15px;
  align-self: center;
}
</style>
