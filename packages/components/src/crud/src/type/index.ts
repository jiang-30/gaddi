import type { ExtractPropTypes } from 'vue'
import type { crudProps, crudEmits } from '../crud'
import type Crud from '../crud.vue'
export * from './api'
export * from './page'
export * from './option'
export * from './field'

// crud
export type IDCrudStatus = 'table' | 'query' | 'info' | 'create' | 'update' | 'delete'

export type IDCrudQueryType = 'init' | 'search' | 'reset' | 'refresh' | 'pageChange' | 'sizeChange' | 'update' | 'createOrDelete' | 'expose'

// CRUD 组件实例
export type IDCrud = InstanceType<typeof Crud>

// CRUD 属性
export type IDCrudProps = ExtractPropTypes<typeof crudProps>

// CRUD option 
export type IDCrudOption = IDCrudProps['option']

// CRUD 事件
export type IDCrudEmit = typeof crudEmits

// beforeFetch
export type IDBeforeFetchFn = IDCrudProps['beforeFetch']
// afterFetch
export type IDAfterFetchFn = IDCrudProps['afterFetch']
// beforeOpen
export type IDBeforeOpenFn = IDCrudProps['beforeOpen']
// queryHandler
export type IDQueryHandlerFn = IDCrudProps['queryHandler']
// createHandler
export type IDCreateHandlerFn = IDCrudProps['createHandler']
// updateHandler
export type IDUpdateHandlerFn = IDCrudProps['updateHandler']
// deleteHandler
export type IDDeleteHandlerFn = IDCrudProps['deleteHandler']

