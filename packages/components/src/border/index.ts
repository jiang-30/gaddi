import { withInstall } from "@gaddi/utils";
import Border from './src/border.vue'

Border.name = "WBorder"

export * from './src/border'
export const WBorder = withInstall(Border)

export default WBorder
