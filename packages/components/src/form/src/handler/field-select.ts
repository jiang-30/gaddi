import type { IFormFieldAttrs } from '../type'
import { omitProperty, tools } from '../../../utils'

export const formFieldSelectFormat = (field: IFormFieldAttrs) => {
  const defaultFieldAttrs = tools.defaultFieldAttrs

  return {
    multiple: field.multiple,
    valueKey: field.valueKey,
  }
}

export const searchFormFieldSelectFormat = (field: IFormFieldAttrs) => {
  const defaultFieldAttrs = tools.defaultFieldAttrs

  return {
    valueKey: field.valueKey,
  }
}


const selectAttrsKey = [
  'multiple',
  'disabled',
  'value-key',
  'size',
  'clearable',
  'collapse-tags',
  'collapse-tags-tooltip',
  'multiple-limit',
  'name',
  'effect',
  'autocomplete',
  'placeholder',
  'filterable',
  'allow-create',
  'filter-method',
  'remote',
  'remote-method',
  'loading',
  'loading-text',
  'no-match-text',
  'no-data-text',
  'popper-class',
  'reserve-keyword',
  'default-first-option',
  'teleported',
  'persistent',
  'automatic-dropdown',
  'clear-icon',
  'fit-input-width',
  'suffix-icon',
  'tag-type',
  'validate-event',
]
