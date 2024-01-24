<route lang="yaml">
meta:
  isEnabled: true
  layout: translation
</route>

<template>
  <PageContainer>
    <DCrud ref="crudRef" :option="option" :api="api"> </DCrud>
  </PageContainer>
</template>

<script setup lang="ts">
import { useModel } from './model'

const { option, api } = useModel()
</script>
