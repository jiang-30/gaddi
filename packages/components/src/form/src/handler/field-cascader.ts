import type { IDFormFieldAttrs } from '../type'
import { handle } from '../../../handler'

export const formFieldCascaderFormat = (field: IDFormFieldAttrs) => {
  const defaultFieldAttrs = handle.defaultFieldAttrs

  return {
    props: field.cascaderProps,
    showAllLevels: field.showAllLevels,
    collapseTags: field.collapseTags,
    collapseTagsTooltip: field.collapseTagsTooltip,
    separator: field.separator,
    filterable: field.filterable,
    filterMethod: field.filterMethod,
    debounce: field.debounce,
    beforeFilter: field.beforeFilter,
    popperClass: field.popperClass,
    teleported: field.teleported,
    tagType: field.tagType,
    validateEvent: field.validateEvent,
    maxCollapseTags: field.maxCollapseTags,
  }
}


export const searchFormFieldCascaderFormat = (field: IDFormFieldAttrs) => {
  const defaultFieldAttrs = handle.defaultFieldAttrs

  return formFieldCascaderFormat(field)
}


