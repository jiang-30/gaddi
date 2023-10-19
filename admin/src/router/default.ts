import type { IMenu } from '@/typings'

/**
 * 生成默认菜单或者 route.meta 信息
 */
export function generateDefaultMenu(
  meta: Partial<IMenu>,
  defaultMeta: IMenu = {
    isEnabled: false,
    isStatic: false,
    id: '',
    parentId: '',
    type: 'menu',
    title: '',
    icon: '',
    isShowMenu: false,
    path: '',
    target: '_self',
    componentPath: '',
    name: '',
    layout: 'default',
    isAlive: false,
    isTab: false,
    isAuth: true,
    permission: [],
    sort: 1,
  },
): IMenu {
  return {
    ...meta,
    isEnabled: meta.isEnabled ?? defaultMeta.isEnabled,
    isStatic: meta.isStatic ?? defaultMeta.isStatic,
    id: meta.id ?? defaultMeta.id,
    parentId: meta.parentId ?? defaultMeta.parentId,
    type: meta.type ?? defaultMeta.type,
    title: meta.title || defaultMeta.title,
    icon: meta.icon || defaultMeta.icon,
    isShowMenu: meta.isShowMenu ?? defaultMeta.isShowMenu,
    path: meta.path || defaultMeta.path,
    target: meta.target ?? defaultMeta.target,
    componentPath: meta.componentPath ?? defaultMeta.componentPath,
    name: meta.name || meta.id || defaultMeta.name,
    redirect: meta.redirect ?? defaultMeta.redirect,
    layout: meta.layout || defaultMeta.layout,
    isAlive: meta.isAlive ?? defaultMeta.isAlive,
    isTab: meta.isTab ?? defaultMeta.isTab,
    isAuth: meta.isAuth ?? defaultMeta.isAuth,
    permission: meta.permission ?? defaultMeta.permission,
    sort: meta.sort ?? defaultMeta.sort,
  }
}


