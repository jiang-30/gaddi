import type { FormItemProps } from 'element-plus'
import type { IDFormItemAttrs, IDSearchFormItemAttrs } from '../type'
import { omitProperty, handle } from '../../../handler'

export const formItemAttrsFormat = (field: IDFormItemAttrs): Partial<FormItemProps> => {
  const defaultFieldAttrs = handle.defaultFieldAttrs

  return {
    labelWidth: field.labelWidth,
    required: field.required,
    rules: field.rules,
    error: field.error,
    showMessage: field.showMessage,
    inlineMessage: field.inlineMessage,
    size: field.size,
  }
}

export const searchFormItemAttrsFormat = (field: IDSearchFormItemAttrs): Partial<FormItemProps> => {
  const defaultFieldAttrs = handle.defaultFieldAttrs

  return {
    labelWidth: field.labelWidth,
    required: field.required,
    error: field.error,
    size: field.size,
  }
}

