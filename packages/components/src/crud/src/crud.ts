import { reactive } from "vue";
import type { PropType } from "vue";
import type { ICrudApi } from './type/api'
import type { IPageModel } from './type/page'
import type { ICrudAttrs } from './type/option'
import type { ICrudColumnAttrs } from './type/field'
import type { ITableData } from "./type";
import type {
  IFormAttrs,
  IFormItemAttrs,
  ISearchFormAttrs,
  ISearchFormItemAttrs,
  IFormFieldAttrs,
  IInfoAttrs,
  IInfoItemAttrs,
} from "../../index";
import type { IDialogType } from '../../typings'

// CRUD PROPS 属性
export const crudProps = {
  option: {
    type: Object as PropType<
      ICrudAttrs &
      IFormAttrs &
      ISearchFormAttrs &
      IInfoAttrs &
      {
        fields: (ICrudColumnAttrs &
          IFormItemAttrs &
          ISearchFormItemAttrs &
          IFormFieldAttrs &
          IInfoItemAttrs)[];
      }
    >,
    required: true as true,
  },
  api: {
    type: Object as PropType<ICrudApi>,
  },
  tableLoading: {
    type: Boolean as PropType<boolean>,
  },
  tableData: {
    type: Array as PropType<ITableData[]>,
  },
  modelValue: {
    type: Object,
  },
  pageModel: {
    type: Object as PropType<IPageModel>,
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
  // 新增、详情、修改 弹窗打开前 (type, model, done) IDialogType
  beforeOpen: {
    type: Function as PropType<(type: string, model: any, done: () => void) => void>,
  },
  // beforeClose: {
  //   type: Function as PropType<(type: string, done: () => void) => void>,
  // },
  beforeFetch: {
    type: Function as PropType<(type: string, requestConfig: any) => void>,
  },
  afterFetch: {
    type: Function as PropType<(type: string, response: any) => void>,
  },
  // 列表查询回调
  queryHandler: {
    type: Function as PropType<(type: string) => void>,
  },
  // 表单新增回调
  createHandler: {
    type: Function as PropType<(model: any, done: () => void) => void>,
  },
  // 表单修改回调
  updateHandler: {
    type: Function as PropType<(model: any, done: () => void) => void>,
  },
  // 列表删除回调
  deleteHandler: {
    type: Function as PropType<(model: any) => void>,
  },
};

export const crudEmits = {
  "update:modelValue": null,
  "update:tableData": null,
  "update:tableLoading": null,
  init: null,
  search: null,
  searchReset: null,
  pageCurrentChange: null,
  pageSizeChange: null,
  refresh: null,
};
