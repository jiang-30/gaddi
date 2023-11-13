import { useDictStore } from '@/store';
import type { IDCrudApi, IDCrudOption } from '@gaddi/components';

export const useModel = () => {
  const api: IDCrudApi = {
    restful: '/admin/log'
  };
  const option: IDCrudOption = {
    isCreateBtn: false,
    isUpdateBtn: false,
    isInfoBtn: true,
    fields: [

      {
        prop: "type",
        label: "类型",
        type: "select",
        dictData: useDictStore().items('SYS_LOG_TYPE'),
        isSearch: true,
        isTable: false,

      },
      {
        prop: "title",
        label: "操作名称",
        type: "input",
        isSearch: true,
      },
      {
        prop: "username",
        label: "用户名",
        type: "input",
        isSearch: true,
      },
      {
        prop: "ip",
        label: "IP",
        type: "input",
      },
      {
        prop: "method",
        label: "请求方法",
        type: "input",
      },
      {
        prop: "url",
        label: "请求路径",
        type: "input",
      },
      {
        prop: "description",
        label: "操作描述",
        type: "input",
        isTable: false,
      },
      {
        prop: "result",
        label: "操作结果",
        type: "select",
        dictData: useDictStore().items('SYS_RESULT'),
      },
      {
        prop: "createdTime",
        label: "操作时间",
        type: "input",
      },
    ],
  }

  return {
    api,
    option,
  };
};
