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
  </PageContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IDCrudBeforeFetchFn } from '@gaddi/components'
import { useModel } from './model'
import AdminClientProperty from './components/admin-client-property.vue'
import { IDModel } from '@gaddi/components/es/typings'

// 默认密码
// 邮箱
const { option, api } = useModel()
const adminClientRef = ref<InstanceType<typeof AdminClientProperty>>()

const beforeFetchHandler: IDCrudBeforeFetchFn = (type, config) => {
  if (type == 'create' || type == 'update') {
    config.data.value = JSON.parse(config.data.value)
  }
}

const onOpenProperty = (data: IDModel) => {
  if (data.code == 'ADMIN_CLIENT_PROPERTY') {
    adminClientRef.value?.open(data)
  }
}
</script>
