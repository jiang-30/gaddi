import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import pinia, { useDictStore } from './store'
import router from './router/index'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import WComponents from '@gaddi/components'
import '@gaddi/components/dist/style.css'
import './plugin/icons'
import './styles/element-reset.css'
import './styles/index.css'
import App from './App.vue'
import { request } from '@/plugin/request'
import type { AxiosInstance } from 'axios'
import globalComponent from './plugin/components'

const app = createApp(App)

app.use(ElementPlus)
app.use(pinia)
app.use(router)
app.use(globalComponent)
app.use(WComponents, {
  axios: request as AxiosInstance,
  dictList: ref(useDictStore().dictList)
  // defaultAttrs: {},
  // defaultFieldAttrs: {},
})

app.mount('#app')
