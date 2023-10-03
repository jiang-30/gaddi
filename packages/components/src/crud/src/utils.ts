import { computed } from 'vue'
import type { TableProps, PaginationProps, DialogProps } from 'element-plus'
import type { IDCrudOption, boolFun } from './type'
import { handle, getBaseFields, omitProperty } from '../../handle'
import { tableAttrsFormat } from './handler/table-handler'
import { paginationAttrsFormat } from './handler/pagination-handler'
import { dialogAttrsFormat } from './handler/dialog-handler'
import { tableColumnAttrsFormat } from './handler/table-column-handler'
import { computedAsync } from '@vueuse/core'
import type { IDModel } from '../../typings'

export const useCrudOption = (option: IDCrudOption) => {
  const defaultFieldAttrs = handle.defaultFieldAttrs

  // 表格 ElTable Attrs table props 和 event
  const __tableAttrs = computed<Omit<TableProps<any>, 'data'>>(() => {
    return omitProperty(tableAttrsFormat(option))
  })

  // 分页 ElPagination 属性
  const __pageAttrs = computed<Partial<PaginationProps>>(() => {
    return omitProperty(paginationAttrsFormat(option))
  })

  // 弹窗 ElDialog 属性
  const __dialogAttrs = computed<Partial<DialogProps>>(() => {
    return omitProperty(dialogAttrsFormat(option))
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
      selectable?: IDCrudOption['selectable']
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

  // 操作按钮配置 action
  const __actionAttrs = computed(() => {
    return {
      // 显示新增按钮
      isCreateBtn: option.isCreateBtn ?? true,
      createBtnPermission: option.createBtnPermission,
      // 显示操作列
      isRowAction: option.isRowAction ?? true,
      // 显示详情按钮
      isInfoBtn: option.isInfoBtn ?? false,
      infoBtnDisabled: option.infoBtnDisabled ?? false,
      infoBtnPermission: option.infoBtnPermission,
      // 显示修改按钮
      isUpdateBtn: option.isUpdateBtn ?? true,
      updateBtnDisabled: option.updateBtnDisabled ?? false,
      updateBtnPermission: option.updateBtnPermission,
      // 显示删除按钮
      isDeleteBtn: option.isDeleteBtn ?? true,
      deleteBtnDisabled: option.deleteBtnDisabled ?? false,
      deleteBtnPermission: option.deleteBtnPermission,
      // 操作栏属性
      rowActionAttrs: {
        label: '操作',
        align: 'center',
        width: option.rowActionWidth ?? 160,
      }
    }
  })

  const __tableFields = computedAsync(async () => {
    const tableFields: any[] = []

    for (let index = 0; index < option.fields.length; index++) {
      const field = option.fields[index];

      if (field.isTable !== false) {
        tableFields.push({
          ...await getBaseFields(field),
          __isTableShow: field.isTableShow ?? true,
          __elTableColumnAttrs: omitProperty(tableColumnAttrsFormat(option, field)),
        })
      }

    }
    // console.log('generate table fields', tableFields)
    return tableFields
  }, [])

  return {
    __tableAttrs,
    __pageAttrs,
    __dialogAttrs,
    __expandColumn,
    __selectionColumn,
    __indexColumn,
    __actionAttrs,
    __tableFields,
  }
}

// 操作按钮的禁用状态
export function actionDisabledHandle(disabled: boolean | boolFun, row: IDModel): boolean {
  if (typeof disabled == 'boolean') {
    return disabled
  } else if (typeof disabled == 'function') {
    return disabled(row)
  } else {
    return false
  }
}


// 操作按钮是否显示
export function actionBtnShowHandle(isButton: boolean | Function, model: IDModel): boolean {
  if (typeof isButton == 'function') {
    return isButton(model)
  } else {
    return isButton
  }
}
