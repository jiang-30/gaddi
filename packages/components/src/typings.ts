import type { Ref } from 'vue'
import type { AxiosInstance } from 'axios'
import type { ICrudOption } from './index'
import type { UploadProgressEvent } from 'element-plus'

export type IOption = {
  // axios 请求实例
  axios: AxiosInstance | null
  // uploadFile
  uploadFile?: ((file: File, progress: (progressEvent: UploadProgressEvent) => void) => Promise<{ url: string, [key: string]: any }>) | null

  dictList?: Ref<IDict[]>
  // crud 默认值
  defaultAttrs?: Partial<ICrudOption>
  // crud 数据项 默认值
  defaultFieldAttrs?: Partial<ICrudOption['fields']['0']>
}

// 表单控制域类型 image images file richtext
export type IFieldType =
  | 'input'
  | 'textarea'
  | 'password'
  | 'inputNumber'
  | 'select'
  | 'cascader'
  | 'radio'
  | 'radioButton'
  | 'tree'
  | 'year'
  | 'month'
  | 'date'
  | 'dates'
  | 'datetime'
  | 'week'
  | 'datetimerange'
  | 'daterange'
  | 'monthrange'
  | 'image'
  | 'images'

// 字典数据类型
export type IDictItem = {
  label: string;
  value: string | number
  disabled?: boolean
  children?: IDictItem[]
}
export type IDict = {
  name?: string
  code?: string
  url?: string
  status?: 'padding' | 'done'
  items: IDictItem[]
}

// crud
export type IDataType = 'info' | 'create' | 'update' | 'row' | 'table'

// 弹窗类型
export type IDialogType = 'info' | 'create' | 'update'

// 表格类型
export type IFormType = 'create' | 'update'

// 数据格式化 dict、tree.props、cascader.props
export type IProps = {
  label?: string
  value?: string
  children?: string
  formatter?: (res: any) => IDictItem[]
}

// 字段基础属性
export interface IFieldBaseAttrs {
  prop: string
  label: string
  type: IFieldType
  // 字典数据
  dictData?: IDictItem[]
  // 字典编码
  dictCode?: string
  // 字典地址
  dictUrl?: string
  props?: IProps
}

// 表单域通用配置
export interface IFormFieldBaseAttrs {
  clearable?: boolean
  disabled?: boolean
}
