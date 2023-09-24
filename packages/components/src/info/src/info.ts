import type { PropType } from "vue";
import type { IDInfoAttrs, IDInfoItemAttrs } from "./type";
import type { IDModel } from '../../typings'

export const infoProps = {
  option: {
    type: Object as PropType<IDInfoAttrs & { fields: IDInfoItemAttrs[] }>,
    required: true as true,
  },
  infoModel: {
    type: Object as PropType<IDModel>,
    required: true as true,
  },
};

export const infoEmits = {};
