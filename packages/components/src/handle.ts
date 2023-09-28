import { at } from 'lodash-es'
import type { IDDict, IDDictItem, IDFieldBase, IDModel, IDOption } from './typings'

export const handle: Required<IDOption> = {
  axios: null,
  uploadFile: null,
  defaultAttrs: {
    background: true,
    layout: ' ->, total, sizes, prev, pager, next, jumper',
    pageSizes: [10, 20, 50, 100],
    hideOnSinglePage: true,
    dialogWidth: '700px',
    dialogAppendToBody: true,
    border: true,
    rowKey: 'id',
    infoBorder: true,
    rowActionWidth: 160,
    // 表格居中
    headerAlign: 'center',
    align: 'center',
  },
  defaultFieldAttrs: {
    props: {
      value: 'value',
      label: 'label',
    },
  },
  dictList: [],
  permissions: [],
}

// 格式化公用字段
export async function getBaseFields(field: IDFieldBase): Promise<IDFieldBase> {
  return {
    label: field.label,
    prop: field.prop,
    type: field.type,
    default: field.default,
    hint: field.hint,
    span: field.span ?? 24,
    formatter: field.formatter,
    dictData: await getDictData(field),
  }
}

// 获取字典数据 通过 dictCode 或者 dictUrl 获取数据
export const getDictData = async (field: IDFieldBase) => {
  let dictItems: IDDictItem[] = []
  if (field.dictData) {
    dictItems = field.dictData
  } else if (field.dictCode) {
    dictItems = handle.dictList.find(item => item.code == field.dictCode)?.items ?? []
  } else if (field.dictUrl) {
    dictItems = await fetchDict(field)
  }

  return dictItems
}

// dictUrl 请求字典数据
export const fetchDict = async (field: IDFieldBase) => {
  try {
    const dict = handle.dictList.find(item => item.url == field.dictUrl);
    if (dict) return dict.items;

    const dictProps = {
      res: field.dictProps?.res ?? 'data',
      label: field.dictProps?.label ?? 'label',
      value: field.dictProps?.value ?? 'value',
      children: field.dictProps?.children ?? 'children',
      disabled: field.dictProps?.disabled ?? 'disabled',
    };

    if (handle.axios) {
      // 添加数据，防止重复请求
      const _dict: IDDict = {
        url: field.dictUrl,
        status: 'padding',
        items: [],
      }
      handle.dictList.push(_dict)

      // 请求数据
      const res = await handle
        .axios({
          method: 'get',
          url: field.dictUrl,
        })

      let resData = at(res as any, dictProps.res)[0]
      resData = resData.map((item: any) => {
        return {
          label: at(item, dictProps.label)[0],
          value: at(item, dictProps.value)[0],
          children: at(item, dictProps.children)[0],
          disabled: at(item, dictProps.disabled)[0],
        }
      })
      // console.log(props?.formatter, res)
      _dict.items = field.dictFormatter ? field.dictFormatter(resData) : resData
      _dict.status = 'done'
      return _dict.items
    }
  } catch (error) {
    console.error(error)
  }
  return []
}

// format Value 对不同的数据域类型格式化显示结果
export const formatValue = (row: IDModel, field: any) => {
  const value = row[field.prop]

  if (field.formatter) {
    return field.formatter(row, field)
  } else if (field.type === 'select' && field.multiple === true && Array.isArray(value)) {
    const dict = field.dictData?.filter((item: any) => value.includes(item.value))
    return dict?.map((item: any) => item.label).join(',') ?? value
  } else if (field.type === 'select' || field.type === 'radio' || field.type === 'radioButton') {
    const dict = field.dictData?.find((item: any) => item.value === value) ?? {}
    return dict?.label ?? value
  } else if (field.type === 'tree') {
    const dict =
      treeFind(field.dictData, (item: any) => {
        if (item.value === value) return true
      }) ?? {}

    return dict.label ?? value
  }
  return value
}

// 移除 undefined 属性
export const omitProperty = <T extends Record<string, any>>(obj: T) => {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop) && obj[prop] === undefined) {
      delete obj[prop]
    }
  }
  return obj
}

function treeFind(tree: any, func: any, props?: any): any {
  props = {
    children: 'children',
    ...(props ?? {}),
  }
  for (const node of tree) {
    if (func(node)) return node
    if (node[props.children]) {
      const res = treeFind(node[props.children], func, props)
      if (res) return res
    }
  }
  return null
}
