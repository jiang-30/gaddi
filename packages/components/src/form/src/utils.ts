import { computed } from 'vue'
import type { FormProps, FormItemProps } from 'element-plus'
import type {
  IFormType,
  IFormOption,
  IFormAttrs,
  ISearchFormOption,
  ISearchFormAttrs,
} from './type'
import { omitProperty, tools, fetchDict, dictData } from '../../utils'

// 表单数据(属性和事件) - 用户数据 - 默认数据 - 用户默认数据
export const useFormOption = (option: IFormOption, type: IFormType) => {
  const defaultAttrs = tools.defaultAttrs
  const defaultFieldAttrs = tools.defaultFieldAttrs

  const __formAttrs = computed<Partial<FormProps>>(() => {
    return omitProperty({
      rules: option.rules ?? defaultAttrs.rules,
      inline: option.inline ?? defaultAttrs.inline,
      labelPosition: option.labelPosition ?? defaultAttrs.labelPosition,
      labelWidth: option.labelWidth ?? defaultAttrs.labelWidth,
      labelSuffix: option.labelSuffix ?? defaultAttrs.labelSuffix,
      hideRequiredAsterisk: option.hideRequiredAsterisk ?? defaultAttrs.hideRequiredAsterisk,
      requireAsteriskPosition:
        option.requireAsteriskPosition ?? defaultAttrs.requireAsteriskPosition,
      showMessage: option.showMessage ?? defaultAttrs.showMessage,
      inlineMessage: option.inlineMessage ?? defaultAttrs.inlineMessage,
      statusIcon: option.statusIcon ?? defaultAttrs.statusIcon,
      validateOnRuleChange: option.validateOnRuleChange ?? defaultAttrs.validateOnRuleChange,
      size: option.formSize ?? defaultAttrs.formSize,
      scrollToError: option.scrollToError ?? defaultAttrs.scrollToError,
    })
  })


  // ====================================================== 表单项 ======================================================
  const __formFields = computed<
    {
      [key: string]: any
      __formItemAttrs: Partial<FormItemProps>
    }[]
  >(() => {
    // console.log('generate form fields')

    const fields: any[] = []

    option.fields.forEach(field => {
      const isForm =
        type == 'create'
          ? field.isCreateForm ?? field.isForm
          : type == 'update'
          ? field.isUpdateForm ?? field.isForm
          : field.isForm
      if (isForm !== false) {
        let _dictData = field.dictData
        if (field.dictUrl) {
          fetchDict(field.dictUrl, defaultFieldAttrs.props ?? field.props)
          _dictData = field.dictData ?? dictData(field.dictUrl).value
        }

        let __formControlAttrs: any = {
          clearable: field.clearable ?? true,
          disabled:
            type == 'create'
              ? field.createDisabled ?? field.disabled
              : type == 'update'
              ? field.updateDisabled ?? field.disabled
              : field.disabled,
        }
        if (field.type === 'tree') {
          __formControlAttrs = {
            ...__formControlAttrs,
            checkStrictly: field.checkStrictly,
            nodeKey: field.nodeKey,
            valueKey: field.valueKey ?? 'value',
            props: field.props,
          }
        } else if (field.type === 'select') {
          __formControlAttrs = {
            ...__formControlAttrs,
            multiple: field.multiple,
            valueKey: field.valueKey,
          }
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
            disabled: __formControlAttrs.disabled,
            __props: {
              ...(defaultFieldAttrs.props ?? {}),
              ...(field.props ?? {}),
            },
            __dictData: _dictData,
            __formItemAttrs: omitProperty({
              labelWidth: field.labelWidth,
              required: field.required,
              rules: field.rules,
              error: field.error,
              showMessage: field.showMessage,
              inlineMessage: field.inlineMessage,
              size: field.size,
            }),
            __formControlAttrs: omitProperty(__formControlAttrs),
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
    return omitProperty({
      labelWidth: option.searchLabelWidth ?? defaultAttrs.searchLabelWidth,
      labelPosition: option.searchLabelPosition ?? defaultAttrs.searchLabelPosition,
      labelSuffix: option.searchLabelSuffix ?? defaultAttrs.searchLabelSuffix,
      size: option.searchFormSize ?? defaultAttrs.searchFormSize,
    })
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
        let _dictData = field.dictData

        if (field.dictUrl) {
          fetchDict(field.dictUrl, defaultFieldAttrs.props ?? field.props)
          _dictData = field.dictData ?? dictData(field.dictUrl).value
        }

        let __formControlAttrs: any = {
          clearable: field.clearable ?? true,
        }

        if (field.type === 'tree') {
          __formControlAttrs = {
            ...__formControlAttrs,
            checkStrictly: field.checkStrictly,   // 选叶子节点
            nodeKey: field.nodeKey,
            valueKey: field.valueKey ?? 'value',
            props: field.props,
          }
        } else if (field.type === 'select') {
          __formControlAttrs = {
            ...__formControlAttrs,
            // multiple: field.multiple,
            valueKey: field.valueKey,
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
          __formItemAttrs: {
            labelWidth: field.labelWidth,
            required: field.required,
            error: field.error,
            size: field.size,
          },
          __formControlAttrs: __formControlAttrs,
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
