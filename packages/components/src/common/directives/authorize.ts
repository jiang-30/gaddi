import type { Directive } from "vue";
import { handle } from "../../handle";

/**
 * 权限指令
 */
export const authorizeDirective: Directive = {
  created(el, binding) {
    const value = binding.value;
    if (!value) return;

    const authorization = handle.permissions;
    const flag = authorization.some(item => item === binding.value)
    if (flag) return;

    el.innerHTML = '';
    el.style.display = 'none';
  },
}
