import { reactive } from "vue";
import type { PropType } from "vue";
import type { IDCrudApi } from './type/api'
import type { IDCrudPageModel } from './type/page'
import type { IDCrudAttrs } from './type/option'
import type { IDCrudColumnAttrs } from './type/field'
import type { IDModel } from '../../typings'
import type { IDCrudQueryType, IDCrudStatus } from './type'
import type {
  IDFormAttrs,
  IDFormItemAttrs,
  IDSearchFormAttrs,
  IDSearchFormItemAttrs,
  IDFormFieldAttrs,
  IDInfoAttrs,
  IDInfoItemAttrs,
} from "../../index";

// CRUD PROPS 属性
export const crudProps = {
  option: {
    type: Object as PropType<
      IDCrudAttrs &
      IDFormAttrs &
      IDSearchFormAttrs &
      IDInfoAttrs &
      {
        fields: (IDCrudColumnAttrs &
          IDFormItemAttrs &
          IDSearchFormItemAttrs &
          IDFormFieldAttrs &
          IDInfoItemAttrs)[];
      }
    >,
    required: true as true,
  },
  api: {
    type: Object as PropType<IDCrudApi>,
  },
  tableLoading: {
    type: Boolean as PropType<boolean>,
  },
  tableData: {
    type: Array as PropType<IDModel[]>,
  },
  modelValue: {
    type: Object as PropType<IDModel>,
  },
  pageModel: {
    type: Object as PropType<IDCrudPageModel>,
    default: () =>
      reactive({
        current: 1,
        size: 10,
        total: 0,
      }),
  },
  searchModel: {
    type: Object as PropType<Record<string, any>>,
    default: () => (reactive({})),
  },
  beforeFetch: {
    type: Function as PropType<(type: IDCrudStatus, requestConfig: any) => void>,
  },
  afterFetch: {
    type: Function as PropType<(type: IDCrudStatus, response: any) => void>,
  },
  // 新增、详情、修改 弹窗打开前 (type, model, done) IDialogType
  beforeOpen: {
    type: Function as PropType<(type: IDCrudStatus, model: IDModel, done: () => void) => void>,
  },
  // 列表查询钩子
  queryHandler: {
    type: Function as PropType<(type: IDCrudQueryType) => void>,
  },
  // 表单新增钩子
  createHandler: {
    type: Function as PropType<(model: IDModel, done: (flag?: boolean) => void) => void>,
  },
  // 表单修改钩子
  updateHandler: {
    type: Function as PropType<(model: IDModel, done: (flag?: boolean) => void) => void>,
  },
  // 列表删除钩子
  deleteHandler: {
    type: Function as PropType<(model: IDModel) => void>,
  },
};

export const crudEmits = {
  "update:modelValue": ((value: IDModel) => { return true }) as (value: IDModel) => void,
  "update:tableData": ((value: IDModel[]) => { return true }) as (value: IDModel[]) => void,
  "update:tableLoading": ((value: boolean) => { return true }) as (value: boolean) => void,
  init: null,
  search: null,
  searchReset: null,
  pageCurrentChange: null,
  pageSizeChange: null,
  refresh: null,
};
