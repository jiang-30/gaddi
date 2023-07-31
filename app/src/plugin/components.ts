import type { App } from "vue";
import AppMenuItem from '@/layouts/components/AppMenuItem.vue'

export default {
  install(app: App) {
    app.component('AppMenuItem', AppMenuItem)
  }
}
