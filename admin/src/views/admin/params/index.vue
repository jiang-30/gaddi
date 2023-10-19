<route lang="yaml">
meta:
  isEnabled: true
  layout: admin
</route>

<template>
  <PageContainer>
    <DCrud :option="option" :api="api"> </DCrud>
  </PageContainer>
</template>

<script setup lang="ts">
import { useModel } from './model'

const { option, api } = useModel()
// 默认密码
// 邮箱
//
</script>
