<script lang="ts" setup>
import type { ConfigProviderThemeVars, } from 'wot-design-uni'
import { useTabBar, } from '@/composables/useTabBar'
import WdLoading from '@/components/Loading/index.vue'
import { tabBarState, } from '@/layouts/helper'

const router = useRouter()

const route = useRoute()

const themeVars = reactive<ConfigProviderThemeVars>({},)

const {
  activeTabBar,
  getTabBarItemValue,
  setTabBarItemActive,
  tabBarList,
} = useTabBar()

function handleTabBarChange({ value, }: { value: string },) {
  setTabBarItemActive(value,)
  router.pushTab({
    name: value,
  },)
}

onMounted(() => {
  nextTick(() => {
    if (route.name && route.name !== activeTabBar.value.name) {
      setTabBarItemActive(route.name,)
    }
  },)
},)

onShow(() => {
  // #ifdef APP-PLUS
  uni.hideTabBar()
  // #endif
},)
</script>

<script lang="ts">
export default {
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared',
  },
}
</script>

<template>
  <wd-config-provider :theme-vars="themeVars" custom-style="min-height: 100vh">
    <wd-navbar
      :bordered="false"
      :title="activeTabBar.title"
      fixed
      placeholder
      safe-area-inset-top
    />
    <wd-loading :show="tabBarState.showLoading" />
    <slot />
    <wd-tabbar
      :model-value="activeTabBar.name"
      bordered
      fixed
      placeholder
      safe-area-inset-bottom
      @change="handleTabBarChange"
    >
      <wd-tabbar-item
        v-for="(item, index) in tabBarList"
        :key="index"
        :icon="item.icon"
        :name="item.name"
        :title="item.title"
        :value="getTabBarItemValue(item.name)"
      />
    </wd-tabbar>
    <wd-notify />
    <wd-toast />
    <wd-message-box />
  </wd-config-provider>
</template>

<style scoped lang="scss">
</style>
