<template>
  <section class="d-crud">

    <!-- 搜索区域 -->
    <el-collapse-transition>
      <DSearchForm v-show="searchVisible" :option="option!" :search-model="searchModel" :loading="_currentTableLoading"
        @show="searchShow = $event" @init="_onSearchInit" @search="_onSearch" @reset="_onSearchReset"></DSearchForm>
    </el-collapse-transition>

    <!-- 表格区域 操作栏、表格、分页 -->
    <section v-loading="_currentTableLoading">

      <!-- 操作栏 -->
      <section class="d-crud-action">

        <el-button v-if="handlerBtnShow(__actionAttrs.isCreateBtn)" v-authorize="__actionAttrs.createBtnPermission"
          type="primary" :icon="CirclePlus" @click="_onOpenCreate"> 新增 </el-button>

        <slot name="action"></slot>

        <span class="d-crud-action-split"></span>

        <!-- 刷新 -->
        <el-button circle :icon="Refresh" @click="_onRefresh" />
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
        <el-table-column v-for="field in tableFilterFields" :key="field.prop" :prop="field.prop" :label="field.label"
          v-bind="field.__elTableColumnAttrs">

          <template #header>
            <LabelTooltip :label="field.label" :hint="field.hint"></LabelTooltip>
          </template>

          <template #default="scopeProps">
            <slot :name="field.prop" v-bind="scopeProps" :field="field">
              <template v-if="field.type == 'image' || field.type == 'images'">
                <el-image v-for="image in (formatValue(scopeProps.row, field) ?? '').split(',').filter((it: any) => it)"
                  style="width: 40px; height: 40px; margin: 0 3px;" :src="image" fit="cover" />
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
              <el-button v-if="handlerBtnShow(__actionAttrs.isInfoBtn)" v-authorize="__actionAttrs.infoBtnPermission"
                :disabled="actionDisabledHandle(__actionAttrs.infoBtnDisabled, scopeProps.row)" text type="info"
                size="small" :icon="View" @click="_onOpenInfo(scopeProps.row)">
                详情
              </el-button>
              <el-button v-if="handlerBtnShow(__actionAttrs.isUpdateBtn)" v-authorize="__actionAttrs.updateBtnPermission"
                :disabled="actionDisabledHandle(__actionAttrs.updateBtnDisabled, scopeProps.row)" text type="primary"
                size="small" :icon="Edit" @click="_onOpenUpdate(scopeProps.row)">
                修改
              </el-button>
              <el-button v-if="handlerBtnShow(__actionAttrs.isDeleteBtn)" v-authorize="__actionAttrs.deleteBtnPermission"
                :disabled="actionDisabledHandle(__actionAttrs.deleteBtnDisabled, scopeProps.row)" text type="danger"
                size="small" :icon="Delete" @click="_onDelete(scopeProps.row)">
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
          :total="pageModel.total" v-bind="__pageAttrs" @current-change="_onPageCurrentChange"
          @size-change="_onPageSizeChange" />
      </section>
    </section>

    <!-- 弹窗区域 -->
    <el-dialog v-model="dialogVisible" v-bind="__dialogAttrs" :title="dialogTypeMap[currentStatus]?.title"
      :close-on-click-modal="dialogTypeMap[currentStatus]?.closeOnClickModal" destroy-on-close
      :before-close="onDialogBeforeClose">

      <DForm ref="formRef" v-if="currentStatus === 'create' || currentStatus === 'update'" :type="currentStatus"
        :option="option" :form-model="_currentModelValue" :loading="formSaveLoading" @save="onFormSave">
        <template v-for="item in Object.keys($slots).filter(item => item.endsWith('Form'))" v-slot:[item]="scopeProps">
          <slot :name="item" v-bind="scopeProps"></slot>
        </template>
      </DForm>

      <DInfo v-else-if="currentStatus === 'info'" :option="option" :info-model="_currentModelValue">
        <template v-for="item in Object.keys($slots)" v-slot:[item]="scopeProps">
          <slot :name="item" v-bind="scopeProps"></slot>
        </template>
      </DInfo>
    </el-dialog>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { View, CirclePlus, Search, Refresh, Edit, Delete } from '@element-plus/icons-vue'
