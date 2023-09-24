import type { FormProps } from 'element-plus'

// Search Form
export interface IDSearchFormAttrs extends IDFormAttrs {
  searchLabelWidth?: FormProps['labelWidth']
  searchLabelPosition?: FormProps['labelPosition']
  searchLabelSuffix?: FormProps['labelSuffix']
  searchFormSize?: FormProps['size']
}

// Form 属性 ElFormAttrs
export interface IDFormAttrs extends IElFormAttrs {
  // 配置默认formItem span
  span?: number
}

// 传递给 ElForm 组件的属性
interface IElFormAttrs {
  rules?: FormProps['rules']
  inline?: FormProps['inline']
  labelPosition?: FormProps['labelPosition']
  labelWidth?: FormProps['labelWidth']
  labelSuffix?: FormProps['labelSuffix']
  hideRequiredAsterisk?: FormProps['hideRequiredAsterisk']
  requireAsteriskPosition?: FormProps['requireAsteriskPosition']
  showMessage?: FormProps['showMessage']
  inlineMessage?: FormProps['inlineMessage']
  statusIcon?: FormProps['statusIcon']
  validateOnRuleChange?: FormProps['validateOnRuleChange']
  formSize?: FormProps['size']
  scrollToError?: FormProps['scrollToError']
}
