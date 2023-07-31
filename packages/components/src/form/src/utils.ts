import { computed } from 'vue'
import type { FormProps, FormItemProps } from 'element-plus'
import type { IFormAttrs, ISearchFormAttrs } from './type/option'
import type {
  IFormOption,
  ISearchFormOption,
} from './type'
import type { IFormType } from '../../typings'
import { omitProperty, tools, fetchDict, dictData } from '../../utils'
import { formAttrsFormat, searchFormAttrsFormat } from './handler/form-handler'
import { formItemAttrsFormat, searchFormItemAttrsFormat } from './handler/form-item-handler'
import { formFieldTreeFormat, searchFormFieldTreeFormat } from './handler/field-tree'
import { formFieldSelectFormat, searchFormFieldSelectFormat } from './handler/field-select'
import { formFieldInputFormat } from './handler/field-input'
import { formFieldDateFormat } from './handler/field-date'
import { formFieldCascaderFormat } from './handler/field-cascader'
import { formFieldImagesFormat } from './handler/field-images'

// 表单数据(属性和事件) - 用户数据 - 默认数据 - 用户默认数据
export const useFormOption = (option: IFormOption, type: IFormType) => {
  const defaultAttrs = tools.defaultAttrs
  const defaultFieldAttrs = tools.defaultFieldAttrs

  // ElForm 属性
  const __formAttrs = computed<Partial<FormProps>>(() => {
    return formAttrsFormat(option)
  })

  // 表单项
  const __formFields = computed(() => {
    // console.log('generate form fields')

    const fields: any[] = []

    option.fields.forEach(field => {
      // 是否显示表单域
      const isForm =
        type == 'create'
          ? field.isCreateForm ?? field.isForm
          : type == 'update'
            ? field.isUpdateForm ?? field.isForm
            : field.isForm

      if (isForm !== false) {
        const _props = {
          ...(defaultFieldAttrs.props ?? {}),
          ...(field.props ?? {}),
        }

        if (field.dictUrl) {
          fetchDict(field.dictUrl, _props)
        }
        const _dictData = field.dictData ?? dictData(field).value

        // 表单域基础属性 clearable、disabled
        let fieldAttrs: any = {}
        if (field.type === 'tree') {
          fieldAttrs = formFieldTreeFormat(field)
        } else if (field.type === 'select') {
          fieldAttrs = formFieldSelectFormat(field)
        } else if (field.type === 'cascader') {
          fieldAttrs = formFieldCascaderFormat(field)
        } else if (['input', 'textarea', 'password'].includes(field.type)) {
          fieldAttrs = formFieldInputFormat(field)
        } else if (['year', 'month', 'date', 'dates', 'datetime', 'week', 'datetimerange', 'daterange', 'monthrange'].includes(field.type)) {
          fieldAttrs = formFieldDateFormat(field)
        } else if (['image', 'images',].includes(field.type)) {
          fieldAttrs = formFieldImagesFormat(field)
        }

        const __formFieldAttrs: any = {
          clearable: field.clearable ?? true,
          disabled:
            type == 'create'
              ? field.createDisabled ?? field.disabled
              : type == 'update'
                ? field.updateDisabled ?? field.disabled
                : field.disabled,
          ...fieldAttrs,
        }

        fields.push(
          omitProperty({
            prop: field.prop,
            label: field.label,
            type: field.type,
            span: field.span,
            hint: field.hint,
            listen: field.listen,
            default: field.default,
            disabled: __formFieldAttrs.disabled,
            __props: _props,
            __dictData: _dictData,
            __formItemAttrs: formItemAttrsFormat(field),
            __formFieldAttrs: omitProperty(__formFieldAttrs),
          }),
        )
      }
    })

    return fields
  })

  return {
    __formAttrs,
    __formFields,
  }
}

export const useSearchFormOption = (option: ISearchFormOption) => {
  const defaultAttrs = tools.defaultAttrs
  const defaultFieldAttrs = tools.defaultFieldAttrs

  // 搜索表单属性
  const __searchFormAttrs = computed<Partial<FormProps>>(() => {
    return searchFormAttrsFormat(option)
  })

  // 搜索表单项 radio, radioButton 对应到 select
  const __searchFormFields = computed(() => {
    // console.log('generate search form fields')

    const fields: {
      [key: string]: any
      __formItemAttrs: Partial<FormItemProps>
    }[] = []

    option.fields.forEach(field => {
      if (field.isSearch === true) {
        if (field.dictUrl) {
          fetchDict(field.dictUrl, defaultFieldAttrs.props ?? field.props)
        }
        const _dictData = field.dictData ?? dictData(field).value

        let __formFieldAttrs: any = {
          clearable: field.clearable ?? true,
        }

        if (field.type === 'tree') {
          __formFieldAttrs = {
            ...__formFieldAttrs,
            ...searchFormFieldTreeFormat(field),
          }
        } else if (field.type === 'select') {
          __formFieldAttrs = {
            ...__formFieldAttrs,
            ...searchFormFieldSelectFormat(field),
          }
        }

        fields.push({
          prop: field.prop,
          label: field.label,
          type: ['radio', 'radioButton'].includes(field.type) ? 'select' : field.type,
          hint: field.hint,
          default: field.searchDefault ?? field.default,
          __props: {
            ...(defaultFieldAttrs.props ?? {}),
            ...(field.props ?? {}),
          },
          __dictData: _dictData,
          __formItemAttrs: searchFormItemAttrsFormat(field),
          __formFieldAttrs: omitProperty(__formFieldAttrs),
        })
      }
    })

    return fields
  })

  return {
    __searchFormAttrs,
    __searchFormFields,
  }
}
