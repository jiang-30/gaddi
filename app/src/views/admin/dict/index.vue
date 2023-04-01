<route lang="yaml">
meta:
  isEnabled: true
  layout: admin
</route>

<template>
  <PageContainer>
    <WCrud :option="option" :api="api">
      <template #row-action="{ row }">
        <el-button type="primary" text size="small" @click="onOpenItems(row)"> 字典项 </el-button>
      </template>
    </WCrud>

    <DictItem ref="itemRef" />
  </PageContainer>
</template>

<script setup lang="ts">
import DictItem from './components/dict-item.vue'
import { useModel } from './model'

const { api, option } = useModel()
const itemRef = ref<InstanceType<typeof DictItem>>()

// 打开字典项
const onOpenItems = (row: any) => {
  itemRef.value?.open(row.id, row.dataType)
}
</script>
