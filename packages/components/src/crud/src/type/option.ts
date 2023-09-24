import type { TableProps, TableColumnCtx, DialogProps, PaginationProps } from 'element-plus'
import type { IDModel } from '../../../typings'

// Crud 属性
export interface IDCrudAttrs extends ICrudTableAttrs, ICrudPaginationAttrs, ICrudDialogAttrs {
  // 序号 列
  indexColumn?: boolean
  indexColumnWidth?: boolean
  indexColumnFixed?: boolean

  // 展开 列
  expandColumn?: boolean

  // 选择 列
  selectionColumn?: boolean
  // 是否可以勾选
  selectable?: TableColumnCtx<any>['selectable']
  // 数据刷新后是否保留选项，需指定 row-key
  reserveSelection?: boolean

  // 操作栏
  // printBtn
  // excelBtn
  // refreshBtn
  // columnBtn
  // searchShowBtn

  // 表格操作栏
  isRowAction?: boolean
  rowActionWidth?: string | number
  rowActionTitle?: string
  rowActionFixed?: string
  rowActionType?: string
  rowActionHeaderAlign?: string
  rowActionAlign?: string
  // 显示新增按钮
  isCreateBtn?: boolean
  createBtnPermission?: string
  // 显示详情按钮 default false
  isInfoBtn?: boolean
  infoBtnDisabled?: boolean | boolFun
  infoBtnPermission?: string
  // 显示修改按钮
  isUpdateBtn?: boolean
  updateBtnDisabled?: boolean | boolFun
  updateBtnPermission?: string
  // 显示删除按钮
  isDeleteBtn?: boolean
  deleteBtnDisabled?: boolean | boolFun
  deleteBtnPermission?: string

  // 共用属性
  align?: TableColumnCtx<any>['align']

  headerAlign?: TableColumnCtx<any>['headerAlign']
}

export type boolFun = (row: any) => boolean


// CRUD Table 属性
interface ICrudTableAttrs {
  height?: string | number
  maxHeight?: string | number
  stripe?: boolean
  border?: boolean
  size?: 'large' | 'default' | 'small'
  fit?: boolean
  showHeader?: boolean
  highlightCurrentRow?: boolean
  currentRowKey?: TableProps<IDModel>['currentRowKey']
  rowClassName?: TableProps<IDModel>['rowClassName']
  rowStyle?: TableProps<IDModel>['rowStyle']
  cellClassName?: TableProps<IDModel>['cellClassName']
  cellStyle?: TableProps<IDModel>['cellStyle']
  headerRowClassName?: TableProps<IDModel>['headerRowClassName']
  headerRowStyle?: TableProps<IDModel>['headerRowStyle']
  headerCellClassName?: TableProps<IDModel>['headerCellClassName']
  headerCellStyle?: TableProps<IDModel>['headerCellStyle']
  rowKey?: TableProps<IDModel>['rowKey']
  emptyText?: string
  defaultExpandAll?: boolean
  expandRowKeys?: TableProps<IDModel>['expandRowKeys']
  defaultSort?: TableProps<IDModel>['defaultSort']
  tooltipEffect?: TableProps<IDModel>['tooltipEffect']
  showSummary?: boolean
  sumText?: string
  summaryMethod?: TableProps<IDModel>['summaryMethod']
  spanMethod?: TableProps<IDModel>['spanMethod']
  selectOnIndeterminate?: boolean
  indent?: number
  lazy?: boolean
  load?: TableProps<IDModel>['load']
  treeProps?: TableProps<IDModel>['treeProps']
  tableLayout?: 'fixed' | 'auto'
  scrollbarAlwaysOn?: boolean
  flexible?: boolean
}

// CRUD Pagination 属性
interface ICrudPaginationAttrs {
  small?: PaginationProps['small']
  background?: PaginationProps['background']
  pagerCount?: PaginationProps['pagerCount']
  layout?: PaginationProps['layout']
  pageSizes?: PaginationProps['pageSizes']
  popperClass?: PaginationProps['popperClass']
  prevText?: PaginationProps['prevText']
  prevIcon?: PaginationProps['prevIcon']
  nextText?: PaginationProps['nextText']
  nextIcon?: PaginationProps['nextIcon']
  // disabled?: PaginationProps['disabled']
  hideOnSinglePage?: PaginationProps['hideOnSinglePage']
}

// CRUD Dialog 属性
interface ICrudDialogAttrs {
  // dialogTitle?: string;
  dialogWidth?: DialogProps['width']
  dialogFullscreen?: boolean
  dialogTop?: string
  dialogModal?: boolean
  dialogAppendToBody?: boolean
  dialogLockScroll?: boolean
  dialogCustomClass?: string
  dialogOpenDelay?: number
  dialogCloseDelay?: number
  dialogCloseOnClickModal?: boolean
  dialogCloseOnPressEscape?: boolean
  dialogShowClose?: boolean
  dialogBeforeClose?: DialogProps['beforeClose']
  dialogDraggable?: boolean
  dialogCenter?: boolean
  dialogAlignCenter?: boolean
  dialogDestroyOnClose?: boolean
}

