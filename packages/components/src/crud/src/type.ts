import type { ExtractPropTypes } from 'vue'
import type { crudProps, crudEmits } from './crud'
import type Crud from './crud.vue'
export * from './type/option'
export * from './type/field'

// 表格数据类型
export type ITableData = Record<string, any>

// CRUD 属性
export type ICrudProps = ExtractPropTypes<typeof crudProps>

// CRUD option 
export type ICrudOption = ICrudProps['option']

// CRUD pageModel 
export type ICrudPageModel = ICrudProps['pageModel']

// CRUD api 
export type ICrudApi = ICrudProps['api']

// CRUD 事件
export type ICrudEmits = typeof crudEmits

// CRUD 组件实例
export type ICrud = InstanceType<typeof Crud>
