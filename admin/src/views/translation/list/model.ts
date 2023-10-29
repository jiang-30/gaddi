import type { IDCrudApi, IDCrudOption } from '@gaddi/components';
import { ref } from 'vue'
import { useRoute } from 'vue-router'

export const useModel = () => {
  const route = useRoute()
  const isUser = route.query.type == 'user'
  const api: IDCrudApi = {
    restful: '/yijinyun/translation'
  };
  const option: IDCrudOption = {
    labelWidth: 100,
    rowActionWidth: 150,
    isCreateBtn: false,
    isUpdateBtn: false,
    isDeleteBtn: false,
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
        isTable: false,
      },
      {
        label: "翻译人员",
        prop: "author",
        type: "input",
        isSearch: isUser ? false : true,
        isTable: isUser ? false : true,
        isInfo: isUser ? false : true,
      },
      {
        prop: "level",
        label: "保密等级",
        type: "input",
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
