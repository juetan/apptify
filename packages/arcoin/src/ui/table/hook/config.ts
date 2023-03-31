/** 搜索表单默认参数 */
export const USE_SEARCH = {
  labelAlign: 'left',
  autoLabelWidth: true,
  model: {},
};

/** 表格列默认参数 */
export const USE_COLUMN = {
  ellipsis: true,
  tooltip: true,
};

/** 行操作按钮默认参数 */
export const USE_ACTION = {
  type: 'primary',
};

/** 删除弹窗默认参数 */
export const USE_DELETE = {
  title: '删除确认',
  content: '确认删除当前数据吗?',
  modalClass: 'text-center',
  hideCancel: false,
  maskClosable: false,
};

export const USE_MODULE = (item: any): any => (item ? { items: [], ...item } : null);

export const USE_INDEX = {
  title: '#',
  width: 60,
  align: 'center',
  render: ({ rowIndex }: any) => rowIndex + 1,
};
