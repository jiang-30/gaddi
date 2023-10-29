<route lang="yaml">
meta:
  isEnabled: true
  title: 翻译
  layout: translation
  isIndex: true
</route>

<template>
  <section class="translation-wrapper">
    <section class="translation-box">
      <header class="translation-header">
        <el-tag>国家通用语言</el-tag>
      </header>
      <main class="translation-main">
        <el-input
          class="translation-main-input"
          v-model="source"
          type="textarea"
          resize="none"
          show-word-limit
          max-length="1500"
          placeholder="请输入要翻译的中文内容"
        ></el-input>
      </main>
      <footer class="translation-footer">
        <el-button :icon="Close" circle @click="clearHandle"></el-button>
      </footer>
    </section>
    <section class="translation-action">
      <el-button type="primary" :loading="loading" @click="translationHandle">翻译</el-button>
    </section>
    <section class="translation-box">
      <header class="translation-header">
        <el-tag>传统蒙古文</el-tag>
      </header>
      <main class="translation-main">
        <div class="translation-main-result">
          <div>{{ result }}</div>
        </div>
      </main>
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
import { CopyDocument, List, Close } from '@element-plus/icons-vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useClipboard } from '@vueuse/core'
import { createContent } from '@/api/translation/index'
import { useUserStore } from '@/store'

