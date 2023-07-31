import type { TableProps, TableColumnCtx, DialogProps, PaginationProps } from 'element-plus'

// 表格数据类型
export type ITableData = Record<string, any>

// Crud 属性
export interface ICrudAttrs extends ICrudTableAttrs, ICrudPaginationAttrs, ICrudDialogAttrs {
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
  createBtnPermission?: boolean

  // 显示详情按钮 default false
  isInfoBtn?: boolean
  infoBtnDisabled?: boolean
  // 显示修改按钮
  isUpdateBtn?: boolean
  updateBtnDisabled?: boolean
  updateBtnPermission?: boolean
  // 显示删除按钮
  isDeleteBtn?: boolean
  deleteBtnDisabled?: boolean
  deleteBtnPermission?: boolean

  // 共用属性
  align?: TableColumnCtx<any>['align']

  headerAlign?: TableColumnCtx<any>['headerAlign']
}


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
  currentRowKey?: TableProps<ITableData>['currentRowKey']
  rowClassName?: TableProps<ITableData>['rowClassName']
  rowStyle?: TableProps<ITableData>['rowStyle']
  cellClassName?: TableProps<ITableData>['cellClassName']
  cellStyle?: TableProps<ITableData>['cellStyle']
  headerRowClassName?: TableProps<ITableData>['headerRowClassName']
  headerRowStyle?: TableProps<ITableData>['headerRowStyle']
  headerCellClassName?: TableProps<ITableData>['headerCellClassName']
  headerCellStyle?: TableProps<ITableData>['headerCellStyle']
  rowKey?: TableProps<ITableData>['rowKey']
  emptyText?: string
  defaultExpandAll?: boolean
  expandRowKeys?: TableProps<ITableData>['expandRowKeys']
  defaultSort?: TableProps<ITableData>['defaultSort']
  tooltipEffect?: TableProps<ITableData>['tooltipEffect']
  showSummary?: boolean
  sumText?: string
  summaryMethod?: TableProps<ITableData>['summaryMethod']
  spanMethod?: TableProps<ITableData>['spanMethod']
  selectOnIndeterminate?: boolean
  indent?: number
  lazy?: boolean
  load?: TableProps<ITableData>['load']
  treeProps?: TableProps<ITableData>['treeProps']
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

