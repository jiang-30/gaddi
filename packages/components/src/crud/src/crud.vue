<template>
  <section class="w-crud">
    <!-- 搜索区域 -->
    <el-collapse-transition>
      <WSearchForm
        v-show="searchVisible"
        :option="option!"
        :search-model="searchModel"
        :loading="tableLoading ?? _tableLoading"
        @show="searchShow = $event"
        @init="_onSearchInit"
        @search="_onSearch"
        @reset="_onSearchReset"
      ></WSearchForm>
    </el-collapse-transition>

    <section v-loading="tableLoading ?? _tableLoading">
      <!-- 操作区域 -->
      <section class="w-crud-action">

        <el-button v-if="handlerBtnShow(__actionOption.isCreateBtn)" type="primary" :icon="CirclePlus" @click="_onOpenCreate"> 新增 </el-button>

        <slot name="action"></slot>

        <span class="w-crud-action-split"></span>

        <!-- 刷新 -->
        <el-button circle :icon="Refresh" @click="_onRefresh" />
        <!-- 过滤数据项 -->
        <ColumnFilter v-model="checkedFields" :fields="__tableFields" />
        <!-- 根据搜索区域确定显示隐藏 -->
        <el-button
          v-if="searchShow"
          circle
          :icon="Search"
          @click="searchVisible = !searchVisible"
        />
      </section>

      <!-- 表格区域 -->
      <el-table ref="tableRef" :data="_currentTableData"  v-bind="{... $attrs, ...__tableAttrs}">
        <!-- expandColumn 展开 -->
        <el-table-column v-if="option.expandColumn === true" type="expand">
          <template #default="scopeProps">
            <slot name="expand" v-bind="scopeProps"></slot>
          </template>
        </el-table-column>

        <!-- selectionColumn 选择 -->
        <el-table-column v-if="__selectionColumn.isShow" v-bind="__selectionColumn.attrs" type="selection" />

        <!-- indexColumn 序号 -->
        <el-table-column
          v-if="option.indexColumn !== false"
          type="index"
          label="序号"
          width="60"
          align="center"
        />

        <!-- 动态列 -->
        <el-table-column
          v-for="column in tableFilterFields"
          :key="column.prop"
          :prop="column.prop"
          :label="column.label"
          v-bind="column.__elTableColumnAttrs"
        >
          <template #default="scopeProps">
            <slot :name="column.prop" v-bind="scopeProps" :field="column">
              {{ formatValue(column, scopeProps.row, scopeProps.column, scopeProps.$index) }}
            </slot>
          </template>
        </el-table-column>

        <el-table-column v-if="__actionOption.isRowAction" v-bind="__tableColumnActionAttrs">
          <template #default="scopeProps">
            <div class="w-crud-column-action">
              <el-button
                v-if="handlerBtnShow(__actionOption.isInfoBtn)"
                text
                type="info"
                size="small"
                :icon="View"
                @click="_onOpenInfo(scopeProps.row)"
              >
                详情
              </el-button>
              <el-button
                v-if="handlerBtnShow(__actionOption.isUpdateBtn)"
                text
                type="primary"
                size="small"
                :icon="Edit"
                @click="_onOpenUpdate(scopeProps.row)"
              >
                修改
              </el-button>
              <el-button
                v-if="handlerBtnShow(__actionOption.isDeleteBtn)"
                text
                type="danger"
                size="small"
                :icon="Delete"
                @click="_onDelete(scopeProps.row)"
              >
                删除
              </el-button>
              <slot name="row-action" v-bind="scopeProps" />
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <section v-if="pageModel" class="w-crud-pagination">
        <el-pagination
          v-model:current-page="pageModel.current"
          v-model:page-size="pageModel.size"
          :total="pageModel.total"
          v-bind="__pageAttrs"
          @current-change="_onPageCurrentChange"
          @size-change="_onPageSizeChange"
        />
      </section>
    </section>

    <!-- 弹窗区域 -->
    <el-dialog
      v-if="['create', 'update', 'info'].includes(currentType)"
      v-model="dialogVisible"
      v-bind="__dialogAttrs"
      :title="dialogTypeMap[currentType]?.title"
      :close-on-click-modal="dialogTypeMap[currentType]?.closeOnClickModal"
      destroy-on-close
    >
      <WForm
        v-if="currentType === 'create' || currentType === 'update'"
        :type="currentType"
        :option="option"
        :form-model="_currentModelValue"
        @confirm="_onFormConfirm"
        @success="onCloseHandler"
      >
        <template
          v-for="item in Object.keys($slots).filter(item => item.endsWith('Form'))"
          v-slot:[item]="scopeProps"
        >
          <slot :name="item" v-bind="scopeProps"></slot>
        </template>
      </WForm>

      <WInfo v-else-if="currentType === 'info'" :option="option" :info-model="_currentModelValue">
        <template
          v-for="item in Object.keys($slots).filter(item => item.endsWith('Info'))"
          v-slot:[item]="scopeProps"
        >
          <slot :name="item" v-bind="scopeProps"></slot>
        </template>
      </WInfo>
    </el-dialog>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, useSlots } from 'vue'
