# gaddi-admin

## TODO

- api
  login/fetchDict/fetchPermission/fetchProfile
  dynamicDict: true/dynamicMenu: true/

- useController
  base 数据
  组件状态及交互逻辑 -- 组件里引入交互逻辑
- useService
  接口请求

- `<app-icon />`
- 默认值
- 缓存
- 刷新数据初始化, 退出
- 提交规范
- 风格约束 pnpm add vite-plugin-checker -D
- vite-plugin-favicon

## 功能清单

- 权限管理
  - 用户管理
  - 角色管理
  - 部门管理
  - 菜单管理
  - 客户端管理
- 系统管理
  - 令牌管理
  - 文件管理
  - 日志管理
  - 配置管理
  - 字典管理
  - 系统监控
- 开发平台
  - 文档
  - 接口文档


## 授权

### 登录

- token
- authority

### 用户角色

- roleId
- roleName
- authority

## 样式
unoCss (需要继续)
- postcss-px-2-vm
- postcss-pxtorem

## 代码规范
### husky
lint-staged 一般结合 husky 来使用，它可以让 husky 的 hook 触发的命令只作用于 git 暂存区的文件，而不会影响到其他文件。
npx husky-init

hook 中 执行 npx lint-staged

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["prettier --write", "eslint --fix"],
    "*.vue": ["prettier --write", "eslint --fix", "stylelint --fix"],
    "*.{html,vue,vss,sass,less}": ["prettier --write", "stylelint --fix"],
    "package.json": ["prettier --write"],
    "*.md": ["prettier --write"]
  }
}
```

## store
每次刷新可以更新的信息， 可以在store 中配置接口请求
- user.userInfo、user.permissions
- menu.menus
- dict.dictList


## 相关框架
- [Vben Admin](https://doc.vvbin.cn/)
- [Pure Admin](http://yiming_chang.gitee.io/vue-pure-admin/#/about/index)

