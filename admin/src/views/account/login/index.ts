import type { IUserInfo } from '@/typings'
export interface ILoginInfo {
  accessToken: string
  expires?: number
  refreshToken?: string
  [key: string]: any
}
