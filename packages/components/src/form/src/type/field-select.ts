
import type { IFieldType, IFormFieldBaseAttrs } from '../../../typings'

export interface IFormFieldSelectAttrs extends IFormFieldBaseAttrs {
  // type: Extract<IFieldType, 'select'>
  multiple?: boolean
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
