import { defineUniPages, } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  // 你也可以定义 pages 字段，它具有最高的优先级。
  pages: [],
  globalStyle: {
    navigationBarBackgroundColor: '#409eff',
    navigationBarTextStyle: 'white',
    navigationBarTitleText: '@uni-helper',
  },
},)
