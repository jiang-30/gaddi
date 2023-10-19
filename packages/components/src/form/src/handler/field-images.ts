import type { IDFormFieldAttrs } from '../type'
import { handle } from '../../../handler'

export const formFieldImagesFormat = (field: IDFormFieldAttrs) => {
  const defaultFieldAttrs = handle.defaultFieldAttrs

  return {
    maxSize: field.maxSize,
    limit: field.limit,
  }
}


