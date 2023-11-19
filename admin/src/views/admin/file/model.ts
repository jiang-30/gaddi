/*
 * @Author: jiang-30 514770300@qq.com
 * @Date: 2023-11-15 09:52:59
 * @LastEditors: jiang-30 514770300@qq.com
 * @LastEditTime: 2023-11-19 16:35:55
 * @FilePath: \gaddi\admin\src\views\admin\file\model.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
        label: "文件名",
        prop: "originFilename",
        type: "input",
        isSearch: true,
      },
      {
        label: "访问地址",
        prop: "url",
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
        width: 100,
      },
      {
        label: "bucket",
        prop: "bucket",
        type: "input",
        isTable: false,
      },
      {
        label: "目录",
        prop: "path",
        type: "input",
        isTable: false,
      },
      {
        label: "文件名",
        prop: "filename",
        type: "input",
        isTable: false,
      },
      {
        label: "MD5",
        prop: "md5",
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
