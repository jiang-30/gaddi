import type { Plugin } from "vue";

export * from "./button/index";
export * from "./info/index";
export * from "./form/index";
export * from "./crud/index";
export * from "./roll/index";
export * from "./common/directives/authorize";
export * from "./common/directives/resize";


import type { IDOption } from './typings'
import { handle } from "./handler";
import { DImageUpload, DImagesUpload } from "./upload/index";
import { WSection } from "./section/index";
import { WRoll } from "./roll/index";
import { DInfo } from "./info/index";
import { DForm, DSearchForm } from "./form/index";
import { DCrud } from "./crud/index";
import { authorizeDirective } from "./common/directives/authorize";
import { resizeDirective } from "./common/directives/resize";

/**
 * 设置字典列表
 */
export const setGaddiDictList = (dictList: IDOption['dictList']) => {
  if (dictList) {
    handle.dictList.push(...dictList);
  }
}

/**
 * 设置权限列表
 */
export const setGaddiPermission = (permissions: IDOption['permissions']) => {
  if (permissions) {
    handle.permissions.push(...permissions)
  }
}

export default <Plugin<IDOption>>{
  install: (app, option) => {
    option = option ?? {}

    if (option.axios) {
      handle.axios = option.axios;
    }

    if (option.uploadFile) {
      handle.uploadFile = option.uploadFile;
    }

    if (option.defaultAttrs) {
      handle.defaultAttrs = {
        ...handle.defaultAttrs,
        ...option.defaultAttrs,
      };
    }

    if (option.defaultFieldAttrs) {
      handle.defaultFieldAttrs = {
        ...handle.defaultFieldAttrs,
        ...option.defaultFieldAttrs,
      }
    }
    if (option.dictList) {
      handle.dictList.push(...option.dictList);
    }

    if (option.permissions) {
      handle.permissions.push(...option.permissions)
    }

    // 自定义权限指令
    app.directive('authorize', authorizeDirective)
    // 自定义尺寸响应指令
    app.directive('resize', resizeDirective)

    // 自定义组件
    app.use(DImageUpload);
    app.use(DImagesUpload);
    app.use(WSection);
    app.use(WRoll);
    app.use(DInfo);
    app.use(DForm);
    app.use(DSearchForm);
    app.use(DCrud);
  },
};
