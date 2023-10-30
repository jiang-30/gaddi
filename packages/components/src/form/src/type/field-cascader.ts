
import type { CascaderNode, CascaderProps } from 'element-plus'
import type { IDFormFieldBaseAttrs } from '../../../typings'

/**
 * el-cascader 配置
 */
export interface IDFormFieldCascaderAttrs extends IDFormFieldBaseAttrs {
  // cascaderProps -> props
  cascaderProps?: CascaderProps
  showAllLevels?: boolean
  collapseTags?: boolean
  collapseTagsTooltip?: boolean
  separator?: string
  filterable?: boolean
  filterMethod?: (node: CascaderNode, keyword: string) => boolean
  debounce?: number
  beforeFilter?: (value: string) => boolean
  popperClass?: string
  teleported?: boolean
  tagType?: 'success' | 'info' | 'warning' | 'danger'
  validateEvent?: boolean
  maxCollapseTags?: number
}
