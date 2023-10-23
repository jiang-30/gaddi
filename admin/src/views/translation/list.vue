<route lang="yaml">
meta:
  isEnabled: true
  isStatic: true
  title: 翻译列表
  layout: translation
</route>

<template>
  <PageContainer>
    <DCrud ref="crudRef" :option="option" :api="crudApi"></DCrud>
  </PageContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { IDCrudOption, IDCrud, IDCrudApi } from '@gaddi/components'

const crudRef = ref<IDCrud>()
const searchModel = ref({})

const crudApi: IDCrudApi = {
  restful: '/translation',
}
const option: IDCrudOption = {
  dialogDraggable: true,
  dialogWidth: '90vw',
  dialogHeight: '80vh',
  dialogAlignCenter: true,
  rowActionWidth: 200,
  isInfoBtn: true,
  labelWidth: 100,
  align: 'center',
  fields: [
    {
      label: '原文',
      prop: 'label',
      type: 'input',
      isSearch: true,
    },
    {
      label: '结果',
      prop: 'code',
      type: 'input',
    },
    {
      label: '图片',
      prop: 'icon',
      type: 'image',
    },
  ],
}
</script>

<style scoped></style>
