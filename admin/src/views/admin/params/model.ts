import type { IDCrudApi, IDCrudOption } from '@gaddi/components';
import { ref } from 'vue'

export const useModel = () => {
  const api: IDCrudApi = {
    restful: '/admin/config'
  };
  const option: IDCrudOption = {
    labelWidth: 100,
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
        prop: "note",
        label: "备注",
        type: "input",
      },
    ],
  }

  return {
    api,
    option,
  };
};
