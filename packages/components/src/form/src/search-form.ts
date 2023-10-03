import type { PropType } from 'vue'
import type {
  IDSearchFormAttrs,
  IDSearchFormItemAttrs,
  IDFormFieldAttrs,
} from './type'
import type { IDModel } from '../../typings'

export const searchFormProps = {
  option: {
    type: Object as PropType<
      IDSearchFormAttrs & { fields: (IDSearchFormItemAttrs & IDFormFieldAttrs)[] }
    >,
    required: true as true,
  },
  searchModel: {
    type: Object as PropType<IDModel>,
    required: true as true,
  },
  loading: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
}

export const searchFormEmits = {
  init: ((searchModel: IDModel) => { return true }) as (searchModel: IDModel) => void,
  search: ((searchModel: IDModel) => { return true }) as (searchModel: IDModel) => void,
  reset: ((searchModel: IDModel) => { return true }) as (searchModel: IDModel) => void,
  show: ((isShow: boolean) => { return true }) as (isShow: boolean) => void,
}
