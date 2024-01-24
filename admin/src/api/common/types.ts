import type { IUserInfo } from '@/typings'

export type ILoginParam = {
  username: string
  password: string
  code: string,
  codeKey: string,
}

export type ILoginResponse = {
  refreshToken: string
  accessToken: string
  expires: number
}

export interface ITestQuery {
  username: string
  password: string
}

export interface ITest {
  id: number
  username: string
  description: string
}

export type IProfileRequest = {}
