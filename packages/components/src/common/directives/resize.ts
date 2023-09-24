import type { Directive } from "vue";
import { useResizeObserver } from '@vueuse/core'
import { debounce } from 'lodash-es'

export type IDResizeDirectiveFnArgs = {
  width: number,
  height: number,
}

export type IDResizeDirectiveFn = (args: IDResizeDirectiveFnArgs) => void

/**
 * 尺寸变化指令
 * WeakMap
 */
export const resizeDirective: Directive = {
  mounted(el, binding) {
    const params: IDResizeDirectiveFnArgs = { width: 0, height: 0 }
    const debounced = debounce(() => {
      const fn: IDResizeDirectiveFn = binding.value
      if (typeof fn !== 'function') {
        console.error('v-resize 指令的值必须是一个函数, 现在是：', fn)
        return
      }
      fn(params);
    }, 200, {})
    // debounced.cancel();

    const resizeObserver = useResizeObserver(el, (entries) => {
      const entry = entries[0]
      const { width, height } = entry.contentRect
      params.width = width;
      params.height = height;
      debounced()
    })
    // resizeObserver.stop();
    el.__dDebounced = debounced;
    el.__dResizeObserver = resizeObserver;

  },
  beforeUnmount(el) {
    if (el.__dResizeObserver) {
      el.__dResizeObserver.stop()
    }
    if (el.__dDebounced) {
      el.__dDebounced.cancel()
    }
  }
}
