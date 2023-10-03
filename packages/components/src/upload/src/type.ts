import type { ExtractPropTypes } from 'vue'
import type ImageUpload from './image-upload.vue'
import type ImagesUpload from './images-upload.vue'

export interface IImageUploadAttrs {
  modelValue: string
  size: number
}

export interface IImagesUploadAttrs {
  modelValue: string
  size: number
  limit: number
}

// Form
export type IImageUpload = InstanceType<typeof ImageUpload>
export type IImagesUpload = InstanceType<typeof ImagesUpload>

// export type IFormEmits = typeof formEmits

// export type IFormProps = ExtractPropTypes<typeof formProps>

// export type IFormOption = IFormProps['option']
