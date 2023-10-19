
import type { DialogProps } from 'element-plus'
import type { IDCrudOption } from '../type'
import { handle } from '../../../handler'

// element-plus ElDialog Attrs
export const dialogAttrsFormat = (option: IDCrudOption): Partial<{ height: string } & DialogProps> => {
  const defaultAttrs = handle.defaultAttrs

  return {
    height: option.dialogHeight ?? defaultAttrs.dialogHeight,
    width: option.dialogWidth ?? defaultAttrs.dialogWidth,
    title: option.dialogTitle,
    // fullscreen: option.dialogFullscreen ?? defaultAttrs.dialogFullscreen,
    top: option.dialogTop ?? defaultAttrs.dialogTop,
    modal: option.dialogModal ?? defaultAttrs.dialogModal,
    appendToBody: option.dialogAppendToBody ?? defaultAttrs.dialogAppendToBody,
    lockScroll: option.dialogLockScroll ?? defaultAttrs.dialogLockScroll,
    customClass: option.dialogCustomClass ?? defaultAttrs.dialogCustomClass,
    openDelay: option.dialogOpenDelay ?? defaultAttrs.dialogOpenDelay,
    closeDelay: option.dialogCloseDelay ?? defaultAttrs.dialogCloseDelay,
    closeOnClickModal: option.dialogCloseOnClickModal ?? defaultAttrs.dialogCloseOnClickModal,
    closeOnPressEscape: option.dialogCloseOnPressEscape ?? defaultAttrs.dialogCloseOnPressEscape,
    showClose: option.dialogShowClose ?? defaultAttrs.dialogShowClose,
    beforeClose: option.dialogBeforeClose ?? defaultAttrs.dialogBeforeClose,
    draggable: option.dialogDraggable ?? defaultAttrs.dialogDraggable,
    center: option.dialogCenter ?? defaultAttrs.dialogCenter,
    alignCenter: option.dialogAlignCenter ?? defaultAttrs.dialogAlignCenter,
    destroyOnClose: option.dialogDestroyOnClose ?? defaultAttrs.dialogDestroyOnClose,
  }
}
