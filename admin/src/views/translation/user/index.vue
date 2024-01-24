<route lang="yaml">
meta:
  isEnabled: true
  layout: admin
</route>

<template>
  <PageContainer>
    <DCrud
      :option="option"
      :api="api"
      :search-model="searchModel"
      :before-fecth="beforeFecthHandle"
    >
      <template #row-action="{ row }">
        <el-button text size="small" type="primary" @click="onResetPassword(row)">
          重置密码
        </el-button>
      </template>
    </DCrud>
  </PageContainer>
</template>

<script setup lang="ts">
import { useModel } from './model'
import { fetchUpdatePassword } from '@/api/admin/user'
import type { IDCrudBeforeFetchFn } from '@gaddi/components'
import { ElMessageBox, ElNotification } from 'element-plus'
import { ref } from 'vue'

const { option, api } = useModel()
const searchModel = ref({
  layoutType: 'translation',
})

const beforeFecthHandle: IDCrudBeforeFetchFn = (type, config) => {
  if (type == 'create') {
    config.data.layoutType = 'translation'
    config.data.roleCode = 'TRANSLATION'
  }
}

const onResetPassword = (row: any) => {
  ElMessageBox({
    title: '提示',
    message: `确定重置【${row.username}】用户密码吗`,
    type: 'warning',
  })
    .then(() => {
      return fetchUpdatePassword(row.id)
    })
    .then(() => {
      ElNotification({
        title: '提示',
        message: '密码重置成功',
        type: 'success',
      })
    })
    .catch(() => {})
}
</script>
