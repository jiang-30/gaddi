import type { IDCrudApi, IDCrudOption } from '@gaddi/components';
import { ref } from 'vue'

export const useModel = () => {
  const api: IDCrudApi = {
    restful: '/yijinyun/translation'
  };
  const option: IDCrudOption = {
    labelWidth: 100,
    rowActionWidth: 150,
    isCreateBtn: false,
    isUpdateBtn: false,
    isInfoBtn: true,
    span: 24,
    fields: [
      {
        prop: "source",
        label: "原文",
        type: "input",
        isSearch: true,
      },
      {
        prop: "result",
        label: "结果",
        type: 'input',
      },
      {
        label: "作者",
        prop: "author",
        type: "input",
        isSearch: true,
      },
      {
        prop: "level",
        label: "保密等级",
        type: "input",
        isSearch: true,
      },
      {
        prop: "createdTime",
        label: "时间",
        type: "input",
      },
    ],
  }

  return {
    option,
    api,
  };
};
