import { copySync, copy, emptyDir } from 'fs-extra/esm'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const dist = resolve(__dirname, 'admin-template')

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
