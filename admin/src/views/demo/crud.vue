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

    <DCrud ref="crudRef" :option="option" :api="crudApi" v-model:table-data="tableData" :before-open="beforeOpen"
      :after-fetch="afterFetchHandler"></DCrud>
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
import type { IDCrudOption, IDCrud, IDCrudPageModel, IDCrudApi, IDCrudAfterFetchFn } from '@gaddi/components'
import { ElDialog, ElMessageBox } from 'element-plus';
import { at } from 'lodash-es'

const crudRef = ref<IDCrud>()
const pageModel = ref<IDCrudPageModel>({ size: 10, current: 1, total: 88 })
const searchModel = ref({})
const tableData = ref([
  // {
  //   id: 1,
  //   title: '标题',
  //   icon: '图片',
  //   type: '1',
  //   status: '1',
  // },
])

watch(() => searchModel, (value) => {
  console.log(value)
})

const crudApi: IDCrudApi = {
  restful: '/dict',
  list: '/dict',
}
const option: IDCrudOption = {
  rowActionWidth: 200,
  isInfoBtn: true,
  labelWidth: 100,
  fields: [
    {
      label: '名称',
      prop: 'label',
      type: 'input',
      isSearch: true,
      hint: '标题标题标题标题',
    },
    {
      label: '编码',
      prop: 'code',
      type: 'input',
      isSearch: true,
    },
    {
      label: '类型',
      prop: 'type',
      type: 'radio',
    },
    {
      label: '备注',
      prop: 'remark',
      type: 'input',
      dictUrl: '/dict/item/isDisabled',
      isTableShow: false,
    },
    {
      label: '图片',
      prop: 'icon',
      type: 'image'
    },
    {
      label: '状态',
      prop: 'isDisabled',
      type: 'radio',
      dictUrl: '/dict/item/isDisabled'
    },
  ]
}

const onClick = () => {
  render(h(ElDialog, { modelValue: true, title: '测试' }, 'sdf'), document.body)
}

const onClick1 = () => {
  ElMessageBox.confirm('确定执行删除操作吗', {
    title: '提示',
    type: 'warning',
  })
    .then(res => {
      console.log('res', res)
      return 'res'
    }, err => {
      console.log('err', err)
      return 'err'
    })
    .then(res => {
      console.log(1111, res)
    })
    .catch(res => {

    })
    .finally(() => {
    })
}

const onResie = (event: any) => {
  console.log(event)
}

const afterFetchHandler: IDCrudAfterFetchFn = (type, data) => {
  console.log(type, data)
}

const beforeOpen = (type: string, model: any, done: any) => {
  console.log(type, model)
  done()
}
</script>
