import type { IDModel } from '../../../typings'
import type { IDCrudProps, IDCrudStatus } from '../type/index'
import { handle } from '../../../handle'
import { at } from 'lodash-es'
import format from 'string-template'
import { ElNotification } from 'element-plus'

export function getApiMethod(defaultMethod: string, method?: string) {
  return method ?? defaultMethod
}

// 格式化URL
export function getApiUrl(args: IDModel, url?: string, restful?: string) {
  return format(url ?? restful ?? '', args)
}

export function beforeInterceptors(currentType: IDCrudStatus, requestConfig: any, props: IDCrudProps) {
  if (props.beforeFetch) {
    props.beforeFetch(currentType, requestConfig)
  }
}

export function afterInterceptors(currentType: IDCrudStatus, data: any, props: IDCrudProps) {
  if (props.afterFetch) {
    props.afterFetch(currentType, data)
  }
}


/**
 * 分页查询
 */
export async function queryPageApi(props: IDCrudProps, model: IDModel, searchModel: Record<string, any>) {
  if (!handle.axios || (!props.api?.page && !props.api?.restful)) {
    throw new Error("queryPage 需要配置 api 和 axios实例");
  };

  const api = props.api;
  const requestConfig = {
    method: getApiMethod('get', api.pageProps?.method),
    url: getApiUrl(model, api.page, api.restful),
    params: searchModel
  }

  beforeInterceptors('query', requestConfig, props);
  const res: any = await handle.axios(requestConfig);
  const data = {
    data: at(res, api.pageProps?.res ?? 'data.records')[0],
    total: at(res, api.pageProps?.total ?? 'data.total')[0]
  };
  afterInterceptors('query', data, props);

  return data;
}


/**
 * 列表查询
 */
export async function queryListApi(props: IDCrudProps, model: IDModel, searchModel: Record<string, any>) {
  if (!handle.axios || !props.api?.list) {
    throw new Error("queryList 需要配置 api 和 axios实例");
  };

  const api = props.api;
  const requestConfig = {
    method: getApiMethod('get', api.listProps?.method),
    url: getApiUrl(model, api.list),
    params: searchModel
  }

  beforeInterceptors('query', requestConfig, props)
  const res: any = await handle.axios(requestConfig)
  const data = at(res, api.listProps?.res ?? 'data')[0];
  afterInterceptors('query', data, props);

  return data
}


/**
 * 详情查询
 */
export async function queryInfoApi(props: IDCrudProps, model: IDModel) {
  if (!handle.axios || !props.api) {
    throw new Error("queryInfo 需要配置 api 和 axios实例");
  };

  const api = props.api;
  const requestConfig = {
    method: getApiMethod('get', api.infoProps?.method),
    url: getApiUrl(model, api.info, api.restful + '/{id}'),
  }

  beforeInterceptors('info', requestConfig, props)
  const res: any = await handle.axios(requestConfig)
  const data = at(res, api.infoProps?.res ?? 'data')[0];
  afterInterceptors('info', data, props);

  return data
}


/**
 * 新建
 */
export async function createApi(props: IDCrudProps, model: IDModel) {
  if (!handle.axios || (!props.api?.create && !props.api?.restful)) {
    throw new Error("create 需要配置 api 和 axios实例");
  };

  const api = props.api;
  const requestConfig = {
    method: getApiMethod('post', api.createProps?.method),
    url: getApiUrl(model, api.create, api.restful),
    data: model
  }

  beforeInterceptors('create', requestConfig, props)
  const res: any = await handle.axios(requestConfig)
  const data = at(res, api.createProps?.res ?? 'data')[0];
  afterInterceptors('create', data, props);
  ElNotification({
    title: '提示',
    message: '新增成功！',
    type: 'success',
  })

  return data
}

/**
 * 更新
 */
export async function updateApi(props: IDCrudProps, model: IDModel) {
  if (!handle.axios || !props.api) {
    throw new Error("update 需要配置 api 和 axios实例");
  };

  const api = props.api;
  const requestConfig = {
    method: getApiMethod('put', api.updateProps?.method),
    url: getApiUrl(model, api.update, api.restful),
    data: model,
  };

  beforeInterceptors('update', requestConfig, props)
  const res: any = await handle.axios(requestConfig)
  const data = at(res, api.updateProps?.res ?? 'data')[0];
  afterInterceptors('update', data, props);
  ElNotification({
    title: '提示',
    message: '修改成功！',
    type: 'success',
  })

  return data
}

/**
 * 删除
 */
export async function deleteApi(props: IDCrudProps, model: IDModel) {
  if (!handle.axios || (!props.api?.delete && !props.api?.restful)) {
    throw new Error("delete 需要配置 api 和 axios实例");
  };

  const api = props.api;
  const requestConfig = {
    method: getApiMethod('delete', api.deleteProps?.method),
    url: getApiUrl(model, api.delete, api.restful + '/{id}'),
  }

  beforeInterceptors('delete', requestConfig, props)
  const res: any = await handle.axios(requestConfig)
  const data = at(res, api.deleteProps?.res ?? 'data')[0];
  afterInterceptors('delete', data, props);
  ElNotification({
    title: '提示',
    message: '删除成功！',
    type: 'success',
  })

  return data
} 
