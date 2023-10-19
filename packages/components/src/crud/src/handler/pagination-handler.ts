
import type { PaginationProps } from 'element-plus'
import type { IDCrudOption } from '../type'
import { omitProperty, handle } from '../../../handler'

// element-plus ElPagination Attrs
export const paginationAttrsFormat = (option: IDCrudOption): Partial<PaginationProps> => {
  const defaultAttrs = handle.defaultAttrs

  return {
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
  }
}
