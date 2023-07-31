
import type { TableColumnCtx } from 'element-plus'
import type { ICrudOption } from '../type'
import type { ICrudColumnAttrs } from '../type/field'
import { omitProperty, tools } from '../../../utils'

// element-plus ElTabelColumn Attrs
export const tableColumnAttrsFormat = (option: ICrudOption, field: ICrudColumnAttrs): Partial<TableColumnCtx<any>> => {
  const defaultFieldAttrs = tools.defaultFieldAttrs

  return omitProperty({
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
    formatter: field.formatter,
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
  })
}
