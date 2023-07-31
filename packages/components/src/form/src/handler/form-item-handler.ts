import type { FormItemProps } from 'element-plus'
import type { IFormItemAttrs, ISearchFormItemAttrs } from '../type'
import { omitProperty, tools } from '../../../utils'

export const formItemAttrsFormat = (field: IFormItemAttrs): Partial<FormItemProps> => {
  const defaultFieldAttrs = tools.defaultFieldAttrs

  return omitProperty({
    labelWidth: field.labelWidth,
    required: field.required,
    rules: field.rules,
    error: field.error,
    showMessage: field.showMessage,
    inlineMessage: field.inlineMessage,
    size: field.size,
  })
}

export const searchFormItemAttrsFormat = (field: ISearchFormItemAttrs): Partial<FormItemProps> => {
  const defaultFieldAttrs = tools.defaultFieldAttrs

  return omitProperty({
    labelWidth: field.labelWidth,
    required: field.required,
    error: field.error,
    size: field.size,
  })
}