const router = useRouter()
const { copy } = useClipboard()
const source = ref('你好')
const result = ref(
  'ᠵᠠᠮ ᠳᠡᠭᠡᠷ᠎ᠡ ᠪᠢ ᠭᠠᠭᠴᠠᠭᠠᠷ ᠢᠶᠠᠨ ᠂ ᠭᠠᠷ ᠢᠶᠠᠨ ᠡᠭᠦᠷᠴᠦ ᠠᠯᠬᠤᠵᠤ ᠪᠠᠢᠨ᠎ᠠ᠃ ᠡᠨᠡ ᠬᠡᠰᠡᠭ ᠭᠠᠵᠠᠷ ᠨᠢ ᠮᠢᠨᠦᠬᠢ ᠰᠢᠭ ᠪᠢ ᠪᠠᠰᠠ ᠡᠩ ᠦᠨ ᠦᠶ᠎ᠡ ᠡᠴᠡ ᠪᠡᠨ ᠳᠠᠪᠠᠵᠤ ᠥᠭᠡᠷ᠎ᠡ ᠨᠢᠭᠡ ᠶᠢᠷᠲᠢᠨᠴᠦ ᠳᠦ ᠬᠦᠷᠦᠭᠰᠡᠨ ᠰᠢᠭ᠃ ᠪᠢ ᠨᠠᠷᠭᠢᠶᠠᠨ ᠳᠤ ᠳᠤᠷᠠᠲᠠᠶ ᠂ ᠪᠠᠰᠠ ᠲᠠᠢᠪᠤᠩ ᠪᠠᠢᠬᠤ ᠳᠤᠷᠠᠲᠠᠶ ᠭᠠᠭᠴᠠᠭᠠᠷ ᠠᠮᠢᠳᠤᠷᠠᠬᠤ ᠳᠤᠷᠠᠲᠠᠢ᠃ ᠥᠨᠥ ᠰᠥᠨᠢ ᠂ ᠭᠠᠭᠴᠠᠭᠠᠷ ᠢᠶᠠᠨ ᠡᠨᠡ ᠬᠦ ᠨᠡᠯᠦᠭᠡᠷ ᠰᠠᠷᠠᠨ ᠤ ᠳᠣᠣᠷ᠎ᠠ ᠂ ᠶᠠᠭᠤ ᠪᠦᠬᠦᠨ ᠢ ᠪᠣᠳᠣᠵᠤ ᠂ ᠶᠠᠭᠤ ᠪᠦᠬᠦᠨ ᠢ ᠪᠣᠳᠣᠬᠤ ᠦᠭᠡᠢ ᠪᠠᠶᠢᠵᠤ ᠪᠣᠯᠤᠨ᠎ᠠ ᠂ ᠲᠡᠭᠡᠪᠡᠯ ᠳᠠᠷᠤᠢ ᠡᠷᠬᠡ ᠴᠢᠯᠥᠭᠡ ᠲᠡᠶ ᠬᠥᠮᠦᠨ ᠰᠢᠭ ᠰᠠᠨᠠᠭᠳᠠᠨ᠎ᠠ᠃ ᠡᠳᠦᠷ ᠢᠶᠡᠷ ᠵᠠᠪᠠᠯ ᠬᠢᠬᠦ ᠠᠵᠢᠯ ᠂ ᠵᠠᠪᠠᠯ ᠬᠡᠯᠡᠬᠦ ᠦᠭᠡ ᠶᠢ ᠣᠳᠣ ᠪᠦᠷ ᠣᠶᠢᠰᠢᠶᠠᠬᠤ ᠦᠭᠡᠢ᠃ ᠡᠨᠡ ᠪᠣᠯ ᠭᠠᠭᠴᠠᠭᠠᠷ ᠪᠠᠢᠬᠤ ᠶᠢᠨ ᠰᠠᠶᠢᠨ ᠲᠠᠯ᠎ᠠ ᠂ ᠪᠢ ᠡᠨᠡ ᠬᠢᠵᠠᠭᠠᠷ ᠦᠭᠡᠢ ᠬᠦᠵᠢ ᠶᠢᠨ ᠰᠠᠷᠠᠨ ᠤ ᠥᠩᠭᠡ ᠶᠢ ᠡᠳ᠋ᠯᠡᠪᠡᠯ ᠪᠣᠯᠴᠢᠬᠠᠨ᠎ᠠ᠃ ᠮᠤᠷᠤᠶ ᠰᠠᠷᠤᠶ ᠯᠢᠩᠬᠤ᠎ᠠ ᠶᠢᠨ ᠨᠠᠭᠤᠷ ᠤᠨ ᠳᠡᠭᠡᠷ᠎ᠡ ᠂ ᠪᠠᠷᠠᠯᠠᠬᠤ ᠨᠢ ᠲᠠᠷᠢᠶᠠᠨ ᠭᠠᠵᠠᠷ ᠤᠨ ᠨᠠᠪᠴᠢ᠃ ᠨᠠᠪᠴᠢ ᠠᠴᠠ ᠤᠰᠤ ᠭᠠᠷᠬᠤ ᠨᠢ ᠮᠠᠰᠢ ᠥᠨᠳᠥᠷ ᠂ ᠶᠠᠭ ᠲᠢᠩ ᠲᠢᠩ ᠂ ᠪᠥᠵᠢᠭ ᠦᠨ ᠡᠮᠡᠭᠲᠡᠶ ᠪᠠᠩᠵᠠᠯ ᠰᠢᠭ᠃ ᠳᠠᠪᠬᠤᠷ ᠳᠠᠪᠬᠤᠷ ᠨᠠᠪᠴᠢᠨ ᠤ ᠳᠤᠮᠳᠠ ᠂ ᠬᠡᠰᠡᠭ ᠪᠤᠰᠠᠭ ᠢᠶᠠᠷ ᠴᠠᠭᠠᠨ ᠴᠡᠴᠡᠭ ᠬᠠᠳᠬᠤᠵᠤ ᠂ ᠨᠠ ᠨᠠ ( nio ᠂ nu )  ᠪᠠᠷ ᠨᠡᠭᠡᠭᠡᠭᠳᠡᠵᠦ ᠂ ᠢᠴᠢᠵᠦ ᠰᠢᠷᠪᠡᠭᠡᠲᠦᠭᠰᠡᠨ ᠪᠠᠶᠢᠳᠠᠯ ᠲᠠᠶ ᠪᠠᠷ ᠪᠠᠭᠴᠠ ᠪᠠᠨ ᠴᠣᠬᠢᠨ᠎ᠠ ᠶᠠᠭ ᠨᠢᠭᠡ ᠮᠥᠬᠥᠯᠢᠭ ᠮᠥᠬᠥᠯᠢᠭ ᠭᠡᠷᠡᠯᠲᠦ ᠰᠤᠪᠤᠳ ᠰᠢᠭ ᠂ ᠪᠠᠰᠠ ᠶᠠᠭ ᠬᠥᠬᠡ ᠣᠭᠲᠠᠷᠭᠤᠢ ᠳᠠᠬᠢ ᠣᠳᠣᠳ ᠰᠢᠭ ᠂ ᠪᠠᠰᠠ ᠶᠠᠭ ᠰᠠᠶᠢᠬᠠᠨ ᠰᠠᠶ᠋ᠢ ᠤᠬᠢᠶᠠᠵᠤ ᠭᠠᠷᠭᠠᠭᠰᠠᠨ ᠭᠤᠶᠤ ᠬᠥᠮᠦᠨ ᠰᠢᠭ᠃ ᠰᠠᠯᠬᠢᠨ ᠤ ᠠᠶ᠎ᠠ ᠪᠠᠷ ᠠᠩᠬᠢᠯᠤᠮ᠎ᠠ ᠦᠨᠦᠷ ᠬᠠᠩᠬᠤᠯᠵᠤ ᠂ ᠶᠠᠭ ᠯᠠ ᠬᠣᠯᠠᠬᠢ ᠥᠨᠳᠥᠷ ᠠᠰᠠᠷ ᠳᠡᠭᠡᠷᠡᠬᠢ ᠡᠯᠦᠢ ᠬᠤᠯᠤᠢ ᠳᠠᠭᠤᠤ ᠮᠡᠲᠦ᠃ ᠡᠨᠡ ᠦᠶ᠎ᠡ ᠳᠦ ᠨᠠᠪᠴᠢ ᠪᠠ ᠴᠡᠴᠡᠭ ᠪᠠᠰᠠ ᠨᠢᠭᠡ ᠰᠢᠷᠬᠡᠭ ᠴᠡᠴᠡᠷᠡᠵᠦ ᠂ ᠶᠠᠭ ᠴᠠᠬᠢᠯᠭᠠᠨ ᠴᠠᠬᠢᠯᠬᠤ ᠮᠡᠲᠦ ᠠᠭᠱᠠᠨ ᠵᠠᠭᠤᠷ᠎ᠠ ᠯᠢᠩᠬᠤ᠎ᠠ ᠶᠢᠨ ᠨᠠᠭᠤᠷ ᠤᠨ ᠴᠠᠭᠠᠳᠤ ᠲᠠᠯ᠎ᠠ ᠳᠤ ᠲᠠᠷᠬᠠᠪᠠ᠃ ᠨᠠᠪᠴᠢ ᠨᠢ ᠮᠥᠷᠥ ᠵᠡᠷᠭᠡᠴᠡᠨ ᠨᠢᠭᠲᠠ ᠨᠠᠭᠠᠯᠳᠤᠵᠤ ᠪᠠᠶᠢᠳᠠᠭ ᠂ ᠡᠨᠡ ᠨᠢ ᠶᠠᠭ ᠯᠠ ᠨᠢᠭᠡᠨ ᠵᠤᠷᠪᠤᠰ ᠴᠠᠷᠴᠠᠮᠠᠯ ᠨᠣᠭᠣᠭᠠᠨ ᠳᠣᠯᠭᠢᠶᠠᠨ ᠣᠷᠣᠮ ᠲᠠᠶ ᠪᠣᠯᠤᠭᠰᠠᠨ ᠪᠠᠶᠢᠨ᠎ᠠ᠃ ᠨᠠᠪᠴᠢᠨ ᠤ ᠳᠣᠣᠷ᠎ᠠ ᠰᠤᠳᠠᠯ ( m )  ᠤᠨ ᠤᠰᠤ ᠤᠷᠤᠰᠤᠨ ᠂ ᠬᠠᠯᠬᠠᠯᠠᠭᠠᠳ ᠂ ᠵᠠᠷᠢᠮ ᠥᠩᠭᠡ ᠶᠢ ᠣᠯᠵᠤ ᠦᠵᠡᠬᠦ ᠦᠭᠡᠢ ᠬᠠᠷᠢᠨ ᠨᠠᠪᠴᠢ ᠨᠢ ᠨᠠᠩ ᠰᠠᠢᠬᠠᠨ ᠬᠠᠷᠠᠭᠳᠠᠨ᠎ᠠ᠃',
)
const loading = ref(false)

