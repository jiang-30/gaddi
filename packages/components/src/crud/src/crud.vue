<template>
  <section class="d-crud">

    <!-- 搜索区域 -->
    <el-collapse-transition>
      <DSearchForm v-show="searchVisible" :option="option!" :search-model="searchModel" :loading="_currentTableLoading"
        @show="searchShow = $event" @init="onSearchInit" @search="onSearch" @reset="onSearchReset"></DSearchForm>
    </el-collapse-transition>

    <!-- 表格区域 操作栏、表格、分页 -->
    <section v-loading="_currentTableLoading">

      <!-- 操作栏 -->
      <section class="d-crud-action">

        <el-button v-if="actionBtnShowHandle(__actionAttrs.isCreateBtn, _currentModelValue)"
          v-authorize="__actionAttrs.createBtnPermission" type="primary" :icon="CirclePlus" @click="onOpenCreate"> 新增
        </el-button>

        <slot name="action"></slot>

        <span class="d-crud-action-split"></span>

        <!-- 刷新 -->
        <el-button circle :icon="Refresh" @click="onRefresh" />
        <!-- 过滤数据项 -->
        <ColumnFilter v-model="checkedFields" :fields="__tableFields" />
        <!-- 根据搜索区域确定显示隐藏 -->
        <el-button v-if="searchShow" circle :icon="Search" @click="searchVisible = !searchVisible" />
      </section>

      <!-- 表格 -->
      <el-table ref="tableRef" :data="_currentTableData" v-bind="{ ...$attrs, ...__tableAttrs }">
        <!-- 展开 expandColumn -->
        <el-table-column v-if="__expandColumn.isShow === true" type="expand">
          <template #default="scopeProps">
            <slot name="expand" v-bind="scopeProps"></slot>
          </template>
        </el-table-column>

        <!-- 选择 selectionColumn -->
        <el-table-column v-if="__selectionColumn.isShow === true" v-bind="__selectionColumn.attrs" type="selection" />

        <!-- 序号 indexColumn -->
        <el-table-column v-if="__indexColumn.isShow === true" v-bind="__indexColumn.columnAttrs" type="index" />

        <!-- 动态列 -->
        <el-table-column v-for="field in  tableFilterFields " :key="field.prop" :prop="field.prop" :label="field.label"
          v-bind="field.__elTableColumnAttrs">

          <template #header>
            <LabelTooltip :label="field.label" :hint="field.hint"></LabelTooltip>
          </template>

          <template #default="scopeProps">
            <slot :name="field.prop" v-bind="scopeProps" :field="field">
              <template v-if="field.type == 'image' || field.type == 'images'">
                <ImageList :images="formatValue(scopeProps.row, field)" width="40px" height="40px"></ImageList>
              </template>
              <template v-else>
                {{ formatValue(scopeProps.row, field) }}
              </template>
            </slot>
          </template>
        </el-table-column>

        <!-- 操作列 -->
        <el-table-column v-if="__actionAttrs.isRowAction" v-bind="__actionAttrs.rowActionAttrs">
          <template #default="scopeProps">
            <div class="d-crud-column-action">
              <el-button v-if="actionBtnShowHandle(__actionAttrs.isInfoBtn, scopeProps.row)"
                v-authorize="__actionAttrs.infoBtnPermission"
                :disabled="actionDisabledHandle(__actionAttrs.infoBtnDisabled, scopeProps.row)" text type="info"
                size="small" :icon="View" @click="onOpenInfo(scopeProps.row)">
                详情
              </el-button>
              <el-button v-if="actionBtnShowHandle(__actionAttrs.isUpdateBtn, scopeProps.row)"
                v-authorize="__actionAttrs.updateBtnPermission"
                :disabled="actionDisabledHandle(__actionAttrs.updateBtnDisabled, scopeProps.row)" text type="primary"
                size="small" :icon="Edit" @click="onOpenUpdate(scopeProps.row)">
                修改
              </el-button>
              <el-button v-if="actionBtnShowHandle(__actionAttrs.isDeleteBtn, scopeProps.row)"
                v-authorize="__actionAttrs.deleteBtnPermission"
                :disabled="actionDisabledHandle(__actionAttrs.deleteBtnDisabled, scopeProps.row)" text type="danger"
                size="small" :icon="Delete" @click="onDelete(scopeProps.row)">
                删除
              </el-button>
              <slot name="row-action" v-bind="scopeProps" />
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <section v-if="pageModel" class="d-crud-pagination">
        <el-pagination v-model:current-page="pageModel.current" v-model:page-size="pageModel.size"
          :total="pageModel.total" v-bind="__pageAttrs" @current-change="onPageCurrentChange"
          @size-change="onPageSizeChange" />
      </section>
    </section>

    <!-- 弹窗区域 -->
    <el-dialog v-model="dialogVisible" v-bind="__dialogAttrs" :title="dialogTypeMap[currentStatus]?.title"
      :close-on-click-modal="dialogTypeMap[currentStatus]?.closeOnClickModal" destroy-on-close
      :before-close="onDialogBeforeClose">

      <DForm ref="formRef" v-if="currentStatus === 'create' || currentStatus === 'update'" :type="currentStatus"
        :option="option" :form-model="_currentModelValue" :loading="formSaveLoading" @save="onFormSave">
        <template v-for=" item  in  Object.keys($slots).filter(item => item.endsWith('Form')) "
          v-slot:[item]="scopeProps">
          <slot :name="item" v-bind="scopeProps"></slot>
        </template>
      </DForm>

      <DInfo v-else-if="currentStatus === 'info'" :option="option" :info-model="_currentModelValue">
        <template v-for=" item  in  Object.keys($slots) " v-slot:[item]="scopeProps">
          <slot :name="item" v-bind="scopeProps"></slot>
        </template>
      </DInfo>
    </el-dialog>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch, toRaw } from 'vue'
