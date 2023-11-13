import { useDictStore } from '@/store'
import type { IDCrudApi, IDCrudOption } from '@gaddi/components'

export const useModel = () => {
  const api: IDCrudApi = {
    restful: '/admin/user',
  }

  const option: IDCrudOption = {
    rowActionWidth: 240,
    labelWidth: 100,
    align: 'center',
    fields: [
      // layoutType: 'translation'; ro
      // roleIds: '' 通过 roleCode 转换
      {
        prop: 'username',
        label: '用户名',
        type: 'input',
        rules: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { type: 'string', max: 30, message: '30个字符以内', trigger: 'blur' },
        ],
        isSearch: true,
        updateDisabled: true,
      },
      // {
      //   prop: 'deptId',
      //   label: '所属部门',
      //   type: 'tree',
      //   default: '',
      //   dictUrl: '/admin/dept/tree',
      //   dictProps: {
      //     label: 'name',
      //     value: 'id',
      //   },
      //   valueKey: 'value',
      //   checkStrictly: true,
      //   rules: [{ required: true, message: '请选择部门', trigger: 'change' }],
      // },
      // {
      //   prop: 'roleIds',
      //   label: '角色',
      //   type: 'select',
      //   dictUrl: '/admin/role/list',
      //   dictProps: {
      //     value: 'id',
      //     label: 'name',
      //   },
      //   default: [],
      //   multiple: true,
      //   rules: [{ required: true, message: '请选择用户角色', trigger: 'change' }],
      // },
      {
        prop: 'password',
        label: '密码',
        type: 'password',
        rules: [
          { type: 'string', min: 6, max: 30, message: '6 - 30个字符', trigger: 'blur' },
        ],
        isTable: false,
        isUpdateForm: false,
      },
      {
        prop: 'nickname',
        label: '姓名',
        type: 'input',
        rules: [{ type: 'string', max: 20, message: '最多20个字符', trigger: 'blur' }],
      },
      {
        prop: 'phoneNum',
        label: '手机号码',
        type: 'input',
        rules: [{ type: 'string', max: 11, message: '手机号码格式不正确', trigger: 'blur' }],
      },
      // {
      //   prop: 'email',
      //   label: '邮箱',
      //   type: 'input',
      //   rules: [{ type: 'string', max: 50, message: '50个字符以内', trigger: 'blur' }],
      //   isTable: false,
      // },
      {
        prop: 'level',
        label: '保密等级',
        type: 'select',
        dictCode: 'security_level',
        rules: [{ type: 'string', max: 50, message: '50个字符以内', trigger: 'blur' }],
        updateDisabled: true,
      },
      // nickname
      // avatar
      // birthday
      // gender
      // resume
      // type
      // level
      // clientCode
      {
        prop: 'remark',
        label: '备注',
        type: 'textarea',
        rules: [{ type: 'string', max: 255, message: '255个字符以内', trigger: 'blur' }],
        isTable: false,
      },
      {
        prop: 'isEnabled',
        label: '状态',
        type: 'radio',
        dictData: useDictStore().items('SYS_ENABLED'),
        default: '1',
        width: 100,
      },
    ],
  }

  return {
    api,
    option,
  }
}
