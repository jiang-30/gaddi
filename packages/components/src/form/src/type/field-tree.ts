import type { IFieldType, IFormFieldBaseAttrs } from '../../../typings'

// el-tree
export interface IFormFieldTreeAttrs extends IFormFieldBaseAttrs {
  // type: Extract<IFieldType, 'tree'>
  nodeKey?: string
  // valueKey?: string
  checkStrictly?: boolean
  props?: {
    label?: string
    children?: string
    disabled?: string
    isLeaf?: string
    class?: string
  }
  // "empty-text",
  // "render-after-expand",
  // "load",
  // "render-content",
  // "highlight-current",
  // "default-expand-all",
  // "expand-on-click-node",
  // "check-on-click-node",
  // "auto-expand-parent",
  // "default-expanded-keys",
  // "show-checkbox",
  // "check-strictly",
  // "default-checked-keys",
  // "current-node-key",
  // "filter-node-method",
  // "accordion",
  // "indent",
  // "icon",
  // "lazy",
  // "draggable",
  // "allow-drag",
  // "allow-drop",
}
