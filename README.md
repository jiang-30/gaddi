gaddi 是一个 monorepo, 多个工程放到一个 git 仓库中;共享一套构建流程、代码规范.

通过 pnpm 管理依赖，通过 changesets 管理库的更新日志

## TODO

- server 通过注解区分客户端
- layout 不hot刷新
- components 传递的值去掉响应性
- components table 字段加tag状态

- 搜索插槽、搜索默认值
- 字典数据同步到 DCRUD
- multiple formatter
- dialog footer 插入问题
- dictProps 和 dictFormatter 的问题
- formatter 支持树结构
- crud 触发俩次query
- app localStorage 缓存
- crud v-premission
- crud row action 按钮排序
- isAdmin
- 用户登录返回 token 用户信息+
- 用户信息 角色、部门、基础信息
- 菜单 菜单[动态菜单]、权限
- [ ] 事项 1
- tree 处理
- info slot 服用 table的

## 模块

### docs

文档

### admin

后台管理

### cli

脚手架

### components

crud组件

### utils

常用函数
