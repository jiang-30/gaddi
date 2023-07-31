<template>
  <div>
    <el-upload class="image-upload" v-model:file-list="fileList" action="" :show-file-list="false" accept="image/*"
      :on-preview="handlePreview" :before-upload="handleBefore" :http-request="handleRequest" :on-success="handleSuccess"
      :on-error="handleError">
      <img v-if="modelValue" :src="modelValue" class="image" />
      <el-icon v-else class="icon">
        <Plus />
      </el-icon>
    </el-upload>

    <el-dialog v-model="dialogVisible">
      <img style="width: 100%; height: auto;" :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox, type UploadProps, type UploadFile, type UploadFiles, type UploadRawFile, type UploadRequestOptions, type UploadUserFile } from 'element-plus';
import { tools } from '../../utils'

defineOptions({
  name: 'WImageUpload'
})
const props = defineProps({
  modelValue: {
    type: [String],
    default: '',
  },
  size: {
    type: Number,
    default: 2
  },
})
const emit = defineEmits(['update:modelValue'])
const fileList = ref<UploadUserFile[]>([])
const dialogImageUrl = ref('')
const dialogVisible = ref(false)


// 预览
const handlePreview = (uploadFile: UploadFile): void => {
  // console.log(uploadFile)
  if (uploadFile.url) {
    dialogImageUrl.value = uploadFile.url
    dialogVisible.value = true
  }
}

// 上传前 文件大小判断
const handleBefore = (rawFile: UploadRawFile) => {
  // console.log(rawFile)
  const size = props.size
  if (rawFile.size > size * 1024 * 1024) {
    ElMessage.warning(`上传文件应小于${size}MB`)
    return false
  }
  return true
}

// 上传函数
const handleRequest = (options: UploadRequestOptions) => {
  // console.log(options)
  return tools.uploadFile!(options.file, options.onProgress).then(res => {
    return res
  }).catch(error => {
    return Promise.reject(error)
  })
  // return Promise.reject(new Error('sdff'))
}

// 上传成功
const handleSuccess = (res: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  // console.log('handleSuccess', res, uploadFile, uploadFiles)
  uploadFile.url = res.url
  change(uploadFile.url!)
}
// 上传失败
const handleError = (error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  // console.log('handleError', error, uploadFile, uploadFiles)
}

// 添加或删除文件后格式化数据
function change(url: string) {
  emit('update:modelValue', url)
}

</script>

<style>
.image-upload .el-upload {
  border: 1px dashed var(--el-border-color-darker);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.image-upload .el-upload:hover {
  border-color: var(--el-color-primary);
}

.image-upload .image {
  width: 148px;
  height: 148px;
  object-fit: cover;
}

.image-upload .el-icon.icon {
  background-color: var(--el-fill-color-lighter);
  font-size: 28px;
  color: #8c939d;
  width: 148px;
  height: 148px;
  text-align: center;
}
</style>
