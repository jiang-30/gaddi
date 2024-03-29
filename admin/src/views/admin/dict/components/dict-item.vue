<template>
  <el-dialog v-model="visible" title="字典项" width="1000px" destroy-on-close>
    <DCrud
      v-model:table-data="tableData"
      :option="option"
      :api="api"
      :before-fetch="beforeFetchHandler"
    ></DCrud>
  </el-dialog>
</template>

<script setup lang="ts">
import type { IDCrudBeforeFetchFn, IDCrudOption } from '@gaddi/components'
import type { IDictDataType } from '@/typings'
import { useDictStore } from '@/store'
import { computed, ref } from 'vue'

const visible = ref(false)
const dictDataType = ref<IDictDataType>('list')
const dictId = ref('')
const tableData = ref<Record<string, any>[]>([])

const api = computed(() => {
  return {
    list: `/admin/dict-item/list/${dictId.value}`,
    create: '/admin/dict-item',
    update: '/admin/dict-item',
    delete: '/admin/dict-item/',
  }
})
const option = computed<IDCrudOption>(() => {
  return {
    rowKey: 'id',
    indexColumn: false,
    labelWidth: 80,
    dialogWidth: 600,
    fields: [
      {
        label: '上级',
        prop: 'parentId',
        type: 'tree',
        dictData: tableData.value as any,
        valueKey: 'id',
        checkStrictly: true,
        isForm: dictDataType.value === 'tree',
        isTable: false,
      },
      {
        label: '名称',
        prop: 'label',
        type: 'input',
        rules: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          {
            type: 'string',
            max: 30,
            message: '最多输入30个字符',
            trigger: 'blur',
          },
        ],
      },
      {
        label: '值',
        prop: 'value',
        type: 'input',
        rules: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          {
            type: 'string',
            max: 30,
            message: '最多输入30个字符',
            trigger: 'blur',
          },
        ],
      },
      {
        label: '类型',
        prop: 'tagType',
        type: 'select',
        dictCode: 'TAG_TYPE',
        rules: [
          {
            type: 'string',
            max: 30,
            message: '最多输入30个字符',
            trigger: 'blur',
          },
        ],
      },
      {
        label: '备注',
        prop: 'remark',
        type: 'textarea',
        rules: [
          {
            type: 'string',
            max: 255,
            message: '最多输入255个字符',
            trigger: 'blur',
          },
        ],
        isTable: false,
      },
      { label: '排序', prop: 'sort', type: 'inputNumber', default: 1 },
      {
        label: '状态',
        prop: 'isEnabled',
        type: 'radio',
        default: '1',
        dictData: useDictStore().items('SYS_ENABLED'),
      },
    ],
  }
})

// 请求前格式化数据
const beforeFetchHandler: IDCrudBeforeFetchFn = (type, config) => {
  if (type == 'create') {
    config.data.dictId = dictId.value
  }
}

// 打开 赋默认值
const open = (id: string, dictType: IDictDataType) => {
  dictId.value = id
  dictDataType.value = dictType
  visible.value = true
}

defineExpose({
  open,
})
</script>
