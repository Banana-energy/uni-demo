<script setup lang="ts">
import TabBar from '@/layouts/TabBar.vue'
import router from '@/router'

function handleClick() {
  router.push('/pages/account/index',)
}
</script>

<script lang="ts">
export default {
  name: 'HomeView',
}
</script>

<template>
  <tab-bar>
    <wd-button @click="handleClick">
      测试
    </wd-button>
  </tab-bar>
</template>

<style>

</style>
