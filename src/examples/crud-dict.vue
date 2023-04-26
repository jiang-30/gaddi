<template>
  <WCrud ref="crudRef" :option="option" :table-data="tableData" :api="api" :page-model="pageModel" :onSelectionChange="onSelectionChange">
    <template #row-action="{ row }">
      <el-button type="primary" text size="small" @click="onOpenItems(row)">
        字典项
      </el-button>
    </template>
  </WCrud>

  <el-button type="primary" @click="onSelect">
    选中
  </el-button>

  <DictItem ref="itemRef" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  ICrudApi,
  WCrud,
  type ICrud,
  type ICrudOption,
  type IPageModel,
} from "@/packages/components/src/index";
import DictItem from "./dict-item.vue";

const itemRef = ref<InstanceType<typeof DictItem>>();
const crudRef = ref<ICrud>()

const api = ref<ICrudApi>({
  page: "admin/dict/page",
});
const option = ref<ICrudOption>({
  border: true,
  stripe: true,
  dialogWidth: 600,
  align: "center",
  selectionColumn: true,
  rowKey: 'id',
  labelWidth: "100px",
  rowActionWidth: 230,
  isCreateBtn: false,
  isUpdateBtn: false,
  isDeleteBtn: false,
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
      label: "字典类型",
      prop: "type",
      type: "select",
      default: "biz",
      rules: [{ required: true, message: "请选择字典类型", trigger: "blur" }],
      dictData: [
        { label: "业务类型", value: "biz" },
        { label: "系统类型", value: "sys" },
      ],
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
      label: "备注",
      prop: "remark",
      type: "input",
      isTable: false,
    },
  ],
});
const tableLoading = ref(false);
const pageModel = ref<IPageModel>({
  current: 1,
  size: 5,
  total: 7,
});
const tableData = ref<Record<string, any>[]>([
  { name: 'de', id: 1, },
    {  name: '123123', id: 2, },
    {  name: '123123', id: 3, },
    {  name: '123123', id: 4, },
    {  name: '123123', id: 5, },
    {  name: '123123', id: 6, },
    {  name: '123123', id: 7, }
]);

function onSelectionChange(args: any){
  console.log(333, args)
}

function onSelect() {
  crudRef.value?.getTable()?.toggleRowSelection(tableData.value[0], true)

  console.log('see', crudRef.value?.getTable()?.getSelectionRows())

  // tableData.value = [
  //   { name: 'de', id: 1, },
  //   {  name: '123123', id: 2, },
  //   {  name: '123123', id: 3, },
  //   {  name: '123123', id: 4, },
  //   {  name: '123123', id: 5, },
  //   {  name: '123123', id: 6, },
  //   {  name: '123123', id: 7, }
  // ]

}

const onQuery = () => {
  console.log("onQuery", pageModel);
  tableLoading.value = true;

  setTimeout(() => {
    tableData.value = [
      {
        id: "1",
        name: "名称",
        code: "SYS_ENABLED",
        type: "sys",
        dataType: "tree",
        remark:
          "备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息",
      },
      {
        id: "2",
        name: "名称",
        code: "SYS_ENABLED",
        type: "sys",
        dataType: "tree",
        remark: "备注信息备注信息备注信息备注信息",
      },
      {
        id: "3",
        name: "名称",
        code: "SYS_ENABLED",
        type: "sys",
        dataType: "tree",
        remark: "备注信息备注信息备注信息备注信息",
      },
    ];
    pageModel.value.total = tableData.value.length * 4;
    tableLoading.value = false;
  }, 1000);
};

// 新建请求
const onCreate = (record: any, done: any) => {
  console.log(record);
  done();
};

// 更新请求
const onUpdate = (record: any, done: any) => {
  console.log(record);
  done();
};

// 删除请求
const onDelete = (row: any) => {
  console.log(row);
};

// 打开字典项
const onOpenItems = (row: any) => {
  itemRef.value?.open(row.id, row.type);
};
</script>
