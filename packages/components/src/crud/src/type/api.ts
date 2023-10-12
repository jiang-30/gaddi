/**
 *  format('url?id={id}'， {id: 1})
 */
export interface IDCrudApiProps {
  method?: string,
  res?: string    // data
  total?: string // data.total
}

// CRUD 接口配置 create、update、delete、info、page、list
export interface IDCrudApi {
  /**
   * restful
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
  listProps?: IDCrudApiProps

  // 分页路径
  page?: string
  pageProps?: IDCrudApiProps

  // 详情路径
  info?: string
  infoProps?: IDCrudApiProps

  // 新建路径
  create?: string
  createProps?: IDCrudApiProps

  // 修改路径
  update?: string
  updateProps?: IDCrudApiProps

  // 删除
  delete?: string
  deleteProps?: IDCrudApiProps
}


