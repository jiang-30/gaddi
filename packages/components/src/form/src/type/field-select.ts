
import type { IDFormFieldBaseAttrs } from '../../../typings'

/**
 * el-select 配置
 */
export interface IDFormFieldSelectAttrs extends IDFormFieldBaseAttrs {
  // type: Extract<IFieldType, 'select'>
  multiple?: boolean
  /**
   * 选择value为对象时获取值使用得Key
   */
  valueKey?: string
  // 'multiple',
  // 'disabled',
  // 'value-key',
  // 'size',
  // 'clearable',
  // 'collapse-tags',
  // 'collapse-tags-tooltip',
  // 'multiple-limit',
  // 'name',
  // 'effect',
  // 'autocomplete',
  // 'placeholder',
  // 'filterable',
  // 'allow-create',
  // 'filter-method',
  // 'remote',
  // 'remote-method',
  // 'loading',
  // 'loading-text',
  // 'no-match-text',
  // 'no-data-text',
  // 'popper-class',
  // 'reserve-keyword',
  // 'default-first-option',
  // 'teleported',
  // 'persistent',
  // 'automatic-dropdown',
  // 'clear-icon',
  // 'fit-input-width',
  // 'suffix-icon',
  // 'tag-type',
  // 'validate-event',
}
