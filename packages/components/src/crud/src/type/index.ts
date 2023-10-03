import type { ExtractPropTypes } from 'vue'
import type { crudProps, crudEmits } from '../crud'
import type Crud from '../crud.vue'
export * from './api'
export * from './page'
export * from './option'
export * from './field'

// crud
export type IDCrudStatus = 'table' | 'query' | 'info' | 'create' | 'update' | 'delete'

export type IDCrudQueryType = 'init' | 'search' | 'reset' | 'refresh' | 'pageChange' | 'sizeChange' | 'update' | 'create' | "delete" | 'expose'

// CRUD 组件实例
export type IDCrud = InstanceType<typeof Crud>

// CRUD 属性
export type IDCrudProps = ExtractPropTypes<typeof crudProps>

// CRUD option 
export type IDCrudOption = IDCrudProps['option']

// beforeFetch
export type IDCrudBeforeFetchFn = IDCrudProps['beforeFetch']
// afterFetch
export type IDCrudAfterFetchFn = IDCrudProps['afterFetch']
// beforeOpen
export type IDCrudBeforeOpenFn = IDCrudProps['beforeOpen']
// queryHandler
export type IDCrudQueryHandlerFn = IDCrudProps['queryHandler']
// createHandler
export type IDCrudCreateHandlerFn = IDCrudProps['createHandler']
// updateHandler
export type IDCrudUpdateHandlerFn = IDCrudProps['updateHandler']
// deleteHandler
export type IDCrudDeleteHandlerFn = IDCrudProps['deleteHandler']

// CRUD 事件
export type IDCrudEmit = typeof crudEmits

