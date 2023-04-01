import DefaultTheme from "vitepress/theme";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import WhirlCrud from "@gaddi/components";
import "@gaddi/components/style.css";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(ElementPlus)
    app.use(WhirlCrud);
  },
};
