import type { IDFormFieldAttrs } from '../type'
import { handle } from '../../../handler'

export const formFieldDateFormat = (field: IDFormFieldAttrs) => {
  const defaultFieldAttrs = handle.defaultFieldAttrs

  return {
    format: field.format,
    valueFormat: field.valueFormat,
  }
}


