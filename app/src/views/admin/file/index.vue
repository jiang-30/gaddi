<route lang="yaml">
meta:
  isEnabled: true
  layout: admin
</route>

<template>
  <PageContainer>
    <WCrud :option="option" :api="api"> </WCrud>
  </PageContainer>
</template>

<script setup lang="ts">
import { useModel } from './model'

const { option, api } = useModel()
</script>
