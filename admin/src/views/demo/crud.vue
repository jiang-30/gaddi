<route lang="yaml">
meta:
  isEnabled: true
  isStatic: true
  parentId: Demo
  title: CRUD
  icon: mdi:table-border
  layout: admin
  isShowMenu: true
  isAuth: false
  sort: 0
</route>

<template>
  <PageContainer>

    <DCrud ref="crudRef" :option="option" :table-data="tableData" :before-open="beforeOpen"></DCrud>
    <!-- <div>demo</div> -->
    <!-- <w-section title="边框标题">
      <template #header>
        <div> header </div>
      </template>

      <template #default>
        <div> main </div>
      </template>
    </w-section> -->

    <section v-resize="onResie">
      <el-button @click="onClick">test</el-button>
      <el-button @click="onClick1">close</el-button>
    </section>

    <div v-resize="onResie">
    </div>
  </PageContainer>
</template>

<script setup lang="ts">
import { ref, watch, h, render } from 'vue'
import type { IDCrudOption, IDCrud, IDCrudPageModel } from '@gaddi/components'
import { ElDialog } from 'element-plus';

const crudRef = ref<IDCrud>()
const pageModel = ref<IDCrudPageModel>({ size: 10, current: 1, total: 88 })
const searchModel = ref({})
const tableData = ref([
  {
    title: '标题',
    icon: '图片',
    type: '1',
    status: '1',
  },
])

watch(() => searchModel, (value) => {
  console.log(value)
})

const option: IDCrudOption = {
  rowActionWidth: 200,
  isInfoBtn: true,
  labelWidth: 100,
  fields: [
    {
      label: '标题',
      prop: 'title',
      type: 'input',
      isSearch: true,
      hint: '标题标题标题标题',
    },
    {
      label: '图片',
      prop: 'icon',
      type: 'image'
    },
    {
      label: '类型',
      prop: 'type',
      type: 'radio',
      dictCode: "question_type"
    },
    {
      label: '状态',
      prop: 'status',
      type: 'radio',
      dictUrl: '/dict/item/isDisabled'
    },
  ]
}

const onClick = () => {
  render(h(ElDialog, { modelValue: true, title: '测试' }, 'sdf'), document.body)
}

const onClick1 = () => {
}

const onResie = (event: any) => {
  console.log(event)
}


const beforeOpen = (type: string, model: any, done: any) => {
  console.log(type, model)
  done()
}
</script>
