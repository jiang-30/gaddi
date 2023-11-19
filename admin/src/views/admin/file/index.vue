<!--
 * @Author: jiang-30 514770300@qq.com
 * @Date: 2023-11-15 09:52:59
 * @LastEditors: jiang-30 514770300@qq.com
 * @LastEditTime: 2023-11-19 16:32:44
 * @FilePath: \gaddi\admin\src\views\admin\file\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<route lang="yaml">
meta:
  isEnabled: true
  layout: admin
</route>

<template>
  <PageContainer>
    <DCrud ref="crudRef" :option="option" :api="api">
      <template #action>
        <!-- <el-button type="primary" @click="uploadFileHandle">上传文件</el-button> -->
        <input type="file" @change="uploadFileHandle" />
      </template>
    </DCrud>
  </PageContainer>
</template>

<script setup lang="ts">
import { ElLoading } from 'element-plus'
import { useModel } from './model'
import { uploadFile } from '@/api/common/index'
import type { IDCrud } from '@gaddi/components'
import { ref } from 'vue'

const crudRef = ref<IDCrud>()
const { option, api } = useModel()

const uploadFileHandle = (event: any) => {
  const file = event.target?.files[0]

  if (file) {
    const loading = ElLoading.service({
      lock: true,
      text: '正在上传中...',
      background: 'rgba(0, 0, 0, 0.1)',
    })
    uploadFile(file)
      .then(res => {
        crudRef.value?.refresh(true)
      })
      .finally(() => {
        loading.close()
      })
  }
}
</script>
