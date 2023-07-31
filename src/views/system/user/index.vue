<route lang="yaml">
  meta:
    isEnabled: true
    isStatic: false
    title: 名称
    icon: mdi:home
    layout: admin
    isTab: true
    isShowMenu: true
</route>

<template>
  <PageContainer>
    <WCrud ref="crudRef" :option="option" :api="api" v-model="dataModel">
    </WCrud>
  </PageContainer>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'
import type { ICrudOption, ICrud } from '@gaddi/components'

const crudRef = ref<ICrud>()
const dataModel = ref<any>({})
const api = {
  rest: '/admin/sys-menu',
  list: '/admin/sys-menu/tree',
  create: '/admin/sys-menu',
  update: '/admin/sys-menu',
  delete: '/admin/sys-menu/',
}
const option: ICrudOption = {
  align: 'center',
  labelWidth: '100px',
  isInfoBtn: false,
  isCreateBtn: true,
  isUpdateBtn: true,
  isDeleteBtn: true,
  fields: [
    {
      label: '',
      prop: 'code',
      type: 'input',
      rules: [
        { required: false, message: '请输入', trigger: 'change' },
        { type: 'string', max: 10, message: '请输入', trigger: 'change' },
      ],
    },
    {
      label: '',
      prop: 'createBy',
      type: 'input',
      rules: [
        { required: false, message: '请输入', trigger: 'change' },
        { type: 'string', max: 10, message: '请输入', trigger: 'change' },
      ],
    },
    {
      label: '',
      prop: 'createDate',
      type: 'input',
      rules: [
        { required: false, message: '请输入', trigger: 'change' },
        { type: 'string', max: 10, message: '请输入', trigger: 'change' },
      ],
    },
    {
      label: '',
      prop: 'deleted',
      type: 'input',
      rules: [
        { required: false, message: '请输入', trigger: 'change' },
        { type: 'string', max: 10, message: '请输入', trigger: 'change' },
      ],
    },
    {
      label: '',
      prop: 'gp',
      type: 'input',
      rules: [
        { required: false, message: '请输入', trigger: 'change' },
        { type: 'string', max: 10, message: '请输入', trigger: 'change' },
      ],
    },
    {
      label: '',
      prop: 'id',
      type: 'input',
      rules: [
        { required: false, message: '请输入', trigger: 'change' },
        { type: 'string', max: 10, message: '请输入', trigger: 'change' },
      ],
    },
    {
      label: '',
      prop: 'lastUpdateBy',
      type: 'input',
      rules: [
        { required: false, message: '请输入', trigger: 'change' },
        { type: 'string', max: 10, message: '请输入', trigger: 'change' },
      ],
    },
    {
      label: '',
      prop: 'lastUpdateDate',
      type: 'input',
      rules: [
        { required: false, message: '请输入', trigger: 'change' },
        { type: 'string', max: 10, message: '请输入', trigger: 'change' },
      ],
    },
    {
      label: '',
      prop: 'name',
      type: 'input',
      rules: [
        { required: false, message: '请输入', trigger: 'change' },
        { type: 'string', max: 10, message: '请输入', trigger: 'change' },
      ],
    },
    {
      label: '',
      prop: 'objectVersionNumber',
      type: 'input',
      rules: [
        { required: false, message: '请输入', trigger: 'change' },
        { type: 'string', max: 10, message: '请输入', trigger: 'change' },
      ],
    },
    {
      label: '',
      prop: 'remarks',
      type: 'input',
      rules: [
        { required: false, message: '请输入', trigger: 'change' },
        { type: 'string', max: 10, message: '请输入', trigger: 'change' },
      ],
    },
    {
      label: '',
      prop: 'status',
      type: 'input',
      rules: [
        { required: false, message: '请输入', trigger: 'change' },
        { type: 'string', max: 10, message: '请输入', trigger: 'change' },
      ],
    },
  ]
}

</script>
  