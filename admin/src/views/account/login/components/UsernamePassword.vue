<template>
  <el-form
    ref="formRef"
    :model="formData"
    :rules="formRules"
    :disabled="loading"
    @keyup.enter="onSubmit(formRef)"
  >
    <el-form-item prop="username">
      <el-input
        v-model="formData.username"
        type="primary"
        link
        :prefix-icon="User"
        placeholder="请输入登录用户名"
        clearable
      ></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="formData.password"
        type="password"
        :prefix-icon="Lock"
        placeholder="请输入登录密码"
        show-password
        clearable
        @keyup.enter="onSubmit(formRef)"
      >
      </el-input>
    </el-form-item>
    <el-form-item prop="code">
      <el-input
        class="code-input"
        v-model="formData.code"
        :prefix-icon="CircleCheck"
        placeholder="请输入验证码"
        clearable
        @keyup.enter="onSubmit(formRef)"
      >
        <template #append>
          <div class="code" @click="resetCode">
            <img v-if="codeUrl" class="code" :src="codeUrl" alt="code" />
          </div>
        </template>
      </el-input>
    </el-form-item>
    <el-button class="w-full" type="primary" @click="onSubmit(formRef)" :loading="loading"
      >登录</el-button
    >
  </el-form>
</template>

<script lang="ts" setup>
import { User, Lock, CircleCheck } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { queryCode, fetchLogin } from '@/api/common'
import type { ILoginInfo } from '../index'
import appConfig from '@/app.config'
import { ref } from 'vue'

const emit = defineEmits<{
  (event: 'success', data: ILoginInfo): void
}>()

const formRef = ref<FormInstance>()
const loading = ref(false)

const codeUrl = ref('')
const formData = ref({
  username: 'admin',
  password: '123456',
  code: '',
  codeKey: '',
})
const formRules = ref<FormRules>({
  username: [
    {
      required: true,
      message: '请输入登录名',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入登录密码',
      trigger: 'blur',
    },
  ],
  code: [
    {
      required: true,
      message: '请输入验证码',
      trigger: 'blur',
    },
  ],
})

const loadCode = () => {
  queryCode().then(res => {
    codeUrl.value = res.data.codeImg
    formData.value.codeKey = res.data.codeKey
  })
}

loadCode()

const resetCode = () => {
  formData.value.code = ''
  loadCode()
}

const onSubmit = (form: FormInstance | undefined) => {
  if (!form) return

  form.validate(valid => {
    if (valid) {
      loading.value = true
      const params = {
        ...formData.value,
      }

      if (appConfig.isLocalLogin) {
        emit('success', {
          accessToken: 'accessToken',
          userInfo: {
            avatar: 'http://placekitten.com/350/200',
            username: params.username,
          },
        })
      } else {
        fetchLogin(params)
          .then(({ data }) => {
            emit('success', {
              accessToken: data.accessToken,
              expires: data.expires,
              refreshToken: data.refreshToken,
            })
          })
          .catch(err => {
            if (err && err.code == '41102') {
              resetCode()
            }
          })
          .finally(() => {
            loading.value = false
          })
      }
    }
  })
}
</script>

<style scoped>
.code-input {
  flex: 1;
  display: flex;
}

.code-input :deep(.el-input-group__append) {
  padding: 0;
}

.code-input .code {
  width: 76px;
  height: 32px;
  cursor: pointer;
}
.code-input .code:hover {
}
</style>
