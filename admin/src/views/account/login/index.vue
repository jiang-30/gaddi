<route lang="yaml">
meta:
  isEnabled: true
  isStatic: true
  name: Login
  isAuth: false
</route>

<template>
  <div class="login-page">
    <section class="login-page-wrapper">
      <aside class="login-page-aside"></aside>

      <main class="login-page-main">
        <header class="login-page-header">欢迎，请登录！</header>
        <main class="login-page-body">
          <UsernamePassword v-if="current === 'usernamePassword'" @success="successHandler" />
        </main>
        <footer class="login-page-footer">
          <!-- <div class="text-right mt-2">
            <el-space>
              <router-link class="text-xs hover:text-blue-500" :to="{ name: 'FindPassword' }">忘记密码</router-link>
              <router-link class="text-xs hover:text-blue-500" :to="{ name: 'Register' }">注册</router-link>
            </el-space>
          </div> -->
        </footer>
      </main>
    </section>
  </div>
</template>
<script setup lang="ts" name="Login">
import UsernamePassword from './components/UsernamePassword.vue'
import { useRouteStore, useUserStore, useMenuStore, useDictStore } from '@/store'
import type { ILoginInfo } from './index'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const current = ref('usernamePassword')

// 登录成功
async function successHandler(data: ILoginInfo) {
  // token
  userStore.setTokenInfo({
    accessToken: data.accessToken,
    refreshToken: data.refreshToken ?? '',
    expires: data.expires ?? 0,
  })

  // userInfo
  if (data.userInfo) {
    userStore.setUserInfo(data.userInfo)
  }

  // 权限数据
  userStore.setPermissions([])

  // menus
  useMenuStore().setMenus([])

  // dicts
  useDictStore().setDictList([])

  // 登录后请求必要的信息
  await userStore.initHandler(true)

  // 跳转路由
  if (route.query.redirect) {
    router.replace({ path: route.query.redirect as string })
  } else {
    router.replace({ name: useMenuStore().indexPageName })
  }
}
</script>

<style scoped>
.login-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff url('/static/images/bg/bg-10.jpg') center / cover no-repeat;
  backdrop-filter: grayscale(30%);
}

.login-page-wrapper {
  width: 600px;
  margin-top: -200px;
  background-color: #fff;
  box-shadow: 0 0 10px 0 #ccc;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
}

.login-page-aside {
  width: 200px;
  background: url('/static/images/bg.png') 100% / cover no-repeat;
}

.login-page-main {
  flex: 1 0 0;
  padding: 0 30px;
}

.login-page-header {
  font-size: 16px;
  color: #666;
  padding: 30px 0;
}

.login-page-body {
  padding: 20px 0;
}

.login-page-footer {
  padding: 20px 0;
}
</style>
