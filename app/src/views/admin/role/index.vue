<route lang="yaml">
meta:
  isEnabled: true
  layout: admin
</route>

<template>
  <PageContainer>
    <WCrud :option="option" :api="api">
      <template #row-action="{ row }">
        <el-button text size="small" type="primary" @click="onOpen(row)">权限</el-button>
      </template>
    </WCrud>

    <PermissionView ref="permissionRef" />
  </PageContainer>
</template>

<script setup lang="ts">
import PermissionView from './components/permission-view.vue'
import { useModel } from './model'

const { option, api } = useModel()
const permissionRef = ref<InstanceType<typeof PermissionView>>()

const onOpen = (row: any) => {
  permissionRef.value?.open(row.id)
}
</script>
