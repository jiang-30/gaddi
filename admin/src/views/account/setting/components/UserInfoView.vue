<template>
  <section class="w-[500px] p-10">
    <el-form label-position="top">
      <el-form-item label="头像">
        <el-avatar :src="userInfo.avatar" :size="120" @click="onClick"></el-avatar>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="userInfo.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="userInfo.nickname" placeholder="请输入用户昵称"></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model="userInfo.resume" type="textarea" placeholder="请输入用户简介"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="w-full" type="primary" @click="onConfirm" :loading="loading">
          保存
        </el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store'
import { fetchUpdateInfo, uploadFile } from '@/api/common'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

const userStore = useUserStore()
const loading = ref(false)
const userInfo = ref({
  username: userStore.userInfo.username,
  avatar: userStore.userInfo.avatar,
  nickname: userStore.userInfo.nickname,
  resume: userStore.userInfo.resume,
  email: userStore.userInfo.email,
})

const onClick = () => {
  const input = document.createElement('input')
  input.setAttribute('type', 'file')
  input.setAttribute('accept', 'image/jpeg,image/png')
  input.onchange = (e: any) => {
    const file = e.target?.files[0]
    console.log(e)
    if (file) {
      uploadFile(file).then(res => {
        // userStore.userInfo.avatar = `/api/admin/file/preview/${res.data.filename}`
        userInfo.value.avatar = `/api/admin/file/preview/${res.data.filename}`
      })
    }
  }
  input.click()
}

const onConfirm = () => {
  loading.value = true
  fetchUpdateInfo(userInfo.value)
    .then(() => {
      ElMessage.success('保存成功')
      userStore.fetchUserInfo()
    })
    .finally(() => {
      loading.value = false
    })
}
</script>
