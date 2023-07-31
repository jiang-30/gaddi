import { request } from '@/plugin/request'

// 新增
export const createUser = (params: any) => {
  return request({
    method: 'post',
    url: '/admin/user-info',
    data: params,
  })
}

// 修改
export const updateUser = (params: any) => {
  return request({
    method: 'put',
    url: '/admin/user-info',
    data: params,
  })
}

// 删除
export const deleteUser = (id: number) => {
  return request({
    method: 'delete',
    url: `/admin/user-info/${id}`,
  })
}

// 详情查询
export const queryUser = (params: any) => {
  return request({
    method: 'get',
    url: `/admin/user-info`,
    params: params,
  })
}

// 列表查询
export const queryUserList = (params: any) => {
  return request({
    method: 'get',
    url: `/admin/user-info`,
    params: params,
  })
}

// 分页查询
export const queryUserPage = (params: any) => {
  return request({
    method: 'get',
    url: `/admin/user-info`,
    params: params,
  })
}
