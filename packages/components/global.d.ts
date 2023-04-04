declare module '@vue/runtime-core' {
  // 全局组件
  export interface GlobalComponents {
    WInfo: typeof import('@gaddi/components')['WInfo']
    WForm: typeof import('@gaddi/components')['WForm']
    WCrud: typeof import('@gaddi/components')['WCrud']
  }

  // // 全局属性
  // interface ComponentCustomProperties {
  //   // $message: typeof import("element-plus")["ElMessage"];
  // }
}

export {}
