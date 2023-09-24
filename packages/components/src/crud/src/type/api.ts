// CRUD 接口配置 create、update、delete、info、page、list
export interface IDCrudApi {
  /**
   * create   post    url
   * update   put     url
   * delete   delete  url/{id}
   * info     get     url/{id}
   * page     get     url/page
   * list     get     url/list
   */
  restful?: string
  // 列表路径
  list?: string
  // 分页路径
  page?: string
  // 详情路径
  info?: string
  // 新建路径
  create?: string
  // 修改路径
  update?: string
  // 删除
  delete?: string
}
