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
      label: '最小长度',
      prop: 'min',
      type: 'input',
    },
    {
      label: '最大长度',
      prop: 'max',
      type: 'input',
    },
    {
      label: '字符要求',
      prop: 'check',
      type: 'checkbox',
      dictData: [
        { label: '数字字符', value: '1' },
        { label: '大小写字符', value: '2' },
        { label: '特殊字符', value: '3' },
      ],
    },
    {
      label: '特殊字符',
      prop: 'string',
      type: 'input',
      listen(model) {
        return model.check && model.check.includes('3')
      },
    },
    {
      label: '规则说明',
      prop: 'message',
      type: 'textarea',
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
