import type { IDFormFieldAttrs } from '../type'
import { handle } from '../../../handler'

export const formFieldInputFormat = (field: IDFormFieldAttrs) => {
  const defaultFieldAttrs = handle.defaultFieldAttrs

  return {
    maxlength: field.maxlength,
    minlength: field.minlength,
    showWordLimit: field.showWordLimit,
    placeholder: field.placeholder,
    formatter: field.inputFormatter,
    parser: field.parser,
    showPassword: field.showPassword,
    size: field.size,
    prefixIcon: field.prefixIcon,
    suffixIcon: field.suffixIcon,
    rows: field.rows,
    autosize: field.autosize,
    autocomplete: field.autocomplete,
    name: field.name,
    readonly: field.readonly,
    max: field.max,
    min: field.min,
    step: field.step,
    resize: field.resize,
    autofocus: field.autofocus,
    form: field.form,
    label: field.label,
    tabindex: field.tabindex,
    validateEvent: field.validateEvent,
    inputStyle: field.inputStyle,
  }
}


