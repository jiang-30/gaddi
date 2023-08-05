import { computed } from 'vue'
import type { TableProps, PaginationProps, DialogProps } from 'element-plus'
import type { ICrudOption, ICrud, boolFun } from './type'
import { omitProperty, tools, fetchDict, dictData } from '../../utils'
import { tableAttrsFormat } from './handler/table-handler'
import { paginationAttrsFormat } from './handler/pagination-handler'
import { dialogAttrsFormat } from './handler/dialog-handler'
import { tableColumnAttrsFormat } from './handler/table-column-handler'

export const useCrudOption = (option: ICrudOption) => {
  const defaultFieldAttrs = tools.defaultFieldAttrs

  // 表格 ElTable Attrs table props 和 event
  const __tableAttrs = computed<Omit<TableProps<any>, 'data'>>(() => {
    return tableAttrsFormat(option)
  })

  // 分页 ElPagination 属性
  const __pageAttrs = computed<Partial<PaginationProps>>(() => {
    return paginationAttrsFormat(option)
  })

  // 弹窗 ElDialog 属性
  const __dialogAttrs = computed<Partial<DialogProps>>(() => {
    return dialogAttrsFormat(option)
  })

  // 展开列 expand
  const __expandColumn = computed(() => {
    return {
      // 是否显示
      isShow: option.expandColumn ?? false,
    }
  })

  // 多选列 selection
  const __selectionColumn = computed(() => {
    const attrs: {
      selectable?: ICrudOption['selectable']
      reserveSelection: boolean
    } = {
      reserveSelection: option.reserveSelection ?? true
    }

    if (option.selectable != undefined) {
      attrs.selectable = option.selectable
    }

    return {
      isShow: option.selectionColumn ?? false,
      attrs
    }
  })

  // 序号列 index
  const __indexColumn = computed(() => {
    return {
      // 是否显示
      isShow: option.indexColumn ?? true,
      columnAttrs: {
        label: '序号',
        width: 60,
        align: 'center',
      }
    }
  })

  // 操作列配置 action
  const __actionColumn = computed(() => {
    return {
      // 显示新增按钮
      isCreateBtn: option.isCreateBtn ?? true,
      // 显示操作列
      isRowAction: option.isRowAction ?? true,
      // 显示详情按钮
      isInfoBtn: option.isInfoBtn ?? false,
      infoBtnDisabled: option.infoBtnDisabled ?? false,
      // 显示修改按钮
      isUpdateBtn: option.isUpdateBtn ?? true,
      updateBtnDisabled: option.updateBtnDisabled ?? false,
      // 显示删除按钮
      isDeleteBtn: option.isDeleteBtn ?? true,
      deleteBtnDisabled: option.deleteBtnDisabled ?? false,
      // 操作栏属性
      columnAttrs: {
        label: '操作',
        align: 'center',
        width: option.rowActionWidth ?? 180,
      }
    }
  })


  // table column
  const __tableFields = computed(() => {
    // console.log('generate table fields')
    const tableFields: any[] = []

    option.fields.forEach((field) => {
      if (field.isTable !== false) {
        const _props = {
          ...(defaultFieldAttrs.props ?? {}),
          ...(field.props ?? {}),
        }

        if (field.dictUrl) {
          fetchDict(field.dictUrl, _props)
        }
        const _dictData = field.dictData ?? dictData(field).value

        tableFields.push({
          prop: field.prop,
          label: field.label,
          type: field.type,
          multiple: field.multiple,
          isTableShow: field.isTableShow ?? true,
          __props: _props,
          __formatter: field.formatter,
          __dictData: _dictData,
          __elTableColumnAttrs: tableColumnAttrsFormat(option, field),
        })
      }
    })

    return tableFields
  })

  return {
    __tableAttrs,
    __pageAttrs,
    __dialogAttrs,
    __expandColumn,
    __selectionColumn,
    __indexColumn,
    __actionColumn,
    __tableFields,
  }
}


export function actionDisabledHandle(disabled: boolean | boolFun, row: any): boolean {
  if (typeof disabled == 'boolean') {
    return disabled
  } else if (typeof disabled == 'function') {
    return disabled(row)
  } else {
    return false
  }
}
