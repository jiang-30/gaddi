import { copySync, copy, emptyDir } from 'fs-extra/esm'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const dist = resolve(__dirname, 'admin-template')

// "@element-plus/icons-vue": "2.1.0",
// "@vueuse/core": "9.13.0",
// "axios": "1.5.0",
// "ejs": "^3.1.9",
// "element-plus": "2.3.8",
// "fs-extra": "^11.1.1",
// "mysql2": "^3.6.5",
// "nprogress": "^0.2.0",
// "shelljs": "^0.8.5",

// 1. 清空目录
emptyDir(dist)

// 2. 拷贝公共文件
const fileList = [
  '.commitlintrc.cjs',
  '.editorconfig',
  '.eslintrc.cjs',
  '.prettierrc',
  '.stylelintrc.cjs',
  '.husky',
  '.vscode',
]
fileList.forEach(item => {
  copySync(resolve(__dirname, item), resolve(dist, item), {
    overwrite: false,
    preserveTimestamps: false,
  })
})

// 2. 拷贝admin文件
const ingorePath = [
  'dist',
  'node_modules',
  'stats.html',
  'auto-import.d.ts',
  'auto-components.d.ts',
  'CHANGELOG.md',
  '.eslintrc-auto-import.json',
  'src/views/case',
  'src/views/demo',
]
copy(resolve(__dirname, 'admin'), dist, {
  overwrite: false,
  preserveTimestamps: false,
  filter: src => {
    // console.log(src);
    const item = ingorePath.find(item => src.startsWith(resolve(__dirname, 'admin', item)))
    return !item
  },
})

console.log('success')

// 打包压缩
