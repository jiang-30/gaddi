import { withInstall } from "@gaddi/utils";
import Roll from "./src/roll.vue";

Roll.name = "WRoll";

export const WRoll = withInstall(Roll);
export * from "./src/type";
export default WRoll;
