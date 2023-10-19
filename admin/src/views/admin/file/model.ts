import type { IDCrudApi, IDCrudOption } from '@gaddi/components';
import { ref } from 'vue'

export const useModel = () => {
  const api: IDCrudApi = {
    restful: '/admin/file'
  };
  const option: IDCrudOption = {
    isCreateBtn: false,
    isUpdateBtn: false,
    isInfoBtn: true,
    fields: [
      {
        prop: "originFilename",
        label: "文件名",
        type: "input",
        isSearch: true,
      },
      {
        prop: "访问地址",
        label: "url",
        type: "input",
      },
      {
        prop: "contentType",
        label: "文件类型",
        type: "input",
        width: 120,
      },
      {
        prop: "size",
        label: "文件大小",
        type: "input",
        width: 120,
      },
      {
        prop: "bucket",
        label: "bucket",
        type: "input",
        isTable: false,
      },
      {
        prop: "etag",
        label: "etag",
        type: "input",
        isTable: false,
      },
      {
        prop: "createdTime",
        label: "添加时间",
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
