<template>
  <div v-if="imageList && imageList.length">
    <el-image
      v-for="imageUrl in imageList"
      :key="imageUrl"
      :style="style"
      :src="imageUrl"
      :fit="fit"
    />
  </div>
</template>

<script setup lang="ts">
import { ElImage, type ImageProps } from 'element-plus'
import { computed, type PropType } from 'vue'

const props = defineProps({
  images: {
    type: String,
    default: '',
  },
  fit: {
    type: String as PropType<ImageProps['fit']>,
    default: 'cover',
  },
  width: {
    type: String,
    default: '40px',
  },
  height: {
    type: String,
    default: '40px',
  },
  gap: {
    type: String,
    default: '3px',
  },
})

const imageList = computed(() => {
  return props.images.split(',').filter((it: any) => it)
})

const style = computed(() => {
  return {
    'width': props.width,
    'height': props.height,
    'margin-top': props.gap,
    'margin-right': props.gap,
  }
})
</script>
