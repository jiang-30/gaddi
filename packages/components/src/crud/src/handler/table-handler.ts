
import type { TableProps } from 'element-plus'
import type { ICrudOption } from '../type'
import { omitProperty, tools } from '../../../utils'

// element-plus ElTabel Attrs
export const tableAttrsFormat = (option: ICrudOption): Omit<TableProps<any>, 'data'> => {
  const defaultAttrs = tools.defaultAttrs

  return omitProperty({
    height: option.height ?? defaultAttrs.height,
    maxHeight: option.maxHeight ?? defaultAttrs.maxHeight,
    stripe: option.stripe ?? defaultAttrs.stripe,
    border: option.border ?? defaultAttrs.border,
    size: option.size ?? defaultAttrs.size,
    fit: option.fit ?? defaultAttrs.fit,
    showHeader: option.showHeader ?? defaultAttrs.showHeader,
    highlightCurrentRow: option.highlightCurrentRow ?? defaultAttrs.highlightCurrentRow,
    currentRowKey: option.currentRowKey ?? defaultAttrs.currentRowKey,
    rowClassName: option.rowClassName ?? defaultAttrs.rowClassName,
    rowStyle: option.rowStyle ?? defaultAttrs.rowStyle,
    cellClassName: option.cellClassName ?? defaultAttrs.cellClassName,
    cellStyle: option.cellStyle ?? defaultAttrs.cellStyle,
    headerRowClassName: option.headerRowClassName ?? defaultAttrs.headerRowClassName,
    headerRowStyle: option.headerRowStyle ?? defaultAttrs.headerRowStyle,
    headerCellClassName: option.headerCellClassName ?? defaultAttrs.headerCellClassName,
    headerCellStyle: option.headerCellStyle ?? defaultAttrs.headerCellStyle,
    rowKey: option.rowKey ?? defaultAttrs.rowKey,
    emptyText: option.emptyText ?? defaultAttrs.emptyText,
    defaultExpandAll: option.defaultExpandAll ?? defaultAttrs.defaultExpandAll,
    expandRowKeys: option.expandRowKeys ?? defaultAttrs.expandRowKeys,
    defaultSort: option.defaultSort ?? defaultAttrs.defaultSort,
    tooltipEffect: option.tooltipEffect ?? defaultAttrs.tooltipEffect,
    showSummary: option.showSummary ?? defaultAttrs.showSummary,
    sumText: option.sumText ?? defaultAttrs.sumText,
    summaryMethod: option.summaryMethod ?? defaultAttrs.summaryMethod,
    spanMethod: option.spanMethod ?? defaultAttrs.spanMethod,
    selectOnIndeterminate: option.selectOnIndeterminate ?? defaultAttrs.selectOnIndeterminate,
    indent: option.indent ?? defaultAttrs.indent,
    lazy: option.lazy ?? defaultAttrs.lazy,
    load: option.load ?? defaultAttrs.load,
    treeProps: option.treeProps ?? defaultAttrs.treeProps,
    tableLayout: option.tableLayout ?? defaultAttrs.tableLayout,
    scrollbarAlwaysOn: option.scrollbarAlwaysOn ?? defaultAttrs.scrollbarAlwaysOn,
    flexible: option.flexible ?? defaultAttrs.flexible,
  })
}
