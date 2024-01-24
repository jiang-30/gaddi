import type { AxiosProgressEvent } from 'axios'
import { request } from '@/plugin/request'
import { encrypt } from '@/utils/crypto-utils'
import type { ILoginParam, ILoginResponse } from './types'
import type { UploadProgressEvent } from 'element-plus'

// 验证码
export const queryCode = () => {
  return request({
    method: 'get',
    url: '/admin/auth/code',
  })
}

// 用户登录
export const fetchLogin = (param: ILoginParam) => {
  param.password = encrypt(param.password)

  return request<ILoginResponse>({
    method: 'post',
    url: '/admin/auth/login/username',
    data: param,
  })
}

// 查询用户信息
export const fetchProfile = () => {
  return request({
    method: 'get',
    url: '/admin/auth/profile',
  })
}

// 动态菜单
export function fetchPermission() {
  return request({
    method: 'get',
    url: '/admin/auth/permission',
  }).then(res => {
    res.data.menus.forEach((menu: any) => {
      menu.isEnabled = menu.isEnabled === '1'
      menu.isAlive = menu.isAlive === '1'
      menu.isShowMenu = menu.isShowMenu === '1'
      menu.isTab = menu.isTab === '1'
      menu.permission = menu.permission ? menu.permission.split(',') : []
    })

    return res
  })
}

// 查询字典列表
export function fetchDict() {
  return request({
    method: 'get',
    url: '/admin/dict/items/all',
  })
}

// 修改信息
export function fetchUpdateInfo(args: { nickname: string; avatar: string; resume: string }) {
  return request({
    method: 'put',
    url: '/admin/auth/info',
    data: args,
  })
}

// 修改密码
export function fetchUpdatePassword(args: { oldPassword: string; password: string }) {
  return request({
    method: 'put',
    url: '/admin/auth/password',
    data: args,
  })
}

// 文件上传
export function uploadFile(
  file: File,
  progress?: (progressEvent: UploadProgressEvent) => void,
) {
  const formData = new FormData()
  formData.append('file', file)

  return request({
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress(progressEvent) {
      if (progress && progressEvent.total) {
        const percent = (progressEvent.loaded / progressEvent.total) * 100
        progress({ ...progressEvent, percent } as any)
      }
    },
    url: '/admin/file/upload',
    data: formData,
  })
}

/**
 * 文件保存
 */
// function saveFile(name, content) {
//   axios.request({
//       url: link,
//       responseType: 'blob' //关键代码，让axios把响应改成blob
//   }).then(res => {
// const link=URL.createObjectURL(res.data)
//       download(link, fileName)
//   })
//   if (typeof name == 'undefined') {
//       throw new Error('The first parameter name is a must')
//   }
//   if (typeof content == 'undefined') {
//       throw new Error('The second parameter content is a must')
//   }
//   if (!(content instanceof Blob)) {
//       content = new Blob([content])
//   }
//   const link = URL.createObjectURL(content)
//   download(link, name)
// }
