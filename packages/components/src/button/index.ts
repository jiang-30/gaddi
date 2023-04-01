import { withInstall } from "@gaddi/utils";
import Button from "./src/button.vue";

Button.name = "WButton";

export * from "./src/button";
export const WButton = withInstall(Button);
export default WButton;
