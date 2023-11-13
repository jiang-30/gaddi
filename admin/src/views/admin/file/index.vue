<route lang="yaml">
meta:
  isEnabled: true
  layout: admin
</route>

<template>
  <PageContainer>
    <DCrud :option="option" :api="api">
      <template #action>
        <el-button type="primary">上传文件</el-button>
      </template>
    </DCrud>
  </PageContainer>
</template>

<script setup lang="ts">
import { useModel } from './model'

const { option, api } = useModel()
</script>
