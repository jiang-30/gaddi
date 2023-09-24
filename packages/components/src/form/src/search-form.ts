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
  init: (searchModel: IDModel) => { return true },
  search: (searchModel: IDModel) => { return true },
  reset: (searchModel: IDModel) => { return true },
  show: (isShow: boolean) => { return true },
}
