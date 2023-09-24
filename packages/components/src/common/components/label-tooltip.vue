<template>
  <el-tooltip :content="hint" :disabled="!hint" placement="top">
    <div style="display: inline-flex; align-items: center;">
      <span>{{ label }}</span>
      <el-icon v-if="hint" style="margin-left: 3px;" color="#ccc">
        <QuestionFilled />
      </el-icon>
    </div>
  </el-tooltip>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import { QuestionFilled } from '@element-plus/icons-vue'

defineProps({
  label: {
    type: String as PropType<string>,
    required: true,
  },
  hint: {
    type: String as PropType<string>,
  }
})
</script>
