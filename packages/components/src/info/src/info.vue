<template>
  <section>
    <el-descriptions v-bind="__infoAttrs" :column="24">
      <el-descriptions-item v-for="item in __infoFields" :key="item.prop" v-bind="item.__itemAttrs" :span="item.span">
        <template #label>
          <span>{{ item.label }}</span>
        </template>
        <template #default>
          <slot :name="getSlotName(item.prop)" :model="infoModel" :row="infoModel" :field="item">
            <template v-if="item.type == 'image' || item.type == 'images'">
              <el-image v-for="image in formatValue(item, infoModel, null, null).split(',').filter((it: any) => it)"
                style="width: 148px; height: 148px; margin-right: 8px;" :src="image" fit="cover" />
            </template>
            <template v-else>
              {{ formatValue(item, infoModel, null, null) }}
            </template>
          </slot>
        </template>
      </el-descriptions-item>
    </el-descriptions>

    <footer class="w-info-footer">
      <el-button v-if="onCancel" type="default" :icon="CircleClose" @click="_onCancel">
        关闭
      </el-button>
    </footer>
  </section>
</template>
<script lang="ts" setup>
import { useSlots } from 'vue'
import { CircleClose } from '@element-plus/icons-vue'
import { infoProps, infoEmits } from './info'
import { useInfoOption } from './utils'
import { formatValue } from '../../utils'

defineOptions({ name: 'WInfo' })
const props = defineProps(infoProps)
const emits = defineEmits(infoEmits)

const { __infoAttrs, __infoFields } = useInfoOption(props.option)

const getSlotName = (prop: string) => {
  const slots = Object.keys(useSlots())

  if (slots.includes(prop + 'Info')) {
    return prop + 'Info'
  } else {
    return prop
  }
}

const _onCancel = () => {
  if (props.onCancel) {
    props.onCancel()
  }
}
</script>

<style scoped>
.w-info-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