import { View, CirclePlus, Search, Refresh, Edit, Delete } from '@element-plus/icons-vue'
import ColumnFilter from './column-filter.vue'
import { WSearchForm, WForm, WInfo } from '../../index'
import { crudProps, crudEmits } from './crud'
import { useCrudOption } from './utils'
import { ElMessageBox, ElNotification, type Action, type TableInstance } from 'element-plus'
import { tools, formatValue } from '../../utils'

// console.log("slots: ", useSlots());

defineOptions({ name: 'WCrud' })
const props = defineProps(crudProps)
const emits = defineEmits(crudEmits)

const tableRef = ref<TableInstance>()

// 根据搜索栏控制搜索显示按钮的显示
const searchShow = ref(true)
// 搜索栏显示隐藏
const searchVisible = ref(true)
// 弹窗的显示隐藏
const dialogVisible = ref(false)
// 当前状态
const dialogTypeMap: Record<string, { title: string; closeOnClickModal: boolean }> = {
  info: {
    title: '详情',
    closeOnClickModal: true,
  },
  create: {
    title: '新增',
    closeOnClickModal: false,
  },
  update: {
    title: '修改',
    closeOnClickModal: false,
  },
}
const currentType = ref('normal')
// 选中要显示的列
const checkedFields = ref<string[]>([])
// 当前数据
const _tableLoading = ref(false)

// 格式化配置数据
const { __tableFields, __selectionColumn, __tableColumnActionAttrs, __tableAttrs, __pageAttrs, __dialogAttrs , __actionOption } =
  useCrudOption(props.option)



// 初始值
__tableFields.value.forEach(item => {
  if (item.isShow) {
    checkedFields.value.push(item.prop)
  }
})

// 当前显示的表格项
const tableFilterFields = computed(() => {
  return __tableFields.value.filter(item => {
    return checkedFields.value.includes(item.prop)
  })
})

// v-model 数据
const _formModel = ref({})
const _currentModelValue = computed({
  get: () => {
    return props.modelValue ?? _formModel.value
  },
  set: val => {
    emits('update:modelValue', val)
    _formModel.value = val
    console.log(`set ${currentType.value} modelValue`)
  },
})

const handlerBtnShow = (isButton: boolean | Function) => {
  if(typeof isButton == 'function') {
    return isButton(_formModel)
  } else {
    return isButton
  }
}

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

// 关闭弹窗
const onCloseHandler = () => {
  // 1. 设置状态
  currentType.value = 'normal'
  // 2. 设置值 双向绑定
  _currentModelValue.value = {}
  // 3. 关闭弹窗
  dialogVisible.value = false
}

// 打开弹窗 - 操作数据的钩子
const openHandler = () => {
  const openDone = () => {
    dialogVisible.value = true
  }

  if (props.beforeOpen) {
    props.beforeOpen(_currentModelValue.value, openDone, currentType.value)
  } else {
    openDone()
  }
}

// ========== 搜索 ==========
const searchHandler = (_type: string) => {
  currentType.value = 'query'
  if (props.onQuery) {
    props.onQuery(_type)
  } else if (props.api?.list && tools.axios) {
    // 查询全部列表
    _tableLoading.value = true
    const requestConfig = {
      method: 'get',
      url: props.api.list,
      params: {
        ...props.searchModel,
      },
    }
    if (props.beforeFetch) {
      props.beforeFetch(requestConfig, currentType.value)
    }
    tools
      .axios(requestConfig)
      .then(({ data }) => {
        if (props.afterFetch) {
          props.afterFetch(data, currentType.value)
        }
        _currentTableData.value = data
      })
      .finally(() => {
        _tableLoading.value = false
      })
  } else if ((props.api?.page || props.api?.restful) && tools.axios) {
    // 分页查询
    _tableLoading.value = true
    const requestConfig = {
      method: 'get',
      url: props.api.page ?? props.api.restful + '/page',
      params: {
        current: props.pageModel.current,
        size: props.pageModel.size,
        ...props.searchModel,
      },
    }
    if (props.beforeFetch) {
      props.beforeFetch(requestConfig, currentType.value)
    }
    tools
      .axios(requestConfig)
      .then(({ data }) => {
        if (props.afterFetch) {
          props.afterFetch(data, currentType.value)
        }
        _currentTableData.value = data.records
        props.pageModel.total = data.total
      })
      .finally(() => {
        _tableLoading.value = false
      })
  }
}

const changeSearchHandler = () => {
  props.pageModel.current = 1
  searchHandler('createOrDelete')
}

const _onRefresh = () => {
  // console.log('table refresh')
  emits('refresh')
  searchHandler('refresh')
}

const _onSearchInit = () => {
  // console.log('search init')
  emits('init')
  searchHandler('init')
}

const _onSearch = () => {
  // console.log('search')
  props.pageModel.current = 1
  emits('search')
  searchHandler('search')
}

const _onSearchReset = () => {
  // console.log('search reset')
  props.pageModel.current = 1
  emits('searchReset')
  searchHandler('searchReset')
}

