<route lang="yaml">
meta:
  isEnabled: true
  isStatic: true
  parentId: Demo
  title: Test
  icon: mdi:table-border
  layout: admin
  isShowMenu: true
  isTab: true
  isAuth: false
  sort: 0
</route>

<template>
  <PageContainer>
    <el-button @click="onClick">test</el-button>
  </PageContainer>
</template>

<script setup lang="ts">
import axios from 'axios'
import json from '@/assets/response.json'

const onClick = () => {
  console.log(333)
  axios.post(
    '/api/aaa/admin/test/writeText',
    {
      password: 'qjsjhfl',
      data: json.data,
    },
    {
      timeout: 500000000,
    },
  )
}
</script>
