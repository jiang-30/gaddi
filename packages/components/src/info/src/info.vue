<template>
  <el-descriptions v-bind="__infoAttrs" :column="24">
    <el-descriptions-item
      v-for="field in __infoFields"
      :key="field.prop"
      v-bind="field.__itemAttrs"
      :span="field.span"
    >
      <template #label>
        <LabelTooltip :label="field.label" :hint="field.hint"></LabelTooltip>
      </template>
      <template #default>
        <slot :name="getSlotName(field.prop)" :model="infoModel" :row="infoModel" :field="field">
          <!-- 图片显示 -->
          <template v-if="field.type == 'image' || field.type == 'images'">
            <ImageList
              :images="formatValue(infoModel, field)"
              width="148px"
              height="148px"
              gap="8px"
            ></ImageList>
          </template>
          <template v-else>
            {{ formatValue(infoModel, field) }}
          </template>
        </slot>
      </template>
    </el-descriptions-item>
  </el-descriptions>
</template>
<script lang="ts" setup>
import { useSlots } from 'vue'
import LabelTooltip from '../../common/components/label-tooltip.vue'
import ImageList from '../../common/components/image-list.vue'
import { infoProps, infoEmits } from './info'
import { useInfoOption } from './utils'
import { formatValue } from '../../handler'

defineOptions({ name: 'DInfo' })

const props = defineProps(infoProps)
const emit = defineEmits(infoEmits)

const { __infoAttrs, __infoFields } = useInfoOption(props.option)

const getSlotName = (prop: string) => {
  const slots = Object.keys(useSlots())

  if (slots.includes(prop + 'Info')) {
    return prop + 'Info'
  } else {
    return prop
  }
}
</script>
