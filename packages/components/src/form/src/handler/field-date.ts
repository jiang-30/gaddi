import type { IFormFieldAttrs } from '../type'
import { tools } from '../../../utils'

export const formFieldDateFormat = (field: IFormFieldAttrs) => {
  const defaultFieldAttrs = tools.defaultFieldAttrs

  return {
    format: field.format,
    valueFormat: field.valueFormat,
  }
}


