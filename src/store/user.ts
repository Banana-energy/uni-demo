import { defineStore, } from 'pinia'
import type { UserInfoAPI, } from '@/api/user'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      userId: '',
      name: '',
      avatarUrl: '',
      token: '',
    }
  },
  actions: {
    setToken(value: string,) {
      this.token = value
    },
    setUserInfo(data: UserInfoAPI.UserInfo,) {
      const {
        userId,
        name,
        avatarUrl,
      } = data
      this.userId = userId
      this.name = name
      this.avatarUrl = avatarUrl
    },
  },
},)
