<route lang="yaml">
meta:
  isEnabled: true
  isStatic: true
  parentId: Demo
  title: CRUD
  icon: mdi:table-border
  layout: admin
  isShowMenu: true
  isTab: true
  isAuth: false
  sort: 0
</route>

<template>
  <PageContainer>
    <DCrud
      ref="crudRef"
      :option="option"
      :api="crudApi"
      v-model:table-data="tableData"
      :before-open="beforeOpen"
      :after-fetch="afterFetchHandler"
    ></DCrud>
    <!-- <div>demo</div> -->
    <!-- <w-section title="边框标题">
      <template #header>
        <div> header </div>
      </template>

      <template #default>
        <div> main </div>
      </template>
    </w-section> -->

    <!-- <el-button @click="onClick">test</el-button> -->
    <el-button @click="onClick1">close</el-button>
    <!-- 
    <el-dialog
      class="d-dialog"
      v-model="visiable"
      title="修改"
      align-center
      :fullscreen="isFullscreen"
      :draggable="true"
    >
      <template #header>
        <div> 修改 </div>
        <button
          class="el-dialog__headerbtn d-dialog-fullscreen"
          @click="isFullscreen = !isFullscreen"
        >
          <el-icon><FullScreen /></el-icon>
        </button>
      </template>
      <template #default>
        <el-scrollbar :max-height="undefined">
          <div v-for="item in 100" :key="item">visiable{{ item }}</div>
        </el-scrollbar>
      </template>
    </el-dialog> -->
  </PageContainer>
</template>

<script setup lang="ts">
import { ref, watch, h, render } from 'vue'
import type {
  IDCrudOption,
  IDCrud,
  IDCrudPageModel,
  IDCrudApi,
  IDCrudAfterFetchFn,
} from '@gaddi/components'
import { ElDialog, ElMessageBox } from 'element-plus'
import { at } from 'lodash-es'
import { FullScreen } from '@element-plus/icons-vue'

const visiable = ref(false)
const isFullscreen = ref(false)
const crudRef = ref<IDCrud>()
const pageModel = ref<IDCrudPageModel>({ size: 10, current: 1, total: 88 })
const searchModel = ref({})
const tableData = ref([
  {
    id: 1,
    title: '标题',
    icon: '图片',
    type: '1',
    status: '1',
  },
])

watch(
  () => searchModel,
  value => {
    console.log(value)
  },
)

const crudApi: IDCrudApi = {
  restful: '/dict',
  list: '/dict',
  info: '/dict/{id}',
}
const option: IDCrudOption = {
  dialogDraggable: true,
  dialogWidth: '90vw',
  dialogHeight: '80vh',
  dialogAlignCenter: true,
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
      label: '图片',
      prop: 'icon',
      type: 'image',
    },
    {
      label: '图片',
      prop: 'icon',
      type: 'image',
    },
    {
      label: '图片',
      prop: 'icon',
      type: 'image',
    },
    {
      label: '图片',
      prop: 'icon',
      type: 'image',
    },
    {
      label: '图片',
      prop: 'icon',
      type: 'image',
    },
    {
      label: '图片',
      prop: 'icon',
      type: 'image',
    },
    // {
    //   label: '状态',
    //   prop: 'isDisabled',
    //   type: 'radio',
    //   dictUrl: '/dict/item/isDisabled',
    // },
  ],
}

const onClick1 = () => {
  ElMessageBox.confirm('确定执行删除操作吗', {
    title: '提示',
    type: 'warning',
  })
    .then(
      res => {
        console.log('res', res)
        return 'res'
      },
      err => {
        console.log('err', err)
        return 'err'
      },
    )
    .then(res => {
      console.log(1111, res)
    })
    .catch(res => {})
    .finally(() => {})
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

<style scoped>
.d-dialog .el-dialog__header {
  background-color: var(--el-color-primary);
  margin-right: 0;
  color: var(--el-bg-color);
}
.d-dialog .el-dialog__header .el-dialog__title {
  color: var(--el-bg-color);
}
.d-dialog .el-dialog__headerbtn {
  width: 34px;
  right: 10px;
}
.d-dialog .el-dialog__headerbtn .el-dialog__close {
  color: var(--el-bg-color);
}
.d-dialog .d-dialog-fullscreen {
  right: 44px;
  color: var(--el-bg-color);
}
.d-dialog .el-dialog__body {
  --el-dialog-padding-primary: 0;
  max-height: calc(100vh - 180px);
  overflow: hidden;
  /* overflow: auto; */
}
</style>
