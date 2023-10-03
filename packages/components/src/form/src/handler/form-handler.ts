import type { FormProps } from 'element-plus'
import type { IDFormOption, IDSearchFormOption } from '../type'
import { omitProperty, handle } from '../../../handle'

export const formAttrsFormat = (option: IDFormOption): Partial<FormProps> => {
  const defaultAttrs = handle.defaultAttrs

  return omitProperty({
    rules: option.rules ?? defaultAttrs.rules,
    inline: option.inline ?? defaultAttrs.inline,
    labelPosition: option.labelPosition ?? defaultAttrs.labelPosition,
    labelWidth: option.labelWidth ?? defaultAttrs.labelWidth,
    labelSuffix: option.labelSuffix ?? defaultAttrs.labelSuffix,
    hideRequiredAsterisk: option.hideRequiredAsterisk ?? defaultAttrs.hideRequiredAsterisk,
    requireAsteriskPosition: option.requireAsteriskPosition ?? defaultAttrs.requireAsteriskPosition,
    showMessage: option.showMessage ?? defaultAttrs.showMessage,
    inlineMessage: option.inlineMessage ?? defaultAttrs.inlineMessage,
    statusIcon: option.statusIcon ?? defaultAttrs.statusIcon,
    validateOnRuleChange: option.validateOnRuleChange ?? defaultAttrs.validateOnRuleChange,
    size: option.formSize ?? defaultAttrs.formSize,
    scrollToError: option.scrollToError ?? defaultAttrs.scrollToError,
  })
}

// ElForm 属性
export const searchFormAttrsFormat = (option: IDSearchFormOption): Partial<FormProps> => {
  const defaultAttrs = handle.defaultAttrs

  return omitProperty({
    labelWidth: option.searchLabelWidth ?? defaultAttrs.searchLabelWidth,
    labelPosition: option.searchLabelPosition ?? defaultAttrs.searchLabelPosition,
    labelSuffix: option.searchLabelSuffix ?? defaultAttrs.searchLabelSuffix,
    size: option.searchFormSize ?? defaultAttrs.searchFormSize,
  })
}
