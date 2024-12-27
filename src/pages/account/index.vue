<script setup lang="ts">
import type { FormInstance, } from '@wot/wd-form/types'
import TabBar from '@/layouts/TabBar.vue'

const formRef = ref<FormInstance>()
const formData = reactive({
  username: '',
  password: '',
  time: '',
  date: '',
  address: [],
},)
const rules = reactive({
  username: [ {
    required: true,
    message: '请输入用户名',
    trigger: 'blur',
  }, ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
    {
      validate: (value: string,) => {
        if (value && value.length > 6) {
          return Promise.resolve()
        }
        else {
          return Promise.reject('请输入大于6位的密码',)
        }
      },
    },
  ],
},)

async function handleSubmit() {
  const result = await formRef.value
    ?.validate()
  console.log(result,)
}
</script>

<script lang="ts">
export default {
  name: 'AccountView',
}
</script>

<template>
  <tab-bar>
    <wd-form ref="formRef" :model="formData" :rules="rules">
      <wd-cell-group title="用户信息" border>
        <wd-input
          v-model="formData.username"
          :maxlength="20"
          label="用户名"
          label-width="100px"
          placeholder="请输入用户名"
          prop="username"
          clearable
          required
          show-word-limit
        />
        <wd-input
          v-model="formData.password"
          label="密码"
          label-width="100px"
          placeholder="请输入密码"
          prop="password"
          clearable
          required
        />
      </wd-cell-group>
      <wd-cell-group title="时间和地址" border>
        <wd-datetime-picker
          v-model="formData.time"
          label="时间"
          label-width="100px"
          placeholder="请选择时间"
          prop="time"
        />
        <wd-calendar
          v-model="formData.date"
          label="日期"
          label-width="100px"
          placeholder="请选择日期"
          prop="date"
        />

        <wd-col-picker
          v-model="formData.address"
          :column-change="areaChange"
          :columns="area"
          label="地址"
          label-width="100px"
          placeholder="请选择地址"
          prop="address"
        />
      </wd-cell-group>
    </wd-form>
    <view class="footer">
      <wd-button
        size="large"
        type="primary"
        block
        @click="handleSubmit"
      >
        提交
      </wd-button>
    </view>
  </tab-bar>
</template>

<style scoped>

</style>
