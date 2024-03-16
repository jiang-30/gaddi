<template>
  <el-dialog class="d-dialog" v-model="visible" title="配置" width="800px" align-center>
    <div class="m-4">
      <DForm :form-model="formModel" :option="option" @save="onSave"></DForm>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { IDFormOption } from '@gaddi/components'

const emit = defineEmits(['save-property'])

let rowData: any = null
const visible = ref(false)
const formModel = ref({})
const option: IDFormOption = {
  labelWidth: 100,
  fields: [
    {
      label: '名称',
      prop: 'appTitle',
      type: 'input',
    },
    {
      label: '版权信息',
      prop: 'appCopyright',
      type: 'input',
    },
    {
      label: 'LOGO',
      prop: 'appLogo',
      type: 'image',
      imageWidth: '80px',
      imageHeight: '80px',
      prefix: '/api',
    },
    {
      label: 'TitleImage',
      prop: 'appTitleImage',
      type: 'image',
      imageWidth: '200px',
      imageHeight: '60px',
      prefix: '/api',
    },
    {
      label: 'BANNER',
      prop: 'appBanner',
      type: 'image',
      imageWidth: '450px',
      imageHeight: '150px',
      prefix: '/api',
    },
  ],
}

const onSave = (data: any) => {
  const params = {
    ...rowData,
    value: data,
  }
  emit('save-property', params)
}

const close = () => {
  visible.value = false
}

const open = (row: any) => {
  rowData = row
  formModel.value = row.value
  visible.value = true
}

defineExpose({
  open,
  close,
})
</script>
