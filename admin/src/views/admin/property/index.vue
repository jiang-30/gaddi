<route lang="yaml">
meta:
  isEnabled: true
  layout: admin
</route>

<template>
  <PageContainer>
    <DCrud ref="crudRef" :option="option" :api="api" :before-fetch="beforeFetchHandler">
      <template #row-action="{ row }">
        <el-button type="primary" text size="small" @click="onOpenProperty(row)">配置</el-button>
      </template>
    </DCrud>

    <AdminClientProperty ref="adminClientRef" @save-property="onSaveProperty"></AdminClientProperty>
    <SecurityPassword ref="securityPasswordRef" @save-property="onSaveProperty"></SecurityPassword>
  </PageContainer>
</template>

<script setup lang="ts">
import type { IDCrudBeforeFetchFn, IDCrud, IDModel } from '@gaddi/components'
import { ref } from 'vue'
import { useModel } from './model'
import AdminClientProperty from './components/admin-client-property.vue'
import SecurityPassword from './components/security-password.vue'
import { updateProperties } from '@/api/admin/properties'
import { ElMessage } from 'element-plus'

const { option, api } = useModel()
const crudRef = ref<IDCrud>()
const adminClientRef = ref<InstanceType<typeof AdminClientProperty>>()
const securityPasswordRef = ref<InstanceType<typeof SecurityPassword>>()

const beforeFetchHandler: IDCrudBeforeFetchFn = (type, config) => {
  if (type == 'create' || type == 'update') {
    config.data.value = JSON.parse(config.data.value)
  }
}

const componentsRef: Record<
  string,
  {
    value: {
      open?: (data: IDModel) => void
      close?: () => void
    }
  }
> = {
  ADMIN_CLIENT_PROPERTY: adminClientRef,
  SECURITY_PASSWORD: securityPasswordRef,
}

// 打开配置
const onOpenProperty = (data: IDModel) => {
  componentsRef[data.code].value?.open(data)
}

// 关闭配置
const onSaveProperty = (data: IDModel) => {
  updateProperties(data).then(() => {
    ElMessage.success('保存成功')
    crudRef.value?.refresh()
    componentsRef[data.code].value?.close()
  })
}
</script>
