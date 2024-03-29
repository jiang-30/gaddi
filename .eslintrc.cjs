/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  // 后面的会覆盖前面的
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  globals: {
    defineOptions: true,
  },
  rules: {
    'vue/multi-word-component-names': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-non-null-assertion': ['warn'], // ts 使用 ! 表示非空
    '@typescript-eslint/no-unused-vars': ['warn'], // 变量定义未使用
  },
}