import { ElMessageBox, type TableInstance, type DialogBeforeCloseFn } from 'element-plus'
import { View, CirclePlus, Search, Refresh, Edit, Delete } from '@element-plus/icons-vue'
import { cloneDeep } from 'lodash-es'
import ColumnFilter from './components/column-filter.vue'
import LabelTooltip from '../../common/components/label-tooltip.vue'
import ImageList from '../../common/components/image-list.vue'
import { crudProps, crudEmits } from './crud'
import { useCrudOption, actionDisabledHandle, actionBtnShowHandle } from './utils'
import { queryListApi, queryPageApi, queryInfoApi, createApi, updateApi, deleteApi } from './handler/api-handler'
import { dialogTypeMap } from './constant'
import { handle, formatValue } from '../../handle'
import { DSearchForm, DForm, DInfo, type IDForm, type IDCrudStatus } from '../../index'
import type { IDCrudQueryType } from './type'
import type { IDFormSaveFn } from '../../form'
import type { IDModel } from '../../typings'

defineOptions({ name: 'DCrud' })
const props = defineProps(crudProps)
const emits = defineEmits(crudEmits)

// 格式化配置数据
const {
  __tableAttrs,
  __pageAttrs,
  __dialogAttrs,
  __expandColumn,
  __selectionColumn,
  __actionAttrs,
  __indexColumn,
  __tableFields,
} = useCrudOption(props.option)

const tableRef = ref<TableInstance>()
const formRef = ref<IDForm>()
// 类型 table、create、update、delete、info
const currentStatus = ref<IDCrudStatus>('table')
// 根据配置确定搜索栏是否显示
const searchShow = ref(true)
// 搜索栏动态显示隐藏
const searchVisible = ref(true)
// 弹窗动态显示隐藏
const dialogVisible = ref(false)
// 表单loading状态
const formSaveLoading = ref(false)

