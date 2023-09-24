import { withInstall } from "@gaddi/utils";
import Crud from "./src/crud.vue";
export * from "./src/type";
export const DCrud = withInstall(Crud);
