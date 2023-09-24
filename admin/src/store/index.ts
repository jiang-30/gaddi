import piniaPluginPersist from 'pinia-plugin-persist'
import { createPinia } from 'pinia'
export * from './modules/config'
export * from './modules/user'
export * from './modules/menu'
export * from './modules/route'
export * from './modules/tab'
export * from './modules/dict'

const pinia = createPinia()
pinia.use(piniaPluginPersist)

export default pinia
