

// 弹窗类型
export const dialogTypeMap: Record<string, { title: string; closeOnClickModal: boolean }> = {
  info: {
    title: '详情',
    closeOnClickModal: true,
  },
  create: {
    title: '新增',
    closeOnClickModal: false,
  },
  update: {
    title: '修改',
    closeOnClickModal: false,
  },
}
