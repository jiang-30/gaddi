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
        prop: "userId",
        label: "用户ID",
        type: "input",
      },
      {
        prop: "username",
        label: "用户名",
        type: "input",
        isSearch: true,
      },
      {
        prop: "clientName",
        label: "客户端名称",
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
        prop: "ip",
        label: "IP",
        type: "input",
        width: 100,
        align: "center",
      },
      {
        prop: "title",
        label: "请求名称",
        type: "input",
      },
      {
        prop: "description",
        label: "操作描述",
        type: "input",
      },
      {
        prop: "time",
        label: "操作时间",
        type: "input",
        width: 180,
        align: "center",
      },
    ],
  }

  return {
    api,
    option,
  };
};
