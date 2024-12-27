<script setup lang="ts">
import { getCurrentInstance, } from 'vue'
import { onLaunch, } from '@dcloudio/uni-app'
import { useUserStore, } from '@/store/user'
import {
  getClientUser,
  getToken,
} from '@/api/user'

const { proxy, } = getCurrentInstance() || {}
const { $isResolve, } = proxy || {}

onLaunch(() => {
  const userStore = useUserStore()
  tt.requestAccess({
    scopeList: [],
    async success(res,) {
      if (uni.getStorageSync('jwt_token',)) {
        userStore.setToken(uni.getStorageSync('jwt_token',),)
        const data = await getClientUser()
        if (data) {
          userStore.setUserInfo(data,)
        }
        return
      }
      const userInfo = await getToken({
        code: res.code,
      },)
      if (userInfo) {
        userStore.setToken(userInfo.jwtToken,)
        userStore.setUserInfo(userInfo,)
        uni.setStorageSync('jwt_token', userInfo.jwtToken,)
      }
      // const data = (await getDictApi()) || []
      // dictStore.setDict(data,)
      $isResolve()
    },
    fail(res,) {
      console.log(`飞书小程序登陆失败: ${JSON.stringify(res,)}`,)
    },
  },)
},)
</script>

<style></style>
