<route lang="yaml">
meta:
  isEnabled: true
  layout: admin
</route>

<template>
  <PageContainer>
    <DCrud :option="option" :api="api" v-model:table-data="tableData"> </DCrud>
  </PageContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useModel } from './model'
const tableData = ref<any[]>([])
const { option, api } = useModel(tableData)
</script>
