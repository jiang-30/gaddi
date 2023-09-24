import type { ExtractPropTypes } from 'vue'
import type Info from './info.vue'
import type { infoProps, infoEmits } from './info'
import type { IDFieldBase } from '../../typings'

// Info
export type IDInfo = InstanceType<typeof Info>

export type IDInfoEmits = typeof infoEmits

export type IDInfoProps = ExtractPropTypes<typeof infoProps>

export type IDInfoOption = IDInfoProps['option']
export type IDInfoModel = IDInfoProps['infoModel']

export interface IDInfoAttrs extends IElDescriptionsAttrs {
  span?: number
  labelWidth?: string | number
  labelAlign?: 'left' | 'center' | 'right'
}

export interface IDInfoItemAttrs extends IDFieldBase, IElDescriptionsItemAttrs {
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
