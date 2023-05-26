import { TableData, TableColumnData, Link } from "@arco-design/web-vue";
import { FormModalProps, FormProps } from "../form";
import { TableProps } from "./table";

interface UseColumnRenderOptions {
  /**
   * 当前行数据
   */
  record: TableData;
  /**
   * 当前列配置
   */
  column: TableColumnData;
  /**
   * 当前行索引
   */
  rowIndex: number;
}

export interface UseColumnAction extends Omit<InstanceType<typeof Link>["$props"], "onClick" | "disabled"> {
  type?: string;

  /**
   * 操作按钮的文本
   */
  text?: string;

  /**
   * 操作类型
   */
  action?: "delete" | "modify";

  /**
   * 操作按钮的点击事件
   */
  onClick?: (data: UseColumnRenderOptions, openModify?: (model: Record<string, any>) => void) => void;

  /**
   * 是否禁止
   */
  disabled?: (data: UseColumnRenderOptions) => boolean;

  /**
   * 是否可见
   */
  visible?: (data: UseColumnRenderOptions) => boolean;
}

export interface UseTableColumn extends TableColumnData {
  /**
   * 表格列类型: index(索引)、buttons(按钮操作)
   */
  type?: "index" | "buttons";
  /**
   * 当type为action时的操作数组
   */
  buttons?: UseColumnAction[];
}

export interface UseTableOptions extends Omit<TableProps, "search" | "create" | "modify" | "columns"> {
  /**
   * 表格列配置
   */
  columns: UseTableColumn[];
  /**
   * 搜索表单配置
   */
  search?: Partial<FormProps>;
  /**
   * 表单弹窗通用配置
   */
  common?: Partial<FormModalProps>;
  /**
   * 新建弹窗配置
   */
  create?: Partial<FormModalProps>;
  /**
   * 新建弹窗配置
   */
  modify?: Partial<FormModalProps>;
  /**
   * 详情弹窗配置
   */
  detail?: any;
}
