import type { IDCrudApi, IDCrudOption } from '@gaddi/components';
import { ref } from 'vue'

export const useModel = () => {
  const api: IDCrudApi = {
    restful: '/admin/client'
  };
  const option: IDCrudOption = {
    labelWidth: 100,
    rowActionWidth: 150,
    span: 24,
    fields: [
      {
        prop: "name",
        label: "客户端名称",
        type: "input",
        rules: [
          {
            required: true,
            message: "请输入客户端名称",
            trigger: "blur",
          },
          { type: "string", max: 30, message: "30个字符以内", trigger: "blur" },
        ],
        isSearch: true,
      },
      {
        prop: "code",
        label: "平台标识",
        type: "input",
        rules: [
          { required: true, message: "请输入平台名称", trigger: "blur" },
          { type: "string", max: 30, message: "30个字符以内", trigger: "blur" },
        ],
        updateDisabled: true,
      },
      {
        label: "默认密码",
        prop: "defaultPassword",
        type: "input",
      },
      {
        prop: "secret",
        label: "密钥",
        type: "input",
        rules: [
          { type: "string", max: 32, min: 32, message: "密钥长度为32", trigger: "blur" },
        ],
      },
      {
        prop: "expires",
        label: "认证过期时间",
        type: "input",
      },
      {
        prop: "remark",
        label: "备注",
        type: "textarea",
        rules: [
          {
            type: "string",
            max: 255,
            message: "255个字符以内",
            trigger: "blur",
          },
        ],
        isTable: false,
      },
      {
        prop: "isEnabled",
        label: "状态",
        type: "radio",
        dictCode: "SYS_ENABLED",
        default: "1",
        width: 100,
        align: "center",
      },
    ],
  }

  return {
    option,
    api,
  };
};
