<template>
  <el-tooltip :content="hint" :disabled="!hint" placement="top">
    <div style="display: inline-flex; align-items: center">
      <el-icon v-if="hint" style="margin-right: 3px" color="#ccc" :size="10">
        <QuestionFilled />
      </el-icon>
      <span>{{ label }}</span>
    </div>
  </el-tooltip>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { QuestionFilled } from '@element-plus/icons-vue'

defineProps({
  label: {
    type: String as PropType<string>,
    required: true,
  },
  hint: {
    type: String as PropType<string>,
  },
})
</script>