// 表格要显示的列 // 要展示的列赋初始值
let __flag = true
const checkedFields = ref<string[]>([])
watch(__tableFields, () => {
  // console.log('watch __tableFields', __flag)
  if (__flag) {
    __tableFields.value.forEach(item => {
      if (item.__isTableShow) {
        checkedFields.value.push(item.prop)
      }
    })
  }
})
// 当前显示的表格项 - 根据选中状态动态修改
const tableFilterFields = computed(() => {
  return __tableFields.value.filter(item => {
    return checkedFields.value.includes(item.prop)
  })
})

// QueryLoading 状态
const _tableLoading = ref(false)
const _currentTableLoading = computed({
  get: () => {
    return props.tableLoading ?? _tableLoading.value
  },
  set: val => {
    emits('update:tableLoading', val)
    _tableLoading.value = val
  },
})

// v-model 数据 create、update、info、delete
const _modelValue = ref({})
const _currentModelValue = computed({
  get: () => {
    return props.modelValue ?? _modelValue.value
  },
  set: val => {
    emits('update:modelValue', val)
    _modelValue.value = val
  },
})

// 表格数据
const _tableData = ref<any>([])
const _currentTableData = computed({
  get: () => {
    return props.tableData ?? _tableData.value
  },
  set: val => {
    emits('update:tableData', val)
    _tableData.value = val
  },
})

// 回到表格状态
const backTableStatus = () => {
  currentStatus.value = 'table'
  _currentModelValue.value = {}
}

// 关闭弹窗的钩子
const onDialogBeforeClose: DialogBeforeCloseFn = (done) => {
  backTableStatus()
  done()
}

// 主动关闭弹窗
const closeDialogHandler = () => {
  dialogVisible.value = false
}

// 打开弹窗 - 操作数据的钩子
const openDialogHandler = () => {
  const openDone = () => {
    dialogVisible.value = true
  }

  if (props.beforeOpen) {
    props.beforeOpen(currentStatus.value, _currentModelValue.value, openDone)
  } else {
    openDone()
  }
}

// ========== 搜索 ==========
// 数据变化重新请求数据
const searchRefreshHandler = (_type: IDCrudQueryType) => {
  props.pageModel.current = 1
  searchHandler(_type)
}
const searchHandler = (_type: IDCrudQueryType) => {
  console.log(_type)
  if (props.queryHandler) {
    props.queryHandler(_type)
  } else if (props.api?.list) {
    // 查询全部列表
    _currentTableLoading.value = true
    queryListApi(props, _currentModelValue.value, props.searchModel)
      .then((data) => {
        _currentTableData.value = data
      })
      .catch((err) => {
        // console.error(err)
      })
      .finally(() => {
        _currentTableLoading.value = false
      })
  } else {
    // 分页查询
    _currentTableLoading.value = true
    queryPageApi(props, _currentModelValue.value, {
      current: props.pageModel.current,
      size: props.pageModel.size,
      ...props.searchModel,
    })
      .then((data) => {
        _currentTableData.value = data.data
        props.pageModel.total = data.total
      })
      .catch((err) => {
        // console.error(err)
      })
      .finally(() => {
        _currentTableLoading.value = false
      })
  }
}

// 搜索默认值初始化
const onSearchInit = () => {
  emits('init')
  searchRefreshHandler('init')
}
// 搜索
const onSearch = () => {
  emits('search')
  searchRefreshHandler('search')
}

// 搜索条件重置
const onSearchReset = () => {
  emits('searchReset')
  searchRefreshHandler('reset')
}

// 重新拉取数据
const onRefresh = () => {
  emits('refresh')
  searchHandler('refresh')
}

// 分页发生变化
const onPageCurrentChange = (current: number) => {
  emits('pageCurrentChange')
  searchHandler('pageChange')
}
const onPageSizeChange = (size: number) => {
  emits('pageSizeChange')
  searchRefreshHandler('sizeChange')
}

