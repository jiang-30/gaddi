import type { TableColumnCtx } from 'element-plus'
import type { IFieldBaseAttrs } from '../../../typings'

// CRUD.FIELD 属性
export interface ICrudColumnAttrs extends IFieldBaseAttrs, ICrudTableColumnAttrs {
  // 是否是表格项
  isTable?: boolean
  // 是否在表格中显示
  isTableShow?: boolean // isVisible
  tableSlot?: boolean
}

// CRUD Table Field 属性
interface ICrudTableColumnAttrs {
  // type?: "selection" | "index" | "expand"; // form 冲突
  index?: number | ((index: number) => number)
  columnKey?: string
  width?: string | number
  minWidth?: string | number
  fixed?: string | boolean
  renderHeader?: TableColumnCtx<any>['renderHeader']
  sortable?: boolean | string
  sortMethod?: TableColumnCtx<any>['sortMethod']
  sortBy?: TableColumnCtx<any>['sortBy']
  sortOrders?: TableColumnCtx<any>['sortOrders']
  resizable?: boolean
  formatter?: TableColumnCtx<any>['formatter']
  showOverflowTooltip?: boolean
  align?: string
  headerAlign?: string
  className?: string
  labelClassName?: string
  filters?: TableColumnCtx<any>['filters']
  filterPlacement?: TableColumnCtx<any>['filterPlacement']
  filterMultiple?: TableColumnCtx<any>['filterMultiple']
  filterMethod?: TableColumnCtx<any>['filterMethod']
  filteredValue?: TableColumnCtx<any>['filteredValue']
}

