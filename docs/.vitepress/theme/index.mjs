import DefaultTheme from "vitepress/theme";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import WComponents from "@gaddi/components";
import '@gaddi/components/dist/style.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(ElementPlus)
    app.use(WComponents);
  },
};
