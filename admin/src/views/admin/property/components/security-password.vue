<template>
  <el-dialog class="d-dialog" v-model="visible" title="配置" width="800px" align-center>
    <div class="m-4">
      <DForm :form-model="formModel" :option="option"></DForm>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { IDFormOption } from '@gaddi/components'

const visible = ref(false)
const formModel = ref({})
const option: IDFormOption = {
  labelWidth: 100,
  fields: [
    {
      label: '名称',
      prop: 'title',
      type: 'input',
    },
    {
      label: '版权信息',
      prop: 'copyright',
      type: 'input',
    },
    {
      label: 'LOGO',
      prop: 'logo',
      type: 'image',
    },
    {
      label: 'BANNER',
      prop: 'banner',
      type: 'image',
    },
  ],
}

const open = (row: any) => {
  visible.value = true
}

defineExpose({
  open,
})
</script>