const translationHandle = () => {
  if (!source.value) {
    ElMessage.warning('请输入要翻译的内容')
    return
  }
  loading.value = true
  axios
    .get(`/api/translation/index.php?act=chat_gpt&op=index&content=${source.value}&frm=zh&to=mw`)
    .then(res => {
      result.value = res.data
      return createContent({
        source: source.value,
        result: result.value,
        sourceLang: 'zh',
        resultLang: 'mw',
        author: useUserStore().userInfo.username,
        level: useUserStore().userInfo.level,
      })
    })
    .finally(() => {
      loading.value = false
    })
}

const clearHandle = () => {
  source.value = ''
}

const navHandle = () => {
  router.push('/translation/list?type=user')
}

const copyHandle = () => {
  if (!result.value) {
    ElMessage.warning('没有内容')
    return
  }
  copy(result.value).then(() => {
    ElMessage.success('复制成功')
  })
}
</script>

<style scoped>
.translation-wrapper {
  width: 100%;
  height: 600px;
  display: flex;
  padding: 60px 50px 100px 50px;
  box-sizing: border-box;
}
.translation-box {
  flex: 1 0 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.translation-header {
  padding: 10px;
  text-align: center;
}

.translation-main {
  flex: 1 0 0;
  min-height: 0;
  border: 1px solid #999;
  border-radius: 4px;
}

.translation-main .el-textarea {
  width: 100%;
  height: 100%;
}

.translation-main .translation-main-input,
.translation-main :deep(.el-textarea__inner) {
  width: 100%;
  height: 100%;
}

.translation-main .translation-main-result {
  /* font-family: 'OrhonChaganTigNew' !important;  */
  width: 100%;
  height: 100%;
  font-size: inherit;
  line-height: 1;
  color: inherit;
  writing-mode: vertical-lr;
  text-orientation: sideways;
  padding: 15px;
  overflow-y: hidden;
  overflow-x: auto;
}

.translation-footer {
  height: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;
}

.translation-action {
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
