<route lang="yaml">
meta:
  isEnabled: true
  layout: admin
</route>

<template>
  <PageContainer>
    <WCrud ref="crudRef" :option="option" :api="api" v-model:table-data="tableData">
      <template #icon="{ row }"> {{ row.title }} </template>

      <template #iconForm="{ model }">
        <el-input v-model="model.icon" readonly placeholder="请选择图标" @click="onOpenIcon(model)">
          <template #prefix>
            <AppIcon v-if="model.icon" :size="18" :icon="model.icon" />
          </template>
        </el-input>
      </template>

      <template #row-action="{ row }">
        <el-button style="order: -1" size="small" text type="primary" @click="onAdd(row)">
          新增
        </el-button>
      </template>
    </WCrud>

    <IconTemplate ref="iconRef" />
  </PageContainer>
</template>

<script setup lang="ts">
import { useModel } from './model'
import type { IDCrud } from '@gaddi/components'
import IconTemplate from '@/components/template/icon-template.vue'
import { ref } from 'vue';

const crudRef = ref<IDCrud>()
const iconRef = ref<InstanceType<typeof IconTemplate>>()
const tableData = ref([])
const { option, api } = useModel(tableData)

const onAdd = (record: any) => {
  crudRef.value?.openCreate({ parentId: record.id })
}

const onOpenIcon = (model: any) => {
  iconRef.value?.choose().then(iconName => {
    model.icon = iconName
  })
}
</script>
