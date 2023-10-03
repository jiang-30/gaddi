import type { FormItemProps } from 'element-plus'
import type { IDFieldBase } from '../../../typings'
import type { IDFormFieldSelectAttrs } from './field-select'
import type { IDFormFieldTreeAttrs } from './field-tree'
import type { IDFormFieldDateAttrs } from './field-date'
import type { IDFormFieldImagesAttrs } from './field-images'

// 表单域配置
export interface IDFormFieldAttrs extends IDFormFieldSelectAttrs, IDFormFieldTreeAttrs, IDFormFieldDateAttrs, IDFormFieldImagesAttrs { }

// ElFormItem
export interface IDFormItemAttrs extends IDFieldBase, IElFormItemAttrs {
  isForm?: boolean
  isCreateForm?: boolean
  isUpdateForm?: boolean
  // 插槽
  // formSlot?: boolean
  // 动态响应
  listen?: any
  disabled?: boolean
  createDisabled?: boolean
  updateDisabled?: boolean
}

// 搜索 ElFormItem
export interface IDSearchFormItemAttrs extends IDFieldBase, IDFormItemAttrs {
  isSearch?: boolean
  searchDefault?: any
  searchRules?: string
  searchSlot?: boolean
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

