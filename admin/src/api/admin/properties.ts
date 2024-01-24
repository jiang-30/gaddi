import { request } from '@/plugin/request'

// 保存配置信息
export function updateProperties(params: any) {
  return request({
    method: 'put',
    url: `/admin/properties`,
    data: params
  })
}

// 通过code查询配置信息
export function queryPropertiesByCode(code: string) {
  return request({
    method: 'get',
    url: `/admin/properties/code/${code}`,
  })
}
