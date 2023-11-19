import { createApp, ref } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import DComponents from '@gaddi/components'
import '@gaddi/components/dist/style.css'
import './styles/element-reset.css'
import './styles/index.css'
import './plugin/icon'
import { request } from '@/plugin/request'
import globalComponent from './plugin/components'
import type { AxiosInstance } from 'axios'
import App from './App.vue'
import pinia, { useDictStore } from './store'
import router from './router/index'
import { uploadFile } from './api/common'

const app = createApp(App)

app.use(ElementPlus)
app.use(pinia)
app.use(router)
app.use(globalComponent)
app.use(DComponents, {
  axios: request as AxiosInstance,
  uploadFile: uploadFile as any,
  dictList: useDictStore().dictList,
  permissions: ['gaddi'],
  defaultAttrs: {},
  defaultFieldAttrs: {},
})

app.mount('#app')
