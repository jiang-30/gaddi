import type { RouteMeta } from 'vue-router'

type IMenu = RouteMeta

// 定义的是静态菜单, 如果包含 page 则通过component或者name来匹配路由
// TODO 页面通过 component 、name、path 配置匹配路由
const menusList: Partial<IMenu>[] = [
  {
    id: 'Permission',
    type: 'menu',
    title: '权限管理',
    icon: 'mdi:security-close',
    isEnabled: true,
    isShow: true,
    sort: 1,
  },
  {
    id: 'System',
    type: 'menu',
    title: '系统管理',
    icon: 'mdi:console-network-outline',
    isEnabled: true,
    isShow: true,
    sort: 2,
  },
  {
    id: 'Case',
    type: 'menu',
    title: '案例',
    icon: 'mdi:case-sensitive-alt',
    isEnabled: true,
    isShow: true,
    sort: 5,
  },
  {
    id: 'Data',
    type: 'menu',
    title: '可视化',
    icon: 'ic:sharp-bar-chart',
    isEnabled: true,
    sort: 10,
  },
  {
    id: 'data-home',
    // parentId: '',
    isEnabled: true,
    type: 'page',
    // component: '/data/home',
    title: '可视化',
    icon: 'ic:sharp-bar-chart',
    isShow: true,
    sort: 20,
    layout: 'data',
  },
]

export default menusList
