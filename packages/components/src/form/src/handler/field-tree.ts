import type { IFormFieldAttrs } from '../type'
import { tools } from '../../../utils'

export const formFieldTreeFormat = (field: IFormFieldAttrs) => {
  const defaultFieldAttrs = tools.defaultFieldAttrs

  return {
    checkStrictly: field.checkStrictly,
    nodeKey: field.nodeKey,
    valueKey: field.valueKey ?? 'value',
    props: field.props,
  }
}

export const searchFormFieldTreeFormat = (field: IFormFieldAttrs) => {
  const defaultFieldAttrs = tools.defaultFieldAttrs

  return {
    checkStrictly: field.checkStrictly,   // 选叶子节点
    nodeKey: field.nodeKey,
    valueKey: field.valueKey ?? 'value',
    props: field.props,
  }
}
