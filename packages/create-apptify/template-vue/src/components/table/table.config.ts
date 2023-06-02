/**
 * 搜索表单默认参数
 */
export const TABLE_SEARCH_DEFAULTS = {
  labelAlign: "left",
  autoLabelWidth: true,
  model: {},
};

/**
 * 表格列默认参数
 */
export const TABLE_COLUMN_DEFAULTS = {
  ellipsis: true,
  tooltip: true,
  render: ({ record, column }: any) => record[column.dataIndex] || "-",
};

/**
 * 行操作按钮默认参数
 */
export const TABLE_ACTION_DEFAULTS = {
  buttonProps: {
    type: "primary",
  }
};

/**
 * 删除弹窗默认参数
 */
export const TABLE_DELTE_DEFAULTS = {
  title: "删除确认",
  content: "确认删除当前数据吗?",
  modalClass: "text-center",
  hideCancel: false,
  maskClosable: false,
};

export const TALBE_INDEX_DEFAULTS = {
  title: "#",
  width: 60,
  align: "center",
  render: ({ rowIndex }: any) => rowIndex + 1,
};
