import type { IDCrudOption, IDCrudApi } from '@gaddi/components'
import { useDictStore } from '@/store'
import { ref, computed, type Ref } from 'vue'

export const useModel = (tableData: Ref<any[]>) => {

  const api = ref<IDCrudApi>({
    restful: '/admin/menu',
    list: '/admin/menu/tree',
  })

  const option = computed<IDCrudOption>(() => {
    return {
      dialogWidth: '900px',
      rowKey: 'id',
      indexColumn: false,
      rowActionWidth: 220,
      labelWidth: '100px',
      align: 'center',
      fields: [
        {
          prop: 'title',
          label: '名称',
          type: 'input',
          isForm: false,
          align: 'left',
        },
        {
          prop: 'type',
          label: '类型',
          type: 'radioButton',
          dictData: useDictStore().items('SYS_MENU_TYPE'),
          default: 'page',
          width: 160,
          span: 12,
        },
        {
          prop: 'parentId',
          label: '上级',
          type: 'tree',
          span: 12,
          dictData: tableData.value,
          checkStrictly: true,
          valueKey: 'id',
          props: {
            label: 'title',
          },
          isTable: false,
        },
        {
          prop: 'title',
          label: '名称',
          type: 'input',
          rules: [
            { required: true, message: '请输入名称', trigger: 'change' },
            {
              type: 'string',
              max: 20,
              message: '20个字符以内',
              trigger: 'change',
            },
          ],
          isTable: false,
        },
        {
          prop: 'icon',
          label: '图标',
          type: 'input',
          width: 100,
        },
        {
          prop: 'path',
          label: '访问路径',
          type: 'input',
          rules: [
            {
              type: 'string',
              max: 100,
              message: '100个字符以内',
              trigger: 'change',
            },
          ],
          listen: {
            show: { type: 'page' },
          },
          isTable: false,
        },
        {
          prop: 'componentPath',
          label: '组件路径',
          type: 'input',
          listen: {
            show: { type: 'page' },
          },
          rules: [
            { required: true, message: '请输入组件路径', trigger: 'change' },
            {
              type: 'string',
              max: 100,
              message: '100个字符以内',
              trigger: 'change',
            },
          ],
        },
        {
          prop: 'permission',
          label: '权限标识',
          type: 'input',
          isTable: false,
          rules: [
            {
              type: 'string',
              max: 255,
              message: '255个字符以内',
              trigger: 'change',
            },
          ],
          listen: {
            hide: { type: 'menu' },
          },
        },
        {
          prop: 'remark',
          label: '备注',
          type: 'textarea',
          isTable: false,
          rules: [
            {
              type: 'string',
              max: 255,
              message: '255个字符以内',
              trigger: 'change',
            },
          ],
        },
        {
          prop: 'isShowMenu',
          label: '是否展示',
          type: 'radio',
          dictData: useDictStore().items('SYS_FLAG'),
          default: '1',
          listen: {
            hide: { type: 'button' },
          },
          width: 100,
          span: 12,
        },
        {
          prop: 'target',
          label: '打开位置',
          type: 'radio',
          dictData: useDictStore().items('SYS_MENU_TARGET'),
          default: '_self',
          isTable: false,
          listen: {
            show: { type: 'page' },
          },
          span: 12,
        },
        {
          prop: 'isAlive',
          label: '是否缓存',
          type: 'radio',
          dictData: useDictStore().items('SYS_FLAG'),
          default: '0',
          isTable: false,
          listen: {
            show: { type: 'page' },
          },
          span: 12,
        },
        {
          prop: 'isTab',
          label: '是否标签页',
          type: 'radio',
          dictData: useDictStore().items('SYS_FLAG'),
          default: '1',
          isTable: false,
          listen: {
            show: { type: 'page' },
          },
          span: 12,
        },
        {
          prop: 'isEnabled',
          label: '状态',
          type: 'radio',
          dictData: useDictStore().items('SYS_ENABLED'),
          default: '1',
          width: 100,
          span: 12,
        },
        {
          prop: 'sort',
          label: '排序',
          type: 'inputNumber',
          default: 1,
          span: 12,
          width: 100,
        },
      ],
    }
  })

  return {
    api,
    option,
  }
}
