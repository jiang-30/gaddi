import type { IDCrudOption, IDCrudApi } from '@gaddi/components'
import { useDictStore } from '@/store'

export const useModel = (): {
  api: IDCrudApi
  option: IDCrudOption
} => {
  const api = {
    restful: '/admin/dict',
  }

  const option: IDCrudOption = {
    labelWidth: '100px',
    rowActionWidth: 230,
    dialogWidth: 600,
    fields: [
      {
        label: '字典名称',
        prop: 'name',
        type: 'input',
        rules: [
          { required: true, message: '请输入字典名称', trigger: 'blur' },
          {
            type: 'string',
            max: 32,
            message: '最多输入32个字符',
            trigger: 'blur',
          },
        ],
        isSearch: true,
      },
      {
        label: '字典标识',
        prop: 'code',
        type: 'input',
        rules: [
          { required: true, message: '请输入字典标识', trigger: 'blur' },
          {
            type: 'string',
            max: 32,
            message: '最多输入32个字符',
            trigger: 'blur',
          },
        ],
        isSearch: true,
      },
      {
        label: '字典类型',
        prop: 'type',
        type: 'select',
        default: 'biz',
        rules: [{ required: true, message: '请选择字典类型', trigger: 'blur' }],
        dictData: useDictStore().items('SYS_DICT_TYPE'),
        isSearch: true,
        width: 140,
      },
      {
        label: '数据类型',
        prop: 'dataType',
        type: 'select',
        default: 'list',
        rules: [{ required: true, message: '请选择数据类型', trigger: 'blur' }],
        dictData: useDictStore().items('SYS_DICT_DATA_TYPE'),
        width: 100,
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
    ],
  }

  return {
    api,
    option,
  }
}
