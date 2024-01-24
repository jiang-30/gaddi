<route lang="yaml">
meta:
  isEnabled: true
  layout: admin
</route>

<template>
  <PageContainer>
    <DCrud :option="option" :api="api" :before-fetch="beforeFetchHandler">
      <template #row-action="{ row }">
        <el-button type="primary" text size="small" @click="onOpenProperty(row)">配置</el-button>
      </template>
    </DCrud>

    <AdminClientProperty ref="adminClientRef"></AdminClientProperty>

    <SecurityPassword ref="securityPasswordRef"></SecurityPassword>
  </PageContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useModel } from './model'
import AdminClientProperty from './components/admin-client-property.vue'
import SecurityPassword from './components/security-password.vue'
import type { IDCrudBeforeFetchFn } from '@gaddi/components'
import type { IDModel } from '@gaddi/components/es/typings'

// 默认密码
// 邮箱
const { option, api } = useModel()
const adminClientRef = ref<InstanceType<typeof AdminClientProperty>>()
const securityPasswordRef = ref<InstanceType<typeof SecurityPassword>>()

const beforeFetchHandler: IDCrudBeforeFetchFn = (type, config) => {
  if (type == 'create' || type == 'update') {
    config.data.value = JSON.parse(config.data.value)
  }
}

const componentsRef: Record<string, (data: IDModel) => void> = {
  ADMIN_CLIENT_PROPERTY(data: IDModel) {
    adminClientRef.value?.open(data)
  },
  SECURITY_PASSWORD(data: IDModel) {
    securityPasswordRef.value?.open(data)
  },
}

const onOpenProperty = (data: IDModel) => {
  componentsRef[data.code](data)
}
</script>
