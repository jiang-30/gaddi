import { useDictStore } from '@/store';
import type { IDCrudApi, IDCrudOption } from '@gaddi/components';

export const useModel = () => {
  const api: IDCrudApi = {
    restful: '/admin/log',
    info: '/admin/log/{id}',
  };
  const option: IDCrudOption = {
    isCreateBtn: false,
    isUpdateBtn: false,
    isInfoBtn: true,
    deleteBtnPermission: 'admin:log:delete',
    infoBtnPermission: 'admin:log:info',
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
        prop: "nickname",
        label: "姓名",
        type: "input",
        isTable: false,
      },
      {
        prop: "phoneNum",
        label: "手机号码",
        type: "input",
        isTable: false,
      },
      {
        prop: "identityNumber",
        label: "身份证号码",
        type: "input",
        isTable: false,
      },
      {
        prop: "ip",
        label: "IP",
        type: "input",
      },
      {
        prop: "url",
        label: "请求路径",
        type: "input",

      },
      {
        prop: "method",
        label: "请求方法",
        type: "input",
        align: 'center',
        width: 100,
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
        width: 100,
        align: 'center'
      },
      {
        prop: "createdTime",
        label: "操作时间",
        type: "input",
        width: 180,
        align: 'center'
      },
    ],
  }

  return {
    api,
    option,
  };
};
