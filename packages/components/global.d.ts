declare module '@vue/runtime-core' {
  // 全局组件
  export interface GlobalComponents {
    DInfo: typeof import('@gaddi/components')['DInfo']
    DForm: typeof import('@gaddi/components')['DForm']
    DSearchForm: typeof import('@gaddi/components')['DSearchForm']
    DCrud: typeof import('@gaddi/components')['DCrud']
  }

  // // 全局属性
  // interface ComponentCustomProperties {
  //   // $message: typeof import("element-plus")["ElMessage"];
  // }
}

export { }
