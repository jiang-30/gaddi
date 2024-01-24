import type { IDFormFieldAttrs } from '../type'
import { handle } from '../../../handler'

export const formFieldImagesFormat = (field: IDFormFieldAttrs) => {
  const defaultFieldAttrs = handle.defaultFieldAttrs

  return {
    sizeLimit: field.sizeLimit,
    limit: field.limit,
    prefix: field.prefix,
    width: field.imageWidth,
    height: field.imageHeight,
    radius: field.imageRadius,
    props: field.imageProps,
    uploadHandle: field.uploadHandle,
    afterUploadHandle: field.afterUploadHandle,
  }
}


