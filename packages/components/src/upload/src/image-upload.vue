<template>
  <div>
    <el-upload
      class="d-image-upload"
      v-model:file-list="fileList"
      action=""
      :show-file-list="false"
      accept="image/*"
      :before-upload="handleBefore"
      :http-request="handleRequest"
      :on-success="handleSuccess"
      :on-error="handleError"
    >
      <img v-if="value" :src="prefix + value" class="d-image-upload-image" />
      <div v-else class="d-image-upload-trigger">
        <el-icon><Plus /></el-icon>
      </div>
    </el-upload>

    <el-dialog v-model="dialogVisible">
      <img style="width: 100%; height: auto" :src="prefix + dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { useVModel } from '@vueuse/core'
import {
  ElMessage,
  ElMessageBox,
  type UploadProps,
  type UploadFile,
  type UploadFiles,
  type UploadRawFile,
  type UploadRequestOptions,
  type UploadUserFile,
  type UploadProgressEvent,
} from 'element-plus'
import { handle } from '../../handler'

defineOptions({
  name: 'DImageUpload',
})

const props = defineProps({
  modelValue: {
    type: [String],
    default: '',
  },
  prefix: {
    type: String,
    default: '',
  },
  sizeLimit: {
    type: Number as PropType<number>,
    default: 1,
  },
  width: {
    type: String,
    default: '148px',
  },
  height: {
    type: String,
    default: '148px',
  },
  radius: {
    type: String,
    default: '6px',
  },
  props: {
    type: Object,
  },
  uploadHandle: {
    type: Function as PropType<
      (file: File, progress: (evt: UploadProgressEvent) => void) => Promise<any>
    >,
  },
  afterUploadHandle: {
    type: Function,
  },
})

const emit = defineEmits(['update:modelValue', 'change'])

const value = useVModel(props, 'modelValue', emit)

const fileList = ref<UploadUserFile[]>([])
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

// 预览
const handlePreview = (uploadFile: UploadFile): void => {
  if (uploadFile.url) {
    dialogImageUrl.value = uploadFile.url
    dialogVisible.value = true
  }
}

// 上传前 文件大小判断
const handleBefore = (rawFile: UploadRawFile) => {
  const size = props.sizeLimit
  if (rawFile.size > size * 1024 * 1024) {
    ElMessage.warning(`上传文件应小于${size}MB`)
    return false
  }
  return true
}

// 上传函数
const handleRequest = (options: UploadRequestOptions) => {
  // console.log(options)
  if (props.uploadHandle) {
    return props.uploadHandle(options.file, options.onProgress)
  } else if (handle.uploadFile) {
    return handle
      .uploadFile(options.file, options.onProgress)
      .then(res => {
        return res
      })
      .catch(error => {
        return Promise.reject(error)
      })
  } else {
    return Promise.reject(new Error('upload function not found'))
  }
}

// 上传成功
const handleSuccess = (res: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  console.log('handleSuccess', res, uploadFile, uploadFiles)
  if (props.afterUploadHandle) {
    res = props.afterUploadHandle(res)
  } else {
    res = res.data.localUrl
  }
  uploadFile.url = res
  change(uploadFile.url!)
}

// 上传失败
const handleError = (error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  // console.log('handleError', error, uploadFile, uploadFiles)
}

// 添加或删除文件后格式化数据
function change(url: string) {
  value.value = url
  emit('change', url)
}
</script>

<style>
.d-image-upload .el-upload {
  width: v-bind(width);
  height: v-bind(height);
  border: 1px dashed var(--el-border-color-darker);
  border-radius: v-bind(radius);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.d-image-upload .el-upload:hover {
  border-color: var(--el-color-primary);
}

.d-image-upload-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.d-image-upload-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: var(--el-fill-color-lighter);
  font-size: 28px;
  color: #8c939d;
}
</style>
