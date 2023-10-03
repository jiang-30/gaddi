---
title: CRUD
outline: [2, 3]
---

# crud
快速构建增删查改页面

crud、form、info

## 快速开始
- WSearchForm
- WForm
- WInfo

### 添加依赖
```bash
pnpm install @gaddi/components
```

### 配置

1. 注册组件
```ts
import WComponents from '@gaddi/components'
import '@gaddi/components/dist/style.css'

app.use(WComponents, {
    // fetch 请求
    axios: request as AxiosInstance,

    // option 默认配置
    defaultAttrs: {},

    // option.field 默认配置
    defaultFieldAttrs: {},

    // 字典项, 可以通过 key 来匹配
    dictList: [],
})
```

2. ts类型支持
```json
{
   "compilerOptions": {
    "types": ["@gaddi/components/global"]
  }
}
```


## 基础使用
```vue
<template>
    <w-crud :option="option"> </w-crud>
</template>

<script setup>
import { WCrud, type ICrudOption } from "@gaddi/components";

const option = ref<ICrudOption>({
  fields: [
    {
      prop: "title",
      label: "名称",
      type: "input",
      rules: [
        { required: true, message: "请输入名称", trigger: "change" },
        {
          type: "string",
          max: 20,
          message: "20个字符以内",
          trigger: "change",
        },
      ],
      isSearch: true,
    },
    {
      prop: "note",
      label: "备注",
      type: "textarea",
      isTable: false,
      rules: [
        {
          type: "string",
          max: 255,
          message: "255个字符以内",
          trigger: "change",
        },
      ],
    },
  ],
});
</script>
```


<!-- ## 配置
<BaseComponent />

<details>
  <summary>查看代码</summary>

<<< docs/.vitepress/examples/table/base.vue

</details> -->




## 属性
| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| option        | 配置          | | | |
| pageModel     | 分页数据       | | | |
| searchModel   | | | | |
| loading       | | | | |
| tableData     | | | | |
| currentData   | | | | |
| currentModel  | | | | |

### option
#### ICrudAttrs
表格配置、分页配置、弹窗配置
- IElTableAttrs
- IElPaginationAttrs
- IElDialogAttrs

#### IFormAttrs
表单配置

#### ISearchFormAttrs
搜索表格配置

#### IInfoAttrs
详情配置

#### fields
字段配置，type 类型有 input、inputNumber、textarea、select、radio、radioButton、tree
- 表格相关 ICrudColumnAttrs   
- 详情相关配置 IInfoItemAttrs    
- 表单配置 IFormItemAttrs    
- 搜索表单配置 ISearchFormItemAttrs
- 表单域配置 IFormFieldAttrs
    - IInputAttrs
    - ISelectAttrs


### searchModel
搜索model， 根据option配置的搜索字段生成

### pageModel
`可选` 分页数据

```ts
{
  // 当前页码
  current: number
  // 每页数量
  size: number
  // 总数
  total: number
}
```

### api
crud 接口路径

```ts
{
  /**
   * create、update、delete、info、page、list
   */
  restful?: string
  // 列表路径
  list?: string
  // 分页路径
  page?: string
  // 详情路径
  info?: string
  // 新建路径
  create?: string
  // 修改路径
  update?: string
  // 删除
  delete?: string
}
```

### tableLoading
表格 loading 状态

### tableData
表格数据

### modelValue
表格选择、新建、修改、详情等情况的数据模型

### beforeOpen

### beforeFetch

### afterFetch

### onQuery

### onCreate

### onUpdate

### onDelete


## 事件
| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| init                | 搜索条件初始化 |
| search              | 搜索查询            |
| searchReset         | 搜索重置            |
| pageCurrentChange   | 分页当前页发生变化   |
| pageSizeChange      | 分页每页数量发生变化 |
| refresh             | 刷新                |



## 方法
| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| getTable          | 获取ElTable                               | -                         |
| refresh           | pageModel.current = 1, 并重新请求数据      | -                         |
| openCreate        | 打开新建表单弹窗                           | row                       |
| openUpdate        | 打开修改表单弹窗                           | row                       |
| openInfo          | 打开详情弹窗                               | row                       |


## 插槽
| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| action                | 表格上方操作栏                                 |
| row-action            | 表格操作行插槽，追加到后面                      |
| expand                | 表格expand                                    |
| [field.prop]          | field.prop 同名可以插入 el-table-column 中     |
| [field.prop + Form]   | 表单     |
| [field.prop + Info]   | 详情，[field.prop + Info ] 优先级高于 [field.prop]   |


## 常见问题


<!-- <Repl :store="store" /> -->
<!-- theme/index 全局注册后不需要引入 -->
<!-- <script setup>
import BaseComponent from '../.vitepress/examples/table/base.vue'

</script> -->
