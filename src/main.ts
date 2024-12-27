import { createSSRApp, } from 'vue'
import * as pinia from 'pinia'
import App from './App.vue'
import 'uno.css'
import router from './router'

export function createApp() {
  const app = createSSRApp(App,)

  app.config.globalProperties.$onLaunched = new Promise((resolve,) => {
    app.config.globalProperties.$isResolve = resolve
  },)

  app
    .use(router,)
    .use(pinia.createPinia(),)

  return {
    app,
  }
}
