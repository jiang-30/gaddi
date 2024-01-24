import { useDictStore, useUserStore } from '@/store';
import type { IDCrudApi, IDCrudOption } from '@gaddi/components';

export const useModel = () => {
  const searchLevel = useDictStore().items('security_level').map(item => item)
  searchLevel.unshift({ label: '全部', value: '' })
  const api: IDCrudApi = {
    restful: '/yijinyun/translation/by-user'
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
        prop: "level",
        label: "保密等级",
        type: 'select',
        dictData: searchLevel,
        isSearch: true,
        width: 140,
        align: 'center'
      },
      {
        prop: "createdTime",
        label: "时间",
        type: "input",
        width: 200,
        align: 'center'
      },
    ],
  }

  return {
    option,
    api,
  };
};
