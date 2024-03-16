<template>
  <el-form ref="formRef" :model="formModel" :disabled="loading" v-bind="__formAttrs">
    <!-- 分区域、分步骤、分TAB -->
    <section>
      <el-row :gutter="10">
        <el-col v-for="field in formFields" :key="field.prop" :span="field.span">
          <!-- 传递插槽 -->
          <FormItem :field="field" :form-model="formModel" :row="formModel">
            <template
              v-for="item in Object.keys($slots).filter(item => item.endsWith('Form'))"
              v-slot:[item]="scopeProps"
            >
              <slot :name="item" v-bind="scopeProps"></slot>
            </template>
          </FormItem>
        </el-col>
      </el-row>
    </section>

    <footer style="text-align: right; margin-top: 30px">
      <el-button type="primary" :icon="CircleCheck" :loading="loading" @click="_onConfirm">
        确定
      </el-button>
      <el-button type="warning" :icon="RefreshLeft" :disabled="loading" @click="_onReset">
        重置
      </el-button>
    </footer>
  </el-form>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { FormInstance } from 'element-plus'
import { RefreshLeft, CircleCheck } from '@element-plus/icons-vue'
import FormItem from './form-item.vue'
import { formProps, formEmits } from './form'
import { useFormOption } from './utils'

defineOptions({ name: 'DForm' })
const props = defineProps(formProps)
const emit = defineEmits(formEmits)

const { __formAttrs, __formFields } = useFormOption(props.option, props.type)

const formRef = ref<FormInstance>()

// 设置默认值 --- 初始化还是监听
watch(
  __formFields,
  fields => {
    fields.forEach(field => {
      if (props.formModel) {
        props.formModel[field.prop] = props.formModel[field.prop] ?? field.default
      }
    })
  },
  {
    deep: true,
    immediate: true,
  },
)

// 动态条件过滤
const formFields = computed(() => {
  return __formFields.value.filter(field => {
    if (field.__listen) {
      if (typeof field.__listen == 'function') {
        return field.__listen(props.formModel, props.type, field)
      }

      if (field.__listen.show) {
        // if(typeof field.__listen.show == = 'function') {

        // }
        return Object.keys(field.__listen.show).every(
          key => field.__listen.show[key] === props.formModel[key],
        )
      }

      if (field.__listen.hide) {
        return !Object.keys(field.__listen.hide).every(key => {
          return field.__listen.hide[key] == props.formModel[key]
        })
      }
    }

    return true
  })
})

// 重置
const _onReset = () => {
  formRef.value?.resetFields()
}

// 确认
const _onConfirm = () => {
  formRef.value?.validate(valid => {
    if (valid) {
      emit('save', props.formModel)
    }
  })
}

defineExpose({
  getForm: formRef.value as any,
  save: _onConfirm,
  reset: _onReset,
})
</script>
