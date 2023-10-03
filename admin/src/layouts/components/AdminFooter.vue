<template>
  <footer v-if="isShow">fff</footer>
</template>
<script lang="ts" setup>
import { computed } from 'vue';

const isShow = computed(() => {
  return false;
});
</script>
