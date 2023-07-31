import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import type { IMeta } from '../src/typings'
import { generateDefaultMenu } from '../src/router/default'

export default function createPages() {
  return [
    Pages({
      // 加载 views 目录下的文件
      dirs: [{ dir: 'src/views/', baseRoute: '' }],
      extensions: ['vue'],
      exclude: ['**/components/*.vue'],
      routeStyle: 'nuxt',

      // 初始化并扩展路由 meta 数据
      extendRoute(route, parent) {
        // console.log(route)
        const routeMeta = <IMeta>(route.meta ?? {})

        routeMeta.type = 'page'
        routeMeta.id = routeMeta.name
        routeMeta.path = routeMeta.path ?? route.path
        routeMeta.name = routeMeta.name ?? route.name
        // 组件地址
        routeMeta.componentPath = route.component
        // 父组件地址
        routeMeta._localParentComponentPath = parent?.component

        return {
          ...route,
          name: routeMeta.name,
          path: routeMeta.path,
          meta: generateDefaultMenu(routeMeta),
        }
      },

      // 过滤掉 禁用(meta.isEnabled 不为 true) 的路由
      onRoutesGenerated(routes) {
        function forTree(list: any) {
          list.forEach((item: any) => {
            if (item.children && item.children.lenth) {
              item.children = forTree(item.children)
            }
            if (item.children && item.children.lenth == 0) {
              delete item.children
            }
          })
          return routes.filter(item => item.meta.isEnabled === true)
        }

        return forTree(routes)
      },
    }),
    Layouts({
      exclude: ['**/components/*.vue'],
      layoutsDirs: 'src/layouts',
      defaultLayout: 'default',
    }),
  ]
}
