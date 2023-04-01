import type { IMenu } from '@/typings'
import { defaultMenuConfig } from '../constant/default/menu'

// 菜单数据设置默认值
// component: ''
// createdBy: '1607296665139146754'
// createdTime: '2023-03-10 15:26:10'
// icon: ''
// id: '1634093270180782081'
// isAlive: '0'
// isEnabled: '1'
// isShow: '1'
// isTab: '1'
// parentId: ''
// path: ''
// permission: ''
// remark: ''
// sort: 1
// target: '_self'
// title: '权限管理'
// type: 'menu'
// updatedBy: '1607296665139146754'
// updatedTime: '2023-03-10 15:26:10'

// isEnabled: false,
// isStatic: false,
// parentId: '',
// title: '',
// icon: '',
// isShow: false,
// layout: 'default',
// target: '_self',
// isAlive: false,
// isTab: false,
// isAuth: true,
// sort: 100,
// // 引用类型会共享
// permissions: [],
export function setDefaultMenuMate(menu: Partial<IMenu>): IMenu {
  return {
    ...menu,
    id: menu.id!,
    path: menu.path!,
    name: menu.name!,
    type: menu.type!,
    redirect: menu.redirect,
    parentId: menu.parentId ?? defaultMenuConfig.parentId,
    isEnabled: menu.isEnabled ?? defaultMenuConfig.isEnabled,
    isShow: menu.isShow ?? defaultMenuConfig.isShow,
    sort: menu.sort ?? defaultMenuConfig.sort,
    isStatic: menu.isStatic ?? defaultMenuConfig.isStatic,
    title: menu.title ?? defaultMenuConfig.title,
    icon: menu.icon ?? defaultMenuConfig.icon,
    layout: menu.layout ?? defaultMenuConfig.layout,
    target: menu.target ?? (defaultMenuConfig.target as IMenu['target']),
    isAlive: menu.isAlive ?? defaultMenuConfig.isAlive,
    isTab: menu.isTab ?? defaultMenuConfig.isTab,
    isAuth: menu.isAuth ?? defaultMenuConfig.isAuth,
    permission: menu.permission ?? defaultMenuConfig.permission,
  }
}
