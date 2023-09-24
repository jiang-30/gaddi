import type { App } from "vue";
import AppIcon from '@/components/app/AppIcon.vue'
import AppLink from '@/components/app/AppLink.vue'
import PageContainer from '@/components/app/PageContainer.vue'

export default {
  install(app: App) {
    app.component('AppIcon', AppIcon)
    app.component('AppLink', AppLink)
    app.component('PageContainer', PageContainer)
  }
}