// 新增按钮 - 打开新增表单
// todo 默认值
const onOpenCreate = () => {
  currentStatus.value = 'create'
  _currentModelValue.value = {}
  openDialogHandler()
}

// 编辑按钮 - 打开编辑表单
const onOpenUpdate = (row: IDModel) => {
  currentStatus.value = 'update'
  _currentModelValue.value = cloneDeep(toRaw(row))
  openDialogHandler()
}

// 详情按钮 打开详情页面
const onOpenInfo = (row: IDModel) => {
  currentStatus.value = 'info'
  _currentModelValue.value = cloneDeep(toRaw(row))

  if (props.api?.info) {
    queryInfoApi(props, _currentModelValue.value)
      .then((data) => {
        _currentModelValue.value = data
        openDialogHandler()
      })
      .catch((err) => {
        // console.error(err)
      })
  } else {
    openDialogHandler()
  }
}

// 表格点击删除请求
const onDelete = (row: IDModel) => {
  currentStatus.value = 'delete'
  _currentModelValue.value = cloneDeep(toRaw(row))

  if (props.deleteHandler) {
    props.deleteHandler(_currentModelValue.value)
  } else {
    ElMessageBox.confirm('确定执行删除操作吗', {
      title: '提示',
      type: 'warning',
    })
      .then(() => {
        return deleteApi(props, _currentModelValue.value)
      })
      .then(() => {
        backTableStatus()
        searchRefreshHandler('delete')
      })
      .catch((err) => {
        // console.error(err)
      })
      .finally(() => {
        backTableStatus()
      })
  }
}

// 表单新增请求
const formCreateSaveHandler = (record: IDModel, done: any) => {
  if (props.createHandler) {
    props.createHandler(record, done)
  } else {
    createApi(props, _currentModelValue.value)
      .then(() => {
        done(true)
        searchRefreshHandler('create')
      })
      .catch((err) => {
        done()
        // console.error(err)
      })
  }
}

// 表单更新请求
const formUpdateSaveHandler = (record: IDModel, done: any) => {
  if (props.updateHandler) {
    props.updateHandler(record, done)
  } else if ((props.api?.update || props.api?.restful) && handle.axios) {
    updateApi(props, _currentModelValue.value)
      .then(() => {
        done(true)
        searchHandler('update')
      })
      .catch((err) => {
        done()
        // console.error(err)
      })
  }
}

// 表单保存事件
const onFormSave: IDFormSaveFn = (record) => {
  formSaveLoading.value = true;
  const formSaveDone = (flag: boolean = false) => {
    formSaveLoading.value = false;
    if (flag) {
      closeDialogHandler();
    }
  }

  if (currentStatus.value === 'create') {
    formCreateSaveHandler(record, formSaveDone);
  } else if (currentStatus.value === 'update') {
    formUpdateSaveHandler(record, formSaveDone);
  }
}

defineExpose({
  getTable: () => tableRef.value,
  getForm: () => formRef.value?.getForm(),
  closeDialog: closeDialogHandler,
  refresh(flag?: boolean) {
    if (flag) {
      searchRefreshHandler('expose')
    } else {
      searchHandler('expose')
    }
  },
  openCreate: onOpenCreate,
  openUpdate: onOpenUpdate,
  openInfo: onOpenInfo,
})
</script>

<style scoped>
.d-crud-action {
  display: flex;
  margin-bottom: 15px;
}

.d-crud-action-split {
  margin-left: auto;
}

.d-crud-pagination {
  margin-top: 15px;
}

.d-crud .el-table :deep(th) {
  /* background-color: #eee; */
  font-weight: 700;
  color: var(--el-text-color-regular);
  background: var(--el-fill-color-lighter);
}

.d-crud .d-crud-column-action {
  display: flex;
  justify-content: center;
}

.d-crud .d-crud-column-action :deep(.el-button) {
  margin-left: 0;
}
</style>