import ColumnFilter from './components/column-filter.vue'
import LabelTooltip from '../../common/components/label-tooltip.vue'
import { DSearchForm, DForm, DInfo, type IDForm, type IDCrudStatus } from '../../index'
import { crudProps, crudEmits } from './crud'
import { useCrudOption, actionDisabledHandle } from './utils'
import { ElMessageBox, ElNotification, type Action, type TableInstance, type DialogBeforeCloseFn } from 'element-plus'
import { handle, formatValue } from '../../handle'
import { dialogTypeMap } from './constant'
import type { IDCrudQueryType } from './type'

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

// table Ref
const tableRef = ref<TableInstance>()
const formRef = ref<IDForm>()
// 根据配置确定搜索栏是否显示
const searchShow = ref(true)
// 搜索栏动态显示隐藏
const searchVisible = ref(true)
// 弹窗动态显示隐藏
const dialogVisible = ref(false)
// 类型 table、create、update、delete、info
const currentStatus = ref<IDCrudStatus>('table')
// 表单loading状态
const formSaveLoading = ref(false)

// 表格要显示的列
let __flag = true
const checkedFields = ref<string[]>([])
// 要展示的列赋初始值
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

// 操作按钮是否显示
const handlerBtnShow = (isButton: boolean | Function) => {
  if (typeof isButton == 'function') {
    return isButton(_modelValue)
  } else {
    return isButton
  }
}

// 关闭弹窗
const onDialogBeforeClose: DialogBeforeCloseFn = (done) => {
  // 1. 设置状态
  currentStatus.value = 'table'
  // 2. 设置值 双向绑定
  _currentModelValue.value = {}
  done()
}
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
const searchHandler = (_type: IDCrudQueryType) => {
  console.log(_type)
  const _currentType = 'query';

  if (props.queryHandler) {
    props.queryHandler(_type)
  } else if (props.api?.list && handle.axios) {
    // 查询全部列表
    _currentTableLoading.value = true
    const requestConfig = {
      method: 'get',
      url: props.api.list,
      params: {
        ...props.searchModel,
      },
    }
    if (props.beforeFetch) {
      props.beforeFetch(_currentType, requestConfig)
    }
    handle
      .axios(requestConfig)
      .then(({ data }) => {
        if (props.afterFetch) {
          props.afterFetch(_currentType, data)
        }
        _currentTableData.value = data
      })
      .finally(() => {
        _currentTableLoading.value = false
      })
  } else if ((props.api?.page || props.api?.restful) && handle.axios) {
    // 分页查询
    _currentTableLoading.value = true
    const requestConfig = {
      method: 'get',
      url: props.api.page ?? props.api.restful,
      params: {
        current: props.pageModel.current,
        size: props.pageModel.size,
        ...props.searchModel,
      },
    }
    if (props.beforeFetch) {
      props.beforeFetch(_currentType, requestConfig)
    }
    handle
      .axios(requestConfig)
      .then(({ data }) => {
        if (props.afterFetch) {
          props.afterFetch(_currentType, data)
        }
        _currentTableData.value = data.records
        props.pageModel.total = data.total
      })
      .finally(() => {
        _currentTableLoading.value = false
      })
  }
}

// 搜索默认值初始化
const _onSearchInit = () => {
  emits('init')
  searchHandler('init')
}
// 搜索
const _onSearch = () => {
  props.pageModel.current = 1
  emits('search')
  searchHandler('search')
}

// 搜索条件重置
const _onSearchReset = () => {
  props.pageModel.current = 1
  emits('searchReset')
  searchHandler('reset')
}

// 重新拉取数据
const _onRefresh = () => {
  emits('refresh')
  searchHandler('refresh')
}

// 分页发生变化
const _onPageCurrentChange = (current: number) => {
  emits('pageCurrentChange')
  searchHandler('pageChange')
}
const _onPageSizeChange = (size: number) => {
  emits('pageSizeChange')
  searchHandler('sizeChange')
}

// 数据变化重新请求数据
const changeSearchHandler = () => {
  props.pageModel.current = 1
  searchHandler('createOrDelete')
}

// 新增按钮
const _onOpenCreate = (row: any = {}) => {
  // 1. 设置状态
  currentStatus.value = 'create'
  // 3. 设置当前 model 值 双向绑定
  _currentModelValue.value = { ...row }
  // 4. 打开弹窗
  openDialogHandler()
}

// 编辑按钮
const _onOpenUpdate = (row: any) => {
  // 1. 设置状态
  currentStatus.value = 'update'
  // 2. 设置值 双向绑定
  _currentModelValue.value = { ...row }
  // 3. 打开弹窗
  openDialogHandler()
}

