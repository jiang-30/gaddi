import type { AxiosInstance } from 'axios'
import type { IDCrudOption } from './index'
import type { UploadProgressEvent } from 'element-plus'

export type IDOption = {
  // axios 请求实例
  axios: AxiosInstance | null
  // uploadFile
  uploadFile?: ((file: File, progress: (progressEvent: UploadProgressEvent) => void) => Promise<{ url: string, [key: string]: any }>) | null
  // crud 默认值
  defaultAttrs?: Partial<IDCrudOption>
  // crud 数据项 默认值
  defaultFieldAttrs?: Partial<IDCrudOption['fields']['0']>
  // 数据字典
  dictList?: IDDict[]
  // 权限列表
  permissions?: string[]
};

// 数据模型
export type IDModel = Record<string, any>;

// 字典数据类型
export type IDDictItem = {
  label: string;
  value: string | number
  children?: IDDictItem[]
  disabled?: boolean
};
export type IDDict = {
  label?: string
  code?: string
  url?: string
  status?: 'padding' | 'done'
  items: IDDictItem[]
}

// 数据格式化 dict、tree.props、cascader.props
export type IDDictProps = {
  res?: string,
  label?: string
  value?: string
  children?: string
  disabled?: string
}

// 表单控制域类型 image images file richtext
export type IDFieldType =
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
  | 'images';

// 表单域通用配置
export interface IDFormFieldBaseAttrs {
  clearable?: boolean
  disabled?: boolean
}

// 字段基础属性
export interface IDFieldBase {
  prop: string
  label: string
  type: IDFieldType
  // 默认值
  default?: any
  // 提示内容
  hint?: string
  // 布局
  span?: number
  // 字典数据
  dictData?: IDDictItem[]
  // 字典编码
  dictCode?: string
  // 字典地址
  dictUrl?: string
  // 响应数据格式化
  dictProps?: IDDictProps
  // 字典返回数据格式化
  dictFormatter?: (data: any) => IDDictItem[]
  // 显示数据格式化
  formatter?: (model: IDModel, field: IDFieldBase) => string
}

