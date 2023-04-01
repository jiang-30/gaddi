<route lang="yaml">
meta:
  isEnabled: true
  layout: admin
</route>

<template>
  <PageContainer>
    <WCrud :option="option" :api="api" v-model:table-data="tableData"> </WCrud>
  </PageContainer>
</template>

<script setup lang="ts">
import { useModel } from './model'
const tableData = ref<any[]>([])
const { option, api } = useModel(tableData)
</script>
