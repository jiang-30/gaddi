import type { IDFormFieldBaseAttrs } from '../../../typings'

/**
 * d-upload-images 配置
 */
export interface IDFormFieldImagesAttrs extends IDFormFieldBaseAttrs {
  sizeLimit?: number
  limit?: number
  prefix?: string
  imageWidth?: string
  imageHeight?: string
  imageRadius?: string
  imageProps?: any,
  uploadHandle?: Function
  afterUploadHandle?: Function
}
