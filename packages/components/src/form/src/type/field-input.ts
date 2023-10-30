
import type { CSSProperties, Component } from 'vue'
import type { IDFormFieldBaseAttrs } from '../../../typings'

/**
 * el-input 配置
 */
export interface IDFormFieldInputAttrs extends IDFormFieldBaseAttrs {
  maxlength: string | number
  minlength: number
  showWordLimit: boolean
  placeholder: string
  // formatter -> inputFormatter
  inputFormatter: (value: string | number) => string
  parser: (value: string) => string
  showPassword: boolean
  size: 'large' | 'default' | 'small'
  prefixIcon: string | Component
  suffixIcon: string | Component
  rows: number,
  autosize: boolean | { minRows?: number, maxRows?: number }
  autocomplete: string
  name: string
  readonly: boolean
  max: boolean
  min: boolean
  step: boolean
  resize: 'none' | 'both' | 'horizontal' | 'vertical'
  autofocus: boolean
  form: string
  label: string
  tabindex: string | number
  validateEvent: boolean
  inputStyle: CSSProperties | CSSProperties[] | string[]
}
