<template>
  <el-form-item :prop="field.prop" v-bind="field.__formItemAttrs">
    <template #label>
      <span v-if="formType == 'searchForm'"></span>
      <LabelTooltip v-else :label="field.label" :hint="field.hint"></LabelTooltip>
    </template>

    <template #default>
      <slot :name="field.prop + 'Form'" :field="field" :model="formModel">
        <!-- input、textarea、password -->
        <el-input v-if="['input', 'textarea', 'password'].includes(field.type)" v-model="formModel[field.prop]"
          :type="field.type" :placeholder="'请输入' + field.label" v-bind="field.__formFieldAttrs"></el-input>

        <!-- inputNumber 数字输入框 -->
        <el-input-number v-else-if="field.type === 'inputNumber'" v-model="formModel[field.prop]"
          v-bind="field.__formFieldAttrs" />

        <!-- select -->
        <el-select v-else-if="field.type === 'select'" v-model="formModel[field.prop]" style="width: 100%"
          :placeholder="'请选择' + field.label" v-bind="field.__formFieldAttrs">
          <el-option v-for="item in field.dictData" :key="item.value" :label="item.label" :value="item.value"
            :disabled="item.disabled === true" />
        </el-select>

        <!-- radio -->
        <el-radio-group v-else-if="field.type === 'radio'" v-model="formModel[field.prop]"
          v-bind="field.__formFieldAttrs">
          <el-radio v-for="item in field.dictData" :label="item.value">
            {{ item.label }}
          </el-radio>
        </el-radio-group>

        <!-- radioButton -->
        <el-radio-group v-else-if="field.type === 'radioButton'" v-model="formModel[field.prop]"
          v-bind="field.__formFieldAttrs">
          <el-radio-button v-for="item in field.dictData" :label="item.value">
            {{ item.label }}
          </el-radio-button>
        </el-radio-group>

        <!-- cascader 级联选择 -->
        <el-cascader v-else-if="field.type === 'cascader'" v-model="formModel[field.prop]" :options="field.dictData"
          v-bind="field.__formFieldAttrs" />

        <!-- tree 树型选择 -->
        <el-tree-select v-else-if="field.type === 'tree'" v-model="formModel[field.prop]" style="width: 100%"
          :data="field.dictData" v-bind="field.__formFieldAttrs" />

        <!-- year/month/date/dates/datetime/ week/datetimerange/daterange/ monthrange -->
        <el-date-picker
          v-if="['year', 'month', 'date', 'dates', 'datetime', 'week', 'datetimerange', 'daterange', 'monthrange'].includes(field.type)"
          v-model="formModel[field.prop]" :type="field.type" :placeholder="'请选择' + field.label"
          v-bind="field.__formFieldAttrs"></el-date-picker>

        <!-- image -->
        <DImageUpload v-if="field.type == 'image'" v-model="formModel[field.prop]" v-bind="field.__formFieldAttrs">
        </DImageUpload>

        <!-- images -->
        <DImagesUpload v-if="field.type == 'images'" v-model="formModel[field.prop]" v-bind="field.__formFieldAttrs">
        </DImagesUpload>

      </slot>
    </template>
  </el-form-item>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import LabelTooltip from '../../common/components/label-tooltip.vue'
import { DImageUpload, DImagesUpload } from '../../upload/index';

defineProps({
  field: {
    type: Object,
    required: true,
  },
  formModel: {
    type: Object,
    required: true,
  },
  formType: {
    type: String as PropType<'form' | 'searchForm'>,
    default: 'form'
  }
})
</script>
