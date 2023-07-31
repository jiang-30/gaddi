import type { ExtractPropTypes } from 'vue'
import type Info from './info.vue'
import type { infoProps, infoEmits } from './info'
import type { IFieldBaseAttrs } from '../../typings'


// Info
export type IInfo = InstanceType<typeof Info>

export type IInfoEmits = typeof infoEmits

export type IInfoProps = ExtractPropTypes<typeof infoProps>

export type IInfoOption = IInfoProps['option']

export interface IInfoAttrs extends IElDescriptionsAttrs {
  span?: number
  labelWidth?: string | number
  labelAlign?: 'left' | 'center' | 'right'
}

export interface IInfoItemAttrs extends IFieldBaseAttrs, IElDescriptionsItemAttrs {
  span?: number
  isInfo?: boolean
  props?: any
}


interface IElDescriptionsAttrs {
  infoBorder?: boolean
  // infoColumn?: number;
  infoDirection?: 'vertical' | 'horizontal'
  infoSize?: 'large' | 'default' | 'small'
  infoTitle?: string
  infoExtra?: string
}

interface IElDescriptionsItemAttrs {
  infoWidth?: string | number
  infoMinWidth?: string | number
  infoAlign?: 'left' | 'center' | 'right'
  infoLabelAlign?: 'left' | 'center' | 'right'
  infoClassName?: string
  infoLabelClassName?: string
}
