
import type { DialogProps } from 'element-plus'
import type { ICrudOption } from '../type'
import { omitProperty, tools } from '../../../utils'

// element-plus ElDialog Attrs
export const dialogAttrsFormat = (option: ICrudOption): Partial<DialogProps> => {
  const defaultAttrs = tools.defaultAttrs

  return omitProperty({
    // title
    width: option.dialogWidth ?? defaultAttrs.dialogWidth,
    fullscreen: option.dialogFullscreen ?? defaultAttrs.dialogFullscreen,
    top: option.dialogTop ?? defaultAttrs.dialogTop,
    modal: option.dialogModal ?? defaultAttrs.dialogModal,
    appendToBody: option.dialogAppendToBody ?? defaultAttrs.dialogAppendToBody,
    lockScroll: option.dialogLockScroll ?? defaultAttrs.dialogLockScroll,
    CustomClass: option.dialogCustomClass ?? defaultAttrs.dialogCustomClass,
    openDelay: option.dialogOpenDelay ?? defaultAttrs.dialogOpenDelay,
    closeDelay: option.dialogCloseDelay ?? defaultAttrs.dialogCloseDelay,
    // closeOnClickModal: option.dialogCloseOnClickModal ?? defaultAttrs.dialogCloseOnClickModal,
    closeOnPressEscape: option.dialogCloseOnPressEscape ?? defaultAttrs.dialogCloseOnPressEscape,
    showClose: option.dialogShowClose ?? defaultAttrs.dialogShowClose,
    beforeClose: option.dialogBeforeClose ?? defaultAttrs.dialogBeforeClose,
    draggable: option.dialogDraggable ?? defaultAttrs.dialogDraggable,
    center: option.dialogCenter ?? defaultAttrs.dialogCenter,
    alignCenter: option.dialogAlignCenter ?? defaultAttrs.dialogAlignCenter,
    // destroyOnClose: option.dialogDestroyOnClose ?? defaultAttrs.dialogDestroyOnClose,
  })
}
