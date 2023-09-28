import type { PropType } from "vue";
import type {
  IDFormType,
  IDFormAttrs,
  IDFormItemAttrs,
  IDFormFieldAttrs,
} from "./type";
import type { IDModel } from '../../typings'

// 属性
export const formProps = {
  loading: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  // 数据模型
  formModel: {
    type: Object as PropType<IDModel>,
    required: true as true,
  },
  // 配置
  option: {
    type: Object as PropType<
      IDFormAttrs & { fields: (IDFormItemAttrs & IDFormFieldAttrs)[] }
    >,
    required: true as true,
  },
  // 表单类型 create | update
  type: {
    type: String as PropType<IDFormType>,
    default: 'create'
  },
};

// 事件
export const formEmits = {
  save: ((model: IDModel) => { return true }) as (model: IDModel) => void,
};
