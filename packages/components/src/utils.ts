import { computed, ref } from 'vue'
import type { IDictItem, IFieldBaseAttrs, IOption, IProps } from './typings'

export const tools: Required<IOption> = {
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
  dictList: ref([]),
}

// dictUrl 请求字典数据
export const fetchDict = (url: string, props?: IProps) => {
  if (tools.axios && !tools.dictList.value.find(item => item.url == url)) {
    // 添加数据，防止重复请求
    tools.dictList.value.push({
      url: url,
      status: 'padding',
      items: [],
    })

    // 请求数据
    tools
      .axios({
        method: 'get',
        url: url,
      })
      .then((res) => {
        const dict = tools.dictList.value.find(item => item.url == url)
        if (dict) {
          // console.log(props?.formatter, res)
          dict.items = props?.formatter ? props.formatter(res) : res.data
          dict.status = 'done'
        }
      })
  }
}

// 通过 dictCode 或者 dictUrl 获取数据
export const dictData = (field: IFieldBaseAttrs) => {
  return computed(() => {
    let dictItems: IDictItem[] = []
    if (field.dictData) {
      dictItems = field.dictData
    } else if (field.dictCode !== null && field.dictCode !== undefined) {
      dictItems = tools.dictList.value.find(item => item.code == field.dictCode)?.items ?? []
    } else if (field.dictUrl !== null && field.dictUrl !== undefined) {
      dictItems = tools.dictList.value.find(item => item.url == field.dictUrl)?.items ?? []
    }

    return dictItems
  })
}

// // row, column, cellValue, index
// format Value 对不同的数据域类型格式化显示结果
export const formatValue = (field: any, row: any, column: any, index: any) => {
  const value = row[field.prop]
  const __labelName = field.__props.label
  const __valueName = field.__props.value
  const __children = field.__props.children

  if (field.__formatter) {
    return field.__formatter(row, column, row[field.prop], index)
  } else if (field.type === 'select' && field.multiple === true && Array.isArray(value)) {
    const dict = field.__dictData?.filter((item: any) => value.includes(item[__valueName]))
    return dict.map((item: any) => item[__labelName]).join(',')
  } else if (field.type === 'select' || field.type === 'radio' || field.type === 'radioButton') {
    const dict = field.__dictData?.find((item: any) => item[__valueName] === value) ?? {}

    return dict[__labelName] ?? value
  } else if (field.type === 'tree') {
    const dict =
      treeFind(field.__dictData, (item: any) => {
        if (item[__valueName] === value) return true
      }) ?? {}

    return dict[__labelName] ?? value
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