// 详情按钮
const _onOpenInfo = (row: any) => {
  const _currentType = 'info'
  // 1. 设置状态
  currentStatus.value = _currentType
  // 2. 设置值 双向绑定
  _currentModelValue.value = { ...row }
  // 3. 请求数据，打开弹窗
  if (props.api?.info && handle.axios) {
    // 详情请求
    const requestConfig = {
      method: 'get',
      url: props.api.info + '/' + row.id,
    }
    if (props.beforeFetch) {
      props.beforeFetch(_currentType, requestConfig)
    }

    handle.axios(requestConfig).then(({ data }) => {
      if (props.afterFetch) {
        props.afterFetch(_currentType, data)
      }
      _currentModelValue.value = data
      openDialogHandler()
    })
  } else {
    openDialogHandler()
  }
}

// 表格点击删除请求
const _onDelete = (row: any) => {
  const _currentType = 'delete';
  // 1. 设置状态
  currentStatus.value = _currentType
  // 2. 设置值 双向绑定 数据拷贝
  _currentModelValue.value = { ...row }
  // 3. 删除操作
  if (props.deleteHandler) {
    props.deleteHandler(_currentModelValue.value)
  } else if ((props.api?.delete || props.api?.restful) && handle.axios) {
    ElMessageBox.confirm('确定执行删除操作吗', {
      title: '提示',
      type: 'warning',
      callback: (action: Action) => {
        if (action === 'confirm' && (props.api?.delete || props.api?.restful) && handle.axios) {
          // 删除请求
          const requestConfig = {
            method: 'delete',
            url: (props.api.delete ?? props.api.restful) + '/' + row.id,
          }

          if (props.beforeFetch) {
            props.beforeFetch(_currentType, requestConfig)
          }

          handle.axios(requestConfig).then(({ data }) => {
            ElNotification({ title: '提示', message: '删除成功！', type: 'success' })
            if (props.afterFetch) {
              props.afterFetch(_currentType, data)
            }
            changeSearchHandler()
          })
        }
      },
    })
  }
}

// 表单保存请求
const _onCreateConfirm = (record: any, done: any) => {
  const _currentType = currentStatus.value
  if (props.createHandler) {
    props.createHandler(record, done)
  } else if ((props.api?.create || props.api?.restful) && handle.axios) {
    // 新增请求
    const requestConfig = {
      method: 'post',
      url: props.api.create ?? props.api.restful,
      data: record,
    }
    if (props.beforeFetch) {
      props.beforeFetch(_currentType, requestConfig)
    }

    handle
      .axios(requestConfig)
      .then(() => {
        ElNotification({ title: '提示', message: '新增成功！', type: 'success' })
        changeSearchHandler()
        done(true)
      })
      .catch(() => done())
  }
}

// 表单更新请求
const _onUpdateConfirm = (record: any, done: any) => {
  const _currentType = currentStatus.value

  if (props.updateHandler) {
    props.updateHandler(record, done)
  } else if ((props.api?.update || props.api?.restful) && handle.axios) {
    // 更新请求
    const requestConfig = {
      method: 'put',
      url: props.api.update ?? props.api.restful,
      data: record,
    }
    if (props.beforeFetch) {
      props.beforeFetch(_currentType, requestConfig)
    }

    handle
      .axios(requestConfig)
      .then(() => {
        ElNotification({ title: '提示', message: '修改成功！', type: 'success' })
        searchHandler('update')
        done(true)
      })
      .catch(() => done())
  }
}

const formSaveDone = (flag: boolean = false) => {
  formSaveLoading.value = false;
  if (flag) {
    closeDialogHandler();
  }
}

// 表单保存事件
const onFormSave = (record: any) => {
  formSaveLoading.value = true;
  if (currentStatus.value === 'create') {
    _onCreateConfirm(record, formSaveDone);
  } else if (currentStatus.value === 'update') {
    _onUpdateConfirm(record, formSaveDone);
  }
}


defineExpose({
  // getTable: () => tableRef.value,
  // getForm: () => formRef.value?.getForm(),
  closeDialog: closeDialogHandler,
  refresh(flag: boolean) {
    if (flag) {
      props.pageModel.current = 1
    }
    searchHandler('expose')
  },
  openCreate: _onOpenCreate,
  openUpdate: _onOpenUpdate,
  openInfo: _onOpenInfo,
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
