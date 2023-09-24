
## 常用库

- dayjs
- qs
- js-cookie
- animate.css
- animejs
- mescroll.js
- commander
- prompts
- file-saver
- jszip
- vue-tour 用户引导
- swiper 轮播

## 模块


### changelog

- changesets
- conventional-changelog

### prettier

```sh
prettier
```

### lint

```sh
eslint
```


## version
版本管理
### changeset

1. `changeset pre enter <alpha/beta>` 进入预发布版本

2. `changeset` 选择要发布的包

3. `changeset version` 修改发布包的版本

4. `changeset publish` 发布包到仓库

    `npm whoami`    `npm login`    `npm config get registry`

5. `npx changeset pre exit`

### npm files
默认包含文件 (`npm pack --dry-run` 验证)
- package.json
- README.md
- CHANGELOG.md

### npm version

### npm publish
`npm publish --tag=beta` 发布测试包

### git tag
`git tag 1.0.0` 和 `git push --tags`

## git commit
