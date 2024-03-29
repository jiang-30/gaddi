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
    multiple: field.multiple ?? false,
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
  let __resolve: (value: IDDictItem[] | PromiseLike<IDDictItem[]>) => void
  const currentTimestamp = Date.now()
  let dict = handle.dictList.find(item => item.url == field.dictUrl);

  // 不是动态请求
  // 动态请求没有过期
  if (dict && !dict._promise) {
    return dict.items;
  } else if (dict?._promise && dict?._timestamp && dict?._timestamp - currentTimestamp < 10000) {
    return await dict._promise
  }

  if (!dict) {
    dict = {
      url: field.dictUrl,
      items: [],
    }
    handle.dictList.push(dict)
  }
  dict.status = 'padding';
  dict._timestamp = currentTimestamp;
  dict._promise = new Promise((resolve) => {
    __resolve = resolve
  });

  if (handle.axios) {
    try {
      const res = await handle
        .axios({
          method: 'get',
          url: field.dictUrl,
        })


      const dictProps = {
        res: field.dictProps?.res ?? 'data',
        label: field.dictProps?.label ?? 'label',
        value: field.dictProps?.value ?? 'value',
        children: field.dictProps?.children ?? 'children',
        disabled: field.dictProps?.disabled ?? 'disabled',
      };

      let resData = at(res as any, dictProps.res)[0]
      // 可以是树结构
      const treeForEach = (tree: any) => {
        return tree.map((item: any) => {
          const newItem: IDDictItem = field.dictFormatter ? field.dictFormatter(item) : {
            label: at(item, dictProps.label)[0],
            value: at(item, dictProps.value)[0],
            tagType: item.tagType,
            disabled: at(item, dictProps.disabled)[0] === true || at(item, dictProps.disabled)[0] === '1',
          }
          if (at(item, dictProps.children)[0]) {
            newItem.children = treeForEach(at(item, dictProps.children)[0])
          }
          return newItem;
        })
      }
      resData = treeForEach(resData);

      dict.items = resData


      dict.status = 'done'
      //@ts-ignore
      __resolve(dict.items);
      return dict.items
    } catch (error) {
      console.error(error)
      //@ts-ignore
      __resolve([]);
      return []
    }
  }

  return []
}

export const formatDictItem = (row: IDModel, field: IDFieldBase) => {
  const dictItem = field.dictData?.find((item) => item.value === row[field.prop])

  return dictItem
}

// format Value 对不同的数据域类型格式化显示结果
export const formatValue = (row: IDModel, field: IDFieldBase) => {
  const value = row[field.prop]

  if (field.formatter) {
    return field.formatter(row, field)
  } else if (field.type === 'select' && field.multiple === true && Array.isArray(value)) {
    const dict = field.dictData?.filter((item) => value.includes(item.value))
    return dict?.map((item) => item.label).join(',') ?? value
  } else if (field.type === 'select' || field.type === 'radio' || field.type === 'radioButton') {
    const dict = formatDictItem(row, field)
    return dict?.label ?? value
  } else if (field.multiple === true && (field.type === 'tree' || field.type === 'cascader')) {
    const dicts: IDDictItem[] = []

    treeFind(field.dictData, (item: any) => {
      if (item.value === value) {
        dicts.push(item)
      }
    })

    return dicts.map((item: any) => item.label).join(',') ?? value
  } else if (field.type === 'tree' || field.type === 'cascader') {
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
