<route lang="yaml">
meta:
  isEnabled: true
  title: 翻译
  layout: translation
  isIndex: true
</route>

<template>
  <section class="translation-wrapper" v-loading="loading">
    <section class="translation-box">
      <header class="translation-header">
        <el-form-item label="密级">
          <el-select v-model="formModel.securityLevel">
            <el-option
              v-for="item in secrityLevelList"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
      </header>
      <main class="translation-main">
        <el-input
          class="translation-main-input"
          :class="{ 'translation-main-input__mw': formModel.source.lang == 'mw' }"
          v-model="formModel.source.value"
          type="textarea"
          resize="none"
          show-word-limit
          max-length="1500"
          :placeholder="formModel.source.placeholder"
        ></el-input>
      </main>
      <footer class="translation-footer">
        <el-tag>{{ formModel.source.langText }}</el-tag>
        <div class="ml-auto"></div>
        <el-button :icon="Delete" circle @click="clearHandle"></el-button>
      </footer>
    </section>
    <section class="translation-action">
      <el-button type="primary" :loading="loading" :icon="Switch" @click="onTurn"></el-button>
      <el-button type="primary" :loading="loading" @click="translationHandle">翻译</el-button>
    </section>
    <section class="translation-box">
      <header class="translation-header"> </header>
      <main class="translation-main">
        <div
          class="translation-main-result"
          :class="{ 'translation-main-result__mw': formModel.result.lang == 'mw' }"
        >
          <div v-if="formModel.result.value">{{ formModel.result.value }}</div>
          <div v-else style="color: #999">{{ formModel.result.placeholder }}</div>
        </div>
      </main>
      <footer class="translation-footer">
        <el-tag>{{ formModel.result.langText }}</el-tag>
        <div class="ml-auto"></div>
        <el-button :icon="List" circle @click="navHandle"></el-button>
        <el-button :icon="CopyDocument" circle @click="copyHandle"></el-button>
      </footer>
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElDialog, ElMessage, ElMessageBox } from 'element-plus'
import { CopyDocument, List, Delete, Switch } from '@element-plus/icons-vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useClipboard } from '@vueuse/core'
import { createContent } from '@/api/translation/index'
import { useUserStore, useDictStore } from '@/store'
import replaceJson from '@/assets/json/replae.json'

const router = useRouter()
const { copy } = useClipboard()
const secrityLevelList = useDictStore().items('security_level')
const loading = ref(false)
const formModel = ref({
  securityLevel: '1',
  source: {
    value: '',
    lang: 'zh',
    langText: '国家通用语言',
    placeholder: '请输入要翻译的内容',
  },
  result: {
    value: '',
    lang: 'mw',
    langText: '传统蒙古文',
    placeholder: 'ᠣᠷᠴᠢᠭᠤᠯᠬᠤ ᠠᠭᠤᠯᠭ᠎ᠠ ᠶᠢ ᠣᠷᠣᠭᠤᠯᠤᠭᠠᠷᠠᠶ᠃',
  },
})

const clearHandle = () => {
  formModel.value.source.value = ''
  formModel.value.result.value = ''
}

const onTurn = () => {
  clearHandle()
  const middle = { ...formModel.value.source }
  formModel.value.source = { ...formModel.value.result }
  formModel.value.result = { ...middle }
}

const translationHandle = () => {
  if (!formModel.value.source.value) {
    ElMessage.warning('请输入要翻译的内容')
    return
  }
  loading.value = true
  axios
    .get(
      `/api/translation/index.php?act=chat_gpt&op=index&content=${formModel.value.source.value}&frm=${formModel.value.source.lang}&to=${formModel.value.result.lang}`,
    )
    .then(res => {
      // 汉到蒙语的时候对部分词语进行替换
      if (formModel.value.source.lang == 'zh') {
        replaceJson.forEach(item => {
          res.data = res.data.replaceAll(item[0], item[1])
        })
      }

      formModel.value.result.value = res.data
      return createContent({
        source: formModel.value.source.value,
        result: formModel.value.result.value,
        sourceLang: formModel.value.source.lang,
        resultLang: formModel.value.result.lang,
        author: useUserStore().userInfo.username,
        level: formModel.value.securityLevel,
      })
    })
    .finally(() => {
      loading.value = false
    })
}

const navHandle = () => {
  router.push('/translation/list-user')
}

const copyHandle = () => {
  if (!formModel.value.result.value) {
    ElMessage.warning('没有内容')
    return
  }
  copy(formModel.value.result.value).then(() => {
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
  height: 60px;
  display: flex;
  align-items: center;
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

.translation-main :deep(.el-textarea__inner) {
  padding: 15px;
  word-break: break-word;
}

.translation-main .translation-main-input__mw {
  writing-mode: vertical-lr;
  text-orientation: sideways-right;
}
.translation-main .translation-main-input__mw :deep(.el-textarea__inner) {
  display: table-column;
  writing-mode: vertical-lr;
  text-orientation: sideways-right;
  white-space: wrap;
  word-break: break-word;
  /* overflow-x: scroll;
    overflow-x: hidden; */
}

.translation-main .translation-main-result {
  width: 100%;
  height: 100%;
  font-size: inherit;
  line-height: 1;
  color: inherit;
  word-break: break-word;
  padding: 15px;
  overflow-y: auto;
  overflow-x: hidden;
}

.translation-main .translation-main-result__mw {
  writing-mode: vertical-lr;
  text-orientation: sideways-right;
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
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
}

.translation-action .el-button {
  width: 70px;
  margin: 0;
}
</style>
