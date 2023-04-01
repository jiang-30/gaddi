import { withInstall } from "@gaddi/utils";
import Form from "./src/form.vue";
import SearchForm from "./src/search-form.vue";
export * from "./src/type";

const WForm = withInstall(Form);
const WSearchForm = withInstall(SearchForm);

export { WForm, WForm as default, WSearchForm };