const _onPageCurrentChange = (current: number) => {
  // console.log('page current change')
  emits('pageCurrentChange')
  searchHandler('page')
}

const _onPageSizeChange = (size: number) => {
  // console.log('page size change')
  emits('pageSizeChange')
  searchHandler('page')
}

const _onOpenCreate = (row: any = {}) => {
  // 1. 设置状态
  currentType.value = 'create'
  // 3. 设置当前 model 值 双向绑定
  _currentModelValue.value = { ...row }
  // 4. 打开弹窗
  openHandler()
}

const _onOpenUpdate = (row: any) => {
  // 1. 设置状态
  currentType.value = 'update'
  // 2. 设置值 双向绑定
  _currentModelValue.value = { ...row }
  // 3. 打开弹窗
  openHandler()
}

// console.log('fffff', tools.axios)

const _onOpenInfo = (row: any) => {
  // 1. 设置状态
  currentType.value = 'info'
  // 2. 设置值 双向绑定
  _currentModelValue.value = { ...row }
  // 3. 请求数据，打开弹窗
  if (props.api?.info && tools.axios) {
    // 详情请求
    const requestConfig = {
      method: 'get',
      url: props.api.info + row.id,
    }
    if (props.beforeFetch) {
      props.beforeFetch(requestConfig, currentType.value)
    }

    tools.axios(requestConfig).then(({ data }) => {
      if (props.afterFetch) {
        props.afterFetch(data, currentType.value)
      }
      _currentModelValue.value = data
      openHandler()
    })
  } else {
    openHandler()
  }
}

const _onDelete = (row: any) => {
  // 1. 设置状态
  currentType.value = 'delete'
  // 2. 设置值 双向绑定 数据拷贝
  _currentModelValue.value = { ...row }
  // 3. 删除操作
  if (props.onDelete) {
    props.onDelete(_currentModelValue.value)
  } else if ((props.api?.delete || props.api?.restful) && tools.axios) {
    ElMessageBox.confirm('确定执行删除操作吗', {
      title: '提示',
      type: 'warning',
      callback: (action: Action) => {
        if (action === 'confirm' && (props.api?.delete || props.api?.restful) && tools.axios) {
          // 删除请求
          const requestConfig = {
            method: 'delete',
            url: (props.api.delete ?? props.api.restful + '/') + row.id,
          }
          if (props.beforeFetch) {
            props.beforeFetch(requestConfig, currentType.value)
          }

          tools.axios(requestConfig).then(() => {
            ElNotification({ title: '提示', message: '删除成功！', type: 'success' })
            changeSearchHandler()
          })
        }
      },
    })
  }
}

const _onCreateConfirm = (record: any, done: any) => {
  if (props.onCreate) {
    props.onCreate(record, done)
  } else if ((props.api?.create || props.api?.restful) && tools.axios) {
    // 新增请求
    const requestConfig = {
      method: 'post',
      url: props.api.create ?? props.api.restful,
      data: record,
    }
    if (props.beforeFetch) {
      props.beforeFetch(requestConfig, currentType.value)
    }

    tools
      .axios(requestConfig)
      .then(() => {
        ElNotification({ title: '提示', message: '新增成功！', type: 'success' })
        changeSearchHandler()
        done(true)
      })
      .catch(() => done())
  }
}

const _onUpdateConfirm = (record: any, done: any) => {
  if (props.onUpdate) {
    props.onUpdate(record, done)
  } else if ((props.api?.update || props.api?.restful) && tools.axios) {
    // 更新请求
    const requestConfig = {
      method: 'put',
      url: props.api.update ?? props.api.restful,
      data: record,
    }
    if (props.beforeFetch) {
      props.beforeFetch(requestConfig, currentType.value)
    }

    tools
      .axios(requestConfig)
      .then(() => {
        ElNotification({ title: '提示', message: '修改成功！', type: 'success' })
        searchHandler('update')
        done(true)
      })
      .catch(() => done())
  }
}

const _onFormConfirm = (record: any, done: any, type: string) => {
  if (type === 'create') {
    _onCreateConfirm(record, done)
  } else if (type === 'update') {
    _onUpdateConfirm(record, done)
  }
}

// 类型问题
const getTable: () => any = () => {
    return tableRef.value
  }


defineExpose({
  getTable,
  refresh(){
    props.pageModel.current = 1
    searchHandler('reset')
  },
  form: null,
  openCreate: _onOpenCreate,
  openUpdate: _onOpenUpdate,
  openInfo: _onOpenInfo,
})
</script>

<style scoped>
.w-crud-action {
  display: flex;
  margin-bottom: 15px;
}

.w-crud-action-split {
  margin-left: auto;
}

.w-crud-pagination {
  margin-top: 15px;
}

.w-crud .el-table :deep(th) {
  /* background-color: #eee; */
  font-weight: 700;
  color: var(--el-text-color-regular);
  background: var(--el-fill-color-lighter);
}

.w-crud .w-crud-column-action {
  display: flex;
  justify-content: center;
}

.w-crud .w-crud-column-action :deep(.el-button) {
  margin-left: 0;
}
</style>
