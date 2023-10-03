<route lang="yaml">
meta:
  isEnabled: true
  isStatic: true
  title: 账户设置
  icon: ic:round-settings-suggest
  name: UserSetting
  layout: admin
</route>

<template>
  <section class="page">
    <section class="wrapper">
      <aside class="aside">
        <el-menu :default-active="activeKey" @select="onSelect">
          <el-menu-item v-for="item in list" :index="item.key">{{ item.label }}</el-menu-item>
        </el-menu>
      </aside>
      <section class="body">
        <header class="header">
          <el-tabs v-model="activeSubKey">
            <el-tab-pane v-for="item in subList" :key="item.key" :name="item.key" :label="item.label"></el-tab-pane>
          </el-tabs>
        </header>
        <main class="main">
          <el-scrollbar>
            <component :is="components[activeSubKey]"></component>
          </el-scrollbar>
        </main>
      </section>
    </section>
  </section>
</template>

<script lang="ts" setup>
import UserInfoView from './components/UserInfoView.vue'
import PasswordView from './components/PasswordView.vue'
import { ref, type Component, computed } from 'vue'

const components: Record<string, Component> = {
  userInfo: UserInfoView,
  password: PasswordView,
}
const list = [
  {
    key: 'base',
    label: '基本设置',
    list: [{ key: 'userInfo', label: '个人信息' }],
  },
  {
    key: 'security',
    label: '安全设置',
    list: [{ key: 'password', label: '密码设置' }],
  },
]

const activeKey = ref('base')
const activeSubKey = ref('userInfo')
const subList = computed(() => {
  return list.find(item => item.key == activeKey.value)?.list || []
})

const onSelect = (index: string) => {
  activeKey.value = index
  activeSubKey.value = subList.value[0].key
}
</script>

<style scoped>
.page {
  height: 100%;
  height: 100%;
  padding: 15px;
}

.wrapper {
  height: 100%;
  height: 100%;
  display: flex;
  background-color: var(--el-bg-color);
  border-radius: 8px;
  overflow: hidden;
}

.aside {
  width: 240px;
  border-right: 2px solid var(--el-border-color);
}

.body {
  flex: 1 0 0;
  min-width: 0;
  padding: 0 15px;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1;
  min-height: 0;
}

.el-menu-item.is-active {
  margin-right: -1px;
  color: var(--el-color-primary);
  border-right: 3px solid var(--el-color-primary);
}
</style>
