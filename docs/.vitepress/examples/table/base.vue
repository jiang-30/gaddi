<template>
  <WCrud :option="option" :table-data="tableData"></WCrud>
</template>

<script setup lang="ts">
import { ref } from "vue";

const option = ref({
  fields: [
    { prop: "test", label: "test" },
    { prop: "index", label: "index" },
    { prop: "name", label: "名称" },
  ],
});
const tableData = ref([{ test: 111 }, { test: 223 }]);
</script>
