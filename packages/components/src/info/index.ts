import { withInstall } from "@gaddi/utils";
import Info from "./src/info.vue";
export * from "./src/type";

const WInfo = withInstall(Info);

export { WInfo, WInfo as default };
