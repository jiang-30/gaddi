import type { IDFormFieldAttrs } from '../type'
import { handle } from '../../../handler'

export const formFieldTreeFormat = (field: IDFormFieldAttrs) => {
  const defaultFieldAttrs = handle.defaultFieldAttrs

  return {
    checkStrictly: field.checkStrictly,
    nodeKey: field.nodeKey,
    valueKey: field.valueKey ?? 'value',
    multiple: field.multiple,
    props: field.props,
  }
}

export const searchFormFieldTreeFormat = (field: IDFormFieldAttrs) => {
  const defaultFieldAttrs = handle.defaultFieldAttrs

  return {
    checkStrictly: field.checkStrictly,   // 选叶子节点
    nodeKey: field.nodeKey,
    valueKey: field.valueKey ?? 'value',
    props: field.props,
  }
}
