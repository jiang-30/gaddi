<template>
  <WCrud ref="crudRef" :option="option" :table-data="tableData" :before-open="beforeOpenHandle">

  </WCrud>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  WCrud,
  type ICrud,
  type ICrudOption,
  type ICrudPageModel,
} from "@/packages/components/src/index";

const crudRef = ref<ICrud>()
const tableLoading = ref(false);
const searchModel = ref({})
const pageModel = ref<ICrudPageModel>({
  current: 1,
  size: 5,
  total: 7,
});
const option = ref<ICrudOption>({
  border: true,
  stripe: true,
  dialogWidth: 600,
  align: "center",
  rowKey: 'id',
  labelWidth: "100px",
  rowActionWidth: 230,
  isCreateBtn: true,
  isUpdateBtn: true,
  isDeleteBtn: true,
  isInfoBtn: true,
  fields: [
    {
      label: "字典名称",
      prop: "name",
      type: "input",
      width: 100,
      rules: [{ required: true, message: "请输入字典名称", trigger: "blur" }],
      isSearch: true,
    },
    {
      label: "字典标识",
      prop: "code",
      type: "input",
      rules: [{ required: true, message: "请输入字典标识", trigger: "blur" }],
      isSearch: true,
    },
    {
      label: "数据类型",
      prop: "dataType",
      type: "select",
      default: "list",
      rules: [{ required: true, message: "请选择数据类型", trigger: "blur" }],
      dictData: [
        { label: "列表", value: "list" },
        { label: "树形", value: "tree" },
      ],
    },
    {
      label: "树形",
      prop: "tree",
      type: "tree",
      dictData: [
        { label: "列表", value: "list", children: [{ label: "列表1", value: "tree1" }, { label: "列表2", value: "tree2" }] },
        { label: "树形", value: "tree" },
      ],
      checkStrictly: true,
      valueKey: 'value',
      isSearch: true
    },
    {
      label: "图片",
      prop: "image",
      type: "images",
    },
  ],
});

const tableData = ref<Record<string, any>[]>([
  { name: 'name1', id: 1, code: 'code1', dataType: 'list', tree: 'list1', image: 'http://e.hiphotos.baidu.com/image/pic/item/a1ec08fa513d2697e542494057fbb2fb4316d81e.jpg,http://e.hiphotos.baidu.com/image/pic/item/a1ec08fa513d2697e542494057fbb2fb4316d81e.jpg,http://e.hiphotos.baidu.com/image/pic/item/a1ec08fa513d2697e542494057fbb2fb4316d81e.jpg' },
  { name: 'name2', id: 2, code: 'code2', dataType: 'list', tree: 'list' },
  { name: 'name3', id: 3, code: 'code3', dataType: 'list', tree: 'list' },
  { name: 'name4', id: 4, code: 'code4', dataType: 'list', tree: 'list' },
  { name: 'name5', id: 5, code: 'code5', dataType: 'list', tree: 'list' },
  { name: 'name6', id: 6, code: 'code6', dataType: 'list', tree: 'list' },
  { name: 'name7', id: 7, code: 'code7', dataType: 'list', tree: 'list' },
]);


const beforeOpenHandle = (type: string, model: any, done: any) => {
  console.log(type, model)
  done()
}

</script>
