<template>
  <el-icon :size="size" :color="color">
    <Icon :icon="icon"></Icon>
  </el-icon>
</template>

<script lang="ts" setup>
import { Icon } from "@iconify/vue";

defineOptions({
  name: "AppIcon"
})

defineProps<{
  size?: number;
  color?: string;
  icon: string;
}>();
</script>
