import { computed } from 'vue'
import type { IDInfoOption } from './type'
import { omitProperty, handle, getBaseFields } from '../../handle'
import { computedAsync } from '@vueuse/core'

export const useInfoOption = (option: IDInfoOption) => {
  const defaultAttrs = handle.defaultAttrs
  const defaultFieldAttrs = handle.defaultFieldAttrs

  // 属性
  const __infoAttrs = computed(() => {
    return omitProperty({
      border: option.infoBorder ?? defaultAttrs.infoBorder,
      direction: option.infoDirection ?? defaultAttrs.infoDirection,
      size: option.infoSize ?? defaultAttrs.infoSize,
      title: option.infoTitle ?? defaultAttrs.infoTitle,
      extra: option.infoExtra ?? defaultAttrs.infoExtra,
    })
  })

  // 数据项
  const __infoFields = computedAsync(async () => {
    // console.log('generate info fields')
    const fields: any[] = []
    for (let index = 0; index < option.fields.length; index++) {
      const field = option.fields[index];

      if (field.isInfo !== false) {
        const _props = {
          ...(defaultFieldAttrs.props ?? {}),
          ...(field.props ?? {}),
        }

        fields.push({
          ...await getBaseFields(field),
          span: field.span ?? option.span ?? 24,
          __props: _props,
          __itemAttrs: {
            // span?: number;
            width: field.infoWidth ?? option.labelWidth,
            // minWidth: 100,
            align: field.infoAlign,
            labelAlign: field.infoLabelAlign ?? option.labelAlign ?? 'right',
            // className?: string;
            // labelClassName?: string;
          },
        })
      }
    }

    return fields
  }, []);

  return {
    __infoAttrs,
    __infoFields,
  }
}
