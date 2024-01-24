import type { IDCrudApi, IDCrudOption } from '@gaddi/components';
import { ref } from 'vue'

export const useModel = () => {
  const api: IDCrudApi = {
    restful: '/admin/properties'
  };

  const option: IDCrudOption = {
    labelWidth: 100,
    rowActionWidth: 140,
    isDeleteBtn: false,
    fields: [
      {
        prop: "name",
        label: "配置名称",
        type: "input",
        isSearch: true,
      },
      {
        prop: "code",
        label: "配置标识",
        type: "input",
      },
      {
        prop: "value",
        label: "配置",
        type: "input",
        isTable: false,
        isForm: false,
      },
      {
        prop: "remark",
        label: "备注",
        type: "textarea",
        isTable: false,
      },
    ],
  }

  return {
    api,
    option,
  };
};
