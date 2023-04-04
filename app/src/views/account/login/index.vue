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
import { useRouteStore, useUserStore } from '@/store'
import type { ILoginInfo } from './index'

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const current = ref('usernamePassword')

// 登录成功
function successHandler(data: ILoginInfo) {
  // 访问token
  userStore.accessToken = data.accessToken
  // 刷新token
  userStore.refreshToken = data.refreshToken ?? ''
  // 过期时间
  userStore.expires = data.expires

  // 登录后请求必要的信息
  userStore
    .initHandler()
    .then(() => {
      if (route.query.redirect) {
        router.replace({ path: route.query.redirect as string })
      } else {
        router.replace({ name: useRouteStore().indexPageName })
      }
    })
    .catch(() => {})
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
  width: 550px;
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
