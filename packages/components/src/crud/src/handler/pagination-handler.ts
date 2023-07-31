
import type { PaginationProps } from 'element-plus'
import type { ICrudOption } from '../type'
import { omitProperty, tools } from '../../../utils'

// element-plus ElPagination Attrs
export const paginationAttrsFormat = (option: ICrudOption): Partial<PaginationProps> => {
  const defaultAttrs = tools.defaultAttrs

  return omitProperty({
    small: option.small ?? defaultAttrs.small,
    background: option.background ?? defaultAttrs.background,
    pagerCount: option.pagerCount ?? defaultAttrs.pagerCount,
    layout: option.layout ?? defaultAttrs.layout,
    pageSizes: option.pageSizes ?? defaultAttrs.pageSizes,
    popperClass: option.popperClass ?? defaultAttrs.popperClass,
    prevText: option.prevText ?? defaultAttrs.prevText,
    prevIcon: option.prevIcon ?? defaultAttrs.prevIcon,
    nextText: option.nextText ?? defaultAttrs.nextText,
    nextIcon: option.nextIcon ?? defaultAttrs.nextIcon,
    hideOnSinglePage: option.hideOnSinglePage ?? defaultAttrs.hideOnSinglePage,
  })
}
