import type { IFormFieldAttrs } from '../type'
import { tools } from '../../../utils'

export const formFieldImagesFormat = (field: IFormFieldAttrs) => {
  const defaultFieldAttrs = tools.defaultFieldAttrs

  return {
    maxSize: field.maxSize,
    limit: field.limit,
  }
}


