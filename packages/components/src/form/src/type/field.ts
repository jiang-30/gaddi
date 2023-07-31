import type { FormItemProps } from 'element-plus'
import type { IFieldBaseAttrs } from '../../../typings'
import type { IFormFieldSelectAttrs } from './field-select'
import type { IFormFieldTreeAttrs } from './field-tree'
import type { IFormFieldDateAttrs } from './field-date'
import type { IFormFieldImagesAttrs } from './field-images'

// 表单域配置
export interface IFormFieldAttrs extends IFormFieldSelectAttrs, IFormFieldTreeAttrs, IFormFieldDateAttrs, IFormFieldImagesAttrs { }

// 搜索 ElFormItem
export interface ISearchFormItemAttrs extends IFieldBaseAttrs, IFormItemAttrs {
  isSearch?: boolean
  searchDefault?: any
  searchRules?: string
  searchSlot?: boolean
}

// ElFormItem
export interface IFormItemAttrs extends IFieldBaseAttrs, IElFormItemAttrs {
  isForm?: boolean
  isCreateForm?: boolean
  isUpdateForm?: boolean
  // 默认值
  default?: any
  // 插槽
  // formSlot?: boolean
  // 动态响应
  listen?: any
  // 布局
  span?: number
  // 提示信息
  hint?: string
  // form-control
  // clearable
  disabled?: boolean
  createDisabled?: boolean
  updateDisabled?: boolean
}


// 传递给 ElFormItem 组件的属性
interface IElFormItemAttrs {
  labelWidth?: FormItemProps['labelWidth']
  required?: FormItemProps['required']
  rules?: FormItemProps['rules']
  error?: FormItemProps['error']
  showMessage?: FormItemProps['showMessage']
  inlineMessage?: FormItemProps['inlineMessage']
  size?: FormItemProps['size']
}

