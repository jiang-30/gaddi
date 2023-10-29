import { request } from '@/plugin/request'


// 新增翻译内容
export const createContent = (params: any) => {
  return request({
    method: 'post',
    url: '/yijinyun/translation',
    data: params,
  })
}
