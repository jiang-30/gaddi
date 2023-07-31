<route lang="yaml">
meta:
  isEnabled: true
  isStatic: true
  title: DEMO
  icon: mdi:desktop-tower-monitor
  layout: admin
  isShowMenu: true
  isAuth: false
  sort: 0
</route>

<template>
  <PageContainer>
    <WCrud :option="option"></WCrud>
    <!-- <div>demo</div> -->
    <!-- <w-section title="边框标题">
      <template #header>
        <div> header </div>
      </template>

      <template #default>
        <div> main </div>
      </template>
    </w-section> -->

  </PageContainer>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { ICrudOption } from '@gaddi/components'


const searchModel = ref({})
const pageModel = ref({ size: 10, current: 1, total: 88 })

watch(() => searchModel, (value) => {
  console.log(value)
})

const option: ICrudOption = {
  fields: [
    {
      label: '标题',
      prop: 'title',
      type: 'input',
      isSearch: true,
    },
    {
      label: '图片',
      prop: 'icon',
      type: 'image'
    },
    {
      label: '图片',
      prop: 'icons',
      type: 'images'
    },
    {
      label: '类型',
      prop: 'type',
      type: 'radio',
      dictCode: "question_type"
    },
  ]
}
</script>
