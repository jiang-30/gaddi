import type { Plugin } from "vue";
import type { AxiosInstance } from "axios";

export * from "./button/index";
export * from "./info/index";
export * from "./form/index";
export * from "./crud/index";
export * from "./roll/index";

import { tools } from "./utils";
import { WButton } from "./button/index";
import { WInfo } from "./info/index";
import { WForm, WSearchForm } from "./form/index";
import { WCrud } from "./crud/index";
import { WSection } from "./section/index";
import { WRoll } from "./roll/index";
import type { IOption } from './typings'


export default <Plugin<IOption>>{
  install: (app, option) => {
    option = option ?? {}

    if (option.axios) {
      tools.axios = option.axios;
    }
    if (option.uploadFile) {
      tools.uploadFile = option.uploadFile;
    }
    // todo 合并
    if (option.defaultAttrs) {
      tools.defaultAttrs = option.defaultAttrs;
    }
    // todo 合并
    if (option.defaultFieldAttrs) {
      tools.defaultFieldAttrs = option.defaultFieldAttrs;
    }
    if (option.dictList) {
      tools.dictList.value.push(...option.dictList.value)
    }


    app.use(WButton);
    app.use(WInfo);
    app.use(WForm);
    app.use(WSearchForm);
    app.use(WCrud, option);
    app.use(WSection);
    app.use(WRoll);
  },
};
