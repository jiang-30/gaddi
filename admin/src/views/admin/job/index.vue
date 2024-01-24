<route lang="yaml">
meta:
  isEnabled: true
  layout: admin
</route>

<template>
  <PageContainer>
    <DCrud ref="crudRef" :option="option" :api="api">
      <template #row-action="{ row }">
        <el-button type="primary" size="small" text @click="updateStatus(row)">
          {{ nextStatus(row.status).label }}
        </el-button>
      </template>
    </DCrud>
  </PageContainer>
</template>

<script setup lang="ts">
import { useModel } from './model'
import { ref } from 'vue'
import type { IDCrud } from '@gaddi/components'
import { ElMessage, ElMessageBox } from 'element-plus'
import { updateJobStatus } from '@/api/admin/job'

const crudRef = ref<IDCrud>()
const { option, api } = useModel()

const nextStatus = (status: string) => {
  if (status == '1') {
    return {
      label: '停止',
      value: '0',
    }
  }
  return {
    label: '启动',
    value: '1',
  }
}

const updateStatus = (row: any) => {
  const status = nextStatus(row.status)
  row.status = status.value
  ElMessageBox.confirm(`确定${status.label}当前任务吗`, { title: '提示', type: 'warning' })
    .then(() => {
      updateJobStatus(row).then(() => {
        ElMessage.success('操作成功')
        crudRef.value?.refresh()
      })
    })
    .catch(err => {})
}
</script>
