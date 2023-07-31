import type { FormProps } from 'element-plus'
import type { IFormOption, ISearchFormOption } from '../type'
import { omitProperty, tools } from '../../../utils'

export const formAttrsFormat = (option: IFormOption): Partial<FormProps> => {
  const defaultAttrs = tools.defaultAttrs

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
export const searchFormAttrsFormat = (option: ISearchFormOption): Partial<FormProps> => {
  const defaultAttrs = tools.defaultAttrs

  return omitProperty({
    labelWidth: option.searchLabelWidth ?? defaultAttrs.searchLabelWidth,
    labelPosition: option.searchLabelPosition ?? defaultAttrs.searchLabelPosition,
    labelSuffix: option.searchLabelSuffix ?? defaultAttrs.searchLabelSuffix,
    size: option.searchFormSize ?? defaultAttrs.searchFormSize,
  })
}
