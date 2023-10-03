
import type { TableColumnCtx } from 'element-plus'
import type { IDCrudOption } from '../type'
import type { IDCrudColumnAttrs } from '../type/field'
import { omitProperty, handle } from '../../../handle'

// element-plus ElTabelColumn Attrs
export const tableColumnAttrsFormat = (option: IDCrudOption, field: IDCrudColumnAttrs): Partial<TableColumnCtx<any>> => {
  const defaultFieldAttrs = handle.defaultFieldAttrs

  return {
    index: field.index,
    columnKey: field.columnKey,
    width: field.width,
    minWidth: field.minWidth,
    fixed: field.fixed,
    renderHeader: field.renderHeader,
    sortable: field.sortable,
    sortMethod: field.sortMethod,
    sortBy: field.sortBy,
    sortOrders: field.sortOrders,
    resizable: field.resizable,
    showOverflowTooltip: field.showOverflowTooltip,
    align: field.align ?? option.align,
    headerAlign: field.headerAlign ?? option.headerAlign,
    className: field.className,
    labelClassName: field.labelClassName,
    filters: field.filters,
    filterPlacement: field.filterPlacement,
    filterMultiple: field.filterMultiple,
    filterMethod: field.filterMethod,
    filteredValue: field.filteredValue,
  }
}
