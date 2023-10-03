import { withInstall } from "@gaddi/utils";
import Form from "./src/form.vue";
import SearchForm from "./src/search-form.vue";
export * from "./src/type";
export const DForm = withInstall(Form);
export const DSearchForm = withInstall(SearchForm);

