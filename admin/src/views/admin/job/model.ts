import type { IDCrudApi, IDCrudOption } from '@gaddi/components';

export const useModel = () => {
  const api: IDCrudApi = {
    restful: '/admin/job'
  };
  const option: IDCrudOption = {
    rowActionWidth: 240,
    isCreateBtn: true,
    isUpdateBtn: true,
    isInfoBtn: true,
    isDeleteBtn: false,
    labelWidth: 100,
    fields: [
      {
        label: "任务名称",
        prop: "name",
        type: "input",
        isSearch: true,
      },
      {
        label: "Bean名称",
        prop: "beanName",
        type: "input",
      },
      {
        label: "方法名称",
        prop: "methodName",
        type: "input",
      },
      {
        label: "方法参数",
        prop: "methodParams",
        type: "input",
        isTable: false,
      },
      {
        label: "cron时间",
        prop: "cron",
        type: "input",
      },
      {
        label: "状态",
        prop: "status",
        type: "radio",
        dictData: [
          { label: '启动', value: '1' },
          { label: '停止', value: '0' },
        ],
        align: "center",
      },
      {
        label: "备注",
        prop: "remark",
        type: "textarea",
        isTable: false,
      },
      {
        prop: "updatedTime",
        label: "更新时间",
        type: "input",
        width: 180,
        align: "center",
        isForm: false,
      },
    ],
  }

  return {
    api,
    option,
  };
};
