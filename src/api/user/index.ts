export namespace UserInfoAPI {
  export interface UserInfo {
    /**
     * 用户Id
     */
    userId: string
    /**
     * 用户名称
     */
    name: string
    /**
     * 用户头像
     */
    avatarUrl: string
    /**
     * 用户邮箱
     */
    email: string
    /**
     * jwtToken
     */
    jwtToken: string
  }
  export type Response = ResponseData<UserInfo>
}

// 获取已登录的用户信息
export function getClientUser() {
  return postJSON<UserInfoAPI.Response>({
    url: '/pdm/common/sso/client/user',
  },)
}

// 获取JWTToken
export function getToken({ code, }: { code: string },) {
  return get<UserInfoAPI.Response>({
    url: `/loginCallback/miniprogram?fromApp=FMS&code=${code}`,
    origin: 'sso',
  },)
}
