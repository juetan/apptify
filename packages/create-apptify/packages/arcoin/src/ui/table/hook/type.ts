import { TableData, TableColumnData, Link } from '@arco-design/web-vue';
import { RenderFunction } from 'vue';
import { BhFormItem, BhFormModalProps, BhFormProps } from '../../form';
import { BhTableProps, BhTableColumn } from '../table';

type UseDetailOptions = {
  /** 标签名(可使用JSX) */
  label?: string | RenderFunction;

  /** 字段的key或渲染函数 */
  value?: string | RenderFunction;

  /** 横跨的列 */
  span?: number;
};

type UseFormItem = Partial<BhFormItem> | boolean;

interface UseColumnRenderOptions {
  /** 当前行数据 */
  record: TableData;
  /** 当前列配置 */
  column: TableColumnData;
  /** 当前行索引 */
  rowIndex: number;
}

export interface UseColumnAction extends Omit<InstanceType<typeof Link>['$props'], 'onClick'> {
  type?: string;

  /** 操作按钮的文本 */
  text?: string;

  /** 操作类型 */
  action?: 'delete';

  /** 操作接口 */
  api?: (arg: any) => Promise<any>;

  /** 操作按钮的点击事件 */
  onClick?: (data: UseColumnRenderOptions) => void;
}

export interface UseTableColumn extends BhTableColumn {
  /** 表格列类型: index(索引)、action(操作) */
  type?: 'index' | 'action';

  /** 当type为action时的操作数组 */
  action?: UseColumnAction[];

  /** 作为表单弹窗字段时的配置选项 */
  common?: UseFormItem;

  /** 作为搜索表单字段时的配置选项 */
  search?: UseFormItem;

  /** 作为新建表单字段时的配置选项 */
  create?: UseFormItem;

  /** 作为修改表单字段时的配置选项 */
  modify?: UseFormItem;

  /** 作为详情字段时的配置选项 */
  detail?: UseDetailOptions | boolean;
}

export interface UseTableOptions extends Omit<BhTableProps, 'search' | 'create' | 'modify' | 'columns'> {
  /** 表格列配置 */
  columns: UseTableColumn[];

  /** 搜索表单配置 */
  search?: Partial<BhFormProps> | boolean;

  /** 搜索表单配置 */
  common?: Partial<BhFormModalProps>;

  /** 新建弹窗配置 */
  create?: Partial<BhFormModalProps> | boolean;

  /** 新建弹窗配置 */
  modify?: Partial<BhFormModalProps> | boolean;

  /** 详情弹窗配置 */
  detail?: any;
}
