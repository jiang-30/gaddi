<template>
  <div>
    <el-upload v-model:file-list="fileList" action="" list-type="picture-card" show-file-list accept="image/*"
      :limit="limit" :on-preview="handlePreview" :before-remove="handleBeforeRemove" :on-remove="handleRemove"
      :on-exceed="handleExceed" :before-upload="handleBefore" :http-request="handleRequest" :on-success="handleSuccess"
      :on-error="handleError">
      <el-icon>
        <Plus />
      </el-icon>
    </el-upload>

    <el-dialog v-model="dialogVisible">
      <img style="width: 100%; height: auto;" :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox, type UploadFile, type UploadFiles, type UploadRawFile, type UploadRequestOptions, type UploadUserFile } from 'element-plus';
import { tools } from '../../utils'

defineOptions({
  name: 'WImagesUpload'
})
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  limit: {
    type: Number,
    default: 2
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


watch(() => {
  return props.modelValue
}, (value) => {
  // console.log('watch', value, fileList.value)
  const newList: UploadUserFile[] = []
  const strList = (value ?? '').split(',').filter(item => item)
  strList.forEach(item => {
    const file = fileList.value.find(file => file.url == item)
    if (file) {
      newList.push(file)
    } else {
      newList.push({
        name: item.split('/').pop()!,
        url: item
      })
    }
  })
  fileList.value = newList
})

// 预览
const handlePreview = (uploadFile: UploadFile): void => {
  // console.log(uploadFile)
  if (uploadFile.url) {
    dialogImageUrl.value = uploadFile.url
    dialogVisible.value = true
  }
}

// 文件删除前
const handleBeforeRemove = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  // console.log(uploadFile, uploadFiles)
  return ElMessageBox.confirm('确定要删除文件吗', {
    title: '提示',
    type: 'warning',
  }).then(res => {
    return true
  }).catch(res => {
    return false
  })
}
// 文件删除成功
const handleRemove = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  // console.log(uploadFile, uploadFiles)
  change()
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

// 上传前 文件数量判断
const handleExceed = (files: File[], uploadFiles: UploadUserFile[]) => {
  // console.log(files, uploadFiles)
  ElMessage.warning(`最多上传${props.limit}个文件`)
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
  change()
}
// 上传失败
const handleError = (error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  // console.log('handleError', error, uploadFile, uploadFiles)
}


// 添加或删除文件后格式化数据
function change() {
  // console.log(fileList.value.map(item => item.url).join(','))
  emit('update:modelValue', fileList.value.map(item => item.url).join(','))
}

</script>

<style lang="less" scoped></style>
