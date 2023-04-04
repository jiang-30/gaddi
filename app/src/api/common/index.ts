import type { AxiosProgressEvent } from 'axios'
import { request } from '@/plugin/request'
import { encrypt } from '@/utils/crypto-utils'
import appConfig from '@/app.config'
import type { ILoginParam, ILoginResponse } from './types'

// 用户登录
export const fetchLogin = (param: ILoginParam) => {
  param.password = encrypt(param.password)

  if (appConfig.localUser) {
    return Promise.resolve({
      code: 1,
      data: {
        refreshToken: 'refreshToken',
        accessToken: 'accessToken',
        expires: 86400000,
      },
    })
  } else {
    return request<ILoginResponse>({
      method: 'post',
      url: '/admin/auth/login/username',
      data: param,
    })
  }
}

// 查询用户信息
export const fetchProfile = () => {
  if (appConfig.localUser) {
    return Promise.resolve({
      code: 1,
      data: {
        userInfo: {
          id: 1,
          username: 'local_admin',
          avatar: 'A',
        },
        dept: {},
        roleList: ['ROLE:ADMIN'],
      },
    })
  } else {
    return request({
      method: 'get',
      url: '/admin/auth/profile',
    })
  }
}

// 动态菜单
export function fetchPermission() {
  if (appConfig.localUser) {
    return Promise.resolve({
      code: 1,
      data: {
        menus: [],
        permissions: ['ROLE:ADMIN'],
      },
    })
  } else {
    return request({
      method: 'get',
      url: '/admin/auth/permission',
    })
  }
}

// 查询字典列表
export function fetchDict() {
  if (!appConfig.remoteDict) {
    return Promise.resolve({
      code: 1,
      data: [],
    })
  } else {
    return request({
      method: 'get',
      url: '/admin/dict/items/all',
    })
  }
}

// 修改信息
export function fetchUpdateInfo(args: { nickname: string; avatar: string; description: string }) {
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
export function fetchUpload(
  file: File,
  progress?: (percentage: number, event?: AxiosProgressEvent) => void,
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
        progress(percent, progressEvent)
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
